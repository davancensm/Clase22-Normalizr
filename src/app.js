const express = require('express')
const productosRouter = require('./routes/routes');
const {Server} = require('socket.io')

const app = express();

const PORT = process.env.PORT||8080;

const server = app.listen(PORT, () => console.log((`Listening on PORT ${PORT}`)));

const io = new Server(server);

server.on("error", error => console.log(`Error en servidor ${error}`));

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static('public'));

app.use('/api',productosRouter);

let chat = [];

io.on('connection', (socket) => {
    console.log("Usuario Conectado")
    socket.emit('refreshChat',chat);
    socket.on('newMessage', (data) => {
        chat.push(data);
        io.emit('refreshChat',chat);
    })
    socket.on('newProduct', (data) =>{
        io.emit('refreshProducts',data);
    })
})