// ──────────────────────────────────────────────────────────────
// PiBridge Academy — Hand-Authored Lesson Deepening (part 2)
// Networking, Linux, Cyber Fundamentals, SOC & Threat Intel.
// Merged with part-1 DEEPENINGS at registry build. The optional
// `diagram` scene renders a hand-crafted animated SVG (svgdiag).
// ──────────────────────────────────────────────────────────────

import { steps, bullets, scenario, svgdiag } from "./core";
import type { Deepening } from "./deepen";

// ── Networking Fundamentals (remaining 5) ────────────────────

const nf11: Deepening = {
  diagram: svgdiag({
    heading: "Anatomy of a packet's journey",
    sub: "one request, four hops — what changes, what never does",
    template: "packet",
    accent: "cyan",
    lines: [
      "Follow one packet from your laptop to a server and back. At every hop the layer-2 frame is thrown away and rebuilt, but the layer-3 IP addresses stay untouched end to end.",
      "Your router performs NAT and becomes the default gateway — the only door out. The ISP then hands the packet to the backbone, where routers decide the next hop purely from the destination IP.",
      "TTL is the safety net: each router decrements it by one, and if it hits zero the packet is dropped and an ICMP time-exceeded message comes back. That mechanism is exactly what traceroute abuses to map a path.",
    ],
  }),
  walkthrough: steps({
    heading: "Walkthrough · diagnose 'the internet is down' in 5 commands",
    accent: "cyan",
    steps: [
      { title: "ipconfig / ip addr", detail: "do you even have an IP? 169.254.x.x means DHCP failed" },
      { title: "ping 192.168.1.1", detail: "gateway answers? then your LAN is fine" },
      { title: "ping 8.8.8.8", detail: "IP answers but no browsing = DNS is the problem" },
      { title: "nslookup google.com", detail: "proves name resolution is (or isn't) working" },
      { title: "tracert 8.8.8.8", detail: "shows exactly which hop goes dark" },
    ],
    lines: [
      "Run the ladder in order and never skip — each command eliminates half the remaining possibilities.",
      "First your own address. An APIPA address beginning 169.254 means your machine never got a lease from DHCP, and nothing else will work until that is fixed.",
      "Pinging the gateway splits the problem in two: if it answers, your local network is healthy and the fault lies beyond it; if not, stay local.",
      "Pinging 8.8.8.8 is the classic split: the IP responds but websites fail, so name resolution is broken — go straight to nslookup.",
      "Finally traceroute turns 'the internet is down' into 'hop 3 at my ISP stops responding' — a sentence you can actually report.",
    ],
  }),
  pitfalls: bullets({
    heading: "Pitfalls that waste hours",
    accent: "rose",
    items: [
      { text: "Blaming DNS for everything", detail: "if the IP answers and the name doesn't, it's DNS — test before guessing", kind: "bad" },
      { text: "Pinging a host that blocks ICMP", detail: "a silent ping is not proof of death; try the port the service actually uses", kind: "bad" },
      { text: "Confusing a switched-off firewall with a closed port", detail: "drop = silence, reject = refusal — the distinction tells you where to look", kind: "info" },
      { text: "Fixing the symptom at layer 1", detail: "reseat the cable before you reinstall the driver — boring, but it wins", kind: "good" },
    ],
    lines: [
      "Most home-network debugging time is lost to two habits: skipping the ladder and trusting a single failed test.",
      "Test, don't guess: each command above is a fork in the diagnosis, and running them out of order destroys the information they give you.",
      "And remember a dropped ping can mean a firewall policy, not a dead host — the evidence always needs interpretation.",
    ],
  }),
  warStory: scenario({
    label: "War story · the whole floor offline",
    context: "Monday 8:02 AM at a 40-person Accra fintech: every workstation reports 'no internet', but the ISP link is green.",
    event: "The new hire 'fixed' it Friday by plugging a second cable between two switches — creating a loop. Broadcast storms saturated the LAN; packets multiplied until no real traffic survived.",
    resolution: "STP was disabled on the access switches 'for speed'. Re-enabling it killed the loop in seconds. Lesson: layer-2 loops look exactly like 'the internet is down', and the fix was a config line, not a new ISP.",
    lines: [
      "One Friday 'improvement' took down a whole office on Monday morning.",
      "A cable between two switches created a loop, and without spanning tree every broadcast multiplied without end — the LAN drowned in its own chatter.",
      "The Internet had nothing to do with it. When everything fails at once, suspect layer 2 first.",
    ],
    accent: "cyan",
  }),
};

const nf21: Deepening = {
  diagram: svgdiag({
    heading: "The OSI stack, layer by layer",
    sub: "what each layer actually adds as data descends",
    template: "osi",
    accent: "purple",
    lines: [
      "Read the stack from the top: your application produces data, presentation encrypts and encodes it, session tracks whose conversation it is.",
      "Transport slices it into segments and attaches ports; network wraps them in packets with IP addresses; data-link frames them for the local wire; physical screams the bits across copper, fiber, or air.",
      "Layer 4 is highlighted because it's the troubleshooting pivot: everything above it is software talking to software, everything below is infrastructure moving bytes.",
    ],
  }),
  walkthrough: steps({
    heading: "Walkthrough · troubleshoot by layer, bottom-up",
    accent: "purple",
    steps: [
      { title: "L1 — link light", detail: "cable seated, NIC up, Wi-Fi associated" },
      { title: "L2 — ARP", detail: "can you resolve the gateway's MAC? if not, it's local" },
      { title: "L3 — ping", detail: "ICMP to a public IP proves routing works" },
      { title: "L4 — port", detail: "Test-NetConnection host -Port 443 proves the service listens" },
      { title: "L7 — app", detail: "only now look at HTTP status codes and payloads" },
    ],
    lines: [
      "The layers aren't exam trivia — they're a debugging algorithm that eliminates possibilities in strict order.",
      "Start at layer one because it's cheapest to check: a loose cable explains more 'outages' than any exotic protocol failure.",
      "ARP proves you can even speak to your own gateway; routing is unverifiable until that works.",
      "A successful ping but a refused port moves you to layer four — the service or its firewall, not the network.",
      "Only when all six floors below are standing do you earn the right to debug the application itself.",
    ],
  }),
  pitfalls: bullets({
    heading: "Pitfalls at every layer",
    accent: "rose",
    items: [
      { text: "Debugging L7 with an L1 problem", detail: "no amount of header analysis fixes an unplugged cable", kind: "bad" },
      { text: "Memorizing the numbers without the questions", detail: "each layer answers one question: link? local? routed? connected? understood?", kind: "bad" },
      { text: "Treating the model as law", detail: "real TCP/IP merges L5–7 into the application layer — know it, don't worship it", kind: "info" },
      { text: "Forgetting both stacks", detail: "OSI to think and communicate; TCP/IP to actually build — interviewers want both", kind: "good" },
    ],
    lines: [
      "The classic failure is jumping straight to the top of the stack — staring at API responses when the NIC has no link light.",
      "Use each layer as a question to eliminate, and the model becomes a compass instead of a mnemonic.",
      "Know that the real world runs TCP/IP, where the top three OSI layers collapse into one — say so in interviews and sound like a practitioner, not a textbook.",
    ],
  }),
  warStory: scenario({
    label: "War story · the 4-layer chain of blame",
    context: "A payment API 'randomly' times out a few times daily. Three teams blame each other for a week: app team says network, network team says app.",
    event: "An engineer finally walks the layers in order. L1 fine, L2 fine, L3 fine. L4: the firewall's connection table is full — idle sessions older than an hour evict new ones under load.",
    resolution: "One TCP idle-timeout setting fixed it. The lesson stuck: layered troubleshooting turns politics into evidence — the layer where it breaks names the team that owns the fix.",
    lines: [
      "A week of inter-team blame ended in one afternoon once someone walked the layers in order.",
      "The application was innocent, the network was innocent — the firewall's connection table was exhausting itself and evicting live sessions.",
      "Layered diagnosis doesn't just find the fault; it ends the argument about whose fault it is.",
    ],
    accent: "purple",
  }),
};

const nf22: Deepening = {
  diagram: svgdiag({
    heading: "Encapsulation: the same bytes, five envelopes",
    sub: "headers added on the way down, stripped on the way up",
    template: "osi",
    labels: ["encapsulate ↓", "de-encapsulate ↑"],
    accent: "teal",
    lines: [
      "Encapsulation is Russian dolls for data: each layer wraps the layer above in its own header, and only the matching layer on the far side unwraps it.",
      "The receiver runs the same process in reverse — de-encapsulation — so a web server's application layer sees exactly the bytes your browser's application layer produced.",
      "MTU is the practical limit: a segment that would exceed 1500 bytes on Ethernet gets fragmented or dropped, which is why 'don't fragment' probes are a network engineer's flashlight.",
    ],
  }),
  walkthrough: steps({
    heading: "Walkthrough · name every header on the wire",
    accent: "teal",
    steps: [
      { title: "Start with the payload", detail: "'GET / HTTP/1.1' — your application's actual words" },
      { title: "Add TCP", detail: "src port 51900 → dst port 443, sequence number, flags" },
      { title: "Add IP", detail: "192.168.1.20 → 142.250.4.100, TTL 64, protocol 6 (TCP)" },
      { title: "Add Ethernet", detail: "your MAC → gateway MAC — the only part rewritten per hop" },
      { title: "Verify in Wireshark", detail: "capture a real request and name each layer aloud" },
    ],
    lines: [
      "Do this exercise once in Wireshark and encapsulation stops being a diagram forever.",
      "The HTTP payload is what the user means; TCP addresses the process on the machine; IP addresses the machine on the internet; Ethernet addresses the next device on the local wire.",
      "Notice each header has exactly one consumer: the destination's matching layer. That symmetry is the entire design.",
      "And watch what the router does — it strips and rebuilds the Ethernet frame while forwarding the packet untouched. Layer 2 is local; layer 3 is end-to-end.",
    ],
  }),
  pitfalls: bullets({
    heading: "Pitfalls in the envelope game",
    accent: "rose",
    items: [
      { text: "Saying 'the frame travels end-to-end'", detail: "frames die at every hop; packets survive to the destination", kind: "bad" },
      { text: "Forgetting overhead", detail: "a 1500-byte MTU carries ~1460 bytes of payload — throughput math starts here", kind: "info" },
      { text: "Mixing up segment, packet, frame", detail: "L4 = segment, L3 = packet, L2 = frame — precise words signal real understanding", kind: "bad" },
      { text: "Assuming encryption removes headers", detail: "TLS encrypts the payload; TCP and IP headers stay readable on the wire", kind: "good" },
    ],
    lines: [
      "Vocabulary is diagnostic power: when a colleague says 'the frame was dropped upstream' you instantly know they mean a layer-2 problem on one link.",
      "Overhead matters in real capacity planning — your gigabit link carries about 940 megabits of actual payload on a good day.",
      "And note what TLS does and doesn't hide: contents are sealed, but who is talking to whom remains visible — that's normal and useful for troubleshooting.",
    ],
  }),
  warStory: scenario({
    label: "War story · the VPN that broke file shares",
    context: "After a VPN rollout, remote staff could reach web apps but not SMB file shares. Tickets piled up for three days.",
    event: "A packet capture showed the SMB packets leaving with the DF (don't fragment) bit set — the VPN overhead pushed them past the tunnel's MTU, and some middle router silently dropped them instead of sending ICMP back.",
    resolution: "Clamping the TCP MSS on the VPN concentrator fixed it instantly. Encapsulation isn't academic: every layer you add eats payload budget, and MTU black holes are the classic real-world bite.",
    lines: [
      "Three days of 'the file server is down' were really three days of encapsulation overhead.",
      "VPN wraps packets in another envelope; envelopes have size; routers that drop oversized packets silently create black holes.",
      "The fix — clamping MSS — is a one-line config that only makes sense if you truly understand which layer adds which bytes.",
    ],
    accent: "teal",
  }),
};

const nf31: Deepening = {
  diagram: svgdiag({
    heading: "Routing between subnets",
    sub: "the router is the only door — TTL and hops do the bookkeeping",
    template: "packet",
    accent: "sky",
    lines: [
      "A subnet is a broadcast domain: hosts inside it talk directly, hosts outside it go through the default gateway. That single rule produces most home and office network behavior.",
      "The router reads only the destination IP, consults its routing table for the longest matching prefix, and forwards. It never cares about hostnames or applications.",
      "TTL exists because routing loops are otherwise immortal: each hop costs one, zero means death, and traceroute maps the whole chain by timing the ICMP responses.",
    ],
  }),
  walkthrough: steps({
    heading: "Walkthrough · subnet 10.0.0.0/24 into four teams",
    accent: "sky",
    steps: [
      { title: "Borrow bits", detail: "4 subnets → 2 borrowed bits → /26" },
      { title: "Block size", detail: "256 − 192 = 64 addresses per subnet" },
      { title: "Networks", detail: "10.0.0.0, 10.0.0.64, 10.0.0.128, 10.0.0.192" },
      { title: "Usable ranges", detail: ".1–.62, .65–.126, .129–.190, .193–.254" },
      { title: "Gateways", detail: "convention: first usable of each block (.1, .65, ...)" },
    ],
    lines: [
      "Subnetting is only two moves: decide how many subnets you need, then borrow that many bits and recompute the block size.",
      "Needing four teams means borrowing two bits, giving a /26 and sixty-four addresses per block.",
      "Write the four network addresses by stepping in blocks of sixty-four — .0, .64, .128, .192 — and the usable ranges fall out mechanically.",
      "The broadcast address is always the last address of a block, and hosts live between the network and broadcast. Practice this on paper until it takes under a minute.",
    ],
  }),
  pitfalls: bullets({
    heading: "Subnetting pitfalls that cost marks and outages",
    accent: "rose",
    items: [
      { text: "Off-by-one on broadcast", detail: "/26 block ending .127 is wrong — .127 would be the next network's boundary math; broadcast is .126", kind: "bad" },
      { text: "Forgetting the gateway eats an address", detail: "plan hosts as usable − 1 (gateway) − headroom", kind: "info" },
      { text: "/24 as reflex", detail: "a 500-person office doesn't fit; think in required hosts, then pick the mask", kind: "bad" },
      { text: "Skipping the mask check", detail: "10.0.0.1/26 is in the first block; 10.0.0.65 is not — always verify, never eyeball", kind: "good" },
    ],
    lines: [
      "The broadcast off-by-one is the most failed exam question and the most common real misconfiguration — drill it until automatic.",
      "Design from the host count backwards: required devices plus growth headroom determines the mask, never habit.",
      "And make verification a reflex: one mental check of which block an address belongs to prevents a whole class of 'why can't these two hosts talk' tickets.",
    ],
  }),
  warStory: scenario({
    label: "War story · the /16 that ate the office Wi-Fi",
    context: "A 60-person office used 10.0.0.0/16 'for room to grow' on a flat wireless network with one cheap access controller.",
    event: "Six hundred guest phones, laptops and smart TVs sat in one broadcast domain. ARP chatter alone consumed 30% of airtime; a single chatty IoT camera made everyone's calls stutter.",
    resolution: "Re-subnetting into /24s per floor plus client isolation on the guest SSID fixed it. Flat networks don't fail at the IP layer — they fail at the broadcast layer, and subnetting is the cure.",
    lines: [
      "Room to grow became room to drown: one giant subnet means every broadcast hits every device.",
      "The airtime math was the killer — ARP noise from six hundred devices left a third of the Wi-Fi capacity gone before any real data flowed.",
      "Subnets aren't just address bookkeeping; they're the tool that keeps broadcast traffic local and networks fast.",
    ],
    accent: "sky",
  }),
};

const nf41: Deepening = {
  diagram: svgdiag({
    heading: "DMZ: the two-firewall pattern",
    sub: "public services live in the demilitarized zone — never the LAN",
    template: "dmz",
    accent: "amber",
    lines: [
      "The DMZ pattern exists because public servers get compromised eventually — the architecture assumes it and limits the blast radius.",
      "An outer firewall admits only published ports to the DMZ; an inner firewall admits only specific DMZ-to-LAN flows, typically a database port to one host.",
      "No rule ever points from the DMZ straight into the internal network at large. When the web server falls, the attacker is standing in a room with one door — and you hold the only key.",
    ],
  }),
  walkthrough: steps({
    heading: "Walkthrough · write one firewall rule, properly",
    accent: "amber",
    steps: [
      { title: "State the intent", detail: "'internet may reach the web server on 443 only'" },
      { title: "Five-tuple it", detail: "src any → dst 10.0.1.10, proto TCP, dport 443, allow" },
      { title: "Order matters", detail: "first match wins — specifics above generalities" },
      { title: "Default deny", detail: "implicit drop at the end is the whole security model" },
      { title: "Log and review", detail: "a rule without hit counters is a rule nobody audits" },
    ],
    lines: [
      "Every firewall rule is a sentence with five parts: source, destination, protocol, port, action. Write the sentence in English first — it exposes bad intent instantly.",
      "'Any any allow' is not a sentence, it's a confession. The web server rule admits TCP 443 from anywhere to exactly one host, and nothing else.",
      "Rules evaluate top-down and first match wins, so the specific exceptions must sit above the broad categories.",
      "The default deny at the bottom is not one rule — it is the philosophy. Everything not explicitly permitted is forbidden.",
    ],
  }),
  pitfalls: bullets({
    heading: "Firewall pitfalls in production",
    accent: "rose",
    items: [
      { text: "Stateless rules on a stateful device", detail: "if you allow inbound 443, return traffic is automatic — no inbound 'reply' rule needed", kind: "info" },
      { text: "'Temporary' any-any rules", detail: "temporary rules become permanent on Friday evening; document expiry dates", kind: "bad" },
      { text: "Filtering only north-south", detail: "east-west (server-to-server) traffic is where attackers move laterally", kind: "bad" },
      { text: "Egress wide open", detail: "controlling what LEAVES catches beacons and exfil — block by default outbound too", kind: "good" },
    ],
    lines: [
      "Stateful firewalls remember connections: one inbound allow covers the replies, and piling on symmetric rules just creates confusion.",
      "The quiet killer is east-west traffic — once inside, flat networks let attackers roam. Segment, and filter between zones.",
      "And treat egress filtering as seriously as ingress: a compromised host phoning home is caught by what you block outbound, not what you allow in.",
    ],
  }),
  warStory: scenario({
    label: "War story · thePrinters that pwned the network",
    context: "An audit of a 'well-secured' office LAN found printers on the same flat network as the finance servers, with the default admin password.",
    event: "Attackers in an exercise used a printer's firmware vulnerability as the entry point, then moved laterally to the accounting share — because nothing filtered east-west traffic.",
    resolution: "The fix was zoning: printers into their own segment with a one-way print-server flow, finance isolated behind ACLs. Hardware you never think about is the attacker's favorite door — inventory everything that has an IP.",
    lines: [
      "The penetration test didn't start at the servers — it started at the printers nobody inventoried.",
      "A flat network means one compromised device is every device; zoning turned that single point of failure into a contained island.",
      "Security architecture is less about buying firewalls and more about deciding what may talk to what.",
    ],
    accent: "amber",
  }),
};

// ── Linux Fundamentals (remaining 3) ─────────────────────────

const lf21: Deepening = {
  diagram: svgdiag({
    heading: "Identity and permission on Linux",
    sub: "users, groups, and the three-way permission model",
    template: "iam",
    accent: "green",
    lines: [
      "Linux answers 'who may touch what' with three primitives: a user owns files, a group shares access, and 'others' is everyone else.",
      "Each file carries three permission triples — read, write, execute for owner, group, and others — which is why the same file can be editable by you, readable by your team, invisible to strangers.",
      "Root bypasses all of it, which is precisely why day-to-day work happens as a normal user with sudo granted deliberately, group by group, not by sharing the root password.",
    ],
  }),
  walkthrough: steps({
    heading: "Walkthrough · onboard a new developer in 6 commands",
    accent: "green",
    steps: [
      { title: "sudo adduser amara", detail: "creates user + home dir + asks for password" },
      { title: "sudo usermod -aG developers,ssh-users amara", detail: "group membership = capability" },
      { title: "sudo chgrp -R developers /srv/projects", detail: "hand the directory to the group" },
      { title: "sudo chmod -R 2775 /srv/projects", detail: "setgid so new files inherit the group" },
      { title: "su - amara", detail: "verify from her seat: touch a file, check ownership" },
      { title: "groups amara", detail: "confirm memberships took effect" },
    ],
    lines: [
      "Onboarding is a capability script: create the identity, grant groups, hand over directories, then verify by becoming the user.",
      "Adding to groups is the whole game — ssh-users controls remote access, developers controls the code tree, and each later capability is one more group, auditable and revocable.",
      "The setgid bit on the shared directory is the trick every team needs: new files inherit the group, so collaboration survives file creation.",
      "Always verify as the new user. 'It should work' is not a state; logging in as them is.",
    ],
  }),
  pitfalls: bullets({
    heading: "Permission pitfalls that bite",
    accent: "rose",
    items: [
      { text: "chmod 777 as a fix", detail: "it works and it's a breach — find the right group instead", kind: "bad" },
      { text: "Forgetting -a in usermod -aG", detail: "omitting -a removes every other group the user had", kind: "bad" },
      { text: "Editing sudoers directly", detail: "use visudo — a syntax error can lock every admin out", kind: "bad" },
      { text: "Relying on root for daily work", detail: "one typo as root is unrecoverable; sudo exists to make privilege deliberate", kind: "good" },
    ],
    lines: [
      "777 is the permission equivalent of taping the door open because the key annoys you — the real fix is deciding who legitimately needs access.",
      "The usermod -aG missing-flag accident strips a user of every group silently; test group membership after every change.",
      "And treat sudo as deliberate privilege: granted per-command where possible, audited in the logs, never a shared root password in a chat message.",
    ],
  }),
  warStory: scenario({
    label: "War story · the chmod -R that stopped payroll",
    context: "A junior admin 'fixed' a web app permission error with sudo chmod -R 777 /var/www — including the .ssh directory of the deploy user inside it.",
    event: "SSH silently refused the deploy user's key (permissions too open), deploys stopped, and an external scan flagged the world-writable tree in the next audit.",
    resolution: "Proper ownership (www-data for the tree, 750 for directories, 640 for files) fixed both the app and the audit. The rule that stuck: never blanket-chmod a tree — change the owner or the group, not everything's locks.",
    lines: [
      "One recursive 777 created two outages: SSH refusing keys, and an audit finding that took longer to close than the original bug.",
      "Permissions are a contract with services — SSH literally refuses to read a private key the world can read.",
      "When access is wrong, fix ownership and group membership. Recursive chmod is how one error becomes an entire directory's worth of errors.",
    ],
    accent: "green",
  }),
};

