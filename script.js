const sidebar = document.getElementById('sidebar');
const showZone = document.getElementById('showZone');
const tags = document.getElementById('tags');

const about = document.getElementById('home');
const cardItems = [];
let activeTag = null;
let fadeTimer;

function renderShowZone(content) {
    clearTimeout(fadeTimer);
    showZone.classList.add('is-fading');

    fadeTimer = setTimeout(() => {
        showZone.innerHTML = content;
        showZone.classList.remove('is-fading');
    }, 120);
}

about.addEventListener('click', () => {
    renderShowZone(`
        <p>👈 click on a work in the sidebar to read more about it. You can also filter projects by tags 🏷️.</p>
        <p>a requirement of the IDM Undergrad curriculum, Intro to Web Development introduces students to the fundamentals of creative web design. We cover the "front-end" stack consisting of HTML, CSS, and JavaScript, and also touch on some back-end and "server-side" programming to create multi-person networked websites.</p> 
        <p>In addition to learning how to program, students also explore the infrastructure of the internet (via a guest lecture by <a href="https://www.laiyiohlsen.com">Lai Yi Ohlsen</a>), and gain a historical and social perspective of the web through lectures, readings, and analyses of pioneering web works.</p>
        <p>click <a href="Intro to Web IDM Accessible Syllabus Template.pdf">here</a> to view the syllabus.</p>
        <br>
        <br>
        <br>
    `);
});

works.forEach(work => {
    const cardItem = document.createElement('div');
    cardItem.className = 'card-item';
    cardItem.dataset.tags = work.keywords.join('|');
    
    cardItem.innerHTML = `
        <div class="title-wrapper">
            <div class="work-info">
                <p class="name">${work.name}</p>
                <strong><p class="work-title">${work.title}</p></strong>
                <p class="short-description">${work.description}</p>
            </div>
            <div class="poster-img">
                <img src="${work.image}" alt="${work.altText || work.title}">
            </div>
        </div>
    `;
    
    cardItem.addEventListener('click', () => {
        renderShowZone(`
            <h2>${work.name}</h2>
            <h3>${work.title}</h3>
            <img src="${work.image}" alt="${work.altText || work.title}">
            <p>${work['long-description']}</p>
            <p><strong>Keywords:</strong> ${work.keywords.join(', ')}</p>
            <a href="${work.link}" target="_blank">${work.link}</a>
            <br>
            <a href="${work['github-url']}" target="_blank">View the Code Here</a>
            <br>
            <br>
            <br>
            <br>
        `);
    });
    
    sidebar.appendChild(cardItem);
    cardItems.push(cardItem);
});

sidebar.appendChild(document.createElement('br'));
sidebar.appendChild(document.createElement('br'));
sidebar.appendChild(document.createElement('br'));
sidebar.appendChild(document.createElement('br'));
sidebar.appendChild(document.createElement('br'));

const uniqueTags = new Set();
works.forEach(work => {
    work.keywords.forEach(keyword => uniqueTags.add(keyword));
});

function updateVisibleWorks() {
    cardItems.forEach(cardItem => {
        const matchesActiveTag = !activeTag || cardItem.dataset.tags.split('|').includes(activeTag);
        cardItem.classList.toggle('is-hidden', !matchesActiveTag);
    });
}

uniqueTags.forEach(tag => {
    const tagElement = document.createElement('button');
    tagElement.className = 'tag';
    tagElement.textContent = tag;
    tagElement.type = 'button';
    tags.appendChild(tagElement);

    tagElement.addEventListener('click', () => {
        activeTag = activeTag === tag ? null : tag;

        document.querySelectorAll('.tag').forEach(button => {
            button.classList.toggle('is-selected', button.textContent === activeTag);
            button.setAttribute('aria-pressed', String(button.textContent === activeTag));
        });

        updateVisibleWorks();
    });
});
