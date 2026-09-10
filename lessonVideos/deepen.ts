// ──────────────────────────────────────────────────────────────
// PiBridge Academy — Hand-Authored Lesson Deepening
// Practical walkthroughs, common pitfalls and real-world war
// stories for the 20 shortest lessons. These scenes are INSERTED
// (walkthrough after key terms, pitfalls after the walkthrough,
// war story before the recap) — enrichment still runs on top.
// ──────────────────────────────────────────────────────────────

import { DEEPEN2 } from "./deepen2";
import {
  steps,
  bullets,
  scenario,
  svgdiag,
  type LessonVideoScript,
  type VideoScene,
  type StepsObj,
  type BulletsObj,
  type ScenarioObj,
} from "./core";

// Re-export the authoring helpers so deepening files can import from "./deepen".
export { steps, bullets, scenario, svgdiag } from "./core";

export interface Deepening {
  /** Animated SVG illustration — inserted first (before walkthrough). */
  diagram?: VideoScene;
  /** Practical walkthrough — inserted after the last key-terms/terminal scene. */
  walkthrough: VideoScene;
  /** Where learners actually fail — inserted after the walkthrough. */
  pitfalls: VideoScene;
  /** Real-world war story — inserted before the recap. */
  warStory: VideoScene;
}

// ── Networking ──

const wireshark: Deepening = {
  diagram: svgdiag({
    heading: "Watch the packet's journey",
    sub: "a capture is the network's own testimony",
    template: "packet",
    accent: "green",
    lines: [
      "Wireshark makes the invisible visible: every packet on the wire, every header, every hop — the journey of your data captured in frames.",
      "Follow a TCP stream and you read a conversation instead of a pile of packets; sort by length and the bulk transfers — the exfiltration fingerprints — rise to the top.",
      "The capture is evidence: filters narrow it, streams read it, and the sequence tells the story that no single packet can.",
    ],
  }),
  walkthrough: steps({
    heading: "Walkthrough · your first investigation capture",
    accent: "green",
    steps: [
      { title: "Confirm your vantage point", detail: "span port or mirror = all traffic; your own NIC = only yours" },
      { title: "Capture 60 seconds of baseline", detail: "normal traffic first — you cannot spot 'weird' without 'normal'" },
      { title: "Apply the noise filter", detail: "not (arp or dns) strips the chatter from real conversations" },
      { title: "Sort by packet length", detail: "the largest packets reveal bulk transfers — exfiltration's fingerprint" },
      { title: "Follow the top talker's stream", detail: "right-click → Follow → TCP Stream to read the conversation" },
    ],
    lines: [
      "Let's run a real capture end to end, the way you will in the SOC.",
      "First, confirm your vantage point — a span port shows everyone's traffic; your own adapter shows only yours. Knowing which one you're on determines what your conclusions can even claim.",
      "Second, capture a minute of baseline before anything looks wrong. You cannot recognize abnormal until normal is familiar.",
      "Third, filter out the chatter: not arp and not dns removes the background hum so real conversations stand out.",
      "Fourth — and this is the investigator's trick — sort by packet length. Bulk exfiltration shows up as a wall of maximum-size packets leaving one host.",
      "Finally, follow the top talker's TCP stream and read what it said. Five steps, one verdict.",
    ],
  }),
  pitfalls: bullets({
    heading: "Pitfalls that burn beginners",
    accent: "rose",
    items: [
      { text: "Capturing on Wi-Fi without a monitor-mode adapter", detail: "you'll silently miss most frames and trust a half-truth", kind: "bad" },
      { text: "Filtering too early", detail: "a capture filter that's wrong means the evidence never existed — recapture takes time you won't have", kind: "bad" },
      { text: "Reading one packet in isolation", detail: "a single RST means nothing; the pattern around it means everything", kind: "bad" },
      { text: "Forgetting your own noise", detail: "your browser tab talking to analytics servers lands in the capture too", kind: "info" },
      { text: "Trust the capture over the alert", detail: "alerts guess; packets testify — when they disagree, believe the packets", kind: "good" },
    ],
    lines: [
      "Five traps catch almost every beginner — learn them here instead of during an incident.",
      "Wi-Fi capture without monitor mode silently drops most frames: you'll analyze half a conversation and never know it.",
      "Filtering too early is the expensive one — a wrong capture filter destroys evidence before it exists, and you can't recover time during a live incident.",
      "Never read a single packet in isolation. One RST is noise; thirty RSTs after a flood is a story.",
      "Remember your own machine pollutes the capture — close your tabs or filter your own IP out.",
      "And the golden rule: when the alert and the capture disagree, the capture wins.",
    ],
  }),
  warStory: scenario({
    label: "War story · the 3 AM capture that cleared an analyst",
    context: "A fintech's fraud team accused an intern of leaking customer data — his laptop was the source of a large overnight upload.",
    event: "The intern swore he left the machine locked. The SOC pulled the span-port capture: the upload used the corporate backup agent's exact TLS fingerprint and destination — a misconfigured scheduled task, not a human at all.",
    resolution: "The packet-level fingerprint (JA3 match + backup-server IP) cleared the intern in twenty minutes. Without the capture, an innocent person's career ends on circumstantial vibes.",
    question: "What single packet field would have exonerated him instantly?",
    lines: [
      "A real story from the industry — about why packets matter beyond catching attackers.",
      "A fraud team accused an intern of leaking data because his laptop was the source of a huge overnight upload. His career hung on circumstantial evidence.",
      "The capture told the truth: the upload carried the corporate backup agent's exact TLS fingerprint to the backup server — a scheduled task, not a person.",
      "Twenty minutes of packet reading cleared him. That is the real power of this skill: not just catching the guilty, but protecting the innocent.",
    ],
    accent: "green",
  }),
};

const linuxNetworking: Deepening = {
  diagram: svgdiag({
    heading: "The Linux network toolbox",
    sub: "one command per question — from interface to packet",
    template: "grid",
    labels: ["ip addr", "ss -tlnp", "ping", "traceroute", "curl", "tcpdump"],
    accent: "green",
    lines: [
      "Linux networking is a question-answer kit: ip addr asks 'do I have an address?', ss asks 'who is listening?', and ping asks 'can I reach it?'.",
      "traceroute maps the path hop by hop, curl speaks to actual services, and tcpdump shows the raw packets when everything else lies.",
      "The skill is knowing which question to ask at which layer — each command eliminates half the remaining possibilities.",
    ],
  }),
  walkthrough: steps({
    heading: "Walkthrough · diagnose 'the server is unreachable'",
    accent: "cyan",
    steps: [
      { title: "ip a", detail: "does the interface have the IP you expect — or anything at all?" },
      { title: "ip r", detail: "is there a default route via your gateway?" },
      { title: "ping 8.8.8.8", detail: "IP up but DNS broken — or the whole link down?" },
      { title: "ping 1.1.1.1 vs dig pibridge.com", detail: "separates routing problems from resolution problems" },
      { title: "ss -tulpn", detail: "is the service even listening on the port you're hitting?" },
    ],
    lines: [
      "Here's the diagnostic ladder you'll climb on every unreachable server — memorize the order.",
      "Start with ip a: no interface, no party. Half of all 'network down' tickets end right here — the interface has no address.",
      "Then ip r: you need a default route pointing at your gateway. An IP without a route is a phone without signal.",
      "Ping 8.8.8.8 by raw IP. If that works but hostnames fail, your problem is DNS, not networking — completely different fix.",
      "The split test: ping 1.1.1.1 and dig a known domain. Two different failure modes, two different teams to call.",
      "Last, ss -tulpn on the server itself: maybe the network is fine and the service simply died. Five commands, ninety seconds, problem isolated every time.",
    ],
  }),
  pitfalls: bullets({
    heading: "Pitfalls that burn beginners",
    accent: "rose",
    items: [
      { text: "Trusting ping success = service healthy", detail: "ping tests ICMP, not your app — a server can answer pings all day with a dead web service", kind: "bad" },
      { text: "Forgetting which netmask you typed", detail: "255.255.0.0 vs 255.255.255.0 changes who your neighbors are", kind: "bad" },
      { text: "Firewall debugging by guessing", detail: "use ss first — 'blocked' and 'not listening' look identical from outside", kind: "bad" },
      { text: "Editing netplan without --diff", detail: "one YAML space and your SSH session becomes a console-cable session", kind: "info" },
      { text: "Check from the server outward, not your laptop inward", detail: "always diagnose from the machine that hurts", kind: "good" },
    ],
    lines: [
      "The traps here bite everyone at least once — let's make it once.",
      "Ping success tells you the kernel is alive, nothing more. A web server can answer every ping while its process is dead — test the actual port with ss or curl.",
      "One wrong character in a netmask turns a /24 into a /16, and suddenly your server can't reach its own gateway. Check the mask before the cable.",
      "Don't guess at firewalls. 'Connection refused' and 'connection timed out' are different diagnoses: refused means it's listening and rejecting; timeout means nothing is there or a firewall drops silently.",
      "Edit network config with a safety net — a typo in YAML can end your SSH session and your remote access in one keystroke.",
      "And always diagnose from the machine that hurts, not from your comfortable laptop on the other side of the VPN.",
    ],
  }),
  warStory: scenario({
    label: "War story · the DNS outage that wasn't",
    context: "A payment gateway 'went down' at 09:02. Monitoring screamed; the network team blamed DNS; the DNS team blamed the network.",
    event: "A junior ran the ladder: ip a was fine, ip r was fine, ping 8.8.8.8 fine — but dig timed out. systemd-resolved had crashed after an unrelated package update at 09:00.",
    resolution: "systemctl restart systemd-resolved restored everything in eight seconds. Two teams spent forty minutes blaming each other over what a five-command ladder would have isolated in ninety.",
    question: "Which command in the ladder made the split between routing and resolution visible?",
    lines: [
      "A true story about why the ladder's order matters.",
      "A payment gateway 'went down'. The network team blamed DNS; the DNS team blamed the network. Forty minutes of mutual finger-pointing.",
      "A junior ran the ladder in silence: addresses fine, routes fine, raw pings fine — but name lookups dead. systemd-resolved had crashed two minutes before the alerts.",
      "One restart, eight seconds to fix. The ladder doesn't just find the problem — it ends the blame game, because each command eliminates a whole category.",
    ],
    accent: "cyan",
  }),
};