const lf23: Deepening = {
  diagram: svgdiag({
    heading: "Diagnosing the process eating your CPU",
    sub: "identify → attribute → interrogate history → act, in that order",
    template: "grid",
    labels: ["top", "ps aux", "systemctl status", "journalctl", "kill -TERM", "nice"],
    accent: "green",
    lines: [
      "The ladder has a strict order: identify the suspect with top, attribute it to real code with ps, interrogate its history in the journal.",
      "Only then act — and act politely: SIGTERM lets the process flush and close files, while SIGKILL leaves half-written state behind.",
      "Priority is a control too: nice-ing a batch job keeps the 2 AM gzip from strangling everything else on the box.",
    ],
  }),
  walkthrough: steps({
    heading: "Walkthrough · a service is eating the CPU",
    accent: "green",
    steps: [
      { title: "top → Shift+P", detail: "sort by CPU; note the PID and command" },
      { title: "ps aux | grep PID", detail: "full command line and parent process" },
      { title: "systemctl status NAME", detail: "is it a service? since when? restarts?" },
      { title: "journalctl -u NAME --since today", detail: "what was it doing right before the spike?" },
      { title: "kill -TERM first", detail: "SIGTERM allows cleanup; -9 only for the truly stuck" },
    ],
    lines: [
      "Process debugging is a ladder: identify, attribute, interrogate history, then act — in that order.",
      "top sorted by CPU names the suspect; ps shows its full command line so you know what code you're actually dealing with, not just a name.",
      "If it's a systemd service, the unit file and journal tell you when it started misbehaving and why — often a restart loop is visible in the status output alone.",
      "Kill politely first. SIGTERM lets the process flush and close files; SIGKILL leaves databases half-written and is a last resort, not a first one.",
    ],
  }),
  pitfalls: bullets({
    heading: "Process pitfalls",
    accent: "rose",
    items: [
      { text: "kill -9 as a reflex", detail: "it skips cleanup handlers — corrupt data and zombie sockets follow", kind: "bad" },
      { text: "Ignoring zombie processes", detail: "defunct entries mean the parent isn't reaping — find the parent, not the zombie", kind: "info" },
      { text: "Confusing load average with CPU %", detail: "load includes uninterruptible I/O waits — 1.0 per core is the fair baseline", kind: "bad" },
      { text: "Rebooting to fix a runaway process", detail: "you destroy the evidence; capture the stack (strace/gdb) first when you can", kind: "good" },
    ],
    lines: [
      "SIGKILL is the fire axe behind glass — using it feels decisive and often makes things worse.",
      "Zombies are never the zombie's fault: a parent process that isn't calling wait is the actual bug.",
      "And load average counts processes waiting, including those blocked on disk — a load of 8 on 4 cores with high iowait is a storage story, not a CPU one.",
    ],
  }),
  warStory: scenario({
    label: "War story · the log that ate the server",
    context: "Every night at 2 AM, a reporting server's CPU hit 100% and SSH became unresponsive for twenty minutes. The vendor blamed 'noisy neighbors'.",
    event: "A cron job rotated logs by copying a 9 GB file, then compressed it — copy and gzip of that size saturated CPU and I/O. top at 2:05 showed gzip, not the database everyone suspected.",
    resolution: "Switching to logrotate's copytruncate with a size cap, plus nice-ing the compression, silenced it. The moral: be on the box when it hurts — symptoms at a distance are guesses.",
    lines: [
      "Every 'the server randomly dies' story has a timestamp — and 2 AM nightly means scheduled work, not ghosts.",
      "The culprit was log rotation: nine gigabytes copied and compressed at full priority, strangling everything else.",
      "We only found it by being logged in when it happened. History, priority and one well-timed top beat any vendor theory.",
    ],
    accent: "green",
  }),
};

const lf31: Deepening = {
  diagram: svgdiag({
    heading: "Anatomy of a professional backup script",
    sub: "guardrails, timestamps, logging, retention — the four pillars",
    template: "cicd",
    labels: ["set -euo pipefail", "timestamped dest", "tar + compress", "logger on fail", "retention -mtime", "restore drill"],
    accent: "green",
    lines: [
      "A professional script starts with set -euo pipefail: it converts silent failures into loud ones, which is the entire difference.",
      "The pipeline flows like CI: guardrails, a timestamped destination, the compression work, and logging that records failures in the journal.",
      "Retention closes the loop — without the find-and-delete stage, your backup disk becomes the next outage. And a backup is only real if you have tested a restore.",
    ],
  }),
  walkthrough: steps({
    heading: "Walkthrough · your first real backup script",
    accent: "green",
    steps: [
      { title: "#!/bin/bash + set -euo pipefail", detail: "stop on error, unset vars, failed pipes — bash with guardrails" },
      { title: "readonly DEST=/backups/$(date +%F)", detail: "one variable, timestamped, impossible to misuse" },
      { title: "tar -czf backup.tar.gz /srv/data", detail: "the actual work — compress as you go" },
      { title: "if [ $? -ne 0 ]; then logger -t backup FAILED", detail: "record failure in the system log, not just stdout" },
      { title: "find $DEST -mtime +14 -delete", detail: "retention: two weeks, then clean up after yourself" },
    ],
    lines: [
      "A professional script starts with set -euo pipefail — it converts silent failures into loud ones, which is the entire difference.",
      "Timestamp the destination so every run is idempotent and historical: yesterday's backup is never overwritten by today's.",
      "Log outcomes with logger so failures land in the system journal — a backup nobody monitors is a hope, not a backup.",
      "And retention is part of the job: without the find-and-delete line, your disk becomes the next outage.",
    ],
  }),
  pitfalls: bullets({
    heading: "Shell pitfalls that end careers (briefly)",
    accent: "rose",
    items: [
      { text: "Unquoted variables", detail: 'rm -rf "$DIR" with DIR="/data old" — without quotes it becomes two arguments', kind: "bad" },
      { text: "Parsing ls output", detail: "filenames with spaces break it — use globs or find -print0", kind: "bad" },
      { text: "Missing the shebang", detail: "sh vs bash differences (arrays, [[ ]]) strike only in production", kind: "info" },
      { text: "Testing on prod first", detail: "run new scripts with echo before the destructive command until the logic is proven", kind: "good" },
    ],
    lines: [
      "The rm horror story always starts with an unquoted variable and a directory with a space in its name.",
      "Never parse ls — its output is for humans; your script should glob or use find so filenames with spaces survive.",
      "Develop the habit of dry-running: echo the command, read it, then remove the echo. One second of printing has saved many re-installs.",
    ],
  }),
  warStory: scenario({
    label: "War story · the stray space",
    context: "A cleanup script contained: rm -rf $TARGET /tmp/scratch — written quickly at the end of a long Friday.",
    event: "One night TARGET was empty. The unquoted variable vanished, and bash read the line as 'rm -rf /tmp/scratch' — fine — but a later edit added a space before the slash. The script ran: rm -rf /tmp/scratch became rm -rf / scratch's parent in testing. The staging server lost /home.",
    resolution: "Restored from the very backups the script was meant to manage. Permanent fixes: quoted variables, -- guard on rm, and a team rule that cleanup scripts require a second reviewer — destructive one-liners get treated like production changes.",
    lines: [
      "A single unquoted variable and a stray space deleted a staging server's home directory on a quiet Friday night.",
      "Backups saved the day — ironically the very thing the script existed to manage.",
      "The team's lasting rule: destructive commands get quoted variables, -- guards, and a second pair of eyes. It's cheaper than a restore.",
    ],
    accent: "green",
  }),
};

// ── Cyber Fundamentals (remaining 5) ─────────────────────────

const cf11: Deepening = {
  diagram: svgdiag({
    heading: "The CIA triad guards the crown jewels",
    sub: "every security control exists to serve one of three properties",
    template: "defense",
    accent: "purple",
    lines: [
      "Confidentiality means only the right people can read it. Integrity means nobody — including an attacker — can change it unnoticed. Availability means it is there when the business needs it.",
      "Every control you will ever configure maps to one of these three: encryption serves confidentiality, hashes and backups serve integrity, redundancy and patching serve availability.",
      "Most incidents break more than one property at once — which is exactly why you classify an incident by naming every property it damaged.",
    ],
  }),
  walkthrough: steps({
    heading: "Walkthrough · classify a real incident by property",
    accent: "purple",
    steps: [
      { title: "Name the crown jewel", detail: "what data or service would actually hurt if touched?" },
      { title: "Ask 'could someone read it?", detail: "leak → confidentiality" },
      { title: "Ask 'could someone change it?", detail: "tamper → integrity — silent, so check hashes and logs" },
      { title: "Ask 'could someone stop it?", detail: "outage → availability, even without any data loss" },
      { title: "List the overlap", detail: "ransomware = availability + integrity + often confidentiality" },
    ],
    lines: [
      "Classification is the first move of every investigation: name the property, then hunt the control that protects it.",
      "Confidentiality breaches announce themselves — data appears somewhere it shouldn't. Integrity breaches are the dangerous ones because they are silent by design.",
      "Availability is the one property that hurts the moment it fails: a stolen password is bad, a dead payment system is an emergency call.",
      "And the classic mistake is picking one property and ignoring the rest — real incidents rarely respect your categories.",
    ],
  }),
  pitfalls: bullets({
    heading: "CIA pitfalls in interviews and incidents",
    accent: "rose",
    items: [
      { text: "Calling every breach a 'hack'", detail: "a misconfigured S3 bucket leaking data is a confidentiality failure, not a sophisticated attack", kind: "bad" },
      { text: "Treating availability as optional", detail: "a DDoS or a dead certificate is an availability incident with a business impact sheet", kind: "bad" },
      { text: "Assuming integrity means encryption", detail: "encryption hides data; integrity is proven by hashes, signatures and audit logs", kind: "bad" },
      { text: "Balancing, not sacrificing", detail: "zero trust and encryption cost a little convenience — that is the job, not an excuse to skip it", kind: "good" },
    ],
    lines: [
      "Interviewers love the triad because it separates people who memorized three words from people who can map controls to outcomes.",
      "The useful habit is reverse classification: every control you touch, ask which property it serves. If it serves none, why is it there?",
      "And in an incident, write the damaged properties at the top of the report — it is the sentence that makes executives understand what happened.",
    ],
  }),
  warStory: scenario({
    label: "War story · the backup that made the ransom a shrug",
    context: "A mid-size accounting firm got hit by ransomware on a Friday evening. Screens went dark, files became .locked, and a BTC demand appeared.",
    event: "The team classified it as availability first: the business was dead. But the real damage was integrity — how many backups were quietly encrypted too, and for how long had the attacker been inside?",
    resolution: "Weekly immutable backups meant the firm restored to Thursday night and lost one day of work. The triad turned panic into a plan: availability restored, integrity proven by hashes, and confidentiality checked by scanning what the attacker touched before encrypting.",
    lines: [
      "Ransomware is the triad's exam question: it kills availability instantly and attacks integrity silently.",
      "Immutable backups answered the question that mattered — how far back can we trust a clean copy.",
      "Classify first, panic second. The property you name determines the control you reach for.",
    ],
    accent: "purple",
  }),
};

const cf13: Deepening = {
  diagram: svgdiag({
    heading: "STRIDE: six threat categories, one mnemonic",
    sub: "walk any feature through all six to find what you're missing",
    template: "loop",
    labels: ["Spoofing", "Tampering", "Repudiation", "Info Disclosure", "Denial of Service", "Elevation"],
    accent: "sky",
    lines: [
      "STRIDE is a threat-modeling lens: spoofing is pretending to be someone else, tampering is changing data in transit or at rest, and repudiation is denying you did something because there is no proof.",
      "Information disclosure leaks data to the wrong reader, denial of service starves a resource, and elevation of privilege turns any foothold into a bigger one.",
      "Walk every feature through all six and the threats you were not thinking about — especially repudiation — finally have names.",
    ],
  }),
  walkthrough: steps({
    heading: "Walkthrough · STRIDE a login flow",
    accent: "sky",
    steps: [
      { title: "Spoofing", detail: "can someone pretend to be a user? → strong auth, session randomness" },
      { title: "Tampering", detail: "can a token be modified in transit? → TLS, signed cookies, HMAC" },
      { title: "Repudiation", detail: "can a user deny they logged in? → audit log with timestamp and IP" },
      { title: "Info disclosure", detail: "does an error message reveal the username exists? → generic errors" },
      { title: "DoS", detail: "can login be flooded? → rate limiting, lockout policy" },
      { title: "Elevation", detail: "does a normal login expose an admin path? → role checks server-side" },
    ],
    lines: [
      "Pick one feature and run it through all six categories — the exercise takes ten minutes and finds what checklists miss.",
      "On a login form, spoofing and elevation get all the attention, but repudiation is where businesses actually get burned: no log, no proof, no case.",
      "The value is the discipline: STRIDE forces you to think like the feature is guilty until you have shown otherwise.",
    ],
  }),
  pitfalls: bullets({
    heading: "STRIDE traps",
    accent: "rose",
    items: [
      { text: "Applying it only to the app", detail: "data stores, APIs and third-party integrations carry threats too — scope it to the whole system", kind: "bad" },
      { text: "Skipping repudiation", detail: "the least glamorous category is the one auditors and lawyers actually ask about", kind: "bad" },
      { text: "Using it as a compliance checklist", detail: "it is a lens for finding gaps, not a form to tick — re-run it when the design changes", kind: "bad" },
      { text: "Documenting threats without owners", detail: "a threat nobody owns is a threat that ships", kind: "good" },
    ],
    lines: [
      "The most common failure is treating STRIDE as a one-time checkbox exercise instead of a thinking tool.",
      "Repudiation is the category beginners skip and incidents come back to haunt: no audit trail means no investigation possible.",
      "End every session by assigning an owner to each accepted risk — unnamed threats quietly become someone else's incident.",
    ],
  }),
  warStory: scenario({
    label: "War story · the transaction that never happened",
    context: "A fintech startup got a furious customer email: 'I paid twice and you have no record.' The app logs showed nothing.",
    event: "The team ran STRIDE and found the gap immediately: repudiation. Payment callbacks were fire-and-forget with no audit row written, so a retried request could double-charge while the logs stayed silent.",
    resolution: "Every payment now writes an immutable audit event with idempotency keys before processing. The lesson stuck: the threat you can't see is the one you didn't name — and STRIDE names it.",
    lines: [
      "A customer dispute became a code audit because the system had no proof of its own actions.",
      "Repudiation isn't about attackers — it's about being able to prove what happened when the business depends on it.",
      "One STRIDE pass turned a reputation scare into an idempotency key and an audit table.",
    ],
    accent: "sky",
  }),
};

const cf23: Deepening = {
  diagram: svgdiag({
    heading: "The malware lifecycle — break any link",
    sub: "delivery to objective, with a defense at every stage",
    template: "malware",
    accent: "rose",
    lines: [
      "Malware is a lifecycle, not a file: delivery gets it in, the exploit runs it, persistence keeps it alive, and the beacon phones home for orders.",
      "Lateral movement spreads the foothold with stolen credentials, and actions on objective — exfiltration, encryption, ransomware — are what the victim actually feels.",
      "Defense happens at every link: email gateway stops delivery, patching stops the exploit, EDR watches for beacons, and least privilege caps the lateral move.",
    ],
  }),
  walkthrough: steps({
    heading: "Walkthrough · triage a suspicious attachment safely",
    accent: "rose",
    steps: [
      { title: "Isolate first", detail: "quarantine the file — never open it on your workstation" },
      { title: "Static pass", detail: "strings, file type, hashes, VirusTotal — look before you run" },
      { title: "Dynamic pass", detail: "run it in a disposable sandbox with network logging" },
      { title: "Watch the beacon", detail: "what does it phone home to? that C2 is the investigation's thread" },
      { title: "Write the chain", detail: "delivery → exploit → persistence → beacon — name each link you saw" },
    ],
    lines: [
      "The golden rule of malware analysis: nothing touches your real machine. Sandboxes are cheap; rebuilds are not.",
      "Static analysis answers 'what is this?' fast — hashes, imports, suspicious strings. Dynamic analysis answers 'what does it do?' — that's where the C2 address appears.",
      "Map what you observe onto the lifecycle stages. Most of the time you'll catch it at delivery or exploit, which is exactly where it's cheapest to stop.",
    ],
  }),
  pitfalls: bullets({
    heading: "Malware-analysis mistakes",
    accent: "rose",
    items: [
      { text: "Running samples on your own box", detail: "one wrong click and the analyst becomes patient zero", kind: "bad" },
      { text: "Blindly trusting VirusTotal verdicts", detail: "a fresh sample is often 0 detections — reputation is not proof", kind: "bad" },
      { text: "Cleaning the file and stopping", detail: "the beacon, the persistence mechanism and the C2 must be found and killed too", kind: "bad" },
      { text: "Naming malware by symptoms", detail: "'the weird exe' is not a name — hash it, family it, version it", kind: "good" },
    ],
    lines: [
      "The beginner mistake is stopping at 'it's a virus' — the professional question is 'what is the full chain and where did it enter?'",
      "Zero detections on VirusTotal means nothing for a sample younger than the signatures; analyze behavior, not just reputation.",
      "Removal is the last step, not the first: preserve evidence, map persistence, then clean.",
    ],
  }),
  warStory: scenario({
    label: "War story · the dropper that waited nine months",
    context: "A shipping company's EDR flagged a beacon at 3 AM from a finance workstation. The malware was nine months old.",
    event: "An email attachment had dropped a loader that sat silent, running only once a month to phone home — long enough to defeat any 'detect on first sight' rule. By the time it moved, it was using valid admin credentials.",
    resolution: "The beacon pattern — same destination, monthly rhythm, small payload — was the giveaway. The kill was simple once they looked at the network, not the file: block the C2, reset credentials, reimage. Dwell time is the metric that matters; beacons are how you find it.",
    lines: [
      "Nine months of quiet dormancy is exactly how patient malware avoids the 'new file' detectors.",
      "The file was old; the beacon was fresh. Network visibility found what disk scans had missed.",
      "Dwell time is the metric that matters — and beacons are the clock that measures it.",
    ],
    accent: "rose",
  }),
};

const cf41: Deepening = {
  diagram: svgdiag({
    heading: "Two locks for two jobs",
    sub: "symmetric moves the data; asymmetric agrees the key",
    template: "symvsym",
    accent: "teal",
    lines: [
      "Symmetric encryption — AES — uses one shared secret key. It is blisteringly fast, which is why it encrypts the actual data, and its weakness is the ancient problem: how do two strangers share the key safely?",
      "Asymmetric encryption — RSA or ECC — uses a keypair: publish the public key freely, guard the private key with your life. It solves key exchange but is far too slow for bulk data.",
      "Real TLS combines them: asymmetric exchange to agree a session key, symmetric encryption to move the data. That hybrid is not a compromise — it is the design.",
    ],
  }),
  walkthrough: steps({
    heading: "Walkthrough · pick the right primitive",
    accent: "teal",
    steps: [
      { title: "Data at rest?", detail: "AES-256 (GCM if you need authenticated encryption), never ECB" },
      { title: "Key exchange?", detail: "use TLS/DH — don't roll your own RSA key transport" },
      { title: "Signatures?", detail: "ECDSA or Ed25519 — signing is not encryption, keep them separate" },
      { title: "Passwords?", detail: "neither — salted bcrypt/argon2, one-way only" },
      { title: "Verify the mode", detail: "GCM/CBC+HMAC for integrity; ECB or raw RSA is an instant fail" },
    ],
    lines: [
      "The decision tree is short: bulk data → AES, agreement → asymmetric, integrity → MACs or signatures, passwords → hashing. Never reach past the right tool.",
      "ECB mode is the classic interview red flag: identical plaintext blocks produce identical ciphertext, and the penguin picture leaks everything.",
      "And remember signing and encryption are opposites in spirit: encryption hides content, a signature proves authorship. Mixing them up is how real products get broken.",
    ],
  }),
  pitfalls: bullets({
    heading: "Crypto pitfalls that fail audits",
    accent: "rose",
    items: [
      { text: "Rolling your own crypto", detail: "homegrown algorithms fail quietly — use vetted libraries and standard modes", kind: "bad" },
      { text: "Storing keys in the repo", detail: "a private key in git history is compromised forever — use a secrets manager", kind: "bad" },
      { text: "Confusing encryption with signing", detail: "'signed and sealed' is marketing; signatures prove origin, encryption proves secrecy", kind: "bad" },
      { text: "Ignoring key rotation", detail: "a key that never rotates is a liability with a lifetime you can't control", kind: "good" },
    ],
    lines: [
      "Every crypto audit story starts with 'we wrote our own algorithm' and ends with a forensic report.",
      "Key hygiene is 90% of crypto security: a strong cipher with a leaked key protects nothing.",
      "Standard modes, vetted libraries, rotation schedules — boring is the entire point.",
    ],
  }),
  warStory: scenario({
    label: "War story · the private key in a public repo",
    context: "A startup's API kept getting 'impossible' attacks: validly signed requests from accounts that had never logged in.",
    event: "Someone had committed a .env file with the JWT signing key to a public GitHub repo two years earlier. Anyone could mint tokens for any user, and the breach had no 'initial access' — the keys were the door.",
    resolution: "Rotating the signing key invalidated every forged token in one command. The team added secret scanning to CI and made .env untrackable. The lesson: your crypto is only as safe as your key storage — the algorithm was never the weak point.",
    lines: [
      "The strongest algorithm in the world is worthless when the key lives in a public repository.",
      "Rotating one secret ended an 'impossible' breach that had run for years.",
      "Key storage and rotation are security controls, not paperwork.",
    ],
    accent: "teal",
  }),
};

