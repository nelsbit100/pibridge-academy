import {
  title, keyterms, bullets, steps, diagram, compare, scenario, quiz, recap,
  type LessonVideoScript,
} from "./core";

// ════════════════════════════════════════════════════════════════
// SOC THREAT INTELLIGENCE (expanded) — deep scripts
// ════════════════════════════════════════════════════════════════

export const deepTI: LessonVideoScript[] = [
  {
    lessonId: "l-ti-1-2", lessonTitle: "MITRE ATT&CK Framework Deep Dive", courseId: "course-soc-threat-intel",
    scenes: [
      title(
        "MITRE ATT&CK Framework",
        "threat intelligence · the shared map",
        "The knowledge base of adversary behavior — and how defenders turn it into coverage, gaps, and priorities",
        [
          "MITRE ATT&CK is the closest thing security has to a shared map of adversary behavior: every documented tactic and technique, observed in real intrusions, free to all.",
          "By the end of this lesson you can navigate it, map detections onto it, and use it to decide what to defend next.",
        ],
        "purple",
        [
          "Explain the matrix: tactics as columns, techniques as cells",
          "Distinguish techniques from sub-techniques and procedures",
          "Build a coverage map and find your gaps",
          "Prioritize detections by adversary relevance"
        ]
      ),
      keyterms([
        { term: "ATT&CK", definition: "Adversarial Tactics, Techniques & Common Knowledge — MITRE's curated knowledge base of real-world adversary behavior." },
        { term: "Tactic", definition: "The adversary's GOAL at a stage — a matrix column: Initial Access, Execution, Persistence, Exfiltration…" },
        { term: "Technique", definition: "HOW a goal is achieved — a matrix cell: Phishing (T1566), Scheduled Task (T1053)…" },
        { term: "Sub-technique", definition: "A specific method within a technique: Spearphishing Attachment (T1566.001)." },
        { term: "Procedure", definition: "A specific real-world implementation by a named group — the ground truth the matrix is built from." },
      ], [
        "Five terms unlock the matrix.",
        "ATT&CK — adversarial tactics, techniques and common knowledge — is a curated map of how real adversaries actually operate.",
        "Tactics are columns: the goal at each stage of an intrusion, from initial access to exfiltration.",
        "Techniques are the cells: the concrete ways each goal gets achieved — phishing, scheduled tasks, credential dumping.",
        "Sub-techniques add precision: spearphishing via attachment versus via link are different cells with different detections.",
        "And procedures are the ground truth: documented implementations by named groups — the observations the whole map is built from.",
      ], "purple"),
      diagram("How ATT&CK Is Organized", {
        tac: { label: "Tactics — columns (the WHY)", x: 380, y: 80, shape: "square", emphasis: true },
        tech: { label: "Techniques — cells (the HOW)", x: 380, y: 205, shape: "square", emphasis: true },
        sub: { label: "Sub-techniques", x: 165, y: 330, shape: "square" },
        det: { label: "Detections + data sources", x: 595, y: 330, shape: "square" },
      }, [
        { from: "tac", to: "tech", animated: true, label: "organize" },
        { from: "tech", to: "sub", animated: true },
        { from: "tech", to: "det", animated: true },
      ], [
        "The matrix reads left to right as an attack timeline.",
        "Columns are tactics: Initial Access, Execution, Persistence, Privilege Escalation, Defense Evasion, and onward to Exfiltration and Impact.",
        "Every cell is a technique with its own page: description, platforms, and — critically for defenders — the data sources and analytics that can detect it.",
        "Sub-techniques let you be precise about what you defend, and each technique documents real procedures from named groups. The structure IS the value: it turns 'improve security' into a grid with empty cells you can see.",
      ], "Read it as an attack timeline, left to right", "purple"),
      bullets("Using ATT&CK as a Defender", [
        { label: "Map your coverage", detail: "which techniques can your detections actually catch?" },
        { label: "Profile your adversaries", detail: "which groups target your industry, and what do they use?" },
        { label: "Prioritize the overlap", detail: "techniques they use AND you cannot detect come first" },
      ], [
        "Three practices turn the matrix from reference into program.",
        "Coverage mapping: list your detections, tag each with the ATT&CK technique it catches, and color the grid. The empty cells are your blind spots, drawn in public.",
        "Adversary profiling: ATT&CK catalogs groups by sector and geography — find who actually targets your industry and list their favorite techniques.",
        "Prioritization is where the two overlap: techniques your adversaries use AND your grid leaves empty. That list IS your detection roadmap, ranked by relevance instead of guesswork.",
      ], "purple"),
      compare("Atomic IOCs vs ATT&CK Techniques", {
        title: "Indicator blocking", points: ["IPs, hashes, domains", "Expires as infrastructure rotates", "Reactive — blocks last week's attack"],
      }, {
        title: "Technique coverage", points: ["Behavior patterns as detections", "Stable across campaigns", "Catches the NEXT attack too"],
        accent: "cyan",
      }, [
        "The strategic argument for ATT&CK, in one comparison.",
        "Blocking indicators defends against last week's infrastructure — which this week's campaign has already abandoned.",
        "Covering techniques defends against behaviors: the scheduled-task persistence this group used will be used by the next one, because it works.",
        "Both have a place — indicators are cheap automation — but coverage investment compounds and indicator spending decays.",
      ], "purple"),
      scenario(
        "Case study · the coverage review",
        "A SOC maps its 60 detections onto ATT&CK and colors the grid. Result: dense coverage in Execution and Persistence — and empty cells across Credential Access and Defense Evasion.",
        "The gap analysis is brutal but actionable: attackers could credential-dump and disable defenses with near-zero detection risk. Cross-referencing the groups that target their sector, three of the top five most-used techniques sat in exactly those empty columns.",
        "The roadmap wrote itself: four new detections for dumping and evasion behaviors, prioritized by documented adversary use. ATT&CK turned a vague 'improve detections' goal into four named, ranked projects.",
      ),
      quiz(
        "Which ATT&CK element tells you HOW to actually detect a technique?",
        ["The technique's documented data sources and analytics", "The tactic name", "The matrix column order", "The group's country of origin"],
        0,
        "Every technique page lists the data sources (process use, registry, network traffic…) and example analytics — the literal ingredients your detection needs. That is what makes ATT&CK an engineering tool, not just a taxonomy.",
        [
          "Knowledge check — which part is built for defenders?",
        ],
        "purple"
      ),
      recap([
        "Matrix: tactics = columns (goals), techniques = cells (methods), sub-techniques = precision.",
        "Procedures from named groups are the ground truth — observed, not theoretical.",
        "Coverage mapping colors your grid; adversary profiling lists their favorite cells.",
        "Prioritize the overlap: their techniques × your empty cells = the roadmap.",
        "Technique coverage compounds; indicator blocking decays — invest accordingly.",
      ], [
        "What you now know.",
        "ATT&CK is no longer a poster — it is a grid you can color, gap, and prioritize against. The case study turned it into four named projects in an afternoon.",
        "Next lesson in this course: turning intel sources into the enrichment and hunting workflows that feed that grid.",
      ], "purple"),
    ],
  },
];
