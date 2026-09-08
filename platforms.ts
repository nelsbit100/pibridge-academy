// ──────────────────────────────────────────────────────────────
// PiBridge BusinessOS & Secure Platform Sections
// ──────────────────────────────────────────────────────────────

// ── BusinessOS Platform Data ──
export const BUSINESS_OS = {
  name: "PiBridge BusinessOS",
  tagline: "Run your business, not your spreadsheets.",
  description: "An all-in-one operations dashboard for Ghanaian micro and small businesses. Sales, expenses, cashflow, stock, and invoicing — in one place. No more WhatsApp + notebook + Excel + MoMo confusion.",
  color: "emerald",
  icon: "💼",
  stats: {
    businessesTargeted: "50,000+",
    avgTimeSavedPerWeek: "12 hours",
    avgRevenueIncrease: "23%",
  },
  features: [
    {
      title: "Sales & Invoicing",
      description: "Create professional invoices in seconds. Track sales by day, week, month. Accept MoMo, Telecel Cash, and bank transfers.",
      icon: "Receipt",
      highlights: ["Auto-generate invoices", "Track pending payments", "Mobile money integration", "Receipt printing"],
    },
    {
      title: "Expense Tracking",
      description: "Log every cedi spent. Categorize expenses, track suppliers, and see where your money goes.",
      icon: "Wallet",
      highlights: ["Category tagging", "Supplier management", "Recurring expenses", "Photo receipts"],
    },
    {
      title: "Cashflow Dashboard",
      description: "See your money flow in real-time. Know exactly what's coming in, what's going out, and what's owed.",
      icon: "TrendingUp",
      highlights: ["Real-time cash position", "Cashflow forecasting", "Outstanding payments", "Profit & loss"],
    },
    {
      title: "Inventory Management",
      description: "Track stock levels, set low-stock alerts, and manage product catalogues across locations.",
      icon: "Package",
      highlights: ["Stock level tracking", "Low-stock alerts", "Multi-location support", "Barcode scanning"],
    },
    {
      title: "Business Health Score",
      description: "A single number that tells you how healthy your business is — based on revenue, profit, cashflow, inventory, and customer metrics.",
      icon: "Heart",
      highlights: ["6 health sub-scores", "Trend tracking", "Actionable recommendations", "Weekly email report"],
    },
    {
      title: "Multi-Location Support",
      description: "Manage multiple shops, branches, or warehouses from one dashboard. See performance across all locations.",
      icon: "MapPin",
      highlights: ["Branch-level reporting", "Stock transfers", "Role-based access", "Location analytics"],
    },
  ],
  mockData: {
    healthScore: {
      overall: 78,
      revenue: { score: 85, trend: "up" },
      profitability: { score: 72, trend: "up" },
      cashflow: { score: 68, trend: "down" },
      inventory: { score: 82, trend: "stable" },
      customers: { score: 90, trend: "up" },
      expenses: { score: 74, trend: "down" },
    },
    todayStats: {
      sales: 4250,
      expenses: 1800,
      profit: 2450,
      pendingPayments: 1200,
      lowStockItems: 3,
    },
  },
  pricing: [
    { name: "Starter", price: "Free", period: "forever", features: ["1 user", "100 transactions/month", "Basic dashboard", "Mobile app"], recommended: false },
    { name: "Growth", price: "GH₵ 99", period: "/month", features: ["3 users", "Unlimited transactions", "Full dashboard", "Invoicing", "Inventory", "Priority support"], recommended: true },
    { name: "Business", price: "GH₵ 249", period: "/month", features: ["Unlimited users", "Multi-location", "API access", "Accountant access", "Custom reports", "Dedicated support"], recommended: false },
  ],
};

// ── Secure Platform Data ──
export const SECURE_PLATFORM = {
  name: "PiBridge Secure",
  tagline: "Enterprise cybersecurity for small businesses.",
  description: "Affordable managed cybersecurity for Ghanaian businesses that can't afford an enterprise security team. From security assessment to monitoring to incident response — we handle it so you can focus on your business.",
  color: "red",
  icon: "🔒",
  stats: {
    businessesProtected: "500+",
    incidentsDetected: "12,000+",
    averageResponseTime: "< 4 hours",
  },
  features: [
    {
      title: "Security Assessment",
      description: "We assess your current security posture — network, devices, accounts, and cloud. Get a clear picture of where you stand.",
      icon: "Search",
      highlights: ["Network vulnerability scan", "Account security review", "Cloud configuration audit", "Risk scoring"],
    },
    {
      title: "Security Baseline",
      description: "We implement essential security controls: MFA, endpoint protection, backup verification, and access controls.",
      icon: "Shield",
      highlights: ["Multi-factor authentication", "Endpoint detection & response", "Backup monitoring", "Access control policies"],
    },
    {
      title: "Staff Awareness Training",
      description: "Your team learns to recognize phishing, handle sensitive data, and follow security best practices.",
      icon: "Users",
      highlights: ["Monthly security tips", "Phishing simulations", "Security awareness certificates", "Incident reporting"],
    },
    {
      title: "Monthly Security Reports",
      description: "Clear, plain-language reports that tell you what's protected, what's at risk, and what we're doing about it.",
      icon: "FileText",
      highlights: ["Security score tracking", "Threat summary", "Recommendations", "Compliance status"],
    },
    {
      title: "Incident Response",
      description: "When something happens, we respond. Our team investigates, contains, and helps you recover — fast.",
      icon: "AlertTriangle",
      highlights: ["24/7 alert monitoring", "Rapid response team", "Forensic investigation", "Recovery support"],
    },
    {
      title: "Compliance Support",
      description: "Meet Ghana Data Protection Act, PCI-DSS, and industry requirements without hiring a compliance team.",
      icon: "CheckCircle",
      highlights: ["DPA compliance checklist", "PCI-DSS guidance", "Audit preparation", "Policy templates"],
    },
  ],
  mockData: {
    securityScore: {
      overall: 85,
      identity: { score: 90, status: "strong" },
      email: { score: 85, status: "good" },
      endpoints: { score: 80, status: "good" },
      backups: { score: 75, status: "needs-attention" },
      employees: { score: 70, status: "needs-attention" },
      cloud: { score: 88, status: "strong" },
      compliance: { score: 92, status: "strong" },
    },
    threatsBlocked: 1247,
    lastScan: "2 hours ago",
  },
  pricing: [
    { name: "Essential", price: "GH₵ 299", period: "/month", features: ["Security assessment", "Monthly report", "Email security", "Basic MFA setup", "4 business hours response"], recommended: false },
    { name: "Professional", price: "GH₵ 699", period: "/month", features: ["Everything in Essential", "Endpoint protection", "Staff training", "Cloud monitoring", "1 hour response"], recommended: true },
    { name: "Enterprise", price: "GH₵ 1,499", period: "/month", features: ["Everything in Professional", "24/7 monitoring", "Incident response", "Compliance support", "Dedicated analyst"], recommended: false },
  ],
};