const cf43: Deepening = {
  diagram: svgdiag({
    heading: "How a certificate earns your trust",
    sub: "the chain of trust from root CA to your browser",
    template: "tls",
    accent: "cyan",
    lines: [
      "A certificate is a public key with a signature attached: a trusted Certificate Authority vouches that this key belongs to this domain.",
      "Your browser verifies the chain up to a root CA it already trusts, checks the domain in the certificate, and checks the dates — one broken link and the padlock turns red.",
      "That is why the padlock means 'the pipe is encrypted to a vetted domain' — it never means the website itself is safe.",
    ],
  }),
  walkthrough: steps({
    heading: "Walkthrough · inspect a certificate like an auditor",
    accent: "cyan",
    steps: [
      { title: "openssl s_client -connect host:443", detail: "dump the presented chain — who actually signed it?" },
      { title: "Check the issuer", detail: "is it a real CA or a self-signed impostor?" },
      { title: "Check the SANs", detail: "does the name you typed appear? wildcards only cover one level" },
      { title: "Check the dates", detail: "expired and not-yet-valid certs are instant failures" },
      { title: "Check revocation", detail: "OCSP/CRL — was this cert revoked for a reason?" },
    ],
    lines: [
      "Auditing a certificate is five checks and thirty seconds: issuer, chain, name, dates, revocation.",
      "The most common real-world failure is an expired certificate taking down an internal service — the chain is fine, the dates are not.",
      "And remember the trust anchor: you trust the root store, so the entire chain is only as strong as the weakest CA in it.",
    ],
  }),
  pitfalls: bullets({
    heading: "PKI pitfalls",
    accent: "rose",
    items: [
      { text: "Trusting self-signed certs silently", detail: "a self-signed cert means you are trusting a stranger's word — verify out-of-band", kind: "bad" },
      { text: "Wildcards in the wrong places", detail: "*.example.com covers a.example.com but not a.b.example.com — and one leaked key exposes all subdomains", kind: "bad" },
      { text: "Ignoring expiry automation", detail: "cert renewal is the #1 cause of unexpected outages — automate it with ACME", kind: "bad" },
      { text: "Pinning without a plan", detail: "cert pinning breaks clients when you rotate — pin only where you control both ends", kind: "good" },
    ],
    lines: [
      "Expired certificates are the silent killer of internal apps — everything worked yesterday and nothing works today.",
      "Wildcards are a convenience and a single point of compromise; know exactly what one key protects.",
      "Automate renewal, monitor expiry, and never bypass a certificate warning 'just for now'.",
    ],
  }),
  warStory: scenario({
    label: "War story · the app that died at midnight on the first",
    context: "A payments app's mobile clients all started failing TLS handshakes at exactly midnight on the first of the month.",
    event: "An internal CA certificate used for mTLS between the app and the API had expired at 00:00 UTC. Renewal was a manual annual task assigned to someone who had left the company eight months earlier.",
    resolution: "The fix was re-issuing the cert and pinning the new public key, plus an ACME-based auto-renewal so a human never had to remember. The lesson: every certificate needs an owner, a calendar, and an alarm.",
    lines: [
      "A service used by thousands stopped at midnight because one certificate had no renewal automation.",
      "Manual certificate chores are outages waiting for a calendar page.",
      "Automate the boring trust work — ACME exists so expiry stops being a crisis.",
    ],
    accent: "cyan",
  }),
};

// ── Threat Intelligence (remaining 1) ─────────────────────────

const ti12: Deepening = {
  diagram: svgdiag({
    heading: "ATT&CK vs the kill chain",
    sub: "a taxonomy over a timeline — map every step, left of boom and right of boom",
    template: "killchain",
    accent: "violet",
    lines: [
      "The cyber kill chain is a timeline — recon, weaponize, deliver, exploit, install, C2, actions — and its power is 'left of boom': stop the attacker before delivery lands.",
      "MITRE ATT&CK is a taxonomy instead: techniques organized by tactic, with IDs like T1566 (phishing) so teams can talk about the same behavior precisely.",
      "Kill chain tells you when to intervene; ATT&CK tells you what you're actually seeing and what to look for next.",
    ],
  }),
  walkthrough: steps({
    heading: "Walkthrough · map a phishing incident to ATT&CK",
    accent: "violet",
    steps: [
      { title: "Initial access", detail: "T1566 phishing — the user clicked" },
      { title: "Execution", detail: "T1059 command and scripting — what ran?" },
      { title: "Persistence", detail: "T1547 registry run keys — did it survive reboot?" },
      { title: "C2", detail: "T1071 application-layer protocol — where does it phone home?" },
      { title: "Collection & exfil", detail: "T1005 local data + T1041 exfil over C2 — what left the building?" },
    ],
    lines: [
      "ATT&CK IDs turn vague narratives into precise, searchable evidence — 'the phishing incident' becomes T1566 → T1059 → T1071.",
      "Start from the tactic you observed and work outward: each technique has associated procedures and, more importantly, detection ideas.",
      "The real power is coverage analysis: list the techniques you have detections for, and the gaps in that list are your roadmap.",
    ],
  }),
  pitfalls: bullets({
    heading: "ATT&CK traps",
    accent: "rose",
    items: [
      { text: "Treating it as a checklist", detail: "ticking techniques proves nothing — map the actual observed behavior", kind: "bad" },
      { text: "Stopping at initial access", detail: "T1566 is where stories start; the lateral movement and exfil are where damage happens", kind: "bad" },
      { text: "Confusing technique with procedure", detail: "phishing (T1566) is the technique; a specific .lnk file is a procedure — detections target both differently", kind: "bad" },
      { text: "Forgetting the kill-chain 'when'", detail: "ATT&CK says what; the kill chain says when to intervene — use both", kind: "good" },
    ],
    lines: [
      "The failure mode is using ATT&CK as a poster instead of a lens — coverage analysis is the whole point.",
      "Techniques outlive specific malware: when a new family appears, the techniques usually don't change.",
      "Map observations to IDs in the report; it is the difference between a story and intelligence.",
    ],
  }),
  warStory: scenario({
    label: "War story · the campaign nobody mapped until it was over",
    context: "A bank's SOC chased a spear-phishing campaign for two weeks, extinguishing one alert at a time.",
    event: "During the post-incident review they mapped the full chain onto ATT&CK and saw the pattern instantly: the same initial-access technique, the same C2 infrastructure, hitting three departments — one campaign, not three incidents.",
    resolution: "One detection rule on the shared C2 domain and one hunt for the beacon pattern covered all three cases. Mapping to a framework turned reactive firefighting into a single coordinated response — and gave management a picture that fit on one slide.",
    lines: [
      "Two weeks of separate alerts became one campaign the moment the team mapped behaviors to a common framework.",
      "The shared infrastructure was the thread — ATT&CK made it visible.",
      "Frameworks turn firefighting into intelligence: same technique, same infrastructure, one response.",
    ],
    accent: "violet",
  }),
};

// ── SOC Operations (remaining 8) ─────────────────────────────

const so11: Deepening = {
  diagram: svgdiag({
    heading: "The SOC escalation ladder",
    sub: "Tier 1 moves fast and cheap; Tier 3 digs deep and expensive",
    template: "tiers",
    labels: ["Tier 1 — Triage", "Tier 2 — Investigate", "Tier 3 — Deep dive", "SOC Management"],
    accent: "cyan",
    lines: [
      "A SOC is a factory with an assembly line: Tier 1 triages every alert fast and cheap, Tier 2 investigates the survivors, and Tier 3 hunts, reverse-engineers, and builds detections.",
      "The ladder exists because attention is the scarce resource — you do not spend a senior analyst's hour on a false positive that Tier 1 can clear in ninety seconds.",
      "Escalation is a contract: each tier hands upward more context than it received, so the investigation never restarts from zero.",
    ],
  }),
  walkthrough: steps({
    heading: "Walkthrough · route an alert like a Tier 1 analyst",
    accent: "cyan",
    steps: [
      { title: "Acknowledge", detail: "claim the alert within SLA — the clock starts now" },
      { title: "Validate", detail: "is the rule firing on real activity or noise? check the raw log" },
      { title: "Scope", detail: "one host or many? one user or a pattern?" },
      { title: "Escalate or close", detail: "write the finding with evidence, or close with a reason — never silently" },
      { title: "Update the playbook", detail: "a recurring false positive deserves a tuning ticket, not another ignored alert" },
    ],
    lines: [
      "Tier 1's job is triage speed with documented honesty: every alert gets a verdict, and every verdict gets a reason.",
      "The SLA clock and the evidence trail matter more than being right the first time — escalation is how you stay right.",
      "And tuning is part of triage: an alert that fires a hundred times a day trains everyone to ignore it.",
    ],
  }),
  pitfalls: bullets({
    heading: "SOC structure pitfalls",
    accent: "rose",
    items: [
      { text: "Flat SOC, everyone does everything", detail: "no clear tiers means alerts queue behind deep investigations — SLA failures follow", kind: "bad" },
      { text: "Tier 1 without a playbook", detail: "new analysts guessing under pressure produce inconsistent verdicts", kind: "bad" },
      { text: "Escalation without context", detail: "a ticket that says 'weird' forces Tier 2 to redo the work — attach evidence", kind: "bad" },
      { text: "Measuring only alert counts", detail: "closing fast is easy; closing right is the metric — track false positive rate too", kind: "good" },
    ],
    lines: [
      "The most common startup mistake is one analyst wearing every tier — the queue becomes the investigation.",
      "Playbooks are not bureaucracy; they are how a new analyst produces Tier 1-quality work on day three.",
      "Every escalation should arrive with context attached, so the next tier starts where the last one stopped.",
    ],
  }),
  warStory: scenario({
    label: "War story · the SOC that drowned in its own alerts",
    context: "A bank's new SIEM shipped with every rule at maximum sensitivity: 40,000 alerts a day for a five-person SOC.",
    event: "Within a week analysts were closing alerts in bulk without reading them just to survive. The dashboard was a lie — and a real beacon was quietly buried under the noise.",
    resolution: "The rebuild took three months: rules tuned by false-positive rate, a triage queue with SLA ownership, and alert counts replaced by time-to-triage and time-to-respond. The lesson: an unmanaged alert pipeline is a denial-of-service you paid for.",
    lines: [
      "Forty thousand alerts a day is not visibility — it is white noise that hides the real signal.",
      "The fix was tuning and structure, not more analysts and more rules.",
      "An alert nobody has time to read is worse than no alert at all.",
    ],
    accent: "cyan",
  }),
};

const so21: Deepening = {
  diagram: svgdiag({
    heading: "The SIEM pipeline",
    sub: "raw logs in, answered questions out",
    template: "cicd",
    labels: ["Collect", "Normalize", "Correlate", "Alert", "Investigate", "Report"],
    accent: "sky",
    lines: [
      "A SIEM is a pipeline: collect logs from everywhere, normalize them into one schema, then correlate events across sources to find the story no single log tells.",
      "The pipeline is only as good as its input — a source you never onboarded is a blind spot, and garbage timestamps poison every correlation downstream.",
      "At the end of the pipeline sits a human: the alert is a question, not an answer, and the investigation is where the value is created.",
    ],
  }),
  walkthrough: steps({
    heading: "Walkthrough · onboard a new log source properly",
    accent: "sky",
    steps: [
      { title: "Pick the source", detail: "what question will this data answer? auth, DNS, EDR, firewall — each earns its place" },
      { title: "Ship it", detail: "agent or syslog — encrypted, authenticated, time-synced" },
      { title: "Normalize", detail: "map fields to the schema: src_ip, user, event_type — never store raw-only" },
      { title: "Test a use case", detail: "write one query that the data actually answers — prove it before you scale it" },
      { title: "Retention & cost", detail: "hot vs cold tiers — you pay for every byte, so know what you need to keep" },
    ],
    lines: [
      "Onboarding discipline: every log source must answer a question, or it is just storage you pay for.",
      "Normalization is the difference between searching and actually investigating — fields you can query beat text you can only eyeball.",
      "Time sync is the silent killer: correlation across servers with drifting clocks is fiction.",
    ],
  }),
  pitfalls: bullets({
    heading: "SIEM pitfalls",
    accent: "rose",
    items: [
      { text: "Ingesting everything, using nothing", detail: "unlimited storage without use cases is an invoice, not a defense", kind: "bad" },
      { text: "Skipping normalization", detail: "every vendor's log format is different — raw-only data makes correlation impossible", kind: "bad" },
      { text: "Forgetting the source coverage map", detail: "you don't know your blind spots unless you list every asset against every log type", kind: "bad" },
      { text: "Alerting without tuning", detail: "a SIEM that cries wolf gets muted — tune on false-positive rate continuously", kind: "good" },
    ],
    lines: [
      "The SIEM failure that hurts most is the one nobody sees: a critical source that was never onboarded.",
      "Use cases should drive ingestion, not the other way around — storage is a budget, spend it on questions you need answered.",
      "Tuning is maintenance, not cleanup: review detection quality every sprint.",
    ],
  }),
  warStory: scenario({
    label: "War story · the DNS logs that solved it, three months late",
    context: "A retailer suffered a breach and the SIEM had 'everything' — except DNS. Every other source told a partial story for months.",
    event: "The attacker used domain generation algorithms, and only the firewall logs hinted at it. Had DNS query logs been ingested, the beacon pattern would have surfaced in week one instead of month three.",
    resolution: "DNS and DHCP logging became mandatory for every network segment. The lesson that stuck: 'we collect everything' is a dangerous sentence — coverage is a map you maintain, not a checkbox you tick once.",
    lines: [
      "Three months of partial answers because one cheap log source was never switched on.",
      "DNS is the phone book of every attack — beacons, C2 and exfil all leave their fingerprints there.",
      "Coverage is a living map: every new asset and network segment must be onboarded or it is a blind spot.",
    ],
    accent: "sky",
  }),
};

const so31: Deepening = {
  diagram: svgdiag({
    heading: "Anatomy of a detection rule",
    sub: "from raw event to a case you can defend",
    template: "cicd",
    labels: ["Log source", "Parse", "Match rule", "Correlate", "Alert", "Case"],
    accent: "violet",
    lines: [
      "A detection rule is a hypothesis about badness: this log source, these conditions, this threshold — and when they line up, an alert is born.",
      "The rule is only as honest as its match condition: too broad, and it drowns you in false positives; too narrow, and the alert only catches the version of the attack you already knew about.",
      "Every rule ends in a case: an alert without an owner, a playbook, and a reason it exists is noise wearing a badge.",
    ],
  }),
  walkthrough: steps({
    heading: "Walkthrough · write a rule that survives its first week",
    accent: "violet",
    steps: [
      { title: "Anchor in a source", detail: "which log field is ground truth? (e.g. process.parent vs command line)" },
      { title: "Write the match condition", detail: "specific behaviors, not vague keywords — 'powershell -enc' beats 'powershell'" },
      { title: "Add context", detail: "correlate: same user, same host, time window — the story, not the event" },
      { title: "Set a sane threshold", detail: "baseline normal first — alert on deviation, not on existence" },
      { title: "Validate against history", detail: "run it against 30 days of real data; the false-positive rate is a number you must know" },
    ],
    lines: [
      "The best rules anchor on attacker-necessity: fields the adversary must touch and cannot avoid, rather than keywords they can simply omit.",
      "Validate against history before going live — a rule that fired a thousand times in the past month will fire a thousand times next week.",
      "And write the rule with its story attached: what attack, what evidence, what to do next. That comment is the difference between a rule and a legend.",
    ],
  }),
  pitfalls: bullets({
    heading: "Detection rule pitfalls",
    accent: "rose",
    items: [
      { text: "Keyword soup", detail: "a rule listing every malware name becomes a maintenance nightmare and misses everything new", kind: "bad" },
      { text: "No baseline", detail: "alerting on any admin PowerShell when admins run PowerShell daily = guaranteed noise", kind: "bad" },
      { text: "No owner or playbook", detail: "an alert that nobody knows how to respond to is a liability, not a control", kind: "bad" },
      { text: "Tuning by deletion", detail: "when a rule is too noisy, fix the condition — don't just mute the alert", kind: "good" },
    ],
    lines: [
      "The rule lifecycle is write, baseline, tune, retire — a detection library is a garden, not a museum.",
      "Anchor on behaviors the attacker cannot avoid, and your rules will still work when the malware changes.",
      "Every alert needs a human answer for 'so what?' — that is what separates detection from decoration.",
    ],
  }),
  warStory: scenario({
    label: "War story · the rule that was 99.9% right",
    context: "A SOC wrote a rule for encoded PowerShell — and it fired 900 times a day, because half the legitimate admin tooling used -enc for its own reasons.",
    event: "Rather than delete the rule, an analyst looked at the 0.1%: the few executions that also wrote a scheduled task and reached out to a new external IP. One extra correlation condition collapsed 900 alerts into three suspicious chains.",
    resolution: "The lesson became the team's rule-writing motto: conditions are cheap, context is everything. The same three chains are now hunted weekly as a standing detection.",
    lines: [
      "Nine hundred alerts hid three real ones — the fix was correlation, not deletion.",
      "A single behavior is noise; two or three aligned behaviors are a story.",
      "Write rules that ask questions, not rules that shout keywords.",
    ],
    accent: "violet",
  }),
};

const so41: Deepening = {
  diagram: svgdiag({
    heading: "The triage ladder under the clock",
    sub: "ack, scope, assess, contain — and the SLA clock never stops",
    template: "triage",
    accent: "teal",
    lines: [
      "Triage is a ladder with a clock: acknowledge within minutes, validate the alert is real, scope how far it reaches, and assess the actual business impact.",
      "Containment comes before perfection — isolate the host, block the indicator, and only then dig for root cause.",
      "Document as you go, because the timeline you write while it happens is the only one that survives memory.",
    ],
  }),
  walkthrough: steps({
    heading: "Walkthrough · triage the 3 AM alert",
    accent: "teal",
    steps: [
      { title: "Ack in 5", detail: "claim it, tell the clock you're alive" },
      { title: "Validate in 15", detail: "raw log — is this rule firing on real behavior?" },
      { title: "Scope", detail: "one host or ten? one user or an entire OU?" },
      { title: "Assess impact", detail: "what data, what systems, what would the business feel?" },
      { title: "Contain, then escalate", detail: "block the C2, isolate the host, then call in the deep divers" },
    ],
    lines: [
      "Speed at triage is about decisiveness, not guessing: acked in five minutes, validated with evidence, contained before it spreads.",
      "The scoping question — 'how wide is this?' — determines everything that follows, so answer it early and update it constantly.",
      "Containment buys you time; investigation spends it. Do them in that order.",
    ],
  }),
  pitfalls: bullets({
    heading: "Triage mistakes under pressure",
    accent: "rose",
    items: [
      { text: "Investigating before containing", detail: "the perfect root-cause report means nothing if the attacker keeps moving", kind: "bad" },
      { text: "Silent triage", detail: "an alert closed without a note is a mystery for the next shift and the next incident", kind: "bad" },
      { text: "SLA theater", detail: "acking instantly then letting the case sit for hours is gaming the metric, not doing the job", kind: "bad" },
      { text: "Escalating without evidence", detail: "attach the logs, the timeline and what you already ruled out", kind: "good" },
    ],
    lines: [
      "Under pressure the failure is always the same: perfect investigation on a spreading incident.",
      "Contain first, understand second — the timeline forgives neither order mistake.",
      "Documentation written during the incident is gold; documentation written after is archaeology.",
    ],
  }),
  warStory: scenario({
    label: "War story · the 3 AM decision that mattered",
    context: "A junior analyst on night shift saw a workstation beaconing to a known-bad domain. The host belonged to the CFO's assistant — isolating it would knock out an executive's mail for hours.",
    event: "The analyst followed the playbook instead of the politics: contained the host, preserved the evidence, escalated with the full timeline. The CFO was annoyed for a day; the incident was over in a week.",
    resolution: "The beacon was a months-old loader using the assistant's mailbox for exfil. Had the analyst waited for permission, the attacker would have finished the job. The lesson management repeated for years: the playbook outranks the org chart.",
    lines: [
      "The scariest triage call is the one with a name attached — but containment is not a popularity contest.",
      "The playbook gave a junior analyst the authority to protect the company from an executive's mailbox.",
      "Contain first, apologize later — an annoyed CFO recovers faster than a finished exfiltration.",
    ],
    accent: "teal",
  }),
};

const so51: Deepening = {
  diagram: svgdiag({
    heading: "Threat intel lives left of the boom",
    sub: "recon and weaponization happen on the attacker's turf — intel is your only window",
    template: "killchain",
    accent: "amber",
    lines: [
      "Threat intelligence is the discipline of knowing the adversary: their tools, their infrastructure, their playbooks — before they ever reach your network.",
      "Left of the boom — recon and weaponization — happens on the attacker's turf, and intel is the only visibility you get into it.",
      "Right of the boom is where your own logs live: delivery, exploitation and actions are observable, and that is where detections and hunting meet intel.",
    ],
  }),
  walkthrough: steps({
    heading: "Walkthrough · turn an IOC into an investigation",
    accent: "amber",
    steps: [
      { title: "Triage the IOC", detail: "is it a hash, a domain, an IP? each has a different half-life" },
      { title: "Check your logs", detail: "have you seen this indicator in the last 90 days?" },
      { title: "Pivot, don't stare", detail: "who else talked to that domain? what else did that hash's dropper do?" },
      { title: "Correlate with a framework", detail: "map the behavior to ATT&CK techniques — the campaign, not the indicator" },
      { title: "Enrich the playbook", detail: "ship the context back to the SOC so the next alert arrives pre-explained" },
    ],
    lines: [
      "Indicators expire and lie; behaviors persist. Pivot from the IOC to the technique as fast as you can.",
      "A single IOC is a clue; the pattern across your logs is the investigation.",
      "The best intel product is the one that makes the next analyst faster — feed the playbooks, not just the reports.",
    ],
  }),
  pitfalls: bullets({
    heading: "Threat intel pitfalls",
    accent: "rose",
    items: [
      { text: "Blocking everything on one feed", detail: "unvetted IOC feeds create outages and burn trust — grade your sources", kind: "bad" },
      { text: "Chasing hashes", detail: "hash detections die the moment the attacker recompiles — track techniques and infrastructure", kind: "bad" },
      { text: "Intel without context", detail: "a domain with no campaign, no confidence, no owner is trivia, not intelligence", kind: "bad" },
      { text: "Forgetting feedback", detail: "your detections are intel too — report what you see so the feed gets better", kind: "good" },
    ],
    lines: [
      "The intelligence lifecycle is circular: requirements, collection, analysis, dissemination, feedback — break the loop and it rots.",
      "Grade every source by precision and recall; a feed that blocks your own CDN is worse than no feed.",
      "Intelligence that doesn't change a decision was a report, not intelligence.",
    ],
  }),
  warStory: scenario({
    label: "War story · the feed that blocked the company's own CDN",
    context: "A SOC enabled a 'threat intel' feed with one click and within an hour the entire company lost access to its own content delivery network.",
    event: "The feed listed the CDN's shared IP ranges as malicious because a handful of abuse reports — the same ranges served thousands of innocent customers. Automation dutifully blocked them.",
    resolution: "Rollback was instant, but the lesson lasted: intel without context and confidence scoring is a footgun. The team built a source-grading policy and made every block reviewable with a reason. Alert fatigue for IOCs dropped too — because they stopped chasing the noise.",
    lines: [
      "One click on an unvetted feed took down the company's own infrastructure.",
      "Reputation data without confidence scoring is a footgun — grade it, review it, explain it.",
      "The best intel decisions are the ones you can defend with a reason.",
    ],
    accent: "amber",
  }),
};