const jsFundamentals: Deepening = {
  diagram: svgdiag({
    heading: "Variables, types, and the closure",
    sub: "the three foundations everything else is built on",
    template: "grid",
    labels: ["let / const", "data types", "functions", "scope", "hoisting", "closures"],
    accent: "amber",
    lines: [
      "Variables and types are the vocabulary: primitives hold values, objects hold references, and const prevents reassignment, not mutation.",
      "Scope decides what your code can see — and closures are the superpower where a function remembers the scope it was born in.",
      "Hoisting explains the 'why' behind a whole class of confusing bugs: declarations move, initializations don't.",
    ],
  }),
  walkthrough: steps({
    heading: "Walkthrough · refactor copy-paste chaos into functions",
    accent: "amber",
    steps: [
      { title: "Spot the repeated block", detail: "same 6 lines computing VAT in three places — that's your function" },
      { title: "Name it as a verb", detail: "calculateVat(amount) — names that read like sentences age well" },
      { title: "Inputs become parameters", detail: "no hidden globals; everything the function needs arrives as arguments" },
      { title: "Return, don't print", detail: "return the value; let the caller decide what to do with it" },
      { title: "Replace all three copies", detail: "one edit now fixes every call site — that's the whole point" },
    ],
    lines: [
      "Theory is cheap — let's refactor real code the way working developers do.",
      "The smell: the same six lines computing VAT appear in three places. Fix the tax rate in two of them and you've shipped a bug — that's why repetition is the enemy.",
      "Extract it and name it like a verb: calculateVat. Good function names read like sentences and survive code review.",
      "Every hidden dependency becomes a parameter — the function receives the amount, it doesn't reach out and grab it. That discipline is what makes functions testable.",
      "Return the value; never print inside. The caller decides whether to display, store, or send it.",
      "Then replace all three copies with calls. The tax law changes once a year — now you edit one line instead of hunting three.",
    ],
  }),
  pitfalls: bullets({
    heading: "Pitfalls that burn beginners",
    accent: "rose",
    items: [
      { text: "== coerces types silently", detail: "'5' == 5 is true; '0' == false is true — always use ===", kind: "bad" },
      { text: "Missing return in a short arrow", detail: "x => { total * 1.15 } returns undefined — the braces ate your result", kind: "bad" },
      { text: "Mutating parameters", detail: "callers don't expect their arrays rearranged — copy first", kind: "bad" },
      { text: "Function names that lie", detail: "getUser() that also deletes sessions will haunt you", kind: "info" },
      { text: "One function, one job", detail: "if you need 'and' to name it, split it", kind: "good" },
    ],
    lines: [
      "JavaScript is friendly until 2 AM — these are the traps waiting there.",
      "Double-equals silently converts types: '5' equals 5, and '0' equals false. Use triple-equals always, and this whole bug family disappears.",
      "The arrow-function trap: add braces and you must say return. x goes in, undefined comes out, and the bug hides in plain sight.",
      "Never rearrange the array your caller handed you — they didn't sign up for that. Copy, then sort.",
      "Name functions honestly. getUser that also deletes sessions is a landmine with a friendly label.",
      "And the design rule that prevents all of this: one function, one job. If you need 'and' to name it, split it.",
    ],
  }),
  warStory: scenario({
    label: "War story · the ₵45,000 rounding bug",
    context: "A Ghanaian e-commerce startup computed VAT inline — copy-pasted — in four places across its checkout code.",
    event: "A refactor updated three copies but missed the mobile-web checkout, which kept an old rate for five weeks. Sales reconciled against the wrong total, and the company had to absorb the difference on thousands of orders: about ₵45,000.",
    resolution: "The fix took ten minutes: extract calculateVat, call it everywhere, add one unit test. The post-mortem's only action item: 'no monetary calculation may exist in two places.'",
    question: "How would one unit test have caught this before the money leaked?",
    lines: [
      "A story from the Ghanaian startup scene about why this lesson matters.",
      "VAT logic was copy-pasted in four places. A rate change updated three of them — the mobile checkout kept the old rate for five weeks.",
      "Nobody noticed until finance reconciled: thousands of orders, wrong totals, about forty-five thousand cedis absorbed by the company.",
      "The ten-minute fix — one function, one test — was always available. The post-mortem wrote one rule: no monetary calculation may ever exist in two places. That rule is this lesson.",
    ],
    accent: "amber",
  }),
};
// ── Web & React ──

const devtools: Deepening = {
  diagram: svgdiag({
    heading: "DevTools is a microscope",
    sub: "six panels, one goal: see what the browser is really doing",
    template: "grid",
    labels: ["Elements", "Console", "Sources", "Network", "Performance", "Application"],
    accent: "green",
    lines: [
      "DevTools turns the browser inside out: Elements shows the live DOM, Console shows the errors, and Sources is where you debug step by step.",
      "Network is the request lifecycle made visible — timing, headers, status codes, waterfalls — and Performance shows where the main thread actually waited.",
      "Application is the state attic: storage, cookies, service workers — the things that persist after the tab closes.",
    ],
  }),
  walkthrough: steps({
    heading: "Walkthrough · debug a layout in 4 moves",
    accent: "amber",
    steps: [
      { title: "Right-click → Inspect the offender", detail: "DevTools opens with the exact node selected — no hunting" },
      { title: "Read the box model diagram", detail: "margin in orange, border in tan, padding in green — where is the surprise space?" },
      { title: "Toggle styles live", detail: "tick boxes off, drag values — the hypothesis-test loop without a refresh" },
      { title: "Fix in the editor, verify in DevTools", detail: "the browser is a lab; your repo is the source of truth" },
    ],
    lines: [
      "Let's debug a real layout bug the way senior front-enders actually do it.",
      "Right-click the misbehaving element and Inspect. DevTools selects the exact node — never hunt through the DOM tree by hand again.",
      "Read the box model diagram at the bottom. Colors are a language: orange margin, tan border, green padding. The mystery gap almost always glows orange or green.",
      "Now test hypotheses live: untick a style, drag a padding value, flip flex-direction. Every change is instant and reversible — no save-refresh dance.",
      "When you've found the fix, apply it in your editor. DevTools is the lab; your repository is the source of truth — the lab never ships.",
    ],
  }),
  pitfalls: bullets({
    heading: "Pitfalls that burn beginners",
    accent: "rose",
    items: [
      { text: "Editing in DevTools and never porting the fix", detail: "one refresh and your 'fix' evaporates — it was never saved", kind: "bad" },
      { text: "Debugging minified production code line by line", detail: "hit the {} pretty-print button before reading anything", kind: "bad" },
      { text: "console.log loops instead of breakpoints", detail: "a breakpoint on a line shows every local at once — logs show what you predicted", kind: "bad" },
      { text: "Ignoring the Network tab's throttling menu", detail: "your fast connection hides what most of the world experiences", kind: "info" },
      { text: "Read the Console before anything else", detail: "errors name files and line numbers — start where the evidence is", kind: "good" },
    ],
    lines: [
      "DevTools traps are quiet — your work just evaporates later.",
      "The classic: fix a layout in the Styles pane, close the laptop, and tomorrow the bug is back because DevTools edits die on refresh. Port the fix or it never happened.",
      "Production code arrives minified on purpose. The braces button pretty-prints it instantly — stop reading one-letter variables raw.",
      "Graduate from console.log loops to breakpoints. A breakpoint shows every local variable at once; a log only shows what you thought to print.",
      "Use the Network tab's throttling menu — 'Fast 3G' is what your users on mobile data actually get.",
      "And the opener for every debugging session: read the Console first. Errors name the exact file and line.",
    ],
  }),
  warStory: scenario({
    label: "War story · the layout that only broke for customers",
    context: "A dev spent two days unable to reproduce a 'broken checkout button' that support insisted existed — on his screen it was fine.",
    event: "A teammate opened DevTools, clicked the device toolbar, and emulated a 360-pixel viewport at 'Slow 3G': the button's container collapsed under a fixed-width sibling. Reproduced in thirty seconds.",
    resolution: "The fix was one CSS line. The lesson stuck: 'works on my machine' is not a test — the device toolbar is where your users live. Every layout bug ticket since gets reproduced in emulation first.",
    question: "Which DevTools panel made the fixed-width sibling visible in seconds?",
    lines: [
      "A story about the gap between how devs see a page and how users see it.",
      "A checkout button 'sometimes broke' — but never on the developer's wide, fast machine. Two days of dead ends.",
      "Then someone emulated a 360-pixel phone on Slow 3G, and the bug reproduced instantly: a fixed-width sibling crushed the button's container.",
      "One CSS line to fix. Thirty seconds to find — once the tools matched reality. Your DevTools has your users' devices inside it; use them.",
    ],
    accent: "amber",
  }),
};

const reactRouter: Deepening = {
  diagram: svgdiag({
    heading: "The URL is state",
    sub: "routes map paths to components — navigation is just a state change",
    template: "grid",
    labels: ["BrowserRouter", "Routes", "Route path", "Link / NavLink", "URL params", "nested routes"],
    accent: "sky",
    lines: [
      "React Router treats the URL as state: a path matches a route, the route renders a component, and navigating is just changing that state.",
      "Links are declarative navigation — no full page reloads, no hand-written history manipulation; the router does the plumbing.",
      "URL params and nested routes let one layout wrap many pages — the path structure becomes the component tree.",
    ],
  }),
  walkthrough: steps({
    heading: "Walkthrough · structure a real app's routes",
    accent: "cyan",
    steps: [
      { title: "Wrap the app in BrowserRouter", detail: "once, at the root — everything inside can route" },
      { title: "Declare static routes first", detail: "/, /courses, /about — exact matches before wildcards" },
      { title: "Add parameter routes", detail: "path=\"courses/:courseId\" — useParams() reads the value" },
      { title: "Catch 404s with path=\"*\"", detail: "the wildcard route must come last — it matches everything" },
      { title: "Link, never <a>, for internal pages", detail: "<a> reloads the whole app; <Link> patches the DOM in place" },
    ],
    lines: [
      "Here's how a production React app organizes its routes — the pattern you'll reuse everywhere.",
      "BrowserRouter wraps the app exactly once, at the root. It listens to the URL and provides routing context to everything inside.",
      "Declare static routes first: home, courses, about. The router matches in order, so exact routes earn their place before any wildcards appear.",
      "Parameter routes come next: courses slash courseId. The colon marks a placeholder, and useParams hands the actual value to your component — one component serves every course.",
      "The star route catches everything unmatched — your 404 page. It must be declared last, or it swallows real routes.",
      "And the cardinal rule: Link for internal navigation, never a raw anchor. A tags reload the entire app; Link updates just the changing views.",
    ],
  }),
  pitfalls: bullets({
    heading: "Pitfalls that burn beginners",
    accent: "rose",
    items: [
      { text: "Star route declared first", detail: "it matches everything — your app is a 404 page now", kind: "bad" },
      { text: "State lost on navigation", detail: "routes unmount components — data you need must live above the router or in a store", kind: "bad" },
      { text: "useParams after a conditional return", detail: "hooks can't be conditional — read params before any early return", kind: "bad" },
      { text: "Forgetting the 404 route entirely", detail: "bad URLs render a blank page and support tickets", kind: "info" },
      { text: "Nested routes via Outlet", detail: "layout stays mounted while children swap — that's the whole win", kind: "good" },
    ],
    lines: [
      "Router bugs are ordering bugs, mostly. Here are the five you'll meet first.",
      "The star route matches everything — declare it first and no other route ever renders. Last, always.",
      "Navigating unmounts the old page. State stored only in that page is gone — lift it up or put it in a store before it hurts.",
      "Hooks rules apply to useParams: call it unconditionally at the top, before any early return, or React tears the component down.",
      "Ship a 404 route. A blank page on a bad URL reads as 'site is broken' to users.",
      "And learn Outlet early: nested routes keep the layout mounted while children change — headers stop flickering, scroll positions survive.",
    ],
  }),
  warStory: scenario({
    label: "War story · the 404 that ranked first on Google",
    context: "An academy's marketing team celebrated a surge of search traffic — but analytics showed visitors landing on a page with no content.",
    event: "The star route had been declared before a product route during a refactor. Google crawled the bad URL, indexed the blank page, and served it as the top result for the academy's brand name.",
    resolution: "Reordering the routes took one minute; re-crawling took three weeks. The team added a render test that asserts every route resolves to real content — including the wildcard.",
    question: "Why did users see a blank page instead of the 404 design?",
    lines: [
      "A story about how a route-ordering bug became a marketing incident.",
      "A refactor put the star route above a product route. Every visitor to that product URL saw the blank catch-all — including Google's crawler.",
      "Google indexed the blank page and ranked it first for the academy's own brand name. Thousands of first impressions: an empty screen.",
      "The route fix took a minute. The reputation fix took three weeks of re-crawling. Now a test asserts every route renders real content — even the 404.",
    ],
    accent: "cyan",
  }),
};

