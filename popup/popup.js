document.addEventListener('DOMContentLoaded', function () {
  var toggleButton = document.getElementById('toggleButton');

  chrome.storage.sync.get('enabled', function (result) {
    if (result.enabled) {
      toggleButton.textContent = 'Turn Off';
    } else {
      toggleButton.textContent = 'Turn On';
    }
  });

  toggleButton.addEventListener('click', function () {
    chrome.storage.sync.get('enabled', function (result) {
      var enabled = !result.enabled;
      chrome.storage.sync.set({ enabled: enabled }, function () {
        if (enabled) {
          toggleButton.textContent = 'Turn Off';
          startScrollDetection();
        } else {
          toggleButton.textContent = 'Turn On';
          stopScrollDetection();
        }
      });
    });
  });
});

function startScrollDetection() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    chrome.scripting.insertCSS({
      target: { tabId: tab.id },
      files: ['popup/popup.css'],
    });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['scripts/scroll-detection.js'],
    });
  });
}

function stopScrollDetection() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    chrome.scripting.removeCSS({
      target: { tabId: tab.id },
      files: ['popup/popup.css'],
    });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: stopHandleScroll,
    });
  });
}

function stopHandleScroll() {
  window.scrollDetection.stop();
}
