let express = require("express");
let app = express();
let path = require("path");
const DocManager = require("./components");
const docManager = new DocManager('./components/productos/productos.txt');
//----Puerto servidor local.
let { server } = require ("./config") 
const PORT = server.port;

//Middlewears..
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extend:true }));

app.get("/" , async (req, res, next) => {
    const productos = await docManager.getAll();
    res.render("index", productos);
});

app.post("/productos", (req, res)=>{
    try {
        const newProducto = req.body
        docManager.save(newProducto)
        res.redirect("/")
        console.log(req.body);
    } catch (error) {
        console.log(error);
    }    
});

app.listen(PORT, ()=>{
    console.log(`Servidor abierto en http://localhost:${PORT}`);
});