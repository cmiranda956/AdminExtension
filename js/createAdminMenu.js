//***************************************************
// USAGE:
//      Attempts to build dropdown admin menu in every
//      board that is opened.
//
// NOTES:
//       - Function exits if no element with id "adminMenu"
//      exists within the board frame.
//       - No current mobile view implementation.
// TODO:
//       - Change from id to class so multiple dropdowns
//      can be placed.
//***************************************************
(function() {
    const menu = document.getElementById('adminMenu');
    if(!menu) return;
    menu.classList.add('dropdown');
    menu.innerHTML = `
        <button class="btn btn-sm btn-outline-warning dropdown-toggle" type="button" id="adminMenu" data-toggle="dropdown" aria-haspopup="true" area-expanded="false">
            <i class="fa fa-cog">admin_panel_settings</i> Admin
        </button>
        <div class="dropdown-menu" aria-labelledby="adminMenu">
            <button class="dropdown-item" id="toggleHeader">Toggle Header</button>
            <button class="dropdown-item" id="toggleMobile">Toggle Mobile</button>
            <button class="dropdown-item" id="xml">XML</button>
        </div>
        `
    document.getElementById('toggleHeader').addEventListener('click', () => {
        const header = window.top.document.querySelector('#header > .juvare');
        if(header.style.display == '') header.style.display = 'none';
        else header.style.display = '';
    });
    document.getElementById('xml').addEventListener('click', () => {
        const url = window.location.toString().replace(/=DATA/,'=XML').replace(/view-source:/,'');
        window.open(url, '_blank');
    });
    document.getElementById('toggleMobile').addEventListener('click', () => {
        chrome.runtime.sendMessage({ message: ['toggleMobile'] });
    });
})();
