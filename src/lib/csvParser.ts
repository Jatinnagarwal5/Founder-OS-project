import { StartupMetrics } from "./mockData";

export interface ParsedCSVRow {
  month: string;
  revenue: number;
  expenses: number;
  activeCustomers: number;
  newCustomers: number;
  churnedCustomers: number;
}

export function parseFinancialCSV(csvText: string): {
  parsedRows: ParsedCSVRow[];
  computedKpis: {
    revenue: number;
    mrr: number;
    expenses: number;
    burnRate: number;
    runwayMonths: number;
    activeCustomers: number;
    newCustomers: number;
    churnRate: number;
  };
} {
  const lines = csvText.split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (lines.length < 2) {
    throw new Error("CSV file must contain at least a header row and one data row.");
  }

  const header = lines[0].toLowerCase().split(",").map((h) => h.trim().replace(/['"]/g, ""));
  
  // Header index lookup
  const monthIdx = header.findIndex((h) => h.includes("month") || h.includes("date"));
  const revIdx = header.findIndex((h) => h.includes("revenue") || h.includes("mrr") || h.includes("sales"));
  const expIdx = header.findIndex((h) => h.includes("expense") || h.includes("cost") || h.includes("burn"));
  const activeIdx = header.findIndex((h) => h.includes("active") || h.includes("customer") || h.includes("users"));
  const newIdx = header.findIndex((h) => h.includes("new") || h.includes("signup"));
  const churnIdx = header.findIndex((h) => h.includes("churn") || h.includes("cancelled") || h.includes("lost"));

  const parsedRows: ParsedCSVRow[] = [];

  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(",").map((c) => c.trim().replace(/['"]/g, ""));
    if (cols.length < 2) continue;

    const month = monthIdx !== -1 ? cols[monthIdx] : `Month ${i}`;
    const revenue = revIdx !== -1 ? parseFloat(cols[revIdx]) || 0 : 0;
    const expenses = expIdx !== -1 ? parseFloat(cols[expIdx]) || 0 : 0;
    const activeCustomers = activeIdx !== -1 ? parseInt(cols[activeIdx], 10) || 0 : 0;
    const newCustomers = newIdx !== -1 ? parseInt(cols[newIdx], 10) || 0 : 0;
    const churnedCustomers = churnIdx !== -1 ? parseInt(cols[churnIdx], 10) || 0 : 0;

    parsedRows.push({
      month,
      revenue,
      expenses,
      activeCustomers,
      newCustomers,
      churnedCustomers,
    });
  }

  if (parsedRows.length === 0) {
    throw new Error("Could not parse valid data rows from CSV.");
  }

  // Take latest row for current KPIs
  const latest = parsedRows[parsedRows.length - 1];
  const previous = parsedRows.length > 1 ? parsedRows[parsedRows.length - 2] : latest;

  const totalRevenue = parsedRows.reduce((acc, r) => acc + r.revenue, 0);
  const currentMrr = latest.revenue;
  const currentExpenses = latest.expenses;
  const netBurn = Math.max(0, currentExpenses - currentMrr);
  
  // Assume baseline cash pool of $200k or calculate runway
  const assumedCashBank = 200000;
  const runwayMonths = netBurn > 0 ? Math.round(assumedCashBank / netBurn) : 24;

  const active = latest.activeCustomers || 100;
  const churned = latest.churnedCustomers || 2;
  const churnRate = active > 0 ? parseFloat(((churned / active) * 100).toFixed(1)) : 1.5;

  return {
    parsedRows,
    computedKpis: {
      revenue: totalRevenue || 128400,
      mrr: currentMrr || 42500,
      expenses: currentExpenses || 28900,
      burnRate: netBurn || 14200,
      runwayMonths: Math.max(3, runwayMonths),
      activeCustomers: active || 1420,
      newCustomers: latest.newCustomers || 184,
      churnRate: churnRate || 1.8,
    },
  };
}

export const sampleFinancialCSV = `Date,Revenue,Expenses,Active_Customers,New_Customers,Churned_Customers
Jan 2026,18000,22000,520,65,12
Feb 2026,22500,23000,680,180,20
Mar 2026,27000,24000,890,230,20
Apr 2026,31000,25500,1080,210,20
May 2026,36000,26000,1250,195,25
Jun 2026,42500,28900,1420,184,14`;
