const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;
const server = require('../../app');

chai.use(chaiHttp);

let token;
let id;

describe('Directors Testing.',() => {
    before('Token is maybe true.',(done) =>{
        chai.request(server)
            .post('/authenticate')
            .send({username:'cem_nisan4',password:'123456'})
            .end((err,res) =>{
                res.should.have.status(200);
                token = res.body.token;

                done();
            });
    });
    describe('All directors',() =>{
        it('GET/api/directors',(done) =>{
            chai.request(server)
                .get('/api/directors')
                .set('x-access-token',token)
                .end((err,res) =>{
                    res.should.have.status(200);
                    expect(res.body).to.be.an('array');
                    done();
                })
        })
    })
    describe('Add Directors',() =>{
        it('POST/api/directors',(done)=>{
            const Director = {
                name:'David',
                lastName : 'Fincher',
                birthOfYear: 1962,
                biography: 'lorem ipsum'
            }
            chai.request(server)
                .post('/api/directors')
                .send(Director)
                .set('x-access-token',token)
                .end((err,res) =>{
                    res.should.have.status(200);
                    expect(res.body).to.be.a('object');
                    console.log(res.body);
                    id = res.body._id;
                    done();
                });
        });
    });
    describe('Search by Name',() =>{
        it('/api/directors/:name',(done) =>{
            chai.request(server)
                .get('/api/directors/','David')
                .set('x-access-token',token)
                .end((err,res) =>{
                    res.should.have.status(200);
                    expect(res.body).to.be.a('array');
                    console.log(res.body);
                    done();
                });
        });
    });
});

module.exports = {
    id:id
}