const whyLinux: Deepening = {
  diagram: svgdiag({
    heading: "Linux runs the internet",
    sub: "servers, cloud, containers, security tooling — all Linux",
    template: "grid",
    labels: ["Servers", "Cloud", "Containers", "Security tools", "Embedded / IoT", "Supercomputers"],
    accent: "green",
    lines: [
      "Linux is the operating system of the internet: most web servers, cloud instances, and containers are Linux under the hood.",
      "Security tooling — packet capture, forensics, penetration testing — lives on Linux, so the analyst's environment is the target environment.",
      "'Everything is a file' is the philosophy that makes it composable: processes, devices, and sockets all speak the same file-like interface.",
    ],
  }),
  walkthrough: steps({
    heading: "Walkthrough · survive your first 10 minutes on a server",
    accent: "cyan",
    steps: [
      { title: "whoami && pwd", detail: "confirm identity and location — permissions depend on both" },
      { title: "ls -la", detail: "hidden files (dotfiles) hold most of the configuration" },
      { title: "man ls — or ls --help", detail: "the manual is built in; reading it is a professional skill" },
      { title: "sudo -l", detail: "see what you're allowed to do before you try it" },
      { title: "history | tail -20", detail: "the last commands reveal what the last admin changed" },
    ],
    lines: [
      "You've just been dropped onto a production server. Ten minutes, five commands, full orientation.",
      "Start with whoami and pwd: identity and location. On Linux, everything you may touch depends on both — this is the difference between admin and spectator.",
      "ls -la next. The -a reveals dotfiles — the hidden configuration files where every server's personality actually lives.",
      "When a flag confuses you, man ls. The manual is installed on every machine, works offline, and answers precisely — reading it is the habit that separates professionals from pasters.",
      "sudo -l shows what you're permitted to run before you run it — discovering your permissions by denial is a bad look in an audit.",
      "And history pipe tail: the last twenty commands are the previous admin's diary. Read it before you change anything.",
    ],
  }),
  pitfalls: bullets({
    heading: "Pitfalls that burn beginners",
    accent: "rose",
    items: [
      { text: "Running wildsudo -rf as a guess", detail: "recursive force-delete has no undo — especially with sudo", kind: "bad" },
      { text: "Working as root because it's easier", detail: "one typo becomes an incident; sudo exists to make privilege deliberate", kind: "bad" },
      { text: "Paste terminal commands without reading them", detail: "curl pipe bash runs whatever the URL serves — today and forever", kind: "bad" },
      { text: "Ignoring case sensitivity", detail: "Server.txt and server.txt are different files — on Linux, always", kind: "info" },
      { text: "Tab completion is your armor", detail: "let the shell complete paths — typos in paths are how folders vanish", kind: "good" },
    ],
    lines: [
      "Linux gives you exactly enough rope — here's where beginners tie their first knots.",
      "Recursive force-delete with sudo has no trash can and no undo. Pause before any command containing -rf, and read the path twice.",
      "Working as root feels efficient until the day a typo touches the wrong directory. sudo makes privilege a deliberate act per command — keep it that way.",
      "Never paste install scripts you haven't skimmed. Curl-pipe-bash executes whatever the server sends — today, and every future day that server is compromised.",
      "Case sensitivity surprises everyone once: Report.txt and report.txt coexist happily on Linux.",
      "And let Tab complete your paths — the shell never mistypes what it completes for you.",
    ],
  }),
  warStory: scenario({
    label: "War story · the spacebar that deleted a database",
    context: "A junior meant to type: rm -rf /tmp/build-cache — but the shell had wrapped the line, and a space slipped in after the slash.",
    event: "rm -rf / tmp/build-cache executed on the production root account. The recursive delete started at the filesystem root before anyone could blink — SSH sessions dropped mid-command.",
    resolution: "Restores from backups took most of a day; the customer database survived on a replica. The team's standing rule became: alias rm='rm -i', never operate as root interactively, and any command starting with rm -rf gets pasted into a note and read twice first.",
    question: "Which single character turned a cache cleanup into a disaster?",
    lines: [
      "The most famous cautionary tale in Linux ops — and it starts with one keystroke.",
      "A junior meant to delete a build cache. A stray space after the slash redirected the delete from the cache folder to the filesystem root — on the root account.",
      "Sessions dropped as files vanished underneath them. The replica database survived; everything else came back from backups over a very long day.",
      "The defenses are boring and they work: interactive rm alias, no interactive root, and read destructive commands twice before pressing Enter. Boring is the point.",
    ],
    accent: "cyan",
  }),
};

const cssSelectors: Deepening = {
  diagram: svgdiag({
    heading: "The specificity war",
    sub: "who wins when two rules disagree",
    template: "specificity",
    accent: "green",
    lines: [
      "CSS conflicts are decided by specificity: inline styles beat ids, ids beat classes, classes beat elements — and !important beats all of them.",
      "The cascade compares specificity point by point — eleven classes still lose to one id — which is why 'just add more selectors' spirals.",
      "The professional habit is low-specificity selectors and a system: when two rules fight, the fix is structure, not a longer selector.",
    ],
  }),
  walkthrough: steps({
    heading: "Walkthrough · outrank specificity instead of fighting it",
    accent: "amber",
    steps: [
      { title: "Open DevTools → Styles", detail: "crossed-out rules lost the specificity fight — read why" },
      { title: "Count (id, class, element)", detail: "0,2,1 beats 0,1,3 — compare left to right, first difference wins" },
      { title: "Lower the winner instead of raising yours", detail: "remove an id from the selector — sustainable beats louder" },
      { title: "!important only for utilities and overrides", detail: "each one is a loaded weapon pointed at future-you" },
    ],
    lines: [
      "Specificity wars are how stylesheets die. Here's the professional way out.",
      "When a style doesn't apply, DevTools shows the losing rule struck through, right next to the winner. The answer is on screen — no guessing.",
      "Specificity is a three-number score: ids, classes, elements. Compare left to right; the first difference decides. 0-2-1 beats 0-1-9 because the second column wins.",
      "The sustainable fix is almost always lowering the winner — often just deleting an id from its selector. Raising your side works once, then the next developer raises again.",
      "Reserve !important for genuine override layers. Each one you drop into a stylesheet raises the cost of every future style change in that file.",
    ],
  }),
  pitfalls: bullets({
    heading: "Pitfalls that burn beginners",
    accent: "rose",
    items: [
      { text: "Adding !important to win a fight", detail: "now beating you requires two !importants — welcome to the arms race", kind: "bad" },
      { text: "Styling through long element chains", detail: "div ul li a span breaks the moment the markup breathes", kind: "bad" },
      { text: "Inline styles for convenience", detail: "they beat every stylesheet — future overrides need JS or !important", kind: "bad" },
      { text: "Inheritance isn't specificity", detail: "color inherits; borders don't — knowing which is which halves the confusion", kind: "info" },
      { text: "One class, one purpose", detail: ".btn-danger styling layout and color at once is why you can't reuse it", kind: "good" },
    ],
    lines: [
      "The same five mistakes kill a dozen stylesheets a day worldwide.",
      "!important wins the battle and loses the war — the next override needs two, and the stylesheet becomes unfixable by increments.",
      "Long selector chains break the moment the markup changes one level. Style classes, not architecture.",
      "Inline styles outrank everything you'll ever write in a file. Use them only when the value is truly dynamic from JS.",
      "Know what inherits: text properties flow down; boxes don't. Half of all 'why isn't this applying' is inheritance confusion, not specificity.",
      "And keep classes single-purpose — the moment a class means two things, you can't change either safely.",
    ],
  }),
  warStory: scenario({
    label: "War story · the important that ate the stylesheet",
    context: "A fintech dashboard had grown for two years. A blue 'primary' button rendered green for no reason anyone could trace.",
    event: "An audit found eleven !important declarations across five files — three fighting each other over the same button color, ordered only by which file loaded last.",
    resolution: "The fix wasn't finding the eleventh important — it was a two-day refactor to single-purpose classes with a written specificity ceiling: max 0,2,0. New CSS ships faster now than under the old regime, because nobody negotiates with load order anymore.",
    question: "What made the bug load-order dependent?",
    lines: [
      "A story about a bug that was a symptom, not a cause.",
      "A primary button rendered the wrong color. The real finding: eleven important declarations across five files, three of them fighting over that one button.",
      "The winner changed with file load order — different pages, different champions. Un-fixable by patching.",
      "The cure was structural: single-purpose classes and a hard specificity ceiling. The lesson — when stylesheets need detectives, the answer is never another important.",
    ],
    accent: "amber",
  }),
};
// ── Linux & Security Fundamentals ──

const systemd: Deepening = {
  diagram: svgdiag({
    heading: "A service's lifecycle",
    sub: "unit files, systemctl verbs, and the journal that tells the story",
    template: "tiers",
    labels: ["start", "active (running)", "inactive", "failed → restart"],
    accent: "green",
    lines: [
      "systemd manages services as units: a unit file declares how to start, stop, and restart a service, and systemctl is the control panel.",
      "A service's lifecycle is a small ladder: start brings it up, it runs active, it can become inactive on stop — and failed means the exit code lied about success.",
      "The journal is the memory: journalctl tells you what the service was doing before it died, which is where every investigation starts.",
    ],
  }),
  walkthrough: steps({
    heading: "Walkthrough · triage a dead service in 5 commands",
    accent: "cyan",
    steps: [
      { title: "systemctl status nginx", detail: "state, PID, and — crucially — the last 10 log lines inline" },
      { title: "journalctl -u nginx -n 50 --no-pager", detail: "the full recent log; the crash reason is almost always in here" },
      { title: "systemctl cat nginx", detail: "which unit file is running, and what ExecStart actually runs" },
      { title: "nginx -t", detail: "config test before restart — never restart into the same crash" },
      { title: "systemctl restart nginx && status", detail: "fix, restart, verify — in that order, every time" },
    ],
    lines: [
      "A service is down. Here's the five-command triage that solves most cases in under five minutes.",
      "systemctl status first — it shows the state, the process id, and, the part everyone misses, the last ten log lines right there. Read them before anything else.",
      "Need more history? journalctl -u with the unit name shows the service's entire journal. The crash reason — port in use, bad config, missing file — is written in plain English in there.",
      "systemctl cat shows which unit file is actually running and what command it executes. Surprises live here: wrong binary, wrong flags, wrong user.",
      "Before restarting, run the service's own config test. Restarting into the same crash wastes a cycle and your credibility.",
      "Then restart and immediately check status. Fix, restart, verify — the loop you'll run thousands of times in your career.",
    ],
  }),
  pitfalls: bullets({
    heading: "Pitfalls that burn beginners",
    accent: "rose",
    items: [
      { text: "enable without start (or the reverse)", detail: "enable = boot time; start = now. They do different jobs — check both", kind: "bad" },
      { text: "Editing unit files in place", detail: "use systemctl edit for overrides — package updates wipe raw edits", kind: "bad" },
      { text: "Killing processes instead of stopping services", detail: "kill -9 skips shutdown hooks; data corruption follows", kind: "bad" },
      { text: "journalctl without --no-pager in scripts", detail: "it blocks waiting for keys — automate with --no-pager", kind: "info" },
      { text: "daemon-reload after unit edits", detail: "edited a unit file? reload the manager or your changes don't exist", kind: "good" },
    ],
    lines: [
      "systemd has opinions. Here's where it bites the unprepared.",
      "Enable and start answer different questions: enable wires the service into boot; start runs it now. A freshly deployed service that vanishes after reboot was enabled but never started — or the reverse.",
      "Never edit unit files in /lib directly. systemctl edit creates override files that survive package updates — raw edits get silently reverted.",
      "Resist kill -9 as a first resort. Services have shutdown hooks that flush data; skipping them trades a slow stop for corrupted state.",
      "In scripts, always pass --no-pager to journalctl, or your automation hangs waiting for a keypress that never comes.",
      "And after editing any unit file: daemon-reload. Until you do, systemd is running its cached copy of reality.",
    ],
  }),
  warStory: scenario({
    label: "War story · the service that only died on Mondays",
    context: "A Ghanaian betting platform's API crashed every Monday around 06:30. Restart fixed it; nobody connected the pattern to anything.",
    event: "A new engineer ran journalctl with a time filter instead of grep. The logrotate cron ran Mondays at 06:30 — and the app wrote logs by absolute path, never reopening the rotated file. The old handle hit disk-full on the rotated volume.",
    resolution: "One unit-file line — StandardOutput=journal — moved logging into the journal proper. The Monday outage never returned, and the fix took less time than the six restarts it replaced.",
    question: "Why did restart fix it, and why did that hide the root cause?",
    lines: [
      "A story about a pattern hiding in plain logs.",
      "An API died every Monday morning. Restart fixed it, so nobody looked closer — until a new engineer filtered the journal by time instead of scrolling it.",
      "The Monday logrotate job rotated a file the app held open by absolute path. Monday 06:30, the handle hit a full disk. Every week. Same minute.",
      "The permanent fix was one line in the unit file. The meta-lesson: 'restart fixed it' is where root causes hide — periodic failures are scheduled somewhere, by definition.",
    ],
    accent: "cyan",
  }),
};

