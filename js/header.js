const loc = document.getElementById('TabMenu');
const adminMenu = document.createElement('li');

adminMenu.innerHTML = `
    <li>
        <button class="dropdown-item" id="toggleHeader"> 
            Toggle Header 
        </button>
    </li>
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
