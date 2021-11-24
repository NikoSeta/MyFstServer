let express = require("express");
let app = express();
let { Router } = express;
let routProductos = new Router;
let router2 = new Router;
let path = require("path");
const DocManager = require("./docManager")
const docManager = new DocManager('./productos.txt')
const PORT = 8080;

app.use("/API/productos", routProductos)

//Traigo todo el array
routProductos.get("/" , async (req, res, next) => {
    const aux = await docManager.getAll();
    res.send(aux);
});
//Busco por Id
routProductos.get("/:id" , async (req, res, next) => {
    const id = await docManager.getById();
    res.send(id);
});
//Recive y agrega producto.
routProductos.post("/", async (req, res, next) => {
    const nuevoProd = await docManager.save();
    res.send(nuevoProd);
});
//Modifica product
routProductos.put("/" , async (req, res, next) => {
    const guardar = await docManager.getAll();
    res.send(guardar);
});
//Borra Prod por Id
routProductos.delete("/" , async (req, res, next) => {
    const deleteId = await docManager.deleteById();
    res.send(deleteId);
});