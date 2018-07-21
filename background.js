chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
    // debugger;
    // chrome.tabs.executeScript(null,{code:"document.body.style.backgroundColor='red'"});
    chrome.tabs.executeScript(null, {
        code: 'window.location.reload()'
    })
    chrome.tabs.executeScript(null, {
        file: 'twignore.css'
    })
    chrome.tabs.executeScript(null, {
        file: 'twignore.js'
      });
});