const threatActors: Deepening = {
  diagram: svgdiag({
    heading: "Know your adversaries",
    sub: "motivations differ — and so do the defenses",
    template: "grid",
    labels: ["Script Kiddie", "Hacktivist", "Insider", "Cybercriminal", "APT", "Nation-state"],
    accent: "rose",
    lines: [
      "Threat actors are defined by motivation: script kiddies want reputation, hacktivists want a statement, and cybercriminals want money.",
      "Insiders are the scariest because they start inside the perimeter with legitimate access — which is why least privilege and monitoring matter.",
      "APTs and nation-states bring patience and resources: months of quiet presence, custom tooling, and an objective beyond the quick score.",
    ],
  }),
  walkthrough: steps({
    heading: "Walkthrough · profile an attacker from indicators",
    accent: "rose",
    steps: [
      { title: "List what they used", detail: "tools, exploits, infrastructure — the technical fingerprint" },
      { title: "List what they wanted", detail: "data types, ransom, access — motive leaks through targeting" },
      { title: "Estimate resources", detail: "zero-days and custom malware = money; leaked creds and phishing = volume" },
      { title: "Match against actor classes", detail: "script kiddie, hacktivist, crime syndicate, insider, nation-state" },
      { title: "Predict their next move", detail: "actors repeat what worked — your defense goes where they'll return" },
    ],
    lines: [
      "Threat actors aren't interchangeable — here's how analysts profile one from evidence.",
      "First inventory: what did they use? Custom tooling and zero-days cost real money; recycled phishing kits cost nothing. The tooling prices the actor.",
      "Second: what did they take, or try to take? Customer records suggest crime; industrial designs suggest state interest; defacement suggests ideology.",
      "Third, estimate resources. A month-long intrusion with living-off-the-land patience is a different budget class than a smash-and-grab ransomware drop.",
      "Match the profile against the five classes — script kiddie, hacktivist, organized crime, insider, nation-state — and each class predicts different behaviors.",
      "The payoff is anticipation: actors repeat techniques that worked. Your monitoring goes where they'll come back, not where they've been.",
    ],
  }),
  pitfalls: bullets({
    heading: "Pitfalls that burn analysts",
    accent: "rose",
    items: [
      { text: "Assuming sophistication from impact", detail: "a catastrophic outage can be one bored teenager — judge tooling, not damage", kind: "bad" },
      { text: "Attributing from one indicator", detail: "tools are shared, sold and stolen — one hash proves nothing", kind: "bad" },
      { text: "Ignoring insiders", detail: "they need no exploit — they have badges. Most damaging class, least modeled", kind: "bad" },
      { text: "Snapshot thinking", detail: "actors retool constantly; last year's profile is this year's decoy", kind: "info" },
      { text: "Defend against the class you actually face", detail: "a bank's threat model ≠ a school's — resource allocation follows profiling", kind: "good" },
    ],
    lines: [
      "Actor profiling has its own traps — these trip up new analysts constantly.",
      "Impact tells you nothing about sophistication. A nation-state and a bored teenager can both take down a hospital; look at the tooling, never the crater.",
      "Never attribute from a single indicator. Malware is shared, resold, and false-flagged — one hash pointing at a group is a rumor, not evidence.",
      "The most damaging class is the one least modeled: insiders. They need no exploit, no delivery, no malware — they have a badge and a grievance.",
      "Profiles expire. Actors retool when techniques leak; refresh your model or defend against ghosts.",
      "And profile to allocate defense: a bank and a school face different classes. Your budget should face your actual adversary.",
    ],
  }),
  warStory: scenario({
    label: "War story · the 'nation-state' that was a contractor",
    context: "A logistics firm was hit by a precise intrusion — stolen credentials, clean lateral movement, targeted file access. Executives assumed nation-state espionage and briefed legal for a cyber-war response.",
    event: "The responder profiled properly: the attacker used a consumer VPN, worked a strict 9-to-5 timezone, and only touched documents named in a recent staff dispute. The tradecraft pointed to a recently departed employee whose credentials were never revoked.",
    resolution: "One disabled account ended the 'campaign'. The company rebuilt its offboarding process that week — and learned that actor profiling exists to right-size the response, not to make it dramatic.",
    question: "Which behavioral clue ruled out a foreign intelligence service?",
    lines: [
      "A story about profiling saving a company from its own imagination.",
      "A clean, precise intrusion triggered executive fantasies of cyber-war. Legal was briefed; the response escalated.",
      "The analyst profiled behavior instead: consumer VPN, office-hours activity, files matching a recent HR dispute. That's not a spy — that's a former employee with live credentials.",
      "Disabling one account ended the incident. Profiling isn't about drama — it's about spending the right response on the right adversary.",
    ],
    accent: "rose",
  }),
};

const passwordSecurity: Deepening = {
  diagram: svgdiag({
    heading: "Hash, never encrypt, passwords",
    sub: "one-way by design — recovery is the red flag",
    template: "hashenc",
    accent: "amber",
    lines: [
      "Passwords must be hashed, never encrypted: a hash is one-way by design, so a stolen database yields no recoverable passwords.",
      "Salting defeats rainbow tables, and slow hash functions like bcrypt or argon2 make brute force a lifetime project instead of a weekend.",
      "The tell-tale sign of bad storage: a site that can 'email you your password' — that only works if they stored it recoverable, which means wrong.",
    ],
  }),
  walkthrough: steps({
    heading: "Walkthrough · audit passwords like an attacker",
    accent: "amber",
    steps: [
      { title: "Check the breach corpus first", detail: "haveibeenpwned's Pwned Passwords API — attackers check it too" },
      { title: "Estimate entropy honestly", detail: "correcthorse > P@ssw0rd! — length beats symbol soup every time" },
      { title: "Test against your own policy", detail: "does your minimum actually stop the top 10,000 cracked passwords?" },
      { title: "Verify storage, not just choice", detail: "bcrypt/argon2 with salt — if you can 'retrieve' a password, you've already failed" },
      { title: "Put MFA on top and sleep", detail: "passwords fail; layers catch them" },
    ],
    lines: [
      "Think like the cracker, then close the gaps they'd walk through.",
      "Attackers don't guess — they check breach corpora first. The Pwned Passwords API lets you do the same check your users' passwords face nightly.",
      "Entropy is honest math: four random words outrank nine characters of symbol soup, because length multiplies while symbols merely add.",
      "Now test your own policy. Does your eight-character minimum reject the top ten thousand cracked passwords? Most don't — minimum length alone is theater.",
      "Then audit storage, which users never see: bcrypt or argon2 with per-user salt. If your system can email a forgotten password instead of resetting it, it was stored wrong — that's an incident, not a feature.",
      "Last, MFA. Passwords will fail — they're the layer you assume breaks. The layers above them are what you actually defend with.",
    ],
  }),
  pitfalls: bullets({
    heading: "Pitfalls that burn defenders",
    accent: "rose",
    items: [
      { text: "Composition rules that backfire", detail: "forced symbols make Password1! — predictable patterns, angrier users", kind: "bad" },
      { text: "MD5 or SHA-1 'because it's a hash'", detail: "fast hashes are what GPUs eat — you need deliberately slow ones", kind: "bad" },
      { text: "Skipping the salt", detail: "unsalted = rainbow tables crack your whole database in one afternoon", kind: "bad" },
      { text: "Security questions as recovery", detail: "mother's maiden name is public record — recovery paths are passwords too", kind: "info" },
      { text: "Length + manager + MFA", detail: "the boring trio that actually works — passphrases, password manager, second factor", kind: "good" },
    ],
    lines: [
      "Password advice ages badly. Here's what current attackers actually exploit.",
      "Complexity theater: forcing symbols produces Password1! at scale — predictable patterns plus furious users. Modern guidance trades composition rules for length and breach-checking.",
      "A hash is not a safe. MD5 and SHA-1 are fast by design — exactly what cracking GPUs want. Passwords need deliberately slow hashes: bcrypt, scrypt, argon2.",
      "Unsalted hashes die wholesale: rainbow tables crack every user in one afternoon. Salt is cheap; its absence is a breach.",
      "Recovery paths are passwords too — security questions have answers that are public record. Treat 'favorite teacher' like a password that's printed online.",
      "The trio that works: long passphrases, a password manager, MFA. Boring, effective, and what every security team actually runs.",
    ],
  }),
  warStory: scenario({
    label: "War story · the breach that reused a password",
    context: "A Ghanaian SaaS company with solid internal security got popped anyway. The entry point wasn't their app — it was a former contractor's admin account.",
    event: "That contractor had reused his work password on a gaming forum. The forum was breached; the credential-stuffing run hit the SaaS admin panel within hours. MFA wasn't enabled on that legacy account — it predated the policy.",
    resolution: "The company's fix list: MFA enforcement backfilled across every account regardless of age, automatic breach-corpus checks on password change, and quarterly dormant-account sweeps. Total cost: days. The breach cost: weeks and a very quiet board meeting.",
    question: "Which single control would have stopped the stuffing run?",
    lines: [
      "The most common breach story in the world — and it started outside the victim.",
      "A contractor reused his work password on a gaming forum. The forum got breached; credential stuffers hit the SaaS admin panel within hours.",
      "The cruel detail: MFA existed as policy — but that account predated it. One legacy exception, one entry point.",
      "The fixes were cheap: MFA everywhere with no grandfathering, breach-corpus checks on every password change, dormant-account sweeps. The lesson: your password security is only as strong as the least-guarded door.",
    ],
    accent: "amber",
  }),
};

