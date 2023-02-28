const loc = document.getElementById('TabMenu');
loc.appendChild(adminMenu);

const adminMenu = document.createElement('li');
adminMenu.innerHTML = `
  <a class="btn btn-secondary dropdown-toggle"  data-bs-toggle="dropdown" id="adminMenu">
     <i class="fa fa-cog"></i> Admin
  </a>
  <ul class="dropdown-menu" aria-labelledby="adminMenu">
      <li>
          <button class="dropdown-item" id="toggleHeader"> 
            Toggle Header 
          </button>
      </li>
  </ul>
`
document.getElementById('toggleHeader').addEventListener('click', () => {
    toggleHeader();
});

function toggleHeader() {
    var header = document.querySelector('#header .juvare');
    if(header.style.display == '') header.style.display = 'none';
    else header.style.display = '';
}




//export { toggleHeader };
