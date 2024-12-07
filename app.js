// --- Referencias a elementos principales ---
document.addEventListener('DOMContentLoaded', () => {
    const galleryContainer = document.getElementById('app'); // Contenedor de la galería
    const modal = document.getElementById('image-modal'); // Modal de la imagen ampliada
    const modalImage = document.getElementById('modal-image'); // Imagen dentro del modal
    const closeModal = document.getElementById('close-modal'); // Botón para cerrar el modal
    const likeButton = document.getElementById('like-button'); // Botón "Me gusta"
    const likeHeart = document.getElementById('like-heart'); // Corazón
    const likeCount = document.getElementById('like-count'); // Contador de "Me gusta"
    const commentsContainer = document.getElementById('comments'); // Contenedor de comentarios
    const commentInput = document.getElementById('comment-input'); // Input para comentarios
    const addCommentButton = document.getElementById('add-comment'); // Botón para agregar comentarios





const downloadButton = document.getElementById('download-button');
const convivenciasBtn = document.getElementById('convivencias-btn');
const convivenciasMenu = document.getElementById('convivencias-menu');


let likeCounter = 0; // Contador de "Me gusta"
    let comments = []; // Array para almacenar los comentarios

    // Abrir el modal al hacer clic en una imagen
    galleryContainer.addEventListener('click', (e) => {
        if (e.target.tagName === 'IMG') {
            modalImage.src = e.target.src; // Establecer la imagen en el modal
            modal.classList.add('active'); // Mostrar el modal
            commentsContainer.innerHTML = ''; // Limpiar los comentarios previos

            // Mostrar los comentarios actuales en el modal
            comments.forEach(comment => {
                const commentElement = document.createElement('div');
                commentElement.textContent = comment;
                commentsContainer.appendChild(commentElement);
            });
        }
    });

    // Cerrar el modal
    closeModal.addEventListener('click', () => {
        modal.classList.remove('active'); // Ocultar el modal
        commentsContainer.innerHTML = ''; // Limpiar los comentarios
        commentInput.value = ''; // Limpiar el campo de comentarios
    });

    // Botón "Me gusta"
    likeButton.addEventListener('click', () => {
        likeCounter++; // Incrementar el contador
        likeCount.textContent = likeCounter; // Actualizar el contador visible
        likeHeart.classList.add('liked'); // Cambiar color del corazón

        
    });

    // Agregar comentarios
    addCommentButton.addEventListener('click', () => {
        const commentText = commentInput.value.trim();
        if (commentText) {
            comments.push(commentText); // Guardar el comentario en el array
            const commentElement = document.createElement('div');
            commentElement.textContent = commentText;
            commentsContainer.appendChild(commentElement); // Agregar el comentario en el modal
            commentInput.value = ''; // Limpiar el campo de entrada
        }
    });
});





// --- Menú de convivencias ---

// Mostrar/ocultar submenú al hacer clic en el botón
convivenciasBtn.addEventListener('click', (event) => {
    event.stopPropagation(); // Evitar cerrar el menú al hacer clic en el botón
    convivenciasMenu.classList.toggle('visible'); // Mostrar u ocultar el menú
});

// Cerrar el submenú al hacer clic fuera de él
document.addEventListener('click', () => {
    convivenciasMenu.classList.remove('visible');
});

// --- Contenido dinámico mediante Fetch ---

document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.getElementById('main-content');

    // Cargar contenido dinámico al hacer clic en un enlace
    document.querySelectorAll('nav a[data-section]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.getAttribute('data-section');

            // Fetch para cargar el contenido del archivo HTML
            fetch(section)
                .then(response => response.text())
                .then(data => {
                    mainContent.innerHTML = data;
                })
                .catch(error => {
                    console.error('Error cargando la sección:', error);
                    mainContent.innerHTML = '<p>Error al cargar el contenido.</p>';
                });
        });
    });
});

// --- Contenido dinámico avanzado ---

document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.getElementById('main-content');

    // Manejar clics en los enlaces del menú
    document.querySelectorAll('nav a[data-section]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Evita el comportamiento predeterminado del enlace
            const section = link.getAttribute('data-section'); // Obtener el nombre del archivo

            // Cargar el contenido dinámicamente usando Fetch
            fetch(section)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error al cargar la sección');
                    }
                    return response.text();
                })
                .then(data => {
                    // Extraer el contenido dinámico del archivo HTML
                    const parser = new DOMParser();
                    const newContent = parser.parseFromString(data, 'text/html');
                    const sectionContent = newContent.querySelector('div'); // Obtiene el primer <div>

                    // Insertar el contenido en el contenedor principal
                    mainContent.innerHTML = sectionContent.innerHTML;
                })
                .catch(error => {
                    console.error(error);
                    mainContent.innerHTML = '<p>Error al cargar el contenido.</p>';
                });
        });
    });
});

// --- Manejo de login y registro ---

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const authContainer = document.getElementById('auth-container');
    const mainContent = document.getElementById('main-content');

    const showRegister = document.getElementById('show-register');
    const showLogin = document.getElementById('show-login');

    // Simulación de almacenamiento de usuarios (en memoria)
    const users = [];

    // Cambiar a formulario de registro
    showRegister.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
    });

    // Cambiar a formulario de login
    showLogin.addEventListener('click', (e) => {
        e.preventDefault();
        registerForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
    });

    // Manejar registro
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('reg-username').value;
        const password = document.getElementById('reg-password').value;

        if (users.find((user) => user.username === username)) {
            alert("El usuario ya existe.");
        } else {
            users.push({ username, password });
            alert("Usuario registrado exitosamente.");
            registerForm.reset();
            showLogin.click();
        }
    });

    // Manejar login
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const user = users.find((user) => user.username === username && user.password === password);

        if (user) {
            alert("Inicio de sesión exitoso.");
            authContainer.classList.add('hidden');
            mainContent.classList.remove('hidden');
        } else {
            alert("Usuario o contraseña incorrectos.");
        }
    });
});

// --- Carga específica de contenido de 4to 2024 ---

document.addEventListener('DOMContentLoaded', () => {
    const load4toContentButton = document.querySelector('a[href="4to2024.html"]');

    if (load4toContentButton) {
        load4toContentButton.addEventListener('click', (e) => {
            e.preventDefault();
            fetch('4to2024.html')
                .then((response) => response.text())
                .then((html) => {
                    document.getElementById('main-content').innerHTML = html;
                })
                .catch((error) => {
                    console.error('Error cargando el contenido de 4to2024:', error);
                });
        });
    }
});
