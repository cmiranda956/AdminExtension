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
function searchUser(username, tabId, command) {
    document.querySelector('input[name="ctl00$ctl00$formBody$parentBody$sgvf$ctl05"]').value = username;
    chrome.runtime.sendMessage({message: ['searchUser', tabId, command]});
    document.querySelector('label button.btn').click();
}
//**********************************************************************
// USAGE:
//      Opens the user details view of the username in the
//      first row within a given tab id.
// ARGUMENTS:
//      tabId           Tab ID containing the admin center's user list.
//**********************************************************************
export function goToUserDetails(tabId, command) {
    if(document.getElementById('ctl00_ctl00_formBody_parentBody_sgvf')
        .querySelector('div div.pull-left').innerText.includes('No matches')) {
        console.warn('No matches');
        return
    }
    document.querySelector('tbody tr a').click();
    chrome.runtime.sendMessage({message: [command, tabId]});
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
export function executeDemobilization() {
    let d = new Date(); 
    let date = (((d.getMonth() > 8) ? (d.getMonth() + 1)  : ('0'  + (d.getMonth()  + 1)))  + '/'  + ((d.getDate()  > 9)  ? d.getDate() : ('0'  +d.getDate()))  + '/'  +d.getFullYear()); 
    let array = []; 
    $('#ctl00_ctl00_formBody_parentBody_suitTabs_ctl01_ucPositions_divAssignedItems  > div  > table  > tbody  > tr  > td.sorting_1').each(function(){
        let $this = $(this).text();
        if ($this){
            array.push($this + '\n');
        }});
    console.log({array});
    $('#ctl00_ctl00_formBody_parentBody_suitTabs_ctl01_ucPositions_divItems  > div.suit - table - footer  > div  > a').click();
    $('#ctl00_ctl00_formBody_parentBody_txtComments').val('DEMOB  - '+ date + '\n' + array);
    $('#ctl00_ctl00_formBody_parentBody_suitTabs_ctl01_ucPositions_divAssignedItems  > div  > table  > thead  > tr  > th: nth-child(1)  > input[type="checkbox"]').click();
    $('#ctl00_ctl00_formBody_parentBody_suitTabs_ctl01_ucPositions_divItems  > div.suit - table - footer  > div  > a').removeClass('disabled').click();
    $("#ctl00_ctl00_formBody_parentBody_suitTabs_ctl01_ucPositions_mw_ctl07 > div.suit-table.suit-table--hover.suit-table--striped > div:nth-child(2) > table > tbody > tr:nth-child(1) > td:nth-child(1) > input[type=checkbox]").click();
    $('#ctl00_ctl00_formBody_parentBody_suitTabs_ctl01_ucPositions_mw_ctl11_lbAssign').click();
    $("#ctl00_ctl00_formBody_parentBody_suitTabs > ul > li:nth-child(2) > a").click();
    let ma = $("#ctl00_ctl00_formBody_parentBody_suitTabs_ctl01_ucMobileDevices_sgvfAssigned > div.suit-table_header > div.suit-table_info.pull-left").text();
    ma = $.trim(ma);
    if(ma !== '0 entries') {
        $('#ctl00_ctl00_formBody_parentBody_suitTabs_ctl01_ucMobileDevices_sgvfAssigned_ctl08_sgvAssigned_ctl01_chkAll').click();
        let rmMa=$('#ctl00_ctl00_formBody_parentBody_suitTabs_ctl01_ucMobileDevices_lbRemoveAssigned').attr('href');
        window.location = rmMa;
    }
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
            args: [username, tab.id, 'passwordReset']
        });
    });
}
export function beginDemobilize(username) {
    let props = {
        active: false,
        url: adminUserListUrl
    };
    chrome.tabs.create(props, tab => {
        chrome.scripting.executeScript({
            target: {tabId: tab.id},
            func: searchUser,
            args: [username, tab.id, 'demobilize']
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
