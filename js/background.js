const requestFilter = {
    urls: ['https://192.168.100.100/*'],
}

chrome.webRequest.onCompleted.addListener((details) => {
    console.log(details);
    let frameId = details.frameId;
    let tabId = details.tabId;
    chrome.scripting.executeScript({
        target: {tabId: tabId},
        frameIds: [frameId],
        files: ["script.js"]
    });
}, requestFilter);
