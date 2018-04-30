function dealer(data) {
    data.weekHours = parseHours(data.weekHours);
    data.certifications = parseCertifications(data.certifications);
    return dealerHtml(data);
}
function dealerHtml (data) {
    return (
        `<article class="dealer">
            <h3 class="dealer--title">${data.name}</h3>
            <a class="dealer--phone mobile-only"
               href='tel:${data.phone1}'>
                Tap to Call
                <span class="number">${data.phone1}</span>
            </a>
            <h4 class="dealer--phone desktop-only">${data.phone1}</h4>
            <p class="dealer--email">Can't talk now? Click below to send an email.</p>
            <button class="dealer--contact">Contact this Pro</button>
            <div class="dealer--hours">
                <h4>Business Hours</h4>
            </div>
            <div class="dealer--certifications">${data.certifications}</div>
        </article>`
    );
}
function parseHours(hours) {
    return hours;
}
function parseCertifications(certifications) {
    return certifications.map(v => {
        return (
            `<div class="${getCertificationClass(v)}">
                ${v}
            </div>`
        );
    }).join('');
}
function getCertificationClass (certification) {
    let certificationClass = '';
    switch (certification) {
        case 'Installation Pro':
            certification = 'installation';
            break;
        case 'Residential Pro':
            certification = 'residential';
            break;
        case 'Service Pro':
            certification = 'service';
            break;
        case 'Commercial Pro':
            certification = 'commercial';
            break;
    }
    return certification;
}
export default dealer;