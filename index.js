let express = require("express");
const DocManager = require("./docManager")
const docManager = new DocManager('./productos.txt')

const PORT = 8080;
let app = express();

console.log(docManager.save());

app.get("/" , (req, res, next) => {
    res.send(docManager.getAll)
});
app.listen(PORT, ()=>{
    console.log(`Servidor abierto en el puerto ${PORT}`);
});