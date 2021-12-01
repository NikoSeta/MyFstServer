let express = require("express");
let app = express();
let path = require("path");
const DocManager = require("./docManager");
const docManager = new DocManager('./productos.txt');
const PORT = 8080;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extend:true }));

let aux = []

//Traer todo el array
app.get("/" , async (req, res, next) => {
    let aux = await docManager.getAll();
    res.render("index", {aux});
});
app.post("/productos", (req, res, next)=>{
    aux.push(req.body)
    res.redirect("/");
})

app.listen(PORT, ()=>{
    console.log(`Servidor abierto en http://localhost:${PORT}`);
})