const so61: Deepening = {
  diagram: svgdiag({
    heading: "The incident response cycle",
    sub: "detect, contain, eradicate, recover — then feed the lessons back",
    template: "loop",
    labels: ["Detect", "Contain", "Eradicate", "Recover"],
    accent: "green",
    lines: [
      "Incident response is a cycle, not a checklist: detect the anomaly, contain it fast, eradicate the root cause, and recover to a known-good state.",
      "The loop closes when lessons feed back into detections — every incident should make the next one smaller, or you are paying tuition forever.",
      "Containment and eradication are different jobs: stopping the bleeding is not the same as removing the infection.",
    ],
  }),
  walkthrough: steps({
    heading: "Walkthrough · run a tabletop IR drill",
    accent: "green",
    steps: [
      { title: "Detect", detail: "a phishing email with a real attachment — who notices and how?" },
      { title: "Contain", detail: "isolate the host, reset the credentials, block the C2 — in what order?" },
      { title: "Eradicate", detail: "find the persistence: registry keys, services, scheduled tasks" },
      { title: "Recover", detail: "restore from backup, verify integrity, test the service" },
      { title: "Lessons learned", detail: "what detection gap, what process gap, what ONE change ships this week?" },
    ],
    lines: [
      "A tabletop drill is a fire drill for incidents: no real damage, but every participant discovers their own panic points.",
      "The classic drill discovery is unclear authority — who can isolate a host at 3 AM? Name them in the playbook.",
      "End every drill with one shipped improvement; a drill that changes nothing is theater.",
    ],
  }),
  pitfalls: bullets({
    heading: "IR cycle pitfalls",
    accent: "rose",
    items: [
      { text: "Eradicating before containing", detail: "you cannot clean a house while the burglar is still inside", kind: "bad" },
      { text: "Recovering without verifying", detail: "restoring a backup that contains the malware is just another infection", kind: "bad" },
      { text: "Skipping lessons learned", detail: "every incident without a feedback loop is tuition paid for nothing", kind: "bad" },
      { text: "No tabletop drills until the real thing", detail: "the first time your team runs the playbook should not be the incident", kind: "good" },
    ],
    lines: [
      "Order matters in the cycle: containment first, eradication second, recovery third — and feedback forever.",
      "Verification is part of recovery: hash the restored data, test the service, prove the clean state.",
      "The teams that run drills are the teams that stay calm when it matters.",
    ],
  }),
  warStory: scenario({
    label: "War story · the re-infection that taught eradication",
    context: "A clinic's IT team 'cleaned' a ransomware infection by restoring files from backup — and was hit again nine days later by the same strain.",
    event: "The original infection vector — a vulnerable RDP port — was never closed, and the persistence mechanism was never found. The backup restore simply re-supplied the victim to the same attacker.",
    resolution: "The second cleanup closed the port, reset every credential, and rebuilt hosts from verified images instead of untrusted backups. The clinic's new rule: contain, eradicate, recover — in that order, no shortcuts. Re-infection is proof you skipped a step.",
    lines: [
      "Restoring files without removing the attacker is paying rent on an infection.",
      "The second ransomware attack was the same one — the vector was never fixed.",
      "The cycle exists because skipping a step is how you get to do it again.",
    ],
    accent: "green",
  }),
};

const so71: Deepening = {
  diagram: svgdiag({
    heading: "The report is the deliverable",
    sub: "the incident timeline you document is what the business, the lawyer, and the next analyst will read",
    template: "triage",
    accent: "violet",
    lines: [
      "An incident report is a timeline with a verdict: what happened, when, what was touched, and what was done about it — written while it is happening.",
      "The five W's are the skeleton — who, what, where, when, why — but the evidence trail is the body: logs, hashes, commands, screenshots.",
      "A report that cannot survive a lawyer or an auditor is not a report — it is a diary with gaps.",
    ],
  }),
  walkthrough: steps({
    heading: "Walkthrough · write an incident report in four sections",
    accent: "violet",
    steps: [
      { title: "Executive summary", detail: "three sentences: what happened, impact, current status — the CEO reads only this" },
      { title: "Timeline", detail: "UTC timestamps, every event with evidence attached — the spine of the report" },
      { title: "Technical detail", detail: "indicators, commands run, systems affected — the analyst's section" },
      { title: "Lessons & actions", detail: "what failed, what changes ship, who owns them, by when" },
    ],
    lines: [
      "Write the timeline as the incident unfolds, not after — memory is the least reliable evidence you have.",
      "Every timeline entry needs an artifact: a log line, a hash, a screenshot. Claims without evidence are just claims.",
      "The executive summary is the most important paragraph you will write today; spend real time on it.",
    ],
  }),
  pitfalls: bullets({
    heading: "Reporting pitfalls",
    accent: "rose",
    items: [
      { text: "Writing it from memory after the fact", detail: "the story changes, timestamps drift, and the report quietly becomes fiction", kind: "bad" },
      { text: "Opinions without evidence", detail: "'the attacker was sophisticated' needs an artifact trail, not an impression", kind: "bad" },
      { text: "No owner for actions", detail: "a lessons-learned list with no names and no dates is a wish list", kind: "bad" },
      { text: "Burying the impact", detail: "if the business impact is not on page one, executives will not read the rest", kind: "good" },
    ],
    lines: [
      "The report is the only artifact of your work that survives the incident — treat it as a deliverable, not paperwork.",
      "UTC everywhere, evidence everywhere, ownership everywhere — the three rules of report writing.",
      "If the executive summary takes longer than the technical section, your priorities are inverted.",
    ],
  }),
  warStory: scenario({
    label: "War story · the report that survived a courtroom",
    context: "A logistics company's incident report on an employee data leak became central evidence in a lawsuit two years later.",
    event: "The analysts had written the timeline in local time with no evidence links — the first version was unusable. A legal review forced a rewrite with UTC timestamps, hashes, and artifact references for every entry.",
    resolution: "That rewritten report held up under cross-examination because it was written from evidence, not memory. The team's lasting rule: write every incident report as if opposing counsel will read it — because sometimes they will.",
    lines: [
      "Two years after the incident, the report was still the evidence — written well enough to survive a courtroom.",
      "Timestamps and artifacts are what make a report a document instead of a story.",
      "Write every report as if the lawyers will read it — because sometimes they will.",
    ],
    accent: "violet",
  }),
};

const so82: Deepening = {
  diagram: svgdiag({
    heading: "The SOC career ladder",
    sub: "each rung trades breadth for depth and ownership",
    template: "tiers",
    labels: ["Analyst I", "Analyst II", "Senior Analyst", "Lead / Engineer"],
    accent: "amber",
    lines: [
      "The SOC career ladder trades breadth for depth: Analyst I masters triage at scale, Analyst II owns investigations, Senior Analysts hunt and build detections.",
      "The top rungs are about leverage: a lead or detection engineer improves the whole SOC — playbooks, tooling, and the analysts who use them.",
      "Climbing is about demonstrated patterns: documented investigations, tuned detections, and incidents you can walk through end to end.",
    ],
  }),
  walkthrough: steps({
    heading: "Walkthrough · build the portfolio that gets you promoted",
    accent: "amber",
    steps: [
      { title: "Document everything", detail: "every triage verdict and investigation you can point to is evidence of judgment" },
      { title: "Own a detection", detail: "tune one noisy rule until its false-positive rate is single digits — that is a story" },
      { title: "Write a playbook", detail: "the playbook you author teaches the tier below you and proves leadership" },
      { title: "Automate a chore", detail: "script the weekly IOC sweep — boring work automated is leverage" },
      { title: "Teach one session", detail: "a brown-bag on your last investigation is how people learn your name" },
    ],
    lines: [
      "Promotions in a SOC are won with artifacts, not attendance: detections you tuned, playbooks you wrote, incidents you owned.",
      "The multiplier habit is automation — every chore you script is time the next tier spends investigating instead.",
      "Teaching is the fastest way to learn: explaining an investigation forces you to understand it completely.",
    ],
  }),
  pitfalls: bullets({
    heading: "Career pitfalls",
    accent: "rose",
    items: [
      { text: "Waiting to be noticed", detail: "visibility is part of the job — document, present, publish your work", kind: "bad" },
      { text: "Collecting certs without practice", detail: "a certificate with no lab work and no incident story is a badge, not a skill", kind: "bad" },
      { text: "Chasing the newest tool", detail: "tool depth beats tool breadth — being the SIEM expert matters more than trying everything", kind: "bad" },
      { text: "Skipping the soft skills", detail: "the analyst who can write clearly and calm a nervous executive is rare and promoted", kind: "good" },
    ],
    lines: [
      "The analyst who documents and teaches compounds: each artifact makes the next one easier.",
      "Depth beats breadth in a SOC — the person who truly knows the SIEM, the EDR or the logs is the one people escalate to.",
      "Communication is a security skill: the calm voice on the incident bridge is the one they remember.",
    ],
  }),
  warStory: scenario({
    label: "War story · the analyst who became the SOC",
    context: "A three-person SOC at an insurance company was drowning; alerts queued for days and the manager was considering outsourcing.",
    event: "One analyst started documenting every verdict, then tuning the top ten noisiest rules, then writing playbooks for the queues nobody wanted. Within six months the alert backlog was hours, not days — with the same headcount.",
    resolution: "The SOC stayed internal, and that analyst runs it today. The lesson the manager tells new hires: leverage is the career — the person who fixes the system, not just the alerts, is irreplaceable.",
    lines: [
      "One analyst fixing the system, not just the alerts, saved an entire SOC from outsourcing.",
      "Documentation and tuning compound: every playbook written makes the next shift faster.",
      "The career ladder is climbed with leverage — fix the process and the promotion follows.",
    ],
    accent: "amber",
  }),
};

// ── Web Fundamentals (remaining 2) ───────────────────────────

const wf11: Deepening = {
  diagram: svgdiag({
    heading: "One request, seven little miracles",
    sub: "DNS to render — what actually happens when you hit Enter",
    template: "request",
    accent: "green",
    lines: [
      "Hitting Enter starts a chain: DNS turns the hostname into an IP, TCP builds a reliable pipe on port 443, and TLS wraps it in encryption before a single byte of HTTP crosses it.",
      "The server renders a response — templates, database queries, JSON — and the browser parses HTML into a DOM, computes styles, and runs JavaScript until the page is interactive.",
      "Each step is a place where performance is won or lost, which is why the request lifecycle is the mental model every web developer debugges against.",
    ],
  }),
  walkthrough: steps({
    heading: "Walkthrough · diagnose a slow page, one hop at a time",
    accent: "green",
    steps: [
      { title: "DNS first", detail: "nslookup the host — a slow or failing resolver stalls everything before a single request" },
      { title: "TCP + TLS", detail: "curl -w timing breakdown — was the handshake slow?" },
      { title: "TTFB", detail: "time to first byte — server thinking time, the most common bottleneck" },
      { title: "Payload", detail: "is the HTML huge? images unoptimized? scripts blocking render?" },
      { title: "Render", detail: "DevTools performance — where did the main thread wait?" },
    ],
    lines: [
      "Slow pages are solved the same way the request is built: one hop at a time, measuring each stage separately.",
      "TTFB tells you whose fault it is: a fast TTFB and a slow paint is a frontend problem; a slow TTFB is the server's.",
      "The budget mindset — DNS under 50ms, TTFB under 200ms, render under a second — turns vague slowness into a concrete broken stage.",
    ],
  }),
  pitfalls: bullets({
    heading: "Web fundamentals pitfalls",
    accent: "rose",
    items: [
      { text: "Blaming the server for every slowness", detail: "measure the stages first — the DNS lookup or an unoptimized image is often the real cost", kind: "bad" },
      { text: "Forgetting HTTP is stateless", detail: "every request is independent; sessions and auth are built on top, deliberately", kind: "bad" },
      { text: "Ignoring the browser's render path", detail: "the server can be instant while the page crawls — render-blocking scripts are a frontend bug", kind: "bad" },
      { text: "Treating cache as a fix", detail: "caches hide problems; use them for speed, not to paper over a slow origin", kind: "good" },
    ],
    lines: [
      "The request lifecycle is the debugger's map — name the stage, and you have already named the team that owns the fix.",
      "Stateless HTTP is a feature: the fact that any server can answer any request is what makes the web scalable.",
      "Measure first, blame second — the lifecycle makes both honest.",
    ],
  }),
  warStory: scenario({
    label: "War story · the 'server is slow' that was a font",
    context: "An e-commerce team spent a week blaming their cloud provider for a mysteriously slow checkout page.",
    event: "A developer finally ran the timing breakdown: DNS was fine, TTFB was 80ms, but the page took 4 seconds to render. The culprit: a 2.4 MB webfont loaded render-blocking, with no font-display swap — on a 3G connection, 70% of the page weight was a typeface.",
    resolution: "Subsetting the font, preloading it, and adding font-display: swap cut load time to under a second. The lesson: the lifecycle tells you where the time actually goes, and it is rarely where the blame went.",
    lines: [
      "A week of server blame ended with a 2.4 megabyte font and one line of CSS.",
      "The request lifecycle names the guilty stage — and it was the browser's render path, not the origin.",
      "Measure each hop before you argue about which team owns the slowness.",
    ],
    accent: "green",
  }),
};

const wf51: Deepening = {
  diagram: svgdiag({
    heading: "OWASP Top 10 — the map of common web flaws",
    sub: "ten categories, one theme: trust nothing the client sends",
    template: "grid",
    labels: ["Injection", "Broken Auth", "Sensitive Data", "XXE", "Broken Access", "Misconfig", "XSS", "Insecure Deserial", "Vulnerable Comp", "Logging Fail"],
    accent: "rose",
    lines: [
      "The OWASP Top 10 is a map of the most common web application flaws, updated every few years from real breach data — not a theory, an autopsy list.",
      "The categories repeat a single theme: trusting input the client sends. Injection, XSS, and access-control failures are all the same sin wearing different names.",
      "Use it as a checklist against your own app — each category maps to concrete defenses: parameterized queries, framework auth, output encoding, and least privilege.",
    ],
  }),
  walkthrough: steps({
    heading: "Walkthrough · audit a login + profile page against the Top 10",
    accent: "rose",
    steps: [
      { title: "Injection", detail: "are queries parameterized? never string-concatenate user input" },
      { title: "Broken auth", detail: "rate limiting, secure session cookies, MFA available" },
      { title: "Sensitive data", detail: "TLS everywhere, passwords hashed with bcrypt/argon2, no secrets in responses" },
      { title: "Access control", detail: "server-side checks on every endpoint — the client UI is not security" },
      { title: "XSS & logging", detail: "output-encode everything; log auth events without secrets" },
    ],
    lines: [
      "The Top 10 is best used as a walking audit: take one page of your app and check each category against it.",
      "Access control is the category that grows every year — the fix is server-side authorization on every endpoint, not hiding buttons.",
      "Parameterized queries and output encoding are not advanced — they are the baseline.",
    ],
  }),
  pitfalls: bullets({
    heading: "Top-10 pitfalls",
    accent: "rose",
    items: [
      { text: "Treating it as a compliance form", detail: "it is a starting point, not a certification — real apps have flaws the list never mentions", kind: "bad" },
      { text: "Client-side only validation", detail: "the browser is an attacker-controlled input device; the server must re-check everything", kind: "bad" },
      { text: "Ignoring dependency risk", detail: "vulnerable components are the quietest category — maintain a CVE watch on your dependencies", kind: "bad" },
      { text: "Skipping security logging", detail: "logging failures let attackers operate unseen — log auth and access events", kind: "good" },
    ],
    lines: [
      "The Top 10 changes between editions precisely because the web changes — treat it as a live map, not a scripture.",
      "Dependency vulnerabilities rarely make headlines until they do — a CVE watch on your libraries is security maintenance.",
      "Security logging is how the other nine categories ever get discovered.",
    ],
  }),
  warStory: scenario({
    label: "War story · the SQL injection that a library fixed silently",
    context: "A legacy PHP app had survived for years until a penetration test found every search box injectable.",
    event: "The queries were hand-built with string concatenation — textbook A03 injection. The testers pulled the entire users table in under a minute, and the fix would have taken an intern a week to apply across hundreds of queries.",
    resolution: "The team switched to an ORM with parameterized queries as a hard rule, added a query-builder lint that fails CI on string-concatenated SQL, and the injection class disappeared. The lesson: the Top 10 categories are old because they keep working.",
    lines: [
      "A pentest found what a decade of code review missed: string-concatenated SQL on every search box.",
      "The fix was architectural, not patchwork — parameterized queries as a CI-enforced rule.",
      "The Top 10 keeps repeating because the old mistakes keep working.",
    ],
    accent: "rose",
  }),
};

// ── React Frontend (remaining 4) ─────────────────────────────

const rf11: Deepening = {
  diagram: svgdiag({
    heading: "JSX is sugar over render",
    sub: "what you write, what React actually does, and when the screen updates",
    template: "reactflow",
    accent: "cyan",
    lines: [
      "JSX looks like HTML but compiles to function calls — components are functions, and what you write as <Card /> is a description of what should render, not a command to the DOM.",
      "React's job is to turn that description into real DOM efficiently: render a new tree, reconcile it against the old one, and commit only the differences.",
      "The payoff is declarative thinking: you describe the state of the screen, and React handles the how — which is why you stop telling the DOM what to do and start describing what should be true.",
    ],
  }),
  walkthrough: steps({
    heading: "Walkthrough · trace one prop change through React",
    accent: "cyan",
    steps: [
      { title: "State changes", detail: "a click calls setState — the only trigger for a re-render" },
      { title: "Component re-renders", detail: "the function runs again, building a fresh description" },
      { title: "Reconciliation", detail: "React diffs the old and new trees — minimal change set" },
      { title: "Commit", detail: "the real DOM is touched in one pass" },
      { title: "Effects run", detail: "useEffect fires after paint — side effects never live in render" },
    ],
    lines: [
      "Follow the pipeline once and React stops being magic: state change, render, reconcile, commit, effects.",
      "Render must stay pure — no side effects, no DOM writes, no randomness; the same props must always produce the same description.",
      "Effects exist because the real world — data fetching, subscriptions, timers — has to happen after the screen is updated.",
    ],
  }),
  pitfalls: bullets({
    heading: "JSX pitfalls",
    accent: "rose",
    items: [
      { text: "Mutating state directly", detail: "state must be replaced, not changed — mutation skips the re-render entirely", kind: "bad" },
      { text: "Side effects inside render", detail: "fetching or writing DOM during render breaks the pure pipeline — move it to effects", kind: "bad" },
      { text: "Confusing components with elements", detail: "<Card /> is a component; the element it returns is the description — capital matters", kind: "bad" },
      { text: "Keys on lists", detail: "stable keys let reconciliation move, not recreate — index keys cause state bugs", kind: "good" },
    ],
    lines: [
      "The most common React bug is mutation: replacing state triggers render; mutating it silently does nothing.",
      "Purity is the contract — the moment render does real work, the pipeline breaks in ways that only show up in production.",
      "Keys are reconciliation's address system; unstable keys mean React rebuilds what it could have moved.",
    ],
  }),
  warStory: scenario({
    label: "War story · the list that replayed its own state",
    context: "A team's todo list app started showing the wrong item checked after every reorder — a bug that passed code review and shipped to thousands of users.",
    event: "The culprit was the classic: index keys on a list. Reordering changed every item's key, so React destroyed and recreated the components — and the browser kept the old checkbox state on the recycled DOM.",
    resolution: "Switching to stable id-based keys fixed it in one line, and the team added a lint rule banning index keys in list renders. The lesson: reconciliation is a contract, and keys are how you keep your end of it.",
    lines: [
      "One index key shipped a state bug to thousands of users — the classic reconciliation trap.",
      "Stable keys let React move items instead of rebuilding them from scratch.",
      "The render pipeline punishes shortcuts with bugs that only appear in production.",
    ],
    accent: "cyan",
  }),
};

const rf12: Deepening = {
  diagram: svgdiag({
    heading: "Props flow down, events flow up",
    sub: "the one-way data flow that keeps React predictable",
    template: "reactflow",
    accent: "sky",
    lines: [
      "Props are how parent components hand data and behavior to children — read-only inputs that make a component predictable and testable.",
      "Data flows down through props; events flow up through callbacks — a child never reaches into the parent's state directly.",
      "Composition is the design consequence: small components receiving just the props they need, composed into larger ones — the React way to build UIs.",
    ],
  }),
  walkthrough: steps({
    heading: "Walkthrough · lift state, then prop it down",
    accent: "sky",
    steps: [
      { title: "Find the shared state", detail: "two siblings need the same value? it belongs in the parent" },
      { title: "Lift it", detail: "move the state up to the nearest common ancestor" },
      { title: "Pass it down", detail: "the value travels as a prop to every child that needs it" },
      { title: "Pass handlers up", detail: "children call onXxx callbacks — the parent owns the update" },
      { title: "Keep components dumb", detail: "a component that only receives props and fires callbacks is trivially testable" },
    ],
    lines: [
      "The lifting rule is simple: whenever two components need the same state, that state belongs in their nearest common parent.",
      "One-way data flow is what makes React predictable — trace any value on screen to its owner in one direction.",
      "Handlers-as-props keep children reusable: the same input component serves a login form and a search box.",
    ],
  }),
  pitfalls: bullets({
    heading: "Props pitfalls",
    accent: "rose",
    items: [
      { text: "Prop drilling to the extreme", detail: "five levels of pass-through is a smell — reach for context, but not as the default", kind: "bad" },
      { text: "Mutating props", detail: "props are read-only — mutate the state the prop came from, never the prop itself", kind: "bad" },
      { text: "Derived state from props", detail: "copying a prop into useState creates sync bugs — derive during render instead", kind: "bad" },
      { text: "Default props everywhere", detail: "defaults are fine; hidden required props that silently no-op are traps", kind: "good" },
    ],
    lines: [
      "Prop drilling is a smell, not a crime — context solves it, but overusing context makes components untestable.",
      "Copying props into state is the silent sync bug factory; derive values during render and let props stay the source of truth.",
      "One-way flow means every value on screen has exactly one owner — find the owner and the bug is half-solved.",
    ],
  }),
  warStory: scenario({
    label: "War story · the form that forgot its own draft",
    context: "A long application form lost the user's typed answers whenever a validation message appeared — a bug that survived two sprints.",
    event: "The form component copied the initial values from props into state on mount. When the parent re-rendered and passed new values, the copied state ignored them — the classic derived-state trap.",
    resolution: "The fix removed the state copy: the form derived its values from props during render, with an explicit save-on-change. The lesson: when state is a photocopy of props, the two will eventually disagree.",
    lines: [
      "The form's 'remembered' answers were a photocopy of props — and photocopies go stale.",
      "Derived state from props is a sync bug waiting for its moment.",
      "One-way data flow works only if you let props stay the source of truth.",
    ],
    accent: "sky",
  }),
};

