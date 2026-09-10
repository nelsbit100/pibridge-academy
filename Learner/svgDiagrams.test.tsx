import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { renderSvgTemplate, SVG_TEMPLATES } from "./svgDiagrams";

// Every template in the library must render without crashing and produce an
// SVG root, with and without stage labels. Coordinate bugs (off-viewBox text,
// misrouted connectors) are layout defects, but a render crash is not.
describe("animated SVG diagram library", () => {
  it("renders every registered template", () => {
    const names = Object.keys(SVG_TEMPLATES);
    expect(names.length).toBeGreaterThan(10);
    for (const name of names) {
      const { container } = render(renderSvgTemplate(name, "cyan", undefined, 0));
      expect(container.querySelector("svg"), `template ${name}`).not.toBeNull();
      container.remove();
    }
  });

  it("renders every registered template with stage labels", () => {
    const names = Object.keys(SVG_TEMPLATES);
    for (const name of names) {
      const { container } = render(
        renderSvgTemplate(name, "amber", ["Stage A", "Stage B", "Stage C", "Stage D"], 0)
      );
      expect(container.querySelector("svg"), `template ${name}`).not.toBeNull();
      container.remove();
    }
  });

  it("renders a graceful fallback for unknown templates", () => {
    const { container } = render(renderSvgTemplate("no-such-template", "cyan", undefined, 0));
    expect(container.textContent).toContain("missing template");
  });

  // Key text each template must render. A missing label here means the
  // template lost a caption or a box — the class of regression that shows up
  // as a diagram that teaches the wrong thing.
  const EXPECTED_LABELS: Record<string, string[]> = {
    osi: ["Application", "Transport", "Network", "Data Link", "Physical", "data descends"],
    tcp: ["Client", "Server", "SYN", "SYN-ACK", "ACK", "session open"],
    packet: ["Laptop", "Router", "ISP", "Server", "traceroute", "TTL"],
    defense: ["Data", "Application", "Endpoint", "Network", "crown", "every ring"],
    dmz: ["Internet", "firewall", "DMZ", "internal LAN", "management net", "published ports"],
    tls: ["Browser", "Web server", "ClientHello", "ServerHello", "padlock", "certificate"],
    cicd: ["Commit", "Build", "Test", "Scan", "Staging", "Production", "rollback"],
    inc: ["Plan", "Code", "Build", "Test", "Release", "Deploy", "Operate", "Monitor", "culture"],
    loop: ["Observe", "Orient", "Decide", "Act", "never"],
    symvsym: ["Symmetric", "Asymmetric", "AES", "RSA", "private", "key"],
    hashenc: ["Encryption", "Hashing", "password123", "ciphertext", "digest", "no undo"],
    factors: ["Something you KNOW", "Something you HAVE", "Something you ARE", "MFA", "SIM-swap"],
    malware: ["Delivery", "Exploit", "Persistence", "C2 Beacon", "Lateral Movement", "Actions on Objective"],
    killchain: ["Recon", "Weaponize", "Deliver", "Exploit", "Install", "C2", "Actions", "boom"],
    hashring: ["shard A", "hash(key)", "resharding", "deterministic"],
    loadbal: ["users", "load balancer", "web-1", "web-2", "web-3", "health check"],
    replication: ["primary", "replica 1", "replica 2", "replica 3", "single-writer"],
    storage: ["Object", "Block", "File", "Archive", "durability", "latency"],
    iam: ["User / Role", "Policy", "Resource", "Permission boundary", "Audit", "default is DENY"],
    sharedresp: ["On-prem", "IaaS", "PaaS", "SaaS", "your job", "cloud's job"],
    request: ["Browser", "Web stack", "DNS", "TCP", "TLS", "HTTP", "budget"],
    specificity: ["!important", "Inline style", "#id", ".class", "element"],
    reactflow: ["state / props change", "render (pure)", "reconcile", "commit", "effects run"],
    jwt: ["client", "API server", "JWT", "Bearer", "stateless"],
    obs: ["Metrics", "Logs", "Traces", "p99", "WHAT exactly happened"],
    triage: ["Alert fires", "Validate", "Scope", "Assess impact", "Contain / escalate", "Document", "the clock"],
    tiers: ["Tier 1", "Tier 2", "Tier 3", "escalate with evidence"],
    grid: ["Item A", "Item B", "a map, not a checklist"],
    container: ["Dockerfile", "Image", "Registry", "Runtime", "works on my machine"],
    k8s: ["kubectl", "Control plane", "Worker node 1", "Worker node 2", "pod1", "self-healing"],
    pyramid: ["E2E", "Integration", "Unit", "pyramid", "iceberg"],
    ws: ["Client", "Server", "Upgrade", "frames", "full-duplex"],
  };

  it("renders each template's key labels", () => {
    for (const [name, expected] of Object.entries(EXPECTED_LABELS)) {
      const { container } = render(renderSvgTemplate(name, "cyan", undefined, 0));
      const text = container.textContent ?? "";
      for (const label of expected) {
        expect(text, `template ${name} label "${label}"`).toContain(label);
      }
      container.remove();
    }
  });

  it("replaces stage labels where the template accepts them", () => {
    // Generic templates take labels from the lesson (pipelines, cycles, ladders, grids).
    const { container } = render(
      renderSvgTemplate("loop", "cyan", ["Spoofing", "Tampering", "Repudiation", "Info Disclosure"], 0)
    );
    expect(container.textContent).toContain("Spoofing");
    expect(container.textContent).toContain("Repudiation");
  });
});