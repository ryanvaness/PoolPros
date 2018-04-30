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
    } else if (clickedElement.matches('.close-modal')) {
        closeModal();
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

document.addEventListener('input', function delegateInput(event) {
    const clickedElement = event.target;
    if (clickedElement.matches('input:required')) {
        checkFieldValidity(clickedElement);
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
    let selectedCategories = document.querySelectorAll('[name="category[]"]:checked');
    let categories = Array.from(selectedCategories).map(function(elem){
        return elem.value;
    });

    let filteredDealers = dealers.filter(function({data}) {
        let thing = data.certifications.filter(function(v) {
            return categories.includes(v);
        });
        return thing.length === categories.length;
    });
    buildDealers(filteredDealers);
}

let dealers = {};
const response = fetch('/assets/data/dealers.json')
    .then(response => response.json())
    .then(json => {
        dealers = json.dealers;
        document.querySelector('.count').textContent = json.dealers.length;
        document.querySelector('.zip').textContent = json.zipcode;
        buildDealers(dealers);
    });

const buildDealers = dealers => {
    document.querySelector('.dealers--list').innerHTML = dealers.map(function eachDealer({data}) {
        return dealer(data);
    }).join('');
}

const checkFieldValidity = function(currentField) {
    currentField.closest('.form-group')
        .classList[currentField.value && currentField.checkValidity() ? 'add' : 'remove']('valid');
}