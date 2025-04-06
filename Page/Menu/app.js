// Elementos del DOM
const openShopping = document.querySelector('.shopping');
const closeShopping = document.querySelector('.closeShopping');
const listCard = document.querySelector('.listCard');
const body = document.querySelector('body');
const total = document.querySelector('.total');
const quantity = document.querySelector('.quantity');
const addToCartButtons = document.querySelectorAll('.add-to-cart');

// Datos del carrito
let cartItems = [];

// Eventos del carrito
openShopping.addEventListener('click', () => {
    body.classList.add('active');
    updateCart(); // Actualizar al abrir
});

closeShopping.addEventListener('click', () => {
    body.classList.remove('active');
});
function addToCard(key){
    if(listCards[key] == null){
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}
// Añadir productos al carrito
addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
        const itemElement = this.closest('.item');
        const itemId = parseInt(itemElement.getAttribute('data-id'));
        const itemName = itemElement.getAttribute('data-name');
        const itemPrice = parseInt(itemElement.getAttribute('data-price'));
        const itemImage = itemElement.getAttribute('data-image');
        
        // Buscar si el producto ya está en el carrito
        const existingItem = cartItems.find(item => item.id === itemId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cartItems.push({
                id: itemId,
                name: itemName,
                price: itemPrice,
                image: itemImage,
                quantity: 1
            });
        }
        
        updateCart();
        
        // Feedback visual
        this.textContent = '✓ Añadido';
        setTimeout(() => {
            this.textContent = 'Añadir al carrito';
        }, 1000);
    });
});

// Actualizar el carrito
function updateCart() {
    listCard.innerHTML = '';
    let totalPrice = 0;
    let totalQuantity = 0;
    
    cartItems.forEach(item => {
        const subtotal = item.price * item.quantity;
        totalPrice += subtotal;
        totalQuantity += item.quantity;
        
        const li = document.createElement('li');
        li.innerHTML = `
            <div><img src="${item.image}" alt="${item.name}"></div>
            <div>${item.name}</div>
            <div>$${item.price.toLocaleString('es-CO')}</div>
            <div class="quantity-controls">
                <button class="decrease" data-id="${item.id}">-</button>
                <span class="count">${item.quantity}</span>
                <button class="increase" data-id="${item.id}">+</button>
            </div>
            <div>$${subtotal.toLocaleString('es-CO')}</div>`;
        listCard.appendChild(li);
    });
    
    // Actualizar controles de cantidad
    document.querySelectorAll('.decrease').forEach(button => {
        button.addEventListener('click', function() {
            updateQuantity(parseInt(this.getAttribute('data-id')), -1);
        });
    });
    
    document.querySelectorAll('.increase').forEach(button => {
        button.addEventListener('click', function() {
            updateQuantity(parseInt(this.getAttribute('data-id')), 1);
        });
    });
    
    // Actualizar totales
    total.textContent = `$${totalPrice.toLocaleString('es-CO')}`;
    quantity.textContent = totalQuantity;
}

// Actualizar cantidad de items
function updateQuantity(itemId, change) {
    const itemIndex = cartItems.findIndex(item => item.id === itemId);
    
    if (itemIndex !== -1) {
        cartItems[itemIndex].quantity += change;
        
        if (cartItems[itemIndex].quantity <= 0) {
            cartItems.splice(itemIndex, 1);
        }
        
        updateCart();
    }
}

// Sistema de login (se mantiene igual)
document.addEventListener('DOMContentLoaded', function () {
    checkLoginStatus();
});

function checkLoginStatus() {
    if (localStorage.getItem('logged-in')) {
        showLoggedInState();
    } else {
        showLoggedOutState();
    }
}

function login() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    if (username !== '' && password !== '') {
        localStorage.setItem('logged-in', true);
        showLoggedInState();
    } else {
        alert('Por favor, ingrese un nombre de usuario y contraseña.');
    }
}

function logout() {
    localStorage.removeItem('logged-in');
    showLoggedOutState();
}

function showLoggedInState() {
    document.getElementById('login-container').style.display = 'none';
    document.querySelector('.container').style.display = 'block';
    document.body.classList.add('logged-in');
}

function showLoggedOutState() {
    document.getElementById('login-container').style.display = 'flex';
    document.querySelector('.container').style.display = 'none';
    document.body.classList.remove('logged-in');
}