const socket = io();

let productlist = document.getElementById('productlist');
let chatlist = document.getElementById('chatlist');

let newProduct = document.getElementById('uploadProduct');
let newMessage = document.getElementById('sendMessage');

function postAPI(url = '', data = {}){
    const response = fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
      });
    return response; // parses JSON response into native JavaScript objects
}

let productos;

const updateProductTable = () => {
    productos = fetch ('/api/products')
    .then(response => response.json())
    .then((load) => {
        let data = load.products;
        let log = document.getElementById('productList')
        let products = `<div class="table-responsive">
        <table class="table table-dark">
        <br>
            <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Icon</th>
            </tr>`
        data.forEach(product =>{
            products  = products + ` <tr>
            <td>${product.title}</td>
            <td>${product.price}</td>
            <td><img width=50 src=${product.thumbnail}></td>
        </tr>`
        })
        log.innerHTML = products; 
    })
}

updateProductTable();

newMessage.addEventListener("submit", (e) => {
    e.preventDefault();
    socket.emit('newMessage',{mail: document.sendMessage.mail.value , date: (new Date).toLocaleString(),message: document.sendMessage.message.value });
})
    
socket.on('refreshChat', chat => {
    let log = document.getElementById('chatList')
    let messages = "";
    chat.forEach(message=>{
        messages  = messages+ `${message.mail} ${message.date} dice: ${message.message}</br>`;
    })
    log.innerHTML = messages;
})


newProduct.addEventListener("submit", (e) => {
    e.preventDefault();
    const product = {title: document.uploadProduct.title.value , price: document.uploadProduct.price.value, thumbnail: document.uploadProduct.thumbnail.value};
    postAPI('/api/products',product)
    .then(updateProductTable())
    .then(socket.emit('newProduct',productos));
})

socket.on('refreshProducts', products => {
    productos = products;
    updateProductTable();
})


