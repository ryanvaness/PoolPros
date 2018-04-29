const styles = require('./app.scss');

document.addEventListener('click', function delegateClick(event) {
    const clickedElement = event.target;
    if (clickedElement.matches('.mobile-menu') || clickedElement.matches('.mobile-menu > div')) {
        openMenu();
    } else if (clickedElement.matches('.close-menu')) {
        closeMenu();
    }

    if (clickedElement.matches('.overlay')) {
        closeCurrent();
    }
});

const openMenu = () => {
    toggleOverlay();
    document.querySelector('nav.primary').classList.add('show');
}
const closeMenu = () => {
    toggleOverlay();
    document.querySelector('nav.primary').classList.remove('show');
}

const toggleOverlay = () => {
    document.body.classList[document.body.classList.contains('open') ? 'remove' : 'add']('open');
}

const closeCurrent = () => {
    if (document.querySelector('nav.primary').classList.contains('show')) {
        closeMenu();
    } else if (document.querySelector('.modal').classList.contains('show')) {

    }
}