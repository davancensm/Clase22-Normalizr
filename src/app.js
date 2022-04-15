import express from 'express';
import { normalize,denormalize,schema } from "normalizr";
import productosRouter from './routes/routes.js';
import { Server } from 'socket.io';

const app = express();

const PORT = process.env.PORT||8080;

const server = app.listen(PORT, () => console.log((`Listening on PORT ${PORT}`)));

const io = new Server(server);

server.on("error", error => console.log(`Error en servidor ${error}`));

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static('public'));

const authorSchema = new schema.Entity('author');
const messageSchema = new schema.Entity('messages',{
    author:authorSchema
});
const messagesDBSchema = new schema.Entity('messagesDB',{
    messages : [messageSchema]
});



app.use('/api',productosRouter);

io.on('connection', (socket) => {
    console.log("Usuario Conectado")
    socket.on('newMessage', (data) => {
        io.emit('refreshChat',data);
    })
    socket.on('newProduct', (data) =>{
        io.emit('refreshProducts',data);
    })
})