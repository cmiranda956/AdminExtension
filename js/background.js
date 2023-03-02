let menuExists = false;
const requestFilter = {
    urls: ['https://192.168.100.100/eoc9/boards/board.aspx*'],
}

chrome.webRequest.onCompleted.addListener((details) => {
    if(menuExists) return;

    let frameId = details.frameId;
    let tabId = details.tabId;
    chrome.scripting.executeScript({
        target: {
            tabId: tabId, 
            allFrames: true
        },
        files: ["js/script.js"]
    }); 
    menuExists = true; 
}, requestFilter);

chrome.runtime.onMessage.addListener((message, sender, response) => {
    console.log(message.message);
    if(message.message == 'toggleMobile') {
        chrome.windows.getCurrent((window) => {
            let updateInfo = {
                width: window.screen.availWidth,
                height: window.screen.availHeight,
                state: 'normal'
            };
            if(window.width !== 300) {
                updateInfo.width = 300;
                updateInfo.height = 430;
            }
            chrome.windows.update(window.id, updateInfo);
        });
    }
});
