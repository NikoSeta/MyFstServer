let express = require("express");
let app = express();
let { Router } = express;
let routProductos = new Router;
let routerIdProd = new Router;
let path = require("path");
const DocManager = require("./docManager");
const docManager = new DocManager('./productos.txt');
const PORT = 8080;

//Rutas
app.use("/API/productos", routProductos);
app.use("/API/productos/:id", routerIdProd);

//Traigo todo el array
routProductos.get("/" , async (req, res, next) => {
    const aux = await docManager.getAll();
    res.send(aux);
});
//Busco por Id
routerIdProd.get("/:id" , async (req, res, next) => {
    const id = await docManager.getById();
    res.send(id);
});
//Recive y agrega producto.
routProductos.post("/", async (req, res, next) => {
    const nuevoProd = await docManager.save();
    res.send(nuevoProd);
});
//Modifica product
routerIdProd.put("/" , async (req, res, next) => {
    const guardar = await docManager.getAll();
    res.send(guardar);
});
//Borra Prod por Id
routerIdProd.delete("/" , async (req, res, next) => {
    const deleteId = await docManager.deleteById();
    res.send(deleteId);
});