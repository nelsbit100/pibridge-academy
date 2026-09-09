import {
  title, keyterms, bullets, steps, diagram, flow, code, terminal, compare, scenario, quiz, stat, recap,
  type LessonVideoScript,
} from "./core";

// ════════════════════════════════════════════════════════════════
// WEB DEVELOPMENT FUNDAMENTALS — deep scripts (course-web-fundamentals)
// ════════════════════════════════════════════════════════════════

export const deepWF: LessonVideoScript[] = [
  {
    lessonId: "les-wf-1-1", lessonTitle: "How the Web Works", courseId: "course-web-fundamentals",
    scenes: [
      title(
        "How the Web Works",
        "web development · lesson 1",
        "From URL to pixels in half a second — the full journey you will spend your career optimizing",
        [
          "Every website visit is a relay race: DNS, TCP, HTTP, parsing, rendering — all in half a second.",
          "Understanding this journey is the foundation every web skill stands on. Let us slow it down and watch it frame by frame.",
        ],
        "amber",
        [
          "Trace a URL from browser to pixels, end to end",
          "Explain the roles: DNS, TCP, HTTP, the DOM, the render tree",
          "Distinguish frontend, backend and the HTTP boundary",
          "Read DevTools' Network panel like the journey it shows"
        ]
      ),
      keyterms([
        { term: "DNS", definition: "Translates a name like pibridge.com into an IP address — the internet's phone book." },
        { term: "TCP / TLS", definition: "TCP builds the reliable connection; TLS encrypts it — together they carry every HTTPS request." },
        { term: "HTTP", definition: "The request/response protocol of the web: method, path, headers, body — and a status code back." },
        { term: "DOM", definition: "The Document Object Model — the browser's live tree of the HTML it parsed; JavaScript manipulates this." },
        { term: "Render tree", definition: "DOM + CSS combined into the painted result — layout, then paint, then composite." },
      ], [
        "Five terms, one journey.",
        "DNS turns the name you typed into an IP address — every request starts with a phone-book lookup.",
        "TCP opens a reliable pipe to that address and TLS wraps it in encryption — this is the secure channel.",
        "HTTP is the conversation over that pipe: a structured request, a structured response, status codes telling the story.",
        "The DOM is what your browser builds from the HTML — a live object tree that JavaScript will manipulate.",
        "And the render tree combines DOM with CSS to produce what you actually see — layout, paint, composite.",
      ], "amber"),
      flow("The Journey of a Request", {
        url: { label: "You press Enter", x: 100, y: 190, shape: "circle", emphasis: true },
        dns: { label: "DNS lookup", x: 270, y: 80, shape: "square" },
        tcp: { label: "TCP + TLS", x: 440, y: 190, shape: "square" },
        http: { label: "HTTP GET → HTML", x: 610, y: 80, shape: "square" },
        render: { label: "Parse → paint", x: 610, y: 300, shape: "square", emphasis: true },
      }, [
        { from: "url", to: "dns", speed: 1.4 },
        { from: "dns", to: "tcp", speed: 1.4 },
        { from: "tcp", to: "http", speed: 1.4 },
        { from: "http", to: "render", speed: 1.4 },
      ], [
        "Watch the race in slow motion.",
        "DNS resolves the name — a cached answer costs nothing; a cold one adds up to hundreds of milliseconds.",
        "TCP and TLS shake hands with the server — the round trips that latency charges for.",
        "The HTTP request goes out; HTML streams back. The browser parses as it arrives, discovering CSS and JavaScript to fetch.",
        "And finally: DOM built, styles applied, layout computed, pixels painted. Half a second, every time you press Enter.",
      ], "DNS → TCP/TLS → HTTP → parse → paint", "amber"),
      compare("Frontend vs Backend", {
        title: "Frontend (browser)", points: ["HTML/CSS/JS the user runs", "UI, interactions, rendering", "Visible — view source anytime", "React, Vue, vanilla JS"],
      }, {
        title: "Backend (server)", points: ["Business logic, database, auth", "Secrets, data, the real rules", "Invisible — client sees only responses", "Node, Python, Go, SQL"],
        accent: "cyan",
      }, [
        "The most fundamental split in web work — and the source of the most dangerous misunderstanding.",
        "The frontend is code the user's browser runs: everything visual, everything interactive. It is inherently public — anyone can read it.",
        "The backend is code on your server: business logic, data, authentication. It is the only place a rule is actually enforced.",
        "The security corollary you will relearn for years: price checks and permission checks in the frontend are UI, not security. The backend decides what is true.",
      ], "amber"),
      scenario(
        "Case study · the slow page",
        "A client reports their site 'takes forever'. DevTools Network panel: DNS 12ms, connect 40ms — but first HTML byte at 2.3 seconds, and a 4MB hero image on a 3G connection.",
        "The journey told the story: the server itself was slow (no caching, a database query per request), and the image added four seconds on mobile. Two fixes, both visible in the panel: server-side caching and responsive images.",
        "The lesson: performance work is not guessing — the Network panel IS the journey, itemized with timings. Every millisecond has an address.",
      ),
      quiz(
        "A colleague 'secures' a shopping cart by hiding the checkout button for unpaid items. Why is this not security?",
        ["The frontend is user-controlled — the HTTP request can be sent directly to the backend", "Buttons cannot be hidden", "CSS is encrypted", "It is fine if the button is hidden well"],
        0,
        "Everything in the browser is public and modifiable. The attacker skips the UI entirely and POSTs the checkout request themselves. Only backend validation is a rule; frontend checks are decoration.",
        [
          "Knowledge check — who controls the browser?",
        ],
        "purple"
      ),
      recap([
        "Journey: DNS → TCP/TLS handshake → HTTP request → HTML stream → DOM → paint.",
        "DNS is cached everywhere; latency charges for every round trip.",
        "The DOM is the live tree JS manipulates; the render tree is DOM + CSS painted.",
        "Frontend is public UI; backend is where rules are real. Never trust the client.",
        "The Network panel itemizes the journey — performance work starts there, not with guesses.",
      ], [
        "What you now know.",
        "The half-second relay race is now frame-by-frame familiar — and you know the one rule that separates real security from UI decoration.",
        "Next lesson: HTML itself — the skeleton everything else hangs on.",
      ], "amber"),
    ],
  },
  {
    lessonId: "les-wf-2-1", lessonTitle: "CSS Selectors & Specificity", courseId: "course-web-fundamentals",
    scenes: [
      title(
        "CSS Selectors & Specificity",
        "web development · styling",
        "Which rule wins when rules collide — the scoring system behind every style decision",
        [
          "CSS is easy until two rules disagree. Specificity is the scoring system referees those fights — master it and CSS becomes predictable; ignore it and you live in !important hell.",
        ],
        "cyan",
        [
          "Read any selector and predict its specificity score",
          "Know the tiebreakers: specificity, then source order",
          "Avoid the ID and !important traps",
          "Structure stylesheets to stay overridable"
        ]
      ),
      keyterms([
        { term: "Selector", definition: "The pattern that matches elements: p, .card, #hero, div > p — determines what a rule styles." },
        { term: "Specificity", definition: "A three-part score (IDs, classes, elements) that decides which rule wins." },
        { term: "Cascade", definition: "The resolution order: origin, then specificity, then source order — last matching rule wins ties." },
        { term: "Inheritance", definition: "Some properties (color, font) flow from parent to child automatically; most (border, margin) do not." },
        { term: "!important", definition: "A specificity nuclear option — wins everything. Every use makes the next bug harder to fix." },
      ], [
        "Five terms referee every style fight.",
        "A selector is the pattern — element, class, ID, or structural like div > p.",
        "Specificity is the score: count IDs, then classes, then elements. Higher wins.",
        "The cascade is the whole resolution system: where the rule comes from, how specific it is, and — on ties — which came last.",
        "Inheritance flows some properties down the tree — color and font yes, border and margin no.",
        "And !important wins everything — which is exactly why it is a last resort that never stops being needed once you start.",
      ], "cyan"),
      code("specificity.txt", [
        "/* score = (ids, classes, elements) */",
        "p          { }   /* (0,0,1) */",
        ".intro     { }   /* (0,1,0) — beats any elements */",
        "#hero      { }   /* (1,0,0) — beats any classes */",
        "p.intro    { }   /* (0,1,1) — class + element */",
        "#hero .c p { }   /* (1,1,1) — all three */",
        "",
        "/* tie on score? later in the file wins */",
      ], [
        "The scoring is a three-digit number — read any selector and compute it.",
        "An element scores zero-one. A class beats any number of elements: zero-one-zero.",
        "An ID beats any number of classes: one-zero-zero.",
        "Combinations add up — p.intro is class-plus-element, and #hero .c p stacks all three.",
        "And on exact ties, source order decides: the later rule wins. That is why stylesheet order matters.",
      ], "cyan"),
      compare("IDs Everywhere vs Classes First", {
        title: "ID-heavy styling", points: ["(1,0,0) is nearly unbeatable", "Overrides need !important", "Stylesheets fossilize", "One use per page anyway"],
      }, {
        title: "Class-first styling", points: ["(0,1,0) is overridable on purpose", "Composable and reusable", "Later rules can win naturally", "IDs reserved for JS hooks"],
        accent: "green",
      }, [
        "The professional habit that keeps stylesheets alive.",
        "ID-heavy styling creates unbeatable rules — every future fix needs !important, which needs a bigger !important, forever.",
        "Class-first styling keeps scores low and composable: rules stay overridable by design, and reuse comes free.",
        "The convention: style with classes, reserve IDs for JavaScript targets. Low specificity is not a limitation — it is the design.",
      ], "cyan"),
      scenario(
        "Case study · the !important arms race",
        "A marketing site accumulates 47 !important declarations. A requested color change takes two days: every override fights a previous override, and 'fixing' one breaks three others.",
        "The root cause: years of solving specificity fights with !important instead of restructuring. The cascade had become a weapon both sides of every fight were using.",
        "The refactor: drop IDs from styling, convert !important wars back to classes, use CSS custom properties for the genuinely-global values like brand colors. Result: the same color change becomes a one-line edit. The specificity system was never broken — it was being fought instead of used.",
      ),
      quiz(
        ".card p and p.card both style a paragraph inside .card. What are their scores?",
        ["(0,1,1) both — same score, source order decides", "(0,1,1) vs (0,1,1) — the first always wins", "(0,1,0) vs (0,0,1)", "(1,1,1) both"],
        0,
        ".card p = one class + one element = (0,1,1). p.card = one class + one element = (0,1,1). Identical scores — the later rule in the stylesheet wins.",
        [
          "Knowledge check — count IDs, then classes, then elements.",
        ],
        "purple"
      ),
      recap([
        "Specificity = (IDs, classes, elements) — higher wins; ties go to source order.",
        "Class (0,1,0) beats any elements; ID (1,0,0) beats any classes.",
        "Style with classes; reserve IDs for JavaScript hooks.",
        "!important is debt: each use taxes every future fix.",
        "Global values belong in custom properties — one definition, no specificity fights.",
      ], [
        "What you now know.",
        "You can compute any selector's score and predict every style fight — the cascade is now a tool you use, not a force you flee.",
        "Next lesson: JavaScript — the behavior layer.",
      ], "cyan"),
    ],
  },
  {
    lessonId: "les-wf-3-1", lessonTitle: "Variables, Types & Functions", courseId: "course-web-fundamentals",
    scenes: [
      title(
        "JavaScript Essentials",
        "web development · the behavior layer",
        "Variables, types, and functions — the primitives every framework is made of",
        [
          "JavaScript has a small set of primitives — variables, types, functions — and everything else, every framework you will ever learn, is built from them.",
          "This lesson makes the primitives solid.",
        ],
        "green",
        [
          "Declare variables with const/let correctly",
          "Work with the core types and know the classic gotchas",
          "Write functions: declarations, arrows, and when to use each",
          "Compose small functions into real behavior"
        ]
      ),
      keyterms([
        { term: "const / let", definition: "Block-scoped declarations. const prevents reassignment (use by default); let allows it." },
        { term: "Primitive types", definition: "string, number, boolean, null, undefined — copied by value." },
        { term: "Objects & arrays", definition: "Reference types — the variable holds a pointer; copies share the underlying data." },
        { term: "Arrow function", definition: "(a, b) => a + b — concise function syntax; inherits this from its surroundings." },
        { term: "Template literal", definition: "Backtick strings with ${expression} interpolation — the readable way to build strings." },
      ], [
        "Five terms cover the ground floor.",
        "const and let are block-scoped; default to const and reach for let only when reassignment is real.",
        "Primitives — strings, numbers, booleans, null, undefined — copy by value.",
        "Objects and arrays copy by reference — the variable is a pointer, and two variables can point at the same data.",
        "Arrow functions are the concise modern syntax — with a real difference in how this behaves.",
        "And template literals embed expressions right in strings — readable concatenation, finally.",
      ], "green"),
      code("basics.js", [
        "// declarations & types",
        "const course = 'Networking';    // string",
        "const price = 5500;             // number",
        "const published = true;         // boolean",
        "const tags = ['security', 'network'];  // array (reference)",
        "const author = { name: 'Kwame', courses: 12 };  // object",
        "",
        "// template literal",
        "console.log(`${course} by ${author.name} — GH₵${price}`);",
      ], [
        "The daily vocabulary, in one block.",
        "const with a string, a number, a boolean — the three primitives you will use constantly.",
        "An array and an object — note the access patterns: brackets for arrays by index, dot for object properties.",
        "And the template literal: backticks, dollar-brace, expressions inside. This one line prints the full sentence — no plus-sign concatenation gymnastics.",
      ], "green"),
      code("functions.js", [
        "// declaration — hoisted, named",
        "function applyDiscount(price, pct) {",
        "  return price * (1 - pct / 100);",
        "}",
        "",
        "// arrow — concise, common in modern code",
        "const formatGHS = (n) => `GH₵${n.toLocaleString()}`;",
        "",
        "// composing them",
        "const finalPrice = formatGHS(applyDiscount(5500, 10));",
        "console.log(finalPrice);   // GH₵4,950",
      ], [
        "Functions are where behavior lives — two flavors, one habit of composition.",
        "The declaration form is hoisted and self-documenting — great for top-level logic. applyDiscount is pure: inputs to output, no side effects.",
        "The arrow form shines for small utilities — formatGHS reads like a sentence.",
        "And the last line is the habit that separates beginners from professionals: small pure functions composed. One computes, one formats, together they produce exactly the display value needed.",
      ], "green"),
      scenario(
        "Case study · the discount bug",
        "A store's prices occasionally display as 'GH₵NaN'. The bug: a discount function receives a string from an input field — '10' instead of 10 — and 5500 * (1 - '10'/100) evaluates unpredictably.",
        "JavaScript's type coercion: the string '10' coerces in some operations but the combination here produces NaN — not a number — which flows silently through calculations until it reaches the UI.",
        "The fix is defensive coding: validate and convert inputs at the boundary — Number(input) with an isNaN check — before calculation. Types are loose in JS; discipline at the edges keeps math honest.",
      ),
      quiz(
        "const user = { name: 'Ama' }; const copy = user; copy.name = 'Efua'; What is user.name?",
        ["'Efua' — objects copy by reference", "'Ama' — copy is independent", "undefined", "An error — const prevents changes"],
        0,
        "Objects are reference types: copy points at the SAME object, so the change is visible through both. const freezes the binding, not the contents. (Structured clone or spread creates true copies.)",
        [
          "Knowledge check — value vs reference.",
        ],
        "purple"
      ),
      recap([
        "Default to const; let only for real reassignment; block-scoped both.",
        "Primitives copy by value; objects and arrays copy by reference — the classic bug source.",
        "Template literals make strings readable: `GH₵${n}`.",
        "Write small pure functions; compose them — applyDiscount(formatGHS(...)).",
        "Coerce and validate inputs at boundaries — the NaN bug starts with a string in the math.",
      ], [
        "What you now know.",
        "The primitives are solid: declarations, types, reference semantics, and composed functions.",
        "Next lesson: the DOM — where JavaScript actually touches the page.",
      ], "green"),
    ],
  },
  {
    lessonId: "les-wf-4-1", lessonTitle: "Chrome DevTools Deep Dive", courseId: "course-web-fundamentals",
    scenes: [
      title(
        "Chrome DevTools Deep Dive",
        "web development · your x-ray machine",
        "Inspect, debug, measure — the four panels that turn guessing into observation",
        [
          "DevTools is the difference between guessing and knowing. Every professional web session has it open — this lesson makes its four workhorse panels yours.",
        ],
        "amber",
        [
          "Inspect and live-edit DOM and styles",
          "Use the Console as a JavaScript laboratory",
          "Read the Network panel: waterfall, sizes, timings",
          "Set breakpoints and step through real code"
        ]
      ),
      keyterms([
        { term: "Elements panel", definition: "Live DOM view — inspect, edit HTML and CSS in place, see computed styles and the box model." },
        { term: "Console", definition: "A JavaScript REPL on the live page — run code, read errors, log values." },
        { term: "Network panel", definition: "Every request: waterfall timing, sizes, headers, status codes — the performance ground truth." },
        { term: "Sources + breakpoints", definition: "Pause execution at a line, inspect variables, step through logic — a real debugger." },
      ], [
        "Four panels do ninety percent of the work.",
        "Elements is the live DOM — hover to highlight, click to inspect, edit styles in place and watch the page respond.",
        "The Console is a JavaScript laboratory attached to the page — query elements, test expressions, read the errors you were going to meet anyway.",
        "The Network panel is the journey, itemized: every request with waterfall timing, size, and status.",
        "And Sources is a real debugger — breakpoints, stepping, live variable inspection.",
      ], "amber"),
      terminal([
        { type: "command", text: "// Console — the page is your playground" },
        { type: "output", text: "document.querySelector('.hero h2')" },
        { type: "output", text: "→ <h2>Don't just learn technology…</h2>" },
        { type: "command", text: "console.table([{name:'Ama',role:'learner'}])" },
        { type: "output", text: "→ renders a sortable table of your data" },
        { type: "command", text: "getEventListeners(document)  // what's listening?" },
        { type: "output", text: "$0   // the element you last selected in Elements" },
      ], [
        "Console tricks that separate daily users from tourists.",
        "querySelector works here against the real page — grab any element and poke it.",
        "console.table renders arrays of objects as sortable tables — inspecting API responses becomes a pleasure.",
        "getEventListeners reveals what is listening where — invaluable when events fire twice.",
        "And dollar-zero is the element you last clicked in Elements — the bridge between panels.",
      ], "amber"),
      compare("Console.log vs Breakpoints", {
        title: "console.log", points: ["Quick value checks", "Non-blocking, fires in flow", "Clutters code if left behind", "Great for loops & lifecycle"],
      }, {
        title: "Breakpoints", points: ["Pause exactly at the suspect line", "Inspect EVERY variable in scope", "Step through logic line by line", "No code changes needed"],
        accent: "cyan",
      }, [
        "Both tools, different jobs — know when each wins.",
        "Logging is for flow: values over time, loop iterations, lifecycle order. It is fast, but it only shows what you thought to print.",
        "Breakpoints are for depth: execution pauses and the entire scope is inspectable — every variable, the call stack, the exact state at the exact line.",
        "The professional pattern: log to find the neighborhood, breakpoint to find the house.",
      ], "amber"),
      scenario(
        "Case study · the layout shift",
        "A client's page 'jumps' as it loads — buttons move under your finger before you can click. Classic cumulative layout shift. Where do you even start?",
        "DevTools: Performance recording captures the shift and names the element; Elements shows why — an image without explicit width/height, so the browser reserves zero space until it loads and everything below slams down.",
        "The fix took one minute once observed: set width and height attributes (or aspect-ratio CSS) so the browser reserves the box. The meta-lesson: DevTools converts 'the page feels janky' into a named element and a one-line fix.",
      ),
      quiz(
        "You need to see WHY a function returns the wrong value mid-calculation. Best tool?",
        ["A breakpoint in Sources — step through with all variables in scope", "Add console.log everywhere", "Reload repeatedly", "Read the HTML in Elements"],
        0,
        "A breakpoint freezes execution at the exact line — every variable in scope is inspectable and you can step forward line by line. Logging shows what you thought to print; the debugger shows everything.",
        [
          "Knowledge check — find the neighborhood, then the house.",
        ],
        "purple"
      ),
      recap([
        "Elements: live DOM + style editing — changes apply instantly.",
        "Console: a JS lab on the page — querySelector, console.table, $0.",
        "Network: the itemized journey — waterfall, sizes, statuses.",
        "Sources: real debugging — breakpoints, stepping, full scope inspection.",
        "Log to find the neighborhood; breakpoint to find the house.",
      ], [
        "What you now know.",
        "Four panels, no more guessing: observe first, fix second. This habit alone will double your debugging speed.",
        "Next lesson: the OWASP Top 10 — what attackers do with all of this.",
      ], "amber"),
    ],
  },
  {
    lessonId: "les-wf-5-1", lessonTitle: "OWASP Top 10 Overview", courseId: "course-web-fundamentals",
    scenes: [
      title(
        "The OWASP Top 10",
        "web development · secure by default",
        "The most critical web application risks — and the habits that design them out",
        [
          "The OWASP Top 10 is the industry's consensus list of the most critical web application security risks — and the closest thing web development has to a checklist for not getting breached.",
          "This lesson gives you the four risks you will actually meet, and the habits that neutralize them.",
        ],
        "rose",
        [
          "Name the biggest OWASP risks and a real attack for each",
          "Explain injection and parameterized queries",
          "Explain broken access control with a real breach pattern",
          "Adopt the four secure-coding habits"
        ]
      ),
      keyterms([
        { term: "Injection", definition: "Untrusted input executed as code — SQL, command, template injection. The classic." },
        { term: "Broken access control", definition: "Users reaching data or actions that are not theirs — missing server-side checks." },
        { term: "XSS", definition: "Cross-Site Scripting — attacker scripts running in OTHER users' browsers via injected content." },
        { term: "Security misconfiguration", definition: "Defaults left open: debug modes, verbose errors, public buckets, default credentials." },
        { term: "CSP", definition: "Content Security Policy — a header telling the browser which scripts may run; XSS's structural antidote." },
      ], [
        "Five terms — most of the list you will actually meet.",
        "Injection is untrusted input executed as code — SQL injection is the famous case, and it is entirely preventable.",
        "Broken access control is users reaching what is not theirs — the most common serious finding in modern audits.",
        "XSS is attacker JavaScript running in other users' browsers — session theft, keystrokes, defacement.",
        "Misconfiguration is everything left open by default — debug endpoints, verbose errors, public storage buckets.",
        "And CSP is the structural answer to XSS: a header declaring which scripts may run at all.",
      ], "rose"),
      code("injection.ts", [
        "// ❌ vulnerable — string concatenation",
        "const q = `SELECT * FROM users WHERE name = '${input}'`;",
        "db.query(q);   // input: ' OR 1=1 --  → dumps every user",
        "",
        "// ✅ parameterized — input stays DATA, never code",
        "db.query('SELECT * FROM users WHERE name = ?', [input]);",
        "",
        "// the database driver handles quoting safely",
      ], [
        "Injection in four lines — and its complete cure.",
        "The vulnerable pattern builds SQL by string concatenation. The input ' OR 1=1 dash dash closes the string, makes the condition always-true, and comments out the rest — the query returns every user.",
        "The parameterized version passes input separately. The driver guarantees it is treated as data, never parsed as SQL. Injection becomes structurally impossible.",
        "This is the pattern for the whole Top 10: each risk has a structural fix that removes the entire class — not a patch-and-pray.",
      ], "green"),
      compare("Client-side Checks vs Server-side Enforcement", {
        title: "Client-side only", points: ["Hidden fields, disabled buttons", "Anyone can modify or bypass", "Useful as UX, useless as security", "Attacker skips the UI entirely"],
      }, {
        title: "Server-side enforcement", points: ["Authorize every request by session + role", "Validate input at the boundary", "Deny by default", "The only place a rule is real"],
        accent: "green",
      }, [
        "The misconception behind half of all breaches.",
        "Client-side checks are user experience: they hide fields and disable buttons for honest users.",
        "The attacker never uses your UI — they send crafted requests directly. Broken access control is exactly this: the server trusting that 'the app would not send that request'.",
        "The rule: the server authorizes EVERY request — session, role, ownership — and denies by default. The client can suggest; only the server decides.",
      ], "rose"),
      scenario(
        "Case study · the IDOR",
        "A learner app shows certificates at /certificates/1043. A curious user changes the URL to /certificates/1044 — and sees someone else's certificate. Repeatable for every ID.",
        "Insecure Direct Object Reference: the endpoint checked that the user was LOGGED IN, but never that the certificate belonged to THEM. Every sequential ID on the platform was readable — a full data exposure with zero skill required.",
        "The fix is one line of thinking: fetch the resource, THEN verify resource.owner === session.user before rendering. Authorization is per-object, not per-login. This single habit eliminates the most common serious web vuln class.",
      ),
      quiz(
        "The best defense against SQL injection is:",
        ["Parameterized queries / prepared statements", "Escaping quotes manually", "A web application firewall alone", "Hiding error messages"],
        0,
        "Parameterization structurally separates code from data — injection becomes impossible rather than merely harder. Escaping is error-prone; WAFs are a layer, not the fix.",
        [
          "Knowledge check — remove the class of bug, not this instance.",
        ],
        "purple"
      ),
      recap([
        "Injection: untrusted input as code — kill it with parameterized queries.",
        "Broken access control: authorize per object, server-side, every request.",
        "XSS: escape output, add CSP — assume user content is hostile.",
        "Misconfiguration: debug off, errors generic, buckets private, defaults changed.",
        "Habits: validate at the boundary, deny by default, least privilege, keep patched.",
      ], [
        "What you now know.",
        "The Top 10 is not an exam topic — it is the taxonomy of what actually breaks, and you now know the structural fix for each risk you will meet.",
        "Next: your capstone project — a portfolio site built with every habit intact.",
      ], "rose"),
    ],
  },
];
