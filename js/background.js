let menuExists = false;
const requestFilter = {
    urls: ['https://192.168.100.100/eoc9/boards/board.aspx*'],
}

chrome.webRequest.onCompleted.addListener((details) => {
    if(!menuExists) return;

    let frameId = details.frameId;
    let tabId = details.tabId;
    chrome.scripting.executeScript({
        target: {
            tabId: tabId, 
            allFrames: true
        },
        files: ["js/buildmenu.js"]
    }); 
    menuExists = true; 
}, requestFilter);
