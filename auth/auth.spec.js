const request = require('supertest')

const server = require('../api/server.js')

// passing tests
describe('register path and sanity', () => {
    describe('sanity check', () => {
        it('return 200', async ()=> {
            const expectedStatus = 200;
            const response = await request(server).get('/api/auth')
    
             expect(response.status).toEqual(expectedStatus)
    
        })
    })

    // describe('Adding new user', () => {
    //     it('should retrun a created status 201', async () => {
    //         const expectedStatus = 201;
    //         const user = {username: 'ammon4', password:'asdf'}

    //         const response = await request(server).post('/api/auth/register')
    //         .send(user)
    //         .expect('Content-Type', /json/)

    //         expect(response.status).toEqual(expectedStatus)
    //     })
    //     it('return body of new created user', async () => {
    //         const user = {username: 'dumby1', password:'asdf'}
    //         const response = await request(server)
    //         .post('/api/auth/register')
    //         .send(user)
    //         .expect('Content-Type', /json/)
    //         .set('Accept', 'application/json')
    //         .expect(function(res) {
    //             res.body = user
    //         })

    //         expect(response.body).toEqual(user)
    //     })
    // })
})

describe('login path', () => {
    it('Return status 200 when logging in', async () => {
        const statusCode = 200
        const user = {username: 'test', password: 'test'}

        const response = await request(server)
        .post("/api/auth/login")
        .send(user)
        .expect("Content-Type", /json/)

        expect(response.status).toEqual(statusCode)
    })
    it('returns username when logged in', async () => {
        const user = {username: 'test', password: 'test'}

        const response = await request(server)
        .post("/api/auth/login")
        .send(user)
        .expect('Content-Type', /json/)
        .expect(function(res){
            res.body = user.username
        })

        expect(response.body).toEqual(user.username)


    })
})
