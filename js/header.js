const loc = document.getElementsByClassName('suit-nav-item--overflow suit-nav-item--overflow--highlighted')[0];
const adminMenu = document.createElement('div');
adminMenu.classList.add('dropdown');
adminMenu.innerHTML = `
    <a href="#" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" id="adminMenu">
        <i class="fa fa-cog"></i> Admin
    </a>
    <ul class="dropdown-menu" aria-labelledby="adminMenu">
        <li>
            <button type="button" class="dropdown-item" id="toggleHeader"> 
                Toggle Header 
            </button>
        </li>
    </ul>
    `
loc.appendChild(adminMenu);

document.getElementById('toggleHeader').addEventListener('click', () => {
    toggleHeader();
});

function toggleHeader() {
    var header = document.querySelector('#header .juvare');
    if(header.style.display == '') header.style.display = 'none';
    else header.style.display = '';
}
