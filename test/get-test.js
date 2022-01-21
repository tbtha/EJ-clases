const chai = require("chai");
const chaiHttp = require("chai-http")
const server = require("../index")

chai.use(chaiHttp)

describe("inicia test de servidor", () =>{
    it("prueba GET" , () =>{
       chai.request(server)
       .get("/bicicletas")
       .end((err,res) => {
           chai.expect(res).to.have.status(200)
       }) 
    });
});