const requestFilter = {
    urls: ['https://192.168.100.100/eoc9/boards/board.aspx?tableid=*'],
}

chrome.webRequest.onCompleted.addListener((details) => {
    console.log('Board finished loading');
    let frameId = details.frameId;
    let tabId = details.tabId;
    chrome.scripting.executeScript({
        target: {
            tabId: tabId,
            frameIds: [frameId]
        },
        files: ["js/script.js"]
    });
}, requestFilter);
