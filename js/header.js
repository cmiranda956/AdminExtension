const loc = document.getElementsByClassName('suit-status suit-nav--mobile-hidden')[0];
const adminMenu = document.createElement('div');
adminMenu.classList.add('dropdown');
adminMenu.innerHTML = `  
  <a href="#" class="btn bg-gradient-dark dropdown-toggle " data-bs-toggle="dropdown" id="adminMenu">
      <img src="img/32x32.png" /> Admin
  </a>
  <ul class="dropdown-menu" aria-labelledby="adminMenu">
      <li>
          <a class="dropdown-item" href="#">
            <img src="https://demos.creative-tim.com/test/material-dashboard-pro/assets/img/icons/flags/DE.png" /> Deutsch
          </a>
      </li>
      <li>
          <a class="dropdown-item" href="#">
            <img src="https://demos.creative-tim.com/test/material-dashboard-pro/assets/img/icons/flags/GB.png" /> English(UK)
          </a>
      </li>
      <li>
          <a class="dropdown-item" href="#">
            <img src="https://demos.creative-tim.com/test/material-dashboard-pro/assets/img/icons/flags/BR.png" /> Brasil
          </a>
      </li>
  </ul>
`
loc.appendChild(adminMenu);

//adminMenu.addEventListener('click', () => {
//    toggleHeader();
//});
function toggleHeader() {
    var header = document.querySelector('#header .juvare');
    if(header.style.display == '') header.style.display = 'none';
    else header.style.display = '';
}




//export { toggleHeader };