const rf22: Deepening = {
  diagram: svgdiag({
    heading: "State transitions, not state patches",
    sub: "useReducer makes complex updates reviewable and testable",
    template: "reactflow",
    accent: "violet",
    lines: [
      "useReducer centralizes state changes into pure functions: every update is a (state, action) pair, and the reducer decides what the next state looks like.",
      "The win is reviewability — an action log of 'what happened' and one function that defines every possible transition, instead of setState calls scattered across handlers.",
      "Reach for it when updates depend on each other or on the previous state — carts, wizards, games — not for a single counter.",
    ],
  }),
  walkthrough: steps({
    heading: "Walkthrough · convert a messy cart to a reducer",
    accent: "violet",
    steps: [
      { title: "List the actions", detail: "ADD_ITEM, REMOVE_ITEM, SET_QTY, CLEAR — the vocabulary of your state" },
      { title: "Write the reducer", detail: "one pure function, switch on action.type, always return new state" },
      { title: "Dispatch from handlers", detail: "onClick fires dispatch({type:'ADD_ITEM', item}) — handlers stop owning logic" },
      { title: "Test the reducer", detail: "pure function = unit test it directly with a table of cases" },
      { title: "Keep it pure", detail: "no fetch, no Date.now, no Math.random inside the reducer — ever" },
    ],
    lines: [
      "A reducer is a state machine you can read in one sitting: actions in, state out, no surprises.",
      "Purity is what makes reducers testable — feed them states and actions, assert the next state, done.",
      "The discipline of named actions pays off in the bug report: 'when the cart cleared unexpectedly' becomes a dispatch log to read.",
    ],
  }),
  pitfalls: bullets({
    heading: "Reducer pitfalls",
    accent: "rose",
    items: [
      { text: "Side effects in reducers", detail: "fetching or mutating globals inside a reducer breaks purity and double-invocation in StrictMode", kind: "bad" },
      { text: "Overusing it", detail: "a counter with a reducer is ceremony — use useState until updates get interdependent", kind: "bad" },
      { text: "Mutating state inside the reducer", detail: "push/assign on the old state defeats the purpose — return new objects", kind: "bad" },
      { text: "Splitting logic across reducers unnecessarily", detail: "one reducer per state slice is fine; do not fragment a single concern", kind: "good" },
    ],
    lines: [
      "The reducer contract is one sentence: given the previous state and an action, return the next state — nothing else happens in there.",
      "StrictMode double-invokes reducers to surface impurity — if your reducer breaks under that, it was never pure.",
      "Reach for useReducer when updates depend on each other; a flat counter is not that case.",
    ],
  }),
  warStory: scenario({
    label: "War story · the checkout that double-charged a promotion",
    context: "A store's cart applied a discount twice when users changed quantity during a sale — a financial bug found by an angry customer email.",
    event: "The discount logic lived in three separate setState callbacks, each computing against a slightly different snapshot of the cart. Two of them applied the promo; one didn't check whether it was already applied.",
    resolution: "The cart moved to a single reducer: one APPLY_PROMO action, one rule, one code path, plus a unit test table covering every quantity change. The bug class disappeared because there was no longer a second copy of the logic to drift.",
    lines: [
      "Three copies of discount logic guaranteed two of them would disagree eventually.",
      "A reducer gave the cart one rule to test instead of three callbacks to trust.",
      "State logic that lives in one place can only be wrong in one place.",
    ],
    accent: "violet",
  }),
};

const rf41: Deepening = {
  diagram: svgdiag({
    heading: "Forms are state machines",
    sub: "controlled: React owns the value · uncontrolled: the DOM does",
    template: "reactflow",
    accent: "green",
    lines: [
      "A controlled input owns its value in React state: every keystroke flows through setState, so the value on screen is always the value React knows.",
      "An uncontrolled input keeps its value in the DOM and lets React read it on demand — less re-rendering, but the screen and React can briefly disagree.",
      "The choice is about who owns the truth: controlled for validation, live previews and complex forms; uncontrolled for simple, one-shot inputs where re-render cost matters.",
    ],
  }),
  walkthrough: steps({
    heading: "Walkthrough · build a validated form, controlled",
    accent: "green",
    steps: [
      { title: "State per field", detail: "one useState per input, value + onChange — the controlled pattern" },
      { title: "Validate on change", detail: "compute errors during render from the current values" },
      { title: "Disable on invalid", detail: "submit button reflects form validity — users see the rule, not the surprise" },
      { title: "Submit the values", detail: "send exactly what state holds — no DOM reads needed" },
      { title: "Reset properly", detail: "set all fields back to initial values — controlled reset is just setState" },
    ],
    lines: [
      "Controlled means the input is a rendering of state, so validation is just computing over state you already have.",
      "For uncontrolled inputs, read the value once on submit with a ref — never fight the DOM for the truth.",
      "The tradeoff is re-renders: controlled forms re-render per keystroke, which is exactly why uncontrolled exists.",
    ],
  }),
  pitfalls: bullets({
    heading: "Form pitfalls",
    accent: "rose",
    items: [
      { text: "Mixed ownership", detail: "a field that is sometimes controlled, sometimes not, produces 'uncontrolled-to-controlled' warnings and bugs", kind: "bad" },
      { text: "Validating only on submit", detail: "instant feedback beats a wall of errors — validate live, submit clean", kind: "bad" },
      { text: "Reading DOM values in handlers", detail: "document.getElementById in a React handler is the DOM owning your state", kind: "bad" },
      { text: "Forgetting reset and defaults", detail: "a form that keeps stale values after submit is a data-integrity bug", kind: "good" },
    ],
    lines: [
      "Pick an owner for each input and never switch — the 'controlled to uncontrolled' warning is React telling you the contract broke.",
      "Live validation is cheaper than you think and worth more than you think — the submit button should never surprise.",
      "If a handler reads the DOM, ask who owns that value — the answer should be state or a ref, never a query.",
    ],
  }),
  warStory: scenario({
    label: "War story · the form that fought the autofill",
    context: "A bank's onboarding form randomly dropped values the browser had autofilled — users retyped everything, and support tickets exploded.",
    event: "The inputs were uncontrolled, and autofill wrote directly into the DOM without firing React's events. React's copy of the form state stayed empty, so the submit handler read nothing and silently discarded the autofilled values.",
    resolution: "Switching the critical fields to controlled inputs made autofill flow through state like any other change. The lesson: when the browser writes to your form, whoever owns the value must hear about it.",
    lines: [
      "Autofill bypassed React entirely because the DOM owned those inputs.",
      "Controlled inputs turned a browser behavior into a normal state update.",
      "The form bug was an ownership bug: the value's owner never heard the news.",
    ],
    accent: "green",
  }),
};

// ── Node Backend (remaining 6) ───────────────────────────────

const nb11: Deepening = {
  diagram: svgdiag({
    heading: "The event loop is a queue, not a thread pool",
    sub: "one thread, many tasks — timers, I/O, and the phases in between",
    template: "loop",
    labels: ["Timers", "Pending", "Poll", "Check"],
    accent: "green",
    lines: [
      "Node runs your JavaScript on one thread, and the event loop is the dispatcher: timers fire, pending callbacks run, and the poll phase waits for I/O to complete.",
      "The loop only moves on when the current work is done — which is why a CPU-heavy synchronous function blocks every other request in the process.",
      "Async I/O is the trick that makes one thread serve thousands of connections: the thread waits for nothing, it just revisits finished work.",
    ],
  }),
  walkthrough: steps({
    heading: "Walkthrough · trace why a request stalls",
    accent: "green",
    steps: [
      { title: "Profile the event loop", detail: "monitor event-loop lag — if it spikes, something sync is hogging the thread" },
      { title: "Find the CPU eater", detail: "a heavy loop, JSON.stringify of a huge object, bcrypt with default cost" },
      { title: "Move it off-thread", detail: "worker_threads or a job queue for CPU work; never block the loop" },
      { title: "Check I/O patterns", detail: "serial awaits on independent queries are 3x slower than Promise.all" },
      { title: "Verify under load", detail: "one blocked request in a demo becomes hundreds in production" },
    ],
    lines: [
      "The golden rule: nothing CPU-heavy on the event loop thread — move it to workers or a queue.",
      "Event-loop lag is the heartbeat monitor of a Node server; know its baseline before you diagnose anything else.",
      "Parallel I/O with Promise.all is free performance — the loop loves concurrent waits, it hates concurrent compute.",
    ],
  }),
  pitfalls: bullets({
    heading: "Event loop pitfalls",
    accent: "rose",
    items: [
      { text: "Sync work in request handlers", detail: "one blocking call freezes every connection — load testing exposes it instantly", kind: "bad" },
      { text: "Unhandled promise rejections", detail: "swallowed rejections leak memory and silence failures — always catch or crash loudly", kind: "bad" },
      { text: "Nested async spaghetti", detail: "await in loops serializes work that could run in parallel", kind: "bad" },
      { text: "Ignoring backpressure", detail: "queueing without limits is how a spike becomes an outage — cap and shed", kind: "good" },
    ],
    lines: [
      "The event loop punishes the sync function with totalitarian fairness: everyone waits for it.",
      "Rejections you swallow are failures you schedule for later — usually at 3 AM in production.",
      "Backpressure is the difference between a slow service and a dead one: bound your queues.",
    ],
  }),
  warStory: scenario({
    label: "War story · the endpoint that froze the whole API",
    context: "A Node API served hundreds of requests per second until one endpoint started freezing everything for seconds at a time.",
    event: "The culprit was a JSON export endpoint doing a synchronous stringify of a 200 MB in-memory cache — on the event loop. One analyst's export request blocked every checkout in the building.",
    resolution: "The export moved to a worker thread with a queue and a progress response; the loop went back to its business. The lesson the team printed on a mug: the event loop has one thread and zero mercy.",
    lines: [
      "One analyst's export froze every checkout in the building — synchronous work on a single thread.",
      "Worker threads and queues exist for exactly this: heavy work has no business on the loop.",
      "The event loop has one thread and zero mercy.",
    ],
    accent: "green",
  }),
};

const nb12: Deepening = {
  diagram: svgdiag({
    heading: "Every request walks the middleware line",
    sub: "logging, auth, validation — then the handler, then the response home",
    template: "cicd",
    labels: ["Request", "Logger", "Auth", "Validate", "Handler", "Response"],
    accent: "teal",
    lines: [
      "Express is a pipeline: every request passes through middleware functions in order, each one able to modify the request, respond early, or pass control to the next.",
      "Middleware is where cross-cutting concerns live — logging, authentication, validation — kept out of handlers so handlers stay single-purpose.",
      "Order is the whole game: auth before your business logic, error handlers last, and one misordered middleware can skip an entire security check.",
    ],
  }),
  walkthrough: steps({
    heading: "Walkthrough · compose middleware safely",
    accent: "teal",
    steps: [
      { title: "Request logger first", detail: "capture method, path, status, duration — before anything can fail" },
      { title: "Auth before data", detail: "protect routes before validation; never validate what you haven't authenticated" },
      { title: "Validate the payload", detail: "schema validation on input — the API's front door" },
      { title: "Handler does one thing", detail: "business logic only — no logging, no auth checks, no manual parsing" },
      { title: "Error middleware last", detail: "one centralized error handler with four args — the safety net" },
    ],
    lines: [
      "Middleware order is security architecture: auth that runs after a handler has already responded is a lie, not a control.",
      "A centralized error handler turns scattered try-catch noise into one audited place.",
      "Handlers that only handle make the whole pipeline readable top to bottom.",
    ],
  }),
  pitfalls: bullets({
    heading: "Middleware pitfalls",
    accent: "rose",
    items: [
      { text: "Misordering auth", detail: "public and protected routes sharing a pipeline with auth added too late is a classic bypass", kind: "bad" },
      { text: "Async errors unhandled", detail: "a rejected promise in an async handler without a wrapper crashes the request silently — use express-async-errors or wrap", kind: "bad" },
      { text: "Giant monolithic handlers", detail: "a 300-line handler is a middleware-shaped refactor waiting to happen", kind: "bad" },
      { text: "Logging secrets", detail: "headers and bodies go to logs — redact tokens and passwords before they land on disk", kind: "good" },
    ],
    lines: [
      "Order is the contract: every middleware trusts the one before it, so auth must run before anything touches protected data.",
      "Async errors are the silent killer — one unhandled rejection and the response hangs forever.",
      "Logging is a security surface too: tokens in logs are a breach waiting for a log reader.",
    ],
  }),
  warStory: scenario({
    label: "War story · the admin route that forgot its guard",
    context: "A pentest found a genuinely admin-only endpoint reachable by any logged-in user — and the fix had been 'deployed' weeks earlier.",
    event: "The auth middleware was mounted on the router, but a new route was registered before the middleware in the same file. Express runs middleware in mount order, so the new route skipped the guard entirely.",
    resolution: "The fix moved auth to the router level with a strict allowlist, plus a test that hits every route without a token and expects 401. The lesson: middleware order is not style, it is security — and one route registered in the wrong place undoes a control.",
    lines: [
      "The guard existed and the route simply walked around it — order was the vulnerability.",
      "A route registered before the auth middleware is a route with no auth.",
      "Middleware order is security architecture, and tests are how you keep it honest.",
    ],
    accent: "teal",
  }),
};

const nb22: Deepening = {
  diagram: svgdiag({
    heading: "Sharding: where does this document live?",
    sub: "hash the key, place the data — and keep the cluster stable when it grows",
    template: "hashring",
    accent: "green",
    lines: [
      "MongoDB sharding splits collections across machines by hashing the shard key — each document lands on a shard deterministically, so any query can find it fast.",
      "The shard key choice is the whole game: a high-cardinality key that spreads writes evenly, chosen once — you cannot change it after data exists.",
      "Consistent hashing is what lets you add a shard without reshuffling everything: only a fraction of keys move, and the cluster stays up.",
    ],
  }),
  walkthrough: steps({
    heading: "Walkthrough · pick a shard key that won't haunt you",
    accent: "green",
    steps: [
      { title: "List your access patterns", detail: "which field appears in most queries? that is your leading candidate" },
      { title: "Check cardinality", detail: "a boolean shard key means two shards do all the work — spread is everything" },
      { title: "Check write locality", detail: "does one value (one user, one region) generate most writes? that's a hotspot" },
      { title: "Compound it if needed", detail: "{region: 1, userId: 1} spreads while keeping related data together" },
      { title: "Lock it in", detail: "the shard key is immutable after sharding starts — choose once, choose carefully" },
    ],
    lines: [
      "Shard keys are permanent — the field you choose today is the field your cluster is stuck with.",
      "Hotspots beat scale: one overloaded shard is worse than an unsharded database.",
      "Choose by access patterns and write distribution, not by what looks important in the schema.",
    ],
  }),
  pitfalls: bullets({
    heading: "MongoDB scaling pitfalls",
    accent: "rose",
    items: [
      { text: "Low-cardinality shard keys", detail: "a status field or boolean shard key funnels everything onto one shard", kind: "bad" },
      { text: "Hot keys", detail: "one celebrity user or one busy region creates a shard that melts while others idle", kind: "bad" },
      { text: "No indexes on query fields", detail: "sharding without indexes is a slow cluster at twice the price", kind: "bad" },
      { text: "Ignoring document growth", detail: "unbounded arrays grow documents past the 16MB limit — cap or split them", kind: "good" },
    ],
    lines: [
      "The shard key interview question exists because so many teams learned its failure live.",
      "Even distribution beats clever distribution — measure write spread before you commit.",
      "Indexes matter more on a sharded cluster, not less — every shard pays for a bad query.",
    ],
  }),
  warStory: scenario({
    label: "War story · the boolean shard key",
    context: "A messaging startup sharded by 'active: true/false' to keep active users hot — and watched one shard die weekly while the other idled.",
    event: "All writes landed on the 'active' shard while the other sat empty; when the active shard's disk filled, the entire platform froze. The team had chosen the field that seemed most meaningful instead of the one that spreads.",
    resolution: "A rebuild on a compound key — tenantId + timestamp — spread writes across all shards. The lesson: a shard key is a routing decision, and routing decisions are made by access patterns and distribution, not by what feels important.",
    lines: [
      "Two shards, one doing all the work — a shard key chosen by intuition, not distribution.",
      "Routing is the job of a shard key; it must spread, not categorize.",
      "Measure write distribution before you choose, because after sharding, choice is over.",
    ],
    accent: "green",
  }),
};

const nb31: Deepening = {
  diagram: svgdiag({
    heading: "The stateless ticket",
    sub: "sign it once, verify it anywhere — and keep the ticket short-lived",
    template: "jwt",
    accent: "purple",
    lines: [
      "A JWT is a signed ticket: header, payload, signature — the server verifies the signature, reads the claims, and trusts the ticket without touching a session store.",
      "Statelessness is the superpower and the tax: any replica can verify a token alone, but revocation is hard — which is why access tokens must be short-lived.",
      "The signature is the security: anyone can read the payload (it is just base64), so never put secrets in a JWT — only the holder of the signing key can forge one.",
    ],
  }),
  walkthrough: steps({
    heading: "Walkthrough · secure a JWT flow end to end",
    accent: "purple",
    steps: [
      { title: "Sign with a strong key", detail: "at least 32 random bytes, stored in a secrets manager — never in the repo" },
      { title: "Use HS256/ES256 deliberately", detail: "algorithm confusion attacks happen when the server trusts the header — pin the algorithm" },
      { title: "Keep claims minimal", detail: "sub, exp, iat, maybe role — nothing sensitive in the payload, it is readable" },
      { title: "Short expiry + refresh", detail: "access 5–15 minutes, refresh token with rotation and revocation" },
      { title: "Verify server-side", detail: "check signature, exp, issuer, audience — every request, no exceptions" },
    ],
    lines: [
      "The JWT security checklist is short: pin the algorithm, guard the key, minimize claims, expire fast, verify everything.",
      "The payload is not encrypted — treating base64 as secrecy is how tokens leak in logs and URLs.",
      "Short-lived access tokens plus rotating refresh tokens give you statelessness with a revocation path.",
    ],
  }),
  pitfalls: bullets({
    heading: "JWT pitfalls",
    accent: "rose",
    items: [
      { text: "Algorithm confusion", detail: "a server that accepts 'alg: none' or whatever the header claims hands attackers the forge button", kind: "bad" },
      { text: "Secrets in the payload", detail: "base64 is not encryption — emails, roles and internal IDs leak to anyone who decodes", kind: "bad" },
      { text: "Long-lived tokens with no revocation", detail: "a stolen month-long token is a silent breach — short expiries shrink the window", kind: "bad" },
      { text: "Key rotation without overlap", detail: "rotate signing keys with a grace period so in-flight tokens still verify", kind: "good" },
    ],
    lines: [
      "Algorithm confusion is the classic JWT exploit — the header is attacker input, so pin the algorithm server-side.",
      "The payload is public by design; anything sensitive in it is already leaked.",
      "Expiry is your only revocation when stateless — make it short and back it with refresh rotation.",
    ],
  }),
  warStory: scenario({
    label: "War story · the token that outlived the employee",
    context: "A SaaS company discovered a former employee's account still worked — three months after termination.",
    event: "Their access tokens carried a 90-day expiry, and deprovisioning only disabled the session store. Since JWTs were stateless, the old tokens kept verifying against the signing key, happily resurrecting the account.",
    resolution: "The fix was layered: short-lived access tokens, a revocation check on token version, and deprovisioning that rotates the user's key version immediately. The lesson: with stateless tokens, 'disable the account' means nothing unless the token itself stops verifying.",
    lines: [
      "Three months after termination, the tokens still verified — statelessness had made deprovisioning imaginary.",
      "Short expiries and a revocation version turn a JWT from a liability into a ticket with a leash.",
      "With stateless auth, account disable is only real when the token stops working.",
    ],
    accent: "purple",
  }),
};

