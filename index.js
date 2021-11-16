let express = require("express");
let DocManager = require("./docManager")
let docManager = new DocManager('./productos.txt')

const PORT = 8080;
let app = express();
let main = async()=>{
    console.log(await docManager.getAll());
}

app.get("/" , (req, res, next) => {
    res.send(main())
});

app.listen(PORT, ()=>{
    console.log(`Servidor abierto en el puerto ${PORT}`);
});

docManager.getAll()