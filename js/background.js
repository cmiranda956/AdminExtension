import { toggleHeader } from './header.js';

async function getCurrentTab() {
    let options = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(options);
    return tab
}

let tab = getCurrentTab();

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        'id': 'toggleHeader',
        'title': 'Toggle Header',
        'contexts': ['all']
    });
});

chrome.contextMenus.onClicked.addListener(() => {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['js/header.js']
    });
});
