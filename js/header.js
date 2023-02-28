const loc = document.getElementsByClassName('suit-status')[0];
const adminMenu = document.createElement('div');
adminMenu.classList.add('dropdown');
adminMenu.innerHTML = `
  <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" id="adminMenu">
     <i class="fa fa-cog" /> Admin
  </button>
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
