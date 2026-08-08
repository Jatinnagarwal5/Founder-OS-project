import { StartupMetrics } from "./mockData";

export function exportToCSV(filename: string, rows: Record<string, any>[]) {
  if (!rows || !rows.length) return;

  const headers = Object.keys(rows[0]).join(",");
  const csvLines = rows.map((r) =>
    Object.values(r)
      .map((val) => `"${String(val).replace(/"/g, '""')}"`)
      .join(",")
  );

  const csvContent = "data:text/csv;charset=utf-8," + [headers, ...csvLines].join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", filename.endsWith(".csv") ? filename : `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportInvestorReportPDF(startupData: StartupMetrics, title = "Investor Executive Update") {
  const printWindow = window.open("", "_blank");
  if (!printWindow) {
    alert("Please allow popups to download the Investor PDF Report.");
    return;
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${title} - ${startupData.name}</title>
        <style>
          body { font-family: system-ui, -apple-system, sans-serif; color: #0f172a; padding: 40px; max-width: 800px; margin: 0 auto; line-height: 1.6; }
          .header { border-bottom: 2px solid #3b82f6; padding-bottom: 20px; margin-bottom: 30px; display: flex; justify-content: space-between; align-items: flex-end; }
          h1 { margin: 0; font-size: 28px; color: #0f172a; }
          .subtitle { color: #64748b; font-size: 14px; margin-top: 4px; }
          .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 30px; }
          .card { background: #f8fafc; border: 1px solid #e2e8f0; padding: 16px; border-radius: 12px; }
          .card-title { font-size: 11px; text-transform: uppercase; color: #64748b; font-weight: bold; }
          .card-value { font-size: 22px; font-weight: 800; color: #1e293b; margin-top: 4px; }
          .section { margin-bottom: 30px; }
          .section-title { font-size: 16px; font-weight: bold; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; margin-bottom: 12px; }
          ul { padding-left: 20px; }
          li { margin-bottom: 6px; font-size: 13px; color: #334155; }
          .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 11px; color: #94a3b8; text-align: center; }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <h1>${startupData.name}</h1>
            <div class="subtitle">${title} • Generated on ${new Date().toLocaleDateString()}</div>
          </div>
          <div style="text-align: right; font-weight: bold; color: #3b82f6; font-size: 14px;">
            Stage: ${startupData.stage}
          </div>
        </div>

        <div class="grid">
          <div class="card">
            <div class="card-title">Monthly Recurring Revenue</div>
            <div class="card-value">$${startupData.kpis.mrr.toLocaleString()}</div>
          </div>
          <div class="card">
            <div class="card-title">Cash Runway</div>
            <div class="card-value">${startupData.kpis.runwayMonths} Months</div>
          </div>
          <div class="card">
            <div class="card-title">Active Customers</div>
            <div class="card-value">${startupData.kpis.activeCustomers.toLocaleString()}</div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Key Executive Observations</div>
          <ul>
            ${startupData.aiInsights.map((i) => `<li><strong>${i.title}:</strong> ${i.observation} (<em>Rec: ${i.recommendation}</em>)</li>`).join("")}
          </ul>
        </div>

        <div class="section">
          <div class="section-title">Operational Risks & Mitigations</div>
          <ul>
            ${startupData.risks.map((r) => `<li><strong>${r.title}:</strong> ${r.description} <em>[Action: ${r.actionNeeded}]</em></li>`).join("")}
          </ul>
        </div>

        <div class="footer">
          Confidential • Helm AI Telemetry Engine • Powered by Gemini 2.5 Flash
        </div>

        <script>
          window.onload = function() {
            window.print();
          }
        </script>
      </body>
    </html>
  `;

  printWindow.document.write(htmlContent);
  printWindow.document.close();
}
