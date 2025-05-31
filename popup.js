chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  chrome.tabs.sendMessage(tabs[0].id, { action: "getAttendance" }, (response) => {
    const result = document.getElementById("result");
    if (!response || !response.data || response.data.length === 0) {
      result.innerHTML = "<p>No valid attendance data found.</p>";
      return;
    }

    result.innerHTML = "<ul>" + response.data.map((item) => `
      <li>
        <strong>${item.subject}</strong><br>
        Attended: ${item.attended}/${item.total} (${item.percent}%)<br>
        ➤ Need <b>${item.to65}</b> more for 65%, <b>${item.to75}</b> more for 75%
      </li>
    `).join('') + "</ul>";
  });
});
