let currentIndex = 0;
const slides = document.querySelectorAll('.carousel-slide img');
const dots = document.querySelectorAll('.dot');

// Inicializa el carrusel
showSlide(currentIndex);

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    currentIndex = i;
    showSlide(currentIndex);
  });
});

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.style.display = (i === index) ? 'block' : 'none';
    });
    dots.forEach((dot, i) => {
        dot.style.backgroundColor = (i === index) ? '#4db6e8' : '#ccc';
    });
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
}

setInterval(nextSlide, 3000); 

// Carrito de compras//
//
// Función para actualizar el contenido del carrito
function actualizarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const cartItems = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total');

    cartItems.innerHTML = ''; // Limpiar carrito
    let total = 0;

    carrito.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} x ${item.quantity} - S/ ${item.price * item.quantity}`;
        cartItems.appendChild(li);
        total += item.price * item.quantity;
    });

    cartTotal.textContent = `Total: S/ ${total.toFixed(2)}`;
}

// Función para añadir productos al carrito
function agregarAlCarrito(productId, productName, productPrice) {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Buscar si el producto ya está en el carrito
    const productoExistente = carrito.find(item => item.id == productId);

    if (productoExistente) {
        productoExistente.quantity += 1; // Incrementa la cantidad si ya está en el carrito
    } else {
        carrito.push({ id: productId, name: productName, price: parseFloat(productPrice), quantity: 1 });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();
}

// Eventos para los botones "Añadir al carrito"
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (event) => {
        const productId = event.target.getAttribute('data-id');
        const productName = event.target.getAttribute('data-name');
        const productPrice = event.target.getAttribute('data-price');
        agregarAlCarrito(productId, productName, productPrice);
    });
});

// Mostrar el modal del carrito al hacer clic en el icono del carrito
document.getElementById('carrito').addEventListener('click', (event) => {
    event.preventDefault();
    document.getElementById('cartModal').style.display = 'block';
    actualizarCarrito();
});

// Cerrar el modal del carrito
document.getElementById('cerrar_modal').addEventListener('click', () => {
    document.getElementById('cartModal').style.display = 'none';
});

// Vaciar el carrito
document.getElementById('vaciar_carrito').addEventListener('click', () => {
    localStorage.removeItem('carrito');
    actualizarCarrito();
});

// Función para actualizar el contenido del carrito
function actualizarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const cartItems = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total');
    cartItems.innerHTML = ''; // Limpiar carrito
    let total = 0;
    carrito.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${item.name} x ${item.quantity} - S/ ${(item.price * item.quantity).toFixed(2)}</span>
            <button class="remove-item" data-index="${index}">Eliminar</button>
        `;
        cartItems.appendChild(li);
        total += item.price * item.quantity;
    });
    cartTotal.textContent = `Total: S/ ${total.toFixed(2)}`;

    // Añadir event listeners para los botones de eliminar
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', removeItemFromCart);
    });
}

// Función para eliminar un elemento del carrito
function removeItemFromCart(event) {
    const index = event.target.getAttribute('data-index');
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();
}

// Resto del código JavaScript existente...

// Asegúrate de llamar a actualizarCarrito() cuando se abre el modal del carrito
document.getElementById('carrito').addEventListener('click', (event) => {
    event.preventDefault();
    document.getElementById('cartModal').style.display = 'block';
    actualizarCarrito();
});

// Opiniones iniciales
const opiniones = [
    { nombre: "Fátima Pacheco", rating: 5, comentario: "Excelente servicio y comida deliciosa. Volveré pronto!!!" },
    { nombre: "Juan Pérez", rating: 4, comentario: "Muy buena atención, la comida estaba deliciosa. Recomendado." },
    { nombre: "María García", rating: 5, comentario: "Una experiencia culinaria increíble. El ambiente es bonito." }
];

function mostrarOpiniones() {
    const container = document.getElementById('opiniones-container');
    container.innerHTML = '';

    opiniones.forEach((opinion) => {
        container.innerHTML += `
            <div class="opinion">
                <div class="avatar"></div>
                <div class="estrellas" data-rating="${opinion.rating}">
                    ${('★'.repeat(opinion.rating) + '☆'.repeat(5 - opinion.rating))}
                </div>
                <p>"${opinion.comentario}"</p>
                <p>${opinion.nombre}</p>
            </div>
        `;
    });
}

function manejarEstrellas(elem) {
    const stars = elem.querySelectorAll('.estrella');
    
    elem.addEventListener('click', function(e) {
        if (e.target.classList.contains('estrella')) {
            const value = parseInt(e.target.getAttribute('data-value'));
            elem.setAttribute('data-rating', value);
            
            stars.forEach(function(star, index) {
                if (index < value) {
                    star.classList.add('active');
                } else {
                    star.classList.remove('active');
                }
            });
        }
    });

    elem.addEventListener('mouseover', function(e) {
        if (e.target.classList.contains('estrella')) {
            const value = parseInt(e.target.getAttribute('data-value'));
            
            stars.forEach(function(star, index) {
                if (index < value) {
                    star.classList.add('active');
                } else {
                    star.classList.remove('active');
                }
            });
        }
    });

    elem.addEventListener('mouseout', function() {
        const rating = parseInt(elem.getAttribute('data-rating'));
        
        stars.forEach(function(star, index) {
            if (index < rating) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    mostrarOpiniones();
    manejarEstrellas(document.querySelector('.formulario-opinion .estrellas'));

    document.getElementById('enviar-opinion').addEventListener('click', function() {
        const nombre = document.getElementById('nombre').value;
        const rating = parseInt(document.querySelector('.formulario-opinion .estrellas').getAttribute('data-rating'));
        const comentario = document.getElementById('comentario').value;

        if (nombre && rating && comentario) {
            opiniones.unshift({ nombre, rating, comentario });
            mostrarOpiniones();
            document.getElementById('nombre').value = '';
            document.getElementById('comentario').value = '';
            document.querySelector('.formulario-opinion .estrellas').setAttribute('data-rating', '0');
            document.querySelectorAll('.formulario-opinion .estrella').forEach(star => star.classList.remove('active'));
        } else {
            alert('Por favor, completa todos los campos y selecciona una calificación.');
        }
    });
});

//Botón arriba
  const toTop = (() => {
  let button = document.getElementById("toTop");
  window.onscroll = () => {
    button.classList[
        (document.documentElement.scrollTop > 200) ? "add" : "remove"
      ]("is-visible")
  }
  button.onclick = () => {
    window.scrollTo({
      top:0, behavior:"smooth"
    })
  }
})();