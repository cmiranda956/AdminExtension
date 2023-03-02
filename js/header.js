(function() {
    document.getElementById('toggleHeader').addEventListener('click', () => {
        toggleHeader();
    });

    function toggleHeader() {
        console.log('at toggleHeader function');
        const header = window.top.document.querySelector('#header > .juvare');
        if(header.style.display == '') header.style.display = 'none';
        else header.style.display = '';
    }
})();
