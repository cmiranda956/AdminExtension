(function() {
    const menu = document.getElementById('adminMenu');
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
            <button class="dropdown-item" id="toggleHeader">Toggle Header </button>
        </div>
        `
})();

function toggleHeader() {
    var header = document.querySelector('#header .juvare');
    if(header.style.display == '') header.style.display = 'none';
    else header.style.display = '';
}

//document.getElementById('toggleHeader').addEventListener('click', () => {
//   toggleHeader();
//});
