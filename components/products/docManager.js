const fs = require ("fs");

class docManager {
  
    constructor(ruta) {
      this.ruta = ruta;
    }

    async save(prod) {
      const objs = await this.getAll()
      let newId
      if (objs.length == 0) {
        newId = 1
      } else {
        newId = objs.length + 1
      }
      const newProd = { ...prod, id: newId }
      objs.push(newProd)
      
      try {
        await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2))
        return newProd
      } catch (error) {
        throw new Error(`Error al guardar: ${error}`)
      }
    }

    async getById(id) {
      const objs = await this.getAll()
      const buscado = objs.find(o => o.id == id)
      return buscado
    }

    async getAll() {
      try {
        let objs = await fs.promises.readFile(this.ruta, 'UTF-8')
        return console.log(objs);
        JSON.parse(objs)
      } catch (error) {
        return console.log(error);
      }
    }

    async deleteById(id) {
      const objs = await this.getAll()
      const index = objs.findIndex(o => o.id == id)
      if (index == -1) {
        throw new Error(`Error al borrar: no se encontró el id ${id}`)
      }
      objs.splice(index, 1)
      try {
        await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2))
      } catch (error) {
        throw new Error(`Error al borrar: ${error}`)
      }
    }

    async deleteAll() {
      await fs.writeFile(this.ruta, JSON.stringify([], null, 2))
    }
  }
  
  module.exports = docManager;