const loc = document.getElementsByClassName('suit-status')[0];
const adminMenu = document.createElement('div');
adminMenu.classList.add('dropdown');
adminMenu.innerHTML = `
  <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" id="adminMenu">
     <i class="fa fa-cog"></i> Admin
  </button>
  <ul class="dropdown-menu" aria-labelledby="adminMenu">
      <li>
          <button class="dropdown-item" id="toggleHeader"> 
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




//export { toggleHeader };
