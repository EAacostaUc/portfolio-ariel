// =========================================================
// GITHUB API
// =========================================================

// Usuario de GitHub
const githubUsername = "EAacostaUc";

// URL de la API REST de GitHub
const githubApiUrl = `https://api.github.com/users/${githubUsername}/repos`;

// Contenedor donde mostraremos los repositorios
const repositoriesContainer = document.getElementById(
    "github-repositories"
);


// =========================================================
// OBTENER REPOSITORIOS
// =========================================================

async function getGitHubRepositories() {

    try {

        // Realizamos la petición a la API
        const response = await fetch(githubApiUrl);

        // Comprobamos si la petición fue correcta
        if (!response.ok) {
            throw new Error("No se pudieron obtener los repositorios.");
        }

        // Convertimos la respuesta a JSON
        const repositories = await response.json();

        // Mostramos los repositorios
        displayRepositories(repositories);

    } catch (error) {

        console.error("Error:", error);

        repositoriesContainer.innerHTML = `
            <p>
                No se pudieron cargar los repositorios de GitHub.
            </p>
        `;
    }
}


// =========================================================
// MOSTRAR REPOSITORIOS
// =========================================================

function displayRepositories(repositories) {

    // Limpiamos el mensaje "Cargando repositorios..."
    repositoriesContainer.innerHTML = "";


    // Si no existen repositorios
    if (repositories.length === 0) {

        repositoriesContainer.innerHTML = `
            <p>
                No hay repositorios públicos disponibles.
            </p>
        `;

        return;
    }


    // Recorremos los repositorios
    repositories.forEach(repository => {

        // Creamos una tarjeta
        const repositoryCard = document.createElement("article");

        repositoryCard.classList.add("project-card");


        // Si el repositorio no tiene descripción
        const description =
            repository.description ||
            "Este repositorio no tiene una descripción.";


        // Si no tiene lenguaje
        const language =
            repository.language ||
            "No especificado";


        // Creamos el contenido
        repositoryCard.innerHTML = `

            <div class="project-number">
                GitHub
            </div>

            <h3>
                ${repository.name}
            </h3>

            <p>
                ${description}
            </p>

            <div class="project-technologies">

                <span>
                    ${language}
                </span>

            </div>

            <a
                href="${repository.html_url}"
                target="_blank"
                rel="noopener noreferrer"
                class="project-link"
            >
                Ver repositorio →
            </a>

        `;


        // Agregamos la tarjeta al contenedor
        repositoriesContainer.appendChild(repositoryCard);

    });
}


// =========================================================
// EJECUTAR
// =========================================================

getGitHubRepositories();