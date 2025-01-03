const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { hash } = require("bcryptjs");
const { signToken } = require("../helpers/jwt");
const { STRING } = require("sequelize");

let access_token1;
beforeAll(async () => {
  const users = require("../data/users.json");
  users.forEach((user) => {
    user.password = hash(user.password);
    user.updatedAt = user.createdAt = new Date();
  });

  await sequelize.queryInterface.bulkInsert("Users", users, {});

  //access_token Admin
  const payload1 = {
    id: 1,
    username: "Admin Handsome",
    email: "admin@gmail.com",
    role: "Admin",
  };
  access_token1 = signToken(payload1);

  // access_token User
  const payload2 = {
    id: 2,
    username: "zan",
    email: "razan@gmail.com",
    role: "User",
  };
  access_token2 = signToken(payload2);
});

afterAll(async () => {
  await sequelize.queryInterface.bulkDelete("Users", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

// Register
describe("POST /register", () => {
  describe("POST /register - succeed", () => {
    it("should be return an object with succeed message ", async () => {
      const body = {
        username: "aku",
        email: "aku@gmail.com",
        password: "aku12345",
      };
      const response = await request(app).post("/register").send(body);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });
  });

  describe("POST /register - fail", () => {
    it("shouldbe return an object with error message if username is null", async () => {
      const body = {
        username: "",
        email: "aku@gmail.com",
        password: "aku12345",
      };
      const response = await request(app).post("/register").send(body);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });
  });

  describe("POST /register - fail", () => {
    it("should be return an object with error message if email is null", async () => {
      const body = { username: "aku", email: "", password: "aku12345" };
      const response = await request(app).post("/register").send(body);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });
  });

  describe("POST /register - fail", () => {
    it("should be return an object with error message if password is null", async () => {
      const body = { username: "aku", email: "aku@gmail.com", password: "" };
      const response = await request(app).post("/register").send(body);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });
  });

  describe("POST /register - fail", () => {
    it("should be return an object with error message if password less than 8 characters", async () => {
      const body = { username: "aku", email: "aku@gmail.com", password: "aku" };
      const response = await request(app).post("/register").send(body);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });
  });
});

// Login Admin
describe("POST /login", () => {
  describe("POST /login - succeed", () => {
    it("should be return an object with succeed message", async () => {
      const body = { email: "admin@gmail.com", password: "admin321" };
      const response = await request(app).post("/login").send(body);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("access_token1", expect.any(String));
    });
  });

  describe("POST /login - fail", () => {
    it("shouldbe return an object with error message if email is null", async () => {
      const body = { email: "", password: "admin321" };
      const response = await request(app).post("/login").send(body);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });
  });

  describe("POST /login - fail", () => {
    it("should be return an object with error message if password is null", async () => {
      const body = { email: "admin@gmail.com", password: "" };
      const response = await request(app).post("/login").send(body);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });
  });

  describe("POST /login - fail", () => {
    it("should be return an object with error message if the email is incorrect", async () => {
      const body = { email: "qwerty@gmail.com", password: "admin321" };
      const response = await request(app).post("/login").send(body);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });
  });

  describe("POST /login - fail", () => {
    it("should be return an object with error message if the password is incorrect", async () => {
      const body = { email: "admin@gmail.com", passsword: "qwertyuiop" };
      const response = await request(app).post("/login").send(body);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });
  });
});

//Login User
describe("POST /login", () => {
  describe("POST /login - succeed", () => {
    it("should be return an object with succeed message", async () => {
      const body = { email: "razan@gmail.com", password: "razan123" };
      const response = await request(app).post("/login").send(body);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("access_token2", expect.any(String));
    });
  });

  describe("POST /login - fail", () => {
    it("shouldbe return an object with error message if email is null", async () => {
      const body = { email: "", password: "razan123" };
      const response = await request(app).post("/login").send(body);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });
  });

  describe("POST /login - fail", () => {
    it("should be return an object with error message if password is null", async () => {
      const body = { email: "razan@gmail.com", password: "" };
      const response = await request(app).post("/login").send(body);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });
  });

  describe("POST /login - fail", () => {
    it("should be return an object with error message if the email is incorrect", async () => {
      const body = { email: "qwerty@gmail.com", password: "razan123" };
      const response = await request(app).post("/login").send(body);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });
  });

  describe("POST /login - fail", () => {
    it("should be return an object with error message if the password is incorrect", async () => {
      const body = { email: "razan@gmail.com", passsword: "qwertyuiop" };
      const response = await request(app).post("/login").send(body);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });
  });
});