const nb51: Deepening = {
  diagram: svgdiag({
    heading: "Run the pyramid, not the iceberg",
    sub: "many fast unit tests, few slow end-to-end tests",
    template: "pyramid",
    accent: "green",
    lines: [
      "The testing pyramid is a shape with a reason: unit tests are cheap, fast and isolated, so you can afford thousands of them.",
      "Integration tests prove the seams — database, API, filesystem — where units that pass alone fail together.",
      "End-to-end tests are few and slow, covering the critical journeys only; an iceberg of slow E2E tests is a suite nobody runs.",
    ],
  }),
  walkthrough: steps({
    heading: "Walkthrough · add a test to a legacy endpoint",
    accent: "green",
    steps: [
      { title: "Unit-test the pure logic", detail: "validation, price math, status transitions — no I/O, fast and deterministic" },
      { title: "Mock the seams", detail: "fake the database and HTTP for unit tests; keep a real test DB for integration" },
      { title: "One integration test per contract", detail: "route → DB → response — prove the wiring, not the logic again" },
      { title: "E2E for the critical journey", detail: "login → checkout, and nothing else — E2E is expensive, spend it wisely" },
      { title: "Watch the runtime", detail: "a suite over ten minutes stops being run — fast feedback is a feature" },
    ],
    lines: [
      "Write the test next to the code it tests, and run them in seconds — the pyramid exists so feedback is fast enough to use.",
      "Mocks at the seam are not cheating; they are what makes unit tests unit tests.",
      "The E2E budget is sacred: every slow test you add is a test someone will skip.",
    ],
  }),
  pitfalls: bullets({
    heading: "Testing pitfalls",
    accent: "rose",
    items: [
      { text: "The testing iceberg", detail: "a hundred slow E2E tests that take an hour are worse than none — nobody runs them", kind: "bad" },
      { text: "Testing implementation details", detail: "tests coupled to internal functions break on refactors without catching real bugs", kind: "bad" },
      { text: "The flaky suite", detail: "tests that fail randomly teach the team to ignore failures — quarantine and fix flakiness", kind: "bad" },
      { text: "Coverage as a goal", detail: "80% coverage of assertions about nothing is theater — cover behavior, not lines", kind: "good" },
    ],
    lines: [
      "A slow, flaky suite is worse than no suite: it trains everyone to trust the red X less.",
      "Test behavior, not implementation — refactoring should never require rewriting tests.",
      "The pyramid's shape is the strategy: cheap tests carry the weight, expensive tests carry the crown.",
    ],
  }),
  warStory: scenario({
    label: "War story · the suite that took 47 minutes",
    context: "A team's 'test suite' had grown to 47 minutes and two thousand flaky E2E tests, and the red X had become a suggestion.",
    event: "Deploys were happening on the strength of 'it passed locally' — until a production incident traced to a regression that the suite should have caught but nobody had run for three weeks.",
    resolution: "The rebuild followed the pyramid: unit tests for logic, integration tests at the seams, and eight critical-journey E2E tests — three minutes total, running on every push. The lesson: a suite you run is worth more than a suite that is comprehensive.",
    lines: [
      "Forty-seven minutes and two thousand tests — and the one regression that mattered sailed through.",
      "A suite nobody runs is a museum, not a safety net.",
      "The pyramid exists for speed, because speed is what makes tests actually run.",
    ],
    accent: "green",
  }),
};

const nb61: Deepening = {
  diagram: svgdiag({
    heading: "One connection, both directions",
    sub: "the HTTP upgrade that opens a live channel",
    template: "ws",
    accent: "sky",
    lines: [
      "WebSockets start as an ordinary HTTP request with an upgrade header — the server answers 101 Switching Protocols, and the same TCP connection becomes a full-duplex channel.",
      "After the handshake, either side can push frames at any time: chat messages, cursor moves, live prices — no polling, no re-requesting.",
      "The tradeoffs are real: connections are stateful, so scaling means sticky sessions or a shared pub/sub layer, and you must handle reconnects and heartbeats yourself.",
    ],
  }),
  walkthrough: steps({
    heading: "Walkthrough · design a live-chat socket",
    accent: "sky",
    steps: [
      { title: "Authenticate the upgrade", detail: "verify the token before 101 — never open a socket to a stranger" },
      { title: "Handle reconnects", detail: "clients lose Wi-Fi — reconnect with the last message id for gap recovery" },
      { title: "Heartbeat", detail: "ping/pong to detect dead connections — half-open sockets leak state" },
      { title: "Scale out", detail: "multiple servers need Redis pub/sub so any server can reach any client" },
      { title: "Rate-limit messages", detail: "a socket with no limits is a free DoS pipe into your backend" },
    ],
    lines: [
      "The WebSocket security list is short and serious: authenticate before 101, validate every frame, and rate-limit the stream.",
      "Reconnects and heartbeats are not optional polish — they are the difference between a demo and a production feature.",
      "Horizontal scaling changes the architecture: with several servers, presence and delivery need a shared backbone.",
    ],
  }),
  pitfalls: bullets({
    heading: "WebSocket pitfalls",
    accent: "rose",
    items: [
      { text: "Unauthenticated upgrades", detail: "opening a socket before verifying the token hands attackers a live pipe", kind: "bad" },
      { text: "Forgetting reconnects", detail: "mobile networks drop connections constantly — without resume, the UX dies", kind: "bad" },
      { text: "Sticky sessions as a crutch", detail: "single-server sockets break the moment you scale out — design for pub/sub from the start", kind: "bad" },
      { text: "No backpressure on the socket", detail: "a slow client and an unbounded buffer is a memory leak with a user interface", kind: "good" },
    ],
    lines: [
      "The most common WebSocket bug is the silent dead socket — half-open connections that nobody notices until the server runs out of file descriptors.",
      "Authenticate the upgrade, then treat every frame as untrusted input.",
      "Backpressure applies to sockets too: slow consumers must not grow buffers forever.",
    ],
  }),
  warStory: scenario({
    label: "War story · the socket leak that ate the server",
    context: "A live-score app crashed every Friday evening — the exact moment traffic peaked. Restarting fixed it until the next Friday.",
    event: "Users on flaky mobile networks dropped connections, but the server never noticed: no heartbeat, no close detection. Dead sockets accumulated by the thousands, each holding memory and a file descriptor, until the process hit its limit mid-match.",
    resolution: "Heartbeats every 30 seconds, automatic close after two missed pongs, and a Redis pub/sub layer for horizontal scale. The lesson: an open socket you can't detect is a leak you can't measure — heartbeat or be haunted.",
    lines: [
      "Every Friday the same crash: thousands of dead sockets the server could not detect.",
      "Heartbeats turned invisible leaks into numbers the team could see and act on.",
      "A connection you cannot probe is a resource leak wearing a user interface.",
    ],
    accent: "sky",
  }),
};

const fc11: Deepening = {
  diagram: svgdiag({
    heading: "Stories, not feature lists",
    sub: "the agile cycle turns vague asks into buildable increments",
    template: "loop",
    labels: ["Discover", "Plan", "Build", "Review"],
    accent: "amber",
    lines: [
      "A user story is a promise in three parts: who the user is, what they want, and why it matters — 'As a customer, I want X, so that Y.'",
      "The agile cycle is a loop, not a conveyor belt: discovery turns questions into stories, planning sizes them, building ships them, and review turns reality into the next round of discovery.",
      "The 'so that' is the part teams skip and regret: it is the reason the story exists, the acceptance test in prose, and the anchor for every scope discussion.",
    ],
  }),
  walkthrough: steps({
    heading: "Walkthrough · write a story that survives a sprint",
    accent: "amber",
    steps: [
      { title: "Name the user", detail: "'the customer' is too vague — a returning shopper and a first-time visitor want different things" },
      { title: "State the want", detail: "one behavior, one outcome — a story with three verbs is three stories" },
      { title: "Write the so-that", detail: "the outcome, not the implementation — it survives the solution changing" },
      { title: "Add acceptance criteria", detail: "the concrete testable list — done means these pass, nothing else" },
      { title: "Size it", detail: "if it needs a sprint by itself, split it — stories should ship in days" },
    ],
    lines: [
      "The story template is a discipline, not a form: the so-that clause is where requirements stop being features and become outcomes.",
      "Acceptance criteria are the contract between product and engineering — write them before the sprint, not during it.",
      "A story that cannot ship in a few days is an epic wearing a story's clothes — split it.",
    ],
  }),
  pitfalls: bullets({
    heading: "Requirements pitfalls",
    accent: "rose",
    items: [
      { text: "Writing solution-shaped stories", detail: "'add a dropdown' presumes the answer — 'let me pick a date' leaves the design open", kind: "bad" },
      { text: "No acceptance criteria", detail: "a story without criteria is a debate scheduled for demo day", kind: "bad" },
      { text: "Epics as stories", detail: "multi-week 'stories' hide the risk until demo day — slice them thin and vertical", kind: "bad" },
      { text: "Skipping the review loop", detail: "a cycle that never feeds back is a waterfall wearing agile clothes", kind: "good" },
    ],
    lines: [
      "Solution-shaped stories steal the team's design freedom — describe the outcome and let the solution compete.",
      "Thin vertical slices ship value every few days and surface risk early; fat horizontal epics hide it.",
      "The review is where the loop earns its name: what you learned becomes the next story.",
    ],
  }),
  warStory: scenario({
    label: "War story · the 'simple' settings page that took a quarter",
    context: "A team estimated 'a settings page' at two days. It shipped three months later, and the product manager still doesn't know which 'simple' got lost.",
    event: "The story said 'add a settings page' with no user, no so-that, and no criteria. Every stakeholder attached their own wishlist to the vague phrase — themes, notifications, billing, language packs — and each felt theirs was 'obviously included'.",
    resolution: "The rebuild split it into ten stories, each with a named user, one behavior, and acceptance criteria. Nine shipped in the next sprint. The lesson: ambiguity is not flexibility — it is everyone's right to be disappointed later.",
    lines: [
      "A two-day story took a quarter because 'settings page' meant ten different things to ten people.",
      "Acceptance criteria would have ended the wishlist war on day one.",
      "Ambiguity is not flexibility — it is deferred conflict with interest.",
    ],
    accent: "amber",
  }),
};

// ── Cloud Foundations (remaining 5) ──────────────────────────

const cfnd11: Deepening = {
  diagram: svgdiag({
    heading: "Who secures what?",
    sub: "the shared responsibility model — your job vs the provider's",
    template: "sharedresp",
    accent: "sky",
    lines: [
      "Shared responsibility is the first cloud lesson: the provider secures the platform — hardware, hypervisor, network fabric — while you secure everything you put on it.",
      "The split moves with the service model: on IaaS you patch the OS yourself, on PaaS the provider patches it for you, and on SaaS you mostly manage data and identities.",
      "The common failure is assumption: teams assume the cloud 'just secures things' — and the data they left in a public bucket proves otherwise.",
    ],
  }),
  walkthrough: steps({
    heading: "Walkthrough · draw your responsibility line",
    accent: "sky",
    steps: [
      { title: "List what you run", detail: "every service: EC2, RDS, S3, Lambda, managed Kubernetes — each has its own split" },
      { title: "Find the provider's line", detail: "read the shared responsibility matrix for each service — patching, OS, networking" },
      { title: "Mark YOUR side", detail: "IAM, data, network config, app code, monitoring — everything above the line is yours" },
      { title: "Audit the gaps", detail: "unpatched OS on an IaaS VM is your incident, not the provider's" },
      { title: "Write it down", detail: "a responsibility map is the team's contract — review it when services change" },
    ],
    lines: [
      "The responsibility line is per-service: knowing where it sits for RDS does not tell you where it sits for a raw EC2 instance.",
      "The painful incidents are almost always on the customer side of the line — misconfigured buckets, open security groups, exposed keys.",
      "A written responsibility map turns 'the cloud is secure' into a precise, auditable list.",
    ],
  }),
  pitfalls: bullets({
    heading: "Shared responsibility pitfalls",
    accent: "rose",
    items: [
      { text: "Assuming the provider secures your data", detail: "encryption at rest is often off by default — enabling and keying it is your job", kind: "bad" },
      { text: "IaaS thinking on PaaS", detail: "patching an RDS instance you don't control is a misunderstanding of who owns the OS", kind: "bad" },
      { text: "Public buckets and open groups", detail: "the classic breach is customer-side config — deny by default and audit everything", kind: "bad" },
      { text: "No responsibility map", detail: "teams that never write it down rediscover it during the incident post-mortem", kind: "good" },
    ],
    lines: [
      "Every cloud breach post-mortem repeats the same line: it was on the customer's side of the responsibility split.",
      "Know your service model per resource — the patch that saves you might be yours to install or theirs.",
      "Write the map, audit the config, and assume nothing the provider didn't explicitly guarantee.",
    ],
  }),
  warStory: scenario({
    label: "War story · the 'AWS breach' that was a bucket flag",
    context: "A startup got a breach notification: a database backup had been downloaded from an S3 bucket. The founders blamed AWS.",
    event: "The investigation showed the bucket was customer-side: created with public-read by a script two years earlier, never listed in any review. AWS had done everything right; the flag had never been lowered.",
    resolution: "The fix: public-by-default is banned in their accounts via SCP, every bucket gets an access analyzer report, and backups are now encrypted with customer-managed keys. The lesson: the cloud is a locked building, but you chose to leave the safe open.",
    lines: [
      "The provider was blameless — the customer-side bucket flag was the whole breach.",
      "Encryption, access reviews and deny-by-default are customer-side controls; the provider will not do them for you.",
      "The cloud is a locked building — but the safe's combination is your job.",
    ],
    accent: "sky",
  }),
};

const cfnd21: Deepening = {
  diagram: svgdiag({
    heading: "Your fleet behind a load balancer",
    sub: "VMs are cattle with names — the balancer makes failure invisible",
    template: "loadbal",
    accent: "teal",
    lines: [
      "An EC2 instance is a rented computer in the cloud: pick the size, pick the AMI, and you have a VM you can SSH into and treat like a server.",
      "In production you never run one — a load balancer spreads traffic across a fleet, health-checks each instance, and drains the failing ones without users noticing.",
      "The mindset shift is the real lesson: instances are cattle, not pets — build them from images, replace them when they break, and never hand-ssh into production.",
    ],
  }),
  walkthrough: steps({
    heading: "Walkthrough · launch a fault-tolerant web tier",
    accent: "teal",
    steps: [
      { title: "Golden AMI", detail: "bake the app into an image — instances are born ready, not configured by hand" },
      { title: "Launch template", detail: "instance type, security group, key — one template, consistent fleet" },
      { title: "Auto scaling group", detail: "min 2, max 6, health checks — the fleet heals itself" },
      { title: "Load balancer in front", detail: "DNS points at the balancer, never at an instance IP" },
      { title: "Test the kill", detail: "terminate an instance on purpose — the balancer and ASG should fix it in minutes" },
    ],
    lines: [
      "The test of a good setup is intentional destruction: kill an instance and watch the system shrug.",
      "Never point DNS at an instance — the load balancer is the contract between users and the fleet.",
      "Cattle not pets: if you are SSH-ing into production to fix things, your architecture is doing the fixing wrong.",
    ],
  }),
  pitfalls: bullets({
    heading: "EC2 pitfalls",
    accent: "rose",
    items: [
      { text: "One big instance, no scaling", detail: "a single 'powerful enough' VM is a single point of failure with a nicer spec sheet", kind: "bad" },
      { text: "Hand-configured pets", detail: "instances tuned by SSH sessions are irreplaceable — and will fail at 2 AM", kind: "bad" },
      { text: "Open security groups", detail: "0.0.0.0/0 on port 22 is how bots find your fleet — restrict to your IP or a bastion", kind: "bad" },
      { text: "No cost visibility", detail: "big instances left running idle are a quiet invoice — tag, monitor, schedule", kind: "good" },
    ],
    lines: [
      "The single-instance trap feels economical until that one instance fails at 2 AM.",
      "Security groups are a firewall per instance — treat 0.0.0.0/0 like a locked door left open.",
      "Fleet thinking starts at launch: templates, images, and health checks from day one.",
    ],
  }),
  warStory: scenario({
    label: "War story · the pet that had to be resurrected",
    context: "A startup's production was one hand-configured EC2 instance with 'special tweaks' nobody had documented.",
    event: "The instance died from a failed RAID rebuild at 3 AM. Restoring meant rebuilding weeks of undocumented tweaks from memory and Stack Overflow history — a full day of outage while users watched the site down.",
    resolution: "The rebuild became a golden AMI, an auto scaling group, and a load balancer — and 'special tweaks' became documented image bake steps. The lesson: an undocumented server is a hostage situation, and the ransom is your time.",
    lines: [
      "One hand-configured server, zero documentation — a full day of outage to reconstruct it.",
      "The golden AMI made the fleet disposable and therefore reliable.",
      "If your server has 'special tweaks', it is a pet — and pets die expensively.",
    ],
    accent: "teal",
  }),
};

const cfnd31: Deepening = {
  diagram: svgdiag({
    heading: "Pick the right storage tool",
    sub: "object, block, file, archive — each optimizes a different tradeoff",
    template: "storage",
    accent: "amber",
    lines: [
      "Cloud storage is four tools, not one: object storage like S3 holds unlimited files as key-value blobs, block storage like EBS is a disk attached to a VM, and file storage like EFS is a shared network drive.",
      "Durability is the headline number — eleven nines means an object is essentially never lost — but availability is a different promise: never losing data is not the same as always serving it.",
      "Cost follows access: archive tiers are cheap because retrieval is slow, which is why lifecycle rules exist — move cold data before the invoice teaches you the lesson.",
    ],
  }),
  walkthrough: steps({
    heading: "Walkthrough · design a backup strategy on S3",
    accent: "amber",
    steps: [
      { title: "Versioning on", detail: "every overwrite keeps the previous version — ransomware can't rewrite history" },
      { title: "Encryption at rest", detail: "SSE with KMS keys — a leaked bucket should still be unreadable" },
      { title: "Lifecycle rules", detail: "hot → infrequent → glacier → expire — cost follows age automatically" },
      { title: "Cross-region copy", detail: "a region outage must not take your backups with it" },
      { title: "Test the restore", detail: "an untested restore is a rumor, not a backup — drill it quarterly" },
    ],
    lines: [
      "Versioning plus encryption plus cross-region copies is the backup trifecta — and none of it matters until you have restored from it.",
      "Lifecycle rules are free money: storage tiers exist so cold data stops costing hot prices.",
      "The restore drill is the only test that counts — run it on a schedule, not after the fire.",
    ],
  }),
  pitfalls: bullets({
    heading: "Storage pitfalls",
    accent: "rose",
    items: [
      { text: "Public buckets", detail: "the number one cloud breach — block public access at the account level", kind: "bad" },
      { text: "Confusing durability with availability", detail: "eleven nines of durability does not mean the bucket is always up — design for both", kind: "bad" },
      { text: "No lifecycle rules", detail: "hot-tier prices on archive data is a monthly invoice you can automate away", kind: "bad" },
      { text: "Untested restores", detail: "backups that have never been restored are a promise you can't keep", kind: "good" },
    ],
    lines: [
      "Block public access account-wide first, then allow specific buckets deliberately.",
      "Durability and availability are different promises — know which one your design delivers.",
      "The storage question that matters is not 'is it backed up?' but 'can we restore, and how fast?'"
    ],
  }),
  warStory: scenario({
    label: "War story · the restore that took a week",
    context: "A company's database server died, and the team reached for their S3 backups — only to discover the last verified restore had never happened.",
    event: "The backups existed and versioning was on, but the restore procedure had never been run end to end. Week one was spent debugging cross-account permissions, KMS key grants, and a missing final snapshot step.",
    resolution: "The restore finally worked, and the quarterly restore drill became a standing ritual with a published runbook. The lesson: a backup is a hypothesis until a restore proves it — and the proof is a drill, not a hope.",
    lines: [
      "The backups were perfect; the restore was a week of archaeology.",
      "Permission chains and key grants only get tested when you actually restore.",
      "A backup is a hypothesis — the restore drill is the experiment that proves it.",
    ],
    accent: "amber",
  }),
};

const cfnd32: Deepening = {
  diagram: svgdiag({
    heading: "One writer, many readers",
    sub: "managed databases scale reads, not writes",
    template: "replication",
    accent: "green",
    lines: [
      "A managed database like RDS removes the operational chores — patching, backups, failover — but the architecture lessons stay yours.",
      "Replication is the scaling lever: a primary takes all writes and streams them to replicas that serve reads — so read-heavy apps scale out, while writes stay single-writer.",
      "Replica lag is the hidden cost: a read-your-own-writes flow that hits a lagging replica returns stale data, which is why consistency requirements must route to the primary.",
    ],
  }),
  walkthrough: steps({
    heading: "Walkthrough · scale reads safely",
    accent: "green",
    steps: [
      { title: "Measure the load", detail: "read:write ratio — 10:1 read-heavy apps are the replication use case" },
      { title: "Add a read replica", detail: "point read-only queries at the replica — never write to it" },
      { title: "Watch the lag", detail: "replica lag is a metric with an SLA — alerts when it crosses seconds" },
      { title: "Route consistency-sensitive reads", detail: "the user's own profile after an update must come from the primary" },
      { title: "Plan failover", detail: "promotion is a decision, not an accident — test it in a drill" },
    ],
    lines: [
      "Read replicas multiply read capacity, not write capacity — knowing which one you are scaling keeps the architecture honest.",
      "Replica lag turns 'eventually consistent' from a phrase into a user-visible bug — measure it.",
      "Failover is a leadership decision with a runbook; rehearse it before the primary fails.",
    ],
  }),
  pitfalls: bullets({
    heading: "Managed DB pitfalls",
    accent: "rose",
    items: [
      { text: "Writing to a replica", detail: "read replicas are read-only for a reason — a stray write fails or corrupts the stream", kind: "bad" },
      { text: "Ignoring replica lag", detail: "a lagging replica serving user data is a consistency incident in progress", kind: "bad" },
      { text: "Scaling with a bigger instance first", detail: "vertical scale is a ceiling, not a strategy — replicas and caching scale further", kind: "bad" },
      { text: "Multi-AZ for reads", detail: "multi-AZ is high availability, not read scaling — the standby is not a read replica", kind: "good" },
    ],
    lines: [
      "Multi-AZ keeps you alive; read replicas keep you fast — they are different purchases for different problems.",
      "The read-your-write rule is simple: if the user just changed it, read it from the primary.",
      "Every replica is a lag measurement waiting to happen — monitor it like production, because it is.",
    ],
  }),
  warStory: scenario({
    label: "War story · the order that disappeared after refresh",
    context: "An e-commerce site moved read traffic to replicas for speed — and users started reporting orders vanishing after refresh.",
    event: "The confirmation flow read from a replica that lagged the primary by seconds during peak. A user's order would show 'placed', then a refresh would query a replica that hadn't caught up — and the order was 'gone'. Data was never lost; trust was.",
    resolution: "The confirmation and profile reads moved to the primary, replicas took catalog reads, and replica lag got an alarm. The lesson: replication buys scale only where eventual consistency is acceptable — know which reads those are.",
    lines: [
      "The order was never lost — it just wasn't on the replica yet, and the user refreshed.",
      "Consistency-sensitive reads belong on the primary; catalog reads love replicas.",
      "Replica lag is not a theory — it is a user clicking refresh at the wrong millisecond.",
    ],
    accent: "green",
  }),
};

