let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

let products = [
    {
        id: 1,
        name: 'Plato 1',
        image: '1.PNG',
        price: '$120.000'
    },
    {
        id: 2,
        name: 'Plato 2',
        image: '2.PNG',
        price: '$120.000'
    },
    {
        id: 3,
        name: 'Plato 3',
        image: '3.PNG',
        price: '$220.000'
    },
    {
        id: 4,
        name: 'Plato 4',
        image: '4.PNG',
        price: '$123.000'
    },
    {
        id: 5,
        name: 'Plato 5',
        image: '5.PNG',
        price: '$320.000'
    },
    {
        id: 6,
        name: 'Plato 7',
        image: '6.PNG',
        price: '$120.000'
    }
];
let listCards  = [];
function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Añadir al carrito</button>`;
        list.appendChild(newDiv);
    })
}
initApp();
function addToCard(key){
    if(listCards[key] == null){
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}
function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
                listCard.appendChild(newDiv);
        }
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}
function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}
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