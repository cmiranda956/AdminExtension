import { passwordReset, getUserList, executePasswordReset, goToUserDetails } from './useradmin.js';

const requestFilter = { urls: ['https://webeoc.bcfs.net/eoc7/boards/*'] };
const homepageFilter = { urls: ['https://webeoc.bcfs.net/eoc7/home*'] };
const adminFilter = { urls: ['https://webeoc.bcfs.net/eoc7/admin/users/list.aspx'] };
const userDetailFilter = { urls: ['https://webeoc.bcfs.net/eoc7/admin/users/detail.aspx?userid=*'] };

let arrUsers = [];
let isDownloaded = false;

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        title: 'Reset Password',
        contexts: ['selection'],
        id: 'passwordReset'
    });
});

chrome.webRequest.onCompleted.addListener((details) => {
    let tabId = details.tabId;

    chrome.scripting.executeScript({
        target: {
            tabId: tabId,
            allFrames: true
        },
        files: ["js/createAdminMenu.js"]
    });
}, requestFilter);



chrome.webRequest.onCompleted.addListener(details => {
    if(isDownloaded) {
        console.log('User list already downloaded');
        return
    }
    getUserList().then(response => {
        arrUsers = response;
        isDownloaded = true;
        console.log('User list downloaded');
    }).catch(err => {
        console.error(err);
    });
}, homepageFilter);

// USAGE: args[command, url?, tabid?]
chrome.runtime.onMessage.addListener((message, sender, response) => {
    let args = message.message
    switch(args[0]) {
        case 'searchUser':
            const searchUserListener = () => {
                chrome.scripting.executeScript({
                    target: {tabId: args[1]},
                    func: goToUserDetails,
                    args: [args[1]]
                });
                chrome.webRequest.onCompleted.removeListener(searchUserListener);
            };
            chrome.webRequest.onCompleted.addListener(searchUserListener, adminFilter);
            break;
        case 'passwordReset':
            const userDetailListener = () => {
                chrome.scripting.executeScript({
                    target: {tabId: args[2]},
                    func: executePasswordReset
                });
                chrome.webRequest.onCompleted.removeListener(userDetailListener);
            }
            chrome.webRequest.onCompleted.addListener(userDetailListener, userDetailFilter);
            break;
        case 'toggleMobile':
            chrome.windows.getCurrent((window) => {
                let mobileHeight = 844;
                let mobileWidth = 390;
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
                console.log('Mobile view toggled');
            });
            break;
    }
});

chrome.contextMenus.onClicked.addListener(info => {
    switch(info.menuItemId) {
        case 'passwordReset':
            passwordReset(info.selectionText);
            break;
    }
});

chrome.runtime.onStartup.addListener(() => {
    isDownloaded = false;
});