const cfnd41: Deepening = {
  diagram: svgdiag({
    heading: "IAM: who may touch what",
    sub: "identities, policies, and the deny-by-default ceiling",
    template: "iam",
    accent: "sky",
    lines: [
      "IAM is the cloud's access-control engine: users and roles are identities, policies are the JSON rules that say which actions they may take on which resources.",
      "The default is deny: an identity can do nothing until a policy explicitly allows it — and an explicit deny always beats any allow.",
      "Audit trails close the loop: every API call is logged, which is why 'who did what, when, from where' is always answerable if you collect the trail.",
    ],
  }),
  walkthrough: steps({
    heading: "Walkthrough · grant the least privilege that works",
    accent: "sky",
    steps: [
      { title: "Start from deny", detail: "no policy, no access — then add only what the task needs" },
      { title: "Prefer roles to users", detail: "applications assume roles with scoped permissions; people get temporary credentials" },
      { title: "Scope the resource", detail: "arn:aws:s3:::my-bucket/* beats 's3:* on everything'" },
      { title: "Use permission boundaries", detail: "a boundary is the ceiling no policy can exceed — useful for delegated admins" },
      { title: "Audit regularly", detail: "CloudTrail and access reviews — unused roles and stale keys are liabilities" },
    ],
    lines: [
      "Least privilege is a design habit: start with nothing and earn each permission with a reason.",
      "Roles with scoped policies beat long-lived access keys — short-lived credentials shrink the blast radius.",
      "An identity with no audit trail is an assumption — collect and review the trail.",
    ],
  }),
  pitfalls: bullets({
    heading: "IAM pitfalls",
    accent: "rose",
    items: [
      { text: "The admin-everything key", detail: "one all-powerful access key committed to a repo is the classic account takeover", kind: "bad" },
      { text: "Wildcard happy policies", detail: "s3:* on * is a policy that says 'the whole account', every time", kind: "bad" },
      { text: "Skipping access reviews", detail: "permissions accumulate with tenure — quarterly reviews are how they shrink", kind: "bad" },
      { text: "Shared root credentials", detail: "root is the break-glass account — MFA it, lock it, never log in daily", kind: "good" },
    ],
    lines: [
      "The IAM failure stories all start with a wildcard and end with an invoice from the attacker.",
      "Access reviews are the maintenance IAM needs: permissions grow like weeds, pruning is the job.",
      "Root is for emergencies only — if your team logs in as root on a Tuesday, the design is broken.",
    ],
  }),
  warStory: scenario({
    label: "War story · the leaked key that mined crypto",
    context: "A developer pushed a config file with an AWS access key to a public repo at 4 PM. At 4:47 PM, the account was running 200 crypto-mining instances.",
    event: "The key had AdministratorAccess — created for 'setup convenience' and never scoped. The miner found it within the hour, spun up GPU instances across three regions, and the invoice was six figures before the team noticed the billing alarm.",
    resolution: "The key was revoked, the account hardened with deny-by-default and scoped roles, and secret scanning was added to CI. The lesson: an access key is a loaded weapon — scope it, expire it, and never let it near a repo.",
    lines: [
      "Forty-seven minutes from public repo to two hundred mining instances.",
      "An all-powerful key is a loaded weapon, and the repo was the trigger.",
      "Scoped roles, short-lived credentials and secret scanning — the IAM trinity.",
    ],
    accent: "sky",
  }),
};

// ── Terraform (remaining 4) ──────────────────────────────────

const tf11: Deepening = {
  diagram: svgdiag({
    heading: "Infrastructure as a diff",
    sub: "write, plan, apply — the state file is the source of truth",
    template: "cicd",
    labels: ["Write", "Validate", "Plan", "Apply", "State", "Drift"],
    accent: "violet",
    lines: [
      "Infrastructure as code means your servers are described in version-controlled files, not configured by hand — reviewable, repeatable, and auditable.",
      "Terraform's cycle is the heart of it: write the desired state, validate it, let plan show exactly what will change, then apply — with the state file recording what actually exists.",
      "Drift is the enemy: when someone changes infrastructure outside the code, reality and the state file disagree — and the next apply 'fixes' their change without warning.",
    ],
  }),
  walkthrough: steps({
    heading: "Walkthrough · your first safe apply",
    accent: "violet",
    steps: [
      { title: "terraform init", detail: "downloads providers — the toolchain, not the infrastructure" },
      { title: "terraform fmt + validate", detail: "format and syntax checks — catch typos before they become plans" },
      { title: "terraform plan", detail: "read the diff: what will be created, changed, destroyed? plan is free; surprises are not" },
      { title: "Review with a human", detail: "the plan is a pull request for your infrastructure — destroy lines deserve questions" },
      { title: "terraform apply", detail: "apply only what you reviewed, and treat the state file like production data" },
    ],
    lines: [
      "The plan command is the superpower: Terraform tells you exactly what it will do before it does it — read every line.",
      "A destroy line in a plan is a conversation, not an error — question it before you apply.",
      "State is the source of truth, so protect it: it is the map of your whole environment.",
    ],
  }),
  pitfalls: bullets({
    heading: "IaC pitfalls",
    accent: "rose",
    items: [
      { text: "Hand-editing the state file", detail: "the state is Terraform's memory — edit the code and re-import, never the JSON", kind: "bad" },
      { text: "Console-driven drift", detail: "a resource created in the console is invisible to Terraform until you import it — and then it's a diff", kind: "bad" },
      { text: "Skipping plan review", detail: "applying without reading the plan is how 'just a tag change' deletes a database", kind: "bad" },
      { text: "Secrets in the code", detail: "passwords in tf files end up in git history forever — use variables and a secrets backend", kind: "good" },
    ],
    lines: [
      "The plan is a contract: whoever applies without reading it accepts the consequences by signature.",
      "Console changes are drift — the code is the source of truth, and reality must be reconciled to it.",
      "Secrets in Terraform code are permanent residents of git history — route them through variables and vaults.",
    ],
  }),
  warStory: scenario({
    label: "War story · the 'tag update' that deleted the database",
    context: "A team 'just wanted to add a tag' to a database resource, applied the plan, and the database was gone.",
    event: "The database had been created in the console months earlier and never imported into Terraform. The code defined a resource with the same name but no matching state entry, so the plan read 'create' — and the console version was an untracked stranger slated for deletion on a later cleanup.",
    resolution: "The database was restored from a snapshot, imported into state, and the team adopted the rule: plan diffs get read aloud in review, and console work is banned for anything Terraform manages. The lesson: an unmanaged resource is a surprise waiting for the wrong plan.",
    lines: [
      "A tag change deleted a database because the database was never actually in the code.",
      "Import real resources into state before letting plans near them.",
      "Read the plan aloud — destroy lines are where the story turns.",
    ],
    accent: "violet",
  }),
};

const tf21: Deepening = {
  diagram: svgdiag({
    heading: "Variable precedence ladder",
    sub: "lowest wins first, highest wins last — know which value you're actually using",
    template: "tiers",
    labels: ["Defaults", "terraform.tfvars", "auto.tfvars", "Environment", "CLI -var"],
    accent: "green",
    lines: [
      "Variables keep infrastructure code reusable: one module, a hundred environments, each injecting different values.",
      "Precedence is the gotcha: defaults are the lowest rung, tfvars files climb above them, environment variables higher, and the CLI flag wins everything.",
      "The debugging instinct to build: when the wrong value appears in a plan, ask which rung of the ladder it came from.",
    ],
  }),
  walkthrough: steps({
    heading: "Walkthrough · parameterize a module properly",
    accent: "green",
    steps: [
      { title: "Declare variables", detail: "type + description + default — a variable without a type is a guess" },
      { title: "Validate inputs", detail: "validation blocks catch nonsense at plan time, not after apply" },
      { title: "Set sensible defaults", detail: "production-safe defaults; override per environment" },
      { title: "Keep secrets out", detail: "sensitive variables read from env or vault — never from a committed tfvars" },
      { title: "Reference everywhere", detail: "var.name in expressions — no hardcoded values hidden in the module" },
    ],
    lines: [
      "A typed variable with a description is documentation the plan actually enforces.",
      "Precedence bites in exactly one direction: you think you set it in tfvars, but the env var or CLI flag overrode it.",
      "When a plan shows a surprise value, climb the ladder: defaults, tfvars, env, CLI — one of them is guilty.",
    ],
  }),
  pitfalls: bullets({
    heading: "Variable pitfalls",
    accent: "rose",
    items: [
      { text: "Secrets in tfvars files", detail: "tfvars get committed, and committed secrets live in git forever — use env or a vault", kind: "bad" },
      { text: "No type or validation", detail: "a string where a number belongs fails in production, not in review", kind: "bad" },
      { text: "Hardcoding inside modules", detail: "a hardcoded value in a module is a fork that can never be configured by its callers", kind: "bad" },
      { text: "Untested overrides", detail: "run a plan per environment in CI — the precedence ladder only proves itself under load", kind: "good" },
    ],
    lines: [
      "Precedence is a ladder with a memory: the CLI flag from that one command still wins a month later.",
      "Validation blocks are the cheap insurance — bad input should die in plan, not in apply.",
      "Every hardcoded value in a module is a configuration your callers cannot make.",
    ],
  }),
  warStory: scenario({
    label: "War story · the staging environment that ran production config",
    context: "A team's staging environment mysteriously used production-sized instances and a production database name for a week.",
    event: "A CI job set a TERRAFORM_VAR via environment for production, and a shared runner leaked it into staging's apply. Nobody suspected precedence: staging had its own tfvars, but environment variables outrank tfvars — so the production values silently won.",
    resolution: "The fix separated runner environments completely and added a plan-time assertion that staging's variables match staging's expectations. The lesson: the precedence ladder decides which value wins, and it does not care about your folder names.",
    lines: [
      "Staging ran production's values because the precedence ladder outranks folder names.",
      "Environment variables beat tfvars every time — even by accident.",
      "Assert your environments in the plan: the ladder has no respect for intent.",
    ],
    accent: "green",
  }),
};

const tf31: Deepening = {
  diagram: svgdiag({
    heading: "Modules are functions for infrastructure",
    sub: "inputs, resources, outputs — one definition, many callers",
    template: "tiers",
    labels: ["Root config", "Calls module", "Inputs", "Resources", "Outputs"],
    accent: "violet",
    lines: [
      "A Terraform module is a packaged, versioned slice of infrastructure with a defined interface: inputs in, resources inside, outputs out.",
      "The contract is the interface — documented variables and outputs mean a module can be reused across teams and environments without reading its internals.",
      "Versioning is what makes modules trustworthy: pin a module version in the registry, and your infrastructure is reproducible from that exact tag.",
    ],
  }),
  walkthrough: steps({
    heading: "Walkthrough · extract a module the right way",
    accent: "violet",
    steps: [
      { title: "Find the repetition", detail: "the same 50 lines in three environments is a module waiting to be born" },
      { title: "Define the interface", detail: "variables with types and descriptions — the module's public API" },
      { title: "Move resources in", detail: "resources become the module body; anything callers vary becomes a variable" },
      { title: "Expose outputs", detail: "what callers need — IDs, DNS names, ARNs — nothing more" },
      { title: "Version it", detail: "tag it, publish or pin it — then callers upgrade deliberately" },
    ],
    lines: [
      "The module interface is a contract: clear inputs, minimal outputs, and internal resources callers never touch.",
      "Versioned modules turn infrastructure into a dependency graph you can upgrade consciously.",
      "Extraction is a refactor — the behavior must not change, only the organization.",
    ],
  }),
  pitfalls: bullets({
    heading: "Module pitfalls",
    accent: "rose",
    items: [
      { text: "Fat modules", detail: "a module that does everything is a monolith with a version number — split by concern", kind: "bad" },
      { text: "Leaky internals", detail: "callers referencing internal resource attributes via outputs they invented = coupling", kind: "bad" },
      { text: "Unpinned versions", detail: "a floating module version means next apply may change your infrastructure silently", kind: "bad" },
      { text: "No documentation", detail: "a module without variable docs is a black box everyone is afraid to call", kind: "good" },
    ],
    lines: [
      "A module's quality is its interface: documented inputs, minimal outputs, pinned versions.",
      "Fat modules fail the same way fat functions do — impossible to test, terrifying to change.",
      "Pin the version, read the plan, and treat upgrades like code reviews.",
    ],
  }),
  warStory: scenario({
    label: "War story · the floating version that redeployed at 3 AM",
    context: "A platform team's nightly CI apply suddenly recreated production instances for no apparent reason.",
    event: "A module source pointed at a floating branch instead of a version tag. Someone merged a 'small refactor' to that branch mid-day, and the next CI apply rebuilt the instances to match the new definition — a full production churn nobody had planned.",
    resolution: "Module sources were pinned to release tags, CI began failing on unpinned references, and applies moved to reviewed PRs. The lesson: a floating module version is a time bomb armed by whoever merges next.",
    lines: [
      "Production recreated itself at 3 AM because a module pointed at a branch, not a tag.",
      "Floating versions make infrastructure change without anyone deciding.",
      "Pin your modules like you pin your dependencies — deliberately and visibly.",
    ],
    accent: "violet",
  }),
};

const tf41: Deepening = {
  diagram: svgdiag({
    heading: "State is a team sport",
    sub: "remote state + locking = collaboration without corruption",
    template: "grid",
    labels: ["tfstate file", "S3 bucket", "DynamoDB lock", "Team access", "Encryption at rest"],
    accent: "green",
    lines: [
      "The state file is Terraform's memory of what exists — so with a team, it must live somewhere shared, not on one engineer's laptop.",
      "Remote state in an S3 bucket gives everyone the same source of truth, and DynamoDB locking prevents two applies from corrupting it simultaneously.",
      "Encrypt the state: it contains resource IDs, attributes, and often references to sensitive values — treat it like production data, because it is a map of your production.",
    ],
  }),
  walkthrough: steps({
    heading: "Walkthrough · set up remote state without breaking anything",
    accent: "green",
    steps: [
      { title: "Create the backend first", detail: "the S3 bucket and DynamoDB table — with versioning on, always" },
      { title: "Move state to remote", detail: "terraform init with the backend block migrates the local state safely" },
      { title: "Enable locking", detail: "DynamoDB lock table — two engineers applying at once becomes an error, not corruption" },
      { title: "Restrict access", detail: "IAM: only the team and CI can read/write the bucket" },
      { title: "Encrypt + version", detail: "KMS encryption and bucket versioning — undo for state, audit trail for history" },
    ],
    lines: [
      "Remote state is the difference between a solo project and a team platform — shared truth beats laptops.",
      "Locking turns 'who applied last?' into 'the lock says it's mine' — the DB table is the bouncer.",
      "Versioned, encrypted state is your infrastructure's audit log — keep it like one.",
    ],
  }),
  pitfalls: bullets({
    heading: "State pitfalls",
    accent: "rose",
    items: [
      { text: "Local state on a shared project", detail: "two laptops, two truths — and whichever applies last wins by accident", kind: "bad" },
      { text: "No locking", detail: "parallel applies corrupt state and produce resources nobody planned", kind: "bad" },
      { text: "Secrets in state", detail: "resource attributes land in the state file — encrypt it and restrict access", kind: "bad" },
      { text: "Manual state surgery", detail: "editing state JSON by hand is the last resort — import and refactor instead", kind: "good" },
    ],
    lines: [
      "A team without remote state is a team whose infrastructure is a lie told in two accents.",
      "Locking is not bureaucracy — it is what makes concurrent applies safe instead of corrupting.",
      "State is a production artifact: encrypt it, version it, and give it an access policy.",
    ],
  }),
  warStory: scenario({
    label: "War story · the two engineers who applied at once",
    context: "A team of four shared one local state file by 'being careful' — until two engineers ran apply simultaneously during an incident.",
    event: "Both applies read the same state, both wrote overlapping resources, and the merged state described infrastructure that half-existed. Terraform spent a week in recovery, recreating and deleting resources nobody had intended.",
    resolution: "Remote state with DynamoDB locking became the standing rule, and CI got a lock-wait timeout so parallel jobs queue instead of collide. The lesson: 'we're careful' is not a concurrency mechanism — the lock table is.",
    lines: [
      "Two careful engineers, one shared state file, one week of reconstruction.",
      "Locking is the concurrency mechanism 'being careful' was never going to be.",
      "Remote state plus locks turns parallel applies from corruption into a queue.",
    ],
    accent: "green",
  }),
};

// ── Containers (remaining 4) ─────────────────────────────────

const ct11: Deepening = {
  diagram: svgdiag({
    heading: "From Dockerfile to runtime",
    sub: "the shipping lane that made 'works on my machine' extinct",
    template: "container",
    accent: "cyan",
    lines: [
      "A container packages your application with its runtime — libraries, config, dependencies — into a portable image that behaves identically on any host.",
      "The lane: a Dockerfile defines the image, the image is pushed to a registry as versioned layers, and any host can pull and run it in isolation.",
      "Isolation without the overhead of a full VM is the trick — containers share the host kernel but keep processes, files, and networks separate.",
    ],
  }),
  walkthrough: steps({
    heading: "Walkthrough · containerize an existing app safely",
    accent: "cyan",
    steps: [
      { title: "Start with a base image", detail: "official, pinned digest — never :latest for production" },
      { title: "Copy code, install deps", detail: "layer order matters: dependencies first, code last — cache hits are build speed" },
      { title: "Run as non-root", detail: "USER appuser — a container running as root is a privilege escalator" },
      { title: "Expose one port", detail: "one process per container, one port — the unit of scaling" },
      { title: "Scan the image", detail: "image scanning in CI — vulnerabilities ship with the image if you don't check" },
    ],
    lines: [
      "The Dockerfile is the app's build recipe — layer order, base pinning, and non-root are the three habits that matter.",
      "Images are immutable artifacts: build once, scan once, and ship the exact same thing everywhere.",
      "The registry is the supply chain — pin digests and scan images like you scan dependencies.",
    ],
  }),
  pitfalls: bullets({
    heading: "Container pitfalls",
    accent: "rose",
    items: [
      { text: "Running as root", detail: "a container as root has the host kernel's permissions — USER appuser is non-negotiable", kind: "bad" },
      { text: ":latest everywhere", detail: "floating tags change what your production runs without a deploy decision", kind: "bad" },
      { text: "Fat images", detail: "a 2 GB image with build tools is an attack surface and a slow pull — multi-stage builds slim it", kind: "bad" },
      { text: "State inside the container", detail: "containers are ephemeral — volumes are for data, images are for code", kind: "good" },
    ],
    lines: [
      "The container security rules are short: non-root, pinned digests, scanned images, no secrets baked in.",
      "A fat image ships every build tool to production and gives attackers a toolbox.",
      "If a container holds state, a restart loses it — that is a design bug wearing a container.",
    ],
  }),
  warStory: scenario({
    label: "War story · the root container that escaped",
    context: "A startup's container ran as root 'because the setup script needed it' — and a compromised dependency in the image found a kernel escape.",
    event: "The container broke out and the attacker read the host's memory, grabbing secrets from other containers sharing the kernel. One vulnerable dependency, one privileged container, one host-wide compromise.",
    resolution: "Every image now runs as a non-root user, capabilities are dropped, and the runtime enforces seccomp profiles. The lesson: a container is not a wall — it is a room with a door, and root holds the master key.",
    lines: [
      "One root container and one bad dependency became a host-wide compromise.",
      "Containers share the kernel — 'isolated' does not mean 'immune'.",
      "Non-root, minimal capabilities, pinned and scanned images — the container security floor.",
    ],
    accent: "cyan",
  }),
};

const ct21: Deepening = {
  diagram: svgdiag({
    heading: "Compose: the app as a recipe",
    sub: "services, networks, volumes — one file, one command",
    template: "grid",
    labels: ["compose.yml", "web service", "db service", "shared network", "volumes", "depends_on"],
    accent: "teal",
    lines: [
      "Docker Compose turns a multi-container app into one declarative file: services, their images, networks, volumes, and startup dependencies.",
      "docker compose up brings up the whole topology — the local equivalent of your production architecture, reproducible from one recipe.",
      "Compose is for environments, not just dev: with the same file describing services, teams keep local, CI, and staging aligned.",
    ],
  }),
  walkthrough: steps({
    heading: "Walkthrough · write a compose file that behaves",
    accent: "teal",
    steps: [
      { title: "Define services", detail: "web + db + cache — each with image, ports, env, and a name" },
      { title: "Isolate networks", detail: "services on their own network, only web exposed to the host" },
      { title: "Volume the data", detail: "named volumes for DB and uploads — containers die, data survives" },
      { title: "Wire depends_on", detail: "startup order with health checks — depends_on alone does not wait for readiness" },
      { title: "Use profiles", detail: "dev-only services (mailpit, admin panels) behind profiles, out of prod" },
    ],
    lines: [
      "Compose is the app's recipe: services, networks, volumes — and the file is the documentation.",
      "Health checks are what make depends_on honest — ordering is not readiness.",
      "Volumes are the difference between a disposable container and an incident.",
    ],
  }),
  pitfalls: bullets({
    heading: "Compose pitfalls",
    accent: "rose",
    items: [
      { text: "Secrets in environment", detail: "env vars in compose files get committed — use .env, ignored and injected", kind: "bad" },
      { text: "Port collisions", detail: "two services exposing 5432 locally breaks a dev laptop in confusing ways", kind: "bad" },
      { text: "depends_on without health checks", detail: "the DB container starts before the DB is ready — race conditions follow", kind: "bad" },
      { text: "Anonymous volumes", detail: "unnamed volumes pile up on disk — name them so they are manageable and removable", kind: "good" },
    ],
    lines: [
      "The compose file is a deployment artifact — treat its secrets and ports like production config.",
      "Readiness beats ordering: health checks turn startup races into startup guarantees.",
      "Named volumes are the difference between 'docker compose down' cleaning up and leaving data ghosts.",
    ],
  }),
  warStory: scenario({
    label: "War story · the dev database that vanished on restart",
    context: "A developer's local environment lost its database every time they ran docker compose down — weeks of test data gone, twice a day.",
    event: "The volume was anonymous: declared implicitly by the container, not named in the file. Every down/up cycle orphaned the old volume and created a fresh empty one — 'the data was there yesterday' was literally true and useless.",
    resolution: "Naming the volume in compose made it persistent across restarts, and the team adopted named volumes as the default. The lesson: data that isn't declared doesn't exist — a volume without a name is a promise with no address.",
    lines: [
      "Weeks of data vanished on every restart because the volume had no name and no address.",
      "Declared volumes persist; anonymous ones are orphaned on every down.",
      "If data matters, name the volume — the file is the only memory compose respects.",
    ],
    accent: "teal",
  }),
};

