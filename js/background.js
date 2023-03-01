const requestFilter = {
    urls: ['https://*boards/board.aspx?tableid=*'],
}
chrome.webRequest.onCompleted.addListener((details) => {
    let frameId = details.frameId
}, requestFilter);
