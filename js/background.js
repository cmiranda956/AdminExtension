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
            let mobileHeight = 390;
            let mobileWidth = 844;
            let updateInfo = {
                width: 1920,
                height: 1080,
                state: 'normal'
            };
            if(window.width !== mobileWidth) {
                updateInfo.width = mobileWidth;
                updateInfo.height = mobileHeight;
            }
            chrome.windows.update(window.id, updateInfo);
        });
    }
});
