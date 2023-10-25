// Background script for your Chrome extension

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  // Check if the tab update status is 'complete'
  if (changeInfo.status === 'complete') {
    // Access the tab's URL and create a URL object
    if (tab.url) {
      const url = new URL(tab.url);
      
      // Perform actions based on the URL or hostname
      const hostname = url.hostname;
      // You can use the `hostname` or other URL properties for further processing
      console.log(`Tab URL: ${tab.url}`);
      console.log(`Hostname: ${hostname}`);
      
      // Example: Group tabs with the same hostname
      groupTabsByHostname(tab, hostname);
    }
  }
});

// Function to group tabs with the same hostname
function groupTabsByHostname(tab, hostname) {
  chrome.tabs.query({ currentWindow: true }, function (tabs) {
    const tabsToGroup = tabs.filter(t => new URL(t.url).hostname === hostname);
    if (tabsToGroup.length > 1) {
      const tabIds = tabsToGroup.map(t => t.id);
      chrome.tabs.group({ tabIds: tabIds }, function (group) {
        // Update the tab group title to the hostname
        chrome.tabGroups.update(group.id, { title: hostname });
      });
    }
  });
}
