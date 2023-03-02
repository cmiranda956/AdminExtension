(function() {
    const menu = document.getElementById('adminMenu');
    const header = document.querySelector('#header > .juvare');
    if(!menu) {
        console.log('adminMenu not found');
        return;
    }
    menu.classList.add('dropdown');
    menu.innerHTML = `
        <button class="btn btn-secondary dropdown-toggle" type="button" id="adminMenu" data-toggle="dropdown" aria-haspopup="true" area-expanded="false">
            <i class="material-icons">admin_panel_settings</i> Admin
        </button>
        <div class="dropdown-menu" aria-labelledby="adminMenu">
            <a class="dropdown-item" id="toggleHeader">Toggle Header </a>
        </div>
        `
    document.getElementById('toggleHeader').addEventListener('click', () => {
        toggleHeader();
    });

    function toggleHeader() {
        if(!header) {
            console.log('Header querySlector is null');
            return
        }
        if(header.style.display == '') header.style.display = 'none';
        else header.style.display = '';
    }
})();


