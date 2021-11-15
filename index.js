let express = require("express");
let DocManager = require("./docManager")
let docManager = new DocManager('./productos.txt')


const PORT = 8080;
let app = express();

app.get("/" , (req, res, next) => {
    res.send(docManager)
});

app.listen(PORT, ()=>{
    console.log(`Servidor abierto en el puerto ${PORT}`);
});

docManager.getAll()