const authFactors: Deepening = {
  diagram: svgdiag({
    heading: "Three categories of proof",
    sub: "true MFA draws from different categories — twice the same is just twice as phishable",
    template: "factors",
    accent: "cyan",
    lines: [
      "Authentication factors come in three categories: something you know — passwords and PINs; something you have — authenticator apps and keys; and something you are — biometrics.",
      "True MFA combines different categories; a password plus a PIN is two knowledge factors — twice as phishable, not twice as safe.",
      "SMS codes are the weakest second factor because SIM swapping hands them over; hardware keys resist phishing by design.",
    ],
  }),
  walkthrough: steps({
    heading: "Walkthrough · design MFA that users won't bypass",
    accent: "cyan",
    steps: [
      { title: "Map your factors honestly", detail: "know (password), have (phone/key), are (biometric) — pick two from different rows" },
      { title: "Prefer app-based over SMS", detail: "TOTP codes can't be SIM-swapped; SMS is the weakest 'have'" },
      { title: "Offer hardware keys to high-risk roles", detail: "FIDO2 keys are phishing-resistant by design — admins and finance first" },
      { title: "Design the recovery path as carefully as login", detail: "attackers now route around MFA through 'forgot everything' flows" },
      { title: "Log factor usage", detail: "password-from-new-country + old-factor success = your incident feed" },
    ],
    lines: [
      "MFA done wrong is theater with extra steps. Here's the design that holds.",
      "Start honest about the three factor rows: something you know, have, or are. Two factors from the same row — password plus security question — is single-factor wearing a costume.",
      "Prefer authenticator apps over SMS wherever you can. TOTP codes live on the device; SMS lives on a SIM that a phone-store social engineer can clone.",
      "Hardware keys for the crown jewels: admins, finance, executives. FIDO2 keys verify the site itself, so a phishing page simply can't relay them.",
      "Now design recovery — the path attackers actually take. 'Forgot my phone' flows that fall back to security questions have just unbought your MFA.",
      "Finally, log which factor authenticated what. A password from a new country followed by a success is exactly what your alerting exists to catch.",
    ],
  }),
  pitfalls: bullets({
    heading: "Pitfalls that burn defenders",
    accent: "rose",
    items: [
      { text: "SMS as the flagship factor", detail: "SIM-swap attacks convert your strongest control into a phone call", kind: "bad" },
      { text: "Weak fallback questions", detail: "MFA that recovers to 'first pet' is single-factor with a queue", kind: "bad" },
      { text: "MFA fatigue attacks", detail: "flooding push prompts until someone taps Yes — use number matching", kind: "bad" },
      { text: "Treating biometrics as a secret", detail: "they're usernames you can't rotate — pair them, never rely on them alone", kind: "info" },
      { text: "Phishing-resistant for admins", detail: "FIDO2/passkeys verify origin — the one factor phish can't relay", kind: "good" },
    ],
    lines: [
      "MFA fails in predictable ways — here's the current attack menu.",
      "SMS remains everywhere for one reason: convenience. It's also the factor a phone-store employee can clone with a rehearsed phone call.",
      "Weak fallback questions unbought your second factor. If 'first pet' can recover the account, the attacker never needed your TOTP code.",
      "Push-bombing: spraying approval prompts at 2 AM until a sleepy user taps Yes. Number matching — 'enter 47' — kills this dead.",
      "Biometrics are identifiers you can never rotate. A leaked fingerprint is leaked forever — pair biometrics with possession, never replace it.",
      "And for privileged accounts, hold the line at phishing-resistant: FIDO2 keys verify the origin site, which makes relay-phishing structurally impossible.",
    ],
  }),
  warStory: scenario({
    label: "War story · the MFA that took the phone call",
    context: "A treasury analyst at a Ghanaian bank had MFA — SMS codes. A fraudster spent two weeks building a profile: socials, phone number, and a friendly voice.",
    event: "A Saturday-morning SIM-swap call to the carrier, a sob story about a lost phone, and the analyst's number lived on a new SIM by noon. The bank's SMS codes arrived obediently to the attacker, who drained the transfer limit before the analyst's real phone went silent.",
    resolution: "The bank's response outlived the incident: TOTP apps for all treasury staff, hardware keys for approvers, number-matching pushes, and a hard rule that factor changes freeze high-value transfers for 24 hours. The fraudster's technique died with the SMS dependency.",
    question: "Which property of SMS made the swap possible at all?",
    lines: [
      "A story every bank training deck now includes.",
      "The target had MFA — SMS codes. The attacker didn't attack the code; he attacked the phone number receiving it.",
      "A two-week profile, one convincing call to the carrier, and the SIM was his by Saturday noon. The bank delivered its precious second factor straight to the attacker.",
      "The countermeasures are all 'move off SMS': authenticator apps, hardware keys, number matching, and a freeze window after any factor change. MFA is only as strong as its weakest delivery channel.",
    ],
    accent: "cyan",
  }),
};
// ── Security Architecture & SOC ──

const netsecArch: Deepening = {
  diagram: svgdiag({
    heading: "Defense in depth, ring by ring",
    sub: "no single control is trusted — layers buy time and detection",
    template: "defense",
    accent: "purple",
    lines: [
      "Network security architecture is layered: the data itself, the application, the endpoint, and the network each get their own controls.",
      "The philosophy is distrust: assume any single ring can fail and make the layers overlap — segmentation, firewalls, EDR, and encryption together.",
      "Every ring an attacker must defeat is time and detection bought — which is why depth beats any single perfect control.",
    ],
  }),
  walkthrough: steps({
    heading: "Walkthrough · segment a flat network in a week",
    accent: "rose",
    steps: [
      { title: "Inventory and group by trust", detail: "POS, guest, corporate, servers, management — five zones from one flat LAN" },
      { title: "Write the policy in plain sentences", detail: "guest may reach internet only; POS may reach the payment processor only" },
      { title: "Translate to VLANs + firewall rules", detail: "one VLAN per zone; default-deny between zones; allow-list what the policy named" },
      { title: "Pilot with the noisiest, least critical zone", detail: "guest Wi-Fi breaks harmlessly and teaches you everything" },
      { title: "Log inter-zone denies for a month", detail: "the denies show what you got wrong — tune before enforcing" },
    ],
    lines: [
      "A flat network is one breach away from total breach. Here's the segmentation path that actually ships.",
      "Inventory everything, group by trust, not by department: payment devices, guests, workstations, servers, management. Trust is the axis that matters when something is compromised.",
      "Write the policy in sentences a manager can read — guest reaches internet only, POS reaches the processor only. If you can't say it plainly, you can't implement it correctly.",
      "Translate to VLANs with default-deny between zones, and allow-list exactly what the sentences named. The firewall config should read like the policy doc.",
      "Pilot on guest Wi-Fi first — it's low-stakes and instantly exercises every rule you wrote.",
      "Then log inter-zone denies for a month before enforcing. The denies are your mistakes speaking; tune them away, then flip to enforce.",
    ],
  }),
  pitfalls: bullets({
    heading: "Pitfalls that burn architects",
    accent: "rose",
    items: [
      { text: "One flat 'trusted' zone with a strong firewall at the edge", detail: "a hard shell around soft inside — one phish and the attacker owns everything", kind: "bad" },
      { text: "Over-segmenting on day one", detail: "fifty zones nobody can troubleshoot gets ripped back out; start with five", kind: "bad" },
      { text: "Forgetting east-west traffic", detail: "attackers move laterally; most firewalls only watch north-south", kind: "bad" },
      { text: "Shadow rules accumulated over years", detail: "audit allow-lists quarterly — dead rules are open doors with no owner", kind: "info" },
      { text: "Default deny, allow by exception", detail: "the only scalable posture — every flow exists because someone named it", kind: "good" },
    ],
    lines: [
      "Architecture mistakes are expensive to notice and more expensive to unbuild.",
      "The classic: a hardened perimeter around a totally flat inside. Attackers call it the shell — one phishing credential and everything east of the firewall is theirs.",
      "Over-segmentation kills projects: fifty zones on day one means every ticket takes fifty route reviews. Five zones that ship beat fifty that don't.",
      "Watch east-west traffic — attackers live laterally. A firewall stack that only guards the internet edge is guarding the door while ignoring the hallways.",
      "Firewall rules rot into shadow rules. Quarterly audits remove the unowned allows — every dead rule is a door someone forgot.",
      "The posture that scales: default deny with named exceptions. Every allowed flow has an owner and a reason.",
    ],
  }),
  warStory: scenario({
    label: "War story · guest Wi-Fi saved the pipeline",
    context: "A Ghanaian energy company segmented in phases — corporate first, then OT networks, with guest Wi-Fi as the safe pilot zone.",
    event: "Six months later, a contractor's infected laptop connected to guest Wi-Fi. The default-deny policy held: the laptop could reach nothing internal. The same malware, on the pre-segmentation network, would have found the SCADA file shares in minutes.",
    resolution: "The CISO's board slide was one sentence: 'Segmentation paid for itself before it was finished.' The pilot zone hadn't just taught them segmentation — it caught the first real attack.",
    question: "Why was guest Wi-Fi the right pilot zone?",
    lines: [
      "A story about doing architecture in the right order.",
      "The energy company segmented deliberately: corporate, then OT, piloting on guest Wi-Fi. Slow, unglamorous, thorough.",
      "Six months in, a contractor's infected laptop hit guest Wi-Fi — and hit default-deny on every side. It could reach the internet and nothing else.",
      "Before segmentation, that laptop would have browsed internal shares at leisure. The pilot zone caught the first real attack before the program even finished. Architecture is prevention you can measure — occasionally in the same quarter you build it.",
    ],
    accent: "rose",
  }),
};

