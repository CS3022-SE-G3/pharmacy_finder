const request = require('supertest');
const { viewCustomerInformation, renderForm } = require('../../controllers/system_admin/customer');

let server;

describe('/api/genres', () => {
    beforeEach(() => {
        server = require('../../../index');
    });

    afterEach(async () => {
        //Close server
        await server.close();
    });

    describe('system_admin/customer test cases', () => {
        it("Should return all genres", async () => {
            await Genre.collection.insertMany([{
                    name: 'genre1'
                },
                {
                    name: 'genre2'
                },
            ]);

            const res = await request(server).get('/api/genres');
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
            expect(res.body.some(g => g.name === 'genre1')).toBeTruthy();
            expect(res.body.some(g => g.name === 'genre2')).toBeTruthy();

        });
    });

    describe('GET /:id', () => {
        it("Return a value when id is given", async () => {
            const genre = new Genre({
                name: 'genre1'
            });
            await genre.save();

            const res = await request(server).get('/api/genres/' + genre._id);

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('name', genre.name);
        });


        it("Returns 404 if id is invalid", async () => {
            //dont need to store anything because you're passing an invalid id anyway
            //this way your code runs faster too
            const res = await request(server).get('/api/genres/1');
            expect(res.status).toBe(404);

        });

        it('should return 404 if no genre with the given id exists', async () => {
            const id = mongoose.Types.ObjectId();
            const res = await request(server).get('/api/genres/' + id);

            expect(res.status).toBe(404);
        });
    });

    describe('POST /', () => {
        let name;
        let token;

        const exec = async function () {

            return await request(server)
                .post('/api/genres')
                .set('x-auth-token', token)
                .send({
                    name
                });
        }
        beforeEach(() => {
            name = 'genre1';
            token = new User().generateAuthToken();
        });

        it('should return a 401 if client is not logged in', async () => {
            token = '';
            const res = await exec();
            expect(res.status).toBe(401);
        });

        it('should return a 400 if genre word has less than 5 characters (invalid genre) ', async () => {
            name = '1234';

            const res = await exec();
            expect(res.status).toBe(400);
        });

        it('should return a 400 if genre word has more than 50 characters (invalid genre) ', async () => {

            name = new Array(52).join("a"); //autogenerates a string of 51 characters
            //new Array(52) makes an empty array of 51 characters and puts a in between each

            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should save genre if it is valid', async () => {
            await exec();

            const genre = await Genre.find({
                name: 'genre1'
            });
            expect(genre).not.toBeNull();

        });

        it('should return genre in response body if valid', async () => {
            const res = await exec();

            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('name', 'genre1');


        })
    });

    describe('PUT /', () => {
        let id;
        let name;
        let token;
        let genre;
        const exec = async function () {
            return await request(server)
                .put('/api/genres/' + id)
                .set('x-auth-token', token)
                .send({
                    name
                });
        }

        beforeEach(async () => {
            token = new User().generateAuthToken();
            id = mongoose.Types.ObjectId();
            name = 'potato';
            genre = new Genre({
                _id: id,
                name: "new name"
            });
            await genre.save();
        });
        afterEach(async () => {
            await Genre.remove({});
            await server.close();
        })
        //happy path
        it("Should return the updated genre if no errors", async () => {
            name = "changed name";
            const res = await exec();
            expect(res.status).toBe(200);
            genre = await Genre.findById(id);
            expect(genre).not.toBeNull();
            expect(genre).toHaveProperty("name", name);

        });

        it("Should return 401 if not logged in/no token provided", async () => {
            token = ''; //doesnt matter if name and id are not set
            const res = await exec();
            expect(res.status).toBe(401);

        });

        it("Should return 400 if token is invalid", async () => {
            token = 'potato'; //doesnt matter if name and id are not set
            const res = await exec();
            expect(res.status).toBe(400);

        });

        it("Should return 400 if the name sent in request is less than 5 characters", async () => {
            name = 'abc';
            const res = await exec();
            expect(res.status).toBe(400);

        });

        it("Should return 400 if the name sent in request is more than 50 characters", async () => {
            name = new Array(52).join('a');
            const res = await exec();
            expect(res.status).toBe(400);

        });


        it("Should return 404 if given id is not found", async () => {
            id = mongoose.Types.ObjectId();
            const res = await exec();
            expect(res.status).toBe(404);

        });
        it("Should return 404 if given id is invalid", async () => {
            id = 1;
            const res = await exec();
            expect(res.status).toBe(404);

        });
    });

    describe('DELETE /', () => {
        let token;
        let id;
        let genre;
        beforeEach(async () => {
            id = mongoose.Types.ObjectId();
            token = new User({
                isAdmin: true
            }).generateAuthToken(); //for happy path user needs to be an admin
            genre = new Genre({
                name: 'new genre'
            });
            await genre.save();
        });

        const exec = async function () {
            return await request(server)
                .delete('/api/genres/' + id)
                .set('x-auth-token', token)
                .send();
        }

        it('Should return 401 if user not logged in/no token', async () => {
            token = '';
            const res = await exec();
            expect(res.status).toBe(401);

        });

        it('Should return 400 if token is invalid', async () => {
            token = 'potato';
            const res = await exec();
            expect(res.status).toBe(400);

        });

        it('Should return 404 if id is invalid', async () => {
            id = 1;
            const res = await exec();
            expect(res.status).toBe(404);

        });

        it('Should return 404 if id is not found', async () => {
            const res = await exec();
            expect(res.status).toBe(404);
        });

        it('Should return 403 if user is not an admin', async () => {
            token = new User({
                isAdmin: false
            }).generateAuthToken();
            const res = await exec();
            expect(res.status).toBe(403);
        });

        //happy path
        it('Should return 200 and the deleted genre if no error', async () => {

            id = genre._id;

            const res = await exec();
            genre = await Genre.findById(id);
            expect(genre).toBeNull();
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('name', 'new genre');
            expect(res.body).toHaveProperty('_id', id.toHexString());

        });

    });
});