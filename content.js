function calculateNeededClasses(attended, total, targetPercent) {
  let x = 0;
  while (((attended + x) / (total + x)) * 100 < targetPercent) {
    x++;
  }
  return x;
}

function extractAttendance() {
  const rows = document.querySelectorAll("table tbody tr");
  const data = [];

  rows.forEach((row) => {
    const cols = row.querySelectorAll("td");
    if (cols.length >= 5) {
      const subject = cols[0].innerText.trim();
      const record = cols[3].innerText.trim(); // "20 / 30"
      const [attended, total] = record.split("/").map(n => parseInt(n.trim()));

      if (!isNaN(attended) && !isNaN(total) && total > 0) {
        data.push({
          subject,
          attended,
          total,
          percent: ((attended / total) * 100).toFixed(2),
          to65: calculateNeededClasses(attended, total, 65),
          to75: calculateNeededClasses(attended, total, 75)
        });
      }
    }
  });

  return data;
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "getAttendance") {
    sendResponse({ data: extractAttendance() });
  }
});