const loggingMonitoring: Deepening = {
  diagram: svgdiag({
    heading: "See what your systems are doing",
    sub: "metrics, logs, and traces — the observability trio",
    template: "obs",
    accent: "teal",
    lines: [
      "Security logging and monitoring rest on the same pillars as performance observability: metrics show trends, logs carry evidence, and traces follow the flow.",
      "The security metric that matters is deviation: auth failures spiking, new outbound flows, login times shifting — alerts should fire on change, not on existence.",
      "An audit trail you never read is theater — monitoring means reviews, alert owners, and answers to 'so what?' on every signal.",
    ],
  }),
  walkthrough: steps({
    heading: "Walkthrough · build a logging pipeline that answers questions",
    accent: "cyan",
    steps: [
      { title: "List the questions first", detail: "who did what, from where, when? — collect sources that answer them" },
      { title: "Centralize before you analyze", detail: "logs on the box die with the box — ship to a collector an attacker can't reach" },
      { title: "Normalize timestamps to UTC", detail: "correlation across systems dies at timezone boundaries" },
      { title: "Set retention by regulation, not habit", detail: "PCI says 12 months hot; 'forever' costs money and finds nothing" },
      { title: "Alert on behaviors, not strings", detail: "'5 failed logins then success' beats grepping for 'error' forever" },
    ],
    lines: [
      "Logging fails in a predictable way: collected everything, can answer nothing. Build it backwards from questions.",
      "Write the questions first: who authenticated, from where, what did they touch, when did it change? Each question names its sources — auth logs, VPN, file servers, change management.",
      "Centralize early. Logs that live on the compromised machine are the attacker's to edit — shipping them to a separate collector preserves the witness.",
      "Normalize every timestamp to UTC the moment it's collected. Correlating three systems across three timezones is how intrusions hide for months.",
      "Set retention deliberately: regulations name minimums, storage names costs. 'Keep everything forever' is how logging budgets die and pipelines get turned off.",
      "And alert on behaviors — a burst of failures followed by a success is an attack pattern no single log line will ever spell out.",
    ],
  }),
  pitfalls: bullets({
    heading: "Pitfalls that burn defenders",
    accent: "rose",
    items: [
      { text: "Collecting everything, tuning nothing", detail: "storage bills and alert fatigue kill SIEM projects — log with intent", kind: "bad" },
      { text: "Forgetting clock sync (NTP)", detail: "unsynced clocks make timelines fiction — correlation needs shared time", kind: "bad" },
      { text: "Logs only on the endpoint", detail: "the first thing malware does is stop logging — remote collectors survive", kind: "bad" },
      { text: "Alerts nobody owns", detail: "an alert without a named responder is a wish, not a control", kind: "info" },
      { text: "Test the pipeline with a canary", detail: "log a fake event end-to-end weekly — silence means you're blind", kind: "good" },
    ],
    lines: [
      "The failure modes of monitoring are organizational as much as technical.",
      "Collect-everything dies twice: once when storage bills spike, once when analysts drown in noise and stop reading. Log to answer named questions.",
      "Without NTP, your timeline is fiction — three servers reporting three different 'nows' makes correlation impossible and alibis cheap.",
      "Endpoint-only logging means the intruder controls your evidence from minute one. Remote collection is the difference between a witness and an accomplice.",
      "Every alert needs a named human. An unowned alert is a wish written in config — nobody responds to wishes at 3 AM.",
      "Then verify the whole chain weekly with a canary event. A silent pipeline means you've been blind since whenever it broke — and you won't know when that was.",
    ],
  }),
  warStory: scenario({
    label: "War story · the attacker who edited the logs",
    context: "A ransomware crew with a month of dwell time logged into a logistics firm's servers nightly. The SOC saw nothing — alerts pointed at one server's logs.",
    event: "During cleanup, a responder compared the central collector against the servers' local logs. On the servers, whole hours were missing — wiped during the attacker's sessions. The central copy, untouchable from the compromised hosts, held everything: account creation, tool staging, lateral movement.",
    resolution: "The reconstruction — and the case against the crew — stood on the central log copy. The firm's post-incident change was architectural: collectors moved off-host, retention extended, and 'logs survive the host' became a non-negotiable requirement for every new system.",
    question: "Why did the central copy survive when local logs didn't?",
    lines: [
      "The story that justifies every centralization project.",
      "A crew lived on a logistics firm's servers for a month. Local logs looked clean — because the attacker edited them during each visit.",
      "The central collector held the truth: hours of activity that existed nowhere on the compromised hosts. Account creation, tool staging, the lateral movement map — all preserved one hop away.",
      "The investigation succeeded because of one architectural choice: the witness wasn't standing where the crime happened. Ship your logs where attackers can't follow.",
    ],
    accent: "cyan",
  }),
};

const socMetrics: Deepening = {
  diagram: svgdiag({
    heading: "Measure the SOC, not the noise",
    sub: "KPIs that reflect readiness, response, and detection quality",
    template: "obs",
    accent: "amber",
    lines: [
      "SOC metrics fall into three families: readiness — coverage and staffing; response — time to triage, contain, and resolve; and quality — false positive and miss rates.",
      "Time-to-detect and time-to-respond are the numbers that matter to the business: MTTR beats MTBF when attacks are a given.",
      "Alert volume alone is vanity — a quiet SOC that misses everything is worse than a noisy one that catches it; measure both directions.",
    ],
  }),
  walkthrough: steps({
    heading: "Walkthrough · read a SOC's health from four numbers",
    accent: "purple",
    steps: [
      { title: "MTTD — mean time to detect", detail: "days? you're blind; hours? you're watching; minutes? you're tuned" },
      { title: "MTTR — mean time to respond", detail: "from alert to containment — the number the board should fear" },
      { title: "False-positive rate", detail: "above ~30% and analysts start ignoring the queue — tuning is retention" },
      { title: "Coverage against your threat model", detail: "percent of MITRE techniques you'd actually see — the honest maturity metric" },
    ],
    lines: [
      "SOC dashboards lie unless you know which numbers matter. Here are the four that do.",
      "MTTD — how long threats stay invisible. Days means you're finding breaches from press releases; hours means detection engineering is real.",
      "MTTR — alert to containment. This is the number that turns a successful intrusion into a bad week instead of a bad quarter.",
      "False-positive rate — the human metric. Above thirty percent, analysts go numb, and numb analysts miss the real alert. Tuning isn't cosmetic; it's retention engineering.",
      "And coverage measured against your threat model: of the techniques your actual adversaries use, what fraction would you see today? That percentage is maturity — everything else is vanity.",
    ],
  }),
  pitfalls: bullets({
    heading: "Pitfalls that burn SOC leads",
    accent: "rose",
    items: [
      { text: "Measuring alerts closed per day", detail: "rewards closing, not solving — analysts cherry-pick the easy queue", kind: "bad" },
      { text: "Buying tools to fix a process problem", detail: "a SIEM nobody tunes is an expensive database of regret", kind: "bad" },
      { text: "Ignoring analyst burnout signals", detail: "attrition is your leading indicator — burned analysts miss intrusions", kind: "bad" },
      { text: "Vanity metrics in board reports", detail: "'events processed' means nothing; incidents contained means everything", kind: "info" },
      { text: "Purple-team before metrics", detail: "measure the baseline first — improvement needs a before number", kind: "good" },
    ],
    lines: [
      "SOC metrics can hide failure while celebrating activity. The traps:",
      "Alerts-closed-per-day rewards cherry-picking. The easy tickets vanish; the hard investigation rots — and the dashboard glows green the whole time.",
      "Tool purchases don't fix process debt. An untuned SIEM is an expensive database where insights go to die — tune first, buy later.",
      "Watch analyst burnout like a technical metric, because it is one. Attrition degrades detection quietly, quarter by quarter.",
      "Boards don't need events-processed numbers. They need to know incidents contained and money saved — translate or lose the room.",
      "And before any purple-team exercise, capture your baseline numbers. Improvement without a before-number is just a feeling.",
    ],
  }),
  warStory: scenario({
    label: "War story · the metric that saved the SOC's budget",
    context: "A mid-tier Ghanaian bank's SOC faced a shutdown proposal: 'eight figures of spend, nothing to show.' The dashboard proudly displayed millions of events processed weekly.",
    event: "Before the board meeting, the SOC lead rebuilt the report around four numbers: MTTD had fallen from 19 days to 6 hours in a year, false positives from 61% to 22%, and a phishing campaign the previous quarter had been contained in 40 minutes — before payroll ran.",
    resolution: "The SOC survived with expanded budget. The lesson stuck: events processed measures cost; time-to-detect measures value. Report the language the business thinks in — risk and time — or be translated out of existence.",
    question: "Which vanity metric almost got the SOC killed?",
    lines: [
      "A story about speaking the board's language or dying as a cost center.",
      "The proposal framed the SOC as eight figures of spend with nothing to show. And the SOC's own dashboard agreed — it displayed events processed, which reads as cost.",
      "The lead rebuilt the story in time and risk: detection down from 19 days to 6 hours, false positives halved, a live phishing campaign contained in 40 minutes before payroll ran.",
      "Budget survived and grew. Metrics are translation work — convert your work into the business's units, or be priced like overhead.",
    ],
    accent: "purple",
  }),
};

const reactHooks: Deepening = {
  diagram: svgdiag({
    heading: "State in, screen out",
    sub: "useState triggers render; useEffect runs after paint",
    template: "reactflow",
    accent: "cyan",
    lines: [
      "useState is the trigger: setState schedules a re-render, and the component function runs again with the new value.",
      "useEffect is the afterword: it runs after the screen updates, which is where data fetching, subscriptions, and timers belong.",
      "The dependency array is the contract — list every value the effect reads, or the effect runs on stale state or at the wrong time.",
    ],
  }),
  walkthrough: steps({
    heading: "Walkthrough · a data-fetch hook done right",
    accent: "amber",
    steps: [
      { title: "State for the three phases", detail: "data, loading, error — every fetch has all three, plan for them" },
      { title: "Fetch inside useEffect with the dependency", detail: "[courseId] refetches when it changes — and only then" },
      { title: "Guard with an ignore flag", detail: "let cancelled = false; cleanup sets it — stale responses get dropped" },
      { title: "Handle the error state in UI", detail: "a loading spinner with no error branch is a spinner that lies" },
    ],
    lines: [
      "Let's write the fetch-hook pattern correctly once, so you never debug it blind again.",
      "Every fetch has three states, not one: data, loading, error. Model all three up front — components that skip 'error' ship spinners that spin forever.",
      "Fetch inside useEffect, with the changing value in the dependency array. When courseId changes, the effect re-runs; when it doesn't, nothing refetches.",
      "The bug that gets everyone: two fast changes, two responses, and the slow older one lands last. The cleanup function and an ignore flag fix it — when the effect tears down, it marks itself cancelled, and the late response gets dropped on arrival.",
      "Render all three branches. Data is the happy path; loading and error are where real apps actually spend their time.",
    ],
  }),
  pitfalls: bullets({
    heading: "Pitfalls that burn React devs",
    accent: "rose",
    items: [
      { text: "Missing dependency array", detail: "no array = run after every render — infinite loops with setState inside", kind: "bad" },
      { text: "Effect that sets state unconditionally", detail: "component unmounts mid-fetch → warning, leaks, stale UI", kind: "bad" },
      { text: "Syncing state from props in effects", detail: "usually means derived state — just compute it during render", kind: "bad" },
      { text: "Object/array literals in deps", detail: "new identity every render — the effect reruns forever; memoize or use primitives", kind: "info" },
      { text: "Read the error before silencing it", detail: "catch-swallow hides real failures; log or rethrow deliberately", kind: "good" },
    ],
    lines: [
      "useEffect is where React confidence goes to die. The five classics:",
      "No dependency array means the effect runs after every render. Put setState inside and you've built an infinite loop machine.",
      "An effect that fetches and sets state without cleanup corrupts UI when the component unmounts mid-flight — or worse, lets a slow old response overwrite a fresh one.",
      "If you're syncing state from props in an effect, stop: you probably want computed values during render, not a second source of truth.",
      "Object literals in dependency arrays are new objects every render — your effect reruns forever. Depend on primitives, or memoize the object.",
      "And never swallow caught errors silently. An empty catch block is a bug with its headlights off.",
    ],
  }),
  warStory: scenario({
    label: "War story · the infinite render that billed a customer",
    context: "A SaaS dashboard's cloud bill spiked 4x overnight. No deploys; no traffic change. The team stared at infrastructure graphs.",
    event: "A dev opened the Network tab: one analytics endpoint was hammered 30 times per second. A useEffect with an object literal in its dependency array — new identity every render, setState inside the effect — had become a perfect loop: render, effect, setState, render.",
    resolution: "One-line fix: depend on the primitive ID instead of the options object. The bill normalized; the team added an eslint rule banning object deps and a Network-tab check to their release checklist. The loop had shipped because it looked fine on a fast laptop — and ate money on every real user session.",
    question: "Why did the loop survive local testing?",
    lines: [
      "A story about a bug that printed money — for the cloud provider.",
      "The bill quadrupled overnight. No deploys, no traffic spike. Infrastructure was innocent.",
      "The Network tab told the truth in seconds: an analytics endpoint called thirty times per second from the client. A useEffect depended on an object literal — new identity every render — and set state inside. Render, effect, setState, render: a perfect fiscal loop.",
      "One line fixed it. The prevention is cultural: lint against object dependencies, and check the Network tab on real hardware before shipping. Fast laptops are where loops go unnoticed.",
    ],
    accent: "amber",
  }),
};
// ── React, TypeScript, Backend & Networking ──

