(function() {
    const menu = document.getElementById('adminMenu');
    if(!menu) {
        console.log('adminMenu not found');
        return;
    }
    menu.classList.add('dropdown');
    menu.innerHTML = `
        <button class="btn btn-sm btn-outline-warning dropdown-toggle" type="button" id="adminMenu" data-toggle="dropdown" aria-haspopup="true" area-expanded="false">
            <i class="material-icons">admin_panel_settings</i> Admin
        </button>
        <div class="dropdown-menu" aria-labelledby="adminMenu">
            <a class="dropdown-item" id="toggleHeader">Toggle Header</a>
            <a class="dropdown-item" id="xml">XML</a>
        </div>
        `
    document.getElementById('toggleHeader').addEventListener('click', () => {
        toggleHeader();
    });

    document.getElementById('xml').addEventListener('click', () => {
        xmlify();
    });

    function toggleHeader() {
        const header = window.top.document.querySelector('#header > .juvare');
        if(header.style.display == '') header.style.display = 'none';
        else header.style.display = '';
    }

    function xmlify() {
        const url = window.location.toString().replace(/=DATA/,'=XML').replace(/view-source:/,'');
        window.open(url, '_blank');
    }
})();


