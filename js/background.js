const requestFilter = {
    urls: ['https://*boards/board.aspx?tableid=*'],
}

chrome.webRequest.onCompleted.addListener((details) => {
    let frameId = details.frameId;
    let tabId = details.tabId;
    chrome.scripting.executeScript({
        target: {tabId: tabId},
        frameIds: [frameId],
        files: ["script.js"]
    });
}, requestFilter);
