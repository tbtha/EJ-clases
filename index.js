const http = require("http");
const fs = require("fs")
const {v4: uuid4} = require("uuid")

const server = http.createServer((req,res) =>{

    let {bicicletas} = JSON.parse(fs.readFileSync('bicicletas.json'))


// devolver todas las bicicletas con metodo GET
if(req.url === "/bicicletas" && req.method === 'GET'){
    res.writeHead(200,{'Content-Type': 'application/json'})
    res.end(JSON.stringify(bicicletas))
}

// agregar nueva bicicleta con metodo POST
if(req.url === "/bicicletas" && req.method === "POST"){
   
    let respuesta = ""
    req.on("data",(body) =>{
        respuesta += body

    });
    req.on("end", () => {
        const bici = JSON.parse(respuesta)
        bici.id = uuid4();
        bicicletas.push(bici)
        

    fs.writeFile("bicicletas.json", JSON.stringify({bicicletas}), (err) =>{
        res.writeHead(201,{'Content-Type': 'application/json'})
        res.end(JSON.stringify(bicicletas))
        }) 
    });
}

// Modificar una bicicleta con metodo PUT
if(req.url === "/bicicletas" && req.method === "PUT"){
   
    let respuesta = ""
    req.on("data",(body) =>{
        respuesta += body

    });
    req.on("end", () => {
        const bici = JSON.parse(respuesta)
       
        // acualizar
        bicicletas = bicicletas.map(b => {
            if(b.id === bici.id){
                b = bici
            }
            return b
        })
        

    fs.writeFile("bicicletas.json", JSON.stringify({bicicletas}), (err) =>{
        res.writeHead(201,{'Content-Type': 'application/json'})
        res.end(JSON.stringify(bicicletas))
    }) 

    });
}

//Para eliminar DELETE
 if(req.url === "/bicicletas" && req.method === "DELETE"){   
    let respuesta = ""
    req.on("data",(body) =>{
        respuesta += body

    });
    req.on("end", () => {

        if(!respuesta) return res.end("no existe undefined")

        const {id} = JSON.parse(respuesta)

        if(!id) return res.end("no existe este id")
        
        // eliminar 
        bicicletas = bicicletas.filter(b => b.id !== id )

    fs.writeFile("bicicletas.json", JSON.stringify({bicicletas}), (err) =>{
        res.writeHead(201,{'Content-Type': 'application/json'})
        res.end(JSON.stringify(bicicletas))
    }) 

    });
}

})//final

server.listen(3000,() => console.log("activado"))

module.exports = server;
