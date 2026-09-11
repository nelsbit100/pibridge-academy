// ──────────────────────────────────────────────────────────────
// PiBridge Academy — Deep Reading Content
// Hand-authored structured content for reading-type lessons:
// ## section headings, - bullets, **bold** key terms. Rendered
// by Learner/ReadingBody.tsx. Applied in data.ts at module load.
// ──────────────────────────────────────────────────────────────

export interface DeepReading {
  /** One-paragraph hook that frames why the lesson matters. */
  intro: string;
  /** Structured body: ## sections, - bullets, **bold** inline terms. */
  body: string;
}

const READINGS: Record<string, DeepReading> = {
  // ── Networking Fundamentals ──────────────────────────────────
  "les-nf-1-2": {
    intro:
      "Before you can defend a network, you have to see it. Topology is the shape of that vision — it decides what breaks when a cable is cut, what an attacker can reach from one foothold, and what your monitoring can even observe.",
    body: `## The four shapes that matter
- **Star** — every device connects to a central switch. One link fails, one device is isolated. This is why star dominates modern LANs: failure domains are small and predictable.
- **Bus** — all devices share one cable. Cheap, historical, fragile: a single break splits the segment in two, and everyone collides on the same wire.
- **Ring** — data travels one direction around a loop (Token Ring was IBM's answer). Predictable performance, but one unbroken ring is one point of failure.
- **Mesh** — every device connects to every other (full) or some subset (partial). Maximum redundancy, maximum cost — you buy it only when the link itself is the mission.

## Why security engineers care
Topology decides your **blast radius**. In a star, an attacker who owns the switch owns the network — that central device is both your best friend (one monitoring point for all traffic) and your worst enemy (one compromise for total visibility). In a mesh, there is no crown jewel, but there is also no single place where traffic *must* pass, so monitoring means deploying everywhere.

## Reading a real network
- The **core** is mesh-like: redundant links between core switches so no single failure isolates a site.
- The **access layer** is star-like: end devices on switches, the cheapest place to be, the most places to watch.
- The **DMZ** hangs off a firewall deliberately: public services live where a compromise touches the least.

## Field note
Ask for a network diagram in any job interview scenario. The shape tells you where the risk concentrates before anyone says a word about firewalls.`,
  },
  "les-nf-3-2": {
    intro:
      "TCP and UDP are the two doors out of your machine. Choosing between them — and recognizing which one an application uses — is the difference between understanding a protocol trace and staring at noise.",
    body: `## TCP: the courier who waits for a signature
- **Three-way handshake** (SYN → SYN-ACK → ACK) opens every connection, so a conversation has a beginning you can detect.
- **Sequence numbers** let the receiver reassemble segments in order and demand retransmission of anything lost.
- **Flow and congestion control** mean a slow link slows the sender instead of dropping data silently.
- The cost: latency. Every guarantee is a round trip.

## UDP: the courier who throws the parcel and runs
- No handshake, no sequence numbers, no retransmission — just a destination port and the payload.
- Perfect for **DNS** (one query, one answer — retransmitting the whole exchange would be slower than just asking again), **VoIP and video** (a late packet is worthless; drop it and keep talking), and **gaming**.
- The cost: reliability. Your application owns every guarantee TCP used to make.

## The security lens
- TCP SYN floods attack the handshake itself: half-open connections exhaust the server's table. **SYN cookies** are the defense.
- UDP has no handshake to rate-limit, which is why **UDP amplification** (DNS, NTP, memcached reflection) powers the biggest DDoS attacks ever measured.
- Firewalls treat them differently: stateful firewalls track TCP sessions automatically, but UDP 'connections' are just timeouts — a subtle difference when you write rules.

## How to tell them apart in a capture
Look at the first packets of a conversation. A SYN packet with no payload starts TCP. Data arriving with no preamble is UDP. That one observation tells you what guarantees the conversation has — and what the attacker can abuse.`,
  },
  "les-nf-4-2": {
    intro:
      "An IDS watches and warns; an IPS stands in the traffic path and blocks. That placement difference drives everything: what they can see, what they can stop, and how badly they can hurt you when they're wrong.",
    body: `## IDS: the motion sensor
- Sits on a **mirror/span port** — it sees a copy of traffic, never the traffic itself.
- Cannot stop anything. It raises an alert and the human (or a separate tool) decides.
- Cannot break the network: if the IDS dies, packets flow. This is why IDS deployments are easy to justify and easy to ignore.

## IPS: the checkpoint guard
- Sits **inline** — every packet must pass through it, and it can drop, reject, or rewrite.
- Can stop an attack in flight, but a wrong rule now blocks legitimate business traffic.
- High availability matters: an inline device is a single point of failure by design.

## Detection styles (they share these)
- **Signature-based** — match known patterns. Precise, explainable, blind to anything new. This is the classic Snort rule.
- **Anomaly-based** — learn 'normal', alert on deviation. Catches the novel, drowns you in false positives after any benign change.

## Choosing in the field
- Put IDS sensors where you want **visibility without risk**: internal segments, server VLAN mirrors.
- Put IPS where **known-bad must die fast**: at the internet edge, in front of exposed services.
- Tune before you trust. An untuned IPS blocks the CEO's morning Zoom and loses its budget in one incident.

## Field note
Modern deployments blur the line: host agents (EDR) do IDS-style telemetry plus IPS-style blocking per process. The vocabulary survives — in interviews, being able to explain *why placement changes behavior* marks you as someone who has deployed these, not just read about them.`,
  },
  "les-nf-5-2": {
    intro:
      "A packet capture is testimony: every claim in an incident report should trace back to frames you can point at. Reading captures is a skill of pattern recognition — conversations, not packets.",
    body: `## Start with the shape of the capture
- **Protocols view**: which protocols dominate? A web app capture that is 70% DNS is already telling you something.
- **Conversations view** (Statistics → Conversations): who talks to whom, and how much? The top talker list is where exfiltration and scanning reveal themselves.
- **Endpoints view**: which single IP stands out in volume or in newness?

## Reading one conversation
- **Follow → TCP Stream** turns packets into a readable dialogue. For HTTP you see the actual request and response; for encrypted traffic you see the handshake's shape (certificate sizes, SNI in ClientHello) even when you can't see content.
- **Time sequence graphs** show stalls and retransmissions: the story of 'the app is slow' lives here, not in any single packet.

## The filters that earn their keep
- \`ip.addr == 10.0.0.5\` — everything about one host.
- \`tcp.flags.syn == 1 && tcp.flags.ack == 0\` — every connection attempt: a scan shows up as SYNs to many ports.
- \`http.request.method == "POST"\` — data leaving via web forms.
- \`dns\` — exfiltration hides in subdomains; long, random labels are the fingerprint.

## War story habit
Save your baselines. Sixty seconds of 'normal' captured on a quiet Tuesday is worth more than an hour of capture during the incident — because the difference between them is the intrusion.`,
  },

  // ── Linux Fundamentals ───────────────────────────────────────
  "les-lf-1-2": {
    intro:
      "Everything on Linux is a file somewhere in one tree that starts at /. Know the map and every error message becomes an address; skip the map and you are lost the first time a service refuses to start.",
    body: `## The directories you will live in
- **/etc** — configuration for the whole system. Text files, version-controllable, the first place to look when behavior changes. \`/etc/passwd\`, \`/etc/ssh/sshd_config\`, \`/etc/fstab\`.
- **/var** — variable data: logs in **/var/log**, mail spools, databases. The SOC analyst's home turf; \`/var/log/auth.log\` and \`/var/log/syslog\` answer most 'what happened' questions.
- **/home** and **/root** — user homes; **/root** is the root user's home, a different thing from the root of the filesystem \`/\`. Attackers who escalate to root leave traces here (.bash_history, .ssh/authorized_keys).
- **/tmp** — world-writable scratch space. Also where payloads get dropped because every user can write it. **/dev/shm** too — memory-backed and often missed in cleanup.
- **/proc** and **/sys** — the kernel as a filesystem. \`/proc/\${pid}/\` exposes each process's command line, open files, and network sockets. Live forensics starts here.
- **/bin, /sbin, /usr, /lib** — the software itself. Malware sometimes masquerades here with plausible names (\`/usr/sbin/kworker\`), so know what the real ones look like.

## Commands that make the map real
- \`ls -la /etc/ssh\` — what configuration exists and who can change it.
- \`find / -writable -type d 2>/dev/null | head\` — where can *this* user write? (Also: where can an attacker write?)
- \`du -sh /var/log/*\` — what's eating the disk, and which log grew suspiciously fast?
- \`stat /usr/bin/whoami\` — modification times don't lie about tampering the way \`ls\` timestamps can be faked.

## Field note
New distributions keep reorganizing (/usr merge, /run replacing /var/run), but the *logic* — config, state, devices, processes — never changes. Learn the logic once and every distro is familiar.`,
  },
  "les-lf-2-2": {
    intro:
      "Permissions are the first thing misconfigured and the first thing an auditor checks. The nine bits (plus the special ones) tell you exactly who can read, alter, or execute every file — if you can read them fluently.",
    body: `## Reading the notation
\`-rwxr-x---\` breaks down as: file type (**-** file, **d** directory, **l** symlink), then owner (**rwx**), group (**r-x**), others (**---**). So: owner does everything, the group can read and execute, everyone else is locked out.

## The three bits people forget
- **setuid (4xxx)** — an executable runs as its *owner*, not the caller. \`/usr/bin/passwd\` needs it to edit /etc/shadow. Setuid on anything else is a privilege-escalation gift: \`find / -perm -4000 2>/dev/null\` is both an audit command and an attacker's recon line.
- **setgid (2xxx)** — on directories, new files inherit the *directory's group*. The one clean way to share a folder between a team.
- **sticky bit (1xxx)** — on a directory, only the file's owner can delete their own files. \`/tmp\` is \`1777\` for exactly this reason.

## Directories mean something different
- **r** on a directory = list names (\`ls\`).
- **w** = create and delete entries *in* it — even files you don't own (unless sticky).
- **x** = enter and access contents (\`cd\`, open files inside).

A directory with **--x** lets people use what they know exists but never list it. Sometimes that's a clever control; often it's a mistake that hides, not protects.

## Numeric and umask
- \`chmod 750 file\` = rwxr-x---. Learn the octal table once: 4=read, 2=write, 1=execute, sum per triplet.
- **umask** subtracts from new files' defaults (usually 022 → files 644, dirs 755). A world-writable output directory is usually a umask surprise, not a decision.

## War story habit
\`chmod -R 777 /srv/app\` is how juniors 'fix' permission errors and how seniors inherit incidents. The correct move is to identify *which* user needs *which* access and grant exactly that.`,
  },
  "les-lf-3-2": {
    intro:
      "Bash scripting is ops muscle memory: variables, conditionals, and loops turn a hundred manual steps into one auditable command. The syntax is unforgiving, but the discipline it teaches is permanent.",
    body: `## Variables without the gotchas
\`\`\`
name="world"        # no spaces around =
echo "hello, $name" # quotes expand
echo 'hello, $name' # single quotes: literal
\`\`\`
- Always **quote your expansions**: \`"$file"\` survives filenames with spaces; \`$file\` splits into words and eats your weekend.
- \`"$@"\` passes script arguments through intact — \`"$*"\` glues them together. Default to \`"$@"\`.
- \`\${var:-default}\` gives a fallback without an if-statement.

## Conditionals in the shell's dialect
\`\`\`
if [ "$count" -gt 10 ]; then
  echo "too many"
elif [ -z "$name" ]; then
  echo "name is empty"
fi
\`\`\`
- \`[ ... ]\` is a command — the spaces around it are mandatory, not style.
- File tests carry the workload: \`-f\` (is a file), \`-d\` (is a directory), \`-r\`/\`-w\`/\`-x\` (can read/write/execute), \`-z\` (empty string).
- \`[[ ... ]]\` is the bash-only upgrade: no word-splitting surprises, \`&&\` and \`||\` work inside, regex matching with \`=~\`.

## Loops that do real work
\`\`\`
for host in $(cat servers.txt); do
  ssh -o ConnectTimeout=3 "$host" 'uptime' 
done

while read -r line; do
  process_line "$line"
done < input.txt
\`\`\`
- \`while read -r\` is the safe way to consume a file line-by-line; \`for line in $(cat file)\` breaks on spaces.
- Pipe into \`while read\` carefully — commands inside the loop that read stdin (like \`ssh\` without \`-n\`) will swallow the rest of your input.

## Exit codes: how scripts talk to automation
- \`0\` = success, anything else = failure. \`command || echo "it failed"\` and \`command && echo "it worked"\` branch on codes.
- End your scripts with a meaningful \`exit\` — cron, CI, and your future self all read exit codes before they read logs.`,
  },
  "les-lf-5-1": {
    intro:
      "SSH is the front door to nearly every server on earth, which makes sshd the most probed daemon on the internet. Hardening it is high-leverage, small-config work — a dozen lines that eliminate 99% of the noise and most of the risk.",
    body: `## The baseline that changes everything
- **Disable password authentication**: \`PasswordAuthentication no\`. Keys can't be guessed or reused from another breach. Do this *after* confirming your key works — lock yourself out once and you'll never skip the second terminal again.
- **Disable root login**: \`PermitRootLogin no\`. Use a normal user + sudo so every privileged action lands in the logs with a name attached.
- **Allow only who needs in**: \`AllowUsers deploy alice\` turns the whole user database into a decoy list.

## Port 22 and the noise floor
Moving SSH to a high port doesn't stop a determined attacker — a scan finds it in seconds — but it cuts the log noise from thousands of bot attempts a day to near zero, so the *real* probes become visible. That's a monitoring win, not a security control. Say both parts in an interview.

## Keys, agents, and hygiene
- Generate modern keys: \`ssh-keygen -t ed25519\`. Add \`-a 100\` when encrypting to slow brute-force of the passphrase.
- \`authorized_keys\` is a trust inventory: every line is a door. Audit them (\`find / -name authorized_keys\`), and prefer \`from="..." \` and \`command="..."\` restrictions for automation keys.
- Agent forwarding is convenient and dangerous: on a compromised host, your forwarded agent is usable by root there. Forward only when you must, and \`ssh-add -D\` when done.

## Reading the evidence
- \`/var/log/auth.log\` (Debian) or \`/var/log/secure\` (RHEL): 'Failed password', 'Invalid user', 'Accepted publickey for'. Count the failures per source IP and the botnet census writes itself.
- \`last\` and \`lastb\` show logins and bad logins; \`w\` shows who is on *right now* — the first command in any incident.

## Verify your hardening
\`sshd -T\` prints the *effective* config after all includes and defaults — argue with that, not with your sshd_config. And always keep one live session open while restarting sshd; \`systemctl reload ssh\` from a second terminal is the professional reflex.`,
  },

  // ── Cybersecurity Fundamentals ───────────────────────────────
  "les-cf-1-2": {
    intro:
      "Defense in depth is the admission that every control fails eventually. Instead of one perfect wall, you stack imperfect ones so that no single failure — misconfiguration, zero-day, or bribe — is catastrophic.",
    body: `## The layers, top to bottom
- **Policy and people** — training, procedures, least privilege. Cheapest layer, most often skipped, most commonly the root cause in retrospectives.
- **Physical** — locks, badge readers, camera coverage. All remote defenses end at a door someone can walk through.
- **Perimeter** — firewalls, WAFs, email gateways. Necessary and no longer sufficient: the perimeter dissolves with cloud, VPNs, and SaaS.
- **Network internal** — segmentation, VLANs, east-west monitoring. The layer that turns 'attacker on the LAN' from game-over into containment.
- **Endpoint** — EDR, patching, hardened baselines. Where phishing lands; where detection is richest.
- **Application** — secure SDLC, input validation, dependency hygiene. Bugs here bypass everything below.
- **Data** — encryption at rest and in transit, classification, DLP. The asset the other layers exist to protect.

## The principles that make layers work
- **Least privilege** — every subject (user, service, container) gets the minimum access. Breaches then inherit tiny permissions.
- **Diversity of controls** — one vendor's firewall pair is one bug away from zero defense. Mix mechanisms, not just instances.
- **Assume breach** — design so that the question is 'how fast do we contain', not 'can it happen'.

## The honest trade-offs
- Every layer adds latency, cost, and friction. Eight controls nobody uses are worse than three everybody does.
- Layers interact: an IPS that blocks the SOC's own scan traffic teaches analysts to disable security tools. Tune as a system.

## Field note
When you inherit an environment, map the layers before touching anything: what exists at each level, what's missing, what's bypassed in practice. That map is your roadmap and — in interviews — your proof you think in systems, not tools.`,
  },
  "les-cf-2-2": {
    intro:
      "An attack vector is the 'how' — the path an attacker uses. An attack surface is the 'where' — the total collection of paths that exist. You reduce surface to shrink risk; you understand vectors to predict behavior.",
    body: `## Vectors: the moves attackers actually make
- **Phishing and its descendants** (spear-phishing, smishing, vishing) — still the number-one initial access vector in every major breach report, because people are cheaper to trick than systems are to hack.
- **Credential attacks** — password spraying, credential stuffing with breach dumps, session theft. Defended by MFA, not complexity.
- **Software supply chain** — a compromised dependency or update server delivers the attacker inside your trust boundary with valid signatures. SolarWinds is the canonical case.
- **Unpatched vulnerabilities** — the internet-wide scans find the exposed VPNs and file-transfer appliances within hours of disclosure.
- **Physical and insider** — the tailgate, the unattended laptop, the admin with a grudge.

## Surface: the inventory that grows while you sleep
- External: domains and subdomains (including forgotten ones), open ports, APIs, VPN concentrators, cloud buckets, expired-certificate hosts.
- Internal: every endpoint, service account, shared folder, and the trust relationships between them.
- Human surface: who can be emailed, phoned, or socially engineered — effectively everyone.

## Reducing surface, practically
- **Asset inventory first** — you cannot defend what you never recorded. Forgotten assets are the ones that get you breached.
- **Close the unneeded** — every port, account, and form that serves no business purpose is pure risk.
- **Harden what remains** — MFA everywhere, least privilege, patch cadence measured in days.

## Field note
Attack-surface management tools enumerate; they don't judge. The skill employers pay for is walking an environment and *feeling* which exposure is load-bearing and which is leftover.`,
  },
  "les-cf-3-2": {
    intro:
      "MFA kills the credential-stuffing economy overnight — which is why attackers responded with MFA itself as the attack target. Knowing the factors, and how each is defeated, is baseline security literacy.",
    body: `## The three factors and why they combine
- **Something you know** — passwords, PINs. Shareable, stealable, phishable.
- **Something you have** — phone, hardware key, certificate. Stealable but harder to phish at scale.
- **Something you are** — fingerprint, face. Can't be reset like a password; can be lifted.

True MFA mixes categories. Password + PIN is still one factor (two of the same kind).

## The factor menu, best to worst
- **FIDO2 / hardware security keys** (YubiKey, passkeys) — phishing-*resistant* by design: the key cryptographically binds the response to the genuine domain, so a fake site gains nothing. The gold standard.
- **Push prompts** — better than SMS, but **prompt bombing** (spamming approvals until one is tapped) and MFA-fatigue social calls ('IT here, approve the prompt') defeat it. Number matching mitigates.
- **TOTP apps** (Google/Microsoft Authenticator) — codes are phishable in real time (attacker relays it within the 30-second window) but useless after.
- **SMS** — the last resort: SIM-swap attacks move your number to the attacker's SIM, and SS7 flaws can intercept in transit. Better than nothing; assume it will fail.

## How MFA actually gets defeated
- **Real-time relay proxies** (Evilginx-style): the victim logs into the attacker's fake site, which forwards every credential and cookie — session hijack without ever breaking MFA. Only phishing-resistant factors fully counter this.
- **Helpdesk resets**: attackers who can't beat the factor simply *reset* it by impersonating you over the phone. Verify humans, not just logins.
- **Recovery flows**: 'backup codes' stored in email resurrect single-factor reality.

## Field note
Deploy FIDO2 for admins and executives first, number-matched push for everyone else, SMS only where nothing else runs — and secure the helpdesk, because that is where your MFA actually lives.`,
  },
  "les-cf-4-2": {
    intro:
      "Hashing and encryption solve different problems, and confusing them is an interview red flag. Encryption protects confidentiality (only holders of the key can read); hashing protects integrity (any change is detectable).",
    body: `## What a hash promises
- **Deterministic**: the same input always yields the same output — that's how verification works.
- **One-way**: infeasible to recover the input from the output.
- **Collision-resistant**: infeasible to find two inputs with the same hash — the property that makes the hash an identity for the file.
- **Avalanche**: one flipped bit changes roughly half the output bits, so tampering is unmistakable.

Use **SHA-256** or better (SHA-3, BLAKE3). **MD5 and SHA-1 are broken** for collision resistance — still seen in legacy systems and malware hashes for convenience, never for verification that matters.

## Passwords: hashing plus salt, then slow it down
- Never store passwords; store their salted hashes. The **salt** (random per user) defeats rainbow tables by making each hash unique even for identical passwords.
- Use deliberately *slow* KDFs — **bcrypt, scrypt, or Argon2** — because attackers hash a billion guesses per second on GPUs; your verifier should cost them everything it can.
- 'Pepper' (a global secret stored outside the DB) adds depth for the database-theft scenario.

## Digital signatures: integrity plus identity
A signature binds a hash to an identity:
1. The signer hashes the document, then encrypts that hash with their **private** key.
2. Anyone decrypts the signature with the signer's **public** key and compares to their own hash of the document.
3. Match proves both integrity (unchanged) and origin (only the private key holder could have signed) — and gives non-repudiation.

This is how code signing, TLS certificates, and signed git commits earn trust.

## Field note
The classic interview question — 'is hashing encryption?' — has a second half they're really asking: *which do you need?* Tamper detection → hash (+signature if origin matters). Secrecy → encryption. Usually: both, plus a signature.`,
  },
  "les-cf-5-2": {
    intro:
      "A VPN turns a hostile network into a private one by encrypting everything between you and a gateway you trust. Modern work is 'VPN optional' — but understanding tunnels remains essential, because zero trust still runs on them under other names.",
    body: `## What a tunnel actually does
Your client encrypts each packet, wraps it (**encapsulates**) inside a new packet addressed to the VPN gateway, and the gateway unwraps and forwards it. To the café Wi-Fi, you're just talking to one server with unintelligible payloads. Two properties follow:
- **Confidentiality in transit** — nobody on the path reads your traffic.
- **Integrity** — tampering is detected and dropped.

## The protocols you'll meet
- **WireGuard** — ~4k lines of code, modern crypto (ChaCha20-Poly1305, Curve25519), fastest to connect. The present and future.
- **IPsec** — the suite of the enterprise: IKE for key exchange, ESP for encryption. Battle-tested, complex, lives in routers and firewalls (site-to-site's default).
- **OpenVPN** — TLS-based, flexible, slow to hand-shake; survives weird networks and firewalls well.
- **TLS itself** — HTTPS is a tunnel you use all day; 'VPN-less' zero-trust brokers (ZTNA) are per-app TLS tunnels with identity instead of network location.

## The honest security model
- A VPN shifts trust, it doesn't create safety: the café can't read your traffic, but everything behind the gateway can. Split tunneling decides *which* traffic gets protection — and is also how an attacker on your laptop reaches both worlds.
- The classic failure of remote-access VPNs: one successful credential phish (post-MFA relay) grants a device a routable seat on the intranet. This is precisely the flaw zero-trust architecture exists to retire.

## Zero trust: VPNs with their wings clipped
ZTNA replaces 'on the VPN = trusted LAN' with per-application, identity-checked brokers: the tunnel exists, but it ends at one app, not the whole network. Lateral movement is designed out.

## Field note
In interviews: 'Do we still need VPNs?' — answer 'site-to-site, yes; remote access is becoming per-app tunnels'. That sentence signals you've read the last five years of the industry.`,
  },
  "les-cf-6-2": {
    intro:
      "Incident response is a rehearsed choreography, not improv. The six-phase lifecycle exists because incidents panic people, and structure is what keeps a panicked team effective instead of destructive.",
    body: `## The lifecycle (NIST SANS view)
- **1. Preparation** — the phase that decides everything else: playbooks, tooling and access pre-staged, contacts on speed-dial, retainer signed, backups *tested*. You cannot download the EDR agent during a ransomware event.
- **2. Identification** — detect and triage: is this an incident or an anomaly? Scope it — what's affected, since when. Declare early; false alarms are cheap, late declarations are not.
- **3. Containment** — stop the bleeding in two moves: short-term (isolate hosts, block C2 at the firewall) and longer-term (patch the vector, segment, prepare clean images). Kill the beacon before you wipe the disk — the malware's connections are evidence.
- **4. Eradication** — remove the attacker: delete persistence (scheduled tasks, run keys, rogue accounts, webshells), close the entry vector. Miss one foothold and you meet again next Tuesday.
- **5. Recovery** — restore from known-good, monitor intensively, stage the return to production. Ransomware recovery is only as good as your last *offline, tested* backup.
- **6. Lessons learned** — the meeting nobody wants and everyone needs: timeline, what detection missed, what worked, assigned fixes with dates. Skip it and you re-buy the incident at full price.

## Decisions under fire
- **Contain vs. observe**: blocking C2 tips off the attacker; watching risks spread. This call belongs to a named decision-maker, made with a written rationale.
- **Evidence first**: memory captures and disk images before remediation touches anything, or the post-mortem becomes fiction.

## Field note
Read any public post-incident report (CISA advisories are excellent) and map it to the six phases. Noticing which phase the organization botched is the fastest way to internalize why each exists.`,
  },
  // ── SOC Operations ──────────────────────────────────────────
  "les-so-1-2": {
    intro:
      "The SOC tier system is a career ladder and a triage machine at once: cheap fast judgment at Tier 1, deep slow analysis at Tier 3. Knowing what each tier owes the next is how you survive your first shift — and how you plan your climb.",
    body: `## What each tier actually does
- **Tier 1 — Triage** — watches the alert queue, does the first 10-minute check (is the alert true? what asset? what user?), closes false positives with a written justification, and escalates what survives with context attached. Speed and discipline over depth.
- **Tier 2 — Investigation** — takes escalations and answers 'what happened': pulls related events, pivots across logs (auth, proxy, endpoint), determines scope (one host or ten?), and contains the routine cases.
- **Tier 3 — Threat hunting & engineering** — doesn't wait for alerts. Hunts for the quiet intrusions using threat intel and hypotheses, tunes detections, does forensics on the hard cases, and feeds everything learned back into Tier 1 guidance.

## The workflow that binds them
- Alert fires → T1 triage within SLA → false positive (document + close) or escalation.
- Escalation arrives at T2 **with the alert, the asset, and what T1 already checked** — never a bare ticket.
- T2 confirms a real intrusion → containment call (who owns it?) → T3/forensics if the case is complex.
- Every closure feeds metrics (see les-so-7-2) and every hard case feeds new detections.

## Escalation is a writing skill
The best T1 analysts are the ones whose escalations T2 never needs to redo: timeline of events, entities involved (user, host, IP, hash), what was verified, what's still unknown, and why it matters. That document is your reputation.

## Field note
Tier boundaries vary by shop — some SOCs fold T2/T3 together, MSSPs compress everything. In interviews, describe the *handoffs* and you'll sound senior regardless of the local topology.`,
  },
  "les-so-2-2": {
    intro:
      "Every detection you will ever write is only as good as the logs feeding it. Knowing which sources exist, what they contain, and how parsers mangle them is the unglamorous foundation of SOC competence.",
    body: `## The core sources and what they answer
- **Windows Event Log** — the estate's diary. 4624/4625 (logon success/fail — count type 10 for RDP, type 3 for network), 4688 (process creation with command line if enabled), 4720 (account created), 7045 (service installed — classic persistence). Answer 'who did what, where, when'.
- **Sysmon** — what stock Windows logging won't give you: process trees with hashes, network connections per process, image loads, raw disk access. The single highest-value agent you can deploy.
- **Linux** — auth.log/secure (SSH, sudo), auditd (syscalls with arguments), journald. Thinner than Windows by default; auditd rules close the gap.
- **Proxy/DNS/firewall** — the network's view: which internal host talked to which external IP/domain, and what was downloaded. Where C2 and exfiltration show up.
- **EDR telemetry** — per-process behavior, file writes, script blocks. The richest source, but agent coverage gaps matter: know your blind spots before an incident, not during.
- **Cloud audit trails** (CloudTrail, Azure Activity) — API calls with identity: keys used from a new ASN, MFA disabled, buckets made public.

## Why parsing breaks your detections
Every vendor ships its own dialect. Parsing turns raw logs into fields (user, src_ip, process), and when a vendor changes a format or a newline lands wrong, fields go null — and your rule silently stops matching. Parsers must be **tested with sample events** and **monitored for volume cliffs** (a source that goes quiet is a detection outage).

## Field note
Before writing any detection, spend an hour reading raw events from the actual source. Half of detection engineering is knowing what the log *doesn't* record — and saying so out loud in the rule's documentation.`,
  },
  "les-so-3-2": {
    intro:
      "MITRE ATT&CK is the shared language of adversary behavior: fourteen tactics (the 'why') and hundreds of techniques (the 'how'). It turns vague threat reports into testable detection requirements.",
    body: `## Tactics: the chapters of an intrusion
Reconnaissance → Resource Development → Initial Access → Execution → Persistence → Privilege Escalation → Defense Evasion → Credential Access → Discovery → Lateral Movement → Collection → Command and Control → Exfiltration → Impact. Read left to right, it's the attacker's project plan; find where your telemetry covers it and where it doesn't.

## Techniques and sub-techniques
- **T1566.001** = Phishing: Spearphishing Attachment. The number is precise — use it.
- Techniques describe *behavior*, not tools: 'T1059 Command and Scripting Interpreter' holds PowerShell, bash, Python — one technique, many faces.
- Each technique page lists **detections** (data sources that can catch it) and **mitigations** — that's your detection backlog, pre-written by MITRE.

## Using ATT&CK in a real SOC
- **Gap mapping** — list your detections per technique; the empty cells are your exposure. (ATT&CK Navigator visualizes this.)
- **Intel ingestion** — when a report says 'APT X uses scheduled tasks for persistence', you file it as T1053.005 and check your coverage in minutes instead of days.
- **Purple teaming** — emulate a technique (Atomic Red Team), confirm a detection fires, score it, fix it. ATT&CK makes practice repeatable.

## The honest limits
ATT&CK describes *known* adversary behavior — it is a map of the past. And coverage percentages lie: 'covered' means a rule exists, not that it survives a tuned adversary. Treat the matrix as a language, not a scorecard.

## Field note
Learn 20 techniques deeply (the ones your environment actually generates: phishing, PowerShell, scheduled tasks, credential dumping) before you skim 600. Depth reads better in interviews than breadth.`,
  },
  "les-so-4-2": {
    intro:
      "An investigation without methodology is a random walk through logs. The disciplined loop — scope, pivot, hypothesize, verify, document — is what separates an analyst who finds intrusions from one who finds coincidences.",
    body: `## The loop that never skips a step
- **1. Define the question.** 'Is host WEB-01 compromised?' is answerable. 'Is anything weird happening?' is not — that way lies hours of scrolling.
- **2. Scope the entities.** User, host, IP, hash — collect everything known about each (asset criticality, owner, normal behavior) before pivoting.
- **3. Pivot outward, one hop at a time.** From the alerting host → its logons (who touched it?) → those accounts' other logons (where else?) → their processes → their network calls. Each hop is a query you can write down.
- **4. Hypothesize explicitly.** 'If this is pass-the-hash, the account will show 4624 type 3 logons from a workstation that never logged in interactively.' A hypothesis you can disprove keeps the investigation honest.
- **5. Verify against a second source.** EDR says it, auth log confirms it, proxy explains it. One source is a lead; two are evidence.
- **6. Document as you go.** Timeline entries with timestamps (UTC!), queries run, and conclusions. The write-up you produce *during* is the only one that survives the week.

## Time is the backbone
Build the timeline first and update it continuously — every new fact gets a timestamp and a source. Anomalies reveal themselves as *sequences*: account created → new scheduled task → first outbound beacon. Individual events lie; sequences confess.

## The bias traps
- **Confirmation bias** — you found evil, stop looking. The scoping queries you skip are the ones that would have shown two more hosts.
- **Tool bias** — seeing only what your SIEM indexes. Ask what *isn't* logged and go read it.
- **Sunk cost** — 6 hours in, the trail is cold. Say so, document, move on. Closed-cold is a legitimate outcome.

## Field note
Keep a personal investigation template (entities, timeline, hypotheses, verdict). Reusing it makes your 20th investigation twice as fast as your 5th — and your handovers legendary.`,
  },
  "les-so-5-2": {
    intro:
      "IOCs are the fingerprints — a hash, an IP, a domain. TTPs are the behavior — how the attacker hunts, moves, and hides. Fingerprints wash off; behavior is identity. Knowing which to spend your detection budget on is the whole lesson.",
    body: `## Indicators of Compromise
- **What they are**: file hashes, malicious IPs and domains, registry keys, mutexes, certificate serials, JA3 fingerprints — concrete, machine-readable artifacts.
- **Strengths**: trivially automatable (blocklists, SIEM watchlists), instantly shareable (STIX/MISP), perfect for retro-hunting after a report drops.
- **The half-life problem**: IPs rotate in hours, domains change hands, hashes bypass with a single byte flip. An IOC list is perishable — every indicator needs a confidence score and an expiry date, or your blocklists become folklore.

## Tactics, Techniques, and Procedures
- **What they are**: *how* the adversary works — phishes with tailored lures referencing the target's industry, lateral movement via stolen service accounts, persistence through WMI event subscriptions.
- **Strengths**: durable for months to years (attacker habits outlive their infrastructure), and directly translatable into detections and hunt hypotheses (which is exactly the ATT&CK model).
- **The cost**: harder to detect — you are writing behavioral rules, not pasting hashes into a blocklist.

## The pyramid of pain (Bianco)
Read it bottom-up: hashes (trivial to change) → IPs → domains → network artifacts → tools → **TTPs** (painful for the adversary to change). Every step up costs the attacker more to evade. Your detection strategy should climb the pyramid as fast as your tooling allows.

## In practice
- Day one of a new campaign: block and hunt with the IOCs — buy immediate coverage.
- Day one and forever: extract the TTPs ('password spraying against OWA from residential proxies'), write the behavioral detection, add the hunt. That detection still fires when every IOC from the report is dead.

## Field note
When you read a threat report, force yourself to write one IOC-based query and one TTP-based hunt from it. The first finds last week's attack; the second finds the next one.`,
  },
  "les-so-6-2": {
    intro:
      "During an incident, information is ammunition — and stale or wrong information causes friendly fire. Communication protocols exist because the cost of silence and the cost of noise are both measured in bad decisions.",
    body: `## The channels and their rules
- **The war room (chat/bridge)** — one channel per incident, everything annotated with timestamps and UTC. If it isn't written there, it didn't happen.
- **The ticket** — the system of record: timeline, actions, evidence links, decisions with owners. The war room evaporates; the ticket survives for legal, insurance, and the post-mortem.
- **Management updates** — fixed cadence (hourly during a fire), fixed format: what we know, what we're doing, what we need, when the next update comes. No speculation in writing.
- **Executive/legal/PR** — needs-to-know and lawyer-approved language only. 'We are investigating a potential security event' is a sentence; 'we got hacked by APT-something' is a resignation letter.

## Who says what (roles beat improvisation)
- **Incident commander** — runs the response, assigns tasks, makes the contain-vs-observe call. Not necessarily the best analyst; the best coordinator.
- **Scribe** — owns the timeline. The most underrated role in the SOC; every post-mortem is only as good as the scribe was.
- **Analysts** — investigate, report findings to the channel with timestamps, don't talk to outsiders.
- **Liaison** — handles legal, comms, and external parties (ISAC, law enforcement, the vendor's IR team).

## The writing discipline
- Facts vs. hypotheses, always separated: 'EDR quarantined HOST-14 at 14:02Z' vs. 'likely initial access via the VPN account (unconfirmed)'.
- No blame in writing, ever. Every sentence may be read in a courtroom or a deposition — write like it.

## Field note
Join your next tabletop as the scribe and you will learn the whole incident's anatomy in three hours — who speaks, who decides, and where communication collapsed. Then make the timeline template better.`,
  },
  "les-so-7-2": {
    intro:
      "You cannot improve a SOC you only feel. Metrics replace vibes with trend lines — but a wrong metric optimizes the wrong behavior, so choosing them is a security decision in itself.",
    body: `## The metrics that matter
- **MTTD (mean time to detect)** — how long an intruder exists before you see them. The headline number; every day saved is breach cost avoided.
- **MTTR (mean time to respond/resolve)** — detection to containment. Split it further: triage time, containment time, recovery time — each phase can hide its own disaster.
- **False positive rate** — the silent killer. Above ~30% actionable-noise and analysts stop reading alerts; that's a detection outage wearing a green dashboard.
- **Coverage** — detections mapped to ATT&CK techniques actually firing in tests (purple-team validation), not just existing.
- **Escalation rate & quality** — what fraction of T1 escalations survive T2? High close-rate with low bounce-back means the triage engine works.

## The metrics that mislead
- **Alerts closed per day** — optimizes for closing, not for finding. Reward it and watch real alerts get closed 'as duplicate'.
- **Raw alert volume down** — could be tuning; could be blindness. Pair every volume metric with a coverage metric.
- **100% SLA compliance** — if the SLA is always met, the SLA is wrong.

## Instrumenting honestly
- Measure per-severity and per-attack-type, not just averages — averages hide the ransomware that took 9 days inside a sea of phishing at 4 hours.
- Trend over quarters, annotate the causes (new tooling, team change, new campaign). A metric without a story is a number; a metric with a story is an argument for budget.
- Report one page to leadership: MTTD/MTTR trend, top attack types, coverage gaps, and the single ask. Nobody funds a spreadsheet.

## Field note
Pick the three numbers your SOC would be embarrassed by — usually MTTD, FP rate, and one coverage gap — and improve exactly those for a quarter. Metrics work when they're few and uncomfortable.`,
  },
  "les-so-8-1": {
    intro:
      "Nobody hires a SOC analyst for the certificate alone — they hire the evidence that you think like one. A portfolio converts your labs into proof: this person investigates, documents, and improves.",
    body: `## What actually belongs in a SOC portfolio
- **A home lab write-up** — the architecture (hypervisor, network segmentation, what's onboarded), the detections you wrote, and — critically — *an investigation walkthrough*: one alert, end to end, with your pivots, hypotheses, and verdict. This is the single highest-value artifact.
- **Detection engineering evidence** — a few Sigma rules with the reasoning (what behavior, what data source, what false-positive profile, how you tested). Three well-reasoned rules beat thirty pasted from GitHub.
- **Threat-intel products** — a mock intel report: campaign summary, IOCs with confidence/expiry, TTPs mapped to ATT&CK, recommended detections. Shows you can close the intel-to-detection loop.
- **A purple-team log** — Atomic Red Team technique executed, detection result, tuning applied, re-test. Proves the validate-and-improve mindset.
- **The story of a fix** — 'SIEM was ingesting 40 GB/day of which 60% was debug spam; I built filters that cut cost 35% without losing a single useful event.' Cost awareness reads senior.

## Where to build it
- **DetectionLab / Safety Utility / Logging Essentials** style labs — pre-built but customizable.
- **TryHackMe SOC Level 1 / Blue Team Labs / CyberDefenders** — DFIR challenges with real artifacts; write up every one you finish, even the failed attempts with lessons.
- **Your own Windows VM + Sysmon + Elastic/Splunk free** — then attack it yourself (Atomic Red Team) and defend it. The full loop in miniature.

## How to present it
- Every artifact gets a short README: context → what you did → what you found → what you'd do next. Hiring managers skim; structure converts skims into interviews.
- Publish on a simple blog or GitHub Pages. A URL you can paste into an application beats a zip file.

## Field note
One deep, honest artifact — including what went wrong and what you'd fix — outperforms a wall of badges. Portfolios convince because they show judgment, and judgment only shows in the mistakes you chose to write about.`,
  },

  // ── Web Fundamentals ─────────────────────────────────────────
  "les-wf-1-2": {
    intro:
      "Semantic HTML is not decoration for pedants — it is the difference between a page that only humans can use and one that browsers, screen readers, and search engines all understand.",
    body: `## The structural skeleton every page deserves
\`\`\`html
<header>   → site identity, nav lives inside or alongside
<nav>      → major navigation blocks
<main>     → one per page; what the page is *for*
<article>  → self-contained content (a post, a product)
<section>  → thematic grouping, usually with a heading
<aside>    → tangential content (related links, ads)
<footer>   → meta info: copyright, contact, sitemap
\`\`\`
Choose by *meaning*, not by the box you want to draw — CSS does the drawing, the element declares the intent.

## Why the machine-readable structure pays
- **Accessibility**: screen-reader users navigate by landmarks ('jump to main') and headings ('list headings'). A \`<div>\` soup is an unreadable void to them; a heading hierarchy is a table of contents.
- **SEO**: crawlers weight \`<h1>..\`<h3>\`, \`<article>\`, and descriptive links. A div with font-size:32px is decoration; an h2 is structure.
- **Maintainability**: \`<nav>\` tells the next developer exactly what this block is. Six months later, semantic code is self-documenting code.

## The elements people still get wrong
- **Buttons vs. links** — \`<a href>\` navigates; \`<button>\` acts. A clickable div is neither: no keyboard focus, no semantics, no respect.
- **\`<button type="button">\` inside forms** — otherwise you've built an accidental submit.
- **\`alt\` text** — describes function for images ('Search'), empty (\`alt=""\`) for decoration. Never omit the attribute.
- **\`<label>\` for every input** — click-to-focus and screen-reader announcement in one tag; \`for\` must match the input's \`id\`.
- **Heading order** — one \`<h1>\`, no skipping levels; the outline should read like the page's executive summary.

## Field note
The keyboard test is the fastest audit: unplug the mouse, tab through your page. If focus disappears, if nothing announces where you are, semantics are broken — and so is your accessibility, SEO, and half your users' experience, all for one div's worth of laziness.`,
  },
  "les-wf-2-2": {
    intro:
      "Flexbox lays out along one axis; Grid lays out in two. Almost every 'CSS is impossible' moment is actually 'I used the wrong tool' — pick by dimension and layout stops being a fight.",
    body: `## Flexbox: one dimension at a time
\`\`\`css
.toolbar {
  display: flex;
  justify-content: space-between; /* main axis distribution */
  align-items: center;            /* cross axis alignment */
  gap: 1rem;
}
.sidebar { flex: 0 0 240px; }  /* don't grow, don't shrink, 240px */
.content { flex: 1; }          /* take the remaining space */
\`\`\`
- **Main axis** follows \`flex-direction\` (row or column); \`justify-content\` distributes along it, \`align-items\` across it.
- **flex-grow / flex-shrink / flex-basis** — the three numbers behind every \`flex:\` shorthand. \`flex: 1\` = grow to fill; \`flex: 0 0 auto\` = exactly my content size.
- Perfect for toolbars, nav rows, button groups, media objects — anything that is *a line of things*.

## Grid: rows and columns, declared up front
\`\`\`css
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1rem;
}
.layout {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main";
  grid-template-columns: 240px 1fr;
}
\`\`\`
- \`repeat(auto-fill, minmax(...))\` is responsive cards without a single media query — the single highest-value line in modern CSS.
- **Named areas** turn the layout into a diagram you can read aloud. Rearranging for mobile becomes re-typing the areas map.
- Perfect for page layouts, card grids, dashboards — anything that is *a plane of things*.

## Choosing in five seconds
- One axis of content that should size itself → **flex**.
- Both dimensions matter and items should land in cells → **grid**.
- They compose: grid for the page, flex for each card's internals. That combination solves 95% of layouts.

## War story habit
Centering a div is the rite of passage: \`display: grid; place-items: center;\` on the parent — one line, done. If you're writing negative margins in 2026, you're paying interest on old habits.`,
  },
  "les-wf-3-2": {
    intro:
      "The DOM is the live data structure behind every page. Manipulating it well means knowing the query APIs, the event model, and — above all — when not to touch the DOM at all.",
    body: `## Selecting and changing
\`\`\`js
const btn = document.querySelector('#submit');     // first match, CSS selector
const rows = document.querySelectorAll('.row');    // all matches (static NodeList)
btn.textContent = 'Saved';                          // text — safe, no parsing
el.insertAdjacentHTML('beforeend', html);           // parses HTML — see XSS below
el.classList.add('is-open');                        // class toggling
el.setAttribute('aria-expanded', 'true');           // attributes
el.remove();
\`\`\`
- **\`textContent\` vs \`innerHTML\`**: textContent inserts characters; innerHTML parses and executes markup. Reaching for innerHTML with user data is how XSS begins.
- \`querySelectorAll\` returns a static list — if you add elements after querying, re-query.

## Events: the model that scales
\`\`\`js
document.querySelector('#list').addEventListener('click', (e) => {
  const item = e.target.closest('.item');
  if (!item) return;
  openItem(item.dataset.id);
});
\`\`\`
- **Event delegation** — one listener on the parent catches events from all children, present and future. Ten thousand rows, one listener; rows added later are covered automatically.
- **\`e.target\` vs \`e.currentTarget\`** — the element clicked vs. the element the listener is attached to. \`closest()\` bridges them.
- \`{ once: true }\`, \`{ passive: true }\` (for scroll perf), and \`AbortController\` for bulk removal — the modern cleanup kit.

## Batch your changes (reflow is expensive)
- Reading layout (\`offsetHeight\`, \`getBoundingClientRect\`) forces the browser to recalculate — alternate reads and writes and you reflow per element. Batch reads, then batch writes.
- Build once with a fragment, insert once:
\`\`\`js
const frag = document.createDocumentFragment();
for (const item of items) frag.appendChild(renderRow(item));
list.appendChild(frag); // one reflow, not 500
\`\`\`

## The framework lens
React's whole value proposition is that you declare *what the DOM should be* and it diffs the updates — you never write this code by hand. But every framework leaks eventually, and when the profiler says 'DOM thrash', the engineer who knows \`createElement\` from \`innerHTML\` fixes it in minutes.`,
  },
  "les-wf-5-2": {
    intro:
      "XSS and CSRF are the two classic web attacks every developer must be able to explain — one runs code in your user's browser, the other makes your server do things the user never asked.",
    body: `## XSS: untrusted data becomes code
- **Reflected** — the payload arrives in the request (\`?q=<script>...\`) and the server echoes it into the page. Needs a victim to click the crafted link.
- **Stored** — the payload is persisted (comment, profile field) and served to *every* viewer. The deadliest form: one post, thousands of victims.
- **DOM-based** — client JS itself injects unsanitized data into the page (\`element.innerHTML = location.hash...\`). Never touches the server.

What it buys the attacker: session cookies, keylogging, fake login forms, requests as the victim. It defeats 'same origin' from the inside.

## The layered defense
1. **Escape by default** — every templating framework that auto-escapes (React JSX, Jinja2, ERB) exists because manual escaping fails. Treat any \`dangerouslySetInnerHTML\`-style escape hatch as a code-review alarm.
2. **CSP** — \`Content-Security-Policy: script-src 'self'\` blocks inline and third-party script even when escaping slips. Nonces make it strict; report-only mode makes rollout safe.
3. **HttpOnly cookies** — session cookies invisible to \`document.cookie\`, so token theft fails even after an XSS.
4. **Sanitize only what must be HTML** — a library (DOMPurify), allowlist-based, never a regex you wrote.

## CSRF: your server trusts the browser too much
The browser attaches cookies to *every* request to your site — including the one a malicious site just forged:\n\`\`\`html
<img src="https://bank.example/transfer?to=attacker&amount=1000">
\`\`\`
That's a valid, authenticated, cookie-carrying GET. The user never saw anything.

## The defense set
- **CSRF tokens** — a random value the attacker's site cannot read (same-origin policy), verified server-side on state-changing requests.
- **SameSite cookies** — \`Set-Cookie: ...; SameSite=Lax\` (now the default) keeps cookies off cross-site requests, killing most CSRF at the cookie layer.
- **Require POST for everything state-changing** — GETs get preloaded by link scanners and image tags; never mutate on GET.
- **Re-authenticate high-risk actions** — password/OTP for transfers and email changes.

## Field note
The pair in one sentence: XSS makes *your site* run the attacker's code; CSRF makes *the user's browser* send the attacker's request. Defend XSS at output-encoding and CSP; defend CSRF at request-verification and cookie policy. Confusing the two in an interview is the classic junior tell.`,
  },
  // ── React Frontend ───────────────────────────────────────────
  "les-rf-2-3": {
    intro:
      "Context solves one specific problem: values that many components need but no component should pass through twenty levels of props. It is a broadcast mechanism, not a state manager — knowing that distinction is what keeps Context from being misused.",
    body: `## The three-piece pattern
\`\`\`tsx
// 1. Create (typically in its own file)
const ThemeContext = createContext<Theme>('light');

// 2. Provide — high in the tree, the value everyone sees
<ThemeContext.Provider value={theme}>
  <App />
</ThemeContext.Provider>

// 3. Consume — at any depth, no prop drilling
const theme = useContext(ThemeContext);
\`\`\`

## The two rules that prevent every Context bug
- **The provider's \`value\` must be stable.** \`value={{ theme, setTheme }}\` builds a new object every render, so every consumer re-renders every time. Wrap it: \`const value = useMemo(() => ({ theme, setTheme }), [theme])\`. This one habit is the difference between Context that scales and Context that murders performance.
- **Separate state from dispatch.** Two contexts (state + setter) means components that only *change* the theme don't re-render when it *changes*. Same trick as useReducer + context for the dispatch-only pattern.

## A custom provider makes it clean
\`\`\`tsx
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const value = useMemo(() => ({ theme, setTheme }), [theme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
\`\`\`
Consumers call \`useTheme()\` — the context object stays internal, the API stays honest, and swapping the implementation later touches one file.

## When NOT to reach for Context
- Frequently-changing, high-frequency state (keystrokes, cursor, animation values) — context broadcasts to the whole subtree; a store (Zustand, Jotai) or plain lifting is cheaper.
- Server data — a query library (TanStack Query) with caching beats hand-rolled context providers.
- Prop drilling that's only 1–2 levels deep — drilling is often *clearer* than an implicit global.

Context is for genuinely ambient data: theme, locale, auth user, feature flags. If it isn't ambient, it's a job for component state.

## Field note
In interviews, the senior answer to 'why is my Context making everything re-render?' is the stable-\`value\` rule plus state/dispatch separation — cite those two and the conversation goes your way.`,
  },
  "les-rf-4-2": {
    intro:
      "Client-side form validation exists to make forms fast and kind; server-side validation exists because the client is a liar. Zod lets you write the schema once and use it on both sides — one source of truth for what 'valid' means.",
    body: `## The schema-first loop
\`\`\`ts
const Signup = z.object({
  email: z.string().email(),
  age: z.number().int().min(18).max(120),
  password: z.string().min(12),
});
type Signup = z.infer<typeof Signup>;   // the TS type, derived

const result = Signup.safeParse(formData);
if (!result.success) showErrors(result.error.flatten());
\`\`\`
- **\`safeParse\` returns a result object** instead of throwing — branch on it; never let the schema throw at your users.
- **\`z.infer\`** is the quiet superpower: change the schema and the TypeScript type follows. Type and validation can never drift apart.

## Messages and refinement
\`\`\`ts
z.string().min(12, 'Use at least 12 characters')
z.object({...}).refine(d => d.password !== d.email, {
  message: 'Password must differ from email', path: ['password'],
})
\`\`\`
Write messages as UX copy ('Use at least 12 characters'), not as developer complaints. \`.refine\` for cross-field rules; \`.superRefine\` when you need to add errors to several fields at once.

## Where each layer validates
- **On submit (schema, full)** — the gate. Nothing enters state or API calls unvalidated.
- **On blur/change (per-field)** — instant feedback without scolding an unfinished form. Validate the touched field only.
- **On the server (always, again)** — the client can be bypassed with curl in three seconds. Same schema shared via a package — the whole point of schema-first.

## Pair with a form library
Zod parses; **react-hook-form** manages focus, dirty state, and registration. RHF's zodResolver plugs the schema in and you get uncontrolled-input performance with declarative validation — the standard modern pairing.

## Field note
Security framing for interviews: client validation is UX; server validation is security. Zod's contribution is that both layers speak the identical schema, so 'we validated it in the UI' stops being an argument anyone can make.`,
  },
  "les-rf-7-2": {
    intro:
      "Generics let a component or function work with a type it discovers at call time — the difference between a util that works on strings and one that works on *your* data. They are how libraries stay flexible without surrendering type safety.",
    body: `## The mental model: type parameters as function arguments
\`\`\`ts
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}
first([1, 2, 3]);        // T = number → returns number | undefined
first(['a']);            // T = string
\`\`\`
\`<T>\` is a placeholder the caller fills. TypeScript infers it from the arguments — you rarely write it explicitly.

## Generic components: the list that stays typed
\`\`\`tsx
interface ListProps<T> {
  items: T[];
  render: (item: T) => React.ReactNode;
  keyOf: (item: T) => string;
}
function List<T>({ items, render, keyOf }: ListProps<T>) {
  return <>{items.map(i => <div key={keyOf(i)}>{render(i)}</div>)}</>;
}
\`\`\`
Call \`<List items={users} render={u => u.name} .../>\` and \`u\` is fully typed as \`User\` — autocomplete, refactoring safety, and zero \`any\`. Extending an HTML element's props (\`interface ButtonProps extends React.ComponentProps<'button'>\`) is the other everyday generic win.

## Constraints: \`extends\` keeps the generic honest
\`\`\`ts
function pluck<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
pluck(user, 'email');  // OK
pluck(user, 'emial');  // compile error — K must be a key of T
\`\`\`
Without \`K extends keyof T\`, \`pluck\` would accept anything and return \`any\`-ish mush. Constraints turn 'some type' into 'some type with *these* capabilities'.

## Defaults and the standard library
- \`interface Response<T = unknown> { data: T; status: number }\` — defaults let callers ignore the parameter when they don't care.
- You already use generics daily: \`useState<User>()\`, \`Array<T>\`, \`Promise<T>\`, \`Record<K, V>\`. Reading library source with generics in mind suddenly makes the docs click.

## Field note
The refactor that sells generics: find every \`any\`-typed util in the codebase and give it one type parameter with a constraint where it helps. Same runtime code, and every call site gets compile-time checking — the cheapest quality win in TypeScript.`,
  },

  // ── Node Backend ─────────────────────────────────────────────
  "les-nb-3-2": {
    intro:
      "RBAC answers 'who may do what' with three nouns — users, roles, permissions — instead of per-user rules that metastasize. Get the model right and access reviews become reading, not archaeology.",
    body: `## The three nouns
- **Permission** — the atom: 'orders:read', 'orders:cancel'. Always verb on resource, never 'access to page X'.
- **Role** — a named bundle of permissions ('support-agent' = read orders + refund small amounts). Users hold roles, never raw permissions.
- **Assignment** — user → role, ideally with scope: 'support-agent *in region west*'. Scope is what keeps role explosion manageable.

## Enforcement belongs in middleware
\`\`\`js
function requirePerm(perm) {
  return (req, res, next) => {
    if (!req.user?.perms?.includes(perm)) return res.status(403).json({ error: 'forbidden' });
    next();
  }
}
router.delete('/orders/:id', requirePerm('orders:cancel'), handler);
\`\`\`
- Authorize on the **server for every route** — client-side hiding is UX, not security; curl bypasses the UI, not your middleware.
- Check permissions, not role names: \`if (role === 'admin')\` is the single hardest thing to unwind later.
- **Deny by default**: absence of permission = 403. There is no 'allow unless forbidden'.

## The failure modes to design out
- **Role explosion** — 400 roles means nobody knows what any of them mean. Fix: permission granularity + few roles + scope, not more roles.
- **Privilege creep** — users accumulate roles like barnacles. Fix: time-boxed grants (access expires unless renewed) and quarterly reviews driven by the permission list, not the org chart.
- **Broken-object-level checks** — the user has 'orders:read'… but that order belongs to someone else. Authorization is two questions: *can you do this?* and *is this object yours/your scope?* (OWASP API1 — BOLA — lives exactly here.)

## Field note
When you inherit a system where every route answers 'what does admin do here?', propose the migration in layers: permissions first (as constants), middleware second, roles as bundles last. Nobody grants a rewrite; everybody grants one route at a time.`,
  },
  "les-nb-4-2": {
    intro:
      "Every input is hostile until proven otherwise — including your own database's output, headers, and URL params. Validation decides what you accept; sanitization decides how you store and emit it. Skipping either is how injection survives into 2026.",
    body: `## Validate: define the shape of truth
\`\`\`js
const schema = z.object({
  email: z.string().email(),
  page: z.coerce.number().int().min(1).max(1000),
  role: z.enum(['user', 'admin']),
});
const input = schema.safeParse(req.body);
if (!input.success) return res.status(400).json(input.error.flatten());
\`\`\`
- **Allowlist, never blocklist** — define what's allowed; everything else 400s. Blocklists age instantly.
- Validate **everything that crosses a trust boundary**: body, query, params, headers, webhook payloads, and — the forgotten one — data read back from your own DB or a third-party API.
- **Coerce types explicitly** (\`z.coerce\`): querystrings arrive as strings; '12' and 12 must be told apart *on purpose*.

## Sanitize/escape per sink, not globally
There is no universal sanitizer; there is context-correct encoding:
- **SQL** — parameterized queries / ORM. Never string-concatenate, even after 'validation'. This is the only real SQLi defense.
- **HTML** — escape on output; sanitize (DOMPurify) only fields that legitimately hold rich text.
- **Shell** — avoid spawning shells; if unavoidable, \`execFile\` with an **array of args** — never a concatenated command string.
- **Filenames/paths** — basename() and path normalization; \`../../etc/passwd\` in an upload name is path traversal, and 'we validated the extension' is not a defense.

## The classic Node mistakes
- \`JSON.parse\` without try/catch (a 500 for every malformed body).
- Trusting \`Content-Length\` and parsing multi-GB bodies — size-limit middleware exists for a reason.
- Logging the validated input verbatim: password fields and tokens end up in your SIEM. Scrub at the boundary.

## Field note
'Validate early, sanitize at the sink, encode at output' — say that sentence and then actually wire the same schema (shared with the frontend) into one route. One honest endpoint beats a slide deck on secure coding.`,
  },
  "les-nb-5-2": {
    intro:
      "CI/CD is where code becomes a product: automated checks on every push, one-command deploys, and a rollback plan you've actually tested. On Node servers the failure modes are boring and preventable — which is exactly why they're worth learning once, properly.",
    body: `## The pipeline that earns its keep
- **Lint + typecheck + tests** on every push; block merges on red. Speed matters — a 20-minute CI trains people to merge blind.
- **Build artifacts, not snowflake servers**: one command produces the same artifact everywhere. Never npm-install on the production box.
- **Deploy = promote artifact + run migrations + reload service**. Keep the steps separate so a failure says *which* step failed.
- **Rollback is a feature**: keep N previous artifacts and a tested one-command revert. Untested rollback is a bedtime story.

## Environment discipline
- Configuration through **environment variables** (12-factor); secrets from a vault or secret store — never in the repo, never in the bundle, never in a screenshot.
- Keep **dev ≈ prod**: same Node major version (pin via .nvmrc / engines), same dependency lockfile, containers if containers are what runs.

## The Node-specific gotchas
- **npm ci, not npm install** in CI — installs exactly the lockfile, fails if they disagree.
- **Process management** — never run the app raw in a shell over SSH. PM2 or systemd (Restart=always) plus log capture; the person who deploys by \`ssh + node app.js\` owns every 3 AM crash personally.
- **Zero-downtime basics**: graceful shutdown (handle SIGTERM, finish in-flight requests), health checks the platform can watch, and cluster mode or platform replicas so one restart isn't an outage.
- **Migrations** — forward-only, additive-first (add column → backfill → switch reads → drop later). A migration that locks the main table on Friday evening is a war story you don't want.

## Field note
The metric that tells you your pipeline is real: how long does a rollback take? If the answer is 'check out the old commit and click deploy', you have a pipeline. If it's 'well, it depends…', you have a ritual.`,
  },

  // ── Fullstack Capstone ───────────────────────────────────────
  "les-fc-1-2": {
    intro:
      "Architecture is the set of decisions that are expensive to reverse. A full-stack capstone is where you make your first ones on purpose — and the skill that matters is choosing the simplest structure that survives your actual requirements.",
    body: `## The decision inventory (what you're actually choosing)
- **Monolith or services?** Default to a **modular monolith**: one deployable, internal modules with explicit boundaries (auth, orders, billing). Microservices before you have scaling pain or team pain is distributed complexity for free.
- **Where does logic live?** A three-layer shape keeps it honest: **routes** (HTTP in/out, no logic) → **services** (business rules, framework-free) → **data** (queries, models). Route handlers that contain business logic are the technical debt that never sleeps.
- **Client state vs server state**: the client owns UI state; the server owns truth. Reaching for Redux to cache API responses is the classic over-architecture — a query library does that job better.
- **Auth shape**: sessions (cookie) for server-rendered apps, tokens for API-only — decided *before* any route is written, because everything threads through it.

## Draw the seams, not the boxes
A useful capstone diagram has five boxes and their contracts:
\`\`\`
[Browser SPA] --HTTP/JSON--> [API server] --> [DB]
                                 |--> [queue] --> [worker]
                                 |--> [object storage]
\`\`\`
What matters is what crosses each arrow (schemas, auth, failure modes), not the boxes' colors. Contracts first; the code follows.

## Design for the requirements you have
- 1k users and one team: one server, one DB, managed hosting, backups tested. You will never miss the microservices you didn't build.
- Real-time needed *for one feature* (notifications): add WebSocket/SSE for that feature — don't reshape the architecture around it.
- Compliance or cost pressure arrives later: that's when you extract a service — deliberately, with a seam that already exists because your modules were honest.

## Field note
Interviewers ask 'how would you structure it?' to hear two things: that you default simple, and that you know which boundaries you'd add *first* under load. 'Modular monolith, clean seams, extract when the pain is real' is the answer of someone who has carried a pager.`,
  },

  // ── Cloud Foundations ────────────────────────────────────────
  "les-cfnd-1-2": {
    intro:
      "IaaS, PaaS, and SaaS answer one question differently: *which parts of the stack does the provider manage?* Choose right and your team spends its time on the product; choose wrong and you're patching operating systems nobody pays you to patch.",
    body: `## The ladder of responsibility
- **On-prem** — you manage everything from the building's power upward. Maximum control, maximum toil.
- **IaaS** (EC2, Azure VMs, Compute Engine) — provider manages hardware, virtualization; **you** manage OS, patching, network ACLs, runtime, app. You've rented a computer, not a product.
- **PaaS** (App Runner, Heroku, App Service) — provider manages OS and runtime; you bring **code and config**. Deploys become git push; scaling is a slider.
- **SaaS** (Gmail, Salesforce, the academy you're using) — provider manages everything; you configure users and settings, and you still own your **data and access decisions**.

## The security split (shared responsibility)
- The rule: the provider is always responsible for **security *of* the cloud** (hypervisor, physical); you are always responsible for **security *in* the cloud** (data, IAM, application config) — at every level.
- What shifts up the ladder is the **patching** layer: at IaaS you patch the OS; at PaaS the provider does. Everything about *your* code and *your* permissions stays yours at every rung — most cloud breaches are IAM misconfigurations, which no service model fixes for you.

## Choosing, honestly
- **IaaS** when you need OS-level control: custom runtimes, legacy binaries, specific compliance baselines. You inherit patching forever.
- **PaaS** for most web apps and APIs — fastest path to production, less to secure, and the scaling story is handled. The default worth arguing against.
- **SaaS** for problems that are somebody's core product — never build your own email system.

The hidden costs: IaaS bills by the hour whether you use it or not (learn to right-size or FinOps will find you); PaaS bills at scale can surprise; SaaS locks your data behind an export format you should test *before* you need it.

## Field note
When a job posting says 'cloud experience', the real question is: at which rung, and do you know what remained *your* responsibility there? Answering that precisely is the difference between cloud-literate and cloud-buzzword.`,
  },
  "les-cfnd-2-2": {
    intro:
      "A VPC is your private slice of the cloud — an address space you divide into subnets and defend with route tables and security groups. Cloud networking is the same networking you just learned, plus one new discipline: everything is software, so every mistake is reproducible.",
    body: `## The anatomy
- **VPC** — a private CIDR block that is yours alone (e.g. 10.0.0.0/16 — 65,536 addresses). Choose ranges deliberately; overlapping CIDRs make peering impossible and migrations miserable.
- **Subnets** — subdivisions, each pinned to one availability zone. **Public** = route to an internet gateway; **private** = no direct internet path. The single most important habit: things that don't need public IPs shouldn't have them.
- **Route tables** — decide where each CIDR's packets go: local, IGW, NAT gateway, peering connection.
- **Security groups** — stateful firewalls on instances (allow *in* on 443 from the ALB SG); **NACLs** — stateless, subnet-wide, numbered rules. SG for allowlists; NACL for explicit denies.
- **NAT gateway** — lets private subnets *reach out* (patches, API calls) without being reachable. Sitting in a public subnet, it's the price of private egress.

## The reference design you'll build in every cloud
\`\`\`
VPC 10.0.0.0/16
├── public  subnets  (2 AZs): ALB, NAT gateway, bastion
└── private subnets (2 AZs): app instances, DBs
\`\`\`
- Traffic path: internet → ALB (public) → app (private) → DB (private, SG allowing only the app SG on 5432). Nothing in the data path is directly internet-reachable.
- **Two AZs minimum** — one AZ is one blast radius; an AZ outage is an *availability* event, not an architecture failure.

## The mistakes that make headlines
- S3/RDS on the public internet 'temporarily' — the default answer is no, and the temporary becomes permanent.
- 0.0.0.0/0 in a security group on a database port — 'we trusted the VPC' is what the incident report says.
- One AZ, one subnet — the outage teaches redundancy a month after it was cheap.

## Field note
Draw your VPC on paper before creating anything. If data has to cross the internet edge to reach your own database, the design is wrong — and paper is where that's cheapest to discover.`,
  },
  "les-cfnd-4-2": {
    intro:
      "Cloud security fails in the same three places everywhere: identity, exposure, and keys. The services are different per provider; the failure patterns are identical — which is why the principles transfer across AWS, Azure, and GCP without translation.",
    body: `## Principle 1 — Identity is the perimeter
- **Least privilege with real policy**: every identity (user, role, service account) gets the minimum API surface. 'AdministratorAccess for convenience' is how cloud incidents start.
- **Roles over long-lived keys**: humans federate through SSO; machines assume roles/managed identities. A 90-day access key is a breach with an expiry date.
- **MFA on anything human**, and on the root/break-glass accounts *especially* — they bypass everything else you've configured.

## Principle 2 — Exposure is the enemy (know what the internet can reach)
- Inventory continuously: buckets, load balancers, ports, storage accounts. The breach pattern is never 'sophisticated APT'; it's 'S3 bucket made public for a demo in March'.
- **Block public access at the account level**, not per-bucket — defaults should make the safe path the lazy path.
- Encryption **default-on** at rest (KMS/managed keys) and in transit; then verify with config audits, because 'we enabled it' and 'it's still on' are different claims.

## Principle 3 — Detect continuously
- **CloudTrail / Activity Logs / Audit Logs on, multi-region, to immutable storage** — the account's flight recorder. You cannot investigate what you didn't record.
- GuardDuty/Defender/SCC-style anomaly detection on top of the logs; budget alerts (the *other* kind of cloud incident is a crypto-mining bill).
- **IaC scanning** in the pipeline — the misconfiguration that never merges is the cheapest one.

## The exam-and-interview synthesis
Almost every cloud security question reduces to: *who can do what from where, and how do you know?* Identity (who/what), authorization policies (what), network exposure (where), logging (how you know). Answer in that order and you sound like someone who has run a cloud environment.

## Field note
Run one hour of 'assume breach' on your own project: list every identity and every public exposure, then cut each by half. What survives that exercise is your actual security posture — everything else was wishful config.`,
  },
  // ── Terraform ────────────────────────────────────────────────
  "les-tf-1-2": {
    intro:
      "Terraform lets you describe infrastructure as code and turns 'please provision a database' from a ticket into a code review. The workflow — write, plan, apply — is simple; the discipline around state is what separates professionals from demo videos.",
    body: `## HCL in five minutes
\`\`\`hcl
resource "aws_s3_bucket" "logs" {
  bucket = "acme-prod-audit-logs"
  tags   = { Owner = "platform", Env = "prod" }
}

variable "environment" {
  type    = string
  default = "dev"
}

output "bucket_arn" {
  value = aws_s3_bucket.logs.arn
}
\`\`\`
- **Blocks** (resource, variable, output, provider) with **arguments**; \`.\` references wire resources together — that dependency graph is what Terraform walks when planning.
- **Variables** parameterize modules; **outputs** publish values (a bucket ARN, an IP) to callers and to your own scripts.
- **Expressions**: \`count\` and \`for_each\` to replicate, \`condition ? a : b\` for choices, \`local.X\` for computed constants.

## The workflow, in order
1. **Write** — edit \`.tf\` files in a module; never hand-edit cloud resources that Terraform owns (drift is a lie you tell the plan).
2. **terraform init** — downloads providers, configures the backend. First command in any new workspace.
3. **terraform plan** — the dry run: \`+ create\`, \`- destroy\`, \`~ update\`, \`-/+ replace\`. **Read it like a contract** — this is your last chance to catch the replace that drops a database.
4. **terraform apply** — executes the plan; state updates. In teams, apply runs from CI with a reviewed plan artifact, never from a laptop.
5. **destroy** — the same graph, reversed. The power that makes IaC honest.

## State: the file that is the truth
- Terraform maps config → real resources via **state**. Lose it and Terraform sees orphaned infrastructure it doesn't remember creating.
- **Remote backend from day one** (S3 + DynamoDB locking, Terraform Cloud): local state is unshareable and unversioned.
- State contains secrets in plaintext — the backend bucket must be encrypted with tight access, and sensitive outputs marked \`sensitive\`.

## Field note
The interview staple — 'what happens if two engineers apply at once?' — has a one-word answer (locking) and a one-paragraph proof you've seen the alternative. Tell the story of the concurrent apply that duplicated a NAT gateway and cost $300/month for a year.`,
  },
  "les-tf-2-2": {
    intro:
      "Resources create infrastructure; data sources *read* it. Expressions are the glue — and mastering the handful of them (for_each, for expressions, locals, conditionals) is the difference between copy-pasted blocks and code that adapts to its environment.",
    body: `## Data sources: reference what you didn't create
\`\`\`hcl
data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"]
  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/*"]
  }
}

resource "aws_instance" "app" {
  ami           = data.aws_ami.ubuntu.id   # read, not owned
  instance_type = "t3.micro"
}
\`\`\`
- Use a **data source** when the thing exists outside your stack (an AMI, the account ID, an existing VPC). Use a **resource** when Terraform owns its lifecycle. Confusing them means plan-time surprises when someone else deletes the object.
- Data sources make modules **reusable across accounts and regions** — the module asks the environment instead of hardcoding it.

## for_each over count (almost always)
\`\`\`hcl
resource "aws_subnet" "priv" {
  for_each             = { for az in var.azs : az => az }
  availability_zone    = each.key
  cidr_block           = cidrsubnet(var.vpc_cidr, 4, index(var.azs, each.key) + 8)
}
\`\`\`
- \`count\` identifies instances by *index* — remove item 2 of a list and items 2..n get destroyed and recreated. \`for_each\` keys by identity; removals touch only the removed key. The rule: \`for_each\` unless you have a reason.

## For expressions: transformations without glue code
\`\`\`hcl
[ for u in var.users : "\${u.name}@acme.com" ]          # map a list
{ for k, v in var.tags : k => upper(v) if k != "Name" } # filter + transform
\`\`\`
One expression replaces a helper script; conditions (\`if\`) trim the data inline.

## Locals: name your intent
\`\`\`hcl
locals {
  name_prefix = "\${var.project}-\${var.env}"
  common_tags = { Project = var.project, Env = var.env, ManagedBy = "terraform" }
}
\`\`\`
Locals compute once, document reasoning, and keep resource blocks readable — the difference between \`local.name_prefix\` and a five-way \`format()\` pasted into every resource.

## Field note
The refactor that proves fluency: take a module using \`count\` + copy-pasted tags and rebuild it with \`for_each\` + \`locals\` + a data source. Plan output shows *no changes* — that's the trick: big readability win, zero infrastructure churn.`,
  },

  // ── Containers ───────────────────────────────────────────────
  "les-ct-1-2": {
    intro:
      "An image is an immutable, layered snapshot of a filesystem plus metadata; a container is a running process wearing that snapshot. The Dockerfile is the recipe — and small, well-layered recipes are faster to build, ship, and attack-proof.",
    body: `## Layers: the machinery behind the magic
- Each instruction (**FROM, COPY, RUN**) creates a layer. Layers **cache**: rebuild after changing line 10 and lines 1–9 come back instantly.
- Consequences: order matters — least-frequently-changing instructions first. \`COPY package.json\` → \`npm ci\` → \`COPY . .\` means a source edit skips reinstalling dependencies.
- Layers are additive: deleting a file in a later layer doesn't shrink the image (the file lives in an earlier layer). Secrets in an early layer ship forever — \`RUN curl secret\` is a breach finding.

## A Dockerfile worth shipping
\`\`\`dockerfile
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
USER node
CMD ["node", "dist/server.js"]
\`\`\`
- **Multi-stage**: the build toolchain (dev deps, compilers) never ships — the final stage copies artifacts only. Half the image size, half the CVE surface.
- **Pin your base** (\`node:22-alpine\`, digest-pinned in production) — \`latest\` is a roulette wheel.
- **Non-root USER** — the container that gets exploited shouldn't be root inside itself.

## The command people misread
\`CMD ["node", "server.js"]\` (exec form) runs node as PID 1 and receives signals properly; \`CMD node server.js\` (shell form) wraps it in \`/bin/sh -c\`, and your container then ignores SIGTERM — which is why graceful shutdowns mysteriously fail. Use exec form and an \`ENTRYPOINT\` for the binary, \`CMD\` for its default args.

## Field note
\`docker image inspect\` + \`docker history\` on any image shows its layers like an X-ray. Reading those two outputs on your own images — asking 'why is this layer here, and does it contain what I think?' — is the fastest self-taught lesson in container hygiene.`,
  },
  "les-ct-3-2": {
    intro:
      "Kubernetes vocabulary collapses into three nouns: a Pod runs containers, a Deployment keeps the desired number of Pods alive and updated, a Service gives the ever-changing Pods a stable address. Master the trio and the rest of the API makes sense.",
    body: `## Pod: the smallest deployable unit
- One or more containers sharing network (one IP) and storage volumes. Usually **one container per pod**; sidecars (log shippers, proxies) are the exception that proves the rule.
- Pods are **cattle, not pets**: rescheduled, replaced, ephemeral. Never store state in a pod; never 'ssh in and fix it' — the fix dies with the pod.

## Deployment: the self-healing replica manager
\`\`\`yaml
apiVersion: apps/v1
kind: Deployment
spec:
  replicas: 3
  selector: { matchLabels: { app: api } }
  template:
    metadata: { labels: { app: api } }
    spec:
      containers:
        - name: api
          image: registry/acme/api:1.4.2
          readinessProbe: { httpGet: { path: /healthz, port: 8080 } }
\`\`\`
- Declares **desired state**; the controller reconciles reality to it — pod dies, new one spawns. That loop is the 'self-healing' everything brags about.
- **Rolling update** by default: new ReplicaSet ramps up while old ramps down; \`rollout undo\` is your rollback. The **image tag** is the release — \`:latest\` in a Deployment is how you lose track of what's running.
- **Probes**: readiness ('can serve traffic yet?') gates the Service; liveness ('wedged? restart me') self-heals. A missing readiness probe is how new pods receive traffic they can't handle.

## Service: a stable name for unstable pods
- Pod IPs change every reschedule — the Service watches the label selector (\`app: api\`) and load-balances to current members. ClusterIP (internal), NodePort/LB (external entry), and the DNS name \`api.ns.svc.cluster.local\` that apps call.
- Ingress (or Gateway API) sits in front for HTTP routing/TLS per host — Service for the plumbing, Ingress for the front door.

## Field note
Debug flow every operator memorizes: \`kubectl get pods\` (status?) → \`kubectl describe pod\` (events: ImagePullBackOff? CrashLoopBackOff?) → \`kubectl logs --previous\` (why it died). Three commands resolve 80% of 'Kubernetes is broken' — and explaining them calmly is a live interview exercise.`,
  },

  // ── DevOps Pipeline ──────────────────────────────────────────
  "les-do-1-2": {
    intro:
      "CAMS is the DevOps worldview in four letters: Culture, Automation, Measurement, Sharing. Tools are the visible part; the movement stuck because it fixed how teams behave — and every framework since is a remix of these four.",
    body: `## Culture: the hard part wearing a soft name
- **You build it, you run it** — the dev/ops wall ('works on my machine, dies in production, not my problem') is the failure CAMS was named to fix. Teams that own their code to production write different code.
- **Blameless post-mortems** — incidents produce fixes, not culprits. The moment the first post-mortem names a person, incident reporting dies and with it your early-warning system.
- Small batches, trunk-based flow, reversible changes — culture shows up as *deployment habits*, not posters.

## Automation: the engine
- Anything done twice by hand becomes a script; anything on a runbook becomes a pipeline. CI/CD, IaC, automated tests, auto-scaling, self-service environments.
- The real payoff is **consistency**: automation makes the 200th deployment identical to the first, and identical systems are debuggable systems.
- Automate the *rollback* too — a deploy you can't reverse automatically isn't automated, it's gambling.

## Measurement: the feedback loop
- The four keys (DORA): **deployment frequency, lead time for changes, change failure rate, MTTR**. They measure flow and stability together — optimizing one at the other's expense isn't DevOps, it's corner-cutting.
- Instrument everything: CI duration, error rates, p99 latency, toil hours. What the team sees, the team improves.

## Sharing: the multiplier
- Dashboards, runbooks, and post-mortems are public by default; knowledge lives in the team, not in one person's terminal history.
- Blameless + shared means juniors ship on day one with a safety net — the retention argument that convinces CFOs.

## Field note
In interviews, 'what is DevOps?' should never be answered with a tool. Try: 'Culture, Automation, Measurement, Sharing — the tooling serves those.' Then give one concrete example of a wall you removed and what the metrics did next. That answer gets remembered.`,
  },
  // ── Threat Intelligence (expanded) ─────────────────────────
  "l-ti-1-1": {
    intro:
      "Threat intelligence is evidence about adversaries, produced on purpose: collected, processed, analyzed, and delivered to someone who acts on it. Without the 'acted on' part it's a news feed — the discipline lives in the cycle.",
    body: `## The intelligence cycle (and where it actually breaks)
- **Planning & direction** — define what decisions the intel must support ('which vulnerabilities do we patch first?'). Skipped more than any other phase, and its absence is why collections produce noise.
- **Collection** — internal telemetry (your logs are intel), OSINT, commercial feeds, ISAC sharing, dark-web monitoring.
- **Processing** — deduplicate, normalize, enrich (geolocate, resolve, score). Unglamorous and decisive: garbage in, garbage escalated.
- **Analysis** — the human step: connect artifacts into campaigns, judge attribution confidence, translate findings into *recommended action*.
- **Dissemination** — the right product to the right audience: exec brief ≠ SOC bulletin ≠ detection rule.
- **Feedback** — did the consumer act? Was it useful? This is the phase that turns reporting from output into service.

## The four levels of intel
- **Strategic** — for leadership: adversary trends, geopolitical risk, 'should we enter this market'. Weeks-to-months horizon.
- **Operational** — for defenders of campaigns: actor groups, their infrastructure, upcoming targeting. Days-to-weeks.
- **Tactical** — for detection teams: TTPs mapped to ATT&CK, hunt hypotheses.
- **Technical** — for machines: IOCs, YARA/Sigma rules, hashes. Shortest shelf life, highest volume.

## What makes intel *actionable*
Every product should answer: so what, for whom, by when. 'A new ransomware group emerged' is news. 'This group phishes IT staff with signed RMM tools — audit your RMM installs and add these two detections this week' is intelligence.

## Field note
Your own environment is your highest-fidelity collection source. Before buying a feed, be the org that can answer 'what did *we* see last week?' — feeds only multiply value you can already receive.`,
  },
  "l-ti-1-3": {
    intro:
      "The Cyber Kill Chain models intrusion as seven stages a defender can interrupt. Its power isn't the sequence — it's the question it forces at each stage: *what would have detected or denied this, and did we?*",
    body: `## The seven links
- **Reconnaissance** — target research: LinkedIn org charts, subdomain enumeration, leaked credentials. Detectable via honeypots, DNS logging, brand monitoring.
- **Weaponization** — crafting the malware + exploit into a deliverable. Happens on *their* infrastructure — effectively invisible to you; defenses here are threat intel and retro-hunting when weapons surface later.
- **Delivery** — the payload arrives: email attachment, drive-by download, USB, exposed service. Your first *high-fidelity* interception point: mail gateways, web proxies, network sensors.
- **Exploitation** — the code executes. EDR, application whitelisting, patching, and exploit mitigations live here.
- **Installation** — persistence: services, run keys, scheduled tasks, webshells. Sysmon and file-integrity monitoring earn their budget.
- **Command & Control** — the beacon. Outbound detection: JA3/JA4 fingerprints, DNS anomalies, long-connection patterns to fresh domains.
- **Actions on Objectives** — exfiltration, encryption, fraud. DLP, egress filtering, and — too often — the user's phone call.

## How defenders actually use it
- **Mapping controls to links**: a table of the seven stages against your current detection/denial capability *is* a defense roadmap. Most organizations are strong at Exploitation+ and blind before Delivery.
- **Interrupting cheaply**: you don't have to win everywhere — breaking one link breaks the attack. That's why hardening email + credentials (Delivery+Exploitation) stops the majority of commodity intrusions outright.

## The honest critiques
- Real intrusions are iterative and parallel, not a neat conveyor belt; ransomware doubles back through stages repeatedly.
- It's defender-centric and perimeter-flavored — pair it with ATT&CK (which catalogs behaviors *within* stages) and an assume-breach mindset for the modern picture.

## Field note
Take one public intrusion (CISA advisory) and place every artifact on the chain. Then mark where *your* stack would have first seen it — that gap analysis is a hunt plan, a detection backlog, and an interview story in one.`,
  },
  "l-ti-2-1": {
    intro:
      "Indicators are the atoms of technical threat intel — but they are not interchangeable. Each type trades fidelity against shelf life differently, and treating a noisy indicator like a precise one floods your blocklists with false positives.",
    body: `## The indicator taxonomy
- **Network**: IPs (hours), domains (days), URLs, SSL certificate serials/fingerprints, JA3/JA4 TLS fingerprints (weeks — clients change slowly), User-Agents (spoofable — low fidelity alone).
- **Host**: file hashes MD5/SHA-1/SHA-256 (immutable per file, but one-byte repack defeats), IMphuzz/fuzzy hashes (family similarity), registry keys, mutexes, file paths, scheduled-task names.
- **Behavioral**: 'C2 beacon with 60s jitter', 'certutil downloading from fresh domain' — technically TTP-flavored, but machine-expressible and far more durable than any artifact.

## Fidelity vs. half-life
- **High fidelity, short life**: certificate serials, mutexes — near-zero false positives, dead in days.
- **Low fidelity, long life**: IP ranges, free-hosting domains, malware family naming — useful for *hunting*, dangerous for *blocking* (collateral damage).
- The matrix every analyst keeps in their head: don't block on low-fidelity; hunt with it; alert on medium; block only on high.

## Enrichment changes the verdict
An IP alone is a coin flip. Enriched — ASN (residential proxy?), age (registered Tuesday?), passive DNS (40 malware domains on it?), whois privacy, history in your own logs — it becomes evidence. Enrichment pipelines (MISP + processors, or commercial) are what separate intel teams from paste shops.

## Field note
When a report hands you 500 IPs, resist importing them raw. Extract the *pattern* (hosting provider, ASN, domain-generation scheme), write the behavioral match, and use the raw IPs for a one-time retro-hunt with expiry dates. The pattern survives; the list composts.`,
  },
  "l-ti-2-3": {
    intro:
      "Indicators decay — that's physics, not pessimism. Lifecycle management is the set of practices that keeps your detection estate matching *today's* adversaries instead of museum collections of expired truth.",
    body: `## The lifecycle stages
- **Validation** — does it work and is it what the source says? Test hashes against samples, resolve domains, check passive DNS. Feeds contain stale and wrong data; importing unvalidated is how false positives are born.
- **Enrichment & scoring** — attach context (ASN, geo, first-seen, related campaigns) and a confidence score. Score drives action: ≥80 auto-block, 50–79 alert, <50 hunt-only.
- **Deployment** — push to the right engines at the right tolerance: blocklists (high confidence only), SIEM watchlists, EDR custom indicators, DNS RPZ.
- **Monitoring & expiry** — every indicator carries **time-to-live**. IP indicators: 30 days. Domains: 90. Hashes: 1–2 years or until the malware family evolves. Expired ≠ deleted: demote to cold storage for retro-hunting.
- **Retirement** — remove from active engines, keep the provenance (which report, which campaign) so future investigations can still cite it.

## The practices that keep it honest
- **Track feedback per source**: which feed's indicators ever fired? Sources with months of zero hits are noise subscriptions — renegotiate or drop.
- **False-positive post-mortems**: every blocked-legitimate-traffic incident updates the scoring rules. The rubric should learn, not just the blocklist.
- **Provenance everywhere**: an indicator without source, date, and confidence is a rumor. STIX objects and MISP tags exist to carry this metadata — use them.

## Field note
The health metric of an intel program is not indicator count — it's the **active-indicator hit rate** and the **median age of what's deployed**. A tight set with 5% monthly hit rate beats fifty thousand rotting rows every time.`,
  },
  "l-ti-3-1": {
    intro:
      "OSINT is intelligence gathered from public sources — free in material, expensive in skill. The craft is collection discipline (what, where, how often), verification (everything is spoofable), and knowing exactly where the legal and ethical lines sit.",
    body: `## The collection landscape
- **People & orgs**: LinkedIn (org charts, tech-stack mentions), conference talks, press releases, job postings (the tech stack and security roles a company is hiring for are a recon goldmine — yours, too, so audit your own postings).
- **Infrastructure**: WHOIS, passive DNS, certificate transparency logs (crt.sh), Shodan/Censys (exposed services), ASN data, Wayback Machine for deleted pages.
- **Code**: GitHub org reconnaissance — commits, public repos, leaked secrets (your org should run secret scanning *before* an attacker greps it).
- **Dark web & markets**: credential dumps, ransomware leak sites, access broker chatter. Legal gray-to-fine territory: observing is one thing, interacting (registering, buying, posing) is another entirely.

## Tradecraft that separates analysts from tourists
- **Sock-puppet hygiene** for anything interactive — dedicated research personas, isolated VMs, no personal breadcrumbs. If you poke a threat actor's infrastructure, assume they log too.
- **Verify or label**: screenshots fake, whois spoofs, breach dumps repack. Triangulate across sources and mark confidence in writing.
- **Capture everything** (dates, URLs, hashes of evidence) — findings you can't reproduce are opinions.

## The lines you don't cross
- **Legal**: no unauthorized access (even 'just checking' an exposed panel), no doxxing, respect local law — surveillance law varies hard by jurisdiction.
- **Ethical**: proportionality and purpose. Collecting on a named individual employee crosses from intelligence into stalking fast.
- **Operational security of the target**: researching a criminal group is legitimate; tipping them off that they're researched burns months of access.

## Field note
For defenders, the highest-ROI OSINT is turning the lens inward once a quarter: enumerate your own external surface exactly the way an attacker would — CT logs, Shodan, breach-notification services — and close what you find. Every finding is one that never needed a threat actor.`,
  },
  "l-ti-3-3": {
    intro:
      "Threat actor profiling turns 'the attackers' into specific, comparable adversaries: who they are, what they want, how good they are, and what they do when blocked. Know your likely actors and your defense priorities write themselves.",
    body: `## The naming mess, and how to read it
- One actor carries many names (Lazarus = APT38 = Hidden Cobra) because every vendor names their own. **MITRE groups** and **threat-actor catalogs** (ATT&CK Groups, MISP galaxy, Mandiant/Recorded Future cross-references) map aliases — never treat two names as two groups without a mapping.
- Distinguish **motivation classes**: nation-state (espionage, disruption — patient, well-resourced), financially-motivated (ransomware, BEC — fast, noisy, scalable), hacktivist (ideology — destructive but opportunistic), and access brokers (sell the way in, don't use it).

## What a profile actually contains
- **Targeting pattern** — sectors, geographies, victim size. 'Hits mid-size manufacturing in EMEA via supply chain' is actionable scoping.
- **Tradecraft** — initial access preferences, toolset, ATT&CK technique profile, infrastructure habits (registered via which registrar? bulletproof hosting?).
- **Tempo & dwell time** — a smash-and-grab ransomware crew operates in days; an espionage actor dwells for months. Your detection *windows* differ accordingly.
- **Sophistication floor** — what they fall back to when clever tricks fail tells you your minimum viable defense.

## Using profiles operationally
- **Priority Intelligence Requirements**: pick the 3–5 actors who target *your* sector, and let their profiles drive hunts, detections, and tabletop scenarios. Generic 'APT monitoring' is astrology; actor-driven PIR is focus.
- **Attribution humility**: confidence levels, not verdicts — 'high confidence: financially motivated, Russian-language infrastructure'. Attribution shifts with new evidence; write reports that survive being wrong.

## Field note
Build a one-page card for your top three actors: TTP summary, detection list mapped to your stack, and the 'if you see this, escalate to...' triggers. New analysts onboard in a day instead of a quarter.`,
  },
  "l-ti-4-2": {
    intro:
      "STIX defines what a threat object is; TAXII defines how it travels. Together they make machine-speed intel sharing possible — and OpenCTI is the platform that turns the flood into a searchable, linkable picture.",
    body: `## STIX: the data model
- **STIX Domain Objects** — Indicator, Malware, Threat Actor, Intrusion Set, Attack Pattern (≈ ATT&CK technique), Campaign, Vulnerability, Relationship...
- **Relationships are the power**: 'Intrusion Set X *uses* Malware Y', 'Indicator I *indicates* Attack Pattern T1059'. Graphs of relationships answer questions lists can't: 'which campaigns used this infrastructure in the last quarter?'
- **STIX 2.1 is JSON** — machine-readable, versioned, with confidence, revocation, and granular markings built in.

## TAXII: the transport
- **Collections** (server-push models) and **Channels** (publish/subscribe) — the API spec that lets MISP, OpenCTI, and commercial feeds exchange objects without bespoke parsers.
- In practice: you configure *one* TAXII client against a feed, poll on schedule, dedupe on STIX IDs, and route objects by type and confidence.

## OpenCTI: the knowledge platform
- Ingests STIX/TAXII feeds, MISP events, and manual reports (with extractors), links everything into a graph, and — the reason teams adopt it — **organizes by investigation case** rather than by feed.
- Dashboards per PIR, ATT&CK-mapped views, and export back out to detections (Sigma/YARA) close the loop from intelligence to the SIEM.

## Where programs stumble
- Ingesting everything: a platform drowning in 2M low-confidence indicators helps nobody. Filter at ingestion by score and relevance to your PIRs.
- Treating the platform as the deliverable — OpenCTI exists to *produce decisions*; a beautiful graph nobody queries is shelfware.

## Field note
Stand up OpenCTI in your lab, connect one free feed (CISA ADS via TAXII, or an open MISP instance), and build one dashboard answering one PIR. That artifact in a portfolio says 'intel platform experience' louder than any course certificate.`,
  },
  "l-ti-4-3": {
    intro:
      "Intelligence-driven detection closes the loop: threat intel stops being a report someone reads and becomes rules, hunts, and tests in your detection estate — with feedback showing which intelligence earned its keep.",
    body: `## The loop, end to end
1. **PIRs first** — Priority Intelligence Requirements define what matters ('which actors target our sector's VPN appliances?'). No PIRs = infinite collection, zero focus.
2. **Collect against the PIRs** — feeds, ISACs, vendor reports, your own incident artifacts (the highest-fidelity source you own).
3. **Operationalize** — each relevant finding lands in one of four lanes:
   - **IOC lane**: blocklist/watchlist entries with confidence + expiry.
   - **Detection lane**: TTP → new or improved rule (Sigma), mapped to a data source you actually have.
   - **Hunt lane**: hypothesis + dataset + timebox; findings graduate into detections.
   - **Engineering lane**: new telemetry needed ('we can't see PowerShell script blocks — fix that first').
4. **Validate** — emulate the actor's techniques (Atomic Red Team) and confirm the new detection fires. Untested intel-derived rules are hopes, not detections.
5. **Feedback** — track which intel products produced which detections/hunts/validations. Kill feeds that never score; weight sources by demonstrated relevance.

## The ATT&CK bridge
Intel arrives in prose; detections live in data. ATT&CK is the translator: extract the actor's techniques, check coverage per technique, fill the gaps. Navigator layers (your coverage vs. the actor's profile) make the gap list visual — and the backlog conversation with management concrete.

## The metric that matters
**Intel-to-detection lead time**: report published → detection live in your SIEM. Days means your process works; weeks means intel is decoration. Track it per source, and the program manages itself.

## Field note
Take one recent report about an actor relevant to your lab environment and run the whole loop in an afternoon: PIR → extract TTPs → write one Sigma rule → test it with an ART technique → record lead time. That single cycle is the entire discipline in miniature.`,
  },
  "l-ti-5-1": {
    intro:
      "Intelligence that never gets read never helped anyone. Report writing is the last mile of threat intel — and the products that work are short, decision-oriented, and written for a named audience.",
    body: `## Match the product to the audience
- **Executive brief (1 page)** — what happened, why it matters to *us*, what we're doing, what we need decided. Bottom line up front; no IoCs, no jargon.
- **SOC bulletin (1–2 pages)** — detection-relevant summary: actor/TTP summary, indicators with confidence+expiry, Sigma rules or hunt queries, 'do this before Friday'.
- **Full assessment** — for the intel consumers and auditors: scope, method, confidence levels, detailed analysis, appendix of artifacts.

## Structure that survives skimming
- **BLUF** — Bottom Line Up Front. The first three sentences carry the whole report; everything else is evidence.
- **Key judgments** — bulleted, each with confidence language: 'High confidence the initial access vector was credential phishing; moderate confidence the actor is financially motivated.'
- **Body**: what we saw → what it means → what we recommend. Analysis separated from fact throughout.
- **Appendix**: IOCs (with dates and confidence), ATT&CK mapping, detection deltas, references.

## The craft details
- **Confidence language is standardized** (high/moderate/low) and means evidence quantity+quality, not how loud you feel.
- **Time in UTC, always**, with timezone stated once. 'Tuesday' ages badly.
- **No blame, no drama**: 'the phishing email was reported by an employee 40 minutes after delivery' — let the timeline carry the story.
- **Write the action list as tickets**: owner, action, deadline. A recommendation without an owner is a wish.

## Field note
Keep every report to the 'so-what test': if a sentence doesn't change what the reader does, cut it or move it to the appendix. The discipline of cutting is what separates intel products from intel dumps — and it's the skill hiring managers probe in writing samples.`,
  },

  // ── Detection Engineering (expanded) ────────────────────────
  "l-de-1-1": {
    intro:
      "Detection-as-code applies software engineering to detections: they live in version control, go through review and CI, deploy automatically, and get tested. It's the difference between a rule library that evolves and one that rots.",
    body: `## Why the old way fails
Console-written rules have no owner, no review, no test, no history. Nobody knows why a rule exists ('ask Dave — he left'), false-positive fixes get lost on vendor updates, and an audit of 'what would we actually catch?' is archaeology. Detections are code — they should get code's discipline.

## The practices that define it
- **Version control is the source of truth** — every rule is a file (Sigma, YARA, SPL, KQL) with a metadata header: author, date, status (experimental/stable), references, false-positive notes. The console becomes a *view*, not a home.
- **Peer review on every change** — a rule that fires on production traffic deserves the same scrutiny as code that runs in production. Reviewers ask: what behavior? what data source? what FP profile? what's the test?
- **CI for detections** — lint (schema validation), unit tests against sample events (true positive fires; benign event doesn't), and policy checks (every rule has owner + severity + references). Broken rule fails the build, never the SOC.
- **CD to the SIEM** — merged rules deploy via API to dev, validate, then prod. Rollback = git revert. Drift between repo and SIEM is monitored and reconciled.

## The compounding payoffs
- **Portability**: vendor-agnostic Sigma converts to your SIEM's dialect; switching platforms no longer means rewriting hundreds of rules.
- **Testing culture**: a purple-team run against a release candidate of your rules — before they deploy — becomes routine.
- **Metrics**: rule age, modification frequency, hit rate per rule — now measurable from git history, feeding the tuning backlog.

## Field note
Start small: pick your ten noisiest console rules, convert to Sigma with tests, deploy via CI, and measure the FP change over a month. That one sprint builds the pipeline, the habits, and the business case simultaneously.`,
  },
  "l-de-1-2": {
    intro:
      "A detection rule is a product with a lifecycle: born from a threat hypothesis, validated against real telemetry, tuned in production, and eventually retired. Managing that lifecycle deliberately is what separates a detection program from a rule dump.",
    body: `## The lifecycle stages
- **1. Idea / requirement** — from threat intel, an incident, an ATT&CK gap, or an audit finding. Written as a hypothesis: 'credential dumping via LSASS access from a signed tool would look like...'.
- **2. Feasibility** — do we *have the data*? Check the telemetry against the technique's ATT&CK data sources. No data → engineering ticket (visibility), not a rule. Half of detection engineering is honestly saying 'we can't see this yet'.
- **3. Authoring** — write the rule (Sigma for portability), against sample events captured from a lab reproduction of the technique.
- **4. Testing** — true-positive test (the lab event fires), false-positive test (20 benign events don't), then a **shadow deployment**: run in alert-only mode against production for 1–2 weeks and measure the real FP rate.
- **5. Deployment** — graduated: shadow → notify (ticked to analysts as 'informational') → active alert with severity and runbook attached.
- **6. Tuning & maintenance** — FPs get documented fixes (exclusions with expiry dates and justification), not console hacks. Vendor log-format changes get caught by the CI tests.
- **7. Review & retirement** — quarterly: rules with zero hits and no threat rationale get archived; rules with terrible FP ratios get rebuilt. The graveyard of dead rules is where tuning energy goes to die.

## The metadata that makes it work
Every rule carries: owner, status, severity, ATT&CK mapping, references (why it exists), false-positive notes, and — the most neglected — **the test events**. The tests are the lifecycle's memory.

## Field note
Run a 'rule census' on any estate you inherit: for each rule, last-hit date, owner, and FP rate. The census is always sobering, always fundable, and instantly turns 'we have 900 rules' into 'we have 120 that work' — which is the truth leadership can act on.`,
  },
  "l-de-1-3": {
    intro:
      "Detection is a signal-to-noise business. A signal is evidence of the behavior you defined; noise is everything else your rule happens to match. The craft is widening the gap between them — and knowing which side your new rule is really on.",
    body: `## What makes an event a signal
- **Specificity**: matches the technique's essential behavior, not a side effect. 'Mimikatz.exe ran' is a string match; 'a process opened LSASS with PROCESS_VM_READ from a non-system binary' is behavior. The second survives tool renaming.
- **Context**: the same event means different things in different places — PowerShell on a dev box vs. on a domain controller. Signal = event + environment, which is why enrichment joins belong in the pipeline, not in the analyst's head.
- **Motive alignment**: does this behavior map to an adversary objective (credential access, persistence)? If the best explanation is 'a bored admin', the rule needs narrowing.

## Where noise comes from
- **Legitimate software behaving badly**: backup agents, AV scanners, vulnerability managers, and EDR itself all touch LSASS, spawn children in temp dirs, and use PowerShell. Enumerate your noisy neighbors *before* the rule ships.
- **Lifecycle noise**: CI/CD runners, SCCM, provisioning scripts — one-time setup noise that becomes 50 alerts/day.
- **Detection sprawl**: three rules covering one technique, all slightly off. Consolidate; overlap breeds inconsistency.

## The tuning toolkit
- **Narrow the logic** — add the condition that distinguishes signal ('AND not signed by Microsoft') — the best fix, when you can find it.
- **Exclude with expiry** — allowlist the known-good (host, account, hash) with a written justification and a re-review date. Undated exclusions are permanent blind spots.
- **Lower the severity, keep the event** — downgrade to informational instead of deleting; you keep the telemetry and lose the fatigue.
- **Split the rule** — high-signal narrow rule (alerts) + broad low-signal rule (feeds hunts). Different jobs, different thresholds.

## Field note
Before writing any rule, spend 30 minutes reading the *benign* events your logic will match. That half hour is the difference between a rule that ships and a rule that becomes next quarter's tuning ticket.`,
  },
  "l-de-2-3": {
    intro:
      "Threshold rules say 'too many of X'; behavioral rules say 'X in a way nothing legitimate does'. Thresholds are cheap and explainable but crack under low-and-slow attacks; behaviorals catch the quiet ones but cost more to build and tune. A real detection estate runs both, deliberately.",
    body: `## Threshold (aggregate) rules
- **Shape**: N events of type E from entity S within window W → alert. Brute-force (50 failed logons), impossible travel, egress volume spikes, port-scan detection.
- **Strengths**: simple to write, cheap to run, trivially explainable to management ('5,000 logons in an hour is not normal'), and effective against commodity attacks that don't bother being subtle.
- **Failure modes**: the attacker who reads documentation — salt the attack below threshold (10 passwords × 100 accounts = spraying under every per-account limit); and **baseline drift** — the Monday login spike that becomes 500 FPs, teaching analysts to dismiss the rule.

## Behavioral rules
- **Shape**: a *pattern* of attributes — 'process with no network history suddenly beacons to a fresh domain every 60s ±20% jitter'; 'winword.exe spawning cmd.exe'; 'suspicious parent-child chain regardless of volume'.
- **Strengths**: volume-independent — catches the one-connection beacon and the low-and-slow spray; survives attacker sophistication; encodes real analyst knowledge.
- **Costs**: needs richer telemetry (process trees, per-process network), more authoring effort, and FPs need behavioral analysis rather than a count check.

## Choosing per technique
- Volume-y techniques (brute force, scanning, exfil) → **threshold**, with per-entity baselines and gradual-ramp exemptions.
- Precision techniques (C2, lateral movement, credential dumping) → **behavioral**, because the attacker controls volume by design.
- The layered pattern that works: a loose threshold as a tripwire (low severity) + a behavioral rule as the alert (high severity). The threshold catches the loud and lazy; the behavioral catches the quiet.

## Field note
When you inherit an estate that's all thresholds, you've found the reason 'nothing catches APTs'. Pick the ATT&CK techniques a real actor used against your sector, and build the behavioral versions for the top three — that's the fastest credibility you can buy the program.`,
  },
  "l-de-4-2": {
    intro:
      "False positives are not an annoyance to clear — they're data. Every FP tells you something true about your environment, your rule, or your telemetry. Read them that way and tuning becomes analysis instead of whack-a-mole.",
    body: `## Classify before you fix
- **Benign-true** — the behavior happened and is legitimate (backup agent touching everything at 2 AM). Fix: scoped, expiring exclusion.
- **Mislabeled** — the rule fired on something adjacent to the intent (port scan rule firing on the vulnerability scanner). Fix: narrow the logic or accept and re-document the rule's purpose.
- **Logic bug** — the rule doesn't express what it claims (wrong field, inverted condition). Fix in the rule + add the regression test. This category is a quality signal for your whole CI process.
- **Telemetry gap** — the rule is fine; the log lacks the field that would disambiguate (no process command line). Fix: engineering ticket, not an exclusion — excluding here creates a blind spot.

## The workflow that keeps tuning sane
1. **Triage with context** — join the alert against asset criticality, owner, and historical behavior before judging. Most 'false positives' are mis-contextualized trues.
2. **Quantify** — FP rate per rule per week. Trend it: a rule that jumped from 2 to 40 FPs/day after a software rollout is telling you exactly what changed.
3. **Fix at the right layer** — logic first, exclusion second, severity third. Never 'close and forget': every closure without a fix is a decision to see this again tomorrow.
4. **Exclusions are contracts** — each one documents scope (host/user/hash), justification, author, and expiry. Review quarterly; expired exclusions get re-evaluated or deleted.

## The org-level truth
FP load is a *staffing* question: at ~30+ low-quality alerts per analyst per shift, triage quality collapses and real alerts drown. Reducing FP rate is not cosmetic tuning — it's the highest-leverage MTTD improvement available, because analysts who trust the queue actually read it.

## Field note
Report tuning wins as coverage preserved: 'FPs down 70% with zero detections lost (validated by purple-team replay)'. That framing turns tuning from janitorial work into the engineering discipline it is.`,
  },
  "l-de-4-3": {
    intro:
      "The last mile of detection-as-code is delivery: a pipeline where merged rules are validated, deployed to the SIEM via API, and verified live — with rollback that takes seconds, not meetings.",
    body: `## The pipeline stages
- **On merge → CI**: schema-validate every rule file (Sigma format, required metadata), lint logic, run unit tests (true-positive sample fires, false-positive corpus stays silent), and enforce policy (owner, severity, ATT&CK tag, references present).
- **Build**: convert Sigma → target dialects (SPL, KQL, EQL) with pySigma; bundle the release.
- **Deploy to staging**: a dev SIEM tenant (or limited index) receives the rules; automated smoke tests replay the sample events and confirm detections fire in the actual engine — conversion can silently break things unit tests can't see.
- **Deploy to prod**: API push (or IaC-managed rule packs), with change tickets auto-created from the merged PRs. Rules land with their runbook links intact.
- **Verify live**: canary events injected post-deploy confirm end-to-end ingestion → detection → alert routing. The step everyone skips, and the one that catches the broken log source.

## Rollback and drift
- **Rollback = revert + redeploy** — the same pipeline, minutes not hours. Keep the last N releases' rule packs for instant restore.
- **Drift detection**: nightly job diffs repo state vs. SIEM state (rules added by hand in the console, rules edited in place). Hand-edits open a PR automatically or get reverted — the repo stays the single source of truth.

## The purple-team loop
Tag releases and run attack simulations against them: Atomic Red Team / Sigma-emulated techniques before promotion, quarterly against prod. Coverage-per-release becomes a dashboard: 'v2026.09 adds T1053.005, T1055 coverage — validated'.

## Field note
The maturity test of a detection pipeline: how long from 'new threat report published' to 'validated rule running in prod'? With this architecture the answer is an afternoon — and that number, tracked over time, is the program's report card.`,
  },

  // ── Penetration Testing (expanded) ──────────────────────────
  "l-pt-1-1": {
    intro:
      "Methodologies turn pentesting from freelancing into engineering: PTES, OSSTMM, and the OWASP/NIST guides define phases, scope discipline, and deliverables so tests are repeatable, defensible, and comparable.",
    body: `## PTES — the seven phases
- **Pre-engagement interactions** — scope, rules of engagement, legal paperwork, contacts, success criteria. The phase that decides whether the rest is professional or reckless.
- **Intelligence gathering** — passive and active recon of the target.
- **Threat modeling** — *who attacks this org and what do they want?* Turns a checklist test into a prioritized one.
- **Vulnerability analysis** — combine scanning with manual validation; scanner output is a lead list, not findings.
- **Exploitation** — prove impact, within the rules. The goal is demonstrating risk, not the scoreboard.
- **Post-exploitation** — what does access *mean*? Pivot, privilege, data access paths — the business-risk translation happens here.
- **Reporting** — the deliverable. (See l-pt-4-1 — a test that isn't reported persuasively didn't happen.)

## The other maps
- **OSSTMM** — metrics-driven security testing; heavier on rigor of measurement (attack surface quantification), lighter on real-world exploitation narrative.
- **NIST SP 800-115** — the government-flavored guide; useful when your client speaks compliance.
- **OWASP WSTG / MASVS** — the deep checklists for web and mobile; use them as coverage assurance so 'we tested the login page' becomes 'we tested all 60-odd controls'.

## Scope discipline (what separates pros from cowboys)
- In-scope assets, techniques allowed and forbidden (no social engineering? no DoS? production data handling?), test windows, escalation contacts, and evidence handling — written, signed, and in your pocket during the test.
- Everything outside scope is *someone else's production system* — one aggressive scan at a wrong IP is the difference between a report and a lawsuit.

## Field note
In interviews, walk a test through PTES phases with one concrete example each. Methodology fluency signals you've done this under rules and delivered to clients — not just captured flags on a range.`,
  },
  "l-pt-1-3": {
    intro:
      "Offensive security without a legal frame is a crime with documentation. Authorization, scope, and evidence handling are not paperwork obstacles — they are what makes the work legitimate, defensible, and insurable.",
    body: `## The authorization stack
- **Contract + Statement of Work** — the commercial layer defining deliverables and liability.
- **Rules of Engagement (RoE)** — the technical contract: in-scope IPs/domains/apps, permitted techniques, test windows, throttle limits, emergency contacts on both sides, and what happens when something breaks.
- **Signed authorization letter** — a document the tester can present if police, a third-party host, or a panicking SOC interrupts the test. Cloud providers often need their own (AWS/Azure/GCP pentest policies — most are now auto-approved within stated rules, but *you* must know them).

## The laws that actually apply
- **Unauthorized access statutes** (CFAA in the US, Computer Misuse Act in the UK, similar everywhere) — access without authorization is the crime; the authorization paperwork is your defense. 'It was just a scan' is not.
- **Data protection** (GDPR et al.) — a test that extracts real personal data creates processing obligations: minimize, encrypt, delete on schedule, and say so in the report.
- **Export/wiretapping nuances** for certain interception techniques — when testing comms, get explicit written permission for that specific activity.

## Evidence and conduct during the test
- **Log everything** — command history, screenshots with timestamps, tool output — for reproducibility and for the 'we did only this' conversation afterward.
- **Minimize real data exposure**: proof-of-impact via metadata and redacted excerpts beats dumping customer tables into your notes.
- **Stop conditions honored instantly**: production impact, out-of-scope exposure, or a SOC incident declaration → halt, preserve, call the contact. The retainer relationship dies on the first ignored stop condition.

## Field note
The certification paths (OSCP's ethics agreement, CREST, CHECK) all encode this: technical skill gets you in the door; legal discipline keeps you employed. Read your RoE twice before the first packet — then attack only what's written, only when it's written.`,
  },
  "l-pt-3-1": {
    intro:
      "The OWASP Top 10 is a risk-ranking, not a vulnerability checklist — it says which *classes* of web risk hurt organizations most right now. Learn the 'why it's exploitable' for each and every web test becomes systematic instead of improvised.",
    body: `## The classes that matter (2021 ranking, still the lingua franca)
- **A01 Broken Access Control** — the #1 for good reason: IDOR (changing /orders/1042 to /orders/1043), missing function-level checks, privilege escalation via parameter tampering. Test every authenticated endpoint with *another user's* objects.
- **A02 Cryptographic Failures** — cleartext transport, weak TLS config, passwords hashed fast (or not at all), sensitive data in URLs/logs. Test the config and the data flows, not just the forms.
- **A03 Injection** — SQL/NoSQL/LDAP/OS command injection and XSS live here. Fuzz every input that reaches an interpreter; the error messages are breadcrumbs.
- **A04 Insecure Design** — the missing-control class: no rate limit on OTP, trust placed in the client. Found by *thinking*, not scanning.
- **A05 Security Misconfiguration** — default creds, verbose errors, directory listing, permissive CORS, debug endpoints in prod. The highest-yield quick wins.
- **A06 Vulnerable Components** — old libraries and frameworks; enumerate versions (headers, JS bundles, error pages) and match against known CVEs.
- **A07–A10** — auth failures (credential stuffing, weak reset flows), integrity failures (unsigned updates, CI/CD compromise), logging failures (the breach nobody detected), SSRF (the cloud-metadata crown jewels: 169.254.169.254).

## How to actually test the Top 10
- **Map first**: enumerate endpoints, roles, and data flows (WSTG checklist as coverage). Every finding belongs to a class — if it doesn't, you've found A04's cousin: a gap in your own method.
- **Exploit for impact, not novelty**: one clean IDOR with a business consequence ('read any customer's invoice') outweighs ten reflected XSS.
- **Validate manually**: scanner findings are hypotheses; the report contains only what you proved with a reproducible request.

## Field note
The professional tell in reports: mapping every finding to the OWASP class *and* to a business risk ('payment integrity'), then re-testing after remediation. The Top 10 is the shared vocabulary that makes that loop work across teams.`,
  },
  "l-pt-4-1": {
    intro:
      "The report is the product. Clients don't experience your clever exploitation chain — they experience your document, and its quality decides whether anything gets fixed.",
    body: `## The structure that works
- **Executive summary (1 page)** — business language: what was tested, the overall risk posture, the 3–5 findings that matter, what to do first. Written last, read first. If the CEO reads nothing else, this page carries the value.
- **Technical summary** — scope, methodology (PTES phases used), severity distribution, and the attack narrative: how finding A chained into finding B into domain admin. Chained impact is what executives remember.
- **Findings** — one section each, always the same skeleton:
  - **Title that states the risk**, not the tool ('Unauthenticated access to all customer invoices', not 'IDOR found').
  - **Severity + CVSS** with a one-line justification (score the *business* impact, adjust the base score, say why).
  - **Description** — the vulnerability class and why it matters here.
  - **Evidence** — the minimal reproducible request/response, redacted, with timestamps.
  - **Impact** — what an attacker gains, in business terms.
  - **Remediation** — specific, actionable, prioritized; plus the *compensating* control for the can't-fix-yet reality.
  - **References** — CWE, OWASP class, vendor advisories.
- **Appendices** — full tool output, cleaned payloads, scope confirmation, re-test notes.

## Writing craft for testers
- **Evidence is redacted and reproducible**: a finding the client can't reproduce is a finding they'll argue about; one they can reproduce is one they fix.
- **No jargon in impact statements**: 'session tokens lack HttpOnly, enabling XSS-driven theft' is technical description; 'an attacker could take over a customer's session and act as them' is the impact sentence. The report needs both, labeled.
- **Severity honestly**: inflation destroys your credibility the second time you report; under-rating a real problem destroys someone's week. Calibrate against your own previous reports.

## The debrief
Present live: 30 minutes, the narrative, the top findings with demos, remediation priorities, questions. The meeting converts the document into decisions — and the follow-up re-test (included in your SOW) closes the loop.

## Field note
Steal structure ruthlessly: read two public pentest reports (banks and governments publish them) and note what you skimmed vs. read. Your report should survive the same skim test — because that's exactly how it will be read.`,
  },
  // ── Cloud Security (expanded) ───────────────────────────────
  "l-cs-1-1": {
    intro:
      "The shared responsibility model is the contract behind every cloud security argument: the provider secures the platform, you secure what you put on it. Almost every cloud breach post-mortem contains a sentence where somebody thought the model said otherwise.",
    body: `## The two sides, stated precisely
- **Security OF the cloud** (provider): physical datacenters, hardware, hypervisor, the managed service's own availability and isolation. You audit it via certifications (SOC 2, ISO 27001) — you never test it.
- **Security IN the cloud** (you): identity and access policies, data classification and encryption choices, network rules you define, application code, and the *configuration* of every managed service. The provider runs the S3 service; you decide whether the bucket is public.

## What shifts as you climb the service models
- **IaaS**: you patch the OS, harden the image, manage network ACLs — the whole stack above the hypervisor.
- **PaaS**: provider takes OS/runtime patching; you still own application dependencies, auth, and configuration.
- **SaaS**: provider runs nearly everything; you own users, roles, tenant config, and your data lifecycle. The model that surprises people: SaaS security incidents are usually *your* misconfigurations (open sharing links, disabled MFA), not the vendor's code.

## The responsibilities nobody escapes
Whatever the model: **your data**, **your IAM**, and **your configuration drift**. The 'cloud is secure by default' belief fails here — the defaults are usually sane, but one exception for a demo becomes the finding.

## Making the model operational
- Map every service you use against a responsibility matrix — one spreadsheet row per service, columns for who patches, who configures, who monitors, who backs up.
- Verify with tooling rather than trust: CSPM/config audits for the 'in' side; read the provider's shared-responsibility documentation per service, because it differs (RDS encrypt-at-rest is a checkbox; your RDS *user passwords* are yours).

## Field note
In interviews, the sharp version of this answer: 'the provider never owns my data, my identity model, or my misconfigurations — every breach headline where a cloud bucket leaked was the customer side of this contract.'`,
  },
  "l-cs-1-2": {
    intro:
      "AWS security is a portfolio you assemble: IAM for identity, GuardDuty for detection, KMS for keys, CloudTrail for truth. Knowing which service answers which question — and which ones to turn on first — is the working knowledge.",
    body: `## Identity and access (start here)
- **IAM** — users, roles, policies. Modern practice: no long-lived users for humans (federate via IAM Identity Center/SSO), roles for everything machine, permission boundaries for delegation, and **Access Analyzer** to find policies granting external trust.
- **Organizations + SCPs** — guardrails that no account admin can override: deny leaving the org's regions, deny disabling CloudTrail, deny public buckets.

## Detection and response
- **CloudTrail** — the flight recorder (API calls, with identity and source IP). Multi-region, to an immutable account, from day one.
- **GuardDuty** — managed threat detection on top of CloudTrail/VPC/DNS logs: credential use from anomalous locations, crypto mining, compromised instances. Turn it on; tune findings.
- **Security Hub** — aggregation and the CIS benchmark scorecard: one pane for config findings across accounts.
- **Detective / Macie / Inspector** — investigation graphs, sensitive-data discovery in S3, and vulnerability scanning for EC2/ECR respectively.

## Data protection
- **KMS** — the key service everything else references. Envelope encryption, key policies (separate from IAM), and rotation. Decide customer-managed vs. AWS-managed deliberately — CMKs give audit and revocation control.
- **S3 protections** — Block Public Access at the *account* level, default encryption, versioning + Object Lock for immutability, and event notifications feeding response automation.

## Network edge
- **Security Groups / NACLs** (stateful/stateless), **WAF** on the ALB/CloudFront (managed rule groups for SQLi/XSS + rate limiting), **Network Firewall** for egress control, **PrivateLink** to keep SaaS traffic off the internet.

## Field note
The 'new account in 30 minutes' baseline that reads senior: CloudTrail + GuardDuty + Security Hub on, Block Public Access everywhere, IAM Identity Center for humans, budget alarms, and an SCP denying region escape. Everything else is project-specific.`,
  },
  "l-cs-1-3": {
    intro:
      "Azure's model differs from AWS in one structural way that changes everything: **Microsoft Entra ID (formerly Azure AD) is the plane everything trusts**. Secure the tenant and its identities first; the resources follow.",
    body: `## Identity first (it's the control plane)
- **Entra ID** — users, groups, service principals, managed identities. **Conditional Access** is the superpower: policy like 'MFA required unless from a compliant device in a trusted country' enforced at every auth, not per-app.
- **Privileged Identity Management (PIM)** — just-in-time, approval-gated, time-boxed elevation for admin roles. The single best answer to standing-privilege risk in Azure.
- **Managed Identities** — Azure's answer to access keys: the credential never exists where your code runs.

## Detection and posture
- **Microsoft Defender for Cloud** — posture management (secure score, CIS/NIST benchmarks) plus workload protections (servers, containers, SQL, storage). The CSPM+CWPP console.
- **Microsoft Sentinel** — cloud-native SIEM/SOAR on Log Analytics: connectors for Entra sign-in logs, Office 365, and Azure Activity; KQL for detection-as-code.
- **Activity Logs + Diagnostic Settings** — Azure's CloudTrail-equivalent; export to immutable storage from day one.

## Data and network
- **Azure Key Vault** — keys, secrets, certificates, with RBAC (not the legacy access policies) and purge protection.
- **Storage accounts** — public access off by default now, but shared-key auth should be disabled in favor of Entra-based (OAuth) access; network rules + private endpoints.
- **Network**: NSGs (stateful, per-subnet/NIC), Azure Firewall (egress), **Private Link/Private Endpoints** (PaaS services on your VNet), and **Application Gateway + WAF** for the web edge.

## The tenant hygiene that prevents headlines
- Secure defaults: security defaults or CA policies for all users, no permanent global-admins (PIM), legacy authentication protocols blocked (they bypass MFA), and a break-glass account pair sealed in a vault.

## Field note
The interview contrast worth making: AWS's identity is per-account IAM; Azure has one Entra tenant spanning subscriptions. So in Azure, Conditional Access and PIM *are* the security program — get those right before touching a single NSG.`,
  },
  "l-cs-2-2": {
    intro:
      "SSO and federation replace a thousand per-app passwords with one identity your organization controls — but they also concentrate risk: the IdP becomes the master key, and its security *is* the company's security.",
    body: `## The protocols, demystified
- **SAML 2.0** — the enterprise classic: IdP signs an XML assertion, the service provider (app) trusts it. Browser-redirect flows; battle-hardened; clunky XML signatures that libraries can get wrong.
- **OAuth 2.0** — *authorization* delegation ('app X may read my calendar'), issuing tokens (access + refresh) not authentication.
- **OpenID Connect** — OAuth 2.0 + an ID token (JWT) for *authentication*. The modern app-SSO default; SAML survives in enterprise-legacy apps.

## What SSO actually buys
- **One attack surface instead of a thousand** — offboarding is one disable, not forty app ticket queues (the 'ex-contractor still has the CRM' problem dies here).
- **Central policy enforcement** — MFA, conditional access, device compliance, and session rules apply everywhere at once.
- **No stored passwords at apps** — apps verify signed assertions/tokens; password reuse and per-app phishing shrink to the IdP itself.

## The concentration risk (and its controls)
- The IdP is now the crown jewel: **phishing-resistant MFA (FIDO2) on all admin and IdP logins**, conditional access on location/device, and privileged role management (PIM) for IdP admins.
- **Break-glass accounts**: two cloud-only, sealed-credential accounts excluded from CA policies, monitored to fire on *any* use. When federation misconfigures, these are the only way in.
- **Session theft survives SSO**: tokens stolen from a browser bypass re-auth. Short token lifetimes, token binding where available, and conditional-access re-evaluation keep stolen sessions useful for minutes, not days.

## Federation vs. sync, precisely
Sync (password hash synchronization) copies credentials for authentication at the cloud IdP; federation leaves auth at your IdP (AD FS, Ping). Federated = more control, one more on-prem component that fails; cloud-managed with PHS + smart lockout is the modern default.

## Field note
When an interviewer asks 'what's your biggest SSO risk?', the senior answer is session and recovery flows — not the SAML handshake: helpdesk resets, legacy-auth bypasses, and stolen refresh tokens are where SSO deployments actually get beaten.`,
  },
  "l-cs-3-2": {
    intro:
      "Cloud network security is classical network defense rebuilt in software: segments are subnets, firewalls are security groups, and the new discipline is that everything — including the 'private' — is defined in code you can get wrong at scale.",
    body: `## The segmentation pattern (VPC/VNet)
- Public subnets: only load balancers and egress devices. Private subnets: app and data. **Databases get no internet path in either direction** — private subnets, SG allowing only the app SG.
- **Micro-segmentation with security groups referencing other SGs** — 'port 5432 allowed from SG(app-tier)' is self-maintaining; CIDR allowlists rot the week the infra changes.
- Multiple accounts/projects as the coarsest boundary: prod vs. dev never share a network if they can't share an account.

## Egress: the forgotten half
Ingress is what everyone configures; **egress is where data leaves**. Default-allow egress means a compromised host can call any C2. Controls: Network Firewall/Azure Firewall with FQDN allowlists, private endpoints for cloud services (S3/DynamoDB/Key Vault over PrivateLink — no internet path), and DNS-level filtering (Route 53 Resolver / private DNS with logging).

## The cloud-native edge
- **WAF** in front of every public HTTP endpoint — managed rule groups plus rate limits; tune with count-mode before block-mode.
- **Private endpoints** turn 'publicly reachable PaaS' into 'VNet-addressable only' — the single highest-leverage change for data services.
- **Zero-trust access** for admin planes: no bastion SSH over the internet — use SSM Session Manager / Azure Bastion / IAP tunnels, with every session logged.

## Drift is the enemy
Network definitions live in Terraform/ARM/Bicep; manual console changes are how 0.0.0.0/0 appears on a database port. **IaC-only changes + nightly config-drift detection + CSPM checks (public IP on private resource, open SGs)** keep the design real.

## Field note
The two findings that appear in nearly every cloud security review: an SG opened to 0.0.0.0/0 on a non-HTTP port, and a storage/PaaS service public 'temporarily'. Configure continuous detection for exactly those two and you've killed the most common cloud network incidents before they start.`,
  },
  "l-cs-4-1": {
    intro:
      "Governance is how a 500-account cloud estate stays secure without 500 administrators: guardrails defined once, enforced everywhere, with evidence produced automatically. Without it, cloud adoption outpaces control and the audit finds the gap.",
    body: `## The guardrail hierarchy
- **Landing zone** — the pre-built foundation: organization/management group structure, account vending, central logging, network baseline, identity defaults. (AWS Control Tower, Azure Landing Zones / CAF.) You don't build workloads; you build the factory workloads are born into.
- **Service control policies / Policy** — *hard* denies no account can override: region restrictions, 'no public buckets', 'no disabling CloudTrail', 'no unencrypted volumes'. SCPs/Policy don't grant anything — they bound what's possible.
- **Tagging and resource organization** — owner, environment, cost-center, data-classification tags enforced by policy. Untagged resources are unmanaged resources; cost and security both die in that swamp.

## Continuous compliance
- **Config rules / Azure Policy** — declarative 'resources must be X' evaluated continuously, with auto-remediation for the fixable ones (unencrypted RDS → encrypt; public bucket → block).
- **Security Hub / Defender secure score** — the estate's posture dashboard, aggregated across accounts, trended over time, and *owned*: every control has a name attached.
- **Evidence automation** — auditors want proof, not screenshots: exports of config compliance, CloudTrail integrity, access reviews. Build the evidence pipeline once; every future audit becomes an export.

## The human layer
- **Access reviews** on a cadence (entitlements, break-glass, IdP admins) — evidenced, not performatory.
- **Exception management** — every policy exemption has an owner, justification, and expiry. Permanent exceptions are just unmanaged risk with paperwork.
- **FinOps sits next to security** — cost anomalies are also *security* anomalies (crypto-mining, forgotten test fleets). One review, two outcomes.

## Field note
The maturity tell: ask 'who can make a resource public?' In a governed estate the answer is 'nobody — the SCP denies it, and the audit trail shows the last attempt'. In an ungoverned one, the answer is 'everyone, and we hope'. Build for the first answer.`,
  },
  // ── Security Architecture (expanded) ────────────────────────
  "l-sa-1-1": {
    intro:
      "Zero trust replaces 'trusted inside, enemy outside' with 'never trust, always verify': every request is authenticated, authorized, and inspected regardless of network location. It's an architecture of decisions, not a product you buy.",
    body: `## The principles (NIST SP 800-207)
- **Per-session verification** — identity (user + device + workload), posture, and context evaluated on *every* request; no standing network trust.
- **Least privilege, per-application** — access is to specific apps, not to 'the network'. The VPN's whole-intranet grant is the anti-pattern being retired.
- **Assume breach** — segment aggressively, log everything, blast-radius-minimize by design.

## The building blocks
- **Identity plane** — strong authn (phishing-resistant MFA), device identity (MDM/compliance signals), and policy engine decisions (ZTNA broker / identity-aware proxy).
- **ZTNA / identity-aware proxies** — the user authenticates to a broker; the broker connects them to *one application*. The app is invisible to the internet and to other users. (Cloudflare Access, Google IAP, Zscaler.)
- **Micro-segmentation** — east-west traffic between workloads is denied by default and allowed per-flow (service meshes, host firewalls, SDN policies).
- **Continuous evaluation** — sessions re-scored as signals change: device falls out of compliance → token dies mid-session.

## Migrating without breaking everything
- **Inventory first** — apps, users, data flows. You can't broker access to what you haven't enumerated.
- **Start with the crown jewels** — brokering access to the 5 apps that matter most beats a big-bang replacement of the VPN.
- **Keep the VPN for the edge cases** (legacy protocols, break-glass) — explicitly documented, explicitly temporary.
- **Instrument before and after** — prove the security delta: lateral-movement paths eliminated, phishing-resistant coverage, MTTR on compromised sessions.

## The honest limits
Zero trust doesn't fix unpatched software or bad application security — a compromised device *is* compliant until posture feeds catch it, and insiders with legitimate access to an app remain inside its blast radius. ZTNA minimizes; it doesn't abolish.

## Field note
Interview one-liner that lands: 'Zero trust means the network stops being the credential — identity and device posture are, for every request.' Then give one example: how a stolen VPN credential becomes worthless when access is brokered per-app with device checks.`,
  },
  "l-sa-1-3": {
    intro:
      "Secure design patterns are the reusable answers to the questions attackers ask of every system. Knowing them means security reviews become vocabulary instead of improvisation — and insecure defaults stop shipping by accident.",
    body: `## Identity and session patterns
- **Authentication with phishing-resistant factors** (FIDO2) for privileged flows; **step-up authentication** (re-auth or OTP) for high-risk actions rather than trusting the session.
- **Server-side sessions or short-lived tokens with rotation**; refresh tokens bound to device and rotated on use; **centralized revocation** — the logout that actually works.
- **Authorization as a service inside your app** — one policy layer (deny-by-default, object-level checks) that every route calls; never per-route improv.

## Input and output patterns
- **Validate at the boundary with schemas; encode at the sink** — the pattern that kills injection classes wholesale.
- **Idempotency keys** for mutations — retries and replays stop being double-charges.
- **Multi-tenancy isolation** — tenant-scoped data access enforced in the data layer (row-level security), not by developer discipline in queries.

## Failure and degradation patterns
- **Fail secure** — an authorization service outage denies, not allows. Every dependency gets the question: what does its failure *authorize*?
- **Circuit breakers + bulkheads** — one slow dependency shouldn't cascade; compartmentalize pools so failure is contained.
- **Rate limiting and quotas at every trust boundary** — per-IP, per-user, per-API-key; the cheap defense for abuse and a prerequisite for graceful degradation.

## Secrets and configuration patterns
- **Short-lived, brokered credentials** (OIDC federation to cloud IAM, workload identity) replacing long-lived keys; **secret rotation without downtime** (two-key windows); **no secrets in logs** — scrubbing at the boundary.

## Trust boundaries, drawn explicitly
The pattern behind all patterns: draw where trust changes (browser→API, API→DB, your code→third-party), and put validation, authz, and monitoring on every crossing. Architecture diagrams that don't show trust boundaries aren't security reviews yet.

## Field note
In design interviews, naming patterns beats drawing boxes: 'step-up auth for transfers, idempotency keys on payments, row-level security for tenants, fail-secure on the authz dependency' — four sentences that say you've built systems like this before.`,
  },
  "l-sa-2-1": {
    intro:
      "TOGAF is enterprise architecture's operating system: the ADM cycle, its domain model (business/data/application/technology), and the governance that keeps a 200-system estate coherent. For security architects, it's the vocabulary for embedding security into decisions instead of auditing them afterward.",
    body: `## The ADM cycle
Preliminary → A: Architecture Vision → B: Business Architecture → C: Information Systems (data + application) → D: Technology Architecture → E: Opportunities & Solutions → F: Migration Planning → G: Implementation Governance → H: Architecture Change Management. The wheel repeats; **H feeds the next Preliminary** — that's why it's a lifecycle and not a project plan.

## The four domains (and where security lives)
- **Business** — processes, actors, capabilities. Security question: what are we protecting and for whom?
- **Data** — information entities and flows. Security question: classification, ownership, residency, and where the sensitive paths cross trust boundaries.
- **Application** — systems and their interactions. Security question: which components hold which risk, where are the chokepoints, what's the authN/Z model between them.
- **Technology** — infrastructure and platforms. Security question: network segmentation, identity plumbing, logging fabric, encryption services.

Security architecture traditionally rides as a *view* across all four; modern TOGAF (and SABSA before it) argues it should be a **domain with equal standing** — that argument, made cleanly, is the interview answer.

## Governance: where TOGAF earns its keep
- **Architecture Board** — reviews designs against standards; the body that says 'no, the data flow between these two systems violates the segmentation principle' *before* build.
- **Architecture Repository** — standards, principles, reference architectures, and ADRs — the institutional memory that stops relitigating solved problems.
- **Gap analysis and transition architectures** — migration happens in stages with defined interim states; security controls get staged roadmaps instead of 'someday'.

## Using TOGAF without drowning
Adopt the artifacts that produce decisions: principles (short, ratifiable), a capability map, target-vs-current views, and review gates. Full ADM ceremony at a 40-person company is cosplay; the discipline scales down well when you keep the gates.

## Field note
In interviews, connect TOGAF to security concretely: 'I use the ADM gates as security review gates — at B/C/D each domain gets its security questions answered, so implementation governance (G) inherits reviewed designs rather than surprises.'`,
  },
  "l-sa-3-1": {
    intro:
      "A security program is the standing organization of people, processes, and technology that manages risk continuously — as opposed to a pile of tools that respond to whatever happened last month. Building one is roadmap work: assess, prioritize, execute, measure.",
    body: `## Start with a risk assessment (honest, not theatrical)
- **Inventory assets and data flows** — you protect what you can name. The first assessment's real deliverable is usually the list of unknowns.
- **Threat-model per crown jewel** — what would a breach of *this* system mean, and which adversaries want it? (STRIDE per trust boundary, or ATT&CK per asset.)
- **Map controls to gaps** — CIS Controls v8 (or NIST CSF) as the checklist: where does the org sit on the 153 safeguards? The honest scoring meeting is painful and clarifying.

## The roadmap that follows
- **Foundational first** (in rough order of leverage): asset inventory → identity (MFA everywhere, least privilege) → patch/vuln management with real SLAs → backups *tested offline* → logging and detection baseline → email/web hardening → segmentation of the crown jewels.
- **Sequence by risk reduction per euro/dollar**, not by vendor roadmap. One page, four quarters, owners named — roadmaps die in 40 tabs.
- **Quick wins visible in 90 days** fund the program politically: phishing-resistant MFA for admins, immutable log storage, the first purple-team exercise.

## Operating the program
- **Metrics reviewed monthly**: MTTD/MTTR, patch SLA compliance, phishing-sim click rates, coverage vs. roadmap. Numbers trended, not snapshots.
- **Exercises**: tabletop twice a year (execs included), purple-team annually. The first tabletop reveals the contact list is stale — better in a conference room.
- **Third-party risk** — the program must reach vendors: intake questionnaires proportionate to data access, and contractual breach-notification terms.
- **Budget language** — translate everything to risk and business terms: 'reduces ransomware dwell time from weeks to days' beats 'deploys EDR'.

## Field note
The program that survives leadership churn is the one whose metrics and roadmap live in one shared document with named owners. Build that in month one — tools change, the document compounds.`,
  },

  // ── Fullstack Project (expanded) ────────────────────────────
  "l-fs-1-1": {
    intro:
      "Most applications outgrow their first architecture in one direction: everything wants to become the request handler's job. Patterns exist to keep code sorted as it grows — layering, modular monoliths, event-driven pieces — and knowing when each earns its complexity is the skill.",
    body: `## Layered (n-tier): the default that works
Routes (HTTP) → services (business logic) → repositories (data). The dependency rule: **dependencies point inward** — services don't import Express, routes don't contain SQL. Cheap to understand, perfect for CRUD-dominant apps; the failure mode is anemic services that just proxy forms to the DB (if that's your domain, fine — the pattern worked).

## Modular monolith: the boundary discipline
One deployable, internal modules (auth, orders, billing) with **explicit public interfaces** — other modules import the module's index.ts, never its internals. You get microservices' boundary hygiene without the network tax, and each module is a *candidate* for extraction when the pain is real. The trap: module walls erode by convenience unless imports are lint-enforced.

## Event-driven pieces, surgically
- **The pattern**: a service emits events ('OrderPlaced'); consumers react (email, analytics, inventory) without the emitter knowing them.
- **When it earns itself**: fan-out work, cross-module workflows you don't want coupled, audit trails. **When it doesn't**: your app has three features and one queue nobody monitors — direct calls are simpler and debuggable.
- **Costs you accept**: eventual consistency (design the UI for it), at-least-once delivery (consumers must be idempotent), and a new operational surface ( DLQs, replay, ordering).

## CQRS and other grown-up words
Command/Query Responsibility Segregation pays when read and write shapes genuinely diverge (dashboards vs. transactions). Until then it's two codebases for one model. Hexagonal/ports-and-adapters is the same discipline as layering, dressed for testability: domain logic depends on *interfaces*, adapters wire real implementations.

## Choosing under deadline
- Default: **modular monolith with clean layering**. It survives further than most expect.
- Add queues when latency or fan-out hurts, not for resume value.
- The refactor from modular monolith to services is mostly *mechanical* if walls were honest — which is the strongest argument for the walls.

## Field note
In architecture interviews, answer with the pattern + its failure mode ('I'd start event-driven only for the notification path, because eventual consistency in checkout is a support nightmare') — the trade-off, not the buzzword, is what's being graded.`,
  },
  "l-fs-1-2": {
    intro:
      "Database design is where applications pay their debts or mint them. Normalization, keys, indexes, and transactions decided early become invisible; decided late, they become migrations at 2 AM.",
    body: `## Normalize until it hurts, denormalize until it works
- **1NF** — atomic values, no repeating groups. **2NF** — every column depends on the whole key. **3NF** — no column depends on another non-key column ('do not store the customer's city in the order').
- Stop at 3NF for almost everything OLTP. Then denormalize *deliberately* where reads demand it (a cached order_total column maintained by the service), and accept the write-time cost explicitly.

## Keys and relationships
- **Surrogate PKs** (uuid v7 or bigserial) for stability; **natural uniqueness** enforced with unique constraints (email, order number) — both, always.
- **Foreign keys with ON DELETE behavior chosen consciously**: RESTRICT for things that must not orphan, CASCADE only where the child genuinely dies with the parent. FK-less schemas are how 'archived' users keep receiving emails.
- **Soft deletes** for anything with history or legal retention: deleted_at timestamp + repo-level filtering, not bare DELETEs.

## Indexes: the 20% that fixes the 80%
- Index the **access paths**, not the columns: the WHERE, the JOIN keys, the ORDER BY of your hottest queries. Composite index column order matters (equality columns first, range last).
- Every index taxes writes — review with the query plan (EXPLAIN ANALYZE), not with vibes. N+1s show up as 200 identical queries; fix in the ORM (eager loading) after the DB confirms it.

## Transactions and concurrency
- Wrap multi-step mutations in transactions; know your isolation level's anomalies (read-repeats vs. phantom rows). Optimistic locking (version column) for user-facing contention; SELECT ... FOR UPDATE for the short, critical section.
- **Migrations are code**: additive-first (add column → backfill → switch reads → constrain → drop), never lock-the-table-on-Friday.

## Field note
The design review question that catches most future incidents: 'what happens to this row when the referenced entity is deleted, and what happens to this row when the process dies halfway through writing it?' If both answers are 'it depends', the schema isn't done.`,
  },
  "l-fs-2-1": {
    intro:
      "An API is a promise with a schema. REST's discipline — resources, verbs, status codes, versioning — is what keeps that promise legible to every client you'll ever have, including the ones you haven't met.",
    body: `## Resources and verbs, done properly
- Nouns plural, hierarchy meaningful: \`GET /users/42/orders\`, \`POST /orders\`. Verbs live in HTTP, not in URLs — \`POST /orders/7/cancel\` is acceptable when 'cancel' is a domain action, not a CRUD wrapper.
- **Status codes tell the truth**: 400 (their input is wrong) vs. 401 (who are you) vs. 403 (I know who you are; no) vs. 404/410 vs. 409 (conflict) vs. 422 (syntactically fine, semantically rejected) vs. 429 (slow down) vs. 5xx (my fault). Clients build retry logic on this — lying breaks them.

## The contract layer
- **Consistent error shape**: \`{ error: { code, message, details, requestId } }\` everywhere — the requestId is what turns a support ticket into a grep.
- **Pagination always**: cursor-based (\`?cursor=...&limit=50\`) over offset for anything that grows; offsets walk the table.
- **Filtering/sorting conventions documented once** and enforced by validation (this is where your Zod schemas live server-side).
- **Idempotency**: PUT is idempotent by contract; make POST mutations idempotent via \`Idempotency-Key\` headers — mobile networks retry, and your payment endpoint knows.

## Versioning and evolution
- **URL versioning** (\`/v1/\`) is the pragmatic default. Additive changes (new optional fields) don't bump; breaking changes do.
- **Deprecate with telemetry**: \`Deprecation\` and \`Sunset\` headers, log which clients still call old routes, and give real timelines. An API you can't retire is an API you can't refactor.

## Security and performance as API design
- **Object-level authorization on every route** (the BOLA class) — the user's ID comes from the token, never from the body.
- Rate limiting per identity, payload size caps, and timeouts on outbound calls the handler makes.
- **N+1 avoidance for the API consumer**: composite endpoints or sparse fieldsets where the client's need is known — chatty APIs die on mobile networks.

## Field note
Write the OpenAPI spec *first* for one real endpoint, generate the client, and wire it to a Zod schema. Spec-first feels slower for exactly one afternoon — then it's the reason frontend and backend stopped arguing about shapes.`,
  },
  "l-fs-4-3": {
    intro:
      "Monitoring tells you something is wrong; observability lets you ask why. The difference is whether your telemetry was designed for questions you predicted (dashboards) or can answer questions you never anticipated (structured traces, high-cardinality exploration).",
    body: `## The three pillars, with their real jobs
- **Metrics** — cheap, aggregated numbers (request rate, error rate, latency percentiles, saturation). The USE/RED method per service: Rate, Errors, Duration; Utilization, Saturation, Errors. Metrics page you; they don't explain.
- **Logs** — the event record. Structured (JSON) with request IDs, user IDs, trace IDs attached — grep-able logs are legacy; queryable logs are a database. Log *events and decisions*, not payloads with PII.
- **Traces** — one request's journey across services, spans with timing and attributes. The only tool that answers 'where did the 800ms go?' in a microservice call chain — and the pillar most teams skip until the 15-service checkout flow needs debugging.

## The signals that actually page people
- **SLIs/SLOs** — pick user-facing indicators (p99 latency < 300ms, availability 99.9%), set error budgets, and alert on **budget burn rate**, not raw thresholds. Threshold alerts fire at 3 AM for a blip nobody would notice; burn-rate alerts fire when the *month's* reliability is genuinely at risk.
- **Percentiles over averages** — the average hides the worst experience; p95/p99 *is* the user experience for your power users. Track them per endpoint.
- **Symptom vs. cause alerts** — page on user-impacting symptoms (error rate, latency); log or dashboard the causes (disk 80%, queue depth). Cause-based paging is how on-call learns to ignore the pager.

## Instrumentation that makes debugging fast
- **OpenTelemetry everywhere** — vendor-neutral SDK for all three pillars; you keep your data when you switch backends. Auto-instrumentation for HTTP/DB/frameworks, manual spans for the interesting business steps.
- **Correlation IDs end to end** — one request ID from browser to database, in every log line and span attribute. The single highest-value debugging feature; retrofit it before you need it.
- **Cardinality discipline** — tags like user_id on metrics explode cardinality and cost; keep high-cardinality identifiers in traces and logs, low-cardinality dimensions in metrics.

## Dashboards and the operational habit
- One dashboard per service: RED top row, dependencies below, recent deploys annotated (the deploy marker resolves half of 'what changed?').
- **Every alert links to a runbook** — the runbook is the difference between an incident and an investigation. Alerts without runbooks train people to ignore alerts.
- **Review the noise monthly**: which alerts fired and led nowhere? Delete or demote them. A pager that's always right stays trusted.

## Field note
The interview exercise 'your p99 doubled, walk me through it' — the senior path: SLO burn alert → trace a slow request (where do the spans concentrate?) → compare against the deploy annotation → check the dependency's metrics. Tools named in that order matter less than the order itself.`,
  },
  "l-fs-3-1": {
    intro:
      "The testing pyramid is a budget: many cheap unit tests, fewer integration tests, a handful of end-to-end journeys. Invert it and your CI takes twenty minutes to tell you a button is mislabeled.",
    body: `## The layers and what each buys
- **Unit (many, milliseconds)** — pure functions, hooks, reducers, validation schemas. Mock the edges. This is where refactoring confidence lives: 500 fast tests catch the logic break before the app even boots.
- **Integration (some, seconds)** — a module against its real collaborators: API route + real test database, component + real store. This is where the *wiring* bugs live — the unit tests passed because each piece was right; the seam was wrong.
- **End-to-end (few, minutes)** — full app in a browser: login → create order → see confirmation. A handful, only for the journeys the business dies without. E2E is powerful, slow, and flaky by nature — treat flakiness as a bug in the test, not weather.

## What makes the pyramid hold up
- **Test behavior, not implementation** — query by role/label (Testing Library's doctrine), not by CSS class. Tests that survive refactors are the ones worth having.
- **Arrange–Act–Assert** with factories for setup; shared helpers so 500 tests don't contain 500 copies of 'create a user'.
- **Deterministic time and randomness** — inject the clock; freeze it in tests. The 1 AM flaky test that 'passes on retry' is lying about something real.
- **Coverage as a map, not a KPI** — 80% everywhere is a vanity number; 95% on payment logic and 40% on marketing pages is a strategy.

## The CI gate
- PR pipeline: typecheck + unit + integration (minutes). Nightly: the E2E suite against a production-like environment. Merge blocking on the fast set; E2E failures page, they don't block every PR on their flakiness.
- **Contract tests** between services (OpenAPI-validated) replace half the E2E you were going to write across service boundaries.

## Field note
When you inherit a codebase with no tests, don't boil the ocean: write the first E2E for the money path, then unit-test whatever that journey touches. Six weeks of that habit beats a testing strategy document every time.`,
  },
  // ── System Design (expanded) ────────────────────────────────
  "l-tl-1-1": {
    intro:
      "Scalability is the art of remaining boring while traffic multiplies. Every pattern in this lesson — caching, horizontal scaling, queues, sharding — trades something (freshness, complexity, money) for headroom. The skill is knowing which trade your problem actually needs.",
    body: `## Start with measurement, not patterns
- Find the bottleneck before choosing the fix: CPU-bound? DB-connection-starved? Lock-contended? A load test (k6, Locust) against realistic data beats any amount of intuition. Scaling the wrong layer is expensive theater.
- **Vertical first, honestly**: bigger instance is often the cheapest 10× — and a legitimate answer. Horizontal scaling buys availability and unlimited ceiling, at the price of distributed-systems problems.

## Caching: the biggest lever
- **Layers**: browser/CDN (static and semi-static), reverse-proxy/app cache, Redis/Memcached for hot objects, DB query cache (mostly dead — do it in app). Start at the outermost layer that's correct.
- **Patterns**: cache-aside (app reads cache, misses hit DB and populate — the default), write-through (writes update cache; fresher, costlier), TTL as the honesty budget.
- **The costs**: stampedes on hot-key expiry (fix: locks or stale-while-revalidate), invalidation is genuinely hard (prefer TTLs you can afford), and cache hit-rate is a number someone should own.

## Horizontal app scaling (stateless first)
- Sessions out of app memory (Redis or JWT), files to object storage, background jobs to a queue — then any instance can serve any request and autoscaling works. This is 90% of 'making it scale' and it's mostly discipline, not architecture.
- Load balancing: L7 (HTTP-aware: routing, canaries, sticky-by-cookie) at the edge; health checks that actually check health (deep checks make the LB flappy — check dependencies *separately*).

## Queues: absorb the peaks
- Move work that *must happen eventually* out of the request path: emails, thumbnails, webhooks, analytics. The API returns 202; workers chew the queue; autoscale workers on depth, not CPU.
- **Backpressure is a feature**: bounded queues, DLQs for poison messages, and idempotent consumers (at-least-once is the guarantee you actually get).

## Data tier (where scaling gets real)
- **Read replicas** — scale reads until replication lag becomes a correctness problem (read-your-writes for the user who just wrote).
- **Sharding** — partition by key (tenant, region, hash of user_id). Solves write/working-set limits, costs you cross-shard transactions and resharding pain. The last big hammer — everything else first.

## Field note
In system-design interviews, the order of operations IS the answer: measure → cache → scale stateless apps → queue → replicate reads → shard last. Candidates who open with sharding for 10k users fail the judgment test even when their shard math is right.`,
  },
  "l-tl-1-2": {
    intro:
      "The CAP theorem says a distributed system during a network partition must choose: stay consistent or stay available. The theorem is small; its implications are everywhere — every database choice and every timeout is secretly a CAP decision.",
    body: `## The three properties, precisely
- **Consistency** — every read sees the most recent write (linearizability in the strong form).
- **Availability** — every request gets a (non-error) response, even during the partition.
- **Partition tolerance** — the system survives the network splitting between nodes.
- Partitions aren't optional — networks *will* split — so the real choice is C vs. A *during* the partition, and it's per-operation, not per-database.

## CP vs. AP, in systems you know
- **CP** (bank balances, locks, leader election — choose correctness): refusing to serve beats serving wrong. ZooKeeper/etcd, most single-leader RDBMS setups under failover ambiguity.
- **AP** (carts, likes, DNS — choose liveness): respond with possibly-stale data; converge later. Cassandra/Dynamo-style, DNS, shopping carts.
- The trick real systems use: **the choice is tunable per request** — 'read from the primary' (CP flavor) vs. 'read from any replica' (AP flavor) in the same store.

## The consistency menu (what you actually buy)
- **Strong/linearizable** — like a single machine. Cost: latency and unavailability during partitions.
- **Read-your-writes** — the minimum for UX: you change your email, you see your email. Session-sticky reads or primary-reads-after-writes.
- **Bounded staleness** — 'never more than 5 seconds behind' — good enough for feeds and dashboards.
- **Eventual** — replicas converge when partitions heal. Fine for convergence-only data (carts via CRDTs, DNS).

## The PACELC extension (the senior addition)
Even Without partitions you trade **Latency vs. Consistency**: sync replication = consistent and slow; async = fast and lossy-on-failover. Every database default is a PACELC decision — now you can read those defaults like a confession.

## Field note
Interview translation: when asked 'is your system consistent?', the strong answer names the *operations* — 'payments read linearizable; profile reads are eventually consistent, read-your-writes guaranteed in-session'. Per-operation CAP answers signal real design experience.`,
  },
  "l-tl-2-1": {
    intro:
      "An Architecture Decision Record is how a team remembers *why* the system is the way it is. The code shows what was decided; only the ADR shows what was considered, what was rejected, and what the trade-off was — which is the part that prevents relitigation.",
    body: `## The format (Nygard-style, one page)
\`\`\`
# ADR-014: Use PostgreSQL logical replication for cache invalidation
## Status: Accepted (2026-08-12) — supersedes ADR-009
## Context
Cache stale-read complaints grew 3× after multi-region rollout.
We need sub-second invalidation across regions.
## Decision Drivers
- Correctness: stale cart prices are a support fire
- Ops budget: no new managed services without owner
- Team familiarity
## Considered Options
1. Redis pub/sub fan-out — rejected: no delivery guarantee across regions
2. Poll-based invalidation — rejected: latency + DB load
3. Logical replication → invalidation stream — chosen
## Decision
Consume WAL via logical decoding; emit invalidation events with
idempotent consumers; fallback TTL 60s as safety net.
## Consequences
+ Sub-second global invalidation, auditable stream
− Must monitor replication lag; consumers must be idempotent
− Fallback TTL masks failures — alert on lag, not on staleness
\`\`\`

## Why the sections earn their keep
- **Context** — the forces at decision time. Six months later this is the section that stops 'why didn't we just...' conversations.
- **Options with rejections** — the anti-relitigation device: 'we considered Redis pub/sub; here's why no' is the difference between a discussion and a redo.
- **Consequences, honest both ways** — ADRs that list only positives are marketing; the '−' lines become the ops runbook.

## The practice that makes ADRs live
- **Numbered, immutable, superseded-not-edited**: a new decision writes a new ADR linking the old one. The history of changed minds *is* the architecture's biography.
- **Stored with the code** (docs/adr/), linked from the code that implements them where practical.
- **Write them small and often**: one decision, one page, thirty minutes. The 12-page ADR that takes a sprint never happens twice.

## Field note
Onboarding is the ADR payoff test: a new engineer should be able to read the ADR index and understand the system's big decisions in an afternoon. If your onboarding currently explains these by word of mouth, you've found your first three ADRs to write.`,
  },
  "l-tl-2-2": {
    intro:
      "Technical debt is the gap between the code you have and the code your current understanding would write. It's not evil — it's a financial instrument: borrowed speed, accruing interest. Managing it well is a leadership skill, not just a refactoring skill.",
    body: `## The taxonomy (know which debt you're carrying)
- **Deliberate/prudent** — 'we'll clean up after the demo, here's the ticket'. Fine, if the ticket is real.
- **Inadvertent** — 'we didn't know X then'. The unavoidable kind; only retrospectives reduce it.
- **Deliberate/imprudent** — 'no time for tests'. The kind that compounds fastest and is hardest to defend later.
- **Bit rot** — the world moved (framework EOL, dependency abandoned, platform changed) while the code sat still. Nobody decided this debt; somebody must still pay it.

## The interest model (why debt hurts invisibly)
- Every hack taxes **every future change in its blast radius** — the interest compounds in change-failure rate and review time, never in a dashboard until you look.
- **Symptoms to track**: PR size creeping up, 'don't touch that module' folklore, hotfix rate, onboarding time-to-first-PR, and the number of places one business rule is implemented. These are the debt thermometer.

## The payoff strategy
- **The boy-scout rule** — leave every touched file better: small, continuous, no-ticket refactoring bounded by review. This is where most debt actually dies.
- **The 20% envelope** — a standing capacity allocation for debt work, *prioritized by interest rate*: what hurts the most change-per-week gets paid first.
- **Debt by design**: when taking debt on purpose, write the IOU in the code (TODO with ticket, ADR note, expiration date) — undated debt is what becomes archaeology.
- **Rewrite as last resort** — the second-system trap is real; a rewrite exports five years of learned edge cases to the void. Prefer strangler-fig: new code grows around the old until the old is a stump you delete.

## Talking to the business
Translate to money and risk: 'this module costs 3 days per change vs. half a day elsewhere; the next feature lands 2 weeks later because of it.' Interest-rate framing gets debt funded; 'the code is ugly' never does.

## Field note
The senior signal in interviews is the *vocabulary of triage*: not 'we should fix everything' but 'this debt is cheap to carry, this one is blocking the roadmap, and this one we rewrite behind a feature flag next quarter.'`,
  },
  "l-tl-3-1": {
    intro:
      "Technical leadership is the move from 'I write the best code' to 'the team writes better code because I'm here.' The tools change: less keyboard, more context-setting, more decisions made visible — and the failure modes are all about doing instead of enabling.",
    body: `## The three hats (and wearing them deliberately)
- **Mentor** — code review as teaching, pairing on the hard parts, psychological safety to ask questions early. Your knowledge compounds when it transfers.
- **Architect** — own the *boundaries*: module interfaces, tech choices, the ADR trail. Influence through written proposals that others can argue with, not decrees.
- **Individual contributor** — keep real production work in your week, but pick the tasks with leverage: the risky migration, the gnarliest bug, the foundation everyone else builds on.

## The work that scales the team
- **Unblock fast** — the TL's highest hourly value is clearing the path: ambiguity in a ticket, a stalled review, an environment that won't build. Respond to 'I'm stuck' like it's the build breaking.
- **Make decisions visible** — ADRs, RFCs, and a decision log beat meeting-memory. If the same debate recurs monthly, it wasn't written down.
- **Raise the floor** — standards that automate themselves (lint, CI checks, templates) beat standards that live in your head. Every rule you personally enforce by review is a rule that fails when you're on holiday.
- **Delegate the ladder** — give away tasks with context and authority, keep accountability. The promotion-readiness of your teammates is a TL deliverable.

## The classic failure modes
- **The hero** — solves everything personally, builds nothing that survives their absence, becomes the bottleneck and then the burnout.
- **The absentee architect** — diagrams in slide-land, code reality drifts; credibility dies at the first 'but the code can't do that'.
- **The rewriter** — imposes their aesthetic on working systems; momentum dies in a permanent refactor.

## Field note
Measure yourself quarterly by absence: what broke while you were away? Nothing breaking means the system of standards, ownership, and documentation works — which is the actual job description.`,
  },

  // ── FinOps (expanded) ───────────────────────────────────────
  "l-ce-3-1": {
    intro:
      "FinOps brings the software mindset to cloud spend: visibility, accountability, and continuous optimization — because in the cloud, cost is an engineering output. Every architecture decision is also a pricing decision; someone should be reading the bill like telemetry.",
    body: `## The FinOps loop
- **Inform** — tag everything (owner, env, product), allocate costs to teams, publish a dashboard nobody has to ask for. Untagged spend is unowned spend, and unowned spend only grows.
- **Optimize** — the engineering levers (below), run continuously, not as an annual panic.
- **Operate** — budgets and anomaly alerts per team, cost in the definition-of-done for new features ('this design costs $400/mo at expected load').

## The engineering levers, in order of leverage
- **Rightsize and stop** — idle dev/stage environments shut down nights and weekends (a scheduler pays for itself in a month); oversized instances re-sized from utilization data, not vibes.
- **Commit for the stable baseline** — Reserved Instances/Savings Plans/CUDs for the load that never goes away (60–70% discounts); keep the bursty part on-demand. Commit to the floor, never to the peak.
- **Storage lifecycle** — infrequent-access and archive tiers for logs and old artifacts; object storage bills by *time×class*, and nobody needs last year's CI artifacts on hot storage.
- **Data transfer, the silent bill** — cross-AZ chatter and egress are where architectures leak money: co-locate chatty services, use private endpoints, CDN the public stuff.
- **The managed-service trade** — PaaS costs more per unit and less per engineer; run the math with *total* cost including the people who patch the alternative.

## Cost anomalies are security signals
A 4 AM spike in a region you don't deploy to is a compromised key mining crypto until proven otherwise. Cost alerts belong in the same channel as security alerts — two programs, one subscription.

## Field note
The unit metric that changes conversations: **cost per business unit** (per order, per active user, per thousand emails). Absolute bills invite cost-cutting religion; unit costs invite architecture discussions — and architecture is where the real money is.`,
  },
  // ── Multi-Cloud (expanded) ──────────────────────────────────
  "l-sar-1-1": {
    intro:
      "Multi-cloud is two very different strategies wearing one word: **portability** (keep the option to move) and **active-active** (run on several clouds at once). The first is mostly discipline; the second is mostly pain. Knowing which you're buying is the whole design conversation.",
    body: `## The two strategies, priced honestly
- **Cloud-agnostic portability** — build on Kubernetes/containers, Terraform, Postgres/Redis/S3-compatible interfaces so you *could* move. Cost: you use the lowest common denominator of each cloud, and portability is a *capability*, not a switch — you still re-test everything on arrival.
- **Active-active multi-cloud** — workloads live on two clouds simultaneously for availability/vendor-negotiation. Cost: data replication across clouds (latency, egress fees, consistency), two networking models, two IAM models, and an on-call rotation that must be expert in both. Reserved for specific regulatory/availability mandates.
- **The middle path most companies actually mean**: single cloud per workload, standard interfaces everywhere, multi-cloud at the *portfolio* level. You get negotiating leverage and vendor-risk reduction without running any single system across clouds.

## The patterns that keep options open
- **Terraform for everything** — provider-agnostic modules with cloud-specific implementations behind local/interface modules. IaC is the portability layer.
- **Kubernetes as the compute contract** — one ops model across clouds; the portable unit becomes the helm chart, not the VM image.
- **Open interfaces at the data layer** — Postgres (not Aurora-only extensions), Redis protocol, S3 API (MinIO-compatible), OpenTelemetry for observability. Data gravity is the real lock-in; keep the schemas and the formats yours.
- **Identity federation** — OIDC from your IdP into each cloud; no per-cloud master accounts with keys.

## What never ports
- The managed magic does: DynamoDB, Spanner, Cosmos's consistency tunables, each cloud's serverless quirks, IAM semantics. Every 'agnostic' abstraction (databases-in-Kubernetes) trades away exactly the managed capabilities you were paying for.

## Field note
When someone says 'we need multi-cloud', the architect's first question is 'which risk are we buying down?' — availability, negotiation, regulation, or resume. The answer picks the strategy; the strategy picks the patterns.`,
  },
  "l-sar-1-2": {
    intro:
      "Cloud-agnostic design isn't about avoiding every vendor feature — it's about choosing where the abstraction lives so that the *expensive-to-reverse* parts (data, identity, deployment) stay yours.",
    body: `## The layers and where to draw the line
- **Stay standard**: OS images (or containers), SQL dialect (Postgres over vendor forks when possible), S3-compatible object API, OpenTelemetry traces/metrics/logs, OIDC/OAuth for identity, Terraform for provisioning. These are the load-bearing abstractions — the things a migration would actually have to carry.
- **Abstract deliberately**: put queues, secrets, and notifications behind thin internal interfaces (a Mailer, a Queue, a SecretStore) — implemented with the cloud SDK, consumed cloud-free. Cheap to write, and the test doubles improve your code anyway.
- **Accept the lock-in where the value is real**: serverless functions, managed AI services, vendor databases with unique capabilities. Document the decision (ADR) with an exit-cost estimate — lock-in you *chose* with eyes open is strategy; lock-in by accretion is regret.

## The exit-cost audit (do it annually)
For each service: what would a migration move (data volume, schema translation, client rewrites, re-certification), how long, who does it? Services with alarming answers either get an abstraction or an accepted-risk note. The audit is the point — not purity.

## The observability and security seam
OpenTelemetry everywhere means your dashboards and alerts survive a cloud move; identity federation means your *access model* survives. These two are the most commonly skipped — and the most expensive to retrofit during a forced migration.

## Field note
The honest design-review line: 'We standardize on interfaces where reversal is expensive, and we accept vendor services where they're replaceable.' Teams that can name their abstraction line design better *single*-cloud systems too — the discipline pays even if you never leave.`,
  },
  "l-sar-2-1": {
    intro:
      "Cloud migration is a program, not a project: assess, choose a disposition per workload (the 6 Rs), land the foundation, then move workloads in waves with the operating model rebuilt around them.",
    body: `## Phase 1 — Assess
- **Inventory and dependency-map everything** — the migration killer is the forgotten system nobody documented (the license server on a physical box, the vendor appliance on a static route).
- **Business case with honest math**: run-rate vs. cloud run-rate *plus* migration cost *plus* the first-year duplication. The 30% savings headline usually hides in right-sizing and FinOps, not lift-and-shift.
- **Choose the operating model first** — landing zone, identity, network, security baseline, FinOps tagging. The foundation wave is the one that decides whether wave two is orderly or chaotic.

## Phase 2 — the 6 Rs per workload
- **Rehost (lift-and-shift)** — fastest, least value; right for expiring datacenters and unstable-but-working apps. Expect to pay list prices until you re-architect.
- **Replatform (lift-tinker)** — move to managed DB/containers; the best value-per-effort trade for most estates.
- **Refactor/Re-architect** — cloud-native rebuild; reserved for workloads where the business case survives the cost (elasticity, global reach).
- **Repurchase** — replace with SaaS (CRM, HR); migration becomes data migration.
- **Retire** — usually 10–20% of any estate. The cheapest cloud migration is the app you turn off.
- **Retain** — latency-critical or regulatory-bound systems stay; plan the connectivity (Direct Connect/ExpressRoute) instead of pretending they'll move.

## Phase 3 — Migrate in waves
- **Pilot wave**: one meaningful-but-not-critical workload end-to-end — proves the factory, trains the team, produces the runbook.
- **Wave mechanics**: freeze window or CDC replication, cutover runbook with tested rollback, DNS cutover with TTL pre-lowered, hypercare period with rollback armed.
- **Data migrations dominate the risk**: bandwidth math (how many days to ship 40 TB?), consistency during sync, and the compliance question of where data lands.

## Phase 4 — Optimize (the phase everyone skips)
Post-migration estates pay list prices: rightsizing, commitments, the managed-service conversions you deferred. The optimization wave is where the business case actually closes — schedule it before the program disbands.

## Field note
In interviews, the maturity marker is the 6-Rs fluency applied to *their* scenario — 'this legacy monolith with 8 TB of Oracle? rehost now, replatform the DB later; refactoring it first is how programs die.' Judgment per workload beats strategy decks.`,
  },

  // ── AI/ML (expanded) ────────────────────────────────────────
  "l-ai-1-1": {
    intro:
      "Python's data stack is a toolbox of conventions: the right container for the right job, vectorization over loops, and a handful of libraries that do the heavy lifting. The idioms here are the ones every data job interview assumes.",
    body: `## Containers: choose by access pattern
- **list** — ordered, indexable; your default sequence. **tuple** — immutable; record-like data and dict keys.
- **dict** — key→value with O(1) lookup; the workhorse for joins, grouping, and counting. **set** — membership and dedup, also O(1).
- \`collections\` upgrades: \`Counter\` for counting (\`Counter(words).most_common(10)\`), \`defaultdict(list)\` for grouping, \`deque\` for queues.
- \`dataclass\` for typed records instead of parallel arrays — six months later, \`row.customer_id\` beats \`row[3]\`.

## Vectorize or lose the plot
\`\`\`python
# loop — slow
result = []
for x in data:
    result.append(x * 2)

# vectorized — fast (C loops, SIMD)
import numpy as np
result = np.asarray(data) * 2
\`\`\`
NumPy arrays are homogeneous, contiguous, and vectorized — 10–100× faster than Python loops for numeric work. **pandas** builds on it: think in column operations (\`df.groupby('region')['sales'].sum()\`), not in row iteration. \`df.apply\` is a loop in disguise; reach for built-ins (\`merge\`, \`pivot_table\`, \`str\` accessors) first.

## The everyday workflow idioms
- **List/dict comprehensions** read like math: \`{u.id: u for u in users}\`.
- **\`with\` for everything that opens** — files, DB connections, sessions. Cleanup guaranteed.
- **f-strings with formatting**: \`f"{value:,.2f}\` — production logs are read by humans.
- **Type hints + mypy/pyright** — the data stack is dynamic enough; your pipeline doesn't need to be.
- **venv/uv per project, pinned requirements** — 'works on my machine' is a data-corruption risk when versions change parsing behavior.

## The data-quality reflexes
- Always inspect first: \`df.shape\`, \`df.info()\`, \`df.describe()\`, \`df.isna().sum()\`. The bug is usually a dtypes problem (dates parsed as strings, IDs as floats) — catch it before the join silently multiplies rows.
- **Validate at boundaries**: schemas (pandera/pydantic) on ingest; a pipeline without validation ships garbage confidently.

## Field note
Interviews for data roles often live-code: the differentiator is idiomatic speed — comprehensions, \`groupby\` chains, vectorized conditions (\`np.where\`) — and narrating the shape of the data at each step. That narration is what they're actually hiring.`,
  },
  "l-ai-2-1": {
    intro:
      "Supervised learning is function-fitting with a report card: learn a mapping from features to labels using examples, then prove it generalizes on data the model never saw. The whole discipline lives in how you split, measure, and regularize.",
    body: `## The two jobs
- **Regression** — predict a number (price, demand, risk score). **Classification** — predict a category (fraud/not, churn/no). Same skeleton: features → model → prediction → loss → update.

## The split discipline (the first thing to get right)
- **Train/validation/test** — fit on train, tune on validation, report on test *once*. Touching test repeatedly is how teams ship self-deception.
- **Split by time for temporal data** (train on months 1–11, test on 12) — random splits leak the future and inflate scores.
- **Stratify** classification splits on the label; **group-split** when one entity appears in many rows (per-patient, per-customer) or the same customer trains and tests your model.

## The model menu (start simple, always)
- **Linear/logistic regression** — baseline, interpretable, regularizable (L1/L2). Never skip it; it calibrates your expectations.
- **Trees and ensembles** — random forests (robust default), **gradient boosting** (XGBoost/LightGBM — the tabular-data champion). Handles mixed types, non-linearities, interactions with minimal preprocessing.
- **Neural networks** — where structure matters (images, text, sequences). Overkill for a 10k-row tabular problem — gradient boosting will embarrass it.

## Overfitting and its remedies
Symptom: train score high, validation score low. Remedies in order of preference: **more data** (collect or augment), **regularization** (L2, tree depth limits, dropout), **simpler model**, **early stopping**. Cross-validation (k-fold) makes the estimate stable; learning curves tell you whether to gather data or shrink the model.

## Class imbalance (the real-world constant)
Fraud at 0.1%: accuracy is a lie (99.9% by predicting 'no'). Use **precision/recall, PR-AUC**, class weights or resampling, and calibrate the decision threshold to the business cost — the threshold is a business decision, not a default 0.5.

## Field note
The interview process that reads senior: state the baseline, the split strategy (with the leak discussion), the metric matched to the cost, and *then* the model. Model choice is the least important sentence in that paragraph — saying so is the point.`,
  },
  "l-ai-2-3": {
    intro:
      "Model evaluation metrics are the contract between the model and the business. Pick the wrong one and you optimize your way to a model that's technically excellent and operationally useless — every metric hides an opinion about which mistakes hurt.",
    body: `## Classification: the confusion matrix first
Everything derives from four numbers: TP, FP, FN, TN. From them:
- **Precision** = TP/(TP+FP) — 'when we flag fraud, how often are we right?' Costs of false alarms (analyst time, blocked customers) live here.
- **Recall** = TP/(TP+FN) — 'of all real fraud, how much did we catch?' Costs of misses live here.
- **F1** — their harmonic mean; the single-number compromise when you must have one.
- **PR-AUC** — the honest summary for imbalanced problems (fraud, churn); ROC-AUC flatters on rare classes.
- **ROC-AUC** — ranking quality across thresholds; fine for balanced data and model comparison, misleading as an absolute business metric.

## The threshold is a business dial
The model outputs scores; *you* pick the cutoff. High precision threshold → fewer, cleaner alerts. High recall → catch more, investigate more. Set it from the **cost matrix** (cost of a miss vs. cost of a false alarm) — and revisit when either cost changes.

## Regression: match the metric to the error's shape
- **MAE** — all errors weighted equally (robust to outliers). **RMSE** — big errors hurt disproportionately (when a 10× miss is 10× worse). **MAPE** — relative errors; explodes near zero. **R²** — variance explained; useful, never sufficient.
- Choose like the business would: demand forecasting with stockout costs → weight under-prediction; that's not MAE, that's an asymmetric loss function.

## Beyond the point estimate
- **Calibration** — does '80% probability' mean 80%? (Reliability curves; Platt/isotonic fixes.) Required wherever decisions price probability: credit, insurance, triage.
- **Slice the metrics** — overall numbers hide subgroup failures. Fairness and robustness both live in the slices: per segment, per market, per device.
- **Business metrics last** — the model's AUC is a means; the KPI it moves (fraud loss, retention, review capacity saved) is the report card. Tie them or the model becomes a hobby.

## Field note
Interviews love 'which metric?' — the winning structure: name the costs (FP vs. FN in *their* money), pick the metric that encodes them, then mention threshold calibration and sliced evaluation. That answer shows you've deployed, not just trained.`,
  },
  "l-ai-3-1": {
    intro:
      "A neural network is stacked linear maps separated by non-linearities, trained by following the gradient downhill. Everything else — depth, tricks, architectures — is engineering around that core. Understanding the core makes the engineering legible.",
    body: `## The neuron and the stack
Each neuron: weighted sum + bias → **activation**. The non-linearity (ReLU today: \`max(0, x)\`; sigmoids in gates) is what lets layers compose into functions beyond linear — without it, a 100-layer net collapses into one matrix multiply.
- **Forward pass**: input × weights through layers → prediction. **Loss**: a number saying how wrong (MSE for regression, cross-entropy for classification).

## Backpropagation: the chain rule, industrialized
The loss is a function of millions of weights; backprop computes every partial derivative by applying the chain rule backward through the graph. **Gradient descent** then steps each weight downhill; **mini-batch SGD** is the practical middle (stable gradients, feasible batch sizes).

## The training mechanics that matter
- **Learning rate** — the single most important hyperparameter: too high diverges, too low crawls. Schedules (warmup + cosine decay) and optimizers (Adam/AdamW) are the modern default.
- **Batches and epochs** — one pass = epoch; batch size trades gradient noise against memory. Normalize inputs (batch/layer norm) so optimization isn't fighting scale.
- **Initialization** (He/Xavier) and **residual connections** — the two tricks that made deep networks trainable at all: gradients must survive the journey backward.

## The overfitting toolkit (neural edition)
- **Weight decay (L2)**, **dropout** (randomly silence neurons during training — forces redundancy), **early stopping** on validation loss, and **data augmentation** (flips, crops, noise — the cheapest regularization that exists).
- Watch the train/val curves like a clinician: diverging gap = overfit; both flat and high = underfit or wrong architecture.

## Why 'deep'?
Depth composes: early layers learn edges/characters, middle layers motifs/words, late layers objects/intent — hierarchy emerges because each layer reuses the previous abstraction. (This is transfer learning's foundation: pre-trained layers + your data + a new head beats training from scratch until you have a datacenter.)

## Field note
When a deep-learning interview goes technical, anchor on the loop: forward → loss → backprop → step, then name the two things you'd tune first (learning rate, batch size) and the one thing you'd fix if val loss oscillates (LR schedule). Calm fundamentals beat architecture buzzwords.`,
  },

  // ── ETL Pipelines (expanded) ────────────────────────────────
  "l-de-etl-1": {
    intro:
      "ETL/ELT patterns are the load-bearing decisions of a data platform: how data moves, transforms, and arrives — and how you know when it didn't. Get the pattern per source right and the warehouse stays trustworthy; get it wrong and every dashboard inherits the doubt.",
    body: `## ETL vs. ELT (the modern default)
- **ETL** — transform *before* loading (in flight, often Spark/Kafka). Required when data must be filtered/compressed before landing, or compliance demands it never lands raw.
- **ELT** — land raw, transform *inside* the warehouse (dbt-style SQL on warehouse compute). Wins: raw data retained for reprocessing, transforms are version-controlled SQL, and the warehouse's engine does the heavy lifting. Default to ELT unless you have a reason not to.

## Ingestion patterns per source
- **Batch** — scheduled pulls for databases and files: **incremental** on updated_at/watermarks (not full dumps), **append-only** for immutable events, **snapshot/scd** for slowly changing dimensions (type 2: keep history with valid_from/valid_to).
- **Streaming/CDC** — change-data-capture via WAL (Debezium) for near-real-time sync without hammering source DBs; event streams (Kafka) when many consumers need the same feed.
- **APIs** — pagination done correctly (cursor over offset), rate-limit backoff, and state checkpoints so a crash resumes instead of restarting the world.

## The reliability patterns that separate platforms from scripts
- **Idempotent, atomic loads** — re-running yesterday's load changes nothing (delete+insert by partition, or MERGE). Exactly-once *effects* even with at-least-once delivery.
- **Data quality gates** — row counts vs. expectation bands, null-rate checks, schema contracts (a new column upstream must not silently break the model), freshness SLAs (the dashboard says 'data as of 06:00' and means it).
- **Orchestration with lineage** — Airflow/Dagster DAGs with dependencies, retries with backoff, and lineage so 'which dashboards break if this source changes?' has an answer. Alerting on *staleness* catches the silent failure — the pipeline that succeeds at loading nothing.

## Modeling for analytics (the destination shape)
- **Medallion layers**: bronze (raw, immutable), silver (cleaned/conformed), gold (business models — star schemas: facts + dimensions for the metrics people actually ask for).
- **dbt discipline**: models in git, tests (unique/not-null/relationships) as first-class, docs generated. The warehouse stops being a swamp of someone's old queries.

## Field note
The interview scenario 'a dashboard number looks wrong' — the senior walk-through: check freshness SLA → row counts vs. history → the specific transformation's logic → upstream schema diff. That order *is* the discipline; patterns exist to make it fast.`,
  },

  // ── React Native (expanded) ─────────────────────────────────
  "l-mob-1": {
    intro:
      "React Native runs your React code against native views through a bridge — or, in the new architecture, through JSI's direct calls. The result: one codebase, real native performance characteristics, and a specific set of trade-offs you should be able to defend.",
    body: `## The architecture, briefly and honestly
- **Old architecture**: JS thread ↔ native world via an asynchronous, serialized **bridge** — fine for most UI, the bottleneck for high-frequency updates (gestures, lists).
- **New architecture** (default now): **JSI** allows direct synchronous calls; **Fabric** (renderer) and **TurboModules** (lazy native modules) cut serialization overhead. Most apps won't think about it; gesture-heavy and high-FPS apps will feel the difference.
- **Expo vs. bare**: Expo is the toolchain (dev client, EAS builds/updates, config plugins) — default to it, eject only for exotic native needs. 'Can we do this in Expo?' is almost always yes in 2026.

## The component mapping that transfers
- \`View\`/\`Text\`/\`Image\`/\`Pressable\` instead of div/span/img/button — styling via \`StyleSheet\` (a constrained Flexbox; **no CSS inheritance**, every style local).
- **Lists**: \`FlatList\` for the everyday case, \`FlashList\`/\`LegendList\` when profiling shows list jank. Never \`map()\` over hundreds of views — the scroll stutters and the memory dies.
- **Navigation** — React Navigation (JS) or native navigators; the stack/tab/drawer mental model transfers from web routing, but params and gestures are typed per-screen.

## Where mobile differs from web (design for it or die by it)
- **Lifecycle**: app backgrounding suspends JS — persist state on every meaningful change, not on 'unload' (there is no unload).
- **Network is hostile**: offline-first (see the next lesson), request timeouts + retries with backoff, and UI that communicates connectivity honestly.
- **Permissions are a UX flow** (camera, location, notifications) — request in context, handle denial gracefully; a permission dialog at first launch is an app-store-rejection risk and a trust killer.
- **Releases**: app-store review takes days — **OTA updates** (EAS Update) ship JS fixes instantly, but native changes wait for review. Plan features around that boundary.

## Field note
In interviews, the RN seniority signal is the performance vocabulary: bridge vs. JSI, why lists need virtualization, what belongs on the UI thread, and when to drop to a native module. One profiling anecdote ('the 60fps scroll that FlashList fixed') beats ten API questions.`,
  },
  "l-mob-3": {
    intro:
      "Mobile networks fail constantly and silently — tunnels, elevators, packet loss on the edge of a cell. Offline-first design assumes disconnection is normal, not exceptional, and treats sync as the core engineering problem.",
    body: `## The local-first data layer
- **Source of truth on device**: SQLite (via expo-sqlite/WatermelonDB/Realm) holds the data; the UI reads from it; the network *updates* it. The app must never depend on a live connection to render.
- **Writes queue, not block**: user actions append to an outbox (mutation log) and apply optimistically to local state; the queue drains when connectivity returns. The UI never spins on 'saving' for local operations.
- **Conflict resolution by domain**: last-write-wins for simple fields; per-field merges for forms; CRDTs or server-authoritative-with-version for hard cases. Choose per collection and document it — 'what happens when two devices edit offline?' is the design review question.

## The sync protocol, minimal and correct
- Pull: \`GET /sync?since=<cursor>\` → server returns changes + new cursor. Push: send the outbox with client-generated UUIDs; server dedupes by ID (idempotency for free).
- **Order and idempotency**: server applies mutations idempotently (UUIDs); client applies server changes by primary key upsert. Track a sync cursor per collection; store it in the same transaction as the data it covers.
- **Partial failures**: one bad record must not poison the batch — per-item results, DLQ for the poison item, retry with backoff for the transient ones.

## The UX of honesty
- Show connectivity state *when it matters* (an offline badge, queued-indicators on pending rows) — silent divergence destroys trust when the user later discovers their edit didn't land.
- **Optimistic UI with an undo path** where conflicts are likely; pessimistic locks for genuinely contended resources (double-booked rooms) rather than clever merges nobody can predict.
- **Media is its own problem**: defer uploads, resume them (chunked), compress before transmit on metered connections.

## Field note
The field that tests offline-first: open the app in airplane mode, create three records, edit one, kill the app, restore network. The data must all be there, deduped, with the conflicts visible. Build that scenario into your test suite before your users find it on a bus.`,
  },

  // ── Blockchain (expanded) ───────────────────────────────────
  "l-bc-1": {
    intro:
      "A blockchain is an append-only ledger replicated across mutually distrusting nodes, ordered by consensus instead of an administrator. Strip the hype and four mechanisms remain — hashes, signatures, consensus, and incentives — and each answers one trust question.",
    body: `## The four mechanisms
- **Cryptographic hash chain** — each block commits to the previous block's hash: history is tamper-*evident* (changing block N invalidates every hash after it). Evidence, not truth.
- **Digital signatures** — transactions are signed with the spender's private key; the network verifies ownership without identities. The account *is* the keypair.
- **Consensus** — the mechanism that decides which chain is canonical: **proof-of-work** (spend energy to propose; longest valid chain wins — Bitcoin) or **proof-of-stake** (bond capital, attest; slashing punishes equivocation — Ethereum post-Merge). Finality differs: PoW is probabilistic (wait for confirmations); PoS has economic finality (checkpoints).
- **Incentives** — block rewards + fees pay for security; the fee market prices congestion. When the incentive math and the security need drift, that *is* the security story (see any 51% discussion).

## Smart contracts: code as the counterparty
- Programs stored on-chain, executed by every node deterministically — 'the code is the escrow'. **Immutability cuts both ways**: no patches; bugs are permanent and valuable (the DAO lesson).
- **Upgradability patterns** exist (proxy contracts) and reintroduce the admin-trust that immutability removed — every 'upgradeable' contract has a multisig that owns it. Ask who holds the keys.

## Trust boundaries, stated plainly
- **What it gives you**: tamper-evident shared history, censorship-resistance, transfers without a trusted intermediary.
- **What it doesn't**: oracle truth (a chain can't verify off-chain facts — the oracle is the trust assumption), privacy (public ledgers are pseudonymous, de-anonymized by graph analysis), or throughput (every node re-executes everything — hence L2 rollups).
- **Layer 2s** (rollups) execute off-chain and post proofs/data to L1 — inheriting L1 security at L1-fraction costs. Most 'blockchain app' engineering in 2026 is L2 engineering.

## Field note
In interviews, the signal is the trust-boundary question: 'what does this ledger remove the need to trust, and what new trust did it introduce?' Systems that can't answer the second half are the ones that end up in post-mortems.`,
  },
  "l-bc-4": {
    intro:
      "DeFi rebuilt the financial primitives — trades, loans, stable value — as permissionless smart contracts. Whether or not it's your domain, it's the deepest workout smart-contract design gets: composability, incentive engineering, and the sharpest lessons in adversarial thinking.",
    body: `## The primitives
- **AMMs (Uniswap-style)** — liquidity pools price assets by formula (x·y=k) instead of order books. Anyone can be the market maker; the cost is **impermanent loss** and **MEV extraction** (sandwich attacks around large trades).
- **Lending markets** (Aave/Compound-style) — overcollateralized loans with algorithmic rates and **liquidations** (undercollateralized positions auctioned). The risk engine *is* the product.
- **Stablecoins** — fiat-backed (custodial trust), crypto-collateralized (overcollateralized, governance-managed), algorithmic (incentive-designed — and historically, the failure class; see Terra). The collateral and the redemption path *are* the analysis.

## Composability: the superpower and the systemic risk
Protocols call protocols ('money legos'): your app composes Aave+Uniswap in one transaction. The flip side is **systemic coupling** — when a base layer's oracle or pool misprices, every dependent protocol inherits the failure within the same block.

## The security playbook (why this field sharpened everyone)
- **Attack surface = value at rest**: flash-loan attacks (borrow enormous capital *within one transaction* to manipulate a price feed), oracle manipulation, reentrancy, governance capture. The mitigations became industry-standard discipline: audits + **bug bounties**, **timelocks** on admin changes (users can exit before a malicious upgrade), **circuit breakers** (pause on anomaly), and multi-oracle price feeds with deviation checks.
- **Rug-pull taxonomy** — the user-side checklist: liquidity locked? admin keys timelocked/multisig? oracles decentralized? contracts verified and non-upgradeable (or who holds the upgrade key)?

## Where real-world assets (RWA) enter
Tokenized treasuries, invoices, and real estate bring the off-chain trust problem back: the token is only as good as the legal wrapper and the oracle attesting the asset. DeFi's trustless core meets lawyers — the interesting design space of 2026.

## Field note
For engineering interviews beyond crypto: DeFi is the public case-study library for **incentive design and adversarial review**. 'Design a system where participants profit by finding its flaws' — that's DeFi's contribution to how our industry thinks about security, and one war story from it (the oracle that got flash-loaned) transfers to any system that trusts a price feed.`,
  },
} as Record<string, DeepReading>;

/** Replace a lesson's thin content with its authored deep reading, if any. */
export function applyReadingContent<T extends { id: string; content?: string }>(
  lesson: T
): T {
  const deep = READINGS[lesson.id];
  if (!deep) return lesson;
  return {
    ...lesson,
    content: `${deep.intro}\n\n${deep.body}`,
  };
}

/** Alias used by the lazy CoursePlayer: deepens reading lessons at render time. */
export const deepenedLesson = applyReadingContent;

export const DEEP_READING_COUNT = Object.keys(READINGS).length;
