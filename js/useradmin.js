const baseURL = 'https://webeoc.bcfs.net/eoc7/api/rest.svc';
const adminUserListUrl = 'https://webeoc.bcfs.net/eoc7/admin/users/list.aspx'
//**********************************************************************
// USAGE:
//      Fills search box within the users menu of the admin center with
//      the provided username and applies the search.
// ARGUMENTS:
//      username        Username to search for.
//      tabId           Tab ID containing the admin center's user list.
//**********************************************************************
function searchUser(username, tabId) {
    document.querySelector('input[name="ctl00$ctl00$formBody$parentBody$sgvf$ctl05"]').value = username;
    chrome.runtime.sendMessage({message: ['searchUser', tabId]});
    document.querySelector('label button.btn').click();
}
//**********************************************************************
// USAGE:
//      Opens the user details view of the username in the
//      first row within a given tab id.
// ARGUMENTS:
//      tabId           Tab ID containing the admin center's user list.
//**********************************************************************
export function goToUserDetails(tabId) {
    if(document.getElementById('ctl00_ctl00_formBody_parentBody_sgvf')
        .querySelector('div div.pull-left').innerText.includes('No matches')) {
        console.warn('No matches');
        return
    }
    document.querySelector('tbody tr a').click();
    chrome.runtime.sendMessage({message: ['passwordReset', tabId]});
}
//**********************************************************************
// USAGE:
//      Fills user details form with proper password reset details.
//**********************************************************************
export function executePasswordReset() {
    document.getElementById('ctl00_ctl00_formBody_parentBody_txtPassword').value = 'Bcfs123';
    document.getElementById('ctl00_ctl00_formBody_parentBody_txtConfirmPassword').value = 'Bcfs123';
    document.getElementById('ctl00_ctl00_formBody_parentBody_chkChangePassword').checked = true;
}
//**********************************************************************
// USAGE:
//      Executed by context menu click event on "Password Reset" option.
//      Opens the user list in the admin center in a new tab.
// ARGUMENTS:
//      username        Username to reset password for.
// NOTES:
//      Currently assumes username is valid and existing within WebEOC.
// TODO:
//      - Compare selected username with user array "arrUsers[]" downloaded
//      via Boardscript
//      - Look into fuzzy search function to offer possible options in the
//      case of an incorrect username.
//**********************************************************************
export function beginPasswordReset(username) {
    let props = {
        active: false,
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
//**********************************************************************
// USAGE:
//      Queries the Rest API for the list of all users.
//**********************************************************************
export function getUserList() {
    return fetch(`${baseURL}/users`).then(response => { return response.json() });
}
