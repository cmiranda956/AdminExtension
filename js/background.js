const requestFilter = {
    urls: ['https://192.168.100.100/eoc9/boards/board.aspx*'],
}

chrome.webRequest.onCompleted.addListener((details) => {
    console.log(details);
    let frameId = details.frameId;
    let tabId = details.tabId;
    console.log({frameId, tabId});
    chrome.scripting.executeScript({
        target: {
            tabId: tabId, 
            allFrames: true
        },
        files: ["js/script.js"]
    });
}, requestFilter);
