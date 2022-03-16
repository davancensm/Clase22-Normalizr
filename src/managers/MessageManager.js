import options from './options/sqliteconfig.js'
import knex from "knex";

const database = knex(options);

class MessageManager{

    getAll = async () =>{
        let data = await database.from('messages').select('*');
        let messages = JSON.parse(JSON.stringify(data));
        return {status:"success",message:messages}
        }

    save = async (message) => {
        // Valido que el producto venga con todos los campos.
        if(!message.mail || !message.message) return {status:"error", error:"missing field"}
        let data = await database.from('messages').insert(message)
        console.log("Message inserted")
        }
}

export default MessageManager;
