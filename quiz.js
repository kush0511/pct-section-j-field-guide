(() => {
  "use strict";

  const app = document.querySelector("#quiz-app");
  const data = window.PCT_QUIZ_DATA;
  const STORAGE_KEY = "pct-section-j-trail-quiz-v1";
  const QUICK_PER_SECTION = 4;
  const TYPE_LABELS = {
    single: "Choose one",
    identify: "Field identification",
    multi: "Choose all",
    boolean: "True or false",
    order: "Put in order",
    match: "Match",
    short: "Key idea",
    scenario: "Field scenario"
  };
  const TYPE_INSTRUCTIONS = {
    single: "Choose the best answer.",
    identify: "Use the visual and choose the field implication that matters.",
    multi: "Choose every correct answer; partial selections do not pass.",
    boolean: "Decide whether the statement is true or false.",
    order: "Use the arrow buttons to build the correct sequence.",
    match: "Choose one field meaning for every row.",
    short: "Use your own words. The grader looks for the safety-critical idea.",
    scenario: "Write your call before revealing the debrief, then grade yourself honestly."
  };

  let profile = loadProfile();
  let currentAttempt = null;
  let currentFeedback = null;

  const validationErrors = validateQuestionBank(data);
  if (validationErrors.length) {
    renderFatalError(validationErrors);
    return;
  }

  app.addEventListener("click", handleClick);
  app.addEventListener("input", handleInput);
  app.addEventListener("change", handleInput);
  app.addEventListener("submit", handleSubmit);

  renderHome();

  function handleClick(event) {
    const actionTarget = event.target.closest("[data-action]");
    if (!actionTarget) return;

    const action = actionTarget.dataset.action;

    if (action === "start-quick") {
      startAttempt({ mode: "quick" });
    } else if (action === "start-comprehensive") {
      startAttempt({ mode: "comprehensive" });
    } else if (action === "start-section") {
      startAttempt({ mode: "section", sectionId: actionTarget.dataset.section });
    } else if (action === "start-missed") {
      startAttempt({ mode: "missed" });
    } else if (action === "exit-attempt" || action === "return-home") {
      currentAttempt = null;
      currentFeedback = null;
      renderHome();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (action === "move-order") {
      moveOrderItem(Number(actionTarget.dataset.index), Number(actionTarget.dataset.delta));
    } else if (action === "next-question") {
      moveToNextQuestion();
    } else if (action === "self-grade") {
      recordScenarioGrade(actionTarget.dataset.result === "pass");
    } else if (action === "restart-attempt") {
      startAttempt({ ...currentAttempt.config });
    } else if (action === "copy-results") {
      copyResults(actionTarget);
    }
  }

  function handleInput(event) {
    if (event.target.id === "player-name") {
      profile.playerName = event.target.value.slice(0, 60);
      saveProfile();
      return;
    }

    updateSubmitAvailability();
  }

  function handleSubmit(event) {
    if (event.target.id !== "question-form") return;
    event.preventDefault();
    if (!currentAttempt || currentFeedback) return;

    const question = currentQuestion();
    const response = collectResponse(question);
    if (!isResponseReady(question, response)) return;

    if (question.type === "scenario") {
      currentFeedback = {
        pendingScenario: true,
        response,
        isCorrect: null
      };
      renderQuestion();
      focusFeedback();
      return;
    }

    const isCorrect = gradeResponse(question, response);
    recordAnswer(question, response, isCorrect);
    currentFeedback = { response, isCorrect };
    renderQuestion();
    focusFeedback();
  }

  function renderHome() {
    document.title = "Section J Trail Knowledge Check";

    const totalQuestions = data.questions.length;
    const typeCount = new Set(data.questions.map((question) => question.type)).size;
    const missedCount = profile.missedIds.length;
    const sectionCards = data.sections.map(renderSectionCard).join("");

    app.innerHTML = `
      <header class="quiz-hero">
        <div class="quiz-hero-copy">
          <p class="quiz-kicker">PCT Section J · trail knowledge certification</p>
          <h1>Know the trail.<br>Make the call.</h1>
          <p class="quiz-hero-deck">
            A randomized field assessment for two hikers who need to recognize terrain,
            control a camp, navigate uncertainty, and act early when conditions turn.
          </p>
          <div class="quiz-hero-stats" aria-label="Quiz facts">
            <div class="quiz-hero-stat"><strong>${data.sections.length}</strong><span>Field stations</span></div>
            <div class="quiz-hero-stat"><strong>${totalQuestions}</strong><span>Guide-backed questions</span></div>
            <div class="quiz-hero-stat"><strong>${typeCount}</strong><span>Question formats</span></div>
            <div class="quiz-hero-stat"><strong>Shuffled</strong><span>Every attempt</span></div>
          </div>
        </div>
        <div class="trail-badge" aria-hidden="true">
          <span>Section</span>
          <strong>J</strong>
        </div>
      </header>

      <section class="quiz-advisory" aria-label="Current conditions warning">
        <span class="advisory-mark" aria-hidden="true">!</span>
        <div>
          <strong>This trains judgment; it does not clear the route.</strong>
          <p>
            The source guide was audited through ${escapeHtml(data.guideAuditDate)} and currently
            treats the Waptus bridge as a provisional no-go gate. Conditions and orders must be rechecked.
          </p>
        </div>
        <a href="index.html#dated-conditions-snapshot-29-july-2026">Read live status →</a>
      </section>

      <section class="quiz-dashboard" aria-labelledby="practice-heading">
        <div class="quiz-control-panel">
          <label class="player-field">
            <span class="field-label">Hiker name · optional</span>
            <input
              id="player-name"
              type="text"
              maxlength="60"
              autocomplete="name"
              placeholder="Your name or trail name"
              value="${escapeAttribute(profile.playerName)}"
            />
          </label>

          <div class="quiz-mode-actions" aria-label="Assessment modes">
            <button class="primary-button" type="button" data-action="start-quick">
              Trail check
              <span class="button-note">${QUICK_PER_SECTION} random questions per section · ${QUICK_PER_SECTION * data.sections.length} total</span>
            </button>
            <button class="secondary-button" type="button" data-action="start-comprehensive">
              Comprehensive run
              <span class="button-note">All ${totalQuestions} questions · shuffled by section</span>
            </button>
            <button
              class="ghost-button"
              type="button"
              data-action="start-missed"
              ${missedCount ? "" : "disabled"}
            >
              Review missed
              <span class="button-note">${missedCount ? `${missedCount} question${missedCount === 1 ? "" : "s"} waiting` : "Complete an attempt first"}</span>
            </button>
          </div>
        </div>

        <div class="section-heading">
          <div>
            <p class="section-eyebrow">Revisit one field station</p>
            <h2 id="practice-heading">Practice by section</h2>
            <p>Each station reshuffles all eight questions and answer choices.</p>
          </div>
        </div>

        <div class="section-grid">
          ${sectionCards}
        </div>
      </section>

      <footer class="quiz-footer">
        Question explanations link to the source guide. Saved mastery lives only in this browser;
        you and your friend can take independent shuffled attempts on separate devices.
      </footer>
    `;
  }

  function renderSectionCard(section) {
    const sectionQuestions = data.questions.filter((question) => question.section === section.id);
    const types = new Set(sectionQuestions.map((question) => question.type)).size;
    const best = profile.bestBySection[section.id];
    const scoreValue = Number.isFinite(best) ? best : 0;
    const scoreLabel = Number.isFinite(best) ? `${best}%` : "—";

    return `
      <article class="section-card" style="--section-color: ${section.color}">
        <div class="section-number">${section.number}</div>
        <div>
          <h3>${escapeHtml(section.title)}</h3>
          <p>${escapeHtml(section.description)}</p>
          <div class="section-meta">
            <span>${sectionQuestions.length} questions</span>
            <span>${types} formats</span>
          </div>
        </div>
        <div class="mastery-ring" style="--score: ${scoreValue}" aria-label="Best score ${scoreLabel}">
          <strong>${scoreLabel}</strong>
          <span>Best</span>
        </div>
        <button
          class="section-start"
          type="button"
          data-action="start-section"
          data-section="${section.id}"
        >
          Start shuffled section →
        </button>
      </article>
    `;
  }

  function startAttempt(config) {
    const questionPool = buildAttemptQueue(config);
    if (!questionPool.length) {
      renderHome();
      return;
    }

    currentAttempt = {
      config,
      modeLabel: getModeLabel(config),
      questions: questionPool.map(prepareQuestion),
      sectionOrder: data.sections
        .filter((section) => questionPool.some((question) => question.section === section.id))
        .map((section) => section.id),
      index: 0,
      results: [],
      startedAt: Date.now(),
      completed: false
    };
    currentFeedback = null;
    renderQuestion();
    window.scrollTo({ top: 0 });
  }

  function buildAttemptQueue(config) {
    if (config.mode === "section") {
      return shuffle(data.questions.filter((question) => question.section === config.sectionId));
    }

    if (config.mode === "missed") {
      const missed = new Set(profile.missedIds);
      return data.sections.flatMap((section) =>
        shuffle(data.questions.filter((question) => question.section === section.id && missed.has(question.id)))
      );
    }

    return data.sections.flatMap((section) => {
      const sectionQuestions = shuffle(data.questions.filter((question) => question.section === section.id));
      return config.mode === "quick" ? sectionQuestions.slice(0, QUICK_PER_SECTION) : sectionQuestions;
    });
  }

  function prepareQuestion(sourceQuestion) {
    const question = clone(sourceQuestion);

    if (["single", "identify", "multi"].includes(question.type)) {
      question.displayChoices = shuffle(question.choices);
    }

    if (question.type === "boolean") {
      question.displayChoices = ["True", "False"];
    }

    if (question.type === "order") {
      question.displayItems = shuffledNotEqual(question.items, question.answer);
    }

    if (question.type === "match") {
      question.displayMatchOptions = shuffle([...new Set(question.pairs.map((pair) => pair.answer))]);
    }

    return question;
  }

  function renderQuestion() {
    if (!currentAttempt) return;

    const question = currentQuestion();
    const section = getSection(question.section);
    const questionNumber = currentAttempt.index + 1;
    const total = currentAttempt.questions.length;
    const completedSections = new Set(
      currentAttempt.results.map((result) => result.section).filter((sectionId) => sectionId !== question.section)
    );
    const progress = ((currentAttempt.index + (currentFeedback ? 1 : 0)) / total) * 100;

    document.title = `${questionNumber}/${total} · ${section.shortTitle} · Section J Quiz`;

    app.innerHTML = `
      <section class="question-view">
        <header class="quiz-topbar">
          <button class="text-button" type="button" data-action="exit-attempt">← Sections</button>
          <div class="progress-shell" aria-label="Quiz progress">
            <div class="progress-meta">
              <span>${escapeHtml(currentAttempt.modeLabel)}</span>
              <span>${questionNumber} / ${total}</span>
            </div>
            <div class="progress-track">
              <div class="progress-fill" style="width: ${progress}%"></div>
            </div>
          </div>
          <span class="quiz-mode-pill">${escapeHtml(currentAttempt.modeLabel)}</span>
        </header>

        <div class="quiz-workspace">
          <aside class="trail-ribbon" aria-label="Field stations">
            <p class="trail-ribbon-title">Field stations</p>
            <ol class="ribbon-list">
              ${currentAttempt.sectionOrder
                .map((sectionId) => {
                  const ribbonSection = getSection(sectionId);
                  const statusClass =
                    sectionId === question.section
                      ? "is-current"
                      : completedSections.has(sectionId)
                        ? "is-complete"
                        : "";
                  return `
                    <li
                      class="ribbon-item ${statusClass}"
                      style="--ribbon-color: ${ribbonSection.color}"
                      ${sectionId === question.section ? 'aria-current="step"' : ""}
                    >
                      ${escapeHtml(ribbonSection.shortTitle)}
                    </li>
                  `;
                })
                .join("")}
            </ol>
          </aside>

          <div class="question-stage">
            <article class="question-card" style="--question-color: ${section.color}">
              <div class="question-meta">
                <span class="question-section-tag">${section.number} · ${escapeHtml(section.shortTitle)}</span>
                <span class="question-type-tag">${escapeHtml(TYPE_LABELS[question.type])}</span>
                <span class="question-counter">${questionNumber} of ${total}</span>
              </div>

              <h1 class="question-prompt">${escapeHtml(question.prompt)}</h1>
              <p class="question-instruction">${escapeHtml(TYPE_INSTRUCTIONS[question.type])}</p>

              ${renderQuestionMedia(question)}

              <form id="question-form">
                <div class="answer-area">
                  ${renderAnswerInput(question)}
                </div>

                ${renderFeedback(question)}

                <div class="question-actions">
                  ${
                    currentFeedback
                      ? currentFeedback.pendingScenario
                        ? ""
                        : `<button class="primary-button" type="button" data-action="next-question">
                            ${currentAttempt.index === total - 1 ? "View results" : "Next question →"}
                          </button>`
                      : `<button class="primary-button" type="submit" id="submit-answer" disabled>
                          ${question.type === "scenario" ? "Reveal debrief" : "Check answer"}
                        </button>`
                  }
                </div>
              </form>
            </article>
          </div>
        </div>
      </section>
    `;

    updateSubmitAvailability();
  }

  function renderQuestionMedia(question) {
    if (!question.media) return "";

    return `
      <figure class="question-media ${escapeAttribute(question.mediaClass || "")}">
        <img
          src="${escapeAttribute(question.media.src)}"
          alt="${escapeAttribute(question.media.alt)}"
          loading="eager"
          decoding="async"
        />
        ${question.media.caption ? `<figcaption>${escapeHtml(question.media.caption)}</figcaption>` : ""}
      </figure>
    `;
  }

  function renderAnswerInput(question) {
    const locked = Boolean(currentFeedback);

    if (["single", "identify", "multi", "boolean"].includes(question.type)) {
      return renderOptions(question, locked);
    }

    if (question.type === "order") {
      return renderOrder(question, locked);
    }

    if (question.type === "match") {
      return renderMatch(question, locked);
    }

    if (question.type === "short") {
      const value = currentFeedback?.response || "";
      return `
        <label>
          <span class="field-label">Your answer</span>
          <input
            class="short-answer"
            name="short-answer"
            type="text"
            autocomplete="off"
            placeholder="State the safety-critical idea"
            value="${escapeAttribute(value)}"
            ${locked ? "disabled" : ""}
          />
        </label>
      `;
    }

    if (question.type === "scenario") {
      const value = currentFeedback?.response || "";
      return `
        <label>
          <span class="field-label">Your field call</span>
          <textarea
            class="scenario-answer"
            name="scenario-answer"
            placeholder="What do you do first, what makes you stop, and when do you communicate?"
            ${locked ? "disabled" : ""}
          >${escapeHtml(value)}</textarea>
        </label>
        <p class="scenario-hint">Write at least one concrete action before revealing the model response.</p>
      `;
    }

    return "";
  }

  function renderOptions(question, locked) {
    const isMulti = question.type === "multi";
    const inputType = isMulti ? "checkbox" : "radio";
    const selected = currentFeedback?.response;
    const hasSelectedValue = selected !== undefined && selected !== null;
    const selectedValues = new Set(Array.isArray(selected) ? selected : hasSelectedValue ? [selected] : []);

    return `
      <div class="option-grid">
        ${question.displayChoices
          .map((choice, index) => {
            const value = question.type === "boolean" ? String(choice === "True") : choice;
            const isSelected = selectedValues.has(question.type === "boolean" ? value === "true" : choice);
            const statusClass = getOptionStatusClass(question, choice, isSelected);
            return `
              <label class="option-card ${statusClass}">
                <input
                  type="${inputType}"
                  name="answer-option"
                  value="${escapeAttribute(value)}"
                  ${isSelected ? "checked" : ""}
                  ${locked ? "disabled" : ""}
                />
                <span class="option-body">
                  <span class="option-mark">${optionMarker(index, isMulti)}</span>
                  <span>${escapeHtml(choice)}</span>
                </span>
              </label>
            `;
          })
          .join("")}
      </div>
    `;
  }

  function getOptionStatusClass(question, choice, isSelected) {
    if (!currentFeedback || currentFeedback.pendingScenario) return "";

    if (question.type === "boolean") {
      const choiceValue = choice === "True";
      if (choiceValue === question.answer) return "is-correct";
      return isSelected ? "is-wrong" : "";
    }

    const answers = new Set(Array.isArray(question.answer) ? question.answer : [question.answer]);
    if (answers.has(choice)) return "is-correct";
    return isSelected ? "is-wrong" : "";
  }

  function renderOrder(question, locked) {
    return `
      <ol class="order-list">
        ${question.displayItems
          .map(
            (item, index) => `
              <li class="order-item">
                <span class="order-position">${index + 1}</span>
                <span class="order-copy">${escapeHtml(item)}</span>
                <span class="order-controls">
                  <button
                    class="order-button"
                    type="button"
                    aria-label="Move item up"
                    data-action="move-order"
                    data-index="${index}"
                    data-delta="-1"
                    ${locked || index === 0 ? "disabled" : ""}
                  >↑</button>
                  <button
                    class="order-button"
                    type="button"
                    aria-label="Move item down"
                    data-action="move-order"
                    data-index="${index}"
                    data-delta="1"
                    ${locked || index === question.displayItems.length - 1 ? "disabled" : ""}
                  >↓</button>
                </span>
              </li>
            `
          )
          .join("")}
      </ol>
    `;
  }

  function renderMatch(question, locked) {
    const response = currentFeedback?.response || {};

    return `
      <div class="match-grid">
        ${question.pairs
          .map(
            (pair, index) => `
              <label class="match-row">
                <span class="match-term">${escapeHtml(pair.term)}</span>
                <select
                  class="match-select"
                  name="match-${index}"
                  data-term="${escapeAttribute(pair.term)}"
                  ${locked ? "disabled" : ""}
                >
                  <option value="">Choose a field meaning…</option>
                  ${question.displayMatchOptions
                    .map(
                      (option) => `
                        <option
                          value="${escapeAttribute(option)}"
                          ${response[pair.term] === option ? "selected" : ""}
                        >${escapeHtml(option)}</option>
                      `
                    )
                    .join("")}
                </select>
              </label>
            `
          )
          .join("")}
      </div>
    `;
  }

  function renderFeedback(question) {
    if (!currentFeedback) return "";

    if (currentFeedback.pendingScenario) {
      return `
        <section class="answer-feedback" id="answer-feedback" tabindex="-1" aria-live="polite">
          <h2 class="feedback-title">
            <span class="feedback-icon" aria-hidden="true">↔</span>
            Compare your field call
          </h2>
          <p>${escapeHtml(question.modelAnswer)}</p>
          <ul class="rubric-list">
            ${question.rubric.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
          </ul>
          <div class="self-grade" aria-label="Self assessment">
            <button class="self-grade-button is-pass" type="button" data-action="self-grade" data-result="pass">
              I covered the critical points
            </button>
            <button class="self-grade-button is-review" type="button" data-action="self-grade" data-result="review">
              Needs review
            </button>
          </div>
          <a class="guide-deep-link" href="index.html#${escapeAttribute(question.anchor)}">Open this guide section ↗</a>
        </section>
      `;
    }

    const statusClass = currentFeedback.isCorrect ? "is-correct" : "is-wrong";
    const statusTitle = currentFeedback.isCorrect ? "Trail-ready answer" : "Review this before the trail";
    const icon = currentFeedback.isCorrect ? "✓" : "!";

    return `
      <section class="answer-feedback ${statusClass}" id="answer-feedback" tabindex="-1" aria-live="polite">
        <h2 class="feedback-title">
          <span class="feedback-icon" aria-hidden="true">${icon}</span>
          ${statusTitle}
        </h2>
        <p>${escapeHtml(question.explanation)}</p>
        ${currentFeedback.isCorrect ? "" : renderAnswerKey(question)}
        <a class="guide-deep-link" href="index.html#${escapeAttribute(question.anchor)}">Open this guide section ↗</a>
      </section>
    `;
  }

  function renderAnswerKey(question) {
    const answer = getAnswerSummary(question);
    if (!answer) return "";

    return `
      <p class="answer-key"><strong>Answer:</strong> ${escapeHtml(answer)}</p>
    `;
  }

  function collectResponse(question) {
    const form = document.querySelector("#question-form");

    if (["single", "identify"].includes(question.type)) {
      return form.querySelector('input[name="answer-option"]:checked')?.value || "";
    }

    if (question.type === "boolean") {
      const value = form.querySelector('input[name="answer-option"]:checked')?.value;
      return value === undefined ? null : value === "true";
    }

    if (question.type === "multi") {
      return [...form.querySelectorAll('input[name="answer-option"]:checked')].map((input) => input.value);
    }

    if (question.type === "order") {
      return [...question.displayItems];
    }

    if (question.type === "match") {
      return Object.fromEntries(
        [...form.querySelectorAll(".match-select")].map((select) => [select.dataset.term, select.value])
      );
    }

    if (question.type === "short") {
      return form.elements["short-answer"].value.trim();
    }

    if (question.type === "scenario") {
      return form.elements["scenario-answer"].value.trim();
    }

    return null;
  }

  function isResponseReady(question, response) {
    if (["single", "identify"].includes(question.type)) return Boolean(response);
    if (question.type === "boolean") return response !== null;
    if (question.type === "multi") return response.length > 0;
    if (question.type === "order") return response.length === question.answer.length;
    if (question.type === "match") return Object.values(response).length === question.pairs.length && Object.values(response).every(Boolean);
    if (question.type === "short") return response.length >= 1;
    if (question.type === "scenario") return response.length >= 12;
    return false;
  }

  function gradeResponse(question, response) {
    if (["single", "identify", "boolean"].includes(question.type)) {
      return response === question.answer;
    }

    if (question.type === "multi") {
      return sameSet(response, question.answer);
    }

    if (question.type === "order") {
      return arraysEqual(response, question.answer);
    }

    if (question.type === "match") {
      return question.pairs.every((pair) => response[pair.term] === pair.answer);
    }

    if (question.type === "short") {
      const normalized = normalizeAnswer(response);
      return question.keywords.every((group) => group.some((keyword) => containsKeyword(normalized, keyword)));
    }

    return false;
  }

  function recordAnswer(question, response, isCorrect) {
    currentAttempt.results.push({
      id: question.id,
      section: question.section,
      prompt: question.prompt,
      response,
      isCorrect
    });
  }

  function recordScenarioGrade(isCorrect) {
    if (!currentAttempt || !currentFeedback?.pendingScenario) return;
    const question = currentQuestion();
    recordAnswer(question, currentFeedback.response, isCorrect);
    currentFeedback = {
      response: currentFeedback.response,
      isCorrect
    };
    renderQuestion();
    focusFeedback();
  }

  function moveToNextQuestion() {
    if (!currentAttempt || !currentFeedback || currentFeedback.pendingScenario) return;

    if (currentAttempt.index >= currentAttempt.questions.length - 1) {
      completeAttempt();
      return;
    }

    currentAttempt.index += 1;
    currentFeedback = null;
    renderQuestion();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function moveOrderItem(index, delta) {
    if (!currentAttempt || currentFeedback) return;
    const question = currentQuestion();
    if (question.type !== "order") return;

    const nextIndex = index + delta;
    if (nextIndex < 0 || nextIndex >= question.displayItems.length) return;

    [question.displayItems[index], question.displayItems[nextIndex]] = [
      question.displayItems[nextIndex],
      question.displayItems[index]
    ];
    renderQuestion();

    const movedButton = document.querySelector(
      `[data-action="move-order"][data-index="${nextIndex}"][data-delta="${delta}"]`
    );
    movedButton?.focus();
  }

  function updateSubmitAvailability() {
    if (!currentAttempt || currentFeedback) return;
    const button = document.querySelector("#submit-answer");
    const form = document.querySelector("#question-form");
    if (!button || !form) return;

    button.disabled = !isResponseReady(currentQuestion(), collectResponse(currentQuestion()));
  }

  function completeAttempt() {
    if (!currentAttempt || currentAttempt.completed) return;
    currentAttempt.completed = true;

    const summary = summarizeAttempt(currentAttempt);
    updateProfile(summary);
    renderResults(summary);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function summarizeAttempt(attempt) {
    const total = attempt.results.length;
    const correct = attempt.results.filter((result) => result.isCorrect).length;
    const percent = total ? Math.round((correct / total) * 100) : 0;
    const bySection = {};

    attempt.sectionOrder.forEach((sectionId) => {
      const results = attempt.results.filter((result) => result.section === sectionId);
      if (!results.length) return;
      const sectionCorrect = results.filter((result) => result.isCorrect).length;
      bySection[sectionId] = {
        correct: sectionCorrect,
        total: results.length,
        percent: Math.round((sectionCorrect / results.length) * 100)
      };
    });

    return {
      total,
      correct,
      percent,
      bySection,
      missed: attempt.results.filter((result) => !result.isCorrect),
      completedAt: new Date().toISOString(),
      durationMinutes: Math.max(1, Math.round((Date.now() - attempt.startedAt) / 60000))
    };
  }

  function updateProfile(summary) {
    Object.entries(summary.bySection).forEach(([sectionId, sectionSummary]) => {
      const prior = profile.bestBySection[sectionId];
      profile.bestBySection[sectionId] = Number.isFinite(prior)
        ? Math.max(prior, sectionSummary.percent)
        : sectionSummary.percent;
    });

    const missed = new Set(profile.missedIds);
    currentAttempt.results.forEach((result) => {
      if (result.isCorrect) missed.delete(result.id);
      else missed.add(result.id);
    });
    profile.missedIds = [...missed];

    profile.history.unshift({
      completedAt: summary.completedAt,
      mode: currentAttempt.modeLabel,
      score: summary.percent,
      correct: summary.correct,
      total: summary.total
    });
    profile.history = profile.history.slice(0, 12);
    saveProfile();
  }

  function renderResults(summary) {
    const player = profile.playerName.trim();
    const verdict = getScoreVerdict(summary.percent);
    const sectionResults = Object.entries(summary.bySection)
      .map(([sectionId, result]) => {
        const section = getSection(sectionId);
        return `
          <article class="result-section" style="--result-color: ${section.color}">
            <span class="result-section-number">${section.number}</span>
            <div>
              <h3>${escapeHtml(section.title)}</h3>
              <p>${result.correct} of ${result.total} correct</p>
            </div>
            <strong>${result.percent}%</strong>
          </article>
        `;
      })
      .join("");

    const reviewItems = summary.missed
      .slice(0, 12)
      .map((miss) => {
        const section = getSection(miss.section);
        return `
          <li>
            <span>${section.number}</span>
            <p>${escapeHtml(miss.prompt)}</p>
          </li>
        `;
      })
      .join("");

    document.title = `${summary.percent}% · Section J Trail Knowledge Check`;

    app.innerHTML = `
      <section class="results-view">
        <header class="results-heading">
          <div>
            <p class="section-eyebrow">${escapeHtml(currentAttempt.modeLabel)} complete</p>
            <h1>${player ? `${escapeHtml(player)}, your` : "Your"} trail read is ${escapeHtml(verdict.title)}.</h1>
            <p>
              ${escapeHtml(verdict.copy)}
              You scored ${summary.correct} of ${summary.total} in ${summary.durationMinutes} minute${summary.durationMinutes === 1 ? "" : "s"}.
            </p>
          </div>
          <div class="score-orbit" style="--score: ${summary.percent}" aria-label="Score ${summary.percent} percent">
            <strong>${summary.percent}%</strong>
            <span>Overall</span>
          </div>
        </header>

        <div class="results-actions">
          <button class="primary-button" type="button" data-action="restart-attempt">Retry shuffled</button>
          <button class="secondary-button" type="button" data-action="return-home">Choose sections</button>
          <button class="ghost-button" type="button" data-action="copy-results">Copy result</button>
        </div>

        <div class="results-grid">
          ${sectionResults}
        </div>

        ${
          summary.missed.length
            ? `
              <section class="review-panel">
                <h2>${summary.missed.length} answer${summary.missed.length === 1 ? "" : "s"} added to review</h2>
                <p>They are now available from “Review missed” on the section dashboard.</p>
                <ul class="review-list">
                  ${reviewItems}
                </ul>
              </section>
            `
            : `
              <section class="review-panel">
                <h2>Clean pass</h2>
                <p>No questions from this attempt remain in review. Conditions still need a live pre-trip check.</p>
              </section>
            `
        }

        <footer class="quiz-footer">
          A quiz score is evidence of recall, not proof of field competence. Rehearse the scenarios with real maps,
          shelters, water systems and communication devices.
        </footer>
      </section>
    `;
  }

  async function copyResults(button) {
    if (!currentAttempt?.completed) return;
    const summary = summarizeAttempt(currentAttempt);
    const player = profile.playerName.trim() || "Hiker";
    const sectionLines = Object.entries(summary.bySection).map(([sectionId, result]) => {
      const section = getSection(sectionId);
      return `${section.shortTitle}: ${result.percent}% (${result.correct}/${result.total})`;
    });
    const text = [
      `${player} — PCT Section J Trail Knowledge Check`,
      `${currentAttempt.modeLabel}: ${summary.percent}% (${summary.correct}/${summary.total})`,
      ...sectionLines,
      "https://kush0511.github.io/pct-section-j-field-guide/quiz.html"
    ].join("\n");

    let copied = false;
    try {
      await navigator.clipboard.writeText(text);
      copied = true;
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      copied = document.execCommand("copy");
      textarea.remove();
    }

    button.textContent = copied ? "Copied" : "Copy failed";
    window.setTimeout(() => {
      button.textContent = "Copy result";
    }, 1600);
  }

  function focusFeedback() {
    window.requestAnimationFrame(() => {
      document.querySelector("#answer-feedback")?.focus?.();
      document.querySelector("#answer-feedback")?.scrollIntoView({ block: "nearest", behavior: "smooth" });
    });
  }

  function currentQuestion() {
    return currentAttempt.questions[currentAttempt.index];
  }

  function getSection(sectionId) {
    return data.sections.find((section) => section.id === sectionId);
  }

  function getModeLabel(config) {
    if (config.mode === "quick") return "Trail check";
    if (config.mode === "comprehensive") return "Comprehensive run";
    if (config.mode === "missed") return "Missed-question review";
    if (config.mode === "section") return getSection(config.sectionId)?.shortTitle || "Section practice";
    return "Practice";
  }

  function getScoreVerdict(percent) {
    if (percent >= 90) {
      return {
        title: "well rehearsed",
        copy: "Strong recall. Use the missed-question list, then prove the procedures in physical drills."
      };
    }
    if (percent >= 75) {
      return {
        title: "promising, not automatic",
        copy: "You have the shape of the route, but several decisions still need deliberate rehearsal."
      };
    }
    if (percent >= 60) {
      return {
        title: "not yet dependable",
        copy: "Too many field calls still depend on luck or recognition after the fact. Revisit the weakest stations."
      };
    }
    return {
      title: "a useful warning",
      copy: "This is exactly why the quiz exists. Work section by section before treating the knowledge as operational."
    };
  }

  function getAnswerSummary(question) {
    if (["single", "identify"].includes(question.type)) return question.answer;
    if (question.type === "boolean") return question.answer ? "True" : "False";
    if (question.type === "multi") return question.answer.join("; ");
    if (question.type === "order") return question.answer.map((item, index) => `${index + 1}. ${item}`).join(" → ");
    if (question.type === "match") return question.pairs.map((pair) => `${pair.term}: ${pair.answer}`).join("; ");
    if (question.type === "short") return question.acceptedAnswer;
    return "";
  }

  function optionMarker(index, isMulti) {
    if (isMulti) return "✓";
    return String.fromCharCode(65 + index);
  }

  function loadProfile() {
    const fallback = {
      playerName: "",
      bestBySection: {},
      missedIds: [],
      history: []
    };

    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (!stored || typeof stored !== "object") return fallback;
      return {
        playerName: typeof stored.playerName === "string" ? stored.playerName : "",
        bestBySection: stored.bestBySection && typeof stored.bestBySection === "object" ? stored.bestBySection : {},
        missedIds: Array.isArray(stored.missedIds) ? stored.missedIds.filter((id) => typeof id === "string") : [],
        history: Array.isArray(stored.history) ? stored.history : []
      };
    } catch {
      return fallback;
    }
  }

  function saveProfile() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch {
      // The quiz remains fully usable if storage is blocked.
    }
  }

  function validateQuestionBank(quizData) {
    const errors = [];
    if (!quizData || !Array.isArray(quizData.sections) || !Array.isArray(quizData.questions)) {
      return ["Quiz data is missing or malformed."];
    }

    const sectionIds = new Set(quizData.sections.map((section) => section.id));
    const questionIds = new Set();

    quizData.questions.forEach((question) => {
      if (!question.id || questionIds.has(question.id)) errors.push(`Duplicate or missing question id: ${question.id || "unknown"}`);
      questionIds.add(question.id);
      if (!sectionIds.has(question.section)) errors.push(`Unknown section for ${question.id}`);
      if (!TYPE_LABELS[question.type]) errors.push(`Unknown question type for ${question.id}`);
      if (!question.prompt || !question.explanation || !question.anchor) errors.push(`Missing core content for ${question.id}`);
      if (question.type === "scenario" && (!question.modelAnswer || !question.rubric?.length)) {
        errors.push(`Scenario rubric missing for ${question.id}`);
      }
    });

    quizData.sections.forEach((section) => {
      if (!quizData.questions.some((question) => question.section === section.id)) {
        errors.push(`Section has no questions: ${section.id}`);
      }
    });

    return errors;
  }

  function renderFatalError(errors) {
    app.innerHTML = `
      <section class="results-view">
        <div class="review-panel">
          <h1>Quiz deck could not load</h1>
          <p>${escapeHtml(errors.join(" "))}</p>
          <p><a href="index.html">Return to the field guide</a></p>
        </div>
      </section>
    `;
  }

  function shuffle(items) {
    const result = [...items];
    for (let index = result.length - 1; index > 0; index -= 1) {
      const swapIndex = randomIndex(index + 1);
      [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
    }
    return result;
  }

  function shuffledNotEqual(items, answer) {
    let result = shuffle(items);
    if (result.length > 1 && arraysEqual(result, answer)) {
      result = [...result.slice(1), result[0]];
    }
    return result;
  }

  function randomIndex(max) {
    if (window.crypto?.getRandomValues) {
      const values = new Uint32Array(1);
      window.crypto.getRandomValues(values);
      return values[0] % max;
    }
    return Math.floor(Math.random() * max);
  }

  function clone(value) {
    if (typeof structuredClone === "function") return structuredClone(value);
    return JSON.parse(JSON.stringify(value));
  }

  function arraysEqual(left, right) {
    return left.length === right.length && left.every((value, index) => value === right[index]);
  }

  function sameSet(left, right) {
    if (left.length !== right.length) return false;
    const rightSet = new Set(right);
    return left.every((value) => rightSet.has(value));
  }

  function normalizeAnswer(value) {
    return String(value)
      .toLowerCase()
      .replace(/[’']/g, "")
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
  }

  function containsKeyword(normalizedAnswer, rawKeyword) {
    const keyword = normalizeAnswer(rawKeyword);
    if (!keyword) return false;
    const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp(`(?:^|\\s)${escaped}(?:$|\\s)`).test(normalizedAnswer);
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function escapeAttribute(value) {
    return escapeHtml(value);
  }
})();
