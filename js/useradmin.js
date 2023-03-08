const baseURL = 'https://webeoc.bcfs.net/eoc7/api/rest.svc';
const adminUserListUrl = 'https://webeoc.bcfs.net/eoc7/admin/users/list.aspx'

function searchUser(username, tabId) {
    document.querySelector('input[name="ctl00$ctl00$formBody$parentBody$sgvf$ctl05"]').value = username;
    chrome.runtime.sendMessage({message: ['searchUser', tabId]});
    document.querySelector('label button.btn').click();
}
export function goToUserDetails(tabId) {
    if(document.getElementById('ctl00_ctl00_formBody_parentBody_sgvf')
        .querySelector('div div.pull-left').innerText.includes('No matches')) {
        console.warn('No matches');
        return
    }
    let webLink = document.querySelector('tbody tr a').href;
    document.querySelector('tbody tr a').click();
    chrome.runtime.sendMessage({message: ['passwordReset', webLink, tabId]});
}

export function executePasswordReset() {
    console.log('We at the execution phase');
    document.getElementById('ctl00_ctl00_formBody_parentBody_txtPassword').value = 'Bcfs123';
    document.getElementById('ctl00_ctl00_formBody_parentBody_txtConfirmPassword').value = 'Bcfs123';
    document.getElementById('ctl00_ctl00_formBody_parentBody_chkChangePassword').checked = true;
}

export function passwordReset(username) {
    let props = {
        active: true,
        url: adminUserListUrl
    };
    chrome.tabs.create(props, tab => {
        chrome.scripting.executeScript({
            target: {tabId: tab.id},
            func: searchUser,
            args: [username, tab.id]
        });
    });
}

export function getUserList() {
    return fetch(`${baseURL}/users`).then(response => { return response.json() });
}
