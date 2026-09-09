import {
  title, keyterms, bullets, steps, diagram, flow, code, terminal, compare, scenario, quiz, stat, recap,
  type LessonVideoScript,
} from "./core";

// ════════════════════════════════════════════════════════════════
// SOC OPERATIONS — deep scripts (course-soc-operations)
// ════════════════════════════════════════════════════════════════

export const deepSO: LessonVideoScript[] = [
  {
    lessonId: "les-so-1-1", lessonTitle: "SOC Structure & Roles", courseId: "course-soc-operations",
    scenes: [
      title(
        "Inside the SOC",
        "soc operations · lesson 1",
        "The room where defenders watch the fight around the clock — its tiers, roles, and rhythm",
        [
          "Welcome to SOC Operations. This course takes you inside the Security Operations Center — the people, the process, and the tools that catch attackers in the act.",
          "First: how the SOC is organized, because its structure explains everything else you will learn.",
        ],
        "cyan",
        [
          "Describe the three SOC tiers and what each owns",
          "Follow an alert's journey from trigger to closure",
          "Name the metrics that measure a SOC's health",
          "Place yourself on the career path from Tier 1 upward"
        ]
      ),
      keyterms([
        { term: "SOC", definition: "Security Operations Center — the team and facility that monitors, detects, and responds to threats in real time." },
        { term: "Tier 1 — Triage", definition: "First line: monitors alerts, makes true/false decisions fast, escalates confirmed hits." },
        { term: "Tier 2 — Investigation", definition: "Deep-dives escalated incidents: correlates sources, contains threats, writes reports." },
        { term: "Tier 3 — Hunting", definition: "Proactive: hunts threats that evaded alerts, reverse-engineers malware, builds new detections." },
        { term: "Runbook", definition: "Documented steps for a specific alert type — the playbook that makes 3 AM responses consistent." },
      ], [
        "Five terms map the whole organization.",
        "The SOC — Security Operations Center — is the function that watches, detects, and responds, around the clock.",
        "Tier 1 is triage: the alert queue, fast true-or-false decisions, escalation of anything real.",
        "Tier 2 investigates what Tier 1 escalates: deep correlation, containment, and the incident report.",
        "Tier 3 hunts — assuming the alerts missed something, and going to find it proactively.",
        "And runbooks are the documented muscle memory for each alert type — the reason a 3 AM response looks like a 3 PM one.",
      ], "cyan"),
      diagram("The Alert's Journey", {
        trigger: { label: "Alert fires", x: 100, y: 190, shape: "circle", emphasis: true },
        t1: { label: "Tier 1 triage", x: 300, y: 190, shape: "square" },
        t2: { label: "Tier 2 investigate", x: 520, y: 190, shape: "square" },
        close: { label: "Closed / report", x: 700, y: 190, shape: "square" },
      }, [
        { from: "trigger", to: "t1", animated: true, label: "minutes" },
        { from: "t1", to: "t2", animated: true, label: "if true positive" },
        { from: "t2", to: "close", animated: true },
        { from: "t1", to: "close", label: "false positive → close", animated: true },
      ], [
        "Follow one alert through the machine — this path is your first week of work.",
        "A rule fires. Tier 1 picks it up in minutes: read what fired, pull context, make the call.",
        "False positive: documented and closed — and the false-positive data feeds rule tuning later.",
        "True positive: escalates to Tier 2 with everything Tier 1 found — evidence, timeline, hypothesis. Tier 2 contains, investigates deeper, and produces the report.",
      ], "Minutes to triage; hours to investigate; evidence at every step", "cyan"),
      bullets("What Keeps a SOC Alive", [
        { label: "The alert queue", detail: "the heartbeat — triage never stops, shifts hand over cleanly" },
        { label: "Runbooks per alert type", detail: "documented steps: consistent responses at any hour" },
        { label: "Metrics: MTTD, MTTR, FP rate", detail: "speed and signal quality, measured and published" },
        { label: "Threat intel feeds", detail: "context that turns indicators into decisions" },
      ], [
        "Four systems keep the SOC functioning as a machine rather than a group of heroes.",
        "The queue is the heartbeat — round-the-clock triage with clean shift handovers, because attackers do not respect office hours.",
        "Runbooks turn each alert type into a documented procedure — the difference between institutional memory and tribal knowledge.",
        "Metrics — time to detect, time to respond, false-positive rate — are how the SOC proves its value and finds its gaps.",
        "And threat intel enriches everything: an IP address is trivia until intel says it belongs to a ransomware crew.",
      ], "cyan"),
      scenario(
        "Case study · the shift handover",
        "Night shift flags 12 alerts as 'possible true positive' without notes, then hands over at 7 AM. The day shift re-investigates all twelve from scratch, missing that three share one source IP.",
        "The cost was not twelve investigations — it was the missed correlation. The source IP connected all three, and one containment action would have covered them. Handover quality is incident-response quality.",
        "Fixes: structured handover with mandatory fields (what fired, what I checked, what I think), plus SIEM notes attached to the alerts themselves. Your notes are the next analyst's context.",
      ),
      quiz(
        "An alert fires at 2 AM. Which role makes the first true-positive call?",
        ["Tier 1 — triage", "Tier 3 — threat hunting", "CISO", "The compliance team"],
        0,
        "Tier 1 owns the first decision: real or false, escalate or close. Speed with documentation is the entire job description.",
        [
          "Knowledge check — who meets the alert first?",
        ],
        "purple"
      ),
      recap([
        "Three tiers: triage (fast calls), investigation (depth), hunting (proactive).",
        "Alert path: fire → T1 true/false → escalate or close → T2 contains & reports.",
        "Runbooks make 3 AM consistent with 3 PM — document everything.",
        "Metrics: MTTD, MTTR, false-positive rate — measured, published, improved.",
        "Structured handovers preserve correlation across shifts — the case study's missed IP cost a day.",
      ], [
        "What you now know.",
        "You know the machine you are joining: its tiers, its rhythm, its metrics. Every remaining lesson in this course is one gear inside it.",
        "Next lesson: the numbers that prove whether any of it is working.",
      ], "cyan"),
    ],
  },
  {
    lessonId: "les-so-1-3", lessonTitle: "SOC Metrics & KPIs", courseId: "course-soc-operations",
    scenes: [
      title(
        "SOC Metrics & KPIs",
        "soc operations · measuring defense",
        "MTTD, MTTR, false positives, coverage — the four numbers that tell you if the SOC is winning",
        [
          "A SOC that cannot measure itself is guessing. This lesson gives you the four numbers that matter, what 'good' looks like, and the trap hidden in each one.",
        ],
        "amber",
        [
          "Define MTTD and MTTR precisely",
          "Explain why false-positive rate drives analyst burnout",
          "Measure ATT&CK coverage as a gap-finding tool",
          "Spot the gaming trap in every metric"
        ]
      ),
      keyterms([
        { term: "MTTD", definition: "Mean Time to Detect — from compromise to detection. The attacker's free time." },
        { term: "MTTR", definition: "Mean Time to Respond — from detection to containment. Your damage-control window." },
        { term: "False positive rate", definition: "The share of alerts that are not real. High FP rate = analysts stop trusting the queue." },
        { term: "ATT&CK coverage", definition: "The share of relevant adversary techniques your detections can actually catch." },
        { term: "Dwell time", definition: "How long an attacker operates before being evicted — MTTD + MTTR + investigation time." },
      ], [
        "Five terms — the SOC's vital signs.",
        "MTTD is the attacker's free time: how long they operate before anyone notices. Every hour of MTTD is an hour of reconnaissance on you.",
        "MTTR is your damage-control window: detection to containment. Attacks are cheap to stop early and expensive to stop late.",
        "False-positive rate is the signal-quality measure — and the burnout measure. Analysts who chase ghosts stop chasing.",
        "ATT&CK coverage maps your detections against how adversaries actually behave — a gap map, not a vanity number.",
        "And dwell time combines them: the total time the attacker lives in your network. That is the number the board understands.",
      ], "amber"),
      steps("The Big Four in Practice", [
        { title: "MTTD", detail: "compromise → detection · alert correlation makes this honest" },
        { title: "MTTR", detail: "detection → containment · playbooks make this fast" },
        { title: "FP rate", detail: "alert tuning makes this survivable" },
        { title: "Coverage", detail: "gap analysis makes this strategic" },
      ], [
        "Each metric pairs with the practice that improves it — this is how you read a SOC health report.",
        "MTTD improves with detection quality: better rules, more telemetry, faster correlation. It degrades with alert fatigue — drowned analysts miss the real one.",
        "MTTR improves with runbooks and automation: a scripted containment beats an improvised one every time.",
        "False-positive rate improves with rule tuning — which requires the false-positive documentation habit from Tier 1.",
        "And coverage improves strategically: map detections to ATT&CK, find the empty cells, build those detections first.",
      ], "amber"),
      stat(
        "16 days",
        "median attacker dwell time before detection",
        "Industry breach reports consistently find attackers operating for weeks inside compromised networks — MTTD is where SOC maturity shows first.",
        [
          "Context for what 'good' means: the median attacker dwells for days to weeks before detection.",
          "Elite SOCs pull this down to hours; immature ones never detect at all — the breach is reported by someone else.",
          "Every lesson in this course exists to pull that number down.",
        ],
        "amber"
      ),
      scenario(
        "Case study · the vanity MTTD",
        "A SOC reports MTTD of 4 minutes and celebrates. Audit finds the clock started at 'alert created' — but 60% of alerts fired from a feed that synced only once a day.",
        "The real detection time was up to 24 hours: the metric measured queue speed, not detection. Gaming or mismeasuring metrics is worse than having none — it manufactures false confidence at board level.",
        "Fixes: define MTTD from evidence-based compromise time (initial access artifacts, not alert timestamps), and audit the pipeline latency of every feeding source. Measure the attacker's clock, not the dashboard's.",
      ),
      quiz(
        "Which metric most directly measures analyst signal quality?",
        ["False-positive rate", "MTTD", "Coverage", "Ticket count"],
        0,
        "False-positive rate measures how much of the queue is noise. High FP rate burns analysts out and buries real attacks — it is the quality metric of the alert pipeline itself.",
        [
          "Knowledge check — which number measures noise?",
        ],
        "purple"
      ),
      recap([
        "MTTD = attacker's free time · MTTR = your containment window.",
        "Dwell time = MTTD + response + investigation — the number leadership feels.",
        "FP rate is signal quality AND burnout predictor — tune rules, document every false positive.",
        "ATT&CK coverage finds gaps — build detections for the empty cells first.",
        "Define metrics from the attacker's clock (evidence-based compromise time) or they become vanity.",
      ], [
        "What you now know.",
        "Four numbers, their traps, and the practices that move them. When you join a SOC, read these first — they tell you where the machine is broken.",
        "Next lesson: the SIEM — the engine that produces these alerts in the first place.",
      ], "amber"),
    ],
  },
  {
    lessonId: "les-so-2-1", lessonTitle: "What is a SIEM?", courseId: "course-soc-operations",
    scenes: [
      title(
        "What is a SIEM?",
        "soc operations · the detection engine",
        "The brain that turns a million logs per second into a handful of alerts that matter",
        [
          "Every alert you will triage in this course was born inside a SIEM. This lesson opens the machine: what flows in, how rules think, and why tuning is the never-ending job.",
        ],
        "green",
        [
          "Describe the SIEM pipeline: ingest, parse, correlate, alert",
          "Read and write a basic correlation rule",
          "Explain enrichment and why context changes triage",
          "Tune a noisy rule using false-positive data"
        ]
      ),
      keyterms([
        { term: "Ingest", definition: "Log collection at scale — agents, syslog, APIs — from every source you chose to feed." },
        { term: "Parsing / normalization", definition: "Turning raw lines into fields: user, IP, action — so rules can think." },
        { term: "Correlation rule", definition: "Logic that matches event patterns: sequences, thresholds, groupings within time windows." },
        { term: "Enrichment", definition: "Adding context at alert time: geo-IP, threat intel, asset criticality, user role." },
        { term: "Use case", definition: "A detection scenario end to end: the rule + its data source + its runbook + its tuning history." },
      ], [
        "Five terms, one machine.",
        "Ingest is the mouth: agents and syslog and APIs feeding events from every source.",
        "Parsing is digestion: raw text becomes structured fields — user, IP, action — because rules cannot think in raw text.",
        "Correlation rules are the brain: patterns across events and time windows, not single lines.",
        "Enrichment adds context at the moment of alerting — an IP is trivia until geo-IP and threat intel make it a decision.",
        "And a use case is the whole package: rule, data source, runbook, tuning history. Mature SOCs manage dozens.",
      ], "green"),
      flow("Inside the Pipeline", {
        ingest: { label: "Ingest", x: 100, y: 190, shape: "square", emphasis: true },
        parse: { label: "Parse", x: 280, y: 190, shape: "square" },
        corr: { label: "Correlate", x: 460, y: 190, shape: "square", emphasis: true },
        alert: { label: "Alert + enrich", x: 660, y: 190, shape: "square" },
      }, [
        { from: "ingest", to: "parse", speed: 1.3 },
        { from: "parse", to: "corr", speed: 1.3 },
        { from: "corr", to: "alert", speed: 1.3 },
      ], [
        "The pipeline from raw noise to analyst queue.",
        "Events arrive at ingest — millions per second in a real enterprise. Parsing normalizes them into a common schema.",
        "The correlation engine continuously evaluates every rule against the stream — sequences, thresholds, windows.",
        "A match becomes an alert, enriched with intel and asset context, and lands in the queue. Everything that does not match is still stored — that archive is what hunting and forensics query later.",
      ], "Ingest → parse → correlate → alert — with everything archived", "green"),
      code("brute-force-rule.yml", [
        "rule: auth_failed_then_success",
        "  severity: high",
        "  when:",
        "    - sequence within 10m:",
        "        - event.action == 'login_failed' count >= 10 group_by src_ip",
        "        - event.action == 'login_success' same src_ip",
        "  enrich: [geo_ip, threat_intel, asset_owner]",
        "  runbook: BR-014 brute_force_response",
      ], [
        "A real correlation rule, annotated — learn its anatomy and you can read any SIEM language.",
        "Name and severity first — severity decides queue priority and SLA.",
        "The condition is the logic: ten or more failures from one source within ten minutes, FOLLOWED BY a success from that same source. That sequence is the brute-force signature — the failures alone are noise; failures-then-success is an event.",
        "Enrichment attaches context so the analyst starts with answers, not questions. And the runbook links the alert to its documented response. Rule, source, response — a complete use case.",
      ], "green"),
      scenario(
        "Case study · the rule that cried wolf",
        "A 'possible brute force' rule fires 412 times a day. Analysts auto-close it without reading. Hidden in that noise one Tuesday: a real attack — failures from an unfamiliar ASN followed by success on a service account.",
        "The rule was technically correct and practically useless: its threshold ignored that the monitoring agent itself re-authenticates on failure (legitimate retries), generating constant false positives. Alert fatigue had turned a working detection into decoration.",
        "Fix: exclude the agent's known service accounts, raise the failure threshold for the datacenter subnet, add ASN novelty as a condition. Result: 412 fires a day became four a week — and the Tuesday attack now stands out. Tuning is not optional; it is the job.",
      ),
      quiz(
        "Why is 'failures followed by success from the same source' better than alerting on failures alone?",
        ["Failure bursts alone are constant noise; the success is the moment compromise actually occurred", "It is easier to write", "It reduces log volume", "Successes are rarer events"],
        0,
        "Failed logins happen constantly — lockouts, typos, scripts. The sequence 'many failures then a success' marks the transition from guessing to IN. That is the detection moment.",
        [
          "Knowledge check — which event is the actual compromise?",
        ],
        "purple"
      ),
      recap([
        "Pipeline: ingest → parse → correlate → alert; unmatched events archive for hunting.",
        "Rule anatomy: severity, condition (sequence/window/threshold), enrichment, runbook.",
        "Failures-then-success beats failures-alone — alert at the moment of compromise.",
        "Enrichment turns indicators into decisions before the analyst even opens the alert.",
        "Untuned rules become wallpaper — the 412-a-day rule hid a real breach.",
      ], [
        "What you now know.",
        "You can read a correlation rule's anatomy and explain what makes a detection worth trusting.",
        "Next lesson: detection engineering as a craft — building the rules analysts can rely on.",
      ], "green"),
    ],
  },
  {
    lessonId: "les-so-3-1", lessonTitle: "Detection Rule Anatomy", courseId: "course-soc-operations",
    scenes: [
      title(
        "Detection Rule Anatomy",
        "soc operations · detection engineering",
        "The five parts of every trustworthy rule — and the difference between noise and signal",
        [
          "A detection rule is a promise: when this fires, it deserves attention. This lesson is about keeping that promise — the five parts every serious rule carries, and the tuning loop that keeps them honest.",
        ],
        "purple",
        [
          "Name the five parts of a production detection rule",
          "Write logic that matches behavior, not just events",
          "Document false positives as part of the rule itself",
          "Tune a noisy rule without losing true coverage"
        ]
      ),
      keyterms([
        { term: "Logic", definition: "The matching condition — sequences, thresholds, field values. What fires the rule." },
        { term: "Severity", definition: "The attention the alert deserves when TRUE — drives queue priority and SLA." },
        { term: "Data source", definition: "Which telemetry feeds the rule — and the blind spots when that source is missing." },
        { term: "FP story", definition: "Documented false positives: every legitimate behavior that will also match, and how the rule accounts for it." },
        { term: "Response guidance", definition: "The runbook link: what the analyst should actually DO when it fires." },
      ], [
        "Five parts — the anatomy of a promise kept.",
        "Logic is the condition: what sequence of events, in what window, matches.",
        "Severity is honesty about impact: a firing high-severity alert must be worth waking someone.",
        "The data source declaration is humility: this rule sees only what its telemetry sees — know the blind spots.",
        "The false-positive story is what separates engineering from guesswork: every legitimate behavior that matches, written into the rule itself.",
        "And response guidance turns an alert into an action — the runbook it links to.",
      ], "purple"),
      compare("Noisy Rule vs Tuned Rule", {
        title: "Noisy", points: ["Fires 400×/day", "Ignores legit maintenance activity", "Auto-closed unread — wallpaper", "Hides real attacks inside itself"],
      }, {
        title: "Tuned", points: ["Fires ~2×/week", "Excludes known-good with evidence", "Every firing gets real triage", "Signal actually means signal"],
        accent: "green",
      }, [
        "The difference between these two columns is the difference between detection and decoration.",
        "The noisy rule fires constantly on legitimate activity nobody modeled. Analysts learn it is wallpaper and auto-close it — and any real attack hides inside the noise it generates.",
        "The tuned rule fires rarely, and each firing means something. Its exclusions are documented WITH their evidence — 'the backup agent authenticates this way, verified 12 March'.",
        "Detection quality is measured in analyst trust — and trust is built one documented false positive at a time.",
      ], "purple"),
      code("detection-rule-anatomy.yml", [
        "rule: susvc_new_service_install",
        "  logic: event.action='service_installed'",
        "         AND service.image CONTAINS '\\\\Temp\\\\'   # behavior, not product",
        "  severity: high",
        "  source: sysmon_event7045 (endpoint telemetry)",
        "  fp_notes: 'MSC installer runs from Temp on patch Tuesdays'",
        "           '→ excluded by publisher=Microsoft'",
        "  response: runbook SV-201 isolate_host_if_unknown",
      ], [
        "A production rule with all five parts, annotated.",
        "The logic watches BEHAVIOR — services installed from Temp directories — not a specific malware name. Product-specific rules age in weeks; behavior rules age in years.",
        "Severity high: a service from Temp is genuinely wake-someone territory when it is not Microsoft's installer.",
        "The source declares sysmon 7045 endpoint telemetry — and its blind spot: servers without the agent are invisible to this rule.",
        "The false-positive story documents the known legit case — Microsoft's patch Tuesday installer — and exactly how the rule excludes it, by publisher.",
        "And response links to the runbook. Five parts, one promise: when this fires, it is worth your attention.",
      ], "purple"),
      scenario(
        "Case study · the rule that saved the quarter",
        "Six months after deployment, the 'service from Temp' rule fires at 9 PM on a Friday — on a server that had been quiet for months. Publisher: unknown. Service name: random string.",
        "Analyst follows runbook SV-201: isolate host, pull the service binary — a cob-strike beacon. The attacker had been dormant inside the network for weeks, choosing Friday night to move. The rule caught the one behavior they could not avoid: installing their tool as a service.",
        "Post-incident credit went to the false-positive work: because the rule had been tuned to exclude ONLY the documented Microsoft installer, everything else stood out. Every tuning session six months earlier had been an investment in this Friday night.",
      ),
      quiz(
        "A rule fires on 'PowerShell execution'.FP analysis shows devs run PowerShell constantly.What is the BEST tuning?",
        ["Refine logic to suspicious behavior: PS + internet download + obfuscation markers", "Delete the rule", "Raise severity to critical", "Whitelist all PowerShell"],
        0,
        "Good tuning narrows to behavior worth alerting: PowerShell alone is normal; PowerShell fetching payloads and obfuscating is not. Deleting loses coverage; whitelisting all of it blinds you.",
        [
          "Knowledge check — narrow the behavior, keep the coverage.",
        ],
        "purple"
      ),
      recap([
        "Five parts: logic, severity, data source (+blind spots), FP story, response link.",
        "Match behavior, not product names — behavior rules outlive any campaign.",
        "Document false positives WITH evidence inside the rule itself.",
        "Tuning narrows to suspicious behavior — never delete coverage, never whitelist everything.",
        "Analyst trust is the metric — built one documented false positive at a time.",
      ], [
        "What you now know.",
        "You can write a rule that an analyst will trust six months from now — and you know why the tuning work is an investment that pays on a Friday night.",
        "Next lesson: MITRE ATT&CK — the map that tells you which detections to build next.",
      ], "purple"),
    ],
  },
  {
    lessonId: "les-so-4-1", lessonTitle: "Alert Triage Process", courseId: "course-soc-operations",
    scenes: [
      title(
        "Alert Triage",
        "soc operations · tier 1 craft",
        "Fast, repeatable, documented decisions on every alert — the skill you will use hourly",
        [
          "Triage is the SOC's front door and your first job. Every alert gets a decision: true positive, false positive, or escalate — fast, without carelessness, with documentation.",
          "This lesson drills the loop until it is reflex.",
        ],
        "cyan",
        [
          "Run the five-step triage loop on any alert",
          "Pull context: entity history, asset criticality, threat intel",
          "Write escalations that Tier 2 can act on immediately",
          "Document false positives so rules improve"
        ]
      ),
      keyterms([
        { term: "Triage", definition: "The first assessment of an alert: real or false, urgent or routine, escalate or close." },
        { term: "Entity context", definition: "The history of what you are looking at: the host, the user, the IP — past incidents, criticality, owner." },
        { term: "Pivot", definition: "Following a lead across logs: from alert IP → all its activity → related hosts → back in time." },
        { term: "Escalation", definition: "A true positive handed to Tier 2 with evidence, timeline and hypothesis — a case file, not a shrug." },
        { term: "Closing note", definition: "The documented reason an alert was closed — feeds rule tuning and future investigations." },
      ], [
        "Five terms — the working vocabulary of your first SOC job.",
        "Triage is the first assessment: every alert, a decision, fast.",
        "Entity context is what you gather about the things in the alert — the host's criticality, the user's role, the IP's history.",
        "The pivot is the craft move: follow one indicator across data sources until the story assembles.",
        "An escalation is a case file: evidence, timeline, hypothesis — what Tier 2 needs to act in minutes.",
        "And the closing note is where false positives become improvements — every close feeds the tuning loop.",
      ], "cyan"),
      steps("The Triage Loop", [
        { title: "1 · Read", detail: "what ACTUALLY fired — events, not just the rule name" },
        { title: "2 · Context", detail: "who, what host, criticality, past incidents, intel" },
        { title: "3 · Pivot", detail: "follow the lead across sources & time" },
        { title: "4 · Decide", detail: "true positive → escalate · false → close with reason" },
        { title: "5 · Document", detail: "always — your notes are the next analyst's context" },
      ], [
        "The loop — five steps, every alert, no exceptions.",
        "Read what actually fired: open the events, not just the alert title. Half of all false positives are visible right here — the rule says 'brute force', the events show one user mistyping twice.",
        "Gather context: is this host the payment server or a test box? Is this user a service account? Any history? Any intel on this IP?",
        "Pivot: follow the IP into firewall logs, the user into auth logs, backward in time. The story either assembles or dissolves.",
        "Decide: true positive escalates with everything you found; false positive closes with why.",
        "And document — always. Undocumented triage is triage that never happened.",
      ], "cyan"),
      compare("Bad Escalation vs Good Escalation", {
        title: "Bad", points: ["'Suspicious activity, please look'", "No evidence attached", "No timeline", "Tier 2 starts from zero"],
      }, {
        title: "Good", points: ["What fired & why it matters", "Key events with timestamps", "What I checked & found", "My hypothesis & suggested containment"],
        accent: "green",
      }, [
        "The escalation is where triage quality becomes response speed.",
        "The bad escalation is a shrug in ticket form — Tier 2 restarts the investigation from zero, and minutes burn.",
        "The good escalation is a case file: what fired, the key events with timestamps, what was already checked and ruled out, and a hypothesis with a suggested first containment step.",
        "Write every escalation like the responder will act in the next five minutes — because in a real incident, they will.",
      ], "cyan"),
      scenario(
        "Case study · the pivot that changed the verdict",
        "Alert: 'impossible travel — user j.mensah logged in from Accra, then Berlin 20 minutes later'. First instinct: close as VPN artifact — the company uses a Berlin VPN gateway.",
        "The analyst pivots before closing: the Berlin session authenticated to a FINANCE app the user had never touched, from an IP with no VPN logs, at 3 AM Berlin time. The VPN explanation covered the location — but not the behavior. True positive: stolen session cookie, not travel.",
        "The pivot habit — 'explain ALL the facts, not just the loudest one' — turned an almost-false-positive into a contained account takeover. Verdicts come from evidence, not from the first convenient explanation.",
      ),
      quiz(
        "An alert matches a documented false positive (known backup job). What is the correct action?",
        ["Close with a note referencing the documented FP", "Escalate anyway", "Delete the alert", "Disable the rule"],
        0,
        "Close it and cite the documentation — the note preserves the audit trail and feeds rule-tuning data. Disabling the rule would also blind you to when the BACKUP JOB is abused.",
        [
          "Knowledge check — documented FPs get closed, not deleted.",
        ],
        "purple"
      ),
      recap([
        "Loop: read events → context → pivot → decide → document. Every alert, no exceptions.",
        "Entity context (criticality, history, intel) turns indicators into verdicts.",
        "Explain ALL the facts before closing — the VPN covered location, not behavior.",
        "Escalations are case files: evidence, timeline, hypothesis, suggested action.",
        "False positives close with notes — that is the data tuning lives on.",
      ], [
        "What you now know.",
        "The triage loop is now yours: five steps, the pivot habit, and escalation quality that buys response speed.",
        "Next lesson: threat intelligence — the context machine that makes every triage decision smarter.",
      ], "cyan"),
    ],
  },
  {
    lessonId: "les-so-5-1", lessonTitle: "Threat Intelligence Fundamentals", courseId: "course-soc-operations",
    scenes: [
      title(
        "Threat Intelligence Fundamentals",
        "soc operations · know the adversary",
        "Turning the world's threat knowledge into decisions inside your SOC — indicators, TTPs, and relevance",
        [
          "Threat intelligence is knowledge about attackers applied to your defense. The internet produces an ocean of it daily — this lesson is the filter that turns it into decisions.",
        ],
        "amber",
        [
          "Distinguish strategic, operational and tactical intel",
          "Work with IOCs — and know their expiry date",
          "Explain why TTPs outlive indicators",
          "Enrich alerts and drive hunting from intel"
        ]
      ),
      keyterms([
        { term: "IOC", definition: "Indicator of Compromise — a technical artifact: IP, domain, hash, URL. Precise but short-lived." },
        { term: "TTP", definition: "Tactics, Techniques & Procedures — how an adversary operates. Durable; survives infrastructure changes." },
        { term: "OSINT", definition: "Open-source intel: free feeds like AlienVault OTX, CISA alerts, vendor blogs." },
        { term: "Enrichment", definition: "Adding intel context to an alert at triage time — who owns this IP, what campaigns use this technique." },
        { term: "Attribution", definition: "Naming the group behind activity — interesting, but rarely changes the defensive action." },
      ], [
        "Five terms sort the intel world.",
        "An IOC is a precise technical fingerprint — this exact IP, this hash. Powerful today, worthless when the attacker rotates infrastructure.",
        "TTPs are the behavioral fingerprint — how they phish, what they escalate with, how they persist. Techniques outlive any single campaign.",
        "OSINT is the free tier: government alerts, open feeds, vendor research — where every SOC starts.",
        "Enrichment is intel at the moment of decision — the alert arrives pre-contexted.",
        "And attribution — naming the group — is fascinating and rarely changes what you do. Defense responds to behavior, not names.",
      ], "amber"),
      diagram("Intel Feeds Defense", {
        feed: { label: "Intel sources", x: 110, y: 100, shape: "square", emphasis: true },
        ctx: { label: "Enrichment", x: 340, y: 190, shape: "square" },
        det: { label: "New detections", x: 600, y: 280, shape: "square", emphasis: true },
        hunt: { label: "Hunt hypotheses", x: 600, y: 100, shape: "square" },
      }, [
        { from: "feed", to: "ctx", animated: true, label: "IOCs + TTPs" },
        { from: "ctx", to: "det", animated: true },
        { from: "ctx", to: "hunt", animated: true },
      ], [
        "Intel enters your defense through three doors — learn all three.",
        "Door one: automated indicator feeds — blocklists and SIEM lookups that machine-match IOCs against your telemetry.",
        "Door two: enrichment — at alert time, the SIEM checks the involved IPs and hashes against intel, so triage starts with 'this hash belongs to a known loader family' instead of a shrug.",
        "Door three: hunting — a report says a group uses a new technique; hunters build a hypothesis and go search yesterday's data for it.",
      ], "Indicators block today's attack; TTPs find yesterday's", "amber"),
      compare("IOCs vs TTPs", {
        title: "IOCs", points: ["IPs, hashes, domains", "Machine-matchable", "Expire in days", "Great for blocking & matching"],
      }, {
        title: "TTPs", points: ["Behavior patterns", "Need analytical detection", "Stable for years", "Great for hunting & coverage"],
        accent: "cyan",
      }, [
        "The most practical distinction in intel — and where beginners overspend.",
        "IOCs are exact and ephemeral: perfect for automated blocking and retroactive matching, useless a month later.",
        "TTPs are behavioral and durable: the way a group's loaders persist via scheduled tasks remains true across campaigns and infrastructure.",
        "Budget accordingly: automate your IOC plumbing cheaply, and invest your human analysis in TTP-based detection and hunting.",
      ], "amber"),
      scenario(
        "Case study · the stale blocklist",
        "A SOC buys an expensive IOC feed and blocks everything on it. Three months later, an incident review finds the attacker entered through an infrastructure IP that was NEVER on any feed — but whose TTP (scheduled-task persistence + LOLBin execution) was in a public report two weeks earlier.",
        "The blocking strategy failed because entry infrastructure was fresh and unlisted. The TTP knowledge was present in-house but unread. Indicators are the past; techniques are the pattern — and the pattern was the warning.",
        "The rebalance: keep IOC feeds automated (cheap), but assign an analyst to read vendor TTP reports weekly and translate each into a hunt query or detection. One of those reports contained this attack, in advance, for free.",
      ),
      quiz(
        "A vendor report describes a group persisting via DLL side-loading. What is the MOST durable defensive action?",
        ["Build a detection for the side-loading behavior pattern", "Block the report's listed IPs", "Nothing — wait for IOCs", "Email the report to the team"],
        0,
        "The listed IPs will rotate within days; the BEHAVIOR — side-loading persistence — remains true across their future campaigns. Behavioral detection outlives every indicator.",
        [
          "Knowledge check — what expires and what endures?",
        ],
        "purple"
      ),
      recap([
        "Three doors: automated IOC feeds, alert enrichment, TTP-driven hunting.",
        "IOCs expire in days; TTPs endure for years — budget human effort accordingly.",
        "Enrichment pre-answers triage questions: intel at the moment of decision.",
        "Attribution rarely changes the defensive action — respond to behavior, not names.",
        "The case study: fresh infrastructure beat the blocklist; the TTP report was the real warning.",
      ], [
        "What you now know.",
        "You can run an intel program that spends automation on indicators and human attention on behavior — the split that separates mature SOCs from subscription collectors.",
        "Next lesson: IR playbooks — what to do when the detection fires for real.",
      ], "amber"),
    ],
  },
  {
    lessonId: "les-so-6-1", lessonTitle: "IR Playbooks", courseId: "course-soc-operations",
    scenes: [
      title(
        "IR Playbooks",
        "soc operations · respond on rails",
        "Decisions made in peacetime, executed under fire — the anatomy of a playbook that works at 2 AM",
        [
          "An incident is the worst possible time to make your first decision. Playbooks are the decisions, made in advance — and this lesson shows you what separates the documents that work from the ones that gather dust.",
        ],
        "rose",
        [
          "Structure a playbook: trigger, steps, contacts, criteria",
          "Walk the ransomware playbook: isolate, preserve, identify, eradicate, recover",
          "Explain evidence preservation under time pressure",
          "Test playbooks with tabletops — before reality does"
        ]
      ),
      keyterms([
        { term: "Playbook", definition: "A pre-decided, step-by-step response to a specific incident type: trigger, actions, contacts, criteria." },
        { term: "Containment", definition: "Stopping the spread: isolate hosts, disable accounts, block C2 — without destroying evidence." },
        { term: "Eradication", definition: "Removing the adversary completely: every foothold, every credential they touched." },
        { term: "Tabletop exercise", definition: "A structured rehearsal: talk through the playbook against a scenario, find the gaps safely." },
        { term: "Out-of-band comms", definition: "Communicating via channels the attacker cannot read — assume email is compromised." },
      ], [
        "Five terms — the response toolkit.",
        "A playbook is pre-decided response: for each incident type, the trigger, the steps, the contact order, the decision criteria.",
        "Containment is stopping the bleeding — isolate, disable, block — in a way that preserves evidence.",
        "Eradication is removal: every foothold and every credential the attacker touched, or they walk back in through the door you missed.",
        "Tabletop exercises rehearse the playbook against a scenario in a conference room — finding the gaps safely.",
        "And out-of-band communication assumes the attacker reads your email — because in a real incident, they may well be.",
      ], "rose"),
      steps("Ransomware Playbook — the Five Moves", [
        { title: "1 · Isolate", detail: "network-off infected hosts NOW; halt spread" },
        { title: "2 · Preserve", detail: "memory & disk images before anything changes" },
        { title: "3 · Identify", detail: "strain, patient zero, spread path, dwell time" },
        { title: "4 · Eradicate", detail: "every foothold + rotate every touched credential" },
        { title: "5 · Recover", detail: "restore from clean, verified backups — only after eradication" },
      ], [
        "The ransomware playbook — five moves, in order, for a reason.",
        "Isolate first: pull the network from infected hosts immediately. Every minute of connection is spread. Disable WiFi, pull cables, quarantine VLANs.",
        "Preserve second: memory and disk images before remediation changes anything. Rebooting destroys the evidence you will need for scope and insurance.",
        "Identify third: which strain (it predicts behavior), who was patient zero, how it spread, how long it has lived there.",
        "Eradicate fourth: remove every foothold and rotate every credential the attacker could have touched — assume everything.",
        "Recover fifth and only fifth: restore from verified-clean backups. Skipping ahead of eradication is how you get hit twice.",
      ], "rose"),
      compare("Untested vs Practiced Playbook", {
        title: "Untested", points: ["Exists in a shared drive", "Contact list has leavers", "Steps conflict with reality", "First read during the incident"],
      }, {
        title: "Practiced", points: ["Tabletop-tested quarterly", "Contacts verified with phone numbers", "Steps match actual tooling", "Muscle memory from rehearsal"],
        accent: "green",
      }, [
        "The difference between having a playbook and having a capability.",
        "The untested playbook is a document: stale contacts, steps that reference tools nobody has, and an audience of zero until the worst night of the year.",
        "The practiced playbook is a capability: quarterly tabletops have found the broken steps while they were still free to fix, and responders have muscle memory.",
        "Run the tabletop. It is the cheapest incident you will ever have.",
      ], "rose"),
      scenario(
        "Case study · the 2 AM execution",
        "Ransomware detonates at 2:07 AM across a finance firm. The on-call analyst opens the playbook — tested in a tabletop six weeks earlier.",
        "By 2:15: infected segments isolated at the switch. By 2:40: memory images captured from two key hosts. By 3:30: strain identified via the ransom note's binary signature — known crew, known decryptor history — and the C2 domain already blocked by the ISP escalation contact listed in the playbook. Recovery from offline backups began Monday, total loss: two days, zero ransom.",
        "Every efficient step traced to a pre-decision: the isolation VLAN existed because the tabletop had exposed its absence; the ISP contact answered at 2:30 because the playbook had their direct number. Playbooks do not contain attacks — pre-decisions do.",
      ),
      quiz(
        "During ransomware response, why must memory be captured BEFORE rebooting or remediating hosts?",
        ["Memory holds volatile evidence — encryption keys, live processes, C2 connections — destroyed by reboot", "Memory is cheaper than disk", "Compliance requires it", "Reboot voids warranties"],
        0,
        "RAM is the most volatile evidence: running malware, recovered keys, live network connections. Reboot erases it all — and with it, scope knowledge and sometimes the only decryption path.",
        [
          "Knowledge check — what lives only in memory?",
        ],
        "purple"
      ),
      recap([
        "Playbook = trigger + ordered steps + verified contacts + decision criteria.",
        "Ransomware order: isolate → preserve → identify → eradicate → recover. Order is the medicine.",
        "Memory before reboot — volatile evidence dies with the power cycle.",
        "Rotate every touched credential during eradication; restore only from verified-clean backups.",
        "Tabletop quarterly: find the broken steps at conference-table prices.",
      ], [
        "What you now know.",
        "You can structure a playbook that works at 2 AM — and you know why the pre-decisions, not the document, are what contain the attack.",
        "Next lesson: writing the incident report that captures all of it.",
      ], "rose"),
    ],
  },
  {
    lessonId: "les-so-7-1", lessonTitle: "Incident Report Writing", courseId: "course-soc-operations",
    scenes: [
      title(
        "Incident Report Writing",
        "soc operations · close the loop",
        "If it is not written down, it did not happen — the report structure that survives leadership, auditors, and court",
        [
          "Every incident ends in a report — the artifact leadership, legal, insurers, and regulators will judge your work by. This lesson gives you the structure and the writing rules that hold up under all four audiences.",
        ],
        "cyan",
        [
          "Structure a report: executive summary through lessons",
          "Build evidence-sourced timelines in UTC",
          "Write for executives and engineers in one document",
          "Separate fact from analysis from speculation"
        ]
      ),
      keyterms([
        { term: "Executive summary", definition: "Five to ten sentences a CEO can absorb: what happened, impact, status, ask." },
        { term: "Timeline", definition: "Every significant event in UTC with its evidence source — the report's backbone." },
        { term: "Scope", definition: "What was and was not affected — established by evidence, not assumption." },
        { term: "Chain of custody", definition: "The documented handling of evidence — who collected what, when, with what hash." },
        { term: "Lessons learned", definition: "The changes that follow: control gaps, tuning actions, owners and dates." },
      ], [
        "Five terms — the report's skeleton.",
        "The executive summary is five sentences for the CEO: what happened, business impact, current status, what you need from them.",
        "The timeline is the backbone: every significant event, in UTC, each with its evidence source. If a claim has no source, it does not go in the timeline.",
        "Scope states what was and was not affected — established by evidence, and honest about the boundaries of what you checked.",
        "Chain of custody documents evidence handling — who collected it, when, with what hash. This is what makes evidence usable in court.",
        "And lessons learned convert pain into change: each gap gets a fix, an owner, and a date.",
      ], "cyan"),
      steps("Report Structure", [
        { title: "1 · Executive summary", detail: "5–10 sentences, business language" },
        { title: "2 · Timeline", detail: "UTC, sourced, from first access to eviction" },
        { title: "3 · Analysis", detail: "root cause, scope, attacker actions" },
        { title: "4 · Response", detail: "what was done, by whom, when — outcomes" },
        { title: "5 · Lessons", detail: "gap → fix → owner → date" },
      ], [
        "The five-part structure, in the order each audience reads it.",
        "Executives read the summary and the ask — write those two in business language, not jargon.",
        "The timeline serves everyone: UTC timestamps, each line sourced. It is also where you discover gaps in your own investigation.",
        "Analysis explains root cause, scope, and the attacker's actions — fact first, inference clearly labeled as inference.",
        "Response records what was done and what it achieved. Lessons close the loop: every finding becomes an owned, dated action.",
      ], "cyan"),
      compare("Facts vs Speculation", {
        title: "Fact", points: ["'Auth log shows login from X at 03:14 UTC'", "'EDR quarantined hash Y on host Z'", "Sourced, timestamped, reproducible"],
      }, {
        title: "Speculation", points: ["'The attacker probably used...'", "'We believe the data was...'", "Marked as hypothesis — or left out"],
        accent: "green",
      }, [
        "The writing discipline that survives court: separate fact from inference, visibly.",
        "Facts cite evidence: which log, which timestamp, which tool. Anyone can reproduce the finding from the citation.",
        "Speculation is labeled as hypothesis — 'we assess with moderate confidence' — or left out entirely.",
        "Mixing the two is how reports die in legal review: one unfounded 'probably' can discredit ten solid findings.",
      ], "cyan"),
      scenario(
        "Case study · the report that paid",
        "After a business-email-compromise incident, the firm's insurer demanded evidence of response quality before paying the claim. The SOC's report — timeline with log citations, chain-of-custody hashes, dated lessons with owners — settled the claim in full.",
        "The insurer's reviewer later said the timeline made their decision trivial: every claim in the firm's account matched a sourced log line. The chain-of-custody hashes meant no evidence could be challenged as tampered.",
        "The lesson: the report is not paperwork after the incident — it is part of the response. Written for readers who were not there, priced in money you may need back.",
      ),
      quiz(
        "You cannot determine whether customer data was accessed. How should the report handle this?",
        ["State the unknown explicitly with what was checked", "Assume no access — no evidence of it", "Assume access — play it safe", "Omit the topic entirely"],
        0,
        "Honest unknowns with the search documented ('X, Y and Z logs reviewed, no access events found') are professional and legally sound. Silent assumptions — either direction — are how reports collapse under scrutiny.",
        [
          "Knowledge check — unknowns get documented, not guessed.",
        ],
        "purple"
      ),
      recap([
        "Structure: executive summary → UTC-sourced timeline → analysis → response → lessons with owners.",
        "Every claim cites its evidence; unknowns are stated with what was checked.",
        "Fact, inference and speculation are visibly separated — one 'probably' can sink ten findings.",
        "Chain of custody makes evidence survive legal challenge.",
        "The report IS response: written for readers who were not there, priced in recoverable money.",
      ], [
        "What you now know.",
        "You can write the report that closes an incident properly — clear enough for a CEO, rigorous enough for a courtroom.",
        "Next lesson: the metrics that prove the SOC is improving — and the career that follows.",
      ], "cyan"),
    ],
  },
  {
    lessonId: "les-so-8-2", lessonTitle: "SOC Career Paths", courseId: "course-soc-operations",
    scenes: [
      title(
        "SOC Career Paths",
        "soc operations · your roadmap",
        "From analyst to architect — the roles, the leverage moves, and the portfolio that gets you there",
        [
          "You have completed the technical core of this course. Now: where does this road lead, and how do you move faster on it?",
          "This lesson maps the career — and the leverage moves that compound.",
        ],
        "green",
        [
          "Map the SOC career lattice and its adjacent tracks",
          "Build a portfolio that proves skill, not attendance",
          "Choose a deep tool and a writing habit",
          "Plan your next 90 days deliberately"
        ]
      ),
      keyterms([
        { term: "T-shaped analyst", definition: "Broad knowledge across security + one deep specialty — the profile teams hire." },
        { term: "Detection engineering", definition: "The craft of building, tuning and testing detections — Tier 1's most common promotion path." },
        { term: "Purple teaming", definition: "Working with offensive testers to validate and improve detections with real attack data." },
        { term: "Portfolio", definition: "Public proof of work: write-ups, detection code, home labs — what interviews are built from." },
      ], [
        "Four terms frame the path.",
        "The T-shaped analyst is the hiring target: broad across security, deep in one specialty.",
        "Detection engineering is the most common first promotion: Tier 1 analysts who document false positives are literally doing its apprenticeship.",
        "Purple teaming is the collaboration skill: working with offensive testers to prove your detections against real attacks.",
        "And the portfolio is the currency of interviews: public write-ups and detection code beat certificate walls.",
      ], "green"),
      steps("Where the Road Leads", [
        { title: "Tier 1 → 2 Analyst", detail: "triage → investigation: the craft years" },
        { title: "Detection Engineer", detail: "rules, tuning, coverage — builder track" },
        { title: "Threat Hunter", detail: "hypothesis-driven pursuit — the puzzle track" },
        { title: "IR Lead", detail: "running the big incidents — the fire track" },
        { title: "SOC Architect / Manager", detail: "designing the machine or leading the people" },
      ], [
        "Five destinations — all reachable, all valuable, none a dead end.",
        "Tier 1 to Tier 2 is the craft years: volume of investigations builds the pattern library that everything else draws on.",
        "Detection engineering calls to those who loved the rules and tuning lessons — it is building, not just responding.",
        "Threat hunting is the puzzle track: hypothesis-driven searches through telemetry for what never alerted.",
        "IR lead is the fire track: running the biggest incidents, commanding the room at 2 AM.",
        "And architect or manager: designing the whole machine or leading its people. Both draw on every track before them.",
      ], "green"),
      bullets("The Leverage Moves", [
        { label: "Portfolio over certificates", detail: "write-ups, detection code, lab builds — proof beats badges" },
        { label: "One deep tool", detail: "know a SIEM or EDR better than anyone in your org" },
        { label: "Write publicly", detail: "every investigation is a blog post — visibility compounds" },
        { label: "Purple-team projects", detail: "test your own detections with attack simulations" },
      ], [
        "Four moves that compound across any track.",
        "Portfolio over certificates: a written investigation or a public detection rule proves what a PDF cannot. Certificates open doors; portfolios close interviews.",
        "One deep tool: become the person who truly knows the SIEM or EDR. Depth in one tool transfers; surface knowledge in five does not.",
        "Write publicly: every sanitized investigation and every home-lab build is content. Hiring managers read.",
        "And purple-team projects: attack your own lab, check your detections caught it, tune, repeat. This loop teaches more per hour than any course — including this one.",
      ], "green"),
      scenario(
        "Case study · the portfolio that replaced experience",
        "A helpdesk analyst applies for a Tier 1 SOC role with zero SOC experience. The application includes: a home lab with a SIEM ingesting attack data, three blog posts reconstructing attacks, and two detection rules with documented tuning.",
        "The hiring panel's logic: this candidate has already done the job unsupervised — the lab IS entry-level SOC work, self-assigned. Portfolio replaced experience, and the helpdesk background became customer-communication strength.",
        "The 90-day blueprint they followed: weeks 1–4 build the lab; 5–8 attack it and document; 9–12 tune detections and publish. Deliberate, public, compounding.",
      ),
      quiz(
        "Which of these best proves detection-engineering skill in an interview?",
        ["A public rule you wrote, its tuning history, and the attack it caught", "A certificate PDF", "A list of completed courses", "Your home lab's hardware specs"],
        0,
        "The artifact plus its story — what it matches, what false positives you documented, what it caught — is direct evidence of the craft. Certificates and gear lists are context, not proof.",
        [
          "Knowledge check — proof beats promises.",
        ],
        "purple"
      ),
      recap([
        "Tracks: T1→T2 craft, detection engineering, hunting, IR lead, architect/manager.",
        "T-shape: broad security knowledge + one deep specialty — the hiring target.",
        "Portfolio compounds: labs, write-ups, public rules — proof beats badges.",
        "Purple-team your own detections: attack, verify, tune, repeat.",
        "The 90-day blueprint: build, attack, document, publish — deliberately.",
      ], [
        "What you now know.",
        "The map is in front of you — and the leverage moves are cheap and available this month, not someday.",
        "This completes SOC Operations. The capstone simulation ahead uses every skill from these lessons: triage, detection, hunting, response, and reporting.",
      ], "green"),
    ],
  },
];