const reactMemo: Deepening = {
  diagram: svgdiag({
    heading: "Why your component re-rendered",
    sub: "the render pipeline — and where memo intercepts it",
    template: "reactflow",
    accent: "amber",
    lines: [
      "Every re-render follows the same pipeline: state or props change, React re-runs your function, reconciles the tree, commits, and runs effects.",
      "React.memo sits between props and render: if the props are shallowly equal, the whole pipeline is skipped for that component.",
      "The catch: a fresh inline object or function makes the props never equal — the memo pays its comparison cost and saves nothing.",
    ],
  }),
  walkthrough: steps({
    heading: "Walkthrough · measure first, memoize second",
    accent: "amber",
    steps: [
      { title: "Open the Profiler, record, interact", detail: "the flame graph shows exactly which components re-rendered and why" },
      { title: "Find the actual hot component", detail: "sort by renders × duration — the top item is your only target" },
      { title: "Fix the cause before the symptom", detail: "inline objects/functions in props recreate every render — hoist or useCallback them" },
      { title: "Memoize only if the profile still hurts", detail: "React.memo + useMemo have their own cost — a measured win, never a reflex" },
    ],
    lines: [
      "Performance work has one rule: measure first. Here's the loop.",
      "Open the Profiler tab, hit record, and click around the app like an impatient user. Stop recording and the flame graph shows every re-render with its cause.",
      "Sort by committed duration times render count. One component usually owns the pain — that's your only target, not the whole tree.",
      "Before reaching for memo, fix the cause: inline object and function props get new identities every render and drag children along. Hoist them, or stabilize with useCallback.",
      "Still slow after honest fixes? Now React.memo and useMemo earn their keep. They carry their own comparison cost — keep them where the profile says they pay.",
    ],
  }),
  pitfalls: bullets({
    heading: "Pitfalls that burn React devs",
    accent: "rose",
    items: [
      { text: "Memoizing everything by default", detail: "every memo compares props — you can make rendering slower by optimizing blindly", kind: "bad" },
      { text: "useMemo for expensiveness that isn't", detail: "memoizing array.sort on 10 items costs more than sorting", kind: "bad" },
      { text: "useCallback on a handler passed to a memo'd child", detail: "the memo is pointless if the function prop changes identity — they work as a pair", kind: "bad" },
      { text: "Missing deps defeating the cache", detail: "a wrong dependency array recomputes every render — the memo silently does nothing", kind: "info" },
      { text: "Fix what the Profiler flagged", detail: "gut feelings find the wrong component nine times out of ten", kind: "good" },
    ],
    lines: [
      "Memoization mistakes are subtle because they look like diligence.",
      "Wrapping everything in React.memo adds a props comparison to every render. Blind optimization can genuinely slow an app down.",
      "useMemo has overhead too. Caching a sort of ten items spends more on remembering than on sorting.",
      "React.memo on a child is void if you hand it a fresh inline function each render. The memo and the stable callback are a package deal.",
      "A wrong dependency array quietly defeats the cache — recomputing every render while feeling optimized.",
      "Golden rule: the Profiler decides. Feelings mislocate render cost almost always.",
    ],
  }),
  warStory: scenario({
    label: "War story · the memo sweep that slowed the app",
    context: "A fintech dashboard felt sluggish on low-end phones. A well-meaning engineer wrapped forty components in React.memo in one afternoon.",
    event: "The app got slower. Every memo'd component now ran props comparisons on every render — and half the props were inline objects and arrow functions, so the comparison always failed, paying for a cache that never hit.",
    resolution: "A Profiler session found the real culprit: one table rendering 500 rows on every keystroke of a search box. Memoizing the row component and debouncing the input — two targeted changes — cut render time 80%. The memo sweep was reverted line by line.",
    question: "Why did the memo comparisons always fail?",
    lines: [
      "A story about optimization that made things worse.",
      "A slow dashboard met a fast solution: wrap forty components in memo. One afternoon, done.",
      "It got slower. Every wrapper ran comparisons on props that were new objects every render — pure cost, zero hits.",
      "The Profiler found the real problem: a 500-row table re-rendering per keystroke. Two targeted fixes beat forty blind ones, and the sweep was reverted. Measure, then cut — never the reverse.",
    ],
    accent: "amber",
  }),
};

const tsProps: Deepening = {
  diagram: svgdiag({
    heading: "Five typing habits, one component",
    sub: "props are documentation that compiles",
    template: "grid",
    labels: ["Props interface", "Union types", "Event types", "Defaults", "Inference"],
    accent: "cyan",
    lines: [
      "A Props interface above the component is the contract: autocomplete, error messages, and docs that can never go stale.",
      "Union types turn closed sets into compile errors — the impossible state 'loding' can no longer reach production.",
      "Precise event types and defaults in the signature eliminate casts and scattered null-checks; inference handles the rest.",
    ],
  }),
  walkthrough: steps({
    heading: "Walkthrough · type a component the way seniors do",
    accent: "cyan",
    steps: [
      { title: "Define a Props interface above the component", detail: "one name, exported if parents need it — Props are documentation that compiles" },
      { title: "Use unions for closed sets", detail: "status: 'idle' | 'loading' | 'error' — typos become compile errors" },
      { title: "Type events precisely", detail: "React.ChangeEvent<HTMLInputElement> gives you .value typed for free" },
      { title: "Optional props get defaults, not checks", detail: "pageSize = 10 in the signature beats if (!pageSize) everywhere" },
      { title: "Let inference do the rest", detail: "useState(0) knows it's a number — don't annotate what's already known" },
    ],
    lines: [
      "Typing components well is mostly habit. Here's the habit.",
      "Declare a Props interface right above the component. It compiles into error messages, autocomplete, and documentation that can never go stale.",
      "Closed sets of values become union types: idle, loading, error. Now the impossible state 'loding' is a compile error, not a runtime mystery.",
      "Type your events precisely. ChangeEvent of HTMLInputElement knows about .value — no casting, no any, full autocomplete in the handler.",
      "Optional props deserve defaults in the signature, not null-checks scattered through the body. One line at the top beats ten guards below.",
      "Then stop annotating what inference already knows. useState with a number initial is a number — say it once, not everywhere.",
    ],
  }),
  pitfalls: bullets({
    heading: "Pitfalls that burn TypeScript learners",
    accent: "rose",
    items: [
      { text: "any as an escape hatch", detail: "any switches TypeScript off for everything downstream — unknown at least forces a check", kind: "bad" },
      { text: "The non-null assertion !", detail: "it silences the compiler, not the crash — the bug ships anyway", kind: "bad" },
      { text: "Duplicated inline prop types", detail: "the same shape written twice drifts apart — one interface, two importers", kind: "bad" },
      { text: "Annotating everything", detail: "inference is a feature; annotating consts is noise", kind: "info" },
      { text: "Discriminated unions for state", detail: "{ kind: 'loaded', data } beats { isLoading, data?, error? } — impossible states stop compiling", kind: "good" },
    ],
    lines: [
      "TypeScript punishes its escapes. The traps, in order of damage:",
      "any doesn't silence one error — it silences every error downstream of that value. If you truly don't know, unknown forces one honest check instead.",
      "The non-null exclamation is a lie you tell the compiler. It prevents no crash — it just moves the stack trace to production.",
      "The same prop shape inlined in two files will drift. One exported interface, imported twice — change it once, everywhere.",
      "Let inference work. Annotating every const is typing like it's Java — noise with no safety gained.",
      "And model state as discriminated unions so impossible states don't compile. Loaded-with-data and loading-without-data become different types — entire bug classes vanish.",
    ],
  }),
  warStory: scenario({
    label: "War story · the any that hid a ₵0 payout",
    context: "A payments team migrated checkout to TypeScript by sprinkling any wherever the compiler complained. It shipped green.",
    event: "The API renamed amountGHS to amountGhs. The typed path would have caught it at compile time — but the any-typed parser passed undefined through, and the payout batch paid every seller ₵0. The reconciliation job flagged it 36 hours later.",
    resolution: "The rewrite replaced every any with real interfaces and unknown-plus-guards. The next API change broke the build in CI instead of the ledger in production. The team's rule now: any requires a comment, a deadline, and a named owner.",
    question: "What single type would have caught the rename at build time?",
    lines: [
      "A story where a keyword cost real money.",
      "The migration 'shipped green' because every hard type became any. The compiler was happy; it had also been fired.",
      "The API renamed a field. Any-typed code passed undefined silently into payouts, and a settlement batch paid thousands of sellers zero cedis.",
      "Reconciliation caught it two days late. The rewrite made one rule real: escape hatches need comments, deadlines, and owners. Types only protect you while they exist.",
    ],
    accent: "cyan",
  }),
};

const sqlFundamentals: Deepening = {
  diagram: svgdiag({
    heading: "The SQL question kit",
    sub: "select, filter, combine, summarize — and index what you filter",
    template: "grid",
    labels: ["SELECT", "WHERE", "JOIN", "GROUP BY", "ORDER BY", "Index"],
    accent: "purple",
    lines: [
      "Every query is a sentence built from the same words: SELECT chooses columns, WHERE filters rows, JOIN combines tables.",
      "GROUP BY collapses rows into summaries and ORDER BY promises order — the two clauses you reach for in every report.",
      "An index is the database's own table of contents: it makes WHERE fast, and every index slows writes — a trade, not a freebie.",
    ],
  }),
  walkthrough: steps({
    heading: "Walkthrough · answer a business question in SQL",
    accent: "purple",
    steps: [
      { title: "Restate the question with nouns", detail: "'top 5 courses by enrollments last month' names tables, columns, a limit" },
      { title: "Find the tables and their join keys", detail: "enrollments.course_id = courses.id — sketch the joins on paper first" },
      { title: "Filter rows with WHERE before grouping", detail: "WHERE date > now() - interval '1 month' shrinks the work early" },
      { title: "GROUP BY + ORDER BY + LIMIT", detail: "group to counts, order descending, limit 5 — the question, translated" },
      { title: "Sanity-check the total", detail: "sum of the parts should match a naive COUNT — trust but verify your own query" },
    ],
    lines: [
      "SQL is the skill of translating business questions. Here's the translation method.",
      "Restate the request with its nouns: top five courses by enrollments last month. Nouns name tables and columns; adjectives become WHERE clauses.",
      "Sketch the joins on paper before typing. enrollments join courses on course id — ten seconds of drawing prevents an hour of wrong results.",
      "Filter early. A WHERE on date before the GROUP BY shrinks the dataset while it's still rows, not aggregates.",
      "Then the finishing clause stack: GROUP BY to count, ORDER BY descending to rank, LIMIT to answer exactly what was asked.",
      "Last, verify: the sum of your grouped counts should match a naive total. Your own query deserves the suspicion you'd give anyone else's.",
    ],
  }),
  pitfalls: bullets({
    heading: "Pitfalls that burn SQL beginners",
    accent: "rose",
    items: [
      { text: "WHERE vs HAVING confusion", detail: "WHERE filters rows before grouping; HAVING filters groups after — mixing them gives wrong or erroring SQL", kind: "bad" },
      { text: "Forgot JOIN condition → cross join", detail: "two tables multiplied instead of matched — millions of nonsense rows", kind: "bad" },
      { text: "NULL comparisons with =", detail: "NULL equals nothing, not even itself — use IS NULL", kind: "bad" },
      { text: "SELECT * in production code", detail: "schema changes break consumers silently; name your columns", kind: "info" },
      { text: "Read the EXPLAIN plan", detail: "a slow query is usually a missing index — the plan shows it in one line", kind: "good" },
    ],
    lines: [
      "SQL forgives nothing silently — it usually hands you confidently wrong data instead.",
      "WHERE runs before grouping, HAVING after. Swap them and you either get an error or — worse — plausible wrong numbers.",
      "A missing JOIN condition doesn't error; it multiplies. Two thousand rows times two thousand rows later, your report is fiction with perfect grammar.",
      "NULL is 'unknown', not a value. Column equals NULL matches nothing, ever — IS NULL is the only door.",
      "SELECT star couples your code to the whole schema. Name columns; your future self will thank you at every migration.",
      "When it's slow, read the EXPLAIN before guessing. Nine slow queries in ten are a missing index, visible in one line.",
    ],
  }),
  warStory: scenario({
    label: "War story · the report that doubled revenue",
    context: "A startup's board deck claimed 200% month-over-month growth. One investor asked to see the SQL.",
    event: "The growth query joined users to orders without a date filter on the join — every user matched every month's orders, double-counting across months. Corrected for the cross join, real growth was 12%. The query had no error, no warning, and beautiful charts.",
    resolution: "The startup survived the honesty; the analyst added a permanent practice: every aggregate query ships with a naive cross-check query whose numbers must reconcile. Truth in SQL is not what the query returns — it's what the question meant.",
    question: "Which single clause was missing to cause the double count?",
    lines: [
      "A story about SQL's most dangerous property: wrong answers look right.",
      "The board saw 200% growth. An investor asked for the query instead of the chart — the first due-diligence question everyone should ask.",
      "The join matched every user to every month. No error, no warning, gorgeous dashboards — and fiction.",
      "Real growth: 12%. The team's standing rule became an aggregate never ships without a naive reconciliation query. In SQL, correctness is the join you didn't forget.",
    ],
    accent: "purple",
  }),
};

