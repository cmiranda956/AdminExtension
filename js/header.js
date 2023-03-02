function toggleHeader() {
    const header = window.top.document.querySelector('#header > .juvare');
    if(header.style.display == '') header.style.display = 'none';
    else header.style.display = '';
}
