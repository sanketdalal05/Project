const chai = require('chai');
const chaiHttp = require('chai-http');
const deal = require('../dealer');

chai.should(); 

chai.use(chaiHttp);


//get farmer
describe('get /dealer',()=>{
    it('it should get all data',(done)=>{
        chai.request(deal)
        .get('/dealer')
        .end((err,response)=>{
            response.should.have.status(200);
            response.body.should.be.a('array');
        done();
        })
    })
})
//get by id
describe('Get/dealr by id',()=>{
    it('it should get by id',(done)=>{
        id = '';
        chai.request(deal)
        .get('/dealer/'+id)
        .end((err,response)=>{
            response.should.have.status(200);
            response.body.should.be.a('object');
        done();
        })
    })
})
//post 
describe('post/dealer',()=>{
    it('it should post data',(done)=>{
        user = {
            name:"dealer5",
            email:"deal5@dl.com",
            password:"dealer51",
            phone:1234567897
        }
        chai.request(deal)
        .post('/dealer/')
        .send(user)
        .end((err,response)=>{
            response.should.have.status(200);
            response.body.should.be.a('object');
        done();
        })
    })
}) 
//patch
describe('patch/dealer/',()=>{
    it('it should patch data',(done)=>{
        user = {
            name:"dealer05",
        }
        id = '';
        chai.request(deal)
        .patch('/dealer/'+id)
        .send(user)
        .end((err,response)=>{
            response.should.have.status(200);
            response.body.should.be.a('object');
        done();
        })
    })
}) 
//delete
describe('dealer/delete',()=>{
    it('it should delete data',(done)=>{
        id = '';
        chai.request(deal)
        .delete('/farmer/'+id)
        .end((err,response)=>{
            response.should.have.status(200);
        done();
        })
    })
})