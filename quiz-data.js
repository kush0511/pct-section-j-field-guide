(() => {
  "use strict";

  const sections = [
    {
      id: "route-terrain",
      number: "01",
      title: "Route & terrain recognition",
      shortTitle: "Route & terrain",
      description: "Read the southbound story, terrain shape, and high-consequence landmarks before they surprise you.",
      color: "#e2b75d",
      anchor: "the-route-story"
    },
    {
      id: "navigation",
      number: "02",
      title: "Navigation & junction discipline",
      shortTitle: "Navigation",
      description: "Prove that the group can locate itself, make a junction call, and stop uncertainty from becoming distance.",
      color: "#8fc8da",
      anchor: "navigation-system"
    },
    {
      id: "weather-fire",
      number: "03",
      title: "Weather, smoke, fire & snow",
      shortTitle: "Weather & fire",
      description: "Translate forecasts and field signs into early action around exposure, smoke, lightning, fire, and ice.",
      color: "#cf725f",
      anchor: "weather-threat-model-for-6-12-september"
    },
    {
      id: "water-crossings",
      number: "04",
      title: "Water, hygiene & crossings",
      shortTitle: "Water & crossings",
      description: "Select and treat water, prevent cross-contamination, and make river decisions from shore.",
      color: "#7fc4d8",
      anchor: "water-and-lakes"
    },
    {
      id: "campcraft",
      number: "05",
      title: "Camp selection & daily systems",
      shortTitle: "Campcraft",
      description: "Choose a safe, durable site and run evening and morning systems before weather or darkness takes over.",
      color: "#98bf86",
      anchor: "campcraft"
    },
    {
      id: "food-storage",
      number: "06",
      title: "Food storage & clean camp",
      shortTitle: "Food storage",
      description: "Use canisters and the PCT toggle hang correctly, manage smellables, and keep the sleeping area out of the kitchen.",
      color: "#d6a96f",
      anchor: "food-storage-and-camp-kitchen"
    },
    {
      id: "wildlife",
      number: "07",
      title: "Wildlife, plants & bites",
      shortTitle: "Wildlife",
      description: "Respond differently to bears, cougars, goats, snakes, ticks, stings, and irritant plants.",
      color: "#d88ba6",
      anchor: "wildlife-plants-and-small-hazards"
    },
    {
      id: "medical",
      number: "08",
      title: "Medical recognition & response",
      shortTitle: "Medical",
      description: "Recognize the point where a small problem becomes an evacuation or SOS problem.",
      color: "#e58d77",
      anchor: "first-aid-and-medical-emergencies"
    },
    {
      id: "comms-group",
      number: "09",
      title: "Communication & group operations",
      shortTitle: "Comms & group",
      description: "Keep the group intact, send useful messages, and apply the overdue and SOS ladder without improvising.",
      color: "#a6b8e0",
      anchor: "power-and-satellite-communication"
    },
    {
      id: "route-gates",
      number: "10",
      title: "Section J decision gates",
      shortTitle: "Decision gates",
      description: "Apply the Waptus, Circle, Escondido, Spectacle, and hard no-go rules to the actual route.",
      color: "#f0c86d",
      anchor: "decision-gates"
    }
  ];

  const questions = [
    {
      id: "route-01",
      section: "route-terrain",
      type: "order",
      prompt: "Put the four southbound route acts in the order you encounter them.",
      items: [
        "Northern lake country from Stevens Pass",
        "Cathedral and Waptus transition",
        "Spade, Venus, Escondido and Spectacle chapter",
        "Chikamin / Four Brothers, Ridge and Gravel Lakes, Kendall, then Snoqualmie"
      ],
      answer: [
        "Northern lake country from Stevens Pass",
        "Cathedral and Waptus transition",
        "Spade, Venus, Escondido and Spectacle chapter",
        "Chikamin / Four Brothers, Ridge and Gravel Lakes, Kendall, then Snoqualmie"
      ],
      explanation: "The route repeatedly climbs, descends, and climbs again. Knowing the four-act story gives you catch features and prevents the last high traverse from feeling like an unexpected extra day.",
      anchor: "the-route-story"
    },
    {
      id: "route-02",
      section: "route-terrain",
      type: "match",
      prompt: "Match each terrain feature to the field implication it should trigger.",
      pairs: [
        { term: "Tight contour lines", answer: "Steep ground: shorten steps, slow down, and use poles" },
        { term: "Saddle or pass", answer: "Wind and weather gate: layer and confirm the next drainage" },
        { term: "Lake basin", answer: "Cold-air and condensation trap: choose a durable site and protect dry layers" },
        { term: "Creek drainage", answer: "Water and navigation handrail: verify which drainage you are following" }
      ],
      explanation: "Terrain is not scenery alone. Contours, saddles, basins, and drainages tell you how quickly the group can move and what can go wrong next.",
      anchor: "how-to-read-the-terrain-before-it-reads-you"
    },
    {
      id: "route-03",
      section: "route-terrain",
      type: "multi",
      prompt: "Which features belong to the high, exposed final route after Spectacle Lake?",
      choices: [
        "Chikamin / Four Brothers high traverse",
        "Ridge and Gravel Lakes",
        "Kendall Katwalk",
        "The long descent to Snoqualmie Pass",
        "Waptus Lake",
        "Cathedral Pass meadow"
      ],
      answer: [
        "Chikamin / Four Brothers high traverse",
        "Ridge and Gravel Lakes",
        "Kendall Katwalk",
        "The long descent to Snoqualmie Pass"
      ],
      explanation: "Spectacle is not the finish. The final day climbs back into high rocky terrain before Kendall and the long descent.",
      anchor: "day-7-saturday-12-september-spectacle-lake-to-snoqualmie-pass"
    },
    {
      id: "route-04",
      section: "route-terrain",
      type: "identify",
      prompt: "What does this terrain tell you about your position and mindset?",
      media: {
        src: "assets/images/section-j-kendall.jpg",
        alt: "Rocky exposed trail near Kendall Katwalk",
        caption: "A route landmark should trigger a decision, not just recognition."
      },
      choices: [
        "You are in the final high-traverse chapter; keep layers, water, food and attention available",
        "You have reached Waptus and can relax because the route is nearly finished",
        "You are at Circle Lake and should leave the maintained trail",
        "You are at a low, sheltered camp where weather no longer matters"
      ],
      answer: "You are in the final high-traverse chapter; keep layers, water, food and attention available",
      explanation: "Kendall terrain arrives late, when people are tempted to mentally finish. It remains rocky, airy mountain travel until the road and pickup are safely reached.",
      anchor: "elevation-and-terrain"
    },
    {
      id: "route-05",
      section: "route-terrain",
      type: "short",
      prompt: "On a topo map, which direction do V-shaped contour bends usually point in a drainage?",
      keywords: [["upstream", "up stream"]],
      acceptedAnswer: "Upstream.",
      explanation: "The point of the V generally aims upstream. This helps identify drainage direction when the landscape and map need to agree.",
      anchor: "map-reading-the-terrain-grammar"
    },
    {
      id: "route-06",
      section: "route-terrain",
      type: "boolean",
      prompt: "Reaching the lower Waptus basin means the major route hazards are behind you.",
      answer: false,
      explanation: "False. Waptus feels like a reset, but it sits before the steep Spade/Venus decision and the route-critical bridge/ford gate.",
      anchor: "the-route-story"
    },
    {
      id: "route-07",
      section: "route-terrain",
      type: "scenario",
      prompt: "Cloud drops onto a pass and the next drainage is no longer obvious. Talk through your field response before moving.",
      rubric: [
        "Stop the group and shorten spacing",
        "Layer before anyone becomes cold",
        "Orient the map and confirm the intended next drainage or feature",
        "Cross-check digital and paper navigation rather than following the person ahead",
        "Descend, hold, or backtrack if the route cannot be confirmed safely"
      ],
      modelAnswer: "Stop together, add layers, orient the map, name the next drainage and a wrong-way clue, then cross-check it on both navigation systems. Move feature by feature only if the route is clear; otherwise hold, backtrack, or descend safely.",
      explanation: "A pass is a weather gate and a navigation checkpoint. Continuing on group momentum is how uncertainty becomes distance.",
      anchor: "junction-discipline"
    },
    {
      id: "route-08",
      section: "route-terrain",
      type: "single",
      prompt: "Which named side trip is off-trail, unmarked, steep and excluded from the novice baseline?",
      choices: ["Circle Lake", "Spectacle Lake", "Waptus Lake", "Ridge Lake"],
      answer: "Circle Lake",
      explanation: "Circle is not simply another signed lake spur. It requires a redesigned trip with off-trail leadership, a vetted line, clear dry conditions, and surplus daylight.",
      anchor: "baseline-versus-ambition"
    },

    {
      id: "nav-01",
      section: "navigation",
      type: "order",
      prompt: "Put the lost-but-not-yet-in-trouble protocol in order.",
      items: [
        "Stop the group",
        "Think back to the last certain location and elapsed time",
        "Observe terrain, slope, water, trail signs, GPS and map",
        "Plan one action: backtrack, use a catch feature, or stay and communicate",
        "Mark the waypoint, time or location before moving again"
      ],
      answer: [
        "Stop the group",
        "Think back to the last certain location and elapsed time",
        "Observe terrain, slope, water, trail signs, GPS and map",
        "Plan one action: backtrack, use a catch feature, or stay and communicate",
        "Mark the waypoint, time or location before moving again"
      ],
      explanation: "The sequence breaks the habit of walking while uncertain. Marking the decision prevents the next move from erasing the last useful evidence.",
      anchor: "the-lost-but-not-yet-in-trouble-protocol"
    },
    {
      id: "nav-02",
      section: "navigation",
      type: "match",
      prompt: "Match each navigation concept to its practical meaning.",
      pairs: [
        { term: "Handrail", answer: "A linear feature you can follow, such as trail, ridge or drainage" },
        { term: "Catch feature", answer: "A clear feature that tells you when you have gone too far" },
        { term: "Attack point", answer: "An obvious place near a harder-to-find target" },
        { term: "Last known point", answer: "The most recent place where location was certain" }
      ],
      explanation: "These concepts turn an abstract map into concrete decisions: what to follow, what stops you, where to begin a fine search, and where to backtrack.",
      anchor: "navigation-concepts-that-save-time"
    },
    {
      id: "nav-03",
      section: "navigation",
      type: "multi",
      prompt: "What must a real offline-navigation test prove before the trip?",
      choices: [
        "The phone was restarted before testing",
        "Airplane mode is enabled",
        "Route, topo detail, waypoints and location still render",
        "The app can zoom into the whole Section J corridor",
        "A cached marketing screen opens",
        "Cellular bars are visible"
      ],
      answer: [
        "The phone was restarted before testing",
        "Airplane mode is enabled",
        "Route, topo detail, waypoints and location still render",
        "The app can zoom into the whole Section J corridor"
      ],
      explanation: "Opening an app once at home is not an offline test. Saved routes, background tiles, and waypoints are separate failure points.",
      anchor: "app-download-details"
    },
    {
      id: "nav-04",
      section: "navigation",
      type: "scenario",
      prompt: "The group reaches an unsigned-looking junction while talking and the lead hiker starts drifting through it. What should happen?",
      rubric: [
        "Call the group to a stop before entering the intersection",
        "Identify the sign, trail name/number or mapped junction",
        "State the intended direction and next terrain feature aloud",
        "Name a wrong-way clue",
        "Confirm digitally and use the paper map for the major decision before moving"
      ],
      modelAnswer: "Stop everyone before the intersection. Identify the junction, say the intended direction and next feature, name what would prove the choice wrong, and confirm it on the digital map and paper map before anyone leaves.",
      explanation: "A junction is a decision point, not a place to follow the loudest or fastest person.",
      anchor: "junction-discipline"
    },
    {
      id: "nav-05",
      section: "navigation",
      type: "short",
      prompt: "Your body says you are climbing, but the map says this leg should descend. What is the immediate action?",
      keywords: [["stop"], ["resolve", "check", "reconcile", "confirm"]],
      acceptedAnswer: "Stop and resolve the mismatch before continuing.",
      explanation: "Do not walk farther to see whether the map eventually agrees. Terrain-map disagreement is an early warning.",
      anchor: "map-reading-the-terrain-grammar"
    },
    {
      id: "nav-06",
      section: "navigation",
      type: "boolean",
      prompt: "A phone can receive GPS position in airplane mode, but the app still needs its map tiles and route data downloaded.",
      answer: true,
      explanation: "True. GPS reception and stored map content are different systems. A blue dot on a blank screen is not a navigation plan.",
      anchor: "app-download-details"
    },
    {
      id: "nav-07",
      section: "navigation",
      type: "multi",
      prompt: "Visibility drops sharply. Which navigation habits become more important immediately?",
      choices: [
        "Shorten spacing between hikers",
        "Confirm progress one feature at a time",
        "Keep visual or voice contact",
        "Use back bearings or the last known point if retreat may be needed",
        "Let the fastest hiker scout alone",
        "Follow footprints without checking the map"
      ],
      answer: [
        "Shorten spacing between hikers",
        "Confirm progress one feature at a time",
        "Keep visual or voice contact",
        "Use back bearings or the last known point if retreat may be needed"
      ],
      explanation: "Poor visibility removes distant clues and makes separation much harder to repair. The group should compress and navigate feature by feature.",
      anchor: "the-five-navigation-habits"
    },
    {
      id: "nav-08",
      section: "navigation",
      type: "single",
      prompt: "What should you do with magnetic declination for this trip?",
      choices: [
        "Check the current value near print time, set or note it, and practice with it",
        "Ignore it because the PCT is a marked trail",
        "Memorize any Washington value found in an old trip report",
        "Apply declination only after becoming lost"
      ],
      answer: "Check the current value near print time, set or note it, and practice with it",
      explanation: "Washington declination is large enough to matter. The safe habit is current value, written evidence, and pre-trip practice—not memorizing a stale number.",
      anchor: "compass-basics-for-this-trip"
    },

    {
      id: "weather-01",
      section: "weather-fire",
      type: "match",
      prompt: "Match the forecast phrase to the trail consequence it should trigger.",
      pairs: [
        { term: "Chance of showers", answer: "Defend dry sleep insulation and expect prolonged wet brush or rain" },
        { term: "Mostly cloudy", answer: "Assume less drying, colder breaks and unreliable solar charging" },
        { term: "Wind 25–40 km/h", answer: "Seek lower or terrain-protected camp and stake for stronger overnight wind" },
        { term: "Snow level near route elevation", answer: "Expect hidden tread and slick rock; cancel or require snow skills beyond normal hiking" }
      ],
      explanation: "Forecast language is translated into operational consequences, not treated as a promise about a pass or basin.",
      anchor: "weather-masterclass-what-the-forecast-is-really-telling-you"
    },
    {
      id: "weather-02",
      section: "weather-fire",
      type: "order",
      prompt: "Put this cold-rain response in the best operational order.",
      items: [
        "Put on the shell before base layers soak",
        "Protect one dry warm layer for camp",
        "Keep eating and keep gloves accessible while shortening breaks",
        "At camp, secure shelter first",
        "Change into dry layers, then make hot food if safe"
      ],
      answer: [
        "Put on the shell before base layers soak",
        "Protect one dry warm layer for camp",
        "Keep eating and keep gloves accessible while shortening breaks",
        "At camp, secure shelter first",
        "Change into dry layers, then make hot food if safe"
      ],
      explanation: "Cold-rain emergencies are prevented before hands and judgment fail. Shelter and dry insulation outrank cooking.",
      anchor: "cold-rain-protocol"
    },
    {
      id: "weather-03",
      section: "weather-fire",
      type: "multi",
      prompt: "Thunder is audible while you are near exposed terrain. Which actions belong in the lightning protocol?",
      choices: [
        "Leave passes, ridges, isolated high points and exposed lake shores",
        "Spread out slightly while keeping visual contact",
        "Avoid lone trees, upright poles and shallow caves",
        "Descend to lower, more uniform terrain if it is safe",
        "Wait 30 minutes after the last thunder before exposed travel",
        "Shelter under the tallest isolated tree"
      ],
      answer: [
        "Leave passes, ridges, isolated high points and exposed lake shores",
        "Spread out slightly while keeping visual contact",
        "Avoid lone trees, upright poles and shallow caves",
        "Descend to lower, more uniform terrain if it is safe",
        "Wait 30 minutes after the last thunder before exposed travel"
      ],
      explanation: "You are already in the lightning decision zone once thunder is heard. Do not wait for a dramatic strike on the ridge.",
      anchor: "lightning-protocol"
    },
    {
      id: "weather-04",
      section: "weather-fire",
      type: "short",
      prompt: "How long after the last thunder should you wait before resuming exposed travel?",
      keywords: [["30", "thirty"], ["minute", "min"]],
      acceptedAnswer: "30 minutes.",
      explanation: "The guide uses the 30-minute rule after the last thunder before returning to exposed travel.",
      anchor: "lightning-protocol"
    },
    {
      id: "weather-05",
      section: "weather-fire",
      type: "single",
      prompt: "The regional AQI is 165 and the trend is worsening. What is the guide’s start decision?",
      choices: [
        "Do not start; 151–200 is unhealthy for everyone",
        "Start but walk faster through the smoke",
        "Start if everyone carries an N95",
        "Start because AQI only matters above 200"
      ],
      answer: "Do not start; 151–200 is unhealthy for everyone",
      explanation: "An N95 may reduce particles but does not make a remote smoky traverse safe. Personal medical thresholds may be lower.",
      anchor: "smoke-protocol"
    },
    {
      id: "weather-06",
      section: "weather-fire",
      type: "scenario",
      prompt: "You see a fresh smoke plume, falling ash, and flame in a drainage ahead. Give your first field actions.",
      rubric: [
        "Stop and locate the group, fire or plume, wind, terrain and two escape directions",
        "Do not climb above the fire or enter a saddle, narrow drainage or fuel-filled chute",
        "Move toward clearly safer sparse-fuel terrain only when the route is safer",
        "Contact 911/SOS with coordinates, observations, direction, group condition and time",
        "Make the group visible and never build a signal fire"
      ],
      modelAnswer: "Stop and orient: fire, wind, terrain, and two exits. Avoid moving uphill above the fire or into chutes and saddles. Move only toward clearly safer sparse fuel, contact 911/SOS with a complete report, make the group visible, and do not light a signal fire.",
      explanation: "Smoke exposure and active fire are different problems. Fire can accelerate uphill and outrun a hiker.",
      anchor: "active-wildfire-protocol"
    },
    {
      id: "weather-07",
      section: "weather-fire",
      type: "boolean",
      prompt: "A blank or out-of-season avalanche forecast means the high traverses are clear enough to proceed.",
      answer: false,
      explanation: "False. A blank forecast is not evidence. Use recent reports, freezing and snow levels, land-manager conditions, and actual snow-travel competence.",
      anchor: "snow-and-ice-gate"
    },
    {
      id: "weather-08",
      section: "weather-fire",
      type: "multi",
      prompt: "Under the guide’s dated 2026 fire-order snapshot, which statements are correct?",
      choices: [
        "No campfires, charcoal or wood-burning stoves",
        "A currently legal shutoff stove requires a site cleared of flammables for at least 3 ft",
        "Fire is not the group’s emergency warmth system",
        "A signal fire is prohibited as a planned rescue method",
        "One small wood fire at Waptus is acceptable",
        "An old trip report overrides a current agency order"
      ],
      answer: [
        "No campfires, charcoal or wood-burning stoves",
        "A currently legal shutoff stove requires a site cleared of flammables for at least 3 ft",
        "Fire is not the group’s emergency warmth system",
        "A signal fire is prohibited as a planned rescue method"
      ],
      explanation: "This is dated guidance and must be rechecked, but the operational lesson endures: current orders beat anecdotes, and shelter/dry insulation—not fire—are the warmth system.",
      anchor: "current-2026-fire-orders"
    },

    {
      id: "water-01",
      section: "water-crossings",
      type: "multi",
      prompt: "Which source signs mean ordinary filtering, tablets or boiling cannot make the water acceptable?",
      choices: [
        "Chemical smell or sheen",
        "Known fuel or mine runoff",
        "Dense surface scum or algae",
        "Cold, clear flow above camps",
        "A clear lake outlet",
        "A source that looks visually pristine"
      ],
      answer: [
        "Chemical smell or sheen",
        "Known fuel or mine runoff",
        "Dense surface scum or algae"
      ],
      explanation: "Common trail treatments target pathogens, not chemical pollution or cyanotoxins. Source rejection is part of treatment.",
      anchor: "choosing-a-source"
    },
    {
      id: "water-02",
      section: "water-crossings",
      type: "order",
      prompt: "Put the squeeze-filter workflow in order.",
      items: [
        "Fill the dirty container from the best available source",
        "Keep dirty threads away from the clean bottle mouth",
        "Attach the filter to the dirty container",
        "Squeeze into a clean bottle or drink from the clean end",
        "Backflush when flow slows"
      ],
      answer: [
        "Fill the dirty container from the best available source",
        "Keep dirty threads away from the clean bottle mouth",
        "Attach the filter to the dirty container",
        "Squeeze into a clean bottle or drink from the clean end",
        "Backflush when flow slows"
      ],
      explanation: "Treatment fails when dirty water reaches the clean threads or bottle. The procedure protects the clean side as deliberately as it filters.",
      anchor: "squeeze-filter-procedure"
    },
    {
      id: "water-03",
      section: "water-crossings",
      type: "match",
      prompt: "Match each filter failure to the correct response.",
      pairs: [
        { term: "Filter may have frozen", answer: "Treat it as unreliable and switch to backup treatment" },
        { term: "Flow has slowed to a trickle", answer: "Backflush and avoid sediment" },
        { term: "Dirty water touched clean threads", answer: "Clean or treat the contaminated contact point before use" },
        { term: "Dirty bag has a pinhole", answer: "Use the backup dirty container or compatible bottle threads" }
      ],
      explanation: "A frozen hollow-fiber filter can look normal while failing. Visual appearance is not proof of integrity.",
      anchor: "filter-failure-modes"
    },
    {
      id: "water-04",
      section: "water-crossings",
      type: "scenario",
      prompt: "At an unbridged creek, the runout contains logs and boulders, one hiker is frightened, and the last person could not return safely. Make the call.",
      rubric: [
        "Do not begin the crossing",
        "Scout upstream and downstream from shore for a genuinely safer option",
        "Treat bad runout, fear and no guaranteed retreat as stop conditions",
        "Turn around, wait only from a safe camp with margin, or use the verified alternative",
        "Do not let schedule pressure redefine safety"
      ],
      modelAnswer: "Do not cross. Scout from shore, but the bad runout, frightened hiker, and lack of a guaranteed return already fail the group standard. Turn around, hold safely with margin, or use the verified alternative.",
      explanation: "The crossing decision is made from shore. Turning around is an expert outcome, not a failed attempt.",
      anchor: "stream-and-river-crossings"
    },
    {
      id: "water-05",
      section: "water-crossings",
      type: "multi",
      prompt: "If an unbridged crossing is judged suitable, which techniques belong in the guide?",
      choices: [
        "Keep footwear on",
        "Unbuckle hip belt and sternum strap",
        "Face upstream with three points of contact",
        "Use small shuffling steps without crossing the legs",
        "Cross one at a time unless trained in a recognized team method",
        "Tie an improvised rope around the first hiker"
      ],
      answer: [
        "Keep footwear on",
        "Unbuckle hip belt and sternum strap",
        "Face upstream with three points of contact",
        "Use small shuffling steps without crossing the legs",
        "Cross one at a time unless trained in a recognized team method"
      ],
      explanation: "Ropes can pin or drown untrained users. Poles and technique help only after the water and runout have passed the shore-based decision.",
      anchor: "stream-and-river-crossings"
    },
    {
      id: "water-06",
      section: "water-crossings",
      type: "boolean",
      prompt: "A crossing below knee height is universally safe for the group.",
      answer: false,
      explanation: "False. Speed, footing, runout, temperature, fear, body size and retreat all matter. There is no universal knee-depth rule.",
      anchor: "stream-and-river-crossings"
    },
    {
      id: "water-07",
      section: "water-crossings",
      type: "multi",
      prompt: "Which hygiene practices reduce the chance that treated water is followed by a GI outbreak?",
      choices: [
        "Use soap and water after toileting and before shared food when practical",
        "Keep washing and graywater at least 200 ft from natural water",
        "Treat sanitizer as useful but less reliable against norovirus",
        "Separate toilet and dirty-water gear from clean bottle mouths",
        "Share one snack bag down a line of dirty hands",
        "Let the sick hiker prepare communal food"
      ],
      answer: [
        "Use soap and water after toileting and before shared food when practical",
        "Keep washing and graywater at least 200 ft from natural water",
        "Treat sanitizer as useful but less reliable against norovirus",
        "Separate toilet and dirty-water gear from clean bottle mouths"
      ],
      explanation: "Water treatment does not stop fecal-hand-food transmission. Norovirus control depends heavily on hand and utensil discipline.",
      anchor: "hand-hygiene-and-gi-prevention"
    },
    {
      id: "water-08",
      section: "water-crossings",
      type: "scenario",
      prompt: "A hiker is swept off their feet during a crossing. What should they and the group prioritize?",
      rubric: [
        "Protect the airway and orient feet downstream defensively",
        "Work toward shore rather than standing abruptly in current",
        "Release the pack if it is pulling the person under or trapping them",
        "Treat injury and cold exposure immediately after exit",
        "Communicate and reassess the route rather than continuing by momentum"
      ],
      modelAnswer: "Protect the airway, float defensively with feet downstream, and work toward shore. Release the pack if it drags or traps. Once out, treat trauma and cold immediately, communicate, and stop the route decision.",
      explanation: "The incident does not end when the person reaches shore. Cold exposure, injury and a now-failed route demand a full reset.",
      anchor: "stream-and-river-crossings"
    },

    {
      id: "camp-01",
      section: "campcraft",
      type: "order",
      prompt: "Put the initial campsite-selection sequence in order.",
      items: [
        "Stop while there is enough light to choose",
        "Put on a layer before cooling",
        "Identify a durable tent area",
        "Look up for limbs, down for drainage, and around for wind",
        "Pitch and stake for overnight weather",
        "Begin kitchen tasks only after shelter is secure"
      ],
      answer: [
        "Stop while there is enough light to choose",
        "Put on a layer before cooling",
        "Identify a durable tent area",
        "Look up for limbs, down for drainage, and around for wind",
        "Pitch and stake for overnight weather",
        "Begin kitchen tasks only after shelter is secure"
      ],
      explanation: "The camp sequence protects judgment, warmth and dry sleep before cooking becomes the focus.",
      anchor: "campsite-selection"
    },
    {
      id: "camp-02",
      section: "campcraft",
      type: "multi",
      prompt: "Which places should be rejected as tent sites?",
      choices: [
        "Fragile meadow or heather",
        "Lake edge or stream bank",
        "Dry drainage channel",
        "Below dead limbs or in a rockfall zone",
        "Exposed ridge in building wind",
        "Signed restoration area or inside the Escondido Tarns buffer",
        "An established durable site outside restrictions"
      ],
      answer: [
        "Fragile meadow or heather",
        "Lake edge or stream bank",
        "Dry drainage channel",
        "Below dead limbs or in a rockfall zone",
        "Exposed ridge in building wind",
        "Signed restoration area or inside the Escondido Tarns buffer"
      ],
      explanation: "The field standard is safe, durable and boring before scenic. A flattened pad does not override restoration or no-camping rules.",
      anchor: "campsite-selection"
    },
    {
      id: "camp-03",
      section: "campcraft",
      type: "order",
      prompt: "Put the core evening system in order.",
      items: [
        "Layer before chilling",
        "Secure shelter",
        "Treat water",
        "Prepare and eat food",
        "Inspect and care for feet",
        "Check map and weather",
        "Store food and all smellables",
        "Arrange headlamp, rain gear and night footwear"
      ],
      answer: [
        "Layer before chilling",
        "Secure shelter",
        "Treat water",
        "Prepare and eat food",
        "Inspect and care for feet",
        "Check map and weather",
        "Store food and all smellables",
        "Arrange headlamp, rain gear and night footwear"
      ],
      explanation: "A repeatable order reduces forgotten tasks when people are wet, tired or distracted by the view.",
      anchor: "evening-system"
    },
    {
      id: "camp-04",
      section: "campcraft",
      type: "order",
      prompt: "Put the key morning actions in a safe sequence.",
      items: [
        "Wake and check weather",
        "Start water and breakfast",
        "Waterproof sleeping insulation before opening the shelter widely",
        "Eat and drink",
        "Take down shelter",
        "Place snacks, shell, gloves, navigation and water within reach",
        "Sweep for trash, stakes and food scraps",
        "Name the first three route features"
      ],
      answer: [
        "Wake and check weather",
        "Start water and breakfast",
        "Waterproof sleeping insulation before opening the shelter widely",
        "Eat and drink",
        "Take down shelter",
        "Place snacks, shell, gloves, navigation and water within reach",
        "Sweep for trash, stakes and food scraps",
        "Name the first three route features"
      ],
      explanation: "Dry insulation is protected early, while the final route call and camp sweep happen before walking.",
      anchor: "morning-system"
    },
    {
      id: "camp-05",
      section: "campcraft",
      type: "scenario",
      prompt: "You reach camp as cloud builds and temperature drops. One person wants dinner first. Make the camp call.",
      rubric: [
        "Put on a layer before chilling",
        "Choose a durable site with drainage, overhead and wind checks",
        "Pitch and stake shelter before cooking",
        "Protect dry sleep insulation",
        "Then treat water and cook away from the tent"
      ],
      modelAnswer: "Layer immediately, select a durable protected site, inspect overhead and drainage, and secure the shelter for overnight weather. Protect dry insulation; only then treat water and cook away from the tent.",
      explanation: "Dinner is recoverable after a delay. A soaked sleep system or failed shelter can end the trip.",
      anchor: "campcraft"
    },
    {
      id: "camp-06",
      section: "campcraft",
      type: "short",
      prompt: "Where soil and rules allow a cathole, state both the approximate depth and minimum separation from water, trail and camp.",
      keywords: [
        ["15", "20", "six", "6", "eight", "8"],
        ["60", "200", "two hundred"]
      ],
      acceptedAnswer: "About 15–20 cm (6–8 in) deep and at least 60 m / 200 ft away.",
      explanation: "Thin rocky ground, fragile high-use basins, restoration areas or local rules may instead require packing feces out.",
      anchor: "campcraft"
    },
    {
      id: "camp-07",
      section: "campcraft",
      type: "boolean",
      prompt: "A flattened tent pad inside a signed restoration area is usable because someone has already camped there.",
      answer: false,
      explanation: "False. Restoration and no-camping postings remain controlling even when prior misuse created a visible pad.",
      anchor: "campsite-selection"
    },
    {
      id: "camp-08",
      section: "campcraft",
      type: "match",
      prompt: "Match each campsite clue to the hazard it signals.",
      pairs: [
        { term: "Dead tree or hanging limb", answer: "Falling-object hazard" },
        { term: "Dry creek bed or drainage", answer: "Water collection or flash-flow path" },
        { term: "Low lake-basin depression", answer: "Cold-air and condensation pooling" },
        { term: "Exposed ridgeline", answer: "Wind, weather and lightning exposure" }
      ],
      explanation: "Looking up, down and around catches hazards that a flat patch of ground alone cannot reveal.",
      anchor: "campsite-selection"
    },

    {
      id: "storage-01",
      section: "food-storage",
      type: "identify",
      prompt: "In this PCT toggle hang, what is the stick doing at the carabiner?",
      media: {
        src: "assets/images/pct-bear-hang-diagram.svg",
        alt: "PCT toggle bear-hang diagram with branch, cord, carabiner, stick toggle and food bag",
        caption: "Read the mechanism and final geometry, not just the knot."
      },
      mediaClass: "is-diagram",
      choices: [
        "It jams against the carabiner so no load-bearing cord must be tied to the trunk",
        "It props the branch up so the bag cannot sag",
        "It anchors the food bag directly to the trunk",
        "It marks the location for animals and other hikers"
      ],
      answer: "It jams against the carabiner so no load-bearing cord must be tied to the trunk",
      explanation: "The toggle is the defining move: the stick catches at the carabiner while the free cord remains retrievable without a load-bearing trunk tie.",
      anchor: "the-pct-bear-hang-method"
    },
    {
      id: "storage-02",
      section: "food-storage",
      type: "order",
      prompt: "Put the core PCT toggle-hang actions in order.",
      items: [
        "Inspect a strong live branch and verify that final clearance is possible",
        "Throw a weighted line from a clear zone and run the cord over the branch",
        "Clip the bag to the carabiner, pass the free cord through it, and raise the bag",
        "Tie a clove hitch around a smooth stick in the free end",
        "Release slowly until the toggle catches at the carabiner",
        "Measure the entire loaded bag’s final clearance and coil the free cord"
      ],
      answer: [
        "Inspect a strong live branch and verify that final clearance is possible",
        "Throw a weighted line from a clear zone and run the cord over the branch",
        "Clip the bag to the carabiner, pass the free cord through it, and raise the bag",
        "Tie a clove hitch around a smooth stick in the free end",
        "Release slowly until the toggle catches at the carabiner",
        "Measure the entire loaded bag’s final clearance and coil the free cord"
      ],
      explanation: "The final loaded geometry is the test. A good knot attached to a bad branch or a sagging bag is still a failed hang.",
      anchor: "the-pct-bear-hang-method"
    },
    {
      id: "storage-03",
      section: "food-storage",
      type: "short",
      prompt: "What conservative height and horizontal clearance should the loaded PCT hang target?",
      keywords: [
        ["12", "twelve"],
        ["6", "six"],
        ["foot", "feet", "ft"]
      ],
      acceptedAnswer: "About 12 ft above ground and 6 ft from the trunk or limb.",
      explanation: "The conservative 12 ft / 6 ft target clears the current Okanogan-Wenatchee 10 ft / 4 ft minimum, but current orders must still be checked.",
      anchor: "the-pct-bear-hang-method"
    },
    {
      id: "storage-04",
      section: "food-storage",
      type: "multi",
      prompt: "Which items belong in the smellables storage system at camp?",
      choices: [
        "Food and drink mixes",
        "Trash and used wrappers",
        "Toothpaste, sunscreen and lip balm",
        "Cookware with food residue",
        "Scented medication or toiletry packaging",
        "The paper map",
        "Untreated creek water"
      ],
      answer: [
        "Food and drink mixes",
        "Trash and used wrappers",
        "Toothpaste, sunscreen and lip balm",
        "Cookware with food residue",
        "Scented medication or toiletry packaging"
      ],
      explanation: "Animals do not distinguish dinner from toothpaste or a sticky wrapper. The final tent check is no smellables inside and no food-filled pack left unattended.",
      anchor: "food-storage-and-camp-kitchen"
    },
    {
      id: "storage-05",
      section: "food-storage",
      type: "match",
      prompt: "Match the hang failure to the practical consequence or correction.",
      pairs: [
        { term: "Dead or weak branch", answer: "Reject it: falling-limb risk and failed support" },
        { term: "Loaded bag sags below clearance", answer: "The hang fails even if it began at the target height" },
        { term: "Load-bearing cord tied to trunk", answer: "Redo the toggle; the bear can reach or manipulate the cord" },
        { term: "Hang installed after dark", answer: "Branch and clearance inspection are unreliable; use the canister" }
      ],
      explanation: "A decorative low hang trains animals. Branch quality, loaded sag, retrieval and daylight are all part of success.",
      anchor: "the-pct-bear-hang-method"
    },
    {
      id: "storage-06",
      section: "food-storage",
      type: "scenario",
      prompt: "It is nearly dark and no live branch can achieve the required clearance. What do you do with the food?",
      rubric: [
        "Declare the hang failed before throwing the line",
        "Use the accepted hard-sided canister or other already-verified approved system",
        "Place the closed canister on stable ground away from tent, water and cliffs",
        "Do not accept a low decorative hang or invent a new method",
        "Keep all smellables and trash in the same secured system"
      ],
      modelAnswer: "The PCT hang has failed before installation. Use the verified certified canister, close it correctly, and place it on stable ground away from the sleeping area, water and drop-offs with every smellable inside.",
      explanation: "The canister is the conservative default precisely because suitable subalpine branches and daylight are not guaranteed.",
      anchor: "the-pct-bear-hang-method"
    },
    {
      id: "storage-07",
      section: "food-storage",
      type: "boolean",
      prompt: "The phrase “PCT method” makes a toggle hang automatically legal anywhere on Section J.",
      answer: false,
      explanation: "False. It is a technique name, not a blanket legal exception. Final geometry, current land-unit orders and the exact storage product still control.",
      anchor: "the-pct-bear-hang-method"
    },
    {
      id: "storage-08",
      section: "food-storage",
      type: "multi",
      prompt: "Which statements correctly describe the guide’s current Okanogan-Wenatchee daytime food-possession rule and how to use it?",
      choices: [
        "Within 100 ft",
        "In direct sight",
        "Inside an unattended pack near camp",
        "Anywhere inside the same drainage",
        "Rechecked against the current order before the trip"
      ],
      answer: [
        "Within 100 ft",
        "In direct sight",
        "Rechecked against the current order before the trip"
      ],
      explanation: "Distance and direct sight both matter in the dated order summary. A later order can be stricter, so this is a recheck item rather than eternal trivia.",
      anchor: "food-storage-and-camp-kitchen"
    },

    {
      id: "wildlife-01",
      section: "wildlife",
      type: "match",
      prompt: "Match the animal to the first encounter response.",
      pairs: [
        { term: "Black bear", answer: "Speak calmly, group up, back away and do not run" },
        { term: "Cougar", answer: "Stay upright, maintain eye contact, look large and back away" },
        { term: "Mountain goat", answer: "Give space and prevent access to salty gear or urine sites" },
        { term: "Snake", answer: "Step back, give room and never handle it" }
      ],
      explanation: "Wildlife response is species-specific. Running, crouching or approaching can turn distance into conflict.",
      anchor: "animal-response-cards"
    },
    {
      id: "wildlife-02",
      section: "wildlife",
      type: "multi",
      prompt: "A black bear keeps approaching after you calmly back away. What belongs in the escalation?",
      choices: [
        "Group together",
        "Get large and loud",
        "Prepare accessible bear spray if carried and trained",
        "Keep an escape path for the bear",
        "Run downhill",
        "Throw your food toward it"
      ],
      answer: [
        "Group together",
        "Get large and loud",
        "Prepare accessible bear spray if carried and trained",
        "Keep an escape path for the bear"
      ],
      explanation: "Persistent approach changes the response from calm retreat to assertive deterrence. Food surrender teaches the animal to repeat the behavior.",
      anchor: "wildlife-plants-and-small-hazards"
    },
    {
      id: "wildlife-03",
      section: "wildlife",
      type: "scenario",
      prompt: "A black bear makes physical contact and attacks. What is the critical response?",
      rubric: [
        "Fight back aggressively",
        "Do not play dead",
        "Use available deterrent or objects while protecting the head and neck",
        "Trigger emergency communication as soon as possible",
        "Treat injuries and move only when safe"
      ],
      modelAnswer: "Fight back aggressively—never play dead in a black-bear attack. Use spray or improvised objects if available, protect vital areas, then trigger SOS and treat the injuries.",
      explanation: "The guide is explicit: physical black-bear attack means fight back. The play-dead rule belongs to different circumstances and species, not this plan.",
      anchor: "animal-response-cards"
    },
    {
      id: "wildlife-04",
      section: "wildlife",
      type: "scenario",
      prompt: "A cougar appears on the trail and watches the group. Describe the response.",
      rubric: [
        "Stay upright and keep the group together",
        "Maintain eye contact and look large",
        "Back away without running or crouching",
        "Do not approach a carcass or the animal",
        "Fight back if attacked"
      ],
      modelAnswer: "Stay upright together, face the cougar, maintain eye contact, look large and back away. Do not run or crouch. Fight back if it attacks.",
      explanation: "Running and crouching can resemble prey behavior. Group size, posture and controlled retreat are the useful signals.",
      anchor: "animal-response-cards"
    },
    {
      id: "wildlife-05",
      section: "wildlife",
      type: "order",
      prompt: "Put the tick response in order.",
      items: [
        "Use fine tweezers close to the skin",
        "Pull straight out with steady pressure",
        "Clean the bite area",
        "Save or photograph the tick if practical",
        "Watch for rash, fever or flu-like illness and report the exposure to a clinician"
      ],
      answer: [
        "Use fine tweezers close to the skin",
        "Pull straight out with steady pressure",
        "Clean the bite area",
        "Save or photograph the tick if practical",
        "Watch for rash, fever or flu-like illness and report the exposure to a clinician"
      ],
      explanation: "Do not twist, burn or smother the tick. Clean removal and post-trip symptom awareness matter.",
      anchor: "tick-procedure"
    },
    {
      id: "wildlife-06",
      section: "wildlife",
      type: "multi",
      prompt: "Which actions belong in a possible venomous snakebite response?",
      choices: [
        "Get emergency help and keep the person calm and still",
        "Remove tight jewelry near the bite",
        "Avoid cutting, sucking, ice and tourniquets",
        "Plan evacuation",
        "Cut the bite to drain venom",
        "Apply a tight tourniquet"
      ],
      answer: [
        "Get emergency help and keep the person calm and still",
        "Remove tight jewelry near the bite",
        "Avoid cutting, sucking, ice and tourniquets",
        "Plan evacuation"
      ],
      explanation: "Folk remedies can worsen tissue injury or delay definitive care. The field job is calm stabilization and evacuation.",
      anchor: "animal-response-cards"
    },
    {
      id: "wildlife-07",
      section: "wildlife",
      type: "order",
      prompt: "Put the response to contact with an unknown irritant plant in order.",
      items: [
        "Avoid touching face or eyes",
        "Rinse exposed skin when practical",
        "Change or isolate contaminated clothing if risk is high",
        "Use medication only within normal tolerance and label guidance",
        "Seek help for breathing issues, eye involvement, severe swelling or infection signs"
      ],
      answer: [
        "Avoid touching face or eyes",
        "Rinse exposed skin when practical",
        "Change or isolate contaminated clothing if risk is high",
        "Use medication only within normal tolerance and label guidance",
        "Seek help for breathing issues, eye involvement, severe swelling or infection signs"
      ],
      explanation: "The priority is preventing transfer and removing exposure. Severe systemic or eye symptoms are no longer a simple rash problem.",
      anchor: "plant-and-skin-irritation-protocol"
    },
    {
      id: "wildlife-08",
      section: "wildlife",
      type: "short",
      prompt: "Why should salty gear and urine be kept away from camp and trails in mountain-goat country?",
      keywords: [["goat"], ["salt", "salty"], ["attract", "draw", "approach"]],
      acceptedAnswer: "Salt attracts mountain goats and can draw them into camps and close contact.",
      explanation: "Give goats space, secure salty gear, and use durable mineral soil away from camp where practical rather than creating a salt lure.",
      anchor: "animal-response-cards"
    },

    {
      id: "medical-01",
      section: "medical",
      type: "order",
      prompt: "Put the response to a developing foot hot spot in order.",
      items: [
        "Stop walking",
        "Dry the area",
        "Apply tape smoothly without wrinkles",
        "Change socks or fix the moisture/grit source",
        "Resume only after friction is controlled"
      ],
      answer: [
        "Stop walking",
        "Dry the area",
        "Apply tape smoothly without wrinkles",
        "Change socks or fix the moisture/grit source",
        "Resume only after friction is controlled"
      ],
      explanation: "The cheap intervention is before skin opens. Waiting until camp converts a small friction problem into a wound.",
      anchor: "blisters"
    },
    {
      id: "medical-02",
      section: "medical",
      type: "match",
      prompt: "Match the presentation to the immediate response threshold.",
      pairs: [
        { term: "Cold, clumsy, confused or decreasing shivering", answer: "Hypothermia emergency: shelter, gentle insulation and SOS now" },
        { term: "Hot, collapsed or altered mental status", answer: "Heat stroke: SOS and rapid active cooling" },
        { term: "Throat swelling or breathing trouble after a sting", answer: "Prescribed epinephrine immediately and SOS" },
        { term: "Ankle injury with numbness or inability to bear weight", answer: "Stabilize and evacuate; do not force walking" }
      ],
      explanation: "Recognition drives the rescue threshold. Mental-status change is a red flag in both heat and cold illness.",
      anchor: "first-aid-and-medical-emergencies"
    },
    {
      id: "medical-03",
      section: "medical",
      type: "scenario",
      prompt: "In cold rain, your friend becomes clumsy and confused and is shivering less than before. What do you do?",
      rubric: [
        "Treat this as moderate or severe hypothermia and trigger SOS now",
        "Stop heat loss with shelter, wind and rain protection",
        "Replace wet layers and insulate from the ground, head and neck",
        "Handle gently and keep horizontal when practical",
        "Give no food or drink unless fully alert and swallowing normally"
      ],
      modelAnswer: "Trigger SOS now. Shelter from wind and rain, replace wet layers, insulate from ground and around the head/neck, add the sleep system and outer wrap, and handle gently. Do not give food or drink unless fully alert and swallowing.",
      explanation: "Less shivering with mental dullness is worse, not improvement. Do not wait to see whether hot food fixes it.",
      anchor: "hypothermia"
    },
    {
      id: "medical-04",
      section: "medical",
      type: "multi",
      prompt: "A hiker is confused and unable to walk normally in heat. Which actions are correct?",
      choices: [
        "Treat as heat stroke and trigger SOS",
        "Move to shade and remove excess clothing",
        "Wet the person and fan continuously",
        "Use cool-water immersion only if helpers can protect the airway",
        "Force the person to drink several litres",
        "Wait for sweating to stop before acting"
      ],
      answer: [
        "Treat as heat stroke and trigger SOS",
        "Move to shade and remove excess clothing",
        "Wet the person and fan continuously",
        "Use cool-water immersion only if helpers can protect the airway"
      ],
      explanation: "Cooling begins immediately and takes priority during first response. A confused person must not be forced to drink.",
      anchor: "heat-illness-and-overexertion"
    },
    {
      id: "medical-05",
      section: "medical",
      type: "short",
      prompt: "What is the first medication action for suspected anaphylaxis when the person has a prescribed auto-injector?",
      keywords: [["epinephrine", "adrenaline"], ["immediate", "now", "first", "use", "administer"]],
      acceptedAnswer: "Use the prescribed epinephrine auto-injector immediately, then trigger SOS/911.",
      explanation: "Antihistamines do not replace epinephrine. Improvement can be temporary, so evacuation remains required.",
      anchor: "anaphylaxis"
    },
    {
      id: "medical-06",
      section: "medical",
      type: "boolean",
      prompt: "Sweating rules out heat stroke.",
      answer: false,
      explanation: "False. A person with heat stroke may still sweat. Altered mental status, collapse, seizure or inability to walk normally is the decision signal.",
      anchor: "heat-illness-and-overexertion"
    },
    {
      id: "medical-07",
      section: "medical",
      type: "scenario",
      prompt: "After an ankle injury, the foot is numb and the hiker cannot bear weight. Describe the safe response.",
      rubric: [
        "Stop and remove the pack",
        "Check deformity, swelling, circulation and sensation",
        "Stabilize or wrap without impairing circulation",
        "Do not force weight-bearing",
        "Plan evacuation and use SOS if self-evacuation is unsafe"
      ],
      modelAnswer: "Stop, remove the pack, assess deformity, swelling, sensation and circulation, and stabilize with a snug—not tight—wrap or splint. Do not force walking. Evacuate, using SOS if the group cannot do so safely.",
      explanation: "Sprain and fracture can be hard to distinguish. Numbness and inability to bear weight cross the evacuation threshold.",
      anchor: "sprains"
    },
    {
      id: "medical-08",
      section: "medical",
      type: "scenario",
      prompt: "A hiker has diarrhea with blood, high fever and growing confusion. What is the route decision?",
      rubric: [
        "Treat this as beyond routine trail stomach upset",
        "Stop shared food handling and isolate utensils",
        "Manage fluids only as the person can safely take them",
        "Seek urgent medical guidance and evacuate",
        "Use SOS if self-evacuation is unsafe or mental status worsens"
      ],
      modelAnswer: "Stop travel and shared food handling, isolate utensils, support safe hydration, and seek urgent medical care with evacuation. Confusion and blood/high fever make this an emergency if self-evacuation is not safe.",
      explanation: "Blood, high fever, severe dehydration, confusion or persistent worsening are medical-care triggers—not reasons to take more anti-diarrheal and continue.",
      anchor: "stomach-trouble"
    },

    {
      id: "comms-01",
      section: "comms-group",
      type: "match",
      prompt: "Match each satellite message type to the information it must carry.",
      pairs: [
        { term: "START", answer: "Trailhead, route version, group count and start time" },
        { term: "CAMPED / OK", answer: "Location and time for the evening" },
        { term: "DELAYED / OK", answer: "New camp, reason, revised check-in and exit clock" },
        { term: "ROUTE CHANGE / OK", answer: "Skipped side trip, hold, backtrack or named exit with coordinates" }
      ],
      explanation: "The message names are useful only when the trusted contact knows what changed and what deadline now applies.",
      anchor: "emergency-contact-system"
    },
    {
      id: "comms-02",
      section: "comms-group",
      type: "order",
      prompt: "Put the overdue-response ladder in order from first missed routine check-in to confirmed distress.",
      items: [
        "Try messenger, text or phone and wait only through the agreed grace period",
        "After two missed check-ins or an uncertain/help message, call named ranger or sheriff dispatch",
        "At the hard overdue time with no extension, call sheriff/search-and-rescue immediately",
        "For SOS, life-threatening message or immediate-danger evidence, contact responders now"
      ],
      answer: [
        "Try messenger, text or phone and wait only through the agreed grace period",
        "After two missed check-ins or an uncertain/help message, call named ranger or sheriff dispatch",
        "At the hard overdue time with no extension, call sheriff/search-and-rescue immediately",
        "For SOS, life-threatening message or immediate-danger evidence, contact responders now"
      ],
      explanation: "A missed message can be technical; a hard overdue deadline is different. The ladder prevents both premature panic and dangerous delay.",
      anchor: "emergency-contact-system"
    },
    {
      id: "comms-03",
      section: "comms-group",
      type: "multi",
      prompt: "Which details belong in the trip plan given to the trusted contact?",
      choices: [
        "Names, dates and final route",
        "Planned camps, excluded side trips and verified exits",
        "Vehicle and parking information",
        "Satellite device details and message meanings",
        "Gear colors and relevant medical information",
        "Direct dispatch numbers for an overseas contact",
        "Only the link to a social-media post"
      ],
      answer: [
        "Names, dates and final route",
        "Planned camps, excluded side trips and verified exits",
        "Vehicle and parking information",
        "Satellite device details and message meanings",
        "Gear colors and relevant medical information",
        "Direct dispatch numbers for an overseas contact"
      ],
      explanation: "The plan should be ready to hand to a sheriff or SAR coordinator. It needs operational facts, not a vague itinerary link.",
      anchor: "what-to-put-in-the-trip-plan"
    },
    {
      id: "comms-04",
      section: "comms-group",
      type: "scenario",
      prompt: "One hiker needs to exit early and currently carries the only shelter and satellite messenger. What must happen before any separation?",
      rubric: [
        "Redistribute shared critical gear",
        "Ensure neither party loses the only shelter, navigation, water treatment, first aid or emergency communication",
        "Define route, timing and rendezvous or pickup explicitly",
        "Confirm both parties have working communication and navigation",
        "Do not split if the safety system cannot remain complete"
      ],
      modelAnswer: "Do not separate yet. Redistribute critical shared systems so neither party loses shelter, navigation, treatment or communication; then define the exact route, timing, contact and rendezvous. If both parties cannot remain viable, stay together.",
      explanation: "A split changes the gear and rescue problem. It is not merely two people walking at different speeds.",
      anchor: "group-operating-rules"
    },
    {
      id: "comms-05",
      section: "comms-group",
      type: "short",
      prompt: "What exact two-word phrase can any person use to stop the group for feet, weather, water, navigation or morale?",
      keywords: [["stop"], ["check"]],
      acceptedAnswer: "Stop, check.",
      explanation: "The phrase works only when everyone has agreed that the group stops without debate.",
      anchor: "group-operating-rules"
    },
    {
      id: "comms-06",
      section: "comms-group",
      type: "boolean",
      prompt: "Pressing SOS guarantees a helicopter will arrive quickly.",
      answer: false,
      explanation: "False. Rescue can take many hours or longer. The group must shelter, provide useful updates, conserve power and continue care while following responder instructions.",
      anchor: "sos-decision-standard"
    },
    {
      id: "comms-07",
      section: "comms-group",
      type: "scenario",
      prompt: "You are off route, daylight is fading, weather is worsening, and one person is injured. What is the priority?",
      rubric: [
        "Stop walking farther into uncertainty",
        "Preserve heat, battery and group cohesion",
        "Use the last known point and map only if a safe backtrack is clear",
        "Shelter and communicate from the best safely reachable sky view",
        "Use SOS when safe self-evacuation is not possible"
      ],
      modelAnswer: "Stop. Do not solve uncertainty by adding distance. Preserve heat, battery and the group, shelter, use the last known point only for a clearly safe backtrack, and communicate from safe sky view. Trigger SOS if self-evacuation is unsafe.",
      explanation: "The situation combines four compounding failures. Continuing to wander is the most controllable one.",
      anchor: "the-lost-but-not-yet-in-trouble-protocol"
    },
    {
      id: "comms-08",
      section: "comms-group",
      type: "multi",
      prompt: "What information should an SOS update include when possible?",
      choices: [
        "Exact location or coordinates",
        "Group count and patient problem",
        "Nearby hazards and travel direction",
        "Care already given",
        "Shelter and visibility details",
        "A long apology for using SOS",
        "Only the name of the nearest lake"
      ],
      answer: [
        "Exact location or coordinates",
        "Group count and patient problem",
        "Nearby hazards and travel direction",
        "Care already given",
        "Shelter and visibility details"
      ],
      explanation: "Responders need a concise operational picture. Do not delay a serious SOS because of embarrassment.",
      anchor: "sos-decision-standard"
    },

    {
      id: "gate-01",
      section: "route-gates",
      type: "scenario",
      prompt: "Seventy-two hours before departure, the Waptus bridge is still out and the only described passage is a difficult ford. Make the route decision.",
      rubric: [
        "Do not start Section J",
        "Do not treat the ford checklist as permission to experiment",
        "Activate the preselected alternate trip",
        "Update transport and contacts",
        "Reconsider only after current authoritative and reliable evidence confirms a safe legal passage for this group"
      ],
      modelAnswer: "Do not start Section J. The difficult ford is a failed pre-trip route gate, not an on-trail experiment. Use the alternate trip and update transport and contacts; reconsider only after current evidence confirms a safe legal passage.",
      explanation: "The bridge problem is route-critical for this first-timer plan. Schedule pressure does not make the ford safer.",
      anchor: "decision-gates"
    },
    {
      id: "gate-02",
      section: "route-gates",
      type: "match",
      prompt: "Match the route location to its decision gate.",
      pairs: [
        { term: "Peggy’s Pond junction", answer: "No trained off-trail leader, clear line or daylight means Circle is out" },
        { term: "Waptus morning", answer: "Changed or unsafe passage means no ford; stop, backtrack or hold and communicate" },
        { term: "Spade morning", answer: "Poor sleep, chill or foot trouble means skip Venus" },
        { term: "Escondido area", answer: "No camp within 200 horizontal ft of the tarns or on fragile/restoring ground" },
        { term: "Spectacle morning", answer: "Unsafe high-traverse weather means hold, use a safe window and communicate delay" }
      ],
      explanation: "The itinerary is controlled by gates at specific places, not by one optimistic decision made at the trailhead.",
      anchor: "decision-gates"
    },
    {
      id: "gate-03",
      section: "route-gates",
      type: "multi",
      prompt: "Which conditions are hard no-go triggers in the field guide?",
      choices: [
        "Bridge remains out with a difficult or ambiguous ford",
        "Active closure, evacuation or nearby uncontrolled fire",
        "AQI 151+ or a lower personal medical threshold",
        "Cold storm, dangerous lightning/wind, or snow beyond skills",
        "A failed critical shelter, dry-sleep, water, navigation, communication or transport system",
        "A friend is disappointed about skipping a lake",
        "The group wants better photos"
      ],
      answer: [
        "Bridge remains out with a difficult or ambiguous ford",
        "Active closure, evacuation or nearby uncontrolled fire",
        "AQI 151+ or a lower personal medical threshold",
        "Cold storm, dangerous lightning/wind, or snow beyond skills",
        "A failed critical shelter, dry-sleep, water, navigation, communication or transport system"
      ],
      explanation: "These triggers remove a critical route or safety layer. The correct response is cancellation, reroute, hold or evacuation—not bargaining.",
      anchor: "final-gono-go-checklist"
    },
    {
      id: "gate-04",
      section: "route-gates",
      type: "order",
      prompt: "Put these major southbound landmarks in route order.",
      items: [
        "Stevens Pass and northern lake country",
        "Deception and Cathedral Pass transition",
        "Waptus basin",
        "Escondido area and Spectacle Lake",
        "Kendall high traverse",
        "Snoqualmie Pass"
      ],
      answer: [
        "Stevens Pass and northern lake country",
        "Deception and Cathedral Pass transition",
        "Waptus basin",
        "Escondido area and Spectacle Lake",
        "Kendall high traverse",
        "Snoqualmie Pass"
      ],
      explanation: "The sequence supports route recognition and emergency location reporting without requiring memorized mileage.",
      anchor: "the-route-story"
    },
    {
      id: "gate-05",
      section: "route-gates",
      type: "identify",
      prompt: "What is the correct operational meaning of reaching this basin?",
      media: {
        src: "assets/images/section-j-spectacle.jpg",
        alt: "Spectacle Lake basin in the Alpine Lakes Wilderness",
        caption: "A beautiful landmark can still be a dangerous mental finish line."
      },
      choices: [
        "It is a reset before the final rocky high traverse, not the end of the route",
        "It means all exposed terrain is complete",
        "It is the signal to pack rain gear and headlamp at the bottom of the bag",
        "It is permission to ignore the next morning’s forecast"
      ],
      answer: "It is a reset before the final rocky high traverse, not the end of the route",
      explanation: "Spectacle is the last-night reward basin. The following day still climbs into the Chikamin/Four Brothers and Kendall terrain.",
      anchor: "day-6-friday-11-september-escondido-area-to-spectacle-lake"
    },
    {
      id: "gate-06",
      section: "route-gates",
      type: "scenario",
      prompt: "The final high traverse has ugly weather at dawn. Someone suggests starting before first light to beat it. What does the guide require?",
      rubric: [
        "Do not treat darkness as a weather solution",
        "Hold at a safe legal site when that is safer",
        "Use a forecast-supported safe light and weather window",
        "Activate the preplanned contingency if the window does not exist",
        "Send a delay or route-change message early"
      ],
      modelAnswer: "Do not launch novices into exposed terrain in darkness to beat bad weather. Hold safely, use a genuine forecast-supported light/weather window, or activate the contingency, and communicate the delay early.",
      explanation: "An early headlamp start can be reasonable in stable conditions on known trail. It does not neutralize wind, lightning, ice or poor visibility.",
      anchor: "day-7-saturday-12-september-spectacle-lake-to-snoqualmie-pass"
    },
    {
      id: "gate-07",
      section: "route-gates",
      type: "boolean",
      prompt: "A line drawn to an interior trailhead is a verified bailout.",
      answer: false,
      explanation: "False. A real exit needs trail and bridge status, crossings, distance and gain, road gate and vehicle access, pickup contact, communications and a dated verification.",
      anchor: "bailout-and-exit-playbook"
    },
    {
      id: "gate-08",
      section: "route-gates",
      type: "multi",
      prompt: "What would have to be true before Circle Lake could even be considered in a redesigned trip?",
      choices: [
        "An experienced off-trail leader",
        "A vetted route line on both navigation devices",
        "Clear, dry visibility and stable conditions",
        "Surplus daylight and group margin",
        "The current novice baseline has been deliberately redesigned",
        "A late arrival with wet rock",
        "Only one phone with an untested track"
      ],
      answer: [
        "An experienced off-trail leader",
        "A vetted route line on both navigation devices",
        "Clear, dry visibility and stable conditions",
        "Surplus daylight and group margin",
        "The current novice baseline has been deliberately redesigned"
      ],
      explanation: "Circle is excluded from the current first-timer baseline. These conditions are prerequisites for a different trip, not an automatic green light.",
      anchor: "day-3-tuesday-8-september-cathedral-to-waptus-with-peggys-pond-and-circle-only-if-earned"
    }
  ];

  window.PCT_QUIZ_DATA = {
    version: "2026-07-30",
    guideAuditDate: "29 July 2026",
    sections,
    questions
  };
})();
