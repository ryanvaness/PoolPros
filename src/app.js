const styles = require('./app.scss');
import dealer from './modules/dealer';

document.addEventListener('click', function delegateClick(event) {
    const clickedElement = event.target;
    if (clickedElement.matches('.mobile-menu') || clickedElement.matches('.mobile-menu > div')) {
        openMenu();
    } else if (clickedElement.matches('.close-menu')) {
        closeMenu();
    } else if (clickedElement.matches('.filter-dropdown-toggle')) {
        toggleCategories();
    } else if (clickedElement.matches('.dealer--contact')) {
        openModal(event.target);
    }

    if (clickedElement.matches('.overlay')) {
        closeCurrent();
    }
});

document.addEventListener('change', function delegateChange(event) {
    const clickedElement = event.target;
    if (clickedElement.matches('input[name="category[]"]')) {
        filterResults.call(event.target);
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

const openModal = (target) => {
    let dealer = target.closest('.dealer').querySelector('.dealer--title').textContent;
    let modal = document.querySelector('.modal');
    modal.querySelectorAll('.pro-name').forEach(function(elem) {
        elem.textContent = dealer;
    });
    toggleOverlay();
    modal.classList.add('show');
}

const closeModal = () => {
    toggleOverlay();
    document.querySelector('.modal').classList.remove('show');
}

const toggleOverlay = () => {
    document.body.classList[document.body.classList.contains('open') ? 'remove' : 'add']('open');
}

const closeCurrent = () => {
    if (document.querySelector('nav.primary').classList.contains('show')) {
        closeMenu();
    } else if (document.querySelector('.modal').classList.contains('show')) {
        closeModal();
    }
}

const toggleCategories = () => {
    const categories = document.querySelector('.dealers--categories');
    const hasOpen = categories.classList.contains('open');

    categories.classList[hasOpen ? 'remove' : 'add']('open');
}

const filterResults = function () {
    console.log(this.value);
}

let dealers = {};
const response = fetch('/assets/data/dealers.json')
    .then(response => response.json())
    .then(json => {
        dealers = json.dealers;
        buildDealers(json);
    });

const buildDealers = data => {
    document.querySelector('.count').textContent = data.dealers.length;
    document.querySelector('.zip').textContent = data.zipcode;
    document.querySelector('.dealers--list').innerHTML = data.dealers.map(function eachDealer({data}) {
        return dealer(data);
    }).join('');
}