const ct31: Deepening = {
  diagram: svgdiag({
    heading: "Kubernetes: the self-healing cluster",
    sub: "declare the desired state — the control plane converges reality to it",
    template: "k8s",
    accent: "sky",
    lines: [
      "Kubernetes separates intent from execution: you declare the desired state — how many replicas, which image, what ports — and the control plane converges reality toward it.",
      "The control plane is the brain: the API server accepts your declarations, the scheduler places pods on worker nodes, and controllers keep watching until what exists matches what you asked for.",
      "Self-healing is the payoff: a pod dies, the controller makes a new one. You never SSH in to 'fix' a cluster — you declare and let it converge.",
    ],
  }),
  walkthrough: steps({
    heading: "Walkthrough · deploy and watch it heal",
    accent: "sky",
    steps: [
      { title: "kubectl apply -f deploy.yaml", detail: "the declaration — image, replicas, ports, health checks" },
      { title: "kubectl get pods", detail: "watch scheduling and readiness — status is the truth" },
      { title: "kubectl delete pod —force", detail: "kill one on purpose; the deployment makes a replacement in seconds" },
      { title: "kubectl rollout status", detail: "a rolling update with zero downtime — old pods drain, new pods take over" },
      { title: "Check the events", detail: "kubectl describe — the events trail explains every decision the scheduler made" },
    ],
    lines: [
      "The declarative loop is the entire philosophy: apply, observe, converge — never hand-edit running state.",
      "The self-heal test is the ritual: delete a pod on purpose and watch the cluster shrug.",
      "Rollouts are the upgrade path — declarative updates mean no manual drain-and-swap dance.",
    ],
  }),
  pitfalls: bullets({
    heading: "Kubernetes pitfalls",
    accent: "rose",
    items: [
      { text: "No resource limits", detail: "one noisy pod can starve its node — requests and limits are mandatory, not optional", kind: "bad" },
      { text: "No health checks", detail: "a pod that 'runs' but doesn't answer traffic is a black hole — probes make readiness real", kind: "bad" },
      { text: "Hand-editing live state", detail: "kubectl edit fixes today and drifts from the manifest — code is the only source of truth", kind: "bad" },
      { text: "Stateful apps in plain pods", detail: "databases need stable identity and volumes — StatefulSets exist for exactly this reason", kind: "good" },
    ],
    lines: [
      "The cluster converges to your manifest — so if the manifest is wrong, it converges to wrong.",
      "Probes are the difference between 'running' and 'serving' — Kubernetes only trusts what it can measure.",
      "Limits are the cost-control and the blast-radius control; a cluster without them is a gamble.",
    ],
  }),
  warStory: scenario({
    label: "War story · the cluster that looked healthy and wasn't",
    context: "A team's Kubernetes dashboard showed all green while customers reported timeouts — for a full afternoon.",
    event: "The deployment had no readiness probes. Pods started, reported Running, and the service routed traffic to them while the app inside was still warming up — rejecting requests for minutes after every rollout. The dashboard said healthy; the users disagreed.",
    resolution: "Readiness and liveness probes with proper thresholds made 'running' mean 'serving'. The lesson: Kubernetes believes what you measure — if you don't define healthy, it defines it for you, badly.",
    lines: [
      "All green in the dashboard, all red in the user reports — no probes, no truth.",
      "Readiness probes are how the cluster learns what 'healthy' actually means.",
      "Kubernetes trusts your definitions — define health or inherit its guesses.",
    ],
    accent: "sky",
  }),
};

const ct41: Deepening = {
  diagram: svgdiag({
    heading: "The autoscaler: metric in, pods out",
    sub: "CPU or custom metrics drive replica counts — nothing else does",
    template: "loadbal",
    accent: "green",
    lines: [
      "The Horizontal Pod Autoscaler watches metrics and adjusts replica counts to match: rising CPU, more pods; falling demand, fewer — all without a human in the loop.",
      "The load balancer and the autoscaler work as a pair: the balancer spreads traffic across whatever pods exist, and the autoscaler decides how many should exist.",
      "Autoscaling is only as good as its metric — scaling on the wrong signal scales the wrong thing, and flapping comes from thresholds set without headroom.",
    ],
  }),
  walkthrough: steps({
    heading: "Walkthrough · configure HPA that doesn't flap",
    accent: "green",
    steps: [
      { title: "Set requests first", detail: "HPA scales on usage relative to requests — no requests, no meaningful scaling" },
      { title: "Pick the metric", detail: "CPU is the default; custom metrics (queue depth, latency) fit real workloads better" },
      { title: "Target with headroom", detail: "target 60% utilization, not 95% — scaling needs runway before saturation" },
      { title: "Bound it", detail: "min/max replicas — the max is your cost ceiling and your blast radius" },
      { title: "Watch for flapping", detail: "rapid up-down cycles mean the target is too tight or the metric too noisy" },
    ],
    lines: [
      "HPA math is simple: usage divided by requests, scaled to the target — but the target needs headroom to be useful.",
      "The max replica count is a budget decision; set it like one.",
      "Autoscaling on the wrong metric scales confidently in the wrong direction.",
    ],
  }),
  pitfalls: bullets({
    heading: "Autoscaling pitfalls",
    accent: "rose",
    items: [
      { text: "No resource requests", detail: "without requests, HPA has no baseline — it scales on a number that doesn't exist", kind: "bad" },
      { text: "Scaling on CPU for latency-bound apps", detail: "queue depth or p95 latency is the real signal for request-driven services", kind: "bad" },
      { text: "Min/max too wide", detail: "a huge max is a cost surprise waiting for a load spike — budget the ceiling", kind: "bad" },
      { text: "Cold-start blindness", detail: "pods need seconds to warm up — scale earlier than the metric says 'panic'", kind: "good" },
    ],
    lines: [
      "The HPA triad is requests, target with headroom, and a bounded max — miss any and scaling lies to you.",
      "Latency-bound services that scale on CPU scale late and wrong.",
      "Cold starts are part of the math — the autoscaler should act before the pager does.",
    ],
  }),
  warStory: scenario({
    label: "War story · the autoscaler that scaled into bankruptcy",
    context: "A launch-day promotion sent traffic soaring — and the autoscaler answered by scaling to 400 pods, tripling the cloud bill in an afternoon.",
    event: "The HPA had no max bound, and the metric was CPU — which spiked because the app was inefficient, not because more capacity helped. Every added pod consumed more, the bill climbed, and the latency barely moved.",
    resolution: "The fix was a max replica bound, a queue-depth metric that reflected real demand, and load tests to find the true ceiling. The lesson: autoscaling amplifies whatever you configure — bound it, metric it correctly, and test it before the launch that matters.",
    lines: [
      "Four hundred pods, tripled bill, unchanged latency — the autoscaler scaled the wrong thing.",
      "A bounded max turns autoscaling from a cost surprise into a budget tool.",
      "Autoscaling amplifies your config — measure it right or pay for the mistake loudly.",
    ],
    accent: "green",
  }),
};

// ── DevOps Pipeline (remaining 4) ────────────────────────────

const do11: Deepening = {
  diagram: svgdiag({
    heading: "DevOps is a loop, not a job title",
    sub: "plan to operate and back again — the pipeline is the product",
    template: "inc",
    accent: "amber",
    lines: [
      "DevOps is a culture and a pipeline: plan, code, build, test, release, deploy, operate — with feedback looping from operations back into planning.",
      "The tooling exists to make the loop fast and safe: CI runs tests on every change, CD ships the artifact, and monitoring closes the loop with real data.",
      "The metric is lead time — how long from idea to production — and the whole practice is about shrinking it without breaking the safety.",
    ],
  }),
  walkthrough: steps({
    heading: "Walkthrough · map your own delivery pipeline",
    accent: "amber",
    steps: [
      { title: "Draw the current flow", detail: "from 'git push' to 'running in prod' — every manual step is a candidate for automation" },
      { title: "Find the handoffs", detail: "each human handoff (QA copy, ops deploy) is where time and errors hide" },
      { title: "Automate the risky step first", detail: "the manual deploy is the scariest — automate it before the cosmetic stuff" },
      { title: "Add feedback", detail: "metrics and logs after deploy — does the loop actually close?" },
      { title: "Measure lead time", detail: "baseline it now; improve it later — you can't shrink what you can't see" },
    ],
    lines: [
      "The DevOps audit is one drawing: your pipeline from push to production, with every manual step circled.",
      "Automate the scariest step first — a manual deploy is a human doing a machine's job under pressure.",
      "Lead time is the scoreboard: measure it honestly and every improvement becomes visible.",
    ],
  }),
  pitfalls: bullets({
    heading: "DevOps pitfalls",
    accent: "rose",
    items: [
      { text: "Tools without culture", detail: "buying CI software while keeping the weekly manual release is a dashboard, not DevOps", kind: "bad" },
      { text: "Automating the wrong steps", detail: "automating a process nobody trusts just makes it fail faster", kind: "bad" },
      { text: "No feedback loop", detail: "deploy without monitoring is shipping blind — the loop is the whole point", kind: "bad" },
      { text: "Blaming the pipeline", detail: "when deploys are painful, the fix is more deploys — frequency is how pain gets found and fixed", kind: "good" },
    ],
    lines: [
      "DevOps without the culture is a CI badge on a waterfall — the loop is the product.",
      "Automate what you trust, then grow trust by automating more — sequence matters.",
      "The pain is the roadmap: every painful manual step is a ticket for the next automation.",
    ],
  }),
  warStory: scenario({
    label: "War story · the weekly release that took all week",
    context: "A team's 'release day' was Thursday, and every Thursday was consumed by manual deploys, rollback dances, and a shared dread of Friday.",
    event: "The pipeline had grown in reverse: they bought CI tooling but kept the manual production deploy, so every improvement made the mismatch more painful. Releases were the weekly crisis, and nobody dared change the ritual.",
    resolution: "A small team automated production deploys behind a one-button promotion with automated tests and automatic rollback. Release day became a ten-minute event. The lesson: the pipeline is the product — every hour of release pain is product debt.",
    lines: [
      "Release day consumed the whole week until deploying became a button instead of a ritual.",
      "Automate the painful path first — pain is the priority queue.",
      "The pipeline is the product; a painful release is a bug in it.",
    ],
    accent: "amber",
  }),
};

const do21: Deepening = {
  diagram: svgdiag({
    heading: "Workflows: events in, jobs out",
    sub: "a YAML pipeline that runs on every push, PR, and tag",
    template: "cicd",
    accent: "teal",
    lines: [
      "GitHub Actions is a CI/CD engine built on events: a workflow YAML declares the trigger — push, pull request, schedule — and the jobs that run when it fires.",
      "Each job runs on a fresh runner, and steps chain commands into a pipeline: checkout, test, build, scan, deploy — the classic green gate chain.",
      "The artifact is the contract: one built, tested, scanned package flows to every environment, and each gate must pass before the next begins.",
    ],
  }),
  walkthrough: steps({
    heading: "Walkthrough · build a workflow that guards production",
    accent: "teal",
    steps: [
      { title: "Trigger deliberately", detail: "run tests on every PR; deploy only on main or a tag — never both" },
      { title: "Pin your runners", detail: "ubuntu-22.04, not ubuntu-latest — floating images break builds silently" },
      { title: "Cache dependencies", detail: "dependency caching turns 3-minute installs into 20-second ones" },
      { title: "Gate on tests + scans", detail: "unit tests, lint, dependency scan — the green gate contract" },
      { title: "Deploy with an environment", detail: "protected environments with required reviewers for production" },
    ],
    lines: [
      "A workflow is a policy in YAML: the triggers and gates are your release discipline, machine-enforced.",
      "Pin versions — runners, actions, and dependencies — because floating versions float straight into incidents.",
      "Protected environments make production deploys a decision with an audit trail.",
    ],
  }),
  pitfalls: bullets({
    heading: "Workflow pitfalls",
    accent: "rose",
    items: [
      { text: "Secrets in workflow files", detail: "workflow YAML is committed — use repository secrets, never inline tokens", kind: "bad" },
      { text: "Untrusted code in CI", detail: "a PR that changes the workflow itself can run anything — require approvals for workflow changes", kind: "bad" },
      { text: "Deploying from the same job that tests", detail: "separate test and deploy jobs — a test failure should never be 'mostly passed'", kind: "bad" },
      { text: "Skipping the artifact", detail: "rebuilding in each environment breaks the 'same artifact' contract — build once, promote", kind: "good" },
    ],
    lines: [
      "CI runs arbitrary code with your permissions — treat workflow files like production config with reviews.",
      "Build once, promote the artifact; rebuilding per environment is how 'works in CI' becomes 'broken in prod'.",
      "Every gate that can be skipped will be skipped — make them enforced, not conventional.",
    ],
  }),
  warStory: scenario({
    label: "War story · the pull request that ran a mining pool",
    context: "A repo's CI started consuming massive runner minutes — bills jumped, and nobody could find the workload.",
    event: "A contributor's PR modified the workflow file to add a 'test' step that ran a crypto miner in the background during CI. Since workflow changes from forks can be auto-run on PR, the miner ran on every push for weeks.",
    resolution: "The fix: fork PRs require maintainer approval before workflow execution, actions are pinned by commit SHA, and workflow files are protected from non-admin edits. The lesson: CI is a computer with your credentials — secure it like one.",
    lines: [
      "A PR that edited the workflow ran a miner on every push for weeks.",
      "Fork PRs running workflows without approval is CI with your wallet open.",
      "Pin your actions, protect your workflow files, and review what CI runs.",
    ],
    accent: "teal",
  }),
};

const do31: Deepening = {
  diagram: svgdiag({
    heading: "Shifting traffic, not flipping switches",
    sub: "rolling, blue/green, canary — deployment is a traffic decision",
    template: "loadbal",
    accent: "violet",
    lines: [
      "Deployment strategies are traffic-shaping patterns: rolling replaces instances gradually, blue/green runs the new version alongside and switches DNS, and canary sends a sliver of real users first.",
      "The load balancer is the steering wheel — health checks, draining, and weighted routing are how a new version earns its traffic.",
      "Rollback is part of the design, not an afterthought: the fastest rollback is pointing traffic at the version that still works.",
    ],
  }),
  walkthrough: steps({
    heading: "Walkthrough · pick a strategy for your risk",
    accent: "violet",
    steps: [
      { title: "Rolling for low risk", detail: "gradual replacement with health checks — simplest, no double infrastructure" },
      { title: "Blue/green for instant rollback", detail: "two full environments, flip DNS — the old version is one switch away" },
      { title: "Canary for real-user validation", detail: "5% traffic, watch errors, ramp to 100% only if clean" },
      { title: "Feature flags as a complement", detail: "flags let you ship code dark and toggle behavior without redeploying" },
      { title: "Test the rollback", detail: "the drill: simulate failure and revert — a rollback you haven't rehearsed is a rumor" },
    ],
    lines: [
      "The strategy choice is a risk budget: how bad is a bad deploy, and how fast must you be able to undo it?",
      "Canary is the honest option — the first real users on a new version are a test with consequences, so watch them closely.",
      "Rollback rehearsal is part of the deploy: the switch you never flipped is the switch you don't trust.",
    ],
  }),
  pitfalls: bullets({
    heading: "Deployment pitfalls",
    accent: "rose",
    items: [
      { text: "Blue/green with shared state", detail: "two versions sharing one database is a recipe for schema wars — migrate forward, not sideways", kind: "bad" },
      { text: "Canary without metrics", detail: "a 5% canary with no error-rate comparison is theater — measure before you trust it", kind: "bad" },
      { text: "Rolling without health checks", detail: "a rolling deploy that never verifies each new instance ships failures onward", kind: "bad" },
      { text: "Fix-forward in production", detail: "debugging live instead of rolling back compounds the outage — roll back first, fix later", kind: "good" },
    ],
    lines: [
      "Every strategy needs the same three things: health checks, a metric to compare, and a rehearsed way back.",
      "Database schema changes break blue/green — plan forward-compatible migrations before you split environments.",
      "When production breaks, roll back first: debugging live is how small releases become big incidents.",
    ],
  }),
  warStory: scenario({
    label: "War story · the canary that saved the quarter",
    context: "A team's billing overhaul was about to deploy to all users on a Friday — until the canary caught it.",
    event: "The 5% canary ran for an hour and showed a 12% error rate on payment retries — invisible in staging, impossible to miss in real traffic. The full rollout was stopped, and the bug — a timeout change interacting with a third-party gateway — was found in an afternoon.",
    resolution: "The release shipped the following Tuesday after the fix, and canary deploys became mandatory for anything touching money. The lesson: five percent of users is a cheap price for a lesson that would have cost one hundred percent.",
    lines: [
      "Twelve percent of payment retries failing — invisible in staging, obvious in a 5% canary.",
      "Canary traffic is a test with real consequences — which is exactly why it works.",
      "Five percent of users is cheap tuition for a mistake that would have cost everyone.",
    ],
    accent: "violet",
  }),
};

const do41: Deepening = {
  diagram: svgdiag({
    heading: "Three pillars, one investigation",
    sub: "metrics say something's wrong; logs say what; traces say where",
    template: "obs",
    accent: "green",
    lines: [
      "Observability rests on three pillars: metrics are numbers over time — latency, errors, saturation — that answer 'is something wrong?'",
      "Logs are discrete events with rich detail that answer 'what exactly happened?', and traces follow one request across every service to answer 'where is the time going?'",
      "The workflow is the loop: an alert fires on a metric, you investigate with logs, and traces show the span that ate the latency — then the fix ships and the metric confirms it.",
    ],
  }),
  walkthrough: steps({
    heading: "Walkthrough · investigate a slow checkout",
    accent: "green",
    steps: [
      { title: "Metric first", detail: "p99 latency on checkout — is it globally slow or a tail problem?" },
      { title: "Log the request", detail: "request ID + error codes — find the failing stage" },
      { title: "Trace the journey", detail: "gateway → auth → cart → payment → DB — which span owns the seconds?" },
      { title: "Correlate with deploys", detail: "did p99 jump at the last release? the timeline is a suspect list" },
      { title: "Ship and verify", detail: "the fix lands, and the metric is the verdict — the loop closes" },
    ],
    lines: [
      "The three pillars are a workflow, not a dashboard: alert on metrics, explain with logs, pinpoint with traces.",
      "A request ID that threads through logs and traces is the connective tissue of every investigation.",
      "Correlate metrics with deploy timelines — most latency stories are release stories.",
    ],
  }),
  pitfalls: bullets({
    heading: "Observability pitfalls",
    accent: "rose",
    items: [
      { text: "Logs without structure", detail: "unstructured text can't be queried — structured fields are what make logs evidence", kind: "bad" },
      { text: "Metrics without alerts", detail: "a dashboard nobody watches is a museum — every key metric needs a threshold and an owner", kind: "bad" },
      { text: "Traces without sampling", detail: "tracing everything explodes storage — sample smartly, keep the critical paths", kind: "bad" },
      { text: "No request IDs", detail: "without correlation IDs, logs are parallel universes — thread them through everything", kind: "good" },
    ],
    lines: [
      "A metric without an alert is a fact without an audience; an alert without an owner is noise.",
      "Structured logs plus request IDs are the cheapest investigation superpowers you can buy.",
      "The pillars work together or not at all — metrics, logs, and traces are one investigation, split three ways.",
    ],
  }),
  warStory: scenario({
    label: "War story · the p99 that hid in the tail",
    context: "An e-commerce team's p50 latency looked fine while p99 was exploding — and support was drowning in timeout complaints.",
    event: "The average hid the story: one third-party payment retry path, carrying 1% of traffic, was taking 30 seconds. The dashboard's average smoothed it into invisibility; only a percentile breakdown showed the tail.",
    resolution: "Alerts moved to p99 with the payment span traced end to end — the culprit was a retry loop with exponential backoff capped too high. The lesson: averages are where latency stories go to hide — watch the percentiles, and trace the tail.",
    lines: [
      "The average looked fine; the tail was on fire — one retry path, one percent of traffic, thirty seconds.",
      "Percentiles are the honest metric: p99 is the user who complained.",
      "Trace the tail — the slowest requests are where the stories live.",
    ],
    accent: "green",
  }),
};

// ── Registry (part 2) ──
// Merged into DEEPENINGS in deepen.ts. Further hand-authored deepenings
// continue below this record as the remaining lessons are authored.

export const DEEPEN2: Record<string, Deepening> = {
  // Networking Fundamentals
  "les-nf-1-1": nf11,
  "les-nf-2-1": nf21,
  "les-nf-2-2": nf22,
  "les-nf-3-1": nf31,
  "les-nf-4-1": nf41,
  // Linux Fundamentals
  "les-lf-2-1": lf21,
  "les-lf-2-3": lf23,
  "les-lf-3-1": lf31,
  // Cyber Fundamentals
  "les-cf-1-1": cf11,
  "les-cf-1-3": cf13,
  "les-cf-2-3": cf23,
  "les-cf-4-1": cf41,
  "les-cf-4-3": cf43,
  // Threat Intelligence
  "l-ti-1-2": ti12,
  // SOC Operations
  "les-so-1-1": so11,
  "les-so-2-1": so21,
  "les-so-3-1": so31,
  "les-so-4-1": so41,
  "les-so-5-1": so51,
  "les-so-6-1": so61,
  "les-so-7-1": so71,
  "les-so-8-2": so82,
  // Web Fundamentals
  "les-wf-1-1": wf11,
  "les-wf-5-1": wf51,
  // React Frontend
  "les-rf-1-1": rf11,
  "les-rf-1-2": rf12,
  "les-rf-2-2": rf22,
  "les-rf-4-1": rf41,
  // Node Backend
  "les-nb-1-1": nb11,
  "les-nb-1-2": nb12,
  "les-nb-2-2": nb22,
  "les-nb-3-1": nb31,
  "les-nb-5-1": nb51,
  "les-nb-6-1": nb61,
  // Fullstack Project
  "les-fc-1-1": fc11,
  // Cloud Foundations
  "les-cfnd-1-1": cfnd11,
  "les-cfnd-2-1": cfnd21,
  "les-cfnd-3-1": cfnd31,
  "les-cfnd-3-2": cfnd32,
  "les-cfnd-4-1": cfnd41,
  // Terraform
  "les-tf-1-1": tf11,
  "les-tf-2-1": tf21,
  "les-tf-3-1": tf31,
  "les-tf-4-1": tf41,
  // Containers
  "les-ct-1-1": ct11,
  "les-ct-2-1": ct21,
  "les-ct-3-1": ct31,
  "les-ct-4-1": ct41,
  // DevOps Pipeline
  "les-do-1-1": do11,
  "les-do-2-1": do21,
  "les-do-3-1": do31,
  "les-do-4-1": do41,
};
