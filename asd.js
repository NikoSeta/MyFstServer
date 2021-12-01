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
