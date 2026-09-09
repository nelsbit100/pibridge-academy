import {
  title, keyterms, bullets, steps, diagram, flow, code, terminal, compare, scenario, quiz, stat, recap,
  type LessonVideoScript,
} from "./core";

// ════════════════════════════════════════════════════════════════
// CYBERSECURITY FUNDAMENTALS — deep scripts (course-cyber-fundamentals)
// ════════════════════════════════════════════════════════════════

export const deepCF: LessonVideoScript[] = [
  {
    lessonId: "les-cf-1-1", lessonTitle: "The CIA Triad", courseId: "course-cyber-fundamentals",
    scenes: [
      title(
        "The CIA Triad",
        "cybersecurity fundamentals · lesson 1",
        "Confidentiality · Integrity · Availability — the yardstick of the entire field",
        [
          "Welcome to Cybersecurity Fundamentals. Every concept in this course — and in this career — traces back to three words you are about to master.",
          "By the end of this lesson you will read any security incident through the CIA lens and know exactly which pillar broke.",
        ],
        "rose",
        [
          "Define confidentiality, integrity and availability precisely",
          "Name the primary control that protects each pillar",
          "Analyze incidents by asking: which pillar failed?",
          "Explain why the triad is always a business trade-off"
        ]
      ),
      keyterms([
        { term: "Confidentiality", definition: "Only authorized people can read data. Protected by encryption and access control." },
        { term: "Integrity", definition: "Data is not altered without detection. Protected by hashing and digital signatures." },
        { term: "Availability", definition: "Systems and data work when needed. Protected by redundancy and backups." },
        { term: "AAA", definition: "Authentication (who are you), Authorization (what may you do), Accounting (what did you do)." },
        { term: "Risk", definition: "Likelihood × impact. Security exists to reduce risk at a cost the business accepts." },
      ], [
        "Three pillars, one supporting framework, and the word that funds everything: risk.",
        "Confidentiality keeps data unreadable to the wrong people — encryption and access control are its tools.",
        "Integrity guarantees data has not changed silently — hashing and signatures detect tampering.",
        "Availability keeps systems up when needed — redundancy and backups are its armor.",
        "AAA is the daily practice underneath: prove identity, enforce permission, record what happened.",
        "And risk is the currency: security spending exists to reduce likelihood times impact, at a price the business accepts.",
      ], "rose"),
      diagram("One Breach, Three Pillars", {
        breach: { label: "Ransomware", x: 380, y: 60, shape: "square", emphasis: true },
        conf: { label: "Confidentiality — data stolen & leaked", x: 150, y: 220, shape: "square" },
        integ: { label: "Integrity — files encrypted", x: 380, y: 220, shape: "square" },
        avail: { label: "Availability — systems offline", x: 610, y: 220, shape: "square" },
      }, [
        { from: "breach", to: "conf", animated: true },
        { from: "breach", to: "integ", animated: true },
        { from: "breach", to: "avail", animated: true },
      ], [
        "Here is why the triad matters: one attack can break all three pillars at once.",
        "Ransomware steals data first — confidentiality broken, with extortion threats to publish it.",
        "It encrypts files in place — integrity broken, you cannot trust what remains.",
        "And it takes systems offline — availability broken, the business stops.",
        "When you hear 'we had a breach', the professional response is: which pillars, in what order, with what evidence?",
      ], "rose"),
      compare("What Protects Each Pillar", {
        title: "Confidentiality", points: ["Encryption at rest & in transit", "Access control & least privilege", "Classification: label the data first"],
      }, {
        title: "Integrity + Availability", points: ["Hashes & signatures detect change", "Redundancy: no single point of failure", "Backups: tested, offline, immutable"],
        accent: "cyan",
      }, [
        "Each pillar has its own toolbox — learn them as pairs.",
        "Confidentiality's toolkit: encryption for the data, access control for the people, classification to decide which is which.",
        "Integrity relies on hashes and signatures to prove nothing changed. Availability relies on redundancy so nothing matters when something fails — and backups that are tested, offline, and immutable.",
      ], "rose"),
      scenario(
        "Case study · the tuition portal",
        "A university's student-payment portal goes down during fee week. Students can't pay. While investigating, the team finds the database was readable over the public internet without authentication.",
        "Two pillars, two findings: availability failed outright (revenue and trust bleeding by the hour), and the exposure revealed a standing confidentiality failure that predated the outage.",
        "Fixes: redundancy behind a load balancer for availability; authentication and network restrictions for confidentiality; and — the real lesson — the confidentiality bug existed for years but was only discovered when availability broke. Availability incidents are audit opportunities.",
      ),
      quiz(
        "An attacker changes the bank-account number on a company's public invoice PDF without being noticed. Which pillar failed?",
        ["Integrity", "Confidentiality", "Availability", "Accounting"],
        0,
        "The data wasn't stolen (confidentiality) or made unavailable — it was silently modified. Detecting silent modification is exactly what hashing and signatures provide.",
        [
          "Knowledge check — ask: what happened to the data?",
        ],
        "purple"
      ),
      recap([
        "Confidentiality = unreadable to the wrong people (encryption, access control).",
        "Integrity = unmodified without detection (hashes, signatures).",
        "Availability = working when needed (redundancy, tested backups).",
        "AAA — authentication, authorization, accounting — is the daily practice under the pillars.",
        "Every incident report answers: which pillar(s), in what order, with what evidence?",
      ], [
        "What you now know.",
        "The triad is not trivia — it is the diagnostic instrument you will carry through every incident, audit, and design review in this course.",
        "Next lesson: threat modeling with STRIDE — finding weaknesses before attackers do.",
      ], "rose"),
    ],
  },
  {
    lessonId: "les-cf-1-3", lessonTitle: "Threat Modelling with STRIDE", courseId: "course-cyber-fundamentals",
    scenes: [
      title(
        "Threat Modelling with STRIDE",
        "cybersecurity fundamentals · design defense",
        "Six questions that find weaknesses before attackers do",
        [
          "Threat modeling is the cheapest security you will ever do: finding a flaw on a whiteboard costs minutes, while finding it in production costs a breach.",
          "STRIDE is the classic six-category method — by the end you can run it on any system you design or inherit.",
        ],
        "purple",
        [
          "Explain each STRIDE category with a concrete example",
          "Draw a system's trust boundaries",
          "Run a STRIDE pass over a real feature",
          "Rank threats by likelihood and impact"
        ]
      ),
      keyterms([
        { term: "Threat model", definition: "A structured answer to 'what could go wrong here, and what do we do about it?'" },
        { term: "Trust boundary", definition: "Any line where data crosses from one trust level to another — internet→app, user→admin." },
        { term: "Attack surface", definition: "Every point where an attacker can interact with the system — every input, endpoint, and door." },
        { term: "STRIDE", definition: "Spoofing, Tampering, Repudiation, Information disclosure, Denial of service, Elevation of privilege." },
      ], [
        "Four terms make the method concrete.",
        "A threat model is just a structured answer to one question: what could go wrong, and what do we do about it?",
        "Trust boundaries are where the answers live — every line where data crosses between trust levels.",
        "The attack surface is the sum of all doors an attacker can touch.",
        "STRIDE is the checklist that walks you through the doors: six categories, six questions, every component.",
      ], "purple"),
      steps("S · T · R · I · D · E", [
        { title: "Spoofing", detail: "fake identity — stolen login, forged token" },
        { title: "Tampering", detail: "silent modification — MITM, altered payload" },
        { title: "Repudiation", detail: "'it wasn't me' — no logs to prove otherwise" },
        { title: "Info disclosure", detail: "leaks — verbose errors, open buckets" },
        { title: "Denial of service", detail: "availability broken — floods, resource exhaustion" },
        { title: "Elevation of privilege", detail: "user becomes admin — the jackpot" },
      ], [
        "Walk the six categories and force a concrete example for each.",
        "Spoofing: can someone pretend to be someone else here? Stolen credentials, forged tokens.",
        "Tampering: can data change silently in transit or storage? Repudiation: if someone does something, can they deny it — are there logs?",
        "Information disclosure: what leaks? Verbose errors, unencrypted traffic, public buckets.",
        "Denial of service: what breaks availability? And elevation of privilege: how does a user become an admin — the jackpot every attacker hunts for.",
        "Six questions, every component. That is the whole method.",
      ], "purple"),
      flow("The Threat-Modelling Loop", {
        draw: { label: "1 · Draw the system", x: 110, y: 190, shape: "square", emphasis: true },
        stride: { label: "2 · STRIDE each element", x: 340, y: 190, shape: "square" },
        rank: { label: "3 · Rank: likely × damaging", x: 570, y: 190, shape: "square" },
        fix: { label: "4 · Mitigate & re-check", x: 700, y: 90, shape: "square" },
      }, [
        { from: "draw", to: "stride", speed: 1.6 },
        { from: "stride", to: "rank", speed: 1.6 },
        { from: "rank", to: "fix", speed: 1.6 },
        { from: "fix", to: "draw", speed: 1.6 },
      ], [
        "The loop has four moves — and it never really ends.",
        "Draw the system honestly: users, services, data stores, and especially the trust boundaries between them.",
        "STRIDE each element at each boundary. Rank the findings: most likely times most damaging comes first.",
        "Mitigate, then re-check — because every fix changes the model. The deliverable is not a document; it is the shared picture of where you are weak.",
      ], "Draw → STRIDE → rank → fix → repeat", "purple"),
      scenario(
        "Case study · the new payment feature",
        "A team plans 'pay by mobile money': the web app calls a payment provider's API, then marks invoices paid when a callback arrives.",
        "The STRIDE pass finds three threats in twenty minutes: the callback URL had no authentication (anyone could POST 'invoice paid' — spoofing), amounts were read from user input without server-side validation (tampering), and callbacks were logged without request IDs (repudiation).",
        "Fixes: HMAC-verify callbacks, re-fetch amounts server-side, log request IDs with timestamps. Cost: half a day. Cost of finding these in production: a fraud investigation. This is why threat modeling pays for itself.",
      ),
      quiz(
        "A file-upload feature accepts any file type and saves it under the web root. Which STRIDE category is the primary threat?",
        ["Elevation of privilege", "Repudiation", "Denial of service", "Spoofing"],
        0,
        "An uploaded file under the web root can become executable code — a webshell — turning a normal user into server-level attacker. That is the definition of elevation of privilege.",
        [
          "Knowledge check — what could an uploaded .php file actually do?",
        ],
        "purple"
      ),
      recap([
        "Threat modeling = draw the system, walk STRIDE at every trust boundary, rank, mitigate.",
        "Spoofing: fake identity · Tampering: silent change · Repudiation: no proof.",
        "Info disclosure: leaks · DoS: availability broken · EoP: user becomes admin.",
        "Rank by likelihood × impact — fix the likely-and-damaging first.",
        "Every mitigation changes the model — the loop never ends.",
      ], [
        "What you now know.",
        "You can run a STRIDE pass on any feature in minutes — and the case study showed the method finding real fraud-capable flaws before a line of code existed.",
        "Next lesson: the threat landscape — the actors who will actually come through those doors.",
      ], "purple"),
    ],
  },
  {
    lessonId: "les-cf-2-1", lessonTitle: "Threat Actors & Motivations", courseId: "course-cyber-fundamentals",
    scenes: [
      title(
        "Threat Actors & Motivations",
        "cybersecurity fundamentals · know your adversary",
        "Who attacks, why they bother, and what that means for your defenses",
        [
          "Defense without an adversary model is decoration. This lesson maps the five actor classes — their skill, their goals, and the defenses each one actually demands.",
        ],
        "amber",
        [
          "Name the five threat-actor classes and their motivations",
          "Match defense investment to the adversary you actually face",
          "Explain APT behavior and why it defeats naive defense",
          "Describe insider risk: the adversary already inside"
        ]
      ),
      keyterms([
        { term: "Script kiddie", definition: "Unskilled attacker using existing tools — volume, noise, opportunistic targets." },
        { term: "Hacktivist", definition: "Ideologically motivated — causes, disruption, publicity. Targets align with the cause." },
        { term: "Organized crime", definition: "Profit-driven professionals — ransomware, fraud, extortion. The dominant internet threat." },
        { term: "Nation-state / APT", definition: "State-funded espionage or sabotage — patient, custom tooling, zero-days." },
        { term: "Insider", definition: "Employee or contractor with legitimate access — careless or malicious, already past the perimeter." },
      ], [
        "Five actor classes — learn each one's motivation, because motivation predicts behavior.",
        "Script kiddies run other people's tools at volume: noisy scans, opportunistic targets, quick to quit.",
        "Hacktivists attack for causes — their targets follow their politics, and publicity is the point.",
        "Organized crime is the professional class: ransomware, fraud, extortion as business lines. Today's dominant threat.",
        "Nation-state groups — the APTs — are patient, funded, and armed with custom tooling and zero-days.",
        "And insiders are the hardest class: they already have the keys and the context.",
      ], "amber"),
      compare("Script Kiddie vs APT", {
        title: "Script kiddie", points: ["Loud, high-volume scans", "Gives up when blocked", "Anyone can be a target", "Defeated by patching & MFA"],
      }, {
        title: "APT group", points: ["Quiet, patient, persistent", "Adapts to every block", "Chooses targets deliberately", "Defeated by detection & response"],
        accent: "purple",
      }, [
        "The contrast between the extremes teaches the most.",
        "Script kiddies are loud and shallow: massive scans, default exploits, immediate retreat when blocked. Almost anyone can be a target, and basics defeat them.",
        "APTs are the opposite in every dimension: quiet entry, weeks of patience, custom tooling, and adaptation to every defense. They cannot be 'blocked' — they must be detected and evicted.",
        "Your defense budget follows this line: hygiene for the masses, detection and response for the patient ones.",
      ], "amber"),
      flow("Anatomy of a Ransomware Attack", {
        phish: { label: "Phishing email", x: 100, y: 190, shape: "square", emphasis: true },
        access: { label: "Access + recon", x: 300, y: 190, shape: "square" },
        exfil: { label: "Steal data", x: 500, y: 190, shape: "square" },
        encrypt: { label: "Encrypt + extort", x: 680, y: 190, shape: "square", emphasis: true },
      }, [
        { from: "phish", to: "access", speed: 1.6 },
        { from: "access", to: "exfil", speed: 1.6 },
        { from: "exfil", to: "encrypt", speed: 1.6 },
      ], [
        "Modern ransomware is organized crime at its most industrialized — and it follows a script.",
        "It starts with phishing — still the number-one initial access. Then days of quiet recon and privilege escalation.",
        "Critical change from a decade ago: data is stolen BEFORE encryption. That is the double extortion — pay to decrypt, or we publish.",
        "Only then comes the visible moment: encryption and the ransom note. Everything before was invisible. Everything after is your incident.",
      ], "The visible attack is the last step", "rose"),
      scenario(
        "Case study · the contractor",
        "A logistics firm's systems show data being staged for exfiltration — from an account with legitimate credentials, at normal working hours, from a managed laptop.",
        "It was a contractor with a grievance — and legitimate access. Every perimeter control logged him in 'correctly'. Insider risk bypasses firewalls by definition: the adversary is already inside, with context that makes attacks precise.",
        "Controls that actually catch insiders: least privilege (he could see far too much), data-loss alerts on bulk downloads, separation of duties, and offboarding that is immediate and complete. Trust is not a control.",
      ),
      quiz(
        "A company in Ghana is hit by ransomware that also threatens to publish stolen customer data. Which actor class is almost certainly responsible?",
        ["Organized crime", "Script kiddies", "Hacktivists", "Insiders"],
        0,
        "Double extortion — encryption plus threatened publication — is the signature business model of organized ransomware groups. Script kiddies rarely have exfiltration infrastructure; hacktivists want publicity, not payments.",
        [
          "Knowledge check — match the business model to the actor.",
        ],
        "purple"
      ),
      recap([
        "Five classes: kiddies (volume), hacktivists (causes), crime (profit), states (espionage), insiders (already inside).",
        "Motivation predicts behavior — and behavior tells you which defense applies.",
        "Basics (patching, MFA) beat the volume classes; detection & response beat the patient ones.",
        "Ransomware = phish → recon → exfiltrate → encrypt. The visible part is the end.",
        "Insiders bypass the perimeter by definition — least privilege and DLP are the controls.",
      ], [
        "What you now know.",
        "You can now name the adversary behind an attack pattern — and choose defenses that actually apply to them.",
        "Next lesson: malware itself — the tools these actors ship.",
      ], "amber"),
    ],
  },
  {
    lessonId: "les-cf-2-3", lessonTitle: "Malware Deep Dive", courseId: "course-cyber-fundamentals",
    scenes: [
      title(
        "Malware Deep Dive",
        "cybersecurity fundamentals · the attacker's toolbox",
        "The malware family tree, how each branch behaves, and how each one is caught",
        [
          "Malware is any software built to cause harm — but the family has many branches, and each branch behaves differently, hides differently, and is caught differently.",
          "This lesson is your field guide: recognize the species, know the signature, know the response.",
        ],
        "rose",
        [
          "Classify malware into its major families",
          "Explain the kill chain of a modern infection",
          "Recognize fileless and living-off-the-land techniques",
          "Match each family to its detection point"
        ]
      ),
      keyterms([
        { term: "Virus / Worm", definition: "Self-replicating code. Viruses need a host file; worms spread across networks alone." },
        { term: "Trojan / RAT", definition: "Malware disguised as legitimate software; a RAT gives the attacker interactive remote control." },
        { term: "Ransomware", definition: "Encrypts data and extorts for the key — modern variants steal data first for double extortion." },
        { term: "Rootkit", definition: "Hides below or inside the OS itself — the deepest, hardest-to-evict persistence." },
        { term: "Fileless malware", definition: "Runs in memory via trusted tools (PowerShell, WMI) — no file on disk to scan." },
      ], [
        "Five families cover most of what you will meet.",
        "Viruses attach to files; worms need no host at all — they spread themselves across networks. WannaCry was a worm.",
        "Trojans wear a disguise; the RAT — remote access trojan — adds interactive control, the attacker's hands on the keyboard.",
        "Ransomware encrypts and extorts — the dominant money-maker, and you now know it steals before it locks.",
        "Rootkits hide beneath the operating system, corrupting the very tools you would use to find them.",
        "And fileless malware never touches disk — it lives in memory, running through trusted admin tools.",
      ], "rose"),
      flow("Life of an Infection", {
        deliver: { label: "Delivery · phish/drive-by", x: 100, y: 190, shape: "square" },
        execute: { label: "Execution · user opens", x: 300, y: 190, shape: "square", emphasis: true },
        persist: { label: "Persistence · autoruns", x: 500, y: 190, shape: "square" },
        command: { label: "C2 · attacker commands", x: 690, y: 190, shape: "square", emphasis: true },
      }, [
        { from: "deliver", to: "execute", speed: 1.5 },
        { from: "execute", to: "persist", speed: 1.5 },
        { from: "persist", to: "command", speed: 1.5 },
      ], [
        "Nearly every infection walks this chain — which is why the chain is where you intervene.",
        "Delivery: an email attachment, a poisoned download, a drive-by download. Execution: the moment a human opens it — click rates are still the top variable.",
        "Persistence: the malware registers autorun keys, services, or scheduled tasks so reboot does not evict it.",
        "Command and control: a beacon to the attacker's server. Break any link — mail filtering, user training, autorun monitoring, C2 blocking — and the infection dies.",
      ], "Break any link and the chain fails", "rose"),
      compare("Classic vs Fileless Malware", {
        title: "Classic (on disk)", points: ["Drops executable files", "Antivirus scans catch it", "Signatures & hashes work", "Easier forensics — artifacts exist"],
      }, {
        title: "Fileless / LOLBins", points: ["Runs in memory via PowerShell, WMI", "AV sees 'PowerShell ran' — normal", "Behavior analytics required", "Registry-only persistence"],
        accent: "cyan",
      }, [
        "The modern battleground is fileless execution.",
        "Classic malware drops files — which antivirus compares against signatures. It still works against commodity threats.",
        "Fileless malware abuses trusted admin tools — PowerShell, WMI, rundll32 — the 'living off the land' technique. There is no suspicious file, because the 'file' is cmd.exe doing something it was never meant to do.",
        "Detection shifts from what ran to how it behaved: PowerShell downloading from the internet and writing to autoruns is a behavioral alarm, not a signature match.",
      ], "rose"),
      scenario(
        "Case study · the trusted tool",
        "EDR alerts: winword.exe spawned powershell.exe, which downloaded a payload from a newly-registered domain and wrote a value to the Run registry key.",
        "Every element is 'normal' software — Word, PowerShell, the registry. The chain is not: Word does not spawn shells, PowerShell does not fetch payloads, and Run keys do not appear by themselves. This is a fileless infection delivered by a macro document.",
        "Response: isolate the endpoint, capture PowerShell script-block logs, kill the persistence, and — root cause — disable Office macros from the internet via policy. One GPO setting would have prevented the entire chain.",
      ),
      quiz(
        "Malware that runs entirely through PowerShell and WMI without writing files to disk is best detected by:",
        ["Behavioral analytics (process chains)", "File signature scanning", "Disk defragmentation", "Port scanning"],
        0,
        "No files means no signatures to match. Detection comes from watching behavior: which processes spawned which, what they downloaded, what they changed.",
        [
          "Knowledge check — no file, no signature. What's left?",
        ],
        "purple"
      ),
      recap([
        "Families: virus/worm (spread), trojan/RAT (disguise + control), ransomware (extortion), rootkit (deep hide), fileless (no disk).",
        "The kill chain: delivery → execution → persistence → C2. Break any link.",
        "Ransomware exfiltrates before encrypting — double extortion.",
        "Fileless abuse of trusted tools (LOLBins) shifts detection to behavior.",
        "Defense-in-depth matters because each control covers a different chain link.",
      ], [
        "What you now know.",
        "You can classify malware on sight, narrate its kill chain, and name the control that breaks each link.",
        "Next lesson: authentication — because nearly every attack ends with someone proving a false identity.",
      ], "rose"),
    ],
  },
  {
    lessonId: "les-cf-3-1", lessonTitle: "Authentication Factors", courseId: "course-cyber-fundamentals",
    scenes: [
      title(
        "Authentication Factors",
        "cybersecurity fundamentals · proving identity",
        "Something you know, have, or are — and why combining two beats perfecting one",
        [
          "Authentication answers one question: are you really who you claim to be? The proof comes in exactly three flavors — and the interplay between them is the most cost-effective security decision you will ever make.",
        ],
        "cyan",
        [
          "Name the three factors with real examples",
          "Explain why each factor fails differently",
          "Compare SMS, TOTP and FIDO2 honestly",
          "Justify MFA as the highest-value control"
        ]
      ),
      keyterms([
        { term: "Knowledge factor", definition: "Something you know — passwords, PINs, security questions. Shareable, guessable, phishable." },
        { term: "Possession factor", definition: "Something you have — phone, token, smart card. Can be stolen, but not guessed." },
        { term: "Inherence factor", definition: "Something you are — fingerprint, face, voice. Convenient, but cannot be rotated if copied." },
        { term: "MFA", definition: "Multi-factor authentication — two or more DIFFERENT factors. Two passwords don't count." },
        { term: "Phishing-resistant", definition: "FIDO2/WebAuthn: the credential is cryptographically bound to the real site's domain, so fake sites can't use it." },
      ], [
        "Three factors, one rule, one gold standard.",
        "Knowledge is the password — the oldest and weakest: guessable, reusable, and hand-delivered to phishers daily.",
        "Possession is the phone or token — it cannot be phished with a fake login page, but it can be stolen or SIM-swapped.",
        "Inherence is biometric — convenient and fast, but you cannot rotate a fingerprint the way you rotate a password.",
        "MFA means two DIFFERENT factors — password plus phone. Two passwords is still one factor.",
        "And FIDO2 is the phishing-resistant endgame: the credential literally cannot work on a fake site because it is bound to the real domain.",
      ], "cyan"),
      compare("SMS vs TOTP vs FIDO2", {
        title: "SMS one-time codes", points: ["Better than nothing", "SIM-swap attacks defeat it", "Phishable — users type codes into fake pages"],
      }, {
        title: "TOTP app / FIDO2 key", points: ["TOTP: codes in an app, no network to intercept", "FIDO2: domain-bound, unphishable", "Both defeat the bulk of account takeover"],
        accent: "green",
      }, [
        "Not all MFA is equal — this comparison decides real deployments.",
        "SMS codes made MFA mainstream but carry real weaknesses: SIM swapping hijacks the phone number, and users can be tricked into reading codes to attackers.",
        "TOTP apps remove the network — codes are computed on-device. FIDO2 keys go further: the cryptographic credential is bound to the true domain, so a phishing site simply cannot trigger it.",
        "Hierarchy: FIDO2 over TOTP over SMS over nothing — and ALL of them beat a password alone.",
      ], "cyan"),
      stat(
        "99.9%",
        "of automated account-takeover attacks blocked by MFA",
        "Microsoft's analysis of its own fleet — MFA is the single highest-value control an organization can deploy this year.",
        [
          "The number that justifies everything: nine hundred ninety-nine in every thousand automated takeover attempts die at MFA.",
          "Attack economics do the rest: with MFA on, attackers move to easier targets without it.",
          "If you deploy one control from this course, it is this one.",
        ],
        "cyan"
      ),
      scenario(
        "Case study · the MFA fatigue call",
        "An employee with MFA enabled gets a correct username-and-password phished anyway. Then their phone rings at 11 PM: 'IT support, approve the prompt we just sent.' They approve — repeatedly, out of exhaustion.",
        "MFA fatigue: attackers with valid credentials spam approval prompts until one is accepted. Password security failed first (the phish worked), but the second factor fell to social engineering, not math.",
        "Defenses: number matching (display a code the user must type into the prompt), FIDO2 keys for privileged accounts, and the detection rule 'MFA prompt storms' — five prompts in ten minutes is an attack in progress, not IT support.",
      ),
      quiz(
        "A login form asks for password (factor 1) and then a PIN (factor 2). Is this MFA?",
        ["No — both are knowledge factors", "Yes — two factors were used", "Yes — PINs are possession", "Only on mobile devices"],
        0,
        "MFA requires different KINDS of proof. Password and PIN are both 'something you know' — one factor used twice. Password plus phone app, or password plus fingerprint, is real MFA.",
        [
          "Knowledge check — different kinds of proof, not more of the same.",
        ],
        "purple"
      ),
      recap([
        "Three factors: know (weak), have (stronger), are (convenient, unrotatable).",
        "MFA = different factor types combined — password + PIN is still one factor.",
        "Strength order: FIDO2 > TOTP > SMS > password alone.",
        "MFA stops ~99.9% of automated account takeover — the highest-ROI control.",
        "Residual risk moves to social engineering: fatigue attacks need number-matching and prompt-storm alerts.",
      ], [
        "What you now know.",
        "You can now design a sensible MFA rollout and argue its strength order — and you know why the remaining attacks are human, not mathematical.",
        "Next lesson: passwords themselves — making factor one as strong as it can be.",
      ], "cyan"),
    ],
  },
  {
    lessonId: "les-cf-3-3", lessonTitle: "Password Security", courseId: "course-cyber-fundamentals",
    scenes: [
      title(
        "Password Security",
        "cybersecurity fundamentals · factor one, hardened",
        "Length beats complexity, uniqueness beats rotation — and the manager makes it all possible",
        [
          "Passwords refuse to die — they remain the front door of almost every system. So we make them as strong as the math allows, without pretending they are enough.",
          "This lesson replaces password folklore with password mathematics.",
        ],
        "amber",
        [
          "Explain why length dominates complexity requirements",
          "Describe credential stuffing and why reuse is fatal",
          "Evaluate hashing: salt, bcrypt/scrypt/argon2",
          "Deploy a password manager and passphrases sensibly"
        ]
      ),
      keyterms([
        { term: "Entropy", definition: "A measure of unpredictability in bits. Each extra character multiplies search time exponentially." },
        { term: "Credential stuffing", definition: "Replaying username/password pairs from one breach against every other site — reuse turns one breach into many." },
        { term: "Hash", definition: "A one-way fingerprint of a password. Servers store hashes, never passwords." },
        { term: "Salt", definition: "Random data mixed into each password before hashing — kills precomputed rainbow tables." },
        { term: "Key stretching", definition: "bcrypt/scrypt/argon2 make each hash deliberately slow — millions of GPU guesses become thousands." },
      ], [
        "Five terms and the folklore dies.",
        "Entropy measures unpredictability — and it grows exponentially with length, which is the entire argument of this lesson.",
        "Credential stuffing is why reuse is fatal: attackers replay breached pairs everywhere you reused them.",
        "Servers should only ever hold hashes — one-way fingerprints, not passwords.",
        "Salts randomize each hash so precomputed tables are useless.",
        "And key stretching — bcrypt, scrypt, argon2 — makes each guess deliberately expensive, cutting GPU cracking rates by factors of thousands.",
      ], "amber"),
      compare("Complexity vs Length", {
        title: "Short + complex", points: ["'P@ssw0rd!' — 9 chars", "Substitutions are the FIRST thing crackers try", "Meets policy, fails math"],
      }, {
        title: "Long + memorable", points: ["'correct-horse-battery-staple'", "4 random words = ~50 bits of entropy", "Typed fast, remembered forever"],
        accent: "green",
      }, [
        "The classic policy — eight characters, mixed case, symbol — is bad mathematics.",
        "Nine characters with substitutions falls to GPU rigs in hours, because substitution patterns are in every cracking dictionary.",
        "Four random words give roughly fifty bits — genuinely resistant — while remaining typeable and memorable. Length is the variable that matters; complexity theater is not.",
        "This is why NIST's current guidance removed mandatory rotation and composition rules: they measurably weakened passwords.",
      ], "amber"),
      code("how-passwords-should-be-stored", [
        "// server-side: NEVER store the password itself",
        "hash = bcrypt.hash(password, salt);   // slow by design",
        "",
        "// at login: hash the attempt, compare",
        "bcrypt.compare(attempt, storedHash)   // constant-time",
        "",
        "// red flags in any codebase:",
        "// md5(...)  sha1(...)   plain text   unsalted sha256",
      ], [
        "Here is the server side of the bargain — where most real-world breaches actually happen.",
        "On signup, the password is hashed with bcrypt and a per-user salt. bcrypt is deliberately slow — that is its feature.",
        "At login, the attempt is hashed the same way and compared. The plaintext password exists in memory for milliseconds.",
        "And these are the red flags that mean a breach: MD5, SHA1, unsalted hashes, or — catastrophically — plaintext storage. When you audit a codebase, check the auth module first.",
      ], "green"),
      scenario(
        "Case study · the reuse chain",
        "A hobby forum is breached — 200k plaintext passwords leak. Weeks later, staff at an unrelated engineering firm report logins from unfamiliar countries.",
        "One engineer had reused his forum password at work. Credential-stuffing bots replayed the forum list against the firm's VPN portal at machine speed. The forum breach became the firm breach, through one reused password and no MFA on the VPN.",
        "Fixes: MFA on the VPN (the control that stops stuffing outright), breached-password screening at password change, and — organization-wide — a password manager making unique passwords effortless.",
      ),
      quiz(
        "Why is a 16-character passphrase stronger than an 8-character password with symbols?",
        ["Each extra character multiplies the search space exponentially", "Symbols are banned by crackers", "Passphrases are encrypted", "Longer passwords hash faster"],
        0,
        "Search space grows exponentially with length — two extra characters can outweigh any amount of symbol cleverness. Length is the variable with real leverage.",
        [
          "Knowledge check — think exponential versus cosmetic.",
        ],
        "purple"
      ),
      recap([
        "Length beats complexity theater — four random words outperform 'P@ssw0rd!'.",
        "Reuse is the sin that scales: one breach becomes every breach via stuffing.",
        "Servers store salted, stretched hashes (bcrypt/argon2) — never plaintext, never MD5.",
        "Modern guidance: unique + long + manager + MFA; no forced 90-day rotation.",
        "Check the auth module first in any code review — storage mistakes are breach-class.",
      ], [
        "What you now know.",
        "Password folklore replaced by math — and you can now argue policy with evidence.",
        "Next lesson: encryption — protecting data itself, not just the doors to it.",
      ], "amber"),
    ],
  },
  {
    lessonId: "les-cf-4-1", lessonTitle: "Symmetric vs Asymmetric Encryption", courseId: "course-cyber-fundamentals",
    scenes: [
      title(
        "Symmetric vs Asymmetric Encryption",
        "cybersecurity fundamentals · cryptography",
        "One shared key or a key pair — why the internet needs both, and how TLS uses them together",
        [
          "Encryption scrambles data so only the right key unscrambles it. There are exactly two families — and every secure protocol you use is a marriage of both.",
        ],
        "purple",
        [
          "Explain symmetric vs asymmetric with their trade-offs",
          "Name the canonical algorithms: AES vs RSA/ECC",
          "Trace a TLS handshake from key exchange to session",
          "Read key lengths and know what '2048-bit' actually measures"
        ]
      ),
      keyterms([
        { term: "Symmetric encryption", definition: "One shared key both encrypts and decrypts. Very fast — AES is the standard." },
        { term: "Asymmetric encryption", definition: "A key pair: public key encrypts, private key decrypts. Slower — RSA and ECC are the standards." },
        { term: "Key exchange", definition: "The handshake (e.g. ECDHE) where two parties derive a shared secret over a public channel." },
        { term: "Forward secrecy", definition: "Ephemeral session keys mean a stolen private key cannot decrypt past recorded traffic." },
        { term: "TLS", definition: "Transport Layer Security — the padlock protocol: asymmetric handshake, symmetric bulk data." },
      ], [
        "Five terms carry the whole lesson.",
        "Symmetric encryption uses one shared key for both directions — AES is fast enough to encrypt disk drives and video streams.",
        "Asymmetric uses a mathematical pair: whatever the public key locks, only the private key opens.",
        "Key exchange is the trick that starts every secure connection — deriving a shared secret while a wiretapper watches.",
        "Forward secrecy is the property that a stolen long-term key cannot unlock yesterday's recorded traffic.",
        "TLS is where it all combines: the padlock in your browser bar is asymmetric trust with symmetric speed.",
      ], "purple"),
      compare("The Two Families", {
        title: "Symmetric · AES", points: ["Same key encrypts & decrypts", "Extremely fast — bulk data", "Problem: how do you share the key safely?"],
      }, {
        title: "Asymmetric · RSA / ECC", points: ["Public encrypts, private decrypts", "Solves key distribution", "Slow — used for small payloads", "Enables signatures too"],
        accent: "cyan",
      }, [
        "Side by side, the trade-off is architectural, not competitive.",
        "Symmetric is fast — but both parties need the same secret, and sharing it safely is the whole problem.",
        "Asymmetric solves distribution — publish the public key freely — but is a thousand times slower, fit for small payloads.",
        "No serious protocol picks one. They pair: asymmetric to agree on a key, symmetric to carry the data.",
      ], "purple"),
      flow("How TLS Connects You", {
        hello: { label: "ClientHello", x: 100, y: 190, shape: "square" },
        keyex: { label: "ECDHE key exchange", x: 320, y: 190, shape: "square", emphasis: true },
        verify: { label: "Certificate check", x: 540, y: 190, shape: "square" },
        session: { label: "AES session", x: 700, y: 190, shape: "square", emphasis: true },
      }, [
        { from: "hello", to: "keyex", speed: 1.5 },
        { from: "keyex", to: "verify", speed: 1.5 },
        { from: "verify", to: "session", speed: 1.5 },
      ], [
        "Every padlock in your browser walks this path in milliseconds.",
        "ClientHello offers capabilities. Then the ECDHE exchange: both sides derive the same secret while an eavesdropper — watching every byte — learns nothing.",
        "The server proves its identity with a certificate signed by a CA you trust — the next lesson's topic.",
        "From there, everything flows through a fast AES session key that lives only for this connection. Ephemeral keys give forward secrecy: today's theft cannot decrypt last week's capture.",
      ], "Asymmetric for trust, symmetric for speed", "purple"),
      scenario(
        "Case study · the expired padlock",
        "Users report 'Your connection is not private' on an internal dashboard. Everyone clicks through the warning. A junior admin 'fixes' it by installing an older certificate from a shared drive.",
        "Two failures compound: the expired certificate broke the trust chain (correct behavior by the browser), and the 'fix' restored a certificate whose private key had been sitting on a shared drive — readable by anyone who ever opened that folder. Clicking through warnings had trained users to ignore the control.",
        "Fixes: automate certificate renewal (ACME/Let's Encrypt), keep private keys in a secrets manager with rotation, and treat 'users click through warnings' as the emergency it is — each click is a training exercise for real attackers.",
      ),
      quiz(
        "Why does TLS use asymmetric crypto only for the handshake, not for all the data?",
        ["Asymmetric is ~1000× slower — fine for small handshakes, wasteful for bulk data", "Asymmetric cannot encrypt data", "Symmetric keys are longer", "Browsers forbid it"],
        0,
        "RSA/ECC operations are dramatically more expensive than AES. One slow, trust-establishing exchange followed by fast symmetric session encryption gives both security and speed.",
        [
          "Knowledge check — each family does what it is good at.",
        ],
        "purple"
      ),
      recap([
        "Symmetric (AES): one shared key, fast, needs safe distribution.",
        "Asymmetric (RSA/ECC): key pair, solves distribution, slow — small payloads + signatures.",
        "TLS = ECDHE key exchange + certificate verification + AES session.",
        "Forward secrecy: ephemeral session keys protect past traffic from future key theft.",
        "'2048-bit' describes RSA key size — not comparable to AES's 256; different math entirely.",
      ], [
        "What you now know.",
        "You can explain why your browser shows a padlock — asymmetric trust, symmetric speed — and why certificate warnings are the control working, not failing.",
        "Next lesson: PKI — the trust machinery that makes certificates mean something.",
      ], "purple"),
    ],
  },
  {
    lessonId: "les-cf-4-3", lessonTitle: "PKI & Certificates", courseId: "course-cyber-fundamentals",
    scenes: [
      title(
        "PKI & Certificates",
        "cybersecurity fundamentals · trust at scale",
        "How the internet decides which keys to believe — and what happens when that machinery is attacked",
        [
          "Asymmetric cryptography only works if you can trust a public key. PKI — public key infrastructure — is the machinery of that trust, and it silently vouches for every secure connection you make.",
        ],
        "green",
        [
          "Explain the chain of trust from root CA to site",
          "Read a certificate: subject, validity, SANs",
          "Describe revocation: CRLs and OCSP",
          "Recognize CA compromise and pinning responses"
        ]
      ),
      keyterms([
        { term: "Certificate", definition: "A signed document binding a domain to a public key, with validity dates and allowed uses." },
        { term: "CA", definition: "Certificate Authority — an organization whose job is verifying identity before signing certificates." },
        { term: "Chain of trust", definition: "Root CA → intermediate CAs → leaf certificates. Browsers trust roots; roots vouch downward." },
        { term: "SAN", definition: "Subject Alternative Name — the list of hostnames a certificate is valid for." },
        { term: "Revocation", definition: "Declaring a certificate invalid before expiry — via CRL lists or the OCSP protocol." },
      ], [
        "Five terms map the trust machinery.",
        "A certificate is an ID card for a key: domain, key, dates, uses — signed by someone you trust.",
        "That someone is the CA, whose entire business is checking identity before signing.",
        "Trust flows in a chain: your browser ships with trusted roots, roots sign intermediates, intermediates sign the sites you visit.",
        "The SAN lists exactly which hostnames the certificate covers — a common audit finding is a certificate missing the www variant.",
        "And revocation is the machinery for 'this ID card was stolen' — CRL lists and OCSP queries.",
      ], "green"),
      diagram("Chain of Trust", {
        root: { label: "Root CA (offline)", x: 380, y: 70, shape: "square", emphasis: true },
        inter: { label: "Intermediate CA", x: 380, y: 195, shape: "square" },
        leaf: { label: "pibridge.com cert", x: 380, y: 320, shape: "square" },
      }, [
        { from: "root", to: "inter", animated: true, label: "signs" },
        { from: "inter", to: "leaf", animated: true, label: "signs" },
      ], [
        "Follow the chain downward — this exact path validates every HTTPS site you visit.",
        "Root CAs are the anchor: a few hundred organizations, their keys kept offline in HSMs, signing rarely.",
        "Intermediates do the daily signing — so if one is compromised, only it is revoked, not the root.",
        "Your browser walks the chain, checks every signature, checks dates, checks the hostname against the SAN. All green — padlock. Anything red — the warning page that is the system working, not failing.",
      ], "Trust flows downward, one signature at a time", "green"),
      terminal([
        { type: "command", text: "openssl s_client -connect pibridge.com:443 -brief" },
        { type: "output", text: "Verification: OK" },
        { type: "output", text: "Cert issuer:  /C=US/O=Let's Encrypt/CN=R3" },
        { type: "output", text: "Cert expiry:  89 days" },
        { type: "command", text: "openssl x509 -in cert.pem -noout -dates -subject" },
        { type: "output", text: "notAfter=Jun 30 12:00:00  — check renewal automation!" },
      ], [
        "You can interrogate any certificate from a terminal — this is how engineers actually check.",
        "openssl s_client connects and reports: verification OK means the chain built cleanly, and the issuer shows which CA vouched.",
        "Expiry in 89 days is typical for Let's Encrypt — which is exactly why renewal must be automated, not remembered.",
        "The x509 command reads local certificates — dates, subject, SANs. 'Check the cert' is a five-minute audit you will run often.",
      ], "green"),
      scenario(
        "Case study · when a CA is owned",
        "In 2011, attackers compromised the CA DigiNotar and issued themselves genuine certificates for google.com. Users saw valid padlocks on fake sites.",
        "The padlock was real — the trust behind it was stolen. Browsers responded within days by removing DigiNotar from their trusted roots, which collapsed the company: trust is the entire business. Sites responded by pinning — hardcoding which CA may vouch for them.",
        "This is why your browser updates matter: each update refreshes the trusted root store and can revoke compromised CAs. PKI is a system of institutions as much as math — and its failures make headlines precisely because it underpins everything.",
      ),
      quiz(
        "A browser warns that a site's certificate expired yesterday. What is the correct response?",
        ["Do not proceed — alert the site owner", "Proceed — expiry is cosmetic", "Switch to HTTP instead", "Clear browser cache"],
        0,
        "Expiry means the CA no longer vouches that this key belongs to this site — precisely the guarantee HTTPS exists to provide. It might be ops neglect, or a hijacked domain. Do not click through.",
        [
          "Knowledge check — what is the certificate actually vouching for?",
        ],
        "purple"
      ),
      recap([
        "Certificates bind domains to keys; CAs vouch by signing; roots anchor the whole system.",
        "Chain of trust: root (offline) → intermediates (daily work) → leaf (your site).",
        "Read certs with openssl: issuer, dates, SANs — and automate renewal.",
        "Revocation (CRL/OCSP) declares stolen certs dead before expiry.",
        "CA compromise is catastrophic and has happened — DigiNotar 2011; trust is the business.",
      ], [
        "What you now know.",
        "You can read certificates, explain the chain, and articulate why the warning page is the system succeeding.",
        "Next lesson: network security architecture — building the zones these protocols protect.",
      ], "green"),
    ],
  },
  {
    lessonId: "les-cf-5-1", lessonTitle: "Network Security Architecture", courseId: "course-cyber-fundamentals",
    scenes: [
      title(
        "Network Security Architecture",
        "cybersecurity fundamentals · design for defense",
        "Segments, zones, chokepoints — the shape of the network does most of the defensive work",
        [
          "Good network security is architecture before appliance: the shape of your network defeats whole attack classes before a single rule fires.",
          "This lesson turns defense-in-depth from a slogan into a floor plan.",
        ],
        "rose",
        [
          "Design DMZ, app and data tiers with controlled paths",
          "Apply microsegmentation and zero-trust thinking",
          "Explain east-west vs north-south traffic",
          "Place logging at the chokepoints that matter"
        ]
      ),
      keyterms([
        { term: "Segmentation", definition: "Dividing the network into zones so lateral movement requires crossing controlled boundaries." },
        { term: "East-west traffic", definition: "Server-to-server traffic inside the perimeter — where attackers live after entry." },
        { term: "North-south traffic", definition: "Traffic entering or leaving the network — the classic perimeter focus." },
        { term: "Zero trust", definition: "No implicit trust by network location — every request authenticated and authorized, every time." },
        { term: "Chokepoint", definition: "A point all traffic must cross — the only place worth logging exhaustively." },
      ], [
        "Five terms, and the floor plan assembles itself.",
        "Segmentation divides the network into zones — attackers who breach one zone face walls, not open plains.",
        "East-west traffic is the traffic attackers live on: server to server, inside the perimeter, historically ignored.",
        "North-south is the classic perimeter traffic — important, but no longer where the battle is.",
        "Zero trust is the philosophical upgrade: network location confers zero trust; every request re-proves itself.",
        "And chokepoints are where all traffic must pass — the only places worth logging exhaustively.",
      ], "rose"),
      diagram("Zoned Defense", {
        inet: { label: "Internet", x: 90, y: 190, shape: "circle" },
        edge: { label: "Edge firewall", x: 250, y: 190, shape: "square", emphasis: true },
        dmz: { label: "DMZ", x: 440, y: 80, shape: "square" },
        app: { label: "App tier", x: 440, y: 300, shape: "square" },
        data: { label: "Data tier", x: 660, y: 300, shape: "square", emphasis: true },
      }, [
        { from: "inet", to: "edge", animated: true, label: "filter all" },
        { from: "edge", to: "dmz", label: "limited" },
        { from: "edge", to: "app", label: "app tier only" },
        { from: "app", to: "data", animated: true, label: "data tier only" },
      ], [
        "The classic three-tier pattern, one arrow at a time.",
        "The internet reaches only the edge firewall. The DMZ — public web and mail — accepts limited, filtered traffic.",
        "The app tier accepts traffic from the DMZ only. The data tier accepts traffic from the app tier only.",
        "Now walk the attacker's path: compromise the web server, and the database still requires crossing another controlled boundary. Every hop is a checkpoint with logs on both sides.",
      ], "Every arrow is a policy and a log source", "rose"),
      compare("Castle-and-Moat vs Zero Trust", {
        title: "Perimeter model", points: ["Trust inside the network", "VPN = wide network access", "East-west traffic unwatched", "One breach = everything"],
      }, {
        title: "Zero trust", points: ["Verify every request, everywhere", "Access per-app, not per-network", "Microsegmentation everywhere", "Assume breach as baseline"],
        accent: "cyan",
      }, [
        "The paradigm shift of the last decade, in one comparison.",
        "The castle-and-moat model trusted everything inside: VPN users got the whole network, and east-west traffic flowed unwatched. One breach meant everything was reachable.",
        "Zero trust removes implicit trust: identity plus device health authorize each request to each app. Microsegmentation shrinks east-west blast radius to nearly nothing.",
        "Real deployments are hybrids — but the direction is set, and the vocabulary matters in every modern security conversation.",
      ], "rose"),
      scenario(
        "Case study · the flat network",
        "A 200-person company runs one flat 192.168.0.0/16: printers, servers, workstations, and the payment system all share one broadcast domain. Attackers phish one accountant.",
        "From that laptop, the attacker scans and reaches EVERYTHING — no boundaries exist. Within a day they map the payment system, harvest credentials from broadcast traffic, and stage exfiltration. A flat network turns one phish into a full compromise.",
        "The redesign is the lesson: segment by function and sensitivity — user, server, payment, guest — with firewall policy between each. The same phish now yields one laptop, one alert, one contained incident. Architecture is the control that was missing.",
      ),
      quiz(
        "In a segmented network, why does east-west traffic matter MORE than north-south for containment?",
        ["Attackers operate east-west after breaching one host — lateral movement happens inside", "It is higher volume", "Firewalls cannot see it", "It never crosses the internet"],
        0,
        "Once inside, attackers move laterally — east-west — toward data. North-south controls stopped the first breach attempt; east-west segmentation stops the attack from becoming a campaign.",
        [
          "Knowledge check — where does the attacker live after entry?",
        ],
        "purple"
      ),
      recap([
        "Segment by function and sensitivity: DMZ, app, data — least-privilege routes between tiers.",
        "East-west is the modern battlefield: microsegment it, log it, alert on it.",
        "Zero trust: location grants nothing — identity and device health authorize each request.",
        "Chokepoints are your log goldmine — place visibility where traffic must cross.",
        "Architecture defeats attack classes before any rule fires — the case-study flat network cost everything.",
      ], [
        "What you now know.",
        "You can sketch a defensible network on a whiteboard and defend every arrow on it.",
        "Next lesson: logging and monitoring — because architecture without visibility is a maze in the dark.",
      ], "rose"),
    ],
  },
  {
    lessonId: "les-cf-6-1", lessonTitle: "Security Logging & Monitoring", courseId: "course-cyber-fundamentals",
    scenes: [
      title(
        "Security Logging & Monitoring",
        "cybersecurity fundamentals · see everything",
        "You cannot defend what you cannot see — log sources, the SIEM pipeline, and what to alert on",
        [
          "Architecture and controls are half the job; knowing what they are doing is the other half. This lesson is about the eyes: what to log, where it flows, and what deserves a 3 AM page.",
        ],
        "cyan",
        [
          "Choose the first log sources that matter most",
          "Follow the pipeline: source → collector → SIEM → alert",
          "Detect exfiltration through DNS and volume anomalies",
          "Apply 'log generously, alert precisely'"
        ]
      ),
      keyterms([
        { term: "Log source", definition: "Any system emitting events: firewalls, servers, apps, cloud accounts, endpoints." },
        { term: "SIEM", definition: "Security Information and Event Management — aggregates, normalizes and correlates logs into detections." },
        { term: "Correlation rule", definition: "Logic combining events across sources: '10 failed logins + success = possible brute force'." },
        { term: "Baseline", definition: "What normal looks like — alerts only mean something against measured normal." },
        { term: "Log retention", definition: "How long logs live — long enough for investigations and compliance; off-host and tamper-proof." },
      ], [
        "Five terms build the monitoring stack.",
        "A log source is anything that emits events — and the art is choosing which ones feed you first.",
        "The SIEM is the aggregator and correlator: it turns a million events a second into a handful of alerts.",
        "Correlation rules are its logic — single events are noise; patterns across sources are signal.",
        "A baseline defines normal — without it, 'unusual' has no meaning.",
        "And retention decides how long the evidence survives — investigations look backward, sometimes by months.",
      ], "cyan"),
      flow("From Event to Alert", {
        src: { label: "Log sources", x: 100, y: 190, shape: "square", emphasis: true },
        col: { label: "Collector", x: 290, y: 190, shape: "square" },
        siem: { label: "SIEM", x: 480, y: 190, shape: "square", emphasis: true },
        soc: { label: "Analyst", x: 670, y: 190, shape: "square" },
      }, [
        { from: "src", to: "col", speed: 1.3 },
        { from: "col", to: "siem", speed: 1.3 },
        { from: "siem", to: "soc", speed: 1.3 },
      ], [
        "The pipeline in four hops — every SOC on earth runs some version of this.",
        "Sources stream events to collectors, which normalize formats and batch delivery to the SIEM.",
        "The SIEM parses fields, enriches with threat intel, and runs correlation rules in real time.",
        "Matching rules raise alerts to the analyst queue. The whole path from firewall packet to analyst screen takes seconds — the design question is what deserves to ride it.",
      ], "Log generously, alert precisely", "cyan"),
      bullets("What to Log First", [
        { label: "Authentication everywhere", detail: "logins, failures, privilege changes — every attacker must log in" },
        { label: "Network edges", detail: "firewall allows/denies, VPN, DNS queries" },
        { label: "Critical systems", detail: "domain controllers, databases, cloud audit trails" },
        { label: "Endpoints (EDR)", detail: "process, file and network telemetry — where fileless attacks live" },
      ], [
        "When budget is finite, this priority list is battle-tested.",
        "Authentication first: every attacker must log in somehow, and failed-then-success patterns are the classic brute-force signature.",
        "Network edges second: firewall decisions, VPN sessions, and DNS — the DNS you already know is a favorite exfiltration channel.",
        "Critical systems third: the machines whose compromise ends the business, plus cloud audit trails.",
        "And endpoint telemetry fourth — it is where you catch the fileless attacks that never touch a signature.",
      ], "cyan"),
      scenario(
        "Case study · the quiet exfiltration",
        "Quarterly review: DNS query volume is flat month over month — but ONE host's NXDomain (nonexistent-domain) rate tripled, from 2% to 7%, at exactly 2 AM nightly.",
        "That signature is textbook DNS exfiltration: malware encoding data into subdomains, most of which resolve to nothing. Total volume stayed normal — the anomaly hid inside the composition, which is why per-host and per-type baselines matter, not just totals.",
        "The host was isolated, memory-captured, and confirmed as info-stealer malware. The fix that mattered: per-host anomaly alerting, not just global dashboards. Averages hide attacks; composition reveals them.",
      ),
      quiz(
        "Which single log source catches the widest range of attacks earliest?",
        ["Authentication logs (all systems)", "Printer logs", "DHCP leases", "Weather API logs"],
        0,
        "Every attack path — phishing, brute force, insider, service compromise — eventually requires authentication. It is the one signal common to nearly all attacks, and it is cheap to collect.",
        [
          "Knowledge check — what must every attacker eventually do?",
        ],
        "purple"
      ),
      recap([
        "Pipeline: sources → collector → SIEM (correlate) → analyst queue.",
        "Priority sources: authentication, edges+DNS, critical systems, endpoint telemetry.",
        "Baseline per host and per type — averages hide attacks, composition reveals them.",
        "Log generously, alert precisely — storage is cheap, missed detections are not.",
        "Ship logs off-host and protect integrity: attackers delete their footprints first.",
      ], [
        "What you now know.",
        "You know what to log, where it flows, and what deserves a page — the eyes of the SOC are no longer magic to you.",
        "This completes the fundamentals arc: triad, threats, actors, malware, auth, crypto, architecture, and now visibility. The SOC Operations course builds directly on this foundation.",
      ], "cyan"),
    ],
  },
];
