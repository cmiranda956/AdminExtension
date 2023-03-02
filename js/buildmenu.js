(function() {
    const menu = document.getElementById('adminMenu');
    if(!menu) {
        console.log('adminMenu not found');
        return;
    }
    menu.classList.add('dropdown');
    menu.innerHTML = `
        <button class="btn btn-outline-warning dropdown-toggle" type="button" id="adminMenu" data-toggle="dropdown" aria-haspopup="true" area-expanded="false">
            <i class="material-icons">admin_panel_settings</i> Admin
        </button>
        <div class="dropdown-menu" aria-labelledby="adminMenu">
            <a class="dropdown-item" id="toggleHeader">Toggle Header </a>
        </div>
        `
    document.getElementById('toggleHeader').addEventListener('click', () => {
        toggleHeader();
    });
})();