const apiSecurity: Deepening = {
  diagram: svgdiag({
    heading: "API security is layered, not a wall",
    sub: "each control assumes the previous one leaked",
    template: "defense",
    accent: "rose",
    lines: [
      "No single control protects an API: authentication proves who, authorization proves they may, validation proves the payload is sane.",
      "Rate limiting and scoped tokens assume an attacker got past the first ring anyway — a leaked read-only token cannot delete.",
      "Logging the denies builds the outermost ring: detection feeds tomorrow's defenses, which is what makes the layers a system.",
    ],
  }),
  walkthrough: steps({
    heading: "Walkthrough · secure an endpoint from a blank file",
    accent: "rose",
    steps: [
      { title: "Authenticate first line, authorize second", detail: "who are you (token) vs may you do this (role) — different checks, both required" },
      { title: "Validate input at the boundary", detail: "schema-validate body, params and query — reject anything unexpected, loudly" },
      { title: "Scope tokens narrowly", detail: "a read-only token can't be replayed to delete — least privilege per token" },
      { title: "Rate-limit by identity, not just IP", detail: "shared NATs punish many users; per-key limits punish the abuser" },
      { title: "Log denies with context", detail: "every 401/403 with identity + route — your detection depends on it" },
    ],
    lines: [
      "Every endpoint deserves the same five decisions. Make them in order.",
      "Authentication then authorization — and never confuse them. The token proves who; the role check proves they may. Skipping the second is how logged-in users read each other's data.",
      "Validate at the boundary with a schema. Body, params, query — anything not in the schema is rejected. Unknown fields are either bugs or attacks; both deserve a 400.",
      "Issue narrow tokens. A token that can only read can't be replayed to delete — scope is what makes token theft survivable.",
      "Rate-limit by API key and user, not just IP. Offices share IP addresses; punishing the NAT punishes everyone but the attacker.",
      "And log every denial with identity and route. Authorization denies are free threat intelligence — if you record them.",
    ],
  }),
  pitfalls: bullets({
    heading: "Pitfalls that burn API builders",
    accent: "rose",
    items: [
      { text: "Client-side checks as security", detail: "hiding the button ≠ removing the permission — the API is the boundary", kind: "bad" },
      { text: "IDOR — sequential IDs, no ownership check", detail: "/orders/1042 is a guessable address to everyone else's data", kind: "bad" },
      { text: "Verbose errors that leak internals", detail: "stack traces and SQL in 500s are reconnaissance gifts", kind: "bad" },
      { text: "Trusting Content-Type", detail: "validate the parsed body, not the header — the header is a suggestion", kind: "info" },
      { text: "Deny by default", detail: "new endpoints should fail closed until opened deliberately", kind: "good" },
    ],
    lines: [
      "API breaches are rarely exotic — they're the same five shortcuts.",
      "Frontend hiding is theater. The attacker calls your API directly; the server-side permission check is the only one that exists.",
      "IDOR is the classic breach: sequential IDs with no ownership test. If /orders/1042 returns someone else's order, that's not a bug — it's an incident report waiting.",
      "Error messages leak stacks, SQL, and paths. Production errors say what failed for the user; details go to logs, not responses.",
      "Content-Type is a claim, not a fact. Parse, validate, then trust.",
      "Default every new endpoint to deny. An endpoint that accidentally works open is an incident you haven't found yet.",
    ],
  }),
  warStory: scenario({
    label: "War story · the IDOR that read a nation's invoices",
    context: "A Ghanaian e-invoicing platform used sequential invoice IDs: /api/invoices/1, /api/invoices/2 … The frontend was beautiful; the ownership check was missing.",
    event: "A security researcher — responsibly — walked the ID range from a free account and received other businesses' invoices: names, amounts, TINs. Hundreds of thousands of documents, one incrementing URL, zero privileges.",
    resolution: "The fix took a day: ownership in the query, UUIDs for new records, and an audit of every list endpoint. The disclosure took months of careful coordination — and the platform's enterprise sales deck now leads with that audit, turned from liability into proof.",
    question: "What made the walk possible without any hacking tools?",
    lines: [
      "The IDOR story every API team should tattoo somewhere visible.",
      "Sequential invoice IDs, a free account, and a browser — that was the entire attack. No exploit kit, just plus-one.",
      "Every invoice in the system: names, amounts, tax IDs. One missing WHERE clause away from public.",
      "Ownership checks and UUIDs closed it in a day; the responsible disclosure took months. The audit later became a sales asset — security done loudly is marketing.",
    ],
    accent: "rose",
  }),
};

const dnsDhcp: Deepening = {
  diagram: svgdiag({
    heading: "A name's journey to an address",
    sub: "every hop is a cache that can be the liar",
    template: "packet",
    accent: "green",
    lines: [
      "Resolution walks a chain: your machine's cache, the configured resolver, root and TLD servers, then the authoritative answer.",
      "DHCP hands your machine its address and — crucially — which resolver to ask, which is how a misconfigured router poisons every lookup on the network.",
      "TTL decides how long each hop may remember the answer: flushing the cache only helps when the cache is the liar.",
    ],
  }),
  walkthrough: steps({
    heading: "Walkthrough · trace a name from browser to IP",
    accent: "green",
    steps: [
      { title: "nslookup pibridge.com", detail: "asks your configured resolver — the first witness" },
      { title: "nslookup pibridge.com 8.8.8.8", detail: "same question, different resolver — do the answers agree?" },
      { title: "ipconfig /all or resolv.conf", detail: "which resolver is your machine actually consulting?" },
      { title: "Check the TTL", detail: "long TTL = stable record; 300s = it changes often, plan for it" },
      { title: "ipconfig /flushdns", detail: "when the cache is the liar, empty it — then retest" },
    ],
    lines: [
      "'The site doesn't resolve' is a detective story with a fixed cast. Meet the suspects in order.",
      "Ask your default resolver first with nslookup. Whatever it answers, ask 8.8.8.8 the same question — disagreement localizes the lie.",
      "If the two disagree, your machine's configured resolver is the suspect: read it from ipconfig slash all or resolv.conf. It's usually the router or the DHCP server — which brings DHCP into the story.",
      "Check the record's TTL. A 3600-second TTL means changes propagate slowly — patience is part of the fix. A 300-second TTL means this record moves often and caching layers matter.",
      "When the local cache is the liar, flush it and retest. Half of all 'DNS is broken' tickets die at exactly this step.",
    ],
  }),
  pitfalls: bullets({
    heading: "Pitfalls that burn network engineers",
    accent: "rose",
    items: [
      { text: "One DHCP server, two subnets", detail: "rogue DHCP hands out wrong gateways — the quiet MITM factory", kind: "bad" },
      { text: "Forgetting DNS propagates slowly", detail: "low TTL before a migration, or users cache the old IP for a day", kind: "bad" },
      { text: "Static IPs inside the DHCP pool", detail: "one collision, one very confusing Tuesday", kind: "bad" },
      { text: "Assuming DNS failure = network failure", detail: "raw-IP ping works? It's resolution, not routing — different team", kind: "info" },
      { text: "DHCP reservations for servers", detail: "fixed addresses without static config drift — the best of both", kind: "good" },
    ],
    lines: [
      "DNS and DHCP fail in familiar shapes. Learn them once:",
      "A rogue DHCP server on the LAN — often a misconfigured router someone plugged in — hands out a gateway that happens to be an attacker's laptop. That's a man-in-the-middle with no exploit needed.",
      "Migrations without TTL planning punish users: their caches hold the old address for the old record's full lifetime. Drop the TTL a day early.",
      "Handing out static IPs from inside the DHCP pool creates collisions that look like haunted hardware. Reservations exist for exactly this.",
      "Raw-IP ping working while names fail is resolution, not connectivity — say it out loud and you've already halved the ticket.",
      "And give servers DHCP reservations: stable addresses, centrally managed, no spreadsheet drift.",
    ],
  }),
  warStory: scenario({
    label: "War story · the conference Wi-Fi that phished a floor",
    context: "At a tech conference, attendees joined 'Free_Conference_WiFi' — one of two networks with the same name. One was real. One was a laptop in a backpack.",
    event: "The rogue network ran its own DHCP and DNS: every lookup answered. Banking domains resolved to clone sites with valid-looking TLS warnings dismissed by hundreds of tired humans. Credentials flowed to the backpack for two days.",
    resolution: "The countermeasures that would have saved the floor: certificate-pinning apps, hardware keys, DNSSEC validation on corporate devices — and the human rule that TLS warnings are not noise. The attacker needed no exploits; DHCP and DNS were the whole attack.",
    question: "Which two protocols did the backpack weaponize?",
    lines: [
      "A story that explains why this lesson is a security lesson.",
      "Two networks, one name. The fake one ran its own DHCP, handed out its own gateway, and answered every DNS query with its own addresses.",
      "Clone sites with dismissed TLS warnings harvested credentials for two days. No malware, no zero-day — just two protocols doing exactly what they were asked, by the wrong server.",
      "This is why the fundamentals matter: the attack surface was DHCP answers and DNS records. Know them, and the backpack stops being invisible.",
    ],
    accent: "green",
  }),
};

// ── Registry ──

export const DEEPENINGS: Record<string, Deepening> = {
  ...DEEPEN2,
  "les-nf-5-1": wireshark,
  "les-lf-4-1": linuxNetworking,
  "les-wf-3-1": jsFundamentals,
  "les-wf-4-1": devtools,
  "les-rf-3-1": reactRouter,
  "les-lf-1-1": whyLinux,
  "les-wf-2-1": cssSelectors,
  "les-lf-4-2": systemd,
  "les-cf-2-1": threatActors,
  "les-cf-3-3": passwordSecurity,
  "les-cf-3-1": authFactors,
  "les-cf-5-1": netsecArch,
  "les-cf-6-1": loggingMonitoring,
  "les-so-1-3": socMetrics,
  "les-rf-2-1": reactHooks,
  "les-rf-5-1": reactMemo,
  "les-rf-7-1": tsProps,
  "les-nb-2-1": sqlFundamentals,
  "les-nb-4-1": apiSecurity,
  "les-nf-3-3": dnsDhcp,
};
