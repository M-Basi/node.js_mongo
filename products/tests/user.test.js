const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../index");

const { Console } = require("winston/lib/winston/transports");

const helpers = require("../services/user.service")

beforeEach(async () => {
    await mongoose.connect(process.env.MONGODB_URI)
        .then(
            ()=> {console.log("Connection to Mongo from Jest established")},
            err => {console.log("Failed to connect to Mongo from Jest")}
        )
})

afterEach(async()=> {
    await mongoose.connection.close();
})

describe("Test for /api/users requests", ()=> {
    it("GET /api/users", async()=> {
        
        const res = await request(app).get("/api/users");

        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBeTruthy();
        expect(res.body.data.length).toBeGreaterThan(0);
    },10000);

    it("POST /api/users create user", async()=> {
        const res = await request(app).post("/api/users")
                .send({
                    username: "test4",
                    password: 12345,
                    name: "test4name",
                    surname: "test4surname",
                    email: "test4@aueb.gr",
                    address: {
                        area: "area66",
                        road: "road66"
                    }
                });

        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBeTruthy();
        expect(res.body.data).toBeTruthy();
    });

    it("POST /api/users request check for existed user", async()=> {
        const res = await request(app).post("/api/users")
                .send({
                    username: "test4",
                    password: 12345,
                    name: "test4name",
                    surname: "test4surname",
                    email: "test4@aueb.gr",
                    address: {
                        area: "area66",
                        road: "road66"
                    }
                });

        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBeFalsy();
    });

})

describe("Test for /api/users/{username} requests", ()=> {
    it("GET /api/users/{username}", async()=> {
        let result = await helpers.findLastInsertedUser();
        console.log(result.username);

        const res = await request(app).get('/api/users/' + result.username)

        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBeTruthy();
        expect(res.body.data.username).toBe(result.username);
        expect(res.body.data.email).toBe(result.email)
    });


    it("PATCH /api/users/{username}", async()=> {
        let result = await helpers.findLastInsertedUser();

        const res = await request(app)
                .patch('/api/users/' + result.username)
                .send({
                    name: "new test4",
                    surname: "new test4",
                    email: "xxx@aueb.gr",
                    address: {
                        area: "new area",
                        road: "new road"
                    }
                })

        console.log(res.body.data.name)
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBeTruthy();
        expect(res.body.data.name).toBe("new test4");
        expect(res.body.data.surname).toBe("new test4")
    });


    it("DELETE /api/users/{username}", async()=> {
        let result = await helpers.findLastInsertedUser();
        const res = await request(app).delete('/api/users/' + result.username)

        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBeTruthy();

    });


    


})