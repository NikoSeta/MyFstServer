const fs = require ("fs");
let path = require ("path");


class docManager{
    constructor(url){
        this.url = url
    }
    async save(producto){
        try {
            let productos = await this.getAll()
            let newProductId = producto.length + 1;
            let newProduct = {
                ...producto,
                id: (producto.length + 1)
            }
            producto.push(newProduct);
            let contenido = JSON.stringify(productos, null, 2)
            await fs.promises.writeFile(`${this.url}`, contenido);
            return newProductId; 
        } catch (error) {
            console.log(error);
        }
    }

    async getBtId(id){
        try {
            let respuesta = null;
            let productos = await this.getAll()
            if(productos.length > 0){
                productos.forEach(element => {
                    if(element.id == id){
                        respuesta = element;
                    }
                });
            }
           return respuesta; 
        } catch (error) {
            console.log(error);
        }
    }

    async getAll(){
        try {
            let productos = await fs.promises.readFile(`${this.url}`, 'utf-8')
            return JSON.parse(productos[0]);
        } catch (error) {
            console.log(error);
        }
    }

    async deleteById(id){
        try {
            let respuesta = [];
            let productos = await this.getAll();
            for (const key in productos) {
                if(productos[key].id == id){
                    productos.splice(key, 1);
                }
                console.log(productos);
            }
            let contenido = JSON.stringify(productos, null, 2)
            await fs.promises.writeFile(`${this.url}`, contenido);
            return respuesta;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteAll(producto){
        try {
            await fs.promises.writeFile(`${this.url}`, `[]`);
           return 0; 
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = docManager;