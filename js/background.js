import { beginPasswordReset, getUserList, executePasswordReset, goToUserDetails } from './useradmin.js';

const boardFilter = { urls: ['https://webeoc.bcfs.net/eoc7/boards/*'] };
const homepageFilter = { urls: ['https://webeoc.bcfs.net/eoc7/home*'] };
const adminUserListFilter = { urls: ['https://webeoc.bcfs.net/eoc7/admin/users/list.aspx'] };
const userDetailFilter = { urls: ['https://webeoc.bcfs.net/eoc7/admin/users/detail.aspx?userid=*'] };

let arrUsers = [];
let isDownloaded = false;

// Reset flag after chrome shutdown
chrome.runtime.onStartup.addListener(() => {
    isDownloaded = false;
});

// Create context menu item (right click menu) on installation
// Option only available on highlighted text
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        title: 'Reset Password',
        contexts: ['selection'],
        id: 'passwordReset'
    });
});

chrome.contextMenus.onClicked.addListener(info => {
    switch(info.menuItemId) {
        case 'passwordReset':
            beginPasswordReset(info.selectionText);
            break;
    }
});

// Listens on all frames, attempting to build admin menu dropdown
chrome.webRequest.onCompleted.addListener((details) => {
    let tabId = details.tabId;

    chrome.scripting.executeScript({
        target: {
            tabId: tabId,
            allFrames: true
        },
        files: ["js/createAdminMenu.js"]
    });
}, boardFilter);

// Listens for home tab within webeoc to be loaded as it is only loaded once at login
// Triggers boardscript call to download list of all users if not already downloaded
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

// ************************************************************************
// USAGE:
//      chrome.runtime.sendMessage({message: [command, tabId?]});
//
// COMMANDS:
//      toggleMobile      [command]
//      passwordReset     [command, tabId]
//      searchUser        [command, tabId]
// NOTES:
//      - Message must be sent from content-script/function. Eg. Executed from
//      the context of the webpage and not the extension.
//      - Currently using as primary method of injecting scripts on pages
//      whose elements load after ajax calls. Ex. User details, STAR board.
//      - Each listener will auto delete itself after operation is completed.
//**************************************************************************
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
            chrome.webRequest.onCompleted.addListener(searchUserListener, adminUserListFilter);
            break;
        case 'passwordReset':
            const userDetailListener = () => {
                chrome.scripting.executeScript({
                    target: {tabId: args[1]},
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
