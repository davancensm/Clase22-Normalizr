import options from './options/sqliteconfig.js'
import knex from "knex";

const database = knex(options);
/*
    producto = {
        title : String (required),
        price : Number (required),
        thumbnail : String (required)
    }
*/

class ProductManager{

    getAll = async () =>{
        let data = await database.from('products').select('*');
        let products = JSON.parse(JSON.stringify(data));
        return {status:"success",products:products}
        }
    

    save = async (producto) => {
        // Valido que el producto venga con todos los campos.
        if(!producto.title || !producto.price || !producto.thumbnail) return {status:"error", error:"missing field"}
        let data = await database.from('products').insert(producto)
        console.log("Product inserted")
        }
    

    getById = async (id) => {
        if(!id) return {status:"error", error:"ID needed"}
        let data = database.from('products').select('*').where('id','=',id)
        let product = JSON.parse(json.stringify(data));
        if(product) return {status:"success",product:product}
        else return {status:"error", error:"Product not found"}
        }

    deleteById = async (id) => {
        if(!id) return {status:"error", error:"ID needed"}
        let data = await database.from('products').where('id','=',id).del()
        return {status:"success",message:"Product deleted"};
    }
}

export default ProductManager;
