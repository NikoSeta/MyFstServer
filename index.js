let express = require("express");
let app = express();
let { Router } = express;
let path = require("path");
let routProductos = new Router;
let routerIdProd = new Router;
const DocManager = require("./docManager");
const docManager = new DocManager('./productos.txt');
const PORT = 8080;

app.listen(PORT, ()=>{
    console.log(`Servidor Abierto en http://localhost:${PORT}`);
})
//Rutas
app.use("/API", express.static(path.join(__dirname, "/public")));
app.use("/API/productos", routProductos);
app.use("/API/productos/:id", routerIdProd);


//Traer todo el array
app.get("/" , async (req, res, next) => {
    const aux = await docManager.getAll();
    res.send(aux);
});
//Buscar por Id
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