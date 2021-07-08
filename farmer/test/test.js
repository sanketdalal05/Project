const chai = require('chai');
const chaiHttp = require('chai-http');
const farmer = require('../farmer');

chai.should(); 

chai.use(chaiHttp);


//get farmer
describe('get /farmer',()=>{
    it('it should get all data',(done)=>{
        chai.request(farmer)
        .get('/farmer')
        .end((err,response)=>{
            response.should.have.status(201);
            response.body.should.be.a('array');
        done();
        })
    })
})
//get by id
describe('Get /farmer',()=>{
    it('it should get by id',(done)=>{
        id = '60cd056c7bcb7f3e78e75332';
        chai.request(farmer)
        .get('/farmer/'+id)
        .end((err,response)=>{
            response.should.have.status(201);
            response.body.should.be.a('object');
        done();
        })
    })
})
//post farmer 
describe('post/farmer/signup',()=>{
    it('it should post data',(done)=>{
        user = {
            name:"farmer12",
            email:"farm@gmail.com",
            password:"verify123",
            phone:1234567899
        }
        chai.request(farmer)
        .post('/farmer/')
        .send(user)
        .end((err,response)=>{
            response.should.have.status(201);
            response.body.should.be.a('object');
        done();
        })
    })
}) 
//patch
describe('patch /farmer/',()=>{
    it('it should patch data',(done)=>{
        user = {
            name:"man",
        }
        id = '60cd056c7bcb7f3e78e75332';
        chai.request(farmer)
        .patch('/farmer/'+id)
        .send(user)
        .end((err,response)=>{
            response.should.have.status(201);
            response.body.should.be.a('object');
        done();
        })
    })
}) 
//delete
describe('farmer/delete',()=>{
    it('it should delete data',(done)=>{
        id = '';
        chai.request(farmer)
        .delete('/farmer/'+id)
        .end((err,response)=>{
            response.should.have.status(200);
        done();
        })
    })
})