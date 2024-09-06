// Función para mostrar la sección seleccionada y ocultar las demás
function showSection(sectionId) {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => section.style.display = 'none');
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) selectedSection.style.display = 'block';
}

// Mostrar la sección Home por defecto al cargar la página
window.onload = function() {
    showSection('home');
    loadArticles(); // Cargar los artículos desde JSON
};

// Función para cargar artículos dinámicamente desde JSON
function loadArticles() {
    fetch('articles.json')
        .then(response => response.json())
        .then(data => {
            const articlesContainer = document.getElementById('articles-container');
            if (!articlesContainer) {
                console.error('No se encontró el contenedor de artículos.');
                return;
            }

            // Mostrar artículos actuales
            data.current.forEach(article => {
                const articleElement = createArticleElement(article);
                articlesContainer.appendChild(articleElement);
            });

            // Botón para mostrar artículos archivados
            const showArchivedButton = document.createElement('button');
            showArchivedButton.textContent = 'Show Archived Articles';
            showArchivedButton.onclick = () => showArchivedArticles(data.archived);
            articlesContainer.appendChild(showArchivedButton);
        })
        .catch(error => console.error('Error loading articles:', error));
}

// Función para crear un elemento de artículo
function createArticleElement(article) {
    const articleElement = document.createElement('article');
    articleElement.classList.add('article');
    articleElement.innerHTML = `
        <h4>${article.title}</h4>
        <p>${article.summary}</p>
        <span class="date">Published on: ${article.date}</span>
        <a href="${article.link}" class="read-more">Read More</a>
    `;
    return articleElement;
}

// Función para mostrar los artículos archivados
function showArchivedArticles(archivedArticles) {
    const articlesContainer = document.getElementById('articles-container');
    const archivedContainer = document.createElement('div');
    archivedContainer.classList.add('archived-container');

    archivedArticles.forEach(article => {
        const articleElement = createArticleElement(article);
        archivedContainer.appendChild(articleElement);
    });

    articlesContainer.appendChild(archivedContainer);
}

// Función del Carrusel
let slideIndex = 0;

function moveSlide(n) {
    const slides = document.querySelectorAll('.carousel-container img');
    slideIndex += n;

    if (slideIndex < 0) {
        slideIndex = slides.length - 1;
    } else if (slideIndex >= slides.length) {
        slideIndex = 0;
    }

    const width = slides[0].clientWidth;
    document.querySelector('.carousel-container').style.transform = `translateX(-${slideIndex * width}px)`;
}
document.getElementById('toggleArchivedButton').addEventListener('click', function () {
    const archivedContainer = document.getElementById('archivedArticlesContainer');
    
    // Alternar la clase 'hidden' para mostrar u ocultar
    if (archivedContainer.classList.contains('hidden')) {
        archivedContainer.classList.remove('hidden');
        this.textContent = 'Hide Archived Articles';
    } else {
        archivedContainer.classList.add('hidden');
        this.textContent = 'Show Archived Articles';
    }
});
