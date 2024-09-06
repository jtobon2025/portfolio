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
        <p>${article.summary.substring(0, 100)}...</p>
        <span class="date">Published on: ${article.date}</span>
        <button class="read-more" onclick="openModal('${article.title}', '${article.summary}', '${article.link}')">Read More</button>
    `;
    return articleElement;
}



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
function createArticleElement(article, isArchived = false) {
    const articleElement = document.createElement('article');
    articleElement.classList.add('article');
    articleElement.innerHTML = `
        <h4>${article.title}</h4>
        <p>${article.summary}</p>
        <span class="date">Published on: ${article.date}</span>
        <a href="${article.link}" class="read-more">Read More</a>
    `;
    
    // Añadir botón para ocultar si es un artículo archivado
    if (isArchived) {
        const hideButton = document.createElement('button');
        hideButton.textContent = 'Hide';
        hideButton.onclick = () => articleElement.remove();
        articleElement.appendChild(hideButton);
    }

    return articleElement;
}

// Función para mostrar los artículos archivados
function showArchivedArticles(archivedArticles) {
    const archivedContainer = document.getElementById('archivedArticlesContainer');
    archivedContainer.innerHTML = ''; // Limpiar contenido previo

    archivedArticles.forEach(article => {
        const articleElement = createArticleElement(article, true);
        archivedContainer.appendChild(articleElement);
    });

    archivedContainer.classList.remove('hidden'); // Mostrar los artículos archivados
    document.getElementById('hideArchivedButton').classList.remove('hidden'); // Mostrar botón para ocultar todos
}

// Evento para ocultar todos los artículos archivados
document.getElementById('hideArchivedButton').addEventListener('click', function() {
    document.getElementById('archivedArticlesContainer').classList.add('hidden'); // Ocultar los artículos
    this.classList.add('hidden'); // Ocultar el botón de ocultar todos
});
let currentLanguage = 'es'; // Idioma por defecto

// Función para cambiar el idioma
function changeLanguage(language) {
    currentLanguage = language;
    loadArticles(); // Recarga los artículos en el idioma seleccionado
}

// Función para cargar artículos desde el JSON
function loadArticles() {
    fetch('articles.json')
        .then(response => response.json())
        .then(data => {
            const articlesContainer = document.getElementById('articles-container');
            articlesContainer.innerHTML = ''; // Limpiar contenido anterior

            data.current.forEach(article => {
                const articleElement = createArticleElement(article);
                articlesContainer.appendChild(articleElement);
            });
        })
        .catch(error => console.error('Error loading articles:', error));
}

