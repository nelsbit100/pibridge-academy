import {
  title, keyterms, bullets, steps, diagram, flow, code, terminal, compare, scenario, quiz, stat, recap,
  type LessonVideoScript,
} from "./core";

// ════════════════════════════════════════════════════════════════
// NETWORKING FUNDAMENTALS — deep scripts (course-net-fundamentals)
// ════════════════════════════════════════════════════════════════

export const deepNF: LessonVideoScript[] = [
  {
    lessonId: "les-nf-1-1", lessonTitle: "What is a Network?", courseId: "course-net-fundamentals",
    scenes: [
      title(
        "What is a Network?",
        "networking fundamentals · lesson 1",
        "How devices connect, communicate, and share data — and why every connection is both an opportunity and an attack surface",
        [
          "Welcome to PiBridge Academy and to the very first lesson of Networking Fundamentals.",
          "Over the next few minutes we will build a precise mental model of what a network is, so every later lesson has something solid to stand on.",
        ],
        "cyan",
        [
          "Define a network precisely and name its core components",
          "Trace how a laptop reaches a server through switches and routers",
          "Explain LAN vs WAN vs the internet in one sentence each",
          "See why every network link is also an attack surface",
        ]
      ),
      keyterms([
        { term: "Network", definition: "Two or more devices connected so they can exchange data using agreed rules — protocols." },
        { term: "Node", definition: "Any addressable device on a network: laptop, phone, server, printer, router, or switch." },
        { term: "Switch", definition: "Connects devices inside a local network and forwards frames between them using MAC addresses." },
        { term: "Router", definition: "Connects different networks together and chooses the best path for packets between them." },
        { term: "LAN", definition: "Local Area Network — one building or site: your office, your home, one campus floor." },
        { term: "WAN", definition: "Wide Area Network — links LANs across cities and countries. The internet is the largest WAN." },
      ], [
        "Let us pin down six terms you will use every single day in this field.",
        "A network is simply two or more devices connected so they can exchange data — and the exchange follows agreed rules called protocols.",
        "Every connected device is a node. Your laptop is a node, but so is the printer nobody loves.",
        "Inside a local network, the switch is the meeting point: it forwards traffic between devices using hardware addresses called MAC addresses.",
        "The router connects your network to other networks and chooses the best path between them.",
        "A LAN is one site — one office, one home. A WAN links LANs across cities and countries, and the internet is simply the largest WAN in existence.",
      ], "cyan"),
      diagram("Anatomy of a Small Office Network", {
        pc1: { label: "Laptop", x: 110, y: 250, shape: "square" },
        pc2: { label: "Desktop", x: 110, y: 90, shape: "square" },
        sw: { label: "Switch", x: 350, y: 170, shape: "square", emphasis: true },
        srv: { label: "File server", x: 350, y: 40, shape: "square" },
        rtr: { label: "Router", x: 580, y: 170, shape: "square", emphasis: true },
        inet: { label: "Internet", x: 710, y: 60, shape: "circle" },
      }, [
        { from: "pc1", to: "sw" }, { from: "pc2", to: "sw" },
        { from: "srv", to: "sw" },
        { from: "sw", to: "rtr", animated: true, label: "gateway" },
        { from: "rtr", to: "inet", animated: true, label: "uplink" },
      ], [
        "Here is a typical small office network — follow the path of one request.",
        "The laptop and desktop connect to the switch, and so does the file server. Any conversation inside the office stays on the switch.",
        "When the laptop needs a website, the traffic flows to the router — the default gateway — which forwards it out through the internet uplink.",
        "The reply comes back along the same path. Same story every time: device, switch, router, world.",
      ], "One request: device → switch → router → internet", "cyan"),
      compare("The Three Networks You Live In", {
        title: "LAN", points: ["One site you control", "Fast, usually free to use", "Switched at layer 2", "Example: office network"],
      }, {
        title: "WAN / Internet", points: ["Links sites you do not control", "Slower, billed by capacity", "Routed at layer 3", "Example: your ISP's backbone"],
        accent: "purple",
      }, [
        "It helps to sort every network into one of three boxes.",
        "The LAN is the network you own and control — fast, local, switched. The WAN connects your LAN to other LANs — you rent it from a provider.",
        "The internet is the network of networks — nobody owns it end to end. Security decisions differ sharply for each: you harden a LAN, you encrypt across a WAN.",
      ], "cyan"),
      scenario(
        "Case study · Ghana",
        "A 40-person fintech in Accra shares one office network: staff laptops, a payment server, and guest WiFi on the same switch.",
        "A visitor's infected laptop joins the guest WiFi and starts scanning nearby addresses. Within minutes it discovers the payment server — because 'guest' and 'production' share the same layer-2 network.",
        "The team segmented the network: staff, servers, and guests on separate switched segments with a firewall between them. Scanning from guest WiFi now finds nothing but other guests.",
        [
          "Read the setup carefully — one switch, three kinds of device, zero boundaries.",
          "The attacker's laptop did nothing exotic: it joined as a guest and simply asked 'who else is here?' — and the payment server answered.",
          "The fix is architectural, not technical heroism: three segments, one firewall between them, rules in each direction.",
        ],
      ),
      bullets("Why Networking Is the First Skill of Security", [
        { label: "Every attack crosses a network", detail: "you cannot stop what you cannot see" },
        { label: "Every defense lives on a network", detail: "firewalls, IDS, segmentation are network constructs" },
        { label: "Traffic is evidence", detail: "packets record who did what, when, from where" },
      ], [
        "Why does this matter for your career? Because every attack you will ever investigate crossed a network, and every defense you will deploy lives on one.",
        "Firewalls, segmentation, intrusion detection — these are all network constructs. And network traffic is the most honest evidence in forensics: packets record exactly who did what, when, from where.",
      ], "amber"),
      quiz(
        "A colleague says 'the printer is on our LAN but the email server is in the cloud.' What does the email server communicate across to reach the office?",
        ["A WAN — the internet", "The office LAN", "A USB cable", "The printer's switch"],
        0,
        "Any link between sites you do not physically own is a WAN. The internet is the world's largest WAN, and cloud servers reach offices across it.",
        [
          "Quick check — take a moment before the answer appears.",
        ],
        "purple"
      ),
      recap([
        "A network is connected devices exchanging data under agreed protocols.",
        "Switches forward traffic inside a LAN; routers move it between networks.",
        "LAN = one site you control · WAN = links you rent · internet = all of them.",
        "Segmentation keeps guest traffic away from production — one firewall fixes the case-study class of problem.",
        "Every link carries data and risk — designing networks is designing security.",
      ], [
        "Let us lock in what you now know.",
        "A network is connected devices exchanging data under agreed protocols — switches forward inside a LAN, routers move traffic between networks.",
        "You can classify any network as LAN, WAN, or the internet — and each classification changes your security decisions.",
        "In the case study, one firewall and three segments neutralized an entire class of attack.",
        "Coming up: the seven-layer model that gives this whole field its vocabulary.",
      ], "cyan"),
    ],
  },
  {
    lessonId: "les-nf-2-1", lessonTitle: "The 7 Layers Explained", courseId: "course-net-fundamentals",
    scenes: [
      title(
        "The OSI Model — The 7 Layers",
        "networking fundamentals · the shared vocabulary",
        "Why every conversation in networking — and every job interview — starts with these seven layers",
        [
          "In this lesson we take apart the OSI model — the single most quoted framework in all of networking.",
          "By the end you will not just recite the layers; you will know what problem each one solves and where each security control lives.",
        ],
        "amber",
        [
          "Name all 7 layers and what each one actually does",
          "Place a protocol or device at its correct layer instantly",
          "Use the model to localize faults and describe attacks",
        ]
      ),
      keyterms([
        { term: "OSI model", definition: "A 7-layer reference model describing how network communication is organized, proposed by ISO in 1984." },
        { term: "Encapsulation", definition: "Each layer wraps the layer above with its own header — data inside segments inside packets inside frames." },
        { term: "PDU", definition: "Protocol Data Unit — the name of the unit of data at a given layer: data, segment, packet, frame, bits." },
        { term: "Stack", definition: "The implementation of the layers on a real system — TCP/IP is the practical 4-layer stack the internet uses." },
      ], [
        "Four terms will carry us through this lesson.",
        "The OSI model was published in 1984 as a reference — a common language, not a literal blueprint.",
        "Encapsulation is its engine: every layer wraps the one above with a header. You will meet the full process in the next lesson.",
        "A PDU is simply the name of the data unit at each layer, and a stack is the real-world implementation — the internet runs TCP/IP, not OSI literally.",
      ], "amber"),
      steps("The Seven Layers, One Story", [
        { title: "7 · Application", detail: "HTTP, DNS, SMTP — what apps speak" },
        { title: "6 · Presentation", detail: "TLS encryption, encodings" },
        { title: "5 · Session", detail: "dialogues, connections" },
        { title: "4 · Transport", detail: "TCP/UDP, ports, reliability" },
        { title: "3 · Network", detail: "IP addresses, routing" },
        { title: "2 · Data Link", detail: "MAC addresses, switches" },
        { title: "1 · Physical", detail: "cables, fiber, radio waves" },
      ], [
        "Layer 7 is the application layer — the protocols software actually speaks: HTTP for the web, DNS for names, SMTP for mail.",
        "Layer 6 prepares data for the wire: this is where TLS encryption and character encodings formally live.",
        "Layer 5 manages sessions — who is talking to whom, and keeping that dialogue alive.",
        "Layer 4 is transport: TCP and UDP, port numbers, and the promise — or absence — of reliable delivery.",
        "Layer 3 is the network layer: IP addresses live here, and routers — the machines that move packets between networks — operate here.",
        "Layer 2 is data link: MAC addresses and switches. Every device on your LAN is identified here.",
        "And layer 1 is physical — the cables, fiber, and radio waves. No physics, no network.",
      ], "amber"),
      diagram("Where Devices Live in the Model", {
        app: { label: "L7 · apps", x: 120, y: 60, shape: "square" },
        fw: { label: "L3–4 · firewall", x: 120, y: 180, shape: "square", emphasis: true },
        rtr: { label: "L3 · router", x: 400, y: 180, shape: "square" },
        sw: { label: "L2 · switch", x: 650, y: 180, shape: "square" },
        wire: { label: "L1 · cable/radio", x: 400, y: 320, shape: "circle" },
      }, [
        { from: "app", to: "fw", animated: true },
        { from: "fw", to: "rtr", animated: true },
        { from: "rtr", to: "sw" },
        { from: "sw", to: "wire", animated: true },
      ], [
        "Here is the model turned into hardware and tools.",
        "Firewalls inspect at layers 3 and 4 — addresses and ports — while modern next-gen firewalls climb to layer 7 to understand applications.",
        "Routers are layer 3 machines, switches are layer 2 machines, and your cabling is layer 1. When a colleague says 'it's a layer 1 problem', they mean: check the cable.",
      ], "Devices are layer-bound — so are their failures", "amber"),
      scenario(
        "Case study · helpdesk",
        "A user reports 'the internet is down.' The helpdesk has five minutes to diagnose it before escalation.",
        "The technician pings the default gateway — nothing. Checks the wall port — the link light is dark. A single unplugged ethernet cable. Layer 1.",
        "Layer-by-layer thinking found in seconds what random clicking never would: test L1 (link light), then L2 (switch), then L3 (gateway ping), then upward.",
        [
          "The user's report was useless — 'the internet is down' — but the technician's method was not.",
          "Ping the gateway: fails. So the problem is below IP. Check the link light: dark. Problem found at layer 1 — a cable.",
          "This ladder — L1 upward — resolves most 'internet is down' tickets in under two minutes.",
        ],
      ),
      compare("OSI vs TCP/IP — Model vs Reality", {
        title: "OSI (7 layers)", points: ["Teaching and vocabulary", "Precise layer separation", "Used to describe attacks & faults"],
      }, {
        title: "TCP/IP (4 layers)", points: ["What the internet actually runs", "Application, transport, internet, link", "Maps OSI 5–7 → one application layer"],
        accent: "cyan",
      }, [
        "A quick reality check: nobody runs OSI literally.",
        "The internet runs the TCP/IP stack, which folds OSI layers 5, 6, and 7 into a single application layer. OSI is the language; TCP/IP is the machine.",
        "Interviews and SOC reports speak OSI. Your laptop speaks TCP/IP. You need both fluently.",
      ], "amber"),
      quiz(
        "A SQL injection attack that abuses a web form targets which OSI layer?",
        ["Layer 7 — Application", "Layer 3 — Network", "Layer 2 — Data Link", "Layer 1 — Physical"],
        0,
        "SQL injection abuses application logic — the web form and its database query. That is layer 7. A firewall that only reads addresses and ports never sees it.",
        [
          "Knowledge check — think about where the vulnerability actually lives.",
        ],
        "purple"
      ),
      recap([
        "OSI = 7 layers: All People Seem To Need Data Processing — top to bottom.",
        "L7 apps, L6 encryption, L5 sessions, L4 ports, L3 IP/routing, L2 MAC/switching, L1 physics.",
        "Firewalls live at L3–4, routers at L3, switches at L2 — devices inherit their layer's view.",
        "The internet runs TCP/IP; OSI is the shared diagnostic vocabulary.",
        "Attack names carry layer labels: SQLi is L7, SYN flood is L4, cable cut is L1.",
      ], [
        "What you now know.",
        "Seven layers, one mnemonic: All People Seem To Need Data Processing.",
        "You can place any protocol or device at its layer — and that placement tells you which tool debugs it and which control defends it.",
        "Remember: OSI is the vocabulary, TCP/IP is the machine that actually runs.",
        "Next lesson: watch data descend those seven layers as real headers — encapsulation.",
      ], "amber"),
    ],
  },
  {
    lessonId: "les-nf-2-2", lessonTitle: "Data Encapsulation", courseId: "course-net-fundamentals",
    scenes: [
      title(
        "Data Encapsulation",
        "networking fundamentals · how data travels",
        "Follow one HTTP request down the stack — headers wrapping headers — and back up again",
        [
          "You now know the seven layers by name. This lesson makes them physical: we will watch a single web request get wrapped, layer by layer, into a frame and put on the wire.",
          "When you finish, a Wireshark capture will read like an open book.",
        ],
        "cyan",
        [
          "Trace encapsulation from data to bits and back",
          "Name the PDU at each layer: segment, packet, frame",
          "Read the header fields each layer adds and why",
          "Connect a Wireshark display to what you see here"
        ]
      ),
      keyterms([
        { term: "Encapsulation", definition: "Outgoing data gathers a new header at each layer on the way down the stack." },
        { term: "Decapsulation", definition: "The receiver strips headers in reverse on the way up — each layer reads only its own." },
        { term: "Segment", definition: "The layer-4 PDU: your data plus a TCP or UDP header with source/destination ports." },
        { term: "Packet", definition: "The layer-3 PDU: the segment plus an IP header with source/destination IP addresses." },
        { term: "Frame", definition: "The layer-2 PDU: the packet plus MAC addresses and a checksum — what switches actually forward." },
      ], [
        "Encapsulation has an exact opposite — decapsulation — and five names for the data on the way.",
        "On the way down, each layer adds a header. On the way up, the receiver strips them in reverse.",
        "Layer 4 wraps your data into a segment with port numbers.",
        "Layer 3 wraps the segment into a packet with IP addresses.",
        "Layer 2 wraps the packet into a frame with MAC addresses — and that frame is what hits the wire.",
      ], "cyan"),
      flow("One HTTP Request, Wrapped Five Times", {
        data: { label: "“GET / HTTP”", x: 105, y: 190, shape: "square", emphasis: true },
        seg: { label: "+ TCP ports", x: 275, y: 190, shape: "square" },
        pkt: { label: "+ IP addrs", x: 445, y: 190, shape: "square" },
        frame: { label: "+ MAC addrs", x: 615, y: 190, shape: "square" },
      }, [
        { from: "data", to: "seg", speed: 1.6 },
        { from: "seg", to: "pkt", speed: 1.6 },
        { from: "pkt", to: "frame", speed: 1.6 },
      ], [
        "Watch a GET request descend the stack.",
        "The browser hands down raw data. The transport layer wraps it with a TCP header — source port 51234, destination port 80. Now it is a segment.",
        "The network layer adds IP addresses — from 192.168.1.50 to 142.250.183.14. Now it is a packet.",
        "The data link layer adds MAC addresses — your laptop's NIC to the default gateway. Now it is a frame, and out it goes as bits.",
      ], "L7 → L4 → L3 → L2 → L1: each hop adds exactly one header", "cyan"),
      code("headers-you-will-see.txt", [
        "# Layer 4 · TCP header",
        "src port 51234  →  dst port 80   (web server)",
        "seq 884213  ack 0  flags SYN    (new connection)",
        "",
        "# Layer 3 · IP header",
        "src 192.168.1.50  →  dst 142.250.183.14",
        "ttl 64  protocol 6 (TCP)",
        "",
        "# Layer 2 · Ethernet frame",
        "src mac aa:bb:cc:11:22:33 → dst mac (gateway) ff:ee:dd...",
      ], [
        "Here are the actual header fields, layer by layer, in a format you will meet in every capture.",
        "Layer 4 carries ports — 51234 to 80 — and the SYN flag marking a brand-new connection.",
        "Layer 3 carries the IPs and a TTL that drops by one at every router — dead at zero, which prevents routing loops.",
        "Layer 2 carries the MACs — and note the destination MAC is the gateway, not the final server. MACs change every hop; IPs stay end-to-end.",
      ], "green"),
      scenario(
        "Case study · the nat firewall",
        "Twelve staff share one public IP through the office router. Everyone browses at once — how do replies find the right desk?",
        "The router performs NAT: it rewrites source ports (51234 → 40001, 51235 → 40002...) and remembers the mapping. Replies arrive at the router, which translates back using its table.",
        "Encapsulation headers are rewritten in transit — but only by devices authorized to rewrite them. Seeing both layers of address is how analysts follow traffic through NAT.",
        [
          "Twelve devices, one public IP — on paper, impossible. NAT makes it routine.",
          "The router keeps a translation table: internal port 51234 becomes public port 40001, and replies are matched back to the right desk.",
          "For analysts, the lesson is bigger: headers change in transit. Knowing which rewrites are normal — NAT, proxies — is how you spot the rewrites that are not.",
        ],
      ),
      compare("MAC vs IP — Why Two Addresses?", {
        title: "MAC address", points: ["Burned into the NIC", "Local — changes every hop", "Switches use it (L2)", "Like the name on an envelope's next stop"],
      }, {
        title: "IP address", points: ["Assigned by configuration", "End-to-end — never changes", "Routers use it (L3)", "Like the final delivery address"],
        accent: "cyan",
      }, [
        "Students always ask: why do we need two kinds of address?",
        "MAC addresses move a frame one hop — laptop to gateway. They are rewritten at every router along the way.",
        "IP addresses stay constant end to end — the final destination never changes. Next stop versus final destination. Both are needed; they do different jobs.",
      ], "cyan"),
      quiz(
        "In Wireshark you see one row containing a TCP header inside an IP header inside an Ethernet header. What are you looking at?",
        ["One encapsulated packet/frame", "Three separate packets", "A retransmission error", "A corrupted capture"],
        0,
        "That nesting IS encapsulation, made visible. Wireshark shows you one frame whose payload is a packet whose payload is a segment.",
        [
          "Quick check — think about what Wireshark displays.",
        ],
        "purple"
      ),
      recap([
        "Down the stack, each layer adds a header: data → segment → packet → frame → bits.",
        "L4 adds ports, L3 adds IPs and TTL, L2 adds MACs and a checksum.",
        "MACs change hop by hop; IPs persist end to end — next stop vs final address.",
        "NAT deliberately rewrites headers — authorized translation, not tampering.",
        "A Wireshark row is encapsulation made visible — nested envelopes.",
      ], [
        "What you now know.",
        "Every request descends the stack gathering headers, and ascends shedding them.",
        "You know exactly which fields each layer adds — and you know the one header quirk that confuses beginners: MACs change per hop, IPs do not.",
        "Next: IP addressing and subnetting — the addresses themselves, and how networks carve them up.",
      ], "cyan"),
    ],
  },
  {
    lessonId: "les-nf-3-1", lessonTitle: "IP Addressing & Subnetting", courseId: "course-net-fundamentals",
    scenes: [
      title(
        "IP Addressing & Subnetting",
        "networking fundamentals · layer 3 deep dive",
        "Read any IP address like a pro: network portion, host portion, and the mask that divides them",
        [
          "This is the lesson where addressing clicks. Every IP address secretly contains two numbers — a network and a host — and subnetting is nothing more than moving the boundary between them.",
          "We will read real addresses, carve real subnets, and decode the private ranges you will meet in every enterprise.",
        ],
        "amber",
        [
          "Split any IPv4 address into network + host with a given prefix",
          "Carve a /24 into smaller subnets by hand",
          "Recognize private ranges and explain what NAT does",
          "Say why IPv6 exists and read its compressed notation"
        ]
      ),
      keyterms([
        { term: "IPv4 address", definition: "32 bits written as four octets (192.168.1.10). Network part + host part, split by the prefix length." },
        { term: "Prefix / mask", definition: "How many leading bits are the network: /24 means the first 24 bits (first three octets) are network." },
        { term: "Private ranges", definition: "10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16 — free to use internally, never routed on the public internet." },
        { term: "NAT", definition: "Network Address Translation — a router rewrites private source addresses to its public IP so many devices share one address." },
        { term: "IPv6", definition: "128-bit addresses written in hex with colons (2001:db8::1). Created because IPv4's 4.3 billion addresses ran out." },
      ], [
        "Five terms, and the whole topic organizes itself.",
        "An IPv4 address is 32 bits — four octets. It secretly holds two numbers: which network, and which device on it.",
        "The prefix — slash 24 in 192.168.1.0 slash 24 — declares where the split happens: first 24 bits network, last 8 bits host.",
        "Three ranges are reserved as private — every office on earth uses them internally, and they are never routed publicly.",
        "NAT is how a whole office shares one public IP, and IPv6 exists because 4.3 billion addresses proved too few for a connected planet.",
      ], "amber"),
      diagram("One Address, Two Numbers", {
        ip: { label: "192.168.1.130 /24", x: 380, y: 70, shape: "square", emphasis: true },
        net: { label: "Network 192.168.1.0", x: 210, y: 230, shape: "square" },
        host: { label: "Host .130", x: 550, y: 230, shape: "square" },
        mask: { label: "/24 decides the split", x: 380, y: 330, shape: "circle" },
      }, [
        { from: "ip", to: "net", animated: true },
        { from: "ip", to: "host", animated: true },
        { from: "net", to: "mask" }, { from: "host", to: "mask" },
      ], [
        "Watch the address split under a slash 24.",
        "The first three octets — 192.168.1 — are the network. The last octet — dot 130 — is this specific host on it.",
        "Change the prefix to slash 26 and the boundary moves inside the last octet: now dot 130 belongs to network 192.168.1.128. Same address, different meaning — the mask is everything.",
      ], "The prefix moves the boundary inside the address", "amber"),
      steps("Subnet by Hand: /24 → two /25s → four /26s", [
        { title: "Start /24", detail: "254 usable hosts (.1–.254)" },
        { title: "Borrow 1 bit → /25", detail: "two nets of 126: .0–127, .128–255" },
        { title: "Borrow 2 bits → /26", detail: "four nets of 62: .0, .64, .128, .192" },
        { title: "Rule", detail: "each borrowed bit doubles networks, halves hosts" },
      ], [
        "Now carve a network by hand — this is the exam question, and the interview question.",
        "A slash 24 gives 256 addresses minus network and broadcast: 254 usable hosts.",
        "Borrow one bit from the host side and you get two slash 25s: addresses 0 to 127 and 128 to 255 — 126 hosts each.",
        "Borrow two bits and you get four slash 26s starting at 0, 64, 128, and 192 — 62 hosts each.",
        "The rule is beautifully mechanical: every bit you borrow doubles the networks and halves the hosts per network.",
      ], "amber"),
      compare("Private vs Public Addressing", {
        title: "Private (RFC 1918)", points: ["10.x.x.x · 172.16–31.x.x · 192.168.x.x", "Free, reused by every org", "Routed only inside the LAN", "Needs NAT to reach the internet"],
      }, {
        title: "Public", points: ["Globally unique, ISP-assigned", "Routable on the internet", "Scarce — IPv4 exhausted", "Servers & gateways hold these"],
        accent: "cyan",
      }, [
        "Which addresses can touch the internet?",
        "Private ranges are free and reused everywhere — your home and a bank in Lagos can both use 192.168.1.0 slash 24 without colliding, because neither routes it publicly.",
        "Public addresses are globally unique and scarce — IPv4 formally ran out years ago. That scarcity is exactly why NAT exists and why IPv6 was invented.",
      ], "amber"),
      scenario(
        "Case study · the audit finding",
        "An auditor opens the firewall config of a logistics company and sees a rule allowing 'any source' to reach 197.x.x.x — a public server — on port 3389.",
        "Port 3389 is RDP — remote desktop — exposed to the entire internet. Within hours of any scan, brute-force attempts begin against it. This is one of the most common real-world findings.",
        "Fix: allow RDP only from the office's own public prefix (or better, through VPN), put the server behind the firewall's VPN gateway, and require MFA. Exposure shrank from 'the internet' to 'the staff'.",
        [
          "Port 3389 to the world is an invitation — scanners find it within hours and brute-force it for weeks.",
          "The remediation logic is exposure reduction in three steps: restrict by source, wrap it in VPN, add MFA underneath.",
          "When you read your first audit report, findings like this will be everywhere — now you know both the finding and the fix.",
        ],
      ),
      quiz(
        "How many usable host addresses does 192.168.4.0/26 provide?",
        ["62", "64", "126", "30"],
        0,
        "A /26 leaves 6 host bits = 64 addresses, minus the network address and the broadcast address = 62 usable hosts.",
        [
          "Knowledge check — remember to subtract the network and broadcast.",
        ],
        "purple"
      ),
      recap([
        "Every IPv4 address = network portion + host portion; the prefix sets the boundary.",
        "Each borrowed bit doubles networks and halves hosts: /24 → 2×/25 → 4×/26.",
        "Usable hosts = 2^host bits − 2 (network + broadcast reserved).",
        "Private ranges are free but NAT-bound; public addresses are scarce and routable.",
        "IPv6's 128 bits end the scarcity math — 2001:db8::1 style, double-colon compresses zeros.",
      ], [
        "What you now know.",
        "You can split any address with any mask, carve subnets by borrowing bits, and never forget the minus two for network and broadcast.",
        "You understand why private ranges and NAT exist — IPv4 scarcity — and what IPv6's 128 bits buy us.",
        "Next lesson: the two services that hand out these addresses and names automatically — DNS and DHCP.",
      ], "amber"),
    ],
  },
  {
    lessonId: "les-nf-3-3", lessonTitle: "DNS & DHCP", courseId: "course-net-fundamentals",
    scenes: [
      title(
        "DNS & DHCP",
        "networking fundamentals · the quiet workhorses",
        "The two services every network silently depends on — and the two attackers abuse most",
        [
          "Two services make networks usable: DNS turns names into addresses, and DHCP hands out addresses automatically.",
          "Neither is glamorous — both are on every attacker's shopping list. Master how they work and you will understand half of all real incidents.",
        ],
        "cyan",
        [
          "Trace a DNS lookup through resolver, root, TLD and authoritative servers",
          "Name the record types: A, AAAA, CNAME, MX, TXT",
          "Follow the DHCP DORA handshake",
          "Recognize DNS tunneling, spoofing and rogue DHCP at a glance"
        ]
      ),
      keyterms([
        { term: "DNS", definition: "Domain Name System — the internet's phone book: translates names like pibridge.com into IP addresses." },
        { term: "Resolver", definition: "The server (often your ISP's or 8.8.8.8) that walks the DNS hierarchy on your behalf and caches answers." },
        { term: "Records", definition: "A = IPv4 address, AAAA = IPv6, CNAME = alias, MX = mail server, TXT = free text (used by SPF, verification)." },
        { term: "DHCP", definition: "Dynamic Host Configuration Protocol — automatically leases IP address, gateway, and DNS server to joining devices." },
        { term: "DORA", definition: "The DHCP handshake: Discover, Offer, Request, Acknowledge — four packets and you are on the network." },
      ], [
        "Six terms, two services.",
        "DNS is the phone book: names to numbers. Your resolver does the walking and caches the answers so the next lookup is instant.",
        "You will meet five record types constantly: A for IPv4, AAAA for IPv6, CNAME for aliases, MX for mail, TXT for verification data.",
        "DHCP is the concierge: join the network and receive an address, gateway, and DNS server without touching a setting.",
        "And DORA is its four-packet handshake — Discover, Offer, Request, Acknowledge.",
      ], "cyan"),
      flow("A DNS Lookup, End to End", {
        client: { label: "Browser", x: 100, y: 250, shape: "square", emphasis: true },
        resolv: { label: "Resolver", x: 300, y: 120, shape: "square", emphasis: true },
        root: { label: "Root + .com TLD", x: 520, y: 120, shape: "square" },
        auth: { label: "Authoritative NS", x: 680, y: 250, shape: "square" },
      }, [
        { from: "client", to: "resolv", speed: 1.3, },
        { from: "resolv", to: "root", speed: 1.3 },
        { from: "root", to: "auth", speed: 1.3 },
        { from: "auth", to: "resolv", speed: 1.3 },
        { from: "resolv", to: "client", speed: 1.3 },
      ], [
        "You type pibridge.com and press Enter. Here is the next 40 milliseconds.",
        "Your resolver first checks its cache — nothing? Then it asks the root servers, which point it to the dot-com TLD servers.",
        "The TLD servers point to the authoritative name server — the one source of truth for pibridge.com — which returns the actual A record.",
        "The resolver caches the answer and hands your browser the IP. Six packets, forty milliseconds, cached for next time.",
      ], "Cache miss → root → TLD → authoritative → cached", "cyan"),
      terminal([
        { type: "command", text: "nslookup pibridge.com" },
        { type: "output", text: "Server:  resolver.local  Address: 192.168.1.1" },
        { type: "output", text: "Non-authoritative answer:" },
        { type: "output", text: "Name:    pibridge.com" },
        { type: "output", text: "Address: 197.157.x.x" },
        { type: "command", text: "nslookup -type=mx pibridge.com" },
        { type: "output", text: "pibridge.com  MX preference = 10, mail.pibridge.com" },
      ], [
        "You can watch this happen from any terminal.",
        "nslookup asks your resolver for the A record — note the words 'non-authoritative answer': that means it came from cache, not the authoritative server.",
        "The type flag changes the question — dash type=mx asks for the mail servers instead. Dig offers the same with richer output.",
      ], "cyan"),
      scenario(
        "Case study · data leaving through DNS",
        "A bank's SIEM flags one workstation making hundreds of unusual DNS queries per hour — long random subdomains like a7f3e2.exfil-cdn.example.",
        "This is DNS tunneling: malware encoding stolen data into subdomain names. DNS is allowed out of every network, so attackers smuggle data through it — 30 bytes per query adds up.",
        "Detection: alert on query volume per host, domain entropy, and NXDomain rates. Prevention: forced resolvers, DNS filtering, and blocking unapproved outbound UDP 53.",
        [
          "Why DNS? Because it is the one protocol every firewall lets out — attackers abuse the exception.",
          "Normal lookups are short and repeat. Tunneling subdomains are long, random, and never repeat — entropy is the tell.",
          "Defense in one line: force all DNS through your resolvers, and treat unusual volume from one host as an incident.",
        ],
      ),
      compare("DHCP DORA — in Four Packets", {
        title: "Client says", points: ["DISCOVER — 'any DHCP server here?'", "REQUEST — 'I'll take that offer'"],
      }, {
        title: "Server says", points: ["OFFER — 'here's 192.168.1.77 for 24h'", "ACK — 'it's yours, welcome'"],
        accent: "cyan",
      }, [
        "DHCP's whole protocol fits on one slide.",
        "A joining device broadcasts Discover. Servers answer with an Offer — an address and a lease time. The client Requests its favorite offer; the server Acknowledges.",
        "Discover, Offer, Request, Acknowledge — DORA. Leases expire and renew automatically, which is why laptops keep their address across reboots but hotels never run out.",
      ], "cyan"),
      quiz(
        "A workstation's traffic is being redirected to a fake banking site. The IP config shows gateway 192.168.1.99 — but the real gateway is 192.168.1.1. Which attack?",
        ["Rogue DHCP server", "DNS cache poisoning", "ARP table too small", "Expired TLS certificate"],
        0,
        "A bogus gateway handed out by a rogue DHCP server (or a poisoned lease) sends all traffic through the attacker. DNS poisoning would redirect names, not change your gateway.",
        [
          "Knowledge check — compare what each attack actually modifies.",
        ],
        "purple"
      ),
      recap([
        "DNS walks root → TLD → authoritative on cache misses, then caches the answer.",
        "A, AAAA, CNAME, MX, TXT — the five records you will actually use.",
        "DHCP leases addresses via DORA: Discover, Offer, Request, Acknowledge.",
        "DNS tunneling smuggles data in subdomains — watch volume and entropy.",
        "Rogue DHCP redirects whole networks via a fake gateway — verify your lease.",
      ], [
        "What you now know.",
        "You can trace a DNS lookup packet by packet, name the five record types, and recite the DHCP handshake.",
        "More importantly, you can spot the two classic attacks — tunneling and rogue servers — that hide inside these trusted services.",
        "Next lesson: firewalls — the first device that says no.",
      ], "cyan"),
    ],
  },
  {
    lessonId: "les-nf-4-1", lessonTitle: "Firewalls & ACLs", courseId: "course-net-fundamentals",
    scenes: [
      title(
        "Firewalls & ACLs",
        "networking fundamentals · the first line of defense",
        "Rules that decide which traffic passes, which is logged, and which is dropped — and how to write them",
        [
          "Everything so far has been about making traffic flow. This lesson is about the device that decides what may flow: the firewall.",
          "We will read real rules, place firewalls in a real architecture, and learn the golden rule every rulebook sits on.",
        ],
        "rose",
        [
          "Read and write firewall rules: the 5-tuple",
          "Place DMZ and internal zones in a layered architecture",
          "Apply default-deny and least privilege to rule sets",
          "Explain stateful inspection versus simple packet filtering"
        ]
      ),
      keyterms([
        { term: "Firewall", definition: "A device or software that permits or blocks traffic between network zones according to rules." },
        { term: "ACL", definition: "Access Control List — an ordered list of permit/deny rules evaluated top-down, first match wins." },
        { term: "5-tuple", definition: "The identity of a connection: source IP, source port, destination IP, destination port, protocol." },
        { term: "Stateful", definition: "The firewall tracks connections — replies to allowed outbound traffic are matched to the session, not re-argued." },
        { term: "DMZ", definition: "A buffer network for public-facing servers: internet can reach it, but it cannot reach the internal LAN." },
      ], [
        "Five terms before we write rules.",
        "A firewall is any device that permits or blocks traffic between zones by rules.",
        "The ACL is the rulebook — ordered, evaluated top-down, and the first match wins, so order is everything.",
        "Every rule names a connection by five things: source IP, source port, destination IP, destination port, protocol — the five-tuple.",
        "Modern firewalls are stateful: once you initiate a session outward, the replies are recognized as belonging to it.",
        "And a DMZ is the quarantine neighborhood for public servers.",
      ], "rose"),
      diagram("Layered Perimeter", {
        inet: { label: "Internet", x: 90, y: 190, shape: "circle" },
        fw: { label: "Edge firewall", x: 260, y: 190, shape: "square", emphasis: true },
        dmz: { label: "DMZ · web/mail", x: 470, y: 80, shape: "square" },
        lan: { label: "Internal LAN", x: 470, y: 300, shape: "square" },
        db: { label: "Database tier", x: 680, y: 300, shape: "square", emphasis: true },
      }, [
        { from: "inet", to: "fw", animated: true, label: "filtered" },
        { from: "fw", to: "dmz", label: "443 only" },
        { from: "fw", to: "lan", label: "established only" },
        { from: "lan", to: "db", animated: true, label: "app tier only" },
      ], [
        "Here is the classic layered perimeter.",
        "The internet may reach the DMZ — web and mail servers — on exactly the ports those services need, and nothing else.",
        "The internet may NOT initiate anything into the internal LAN; only replies to sessions the LAN started are allowed back in.",
        "And inside, the app tier — and only the app tier — may reach the database tier. Each hop is a checkpoint.",
      ], "Internet → DMZ → LAN → data: every arrow is a rule", "rose"),
      code("acl.example.cfg", [
        "# top-down; first match wins",
        "permit tcp any host 197.0.0.10 eq 443   # public web",
        "permit tcp 197.0.0.0/24 host 197.0.0.11 eq 22   # SSH: office only",
        "deny  ip any host 197.0.0.11            # RDP: everyone else",
        "permit ip 192.168.1.0/24 any established  # return traffic",
        "deny   ip any any log                   # default deny + log",
      ], [
        "Let us read a real rulebook, top to bottom.",
        "Rule one: the whole world may reach the web server on HTTPS — nothing more.",
        "Rule two: SSH is permitted only from the office's own public range. Rule three explicitly denies everyone else to that host, and logs it.",
        "Then established sessions return home, and the final line is the golden rule made visible: deny everything else, and log every attempt.",
      ], "green"),
      compare("Stateless vs Stateful Firewalls", {
        title: "Stateless (packet filter)", points: ["Checks each packet alone", "Fast, cheap, no memory", "Replies need explicit rules", "Classic ACLs on routers"],
      }, {
        title: "Stateful", points: ["Tracks whole connections", "Replies auto-matched to sessions", "Sees SYN floods & half-opens", "The modern default"],
        accent: "cyan",
      }, [
        "One more distinction — stateless versus stateful.",
        "A stateless filter judges each packet in isolation; return traffic must be permitted by explicit rule.",
        "A stateful firewall remembers sessions: you allow staff to browse out, and the replies come back through the same remembered connection automatically. It also sees attack patterns — half-open connections, SYN floods — that only make sense across packets.",
      ], "rose"),
      scenario(
        "Case study · the any-any rule",
        "Under deadline, an engineer adds 'permit ip any any' to fix a broken app — 'temporarily'. Eighteen months later, an auditor finds it.",
        "That rule disables the entire firewall: every protection after it is unreachable, because first-match-wins hits 'any any' before any deny. The network had been wide open for a year and a half.",
        "Fixes: default-deny at the bottom, change control for rule edits, quarterly rule reviews, and alerting on rules that match 'any any'. One line of laziness undid an architecture.",
        [
          "Every firewall engineer has been tempted by this fix — it works instantly, which is exactly the problem.",
          "Because ACLs are first-match-wins, that one line shadows every deny below it. The firewall kept blinking but stopped thinking.",
          "The durable defenses are procedural: change control, quarterly reviews, and automated alerts on any rule containing 'any any'.",
        ],
      ),
      quiz(
        "Rules read: (1) permit tcp any host W eq 443, (2) deny ip any any. A client connects to W on port 8080. What happens?",
        ["Dropped by rule 2", "Allowed by rule 1", "Allowed — 8080 is well-known", "Sent to the DMZ"],
        0,
        "Rule 1 only matches port 443. The 8080 attempt falls through to rule 2 — the default deny — and is dropped. First match wins; nothing after rule 2 ever applies.",
        [
          "Knowledge check — walk the rules top down.",
        ],
        "purple"
      ),
      recap([
        "Rules match the 5-tuple: src IP+port, dst IP+port, protocol — first match wins.",
        "Order is logic: specific permits high, default deny last, log everything denied.",
        "DMZ holds public services; internal LAN accepts no initiated connections from outside.",
        "Stateful firewalls track sessions — replies ride established connections.",
        "'permit any any' is how a firewall becomes a piece of wire.",
      ], [
        "What you now know.",
        "You can read a rulebook top-down and predict exactly what passes and what dies.",
        "You know the architecture — DMZ, LAN, data tier — and the golden rule: default deny, log the rest.",
        "Next: intrusion detection — the systems that watch what the firewall let through.",
      ], "rose"),
    ],
  },
  {
    lessonId: "les-nf-5-1", lessonTitle: "Wireshark Fundamentals", courseId: "course-net-fundamentals",
    scenes: [
      title(
        "Wireshark Fundamentals",
        "networking fundamentals · packet analysis",
        "Read the network's memory: capture, filter, and follow conversations packet by packet",
        [
          "Wireshark is the defender's microscope — the tool that turns 'the network is slow' into a named cause, and 'we were hacked' into a timestamped story.",
          "This lesson teaches capture mechanics, the four filters you will use daily, and how to follow a live attack in a capture.",
        ],
        "green",
        [
          "Capture on the right interface, with and without filters",
          "Master display filters: host, port, protocol, SYN-only",
          "Follow a TCP stream like reading a chat log",
          "Spot scans, floods and exfiltration in a capture"
        ]
      ),
      keyterms([
        { term: "Promiscuous mode", definition: "NIC passes every frame it sees to the analyzer, not just frames addressed to it." },
        { term: "Capture filter (BPF)", definition: "Decides what Wireshark records at all — efficient, applied at capture time (tcp port 443)." },
        { term: "Display filter", definition: "Post-capture search across everything recorded — full syntax, endlessly refinable (ip.addr == x)." },
        { term: "TCP stream", definition: "Wireshark's reconstruction of one conversation — all packets of a session stitched in order." },
      ], [
        "Four terms unlock the whole tool.",
        "Promiscuous mode lets your NIC see frames addressed to everyone — essential on a mirror port.",
        "Capture filters decide what gets recorded, applied early and cheaply — think 'record only port 443'.",
        "Display filters search what you already have — where you spend 90 percent of your time.",
        "And Follow TCP Stream stitches one conversation back into a readable transcript.",
      ], "green"),
      terminal([
        { type: "command", text: "wireshark    # then: Capture → Options → eth0, enable promiscuous" },
        { type: "output", text: "Capturing on eth0 — packets appear live" },
        { type: "command", text: "# display filters — type in the filter bar" },
        { type: "output", text: "ip.addr == 192.168.1.100        # this host, both directions" },
        { type: "output", text: "tcp.port == 443                 # all HTTPS" },
        { type: "output", text: "dns                             # every name lookup" },
        { type: "output", text: "tcp.flags.syn==1 && tcp.flags.ack==0   # NEW connections only" },
      ], [
        "The workflow in practice: choose your interface, start the capture, and let traffic accumulate.",
        "Then filter. ip.addr isolates one machine in both directions. tcp.port isolates a service. The word dns shows every lookup happening.",
        "And this last one is the money filter: SYN packets without ACK — every brand-new connection attempt. Under a scan, they pour in from one source to sequential ports.",
      ], "green"),
      scenario(
        "Case study · reading an attack in 20 packets",
        "Alert: 'possible compromise of workstation .44'. You have a capture from the span port. Where do you even start?",
        "Filter ip.addr==.44 and sort by time. First: a burst of SYNs to sequential ports — a scan. Then a login to an unusual port. Then a large outbound TLS session to a brand-new domain at 3 AM. The story writes itself: scanned, entered, exfiltrated.",
        "Every incident report's timeline starts exactly like this — filtered capture, ordered events, one conclusion per line. Packets are the most honest witness you will ever have.",
        [
          "An alert gives you a hostname and dread. The capture gives you a story.",
          "Filter to the host, sort by time, and read: scan, login, large outbound session at 3 AM. Three acts, one verdict.",
          "This is exactly how real investigation reports get their timelines — and why packet skills are the most transferable skill in the SOC.",
        ],
      ),
      compare("Capture Filter vs Display Filter", {
        title: "Capture (BPF)", points: ["Applied while recording", "Cheap — less disk, less noise", "Limited syntax: 'tcp port 443'", "Can't be changed after capture"],
      }, {
        title: "Display", points: ["Applied after recording", "Full protocol field syntax", "Refine endlessly, save favorites", "Your daily driver"],
        accent: "cyan",
      }, [
        "Students mix these two up constantly — here is the split.",
        "Capture filters run while recording: efficient but rigid — change one and you must recapture.",
        "Display filters run after: you can refine, stack, color, and save them. Practical rule: capture broadly, filter precisely.",
      ], "green"),
      quiz(
        "Which display filter shows only new TCP connection attempts (scans, floods)?",
        ["tcp.flags.syn==1 && tcp.flags.ack==0", "tcp.port == 80", "ip.ttl == 64", "http.request"],
        0,
        "A SYN with no ACK is the first packet of every connection. A stream of them to many ports is a scan; thousands to one port is a SYN flood.",
        [
          "Knowledge check — remember what makes a first packet special.",
        ],
        "purple"
      ),
      recap([
        "Promiscuous mode + span ports = seeing traffic that is not addressed to you.",
        "Capture filters limit recording; display filters interrogate the capture.",
        "ip.addr, tcp.port, dns, and SYN-no-ACK cover most daily work.",
        "Follow TCP Stream turns binary chatter into a readable transcript.",
        "Scans, floods, and exfil all have visual signatures in the packet list.",
      ], [
        "What you now know.",
        "Capture on the right interface, filter with intent, follow streams, and read the story packets tell.",
        "With this lesson you complete the networking core — and everything in the SOC course ahead will stand on these packets.",
      ], "green"),
    ],
  },
];
