const loc = document.getElementsByClassName('suit-status')[0];
const adminMenu = document.createElement('div');
adminMenu.innerHTML = `
        <button class="dropdown-item" id="toggleHeader"> 
            Toggle Header 
        </button>
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
