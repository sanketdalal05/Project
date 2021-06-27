const chai = require('chai');
const chaiHttp = require('chai-http');
const crop = require('../crop');

chai.should();

chai.use(chaiHttp);


//get 
describe('get/crop', () => {
    it('it should get all data', (done) => {
        chai.request(crop)
            .get('/crop')
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('array');
                done();
            })
    })
})
//get by id
describe('get/crop by id', () => {
    it('it should get by id', (done) => {
        id = '60d32109c96ec2540ca27b84';
        chai.request(crop)
            .get('/crop/' + id)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                done();
            })
    })
})
//post 
describe('post/crop', () => {
    it('it should post data', (done) => {
        user = {
            Crop_name: "moog",
            Crop_Type: "grains",
            Price: 2000,
            Crop_quantity: 2,
        }
        chai.request(crop)
            .post('/crop/')
            .send(user)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                done();
            })
    })
})
//patch
describe('patch /crop', () => {
    it('it should patch data', (done) => {
        user = {
            Crop_name: "almond"
        }
        id = '60d32109c96ec2540ca27b84';
        chai.request(crop)
            .patch('/crop/' + id)
            .send(user)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                done();
            })
    })
})
//delete
describe('crop/delete', () => {
    it('it should delete data', (done) => {
        id = '';
        chai.request(crop)
            .delete('/crop/' + id)
            .end((err, response) => {
                response.should.have.status(200);
                done();
            })
    })
})