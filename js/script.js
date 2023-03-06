(function() {
    const menu = document.getElementById('adminMenu');
    if(!menu) {
        console.log('adminMenu not found');
        return;
    }
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
        chrome.runtime.sendMessage({ message: 'toggleMobile' });
    });
})();


