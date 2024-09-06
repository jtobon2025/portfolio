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

// Función para crear un elemento de artículo basado en el idioma
function createArticleElement(article) {
    const articleElement = document.createElement('article');
    articleElement.classList.add('article');
    articleElement.innerHTML = `
        <h4>${article.title[currentLanguage]}</h4>
        <p>${article.summary[currentLanguage]}</p>
        <a href="${article.link}" class="read-more">Read More</a>
    `;
    return articleElement;
}

// Inicializar al cargar la página
window.onload = function() {
    loadArticles(); // Cargar artículos en el idioma predeterminado
};

let currentLanguage = 'es'; // Idioma por defecto

// Función para cambiar el idioma
function changeLanguage(language) {
    currentLanguage = language;
    loadArticles(); // Recargar artículos con el idioma seleccionado
}

// Función para cargar los artículos y secciones con el idioma seleccionado
function loadArticles() {
    fetch('articles.json')
        .then(response => response.json())
        .then(data => {
            // Asignar los textos según el idioma seleccionado
            document.getElementById('project-title').innerText = data.projectTitle[currentLanguage];
            document.getElementById('summary-title').innerText = data.summaryTitle[currentLanguage];
            document.getElementById('summary-content').innerText = data.summaryContent[currentLanguage];
            document.getElementById('comparison-content').innerText = data.comparisonContent[currentLanguage];
            document.getElementById('objective-content').innerText = data.objectiveContent[currentLanguage];
            
            // Asignar los textos de los puntos de fortalezas
            document.getElementById('feature1').innerText = data.features[0][currentLanguage];
            document.getElementById('feature2').innerText = data.features[1][currentLanguage];
            document.getElementById('feature3').innerText = data.features[2][currentLanguage];
            document.getElementById('feature4').innerText = data.features[3][currentLanguage];
            document.getElementById('feature5').innerText = data.features[4][currentLanguage];
            document.getElementById('feature6').innerText = data.features[5][currentLanguage];
            document.getElementById('feature7').innerText = data.features[6][currentLanguage];
        })
        .catch(error => console.error('Error loading articles:', error));
}

// Inicializar al cargar la página
window.onload = function() {
    loadArticles(); // Cargar contenido en el idioma predeterminado
};
