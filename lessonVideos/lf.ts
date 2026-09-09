import {
  title, keyterms, bullets, steps, diagram, flow, code, terminal, compare, scenario, quiz, stat, recap,
  type LessonVideoScript,
} from "./core";

// ════════════════════════════════════════════════════════════════
// LINUX FUNDAMENTALS — deep scripts (course-linux-fundamentals)
// ════════════════════════════════════════════════════════════════

export const deepLF: LessonVideoScript[] = [
  {
    lessonId: "les-lf-1-1", lessonTitle: "Why Linux Matters for Security", courseId: "course-linux-fundamentals",
    scenes: [
      title(
        "Why Linux Matters for Security",
        "linux fundamentals · lesson 1",
        "The operating system that runs the internet — and the command line that runs your career",
        [
          "Welcome to Linux Fundamentals. Before we touch a single command, we will establish why this operating system is unavoidable in security work.",
          "Spoiler: it is not a preference. It is arithmetic — Linux runs almost everything you will defend, investigate, and deploy.",
        ],
        "green",
        [
          "State where Linux actually runs: servers, cloud, security tooling",
          "Explain 'everything is a file' and why it matters",
          "Navigate the filesystem hierarchy with confidence",
          "Run your first commands and read their output"
        ]
      ),
      stat(
        "96%",
        "of the top one million web servers run Linux",
        "Plus: all of the top 500 supercomputers, most of the cloud, every Android phone, and the majority of security appliances.",
        [
          "Start with the number that explains the whole course.",
          "Ninety-six percent of the top million web servers run Linux — and the pattern repeats in the cloud, in supercomputing, and in every security appliance you will ever touch.",
          "When your career leads you to an incident, the machine at the other end of the SSH session will almost always be Linux. This course is preparation for that moment.",
        ],
        "green"
      ),
      diagram("The Filesystem Hierarchy — One Tree, No Drives", {
        root: { label: "/", x: 380, y: 60, shape: "circle", emphasis: true },
        etc: { label: "/etc · config", x: 140, y: 180, shape: "square" },
        home: { label: "/home · users", x: 380, y: 180, shape: "square" },
        var: { label: "/var · logs", x: 620, y: 180, shape: "square" },
        bin: { label: "/bin · programs", x: 140, y: 320, shape: "square" },
        tmp: { label: "/tmp · temp", x: 620, y: 320, shape: "square" },
      }, [
        { from: "root", to: "etc" }, { from: "root", to: "home" }, { from: "root", to: "var" },
        { from: "etc", to: "bin", animated: true }, { from: "var", to: "tmp", animated: true },
      ], [
        "Windows gives every drive a letter. Linux gives you one tree, rooted at slash — and everything hangs from it.",
        "Slash etc holds configuration, slash home holds user files, slash var holds logs and queues.",
        "Slash bin holds the programs themselves, and slash tmp holds throwaway files that vanish on reboot.",
        "Memorize this map now — forensics and hardening later are both exercises in knowing exactly where to look.",
      ], "One root; everything else is a directory under it", "green"),
      bullets("The Linux Philosophy", [
        { label: "Everything is a file", detail: "devices, processes, sockets — all readable through the filesystem" },
        { label: "Small tools that compose", detail: "cat, grep, awk — piped together into superpowers" },
        { label: "Text is the interface", detail: "configs, logs, scripts — all plain text, all scriptable" },
      ], [
        "Three ideas explain Linux's power — and its learning curve.",
        "Everything is a file: your disk is a file, each process has a directory, network connections are files. Learn one interface, touch everything.",
        "Tools are small and honest: grep searches, sort sorts, wc counts. Chain them with pipes and simple pieces become sophisticated systems.",
        "And text is the universal interface — which is why everything on Linux can be scripted, audited, and automated.",
      ], "green"),
      terminal([
        { type: "command", text: "pwd" },
        { type: "output", text: "/home/ama                     # where am I?" },
        { type: "command", text: "ls -la" },
        { type: "output", text: "drwxr-xr-x 2 ama ama 4096 .  ..  .bashrc  notes.txt" },
        { type: "command", text: "cd /var/log && ls auth.log*" },
        { type: "output", text: "auth.log  auth.log.1  auth.log.2.gz   # login history lives here" },
      ], [
        "Your first three commands — learn these and you can move around any Linux system.",
        "pwd prints where you are. ls dash la lists everything, including hidden files, with permissions and owners — we will decode those letters in the permissions lesson.",
        "cd changes directory, and here we peek into slash var slash log — auth dot log is where login events live. Remember that path; you will read it during your first incident.",
      ], "green"),
      scenario(
        "Case study · the hidden miner",
        "A cloud server's CPU sits at 100% at 3 AM. The team SSHes in to investigate. Where do they look first?",
        "ps aux sorted by CPU reveals a process named 'kworker8' — a fake. The real kernel workers have low numbers and no network. It was running from /tmp — no legitimate software runs from /tmp. A cryptominer, installed through an unpatched web app.",
        "The filesystem hierarchy + process list = the fastest triage in security. Both live in this course: process forensics in lesson 3, permissions and hardening in lesson 5.",
        [
          "One alert — CPU at one hundred percent — and the response follows a pattern you now know.",
          "ps sorted by CPU surfaces the impostor: a kernel worker with the wrong parent, the wrong path, and a network connection.",
          "Notice how every fact in the diagnosis came from this course: the filesystem hierarchy, the process list, and a healthy suspicion of /tmp.",
        ],
      ),
      quiz(
        "On a compromised server, a file executing an attack payload is found in /tmp. Why is that location alone suspicious?",
        ["Legitimate software rarely runs from /tmp — it is wiped on reboot", "Only root may create files in /tmp", "/tmp is not readable by users", "Files in /tmp cannot execute"],
        0,
        "/tmp is for transient files. Malware loves it because it is world-writable and cleared on reboot — but that also means no legitimate service keeps binaries there.",
        [
          "Knowledge check — think about what /tmp is for.",
        ],
        "purple"
      ),
      recap([
        "Linux runs 96% of top web servers, the cloud, and most security tooling — the CLI is a career skill, not a hobby.",
        "One filesystem tree rooted at /: /etc config, /var logs, /home users, /tmp transient.",
        "Everything is a file; small tools compose; text is the interface.",
        "pwd, ls -la, cd — the three commands that unlock navigation.",
        "Malware hides in /tmp and fake kernel workers — now you know where to look.",
      ], [
        "What you now know.",
        "You know why Linux is unavoidable, how its single filesystem tree is organized, and the philosophy that makes it scriptable end to end.",
        "Next lesson: users, groups, and permissions — the access control system every file on that tree obeys.",
      ], "green"),
    ],
  },
  {
    lessonId: "les-lf-2-1", lessonTitle: "User & Group Management", courseId: "course-linux-fundamentals",
    scenes: [
      title(
        "Users & Groups on Linux",
        "linux fundamentals · access control",
        "Who can log in, what they may touch, and the three files that hold all of it",
        [
          "Linux is multi-user from the ground up — every file belongs to someone, every process runs as someone.",
          "In this lesson you will create and modify accounts, decode the permission letters you met last lesson, and audit a system for rogue access like a professional.",
        ],
        "cyan",
        [
          "Create and modify users and groups with useradd/usermod",
          "Read the rwx permission model and octal notation",
          "Decode SUID, SGID and the sticky bit",
          "Audit /etc/passwd, /etc/shadow and /etc/group for anomalies"
        ]
      ),
      keyterms([
        { term: "UID / GID", definition: "The numeric identity behind every name — user 0 is root, the superuser who bypasses all checks." },
        { term: "Group", definition: "A named set of users; permissions can be granted to a group once instead of per-user." },
        { term: "sudo", definition: "Execute a command as another user (usually root) — granted by membership in the sudo or wheel group." },
        { term: "rwx", definition: "Read, write, execute — set separately for owner, group, and others on every file." },
        { term: "SUID", definition: "A special bit: run the program as its OWNER. Essential for passwd; dangerous on unexpected binaries." },
      ], [
        "Five terms hold this whole lesson together.",
        "Behind every username is a number — the UID. User zero is root, and root bypasses every permission check on the system.",
        "Groups bundle users so permissions can be granted once, not per person.",
        "Sudo is the controlled way to act as root — and membership in the sudo group is power worth auditing.",
        "rwx is the permission alphabet — read, write, execute — set independently for owner, group, and everyone else.",
        "And SUID is the special bit that lets a program run as its owner. Remember it; it stars in an attack story in a few minutes.",
      ], "cyan"),
      terminal([
        { type: "command", text: "sudo useradd -m -s /bin/bash kofi   # create with home + shell" },
        { type: "output", text: "→ account created, home /home/kofi" },
        { type: "command", text: "sudo passwd kofi                    # set the password" },
        { type: "output", text: "New password: ********  → updated successfully" },
        { type: "command", text: "sudo usermod -aG sudo kofi          # grant admin rights" },
        { type: "command", text: "groups kofi" },
        { type: "output", text: "kofi : kofi sudo                    # confirm membership" },
      ], [
        "Creating a user is a two-command affair — and every flag has a reason.",
        "useradd with dash m makes the home directory; dash s sets the shell. Without dash m the user has nowhere to live; without dash s they may get a locked shell.",
        "passwd sets the password. Then the moment of consequence: usermod dash a G adds kofi to the sudo group. Dash a means append — forget it and you REPLACE all groups, a classic mistake that locks people out.",
        "groups confirms the result. This is provisioning — auditing is the same commands in reverse.",
      ], "cyan"),
      code("permission-notation.txt", [
        "rwxr-xr--   ama   developers    notes.sh",
        "│││││││││   │││   ││││││││││",
        "││┴ others: r--      read only",
        "│┴─ group:  r-x      read + execute",
        "┴── owner:  rwx      full control",
        "",
        "octal: r=4 w=2 x=1  →  rwxr-xr-- = 754",
      ], [
        "Here is the permission string decoded once and forever.",
        "Ten characters: the first is the type — dash for file, d for directory. Then three triplets: owner, group, others.",
        "This file: the owner ama can read, write, execute. The developers group can read and execute. Everyone else can only read.",
        "Octal notation compresses each triplet to a number: read is 4, write is 2, execute is 1 — added up. rwx is 7, r-x is 5, r-- is 4. So rwxr-xr-- is simply 754. You will see chmod 644 and chmod 700 everywhere — now they are words, not magic.",
      ], "green"),
      diagram("Where Account Data Lives", {
        passwd: { label: "/etc/passwd · who", x: 180, y: 100, shape: "square", emphasis: true },
        shadow: { label: "/etc/shadow · hashes", x: 580, y: 100, shape: "square", emphasis: true },
        group: { label: "/etc/group · members", x: 380, y: 290, shape: "square" },
      }, [
        { from: "passwd", to: "group", animated: true, label: "join" },
        { from: "group", to: "shadow", animated: true },
      ], [
        "Three files contain the entire identity system.",
        "etc passwd lists every account — name, UID, home, shell. World-readable by design.",
        "etc shadow holds the password hashes — readable by root only. If you can read it, you can crack it offline; that is why its permissions matter.",
        "etc group maps groups to members. An audit is literally reading three files and asking: is everyone here supposed to be here?",
      ], "Three files = the whole identity system", "cyan"),
      scenario(
        "Case study · the quiet UID",
        "A hardening audit runs 'cat /etc/passwd'. Between 'backup' and 'systemd-network' sits a user named 'svc-update' with UID 0 and shell /bin/bash.",
        "Two red flags in one line: a UID of 0 means full root power, and this account was not created by any deployment record. Attackers add UID-0 accounts so that even if the original entry point is patched, they log in as root through the front door.",
        "Response: disable the account, rotate every credential (assume the attacker had root), find the persistence mechanism, and reconcile ALL privileged accounts against a documented baseline. 'Unknown root account' always means 'assume breach'.",
        [
          "One line in passwd, two facts: UID zero means root-level power, and nobody created this account on purpose.",
          "Attackers plant UID-0 accounts as the ultimate persistence — even if the original backdoor is patched, they log in as root through the front door.",
          "The response order matters: disable, rotate everything, find how they got in, and reconcile every privileged account against a baseline.",
        ],
      ),
      quiz(
        "What does chmod 700 script.sh do?",
        ["Owner: read+write+execute; group and others: nothing", "Everyone: full access", "Group only: full access", "Owner: read only"],
        0,
        "7 = rwx for the owner. 0 and 0 = no permissions for group or others. It is the standard permission for private scripts and SSH keys (~/.ssh is 700 for exactly this reason).",
        [
          "Knowledge check — remember: 4+2+1 per triplet.",
        ],
        "purple"
      ),
      recap([
        "Every identity is a UID — root is 0 and bypasses all checks; audit for duplicate zero UIDs.",
        "useradd -m -s, passwd, usermod -aG — provisioning in three commands; the -a flag protects existing groups.",
        "rwx triplets for owner/group/others; octal 4-2-1 makes chmod numeric (754 = rwxr-xr--).",
        "/etc/passwd = accounts, /etc/shadow = hashes, /etc/group = members — audit all three.",
        "SUID programs run as their owner — legitimate for passwd, a gift if an attacker plants one.",
      ], [
        "What you now know.",
        "You can create accounts, decode any permission string, and audit the three identity files like an auditor.",
        "Next lesson: process management — seeing what is actually running, and killing what should not be.",
      ], "cyan"),
    ],
  },
  {
    lessonId: "les-lf-2-3", lessonTitle: "Process Management", courseId: "course-linux-fundamentals",
    scenes: [
      title(
        "Process Management",
        "linux fundamentals · what is running",
        "Every program is a process — learn to list them, read them, and stop them",
        [
          "Files are what is on disk; processes are what is alive right now. Incident response almost always starts with the second question: what is actually running?",
          "By the end of this lesson you can triage a running system in under two minutes.",
        ],
        "green",
        [
          "List processes and read ps aux output fluently",
          "Interpret PID, PPID, STAT and CPU/MEM columns",
          "Terminate processes with SIGTERM and SIGKILL — and know the difference",
          "Hunt suspicious processes by parent, path and user"
        ]
      ),
      keyterms([
        { term: "PID", definition: "Process ID — the number that names every running program. kill talks in PIDs." },
        { term: "PPID", definition: "Parent PID — every process is started by another. A webserver's child being a shell is suspicious." },
        { term: "Daemon", definition: "A background service (sshd, nginx) usually ending in 'd', started at boot, owned by systemd." },
        { term: "SIGTERM (15)", definition: "The polite kill: asks the process to clean up and exit. The default of the kill command." },
        { term: "SIGKILL (9)", definition: "The rude kill: the kernel deletes the process instantly. It cannot be ignored — or handled." },
      ], [
        "Five terms and process control becomes arithmetic.",
        "Every running program has a PID — the number you use to talk to it.",
        "Every process also has a parent — the PPID. Family trees matter: the parent tells you who launched something.",
        "Daemons are the background services that run the system — sshd, nginx — usually started by systemd at boot.",
        "When you must stop a process, SIGTERM is the polite request — it lets the program close files cleanly.",
        "SIGKILL is the kernel deleting the process with no goodbye. Powerful, and destructive to whatever the process was mid-way through writing.",
      ], "green"),
      terminal([
        { type: "command", text: "ps aux --sort=-%cpu | head -6" },
        { type: "output", text: "USER   PID  %CPU %MEM STAT COMMAND" },
        { type: "output", text: "root   912  87.3  5.1  R    /tmp/kworker8      ← suspicious" },
        { type: "output", text: "www    401  12.0  8.2  S    node /app/server.js" },
        { type: "command", text: "top                           # live view, press q to quit" },
        { type: "command", text: "ps -ef --forest               # parent-child tree" },
      ], [
        "Here is the daily-driver triage workflow.",
        "ps aux sorted by CPU shows the hungriest processes first — and on a compromised box, the top entry is very often the intruder. Notice the first process: running from /tmp with a kernel-ish name. That is our miner from lesson one.",
        "top gives the live dashboard. And ps with the forest flag draws the family tree — because the parent of a suspicious process usually reveals how it got there.",
      ], "green"),
      flow("How a Process Is Born", {
        systemd: { label: "systemd (PID 1)", x: 380, y: 60, shape: "circle", emphasis: true },
        shell: { label: "bash", x: 160, y: 200, shape: "square" },
        sshd: { label: "sshd", x: 600, y: 200, shape: "square" },
        child: { label: "your command", x: 380, y: 330, shape: "square" },
      }, [
        { from: "systemd", to: "shell", animated: true },
        { from: "systemd", to: "sshd", animated: true },
        { from: "shell", to: "child", animated: true, label: "fork+exec" },
        { from: "sshd", to: "child", animated: true },
      ], [
        "Understanding parents requires knowing the family tree's root.",
        "systemd is PID one — the ancestor of everything, started by the kernel at boot.",
        "It spawns your shells and services. Every command you type becomes a child of your shell — fork, then exec.",
        "Why this matters in forensics: a process whose parent makes no sense — like a 'kernel worker' whose parent is a webserver — is wearing a costume.",
      ], "Everything descends from PID 1", "green"),
      terminal([
        { type: "command", text: "kill 912            # SIGTERM: 'please exit'" },
        { type: "output", text: "→ process cleans up and exits (usually)" },
        { type: "command", text: "kill -9 912         # SIGKILL: instant removal" },
        { type: "output", text: "→ gone, no cleanup — evidence lost too" },
        { type: "command", text: "pkill -f kworker8   # by name, all matches" },
      ], [
        "Now the execution decision.",
        "kill with a PID sends SIGTERM — the process may save state and exit gracefully. In an incident, that grace period is also your last chance to capture memory from the process.",
        "kill dash nine cannot be refused — use it when a process ignores everything, but know that you just deleted volatile evidence.",
        "pkill searches by name. On a live compromise: capture first, kill second.",
      ], "green"),
      scenario(
        "Case study · the masquerading process",
        "CPU pegged at 100%. ps shows 'kworker8' at the top. Real kernel workers: names like kworker/0:1, parent systemd, no network connections. This one: parent nginx, running from /tmp, holding an outbound connection.",
        "Three mismatched facts and the disguise fails: a kernel worker does not have a userspace parent, does not live in /tmp, and does not call home. It is a cryptominer launched by an exploited web app.",
        "Triage order: capture memory or at least /proc/912 details, note the outbound destination, kill the process, remove the binary, and patch the web app that spawned it. Kill without patching means respawn by tomorrow.",
        [
          "The miner wore three disguises and each failed: wrong parent, wrong path, wrong connections.",
          "Capture before you kill — /proc holds the command line, the open files, and the outbound address. Once you SIGKILL, all of it is gone.",
          "And patch the web app: kill without patching is a temporary solution measured in hours.",
        ],
      ),
      quiz(
        "A process ignores 'kill 4021' and keeps running. What is the strongest next step?",
        ["kill -9 4021 (SIGKILL)", "kill again, politely", "Reboot", "Rename the binary"],
        0,
        "SIGKILL cannot be caught or ignored — the kernel removes the process. But remember: in a real incident, capture evidence before you erase the process.",
        [
          "Knowledge check — polite first, rude second.",
        ],
        "purple"
      ),
      recap([
        "ps aux --sort=-%cpu is the two-second triage view; top is the live dashboard.",
        "Read PID, PPID, STAT, %CPU, %MEM — and trust mismatches: wrong parent, wrong path, wrong name.",
        "SIGTERM (15) asks; SIGKILL (9) deletes. Evidence dies with the process.",
        "Every process descends from systemd (PID 1); family trees reveal how things started.",
        "Capture first, kill second — otherwise the attacker respawns and you lost the memory image.",
      ], [
        "What you now know.",
        "You can list, read, and terminate processes — and, more importantly, you can tell when a process is lying about what it is.",
        "Next lesson: shell scripting — turning these commands into automated monitoring.",
      ], "green"),
    ],
  },
  {
    lessonId: "les-lf-3-1", lessonTitle: "Bash Scripting Fundamentals", courseId: "course-linux-fundamentals",
    scenes: [
      title(
        "Bash Scripting Fundamentals",
        "linux fundamentals · automation",
        "Turn ten manual commands into one script you can schedule, audit, and share",
        [
          "Everything you have typed so far by hand can be written down, given logic, and run forever. That is shell scripting — the automation layer of the entire Linux world.",
          "We will build a real security monitor: a script that counts failed logins and alerts when a threshold is crossed.",
        ],
        "green",
        [
          "Structure a script: shebang, comments, commands",
          "Use variables, conditionals and loops in bash",
          "Chain commands with pipes to build queries",
          "Schedule scripts with cron for continuous monitoring"
        ]
      ),
      keyterms([
        { term: "Shebang", definition: "The first line, #!/bin/bash — tells the kernel which interpreter runs the file." },
        { term: "Variable", definition: "NAME='value' — no spaces around the equals sign; use \"$NAME\" to expand it safely." },
        { term: "Pipe |", definition: "Feeds one command's output into the next command's input — the core of the Unix toolkit." },
        { term: "Exit code", definition: "Every command returns 0 for success, non-zero for failure. Scripts and schedulers branch on it." },
        { term: "cron", definition: "The scheduler. A cron table line like '*/5 * * * *' runs your script every five minutes." },
      ], [
        "Five concepts, and you can automate anything you can type.",
        "The shebang declares the interpreter — always the first line, always.",
        "Variables hold values; bash's quirk is no spaces around the equals sign.",
        "The pipe is the crown jewel: each command's output becomes the next one's input, so small tools compose into queries.",
        "Exit codes let scripts branch: zero means success, anything else means trouble.",
        "And cron is the time machine — your script, run on a schedule, forever.",
      ], "green"),
      code("failed-login-monitor.sh", [
        "#!/bin/bash",
        "# Alert if failed SSH logins exceed a threshold",
        "",
        "THRESHOLD=5",
        "LOG=/var/log/auth.log",
        "",
        "COUNT=$(grep 'Failed password' \"$LOG\" | wc -l)",
        "",
        "if [ \"$COUNT\" -gt \"$THRESHOLD\" ]; then",
        "  echo \"ALERT: $COUNT failed logins!\"",
        "fi",
      ], [
        "Read this real monitor line by line — it is genuinely the script you will write on your first week.",
        "The shebang. A comment explaining intent — future-you is the audience.",
        "Two variables: the threshold we care about, and the log we watch. Configuration at the top, logic below.",
        "The query itself: grep finds the failed-login lines, the pipe hands them to wc dash l which counts them, and the result lands in COUNT.",
        "Then the decision: if COUNT exceeds the threshold, print the alert. Fourteen lines, and you have a primitive intrusion detector.",
      ], "green"),
      flow("How the Pipeline Works", {
        log: { label: "auth.log", x: 100, y: 190, shape: "square" },
        grep: { label: "grep 'Failed'", x: 310, y: 190, shape: "square", emphasis: true },
        wc: { label: "wc -l", x: 520, y: 190, shape: "square" },
        alert: { label: "if > 5 → alert", x: 700, y: 190, shape: "square", emphasis: true },
      }, [
        { from: "log", to: "grep", speed: 1.5 },
        { from: "grep", to: "wc", speed: 1.5 },
        { from: "wc", to: "alert", speed: 1.5 },
      ], [
        "The pipeline is the whole idea of Unix in one picture.",
        "The log streams in. grep filters to only the lines mentioning failed passwords — thousands of lines become the relevant dozen.",
        "wc dash l collapses those lines to one number. The if statement turns that number into a decision.",
        "Filter, aggregate, decide — this exact shape powers production monitoring everywhere.",
      ], "Filter → aggregate → decide", "green"),
      code("loops-and-logic.sh", [
        "# loops: repeat over a list",
        "for user in $(last | awk '{print $1}' | sort -u); do",
        "  echo \"recent login: $user\"",
        "done",
        "",
        "# conditionals: branch on tests",
        "if ! grep -q 'PermitRootLogin no' /etc/ssh/sshd_config; then",
        "  echo 'HARDENING GAP: root login allowed'",
        "fi",
      ], [
        "Two more building blocks and bash is yours.",
        "The for loop repeats over a list — here, every unique username from the 'last' login history. Building blocks composing again: last feeds awk feeds sort feeds the loop.",
        "The if statement branches on tests — this one checks SSH config for the root-login hardening line and flags its absence.",
        "You have just seen a script write itself into a configuration audit. This is the actual daily work of Linux security engineers.",
      ], "green"),
      scenario(
        "Case study · the 3 AM script",
        "A junior admin writes the failed-login monitor and schedules it with cron — every five minutes. Two weeks later it catches a real brute-force attack at 3 AM on a Saturday and emails the team.",
        "The attack: 4,000 password guesses against SSH from one IP. The monitor flagged it at minute 340 — far earlier than the morning log review would have. Damage: zero accounts compromised.",
        "This is the compounding power of small automation: one cheap script, written once, watching forever. Your first scripts should target the checks you would otherwise forget.",
        [
          "Saturday, 3 AM: four thousand password guesses begin. No human is watching — but the script is.",
          "By minute 340 the threshold trips and the team gets an email. The attack dies at zero compromised accounts.",
          "That is the whole promise of automation: cheap, tireless, and there when humans are not.",
        ],
      ),
      quiz(
        "What does the line COUNT=$(grep 'Failed' auth.log | wc -l) do?",
        ["Counts failed-login lines into COUNT", "Deletes failed logins", "Prints the whole log", "Creates a file named COUNT"],
        0,
        "Command substitution $(...) runs the pipeline and captures its output: grep filters, wc -l counts, COUNT stores. Read it right-to-left inside the parentheses.",
        [
          "Knowledge check — trace the pipeline inside the substitution.",
        ],
        "purple"
      ),
      recap([
        "Shebang, variables, pipes, exit codes, cron — five ideas that automate everything.",
        "grep | wc -l is a query: filter, aggregate, decide.",
        "Loops repeat over lists; conditionals branch on tests — audits write themselves.",
        "Cron lines like */5 * * * * run your script every five minutes, forever.",
        "Write scripts for the checks you would otherwise forget — that is where they pay off.",
      ], [
        "What you now know.",
        "You can read and write real bash: a monitoring script with variables, a pipeline, a decision, and a schedule.",
        "Next lesson: networking commands — because servers that cannot talk are just expensive heaters.",
      ], "green"),
    ],
  },
  {
    lessonId: "les-lf-4-1", lessonTitle: "Linux Networking Commands", courseId: "course-linux-fundamentals",
    scenes: [
      title(
        "Linux Networking Commands",
        "linux fundamentals · connectivity",
        "Inspect interfaces, routes, and listeners — then diagnose any connection problem in layers",
        [
          "A server without network access is a very quiet paperweight. This lesson gives you the five commands that diagnose ninety percent of connectivity problems — and the order to run them in.",
        ],
        "cyan",
        [
          "Read interfaces, addresses and routes with the ip command",
          "List listening ports and their owning processes with ss",
          "Test connectivity in layers: IP, then DNS, then service",
          "Spot suspicious listeners during an audit"
        ]
      ),
      keyterms([
        { term: "ip addr", definition: "Shows every interface and its IP addresses — the modern replacement for ifconfig." },
        { term: "ip route", definition: "The routing table — including 'default via', the gateway every unknown destination goes to." },
        { term: "ss -tulpn", definition: "Every listening port with the process that owns it. The security auditor's favorite command." },
        { term: "Loopback", definition: "127.0.0.1 / lo — the machine talking to itself; always up if the stack is alive." },
        { term: "Port", definition: "A numbered door per protocol: 22 SSH, 80/443 web, 3389 RDP. Listeners wait behind them." },
      ], [
        "Five terms unlock the network view of any Linux box.",
        "ip addr lists every network interface with its addresses — eth0, wlan0, and lo, the loopback.",
        "ip route shows the routing table, including the all-important default route — the gateway for everything unknown.",
        "ss dash tulpn is the auditor's command: every listening port paired with the process holding the door.",
        "Loopback is the machine talking to itself — always alive if the network stack is up.",
        "And ports are the numbered doors: 22 for SSH, 443 for HTTPS, 3389 for RDP. Listeners wait behind them.",
      ], "cyan"),
      terminal([
        { type: "command", text: "ip addr show eth0" },
        { type: "output", text: "inet 192.168.1.50/24 — my address on this LAN" },
        { type: "command", text: "ip route" },
        { type: "output", text: "default via 192.168.1.1 dev eth0   ← the gateway" },
        { type: "command", text: "ss -tulpn | head -5" },
        { type: "output", text: "tcp LISTEN 0.0.0.0:22   sshd    ← expected" },
        { type: "output", text: "tcp LISTEN 0.0.0.0:4444 nc      ← ???" },
      ], [
        "Three commands, three layers of visibility.",
        "ip addr answers: what am I? Here, 192.168.1.50 on eth0 — if this is missing, nothing else matters.",
        "ip route answers: where do packets go? The default via line names the gateway — no gateway, no internet.",
        "ss dash tulpn answers: what doors am I holding open? Port 22 on sshd is expected. Port 4444 held by netcat is a classic backdoor signature — this is exactly what auditors look for.",
      ], "cyan"),
      steps("Diagnosing in Layers — the Ladder", [
        { title: "1 · Interface", detail: "ip addr — do I have an address?" },
        { title: "2 · Route", detail: "ip route — is there a gateway?" },
        { title: "3 · IP reachability", detail: "ping 8.8.8.8 — can packets leave?" },
        { title: "4 · DNS", detail: "ping google.com — do names resolve?" },
        { title: "5 · Service", detail: "curl -I https://… — does the app answer?" },
      ], [
        "When 'the network is down', climb this ladder in order — never skip.",
        "Interface first: no address, stop. Route second: no gateway, stop.",
        "Ping an IP address — 8.8.8.8 is the classic — to test raw reachability without DNS.",
        "Then ping a name: if the IP ping worked but the name fails, DNS is the culprit.",
        "Finally curl the actual service. Each failed rung names the broken layer — this ladder turns 'it's broken' into a one-line diagnosis.",
      ], "cyan"),
      scenario(
        "Case study · the silent listener",
        "A routine audit of a database server runs ss -tulpn. Expected: postgres on 5432, SSH on 22. Also present: bash listening on 0.0.0.0:8888, owned by user 'postgres'.",
        "Databases do not need bash listening on all interfaces. This is a reverse-shell handler — the attacker exploited the DB and left a door. Owning process 'postgres' means the attacker has DB-level privileges at minimum.",
        "Response: capture the listening socket's connections, isolate the host, rotate DB credentials, and hunt the initial exploitation path. The lesson: ss -tulpn takes 3 seconds and finds backdoors that hide for months.",
        [
          "bash listening on 0.0.0.0 is never normal — bash is a shell, not a service.",
          "The owning user being postgres tells you the blast radius: everything the database account can reach.",
          "Three seconds of ss output found what months of antivirus scans missed. Make it part of every audit.",
        ],
      ),
      quiz(
        "ping 8.8.8.8 works, but ping google.com fails with 'name resolution error'. Which layer is broken?",
        ["DNS", "The default route", "The physical interface", "The web service"],
        0,
        "Raw IP works (the 8.8.8.8 ping succeeded), so routing and interfaces are fine. Failing on names is a DNS failure — resolver misconfigured or unreachable.",
        [
          "Knowledge check — the ladder told you: IP yes, names no.",
        ],
        "purple"
      ),
      recap([
        "ip addr = my address · ip route = my gateway · ss -tulpn = my open doors.",
        "ss -tulpn pairs every listener with its process — the audit command.",
        "Diagnose in layers: interface → route → ping IP → ping name → curl service.",
        "Unexpected listeners on odd ports owned by odd users are incident material.",
        "curl -I tests the actual service — the top rung of the ladder.",
      ], [
        "What you now know.",
        "Five commands, one ladder, and you can diagnose connectivity anywhere — and spot the listeners that should not exist.",
        "Next lesson: systemd — how services start, stop, and hide.",
      ], "cyan"),
    ],
  },
  {
    lessonId: "les-lf-4-2", lessonTitle: "systemd & Service Management", courseId: "course-linux-fundamentals",
    scenes: [
      title(
        "systemd & Service Management",
        "linux fundamentals · services",
        "Start, stop, enable — and notice when something has been quietly switched off",
        [
          "systemd starts and supervises every service on a modern Linux system — your web server, SSH, the logging daemon, everything.",
          "Two commands control it all, and one of them is the difference between 'running now' and 'survives reboot'. This lesson also shows you the attack hiding in that difference.",
        ],
        "amber",
        [
          "Start, stop and inspect services with systemctl",
          "Distinguish running-now from enabled-at-boot",
          "Read a unit file and follow service logs in journald",
          "Detect tampered or disabled security services"
        ]
      ),
      keyterms([
        { term: "systemd", definition: "PID 1 — the init system that starts, supervises and restarts services." },
        { term: "Unit file", definition: "A service's definition: what to run, as whom, after what. Lives in /etc/systemd/system." },
        { term: "start vs enable", definition: "start = running now (gone after reboot). enable = starts at every boot." },
        { term: "journald", definition: "systemd's binary log store — query it with journalctl." },
        { term: "Status states", definition: "active (running), inactive (stopped), failed (crashed), masked (nailed shut)." },
      ], [
        "Five terms and systemctl stops being mysterious.",
        "systemd is PID one — the first process, parent of all services, the system's manager.",
        "Each service is described by a unit file — what to run, as which user, in what order after boot.",
        "The critical pair: start runs a service now; enable makes it start at every boot. New admins confuse these constantly — a service you started but never enabled dies at the next reboot.",
        "journald collects every service's logs; journalctl reads them.",
        "And services have precise states: active, inactive, failed — or masked, meaning deliberately nailed shut.",
      ], "amber"),
      terminal([
        { type: "command", text: "sudo systemctl start nginx    # run it now" },
        { type: "command", text: "sudo systemctl enable nginx   # start at every boot" },
        { type: "output", text: "Created symlink /etc/systemd/system/multi-user.target.wants/nginx.service" },
        { type: "command", text: "systemctl status nginx" },
        { type: "output", text: "● nginx.service - active (running) since 09:14" },
        { type: "output", text: "  Main PID: 4102 (nginx)  Tasks: 3" },
        { type: "command", text: "journalctl -u nginx --since '1 hour ago' | tail -3" },
        { type: "output", text: "…GET /health 200 10.0.4.2 — recent activity" },
      ], [
        "The core workflow in five lines.",
        "start runs it now. enable creates the symlink that makes it permanent across reboots — that is literally what enable does, one symlink.",
        "status is the diagnostic workhorse: running or not, since when, the main PID, and the last log lines inline.",
        "journalctl with the -u flag filters to one unit's logs — here the last hour of nginx activity. When something breaks, status first, journal second.",
      ], "amber"),
      steps("The systemctl Lifecycle", [
        { title: "start / stop", detail: "runtime only — lost at reboot" },
        { title: "enable / disable", detail: "boot persistence via symlinks" },
        { title: "restart / reload", detail: "restart all; reload re-reads config live" },
        { title: "mask", detail: "refuse to start at all — even manually" },
      ], [
        "Four pairs cover the whole lifecycle.",
        "Start and stop are runtime actions — a stopped service will return at next boot if enabled.",
        "Enable and disable are boot persistence — pure symlink management under the hood.",
        "Restart bounces everything; reload tells a service to re-read configuration without dropping connections — nginx reload is a production staple.",
        "And mask is the hammer: a masked service refuses to start even if someone asks. Security teams mask services they have deliberately decommissioned.",
      ], "amber"),
      scenario(
        "Case study · the disabled sentry",
        "During an incident review, an engineer checks systemctl status on the perimeter host and finds auditd inactive and disabled — and fail2ban masked entirely.",
        "This was not decay; it was sabotage. The attacker had silenced logging (auditd) and removed the brute-force defender (fail2ban) before exploiting SSH — explaining why the intrusion left no audit trail and survived weeks of failed-login noise.",
        "Response: re-enable both, pull evidence from remote log shipping (always keep logs OFF the hosts they describe), rotate credentials, and add monitoring: alert when security services leave the active+enabled state. Service states are a control surface for attackers too.",
        [
          "Read the finding again: auditd inactive, fail2ban masked. That is not neglect — that is preparation.",
          "Attackers silence the watchers before they act. A disabled logging service days before an intrusion is not a coincidence.",
          "And the meta-lesson: logs that live only on the compromised host are logs you do not have. Ship them elsewhere.",
        ],
      ),
      quiz(
        "You 'start' a database service at 2 PM. What happens at the 2 AM reboot?",
        ["It stays down — you never enabled it", "It starts automatically", "It becomes masked", "It restarts twice"],
        0,
        "start is runtime-only. Without enable, the service will not come back after reboot — the most common 'it worked yesterday' support ticket in Linux administration.",
        [
          "Knowledge check — running now vs enabled at boot.",
        ],
        "purple"
      ),
      recap([
        "systemctl start = now · enable = every boot · status = diagnosis · journalctl -u = logs.",
        "reload re-reads config without dropping connections; mask refuses startup entirely.",
        "Unit files in /etc/systemd/system define each service.",
        "A security service that is inactive, disabled, or masked is a red flag — verify deliberately.",
        "Ship logs off-host: local logs are the first thing an attacker silences.",
      ], [
        "What you now know.",
        "You can run the full service lifecycle — and you know why a silent service on a compromised host is evidence, not an inconvenience.",
        "This completes the Linux core. Next course stop: permissions deep dive, hardening, and your capstone.",
      ], "amber"),
    ],
  },
];
