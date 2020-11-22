const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const should = chai.should();
const server = require('../../app');
const directorId = require('./director.test');

chai.use(chaiHttp);

let token;
let movieId;
describe('/_/Movies/_/', () =>{
    before('Token is True',(done) =>{
        chai.request(server)
            .post('/authenticate')
            .send({username:"cem_nisan4",password:"123456"})
            .end((err,res) =>{
                token = res.body.token;
                console.log(token);
                done();
            });
    });
    describe('/Get Movies', () =>{
        it('/Get All movies', (done) =>{
            chai.request(server)
                .get('/api/movies')
                .set('x-access-token',token)
                .end((err,res) => {
                    res.should.have.status(200);
                    expect(res.body).to.be.an('array');
                    done();
                });
        });
    });

    describe('/Post Movies', () =>{
        it('it sould post a movie.',(done) =>{
            const movie = {
                title: "Example",
                director_id : directorId.id,
                content : "lorem ipsum",
                category: 'drama',
                year: 2000,
                imdb : 8.8
            }

            chai.request(server)
                .post('/api/movies')
                .send(movie)
                .set('x-access-token',token)
                .end((err,res) =>{
                    res.should.have.status(200);
                    expect(res.body).to.be.an('object');
                    movieId = res.body._id;
                    console.log(res.body)
                    done();
                });
        });
    });
    describe('/Fetch movies by ID',() =>{
        it('/api/movies/:id',(done) =>{
            chai.request(server)
                .get('/api/movies/' + movieId)
                .set('x-access-token',token)
                .end((err,res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    console.log(res.body);
                    done();
                });
        });
    });
    describe('Update Movies',() =>{
        const movie = {
            title: "Hey you",
            director_id : directorId.id,
            content : "lorem ipsum",
            category: 'drama',
            year: 1996,
            imdb : 7.4
        }

        it('/api/movies/:id',(done) =>{
            chai.request(server)
                .put('/api/movies/' + movieId)
                .set('x-access-token',token)
                .send(movie)
                .end((err,res) =>{
                    res.should.have.status(200);
                    expect(res.body).to.be.a('object');
                    console.log(res.body);
                    done();
                });
        });
    });
    describe('Delete Movies',() =>{
        it('Delete /api/movies',(done) =>{
            chai.request(server)
                .delete('/api/movies/' + movieId)
                .set('x-access-token',token)
                .end((err,res) => {
                    res.should.have.status(200);
                    expect(res.body).to.be.a('object');

                    res.body.should.have.property('message').eql("The movie was successfully deleted.");
                    res.body.should.have.property('code').eql(1);

                    console.log(res.body);
                    done();
                });
        });
    });
});