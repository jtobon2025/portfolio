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

// Función para crear un elemento de artículo
function createArticleElement(article, isArchived = false) {
    const articleElement = document.createElement('article');
    articleElement.classList.add('article');
    articleElement.innerHTML = `
        <h4>${article.title}</h4>
        <p>${article.summary}</p>
        <span class="date">Published on: ${article.date}</span>
        <button class="read-more" onclick="openModal('${article.title}', '${article.summary}', '${article.link}')">Read More</button>
    `;
    
    // Añadir botón para ocultar si es un artículo archivado
    if (isArchived) {
        const hideButton = document.createElement('button');
        hideButton.textContent = 'Hide';
        hideButton.classList.add('read-more'); // Aplicar la misma clase que los botones "Read More"
        hideButton.onclick = () => articleElement.remove();
        articleElement.appendChild(hideButton);
    }

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

// Función para mostrar los artículos archivados en grupos de cinco
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
    prevButton.classList.add('read-more'); // Aplica la clase 'read-more' para el estilo
    prevButton.onclick = () => {
        if (currentGroup > 0) {
            currentGroup--;
            renderGroup(currentGroup);
        }
    };

    // Botón de "Next"
    const nextButton = document.createElement('button');
    nextButton.textContent = 'Next';
    nextButton.classList.add('read-more'); // Aplica la clase 'read-more' para el estilo
    nextButton.onclick = () => {
        if (currentGroup < chunks.length - 1) {
            currentGroup++;
            renderGroup(currentGroup);
        }
    };

    // Botón de "Hide Archived Articles"
    const hideButton = document.getElementById('hideArchivedButton');
    if (hideButton) {
        hideButton.classList.add('read-more'); // Añade la clase 'read-more' para compartir el estilo
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


// Evento para ocultar todos los artículos archivados
document.getElementById('hideArchivedButton').addEventListener('click', function() {
    document.getElementById('archivedArticlesContainer').classList.add('hidden'); // Ocultar los artículos
    this.classList.add('hidden'); // Ocultar el botón de ocultar todos
});
let slideIndex = 0;

function moveSlide(n) {
    const slides = document.querySelectorAll('.carousel-container img');
    slideIndex += n;

    // Ajustar el índice si llega al inicio o final del carrusel
    if (slideIndex < 0) {
        slideIndex = slides.length - 1;
    } else if (slideIndex >= slides.length) {
        slideIndex = 0;
    }

    // Calcular el desplazamiento y aplicar la transformación
    const offset = -slideIndex * 100;
    const container = document.querySelector('.carousel-container');
    container.style.transform = `translateX(${offset}%)`;
}
// FUNCIONES PARA EL MANEJO DE LAS OPCIONES DE LA BARRA COMPARTIR SEPTIEMBRE 11/2024

//function toggleShareMenu() {
  //  const shareMenu = document.getElementById('shareMenu');
 //   shareMenu.style.display = shareMenu.style.display === 'block' ? 'none' : 'block';
//}
function toggleShareMenu() {
    const shareMenu = document.querySelector('.share-menu');
    shareMenu.style.display = shareMenu.style.display === 'block' ? 'none' : 'block';
}

    // Función para descargar un archivo
    function downloadFile() {
        const link = document.createElement('a');
        link.href = 'path/to/your/file.ext'; // Reemplaza con la ruta de tu archivo
        link.download = 'filename.ext'; // Reemplaza con el nombre de archivo deseado
        link.click();
    }

function saveContent() {
    // Implementa tu lógica para guardar el contenido aquí
    alert('Content saved!');
}
