export default async function handler(req, res) {
  const csvUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRrw8y7JKY3rsX4GOdSoi-j2MaCkSh9aM7LS5QeIXJsXbThTtfpGUwaI_DPnR49NPaO8YPBleLKsj0n/pub?gid=1420393186&single=true&output=csv";

  try {
    const response = await fetch(csvUrl + "&t=" + Date.now());
    if (!response.ok) {
      return res.status(response.status).send("Failed to fetch CSV");
    }
    const text = await response.text();
    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader("Cache-Control", "no-store");
    return res.status(200).send(text);
  } catch (error) {
    return res.status(500).send("Error fetching CSV: " + error.message);
  }
}
