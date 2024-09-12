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
        <p>${article.summary.substring(0, 100)}...</p>
        <span class="date">Published on: ${article.date}</span>
        <button class="read-more" onclick="openModal('${article.title}', '${article.summary}', '${article.link}')">Read More</button>
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

// Función para mostrar los artículos archivados en grupos de cinco
function showArchivedArticles(archivedArticles) {
    const archivedContainer = document.getElementById('archivedArticlesContainer');
    archivedContainer.classList.add('articles-container');
    archivedContainer.innerHTML = ''; // Limpiar contenido previo

    // Dividir los artículos en grupos de 5
    const chunkSize = 5;
    let chunks = [];
    for (let i = 0; i < archivedArticles.length; i += chunkSize) {
        chunks.push(archivedArticles.slice(i, i + chunkSize));
    }

    // Crear contenedor de controles de navegación
    const controlsContainer = document.createElement('div');
    controlsContainer.classList.add('controls-container');

    // Inicializa el grupo actual
    let currentGroup = 0;

    // Botón de "Previous"
    const prevButton = document.createElement('button');
    prevButton.textContent = 'Previous';
    prevButton.onclick = () => {
        if (currentGroup > 0) {
            currentGroup--;
            renderGroup(currentGroup);
        }
    };

    // Botón de "Next"
    const nextButton = document.createElement('button');
    nextButton.textContent = 'Next';
    nextButton.onclick = () => {
        if (currentGroup < chunks.length - 1) {
            currentGroup++;
            renderGroup(currentGroup);
        }
    };

    // Botón de "Hide Archived Articles"
    const hideButton = document.getElementById('hideArchivedButton');
    if (hideButton) {
        hideButton.onclick = function() {
            archivedContainer.classList.add('hidden'); // Ocultar artículos archivados
            hideButton.classList.add('hidden'); // Ocultar botón de ocultar
        };
    }

    // Agregar botones al contenedor de controles
    controlsContainer.appendChild(hideButton);
    controlsContainer.appendChild(prevButton);
    controlsContainer.appendChild(nextButton);

    // Añadir contenedor de controles a la página
    archivedContainer.appendChild(controlsContainer);

    // Renderizar el primer grupo
    function renderGroup(groupIndex) {
        archivedContainer.innerHTML = ''; // Limpia el contenedor, pero se añade de nuevo los controles
        archivedContainer.appendChild(controlsContainer);
        chunks[groupIndex].forEach(article => {
            const articleElement = createArticleElement(article, true);
            archivedContainer.appendChild(articleElement);
        });
    }

    renderGroup(currentGroup);

    archivedContainer.classList.remove('hidden'); // Mostrar los artículos archivados
    if (hideButton) hideButton.classList.remove('hidden'); // Mostrar botón de ocultar si existe
}

// Eventos adicionales y otras funciones del código aquí...
