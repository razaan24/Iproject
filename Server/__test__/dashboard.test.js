const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { hash } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");

let accessTokenAdmin,
  accessTokenUser,
  accessTokenAdminFail,
  accessTokenUserFail;
beforeAll(async () => {
  const users = require("../data/users.json");
  users.forEach((user) => {
    user.password = hash(user.password);
    user.updatedAt = user.createdAt = new Date();
  });

  const profiles = require("../data/profiles.json");
  profiles.forEach((profile) => {
    profile.updatedAt = profile.createdAt = new Date();
  });

  const categories = require("../data/category.json");
  categories.forEach((category) => {
    category.updatedAt = category.createdAt = new Date();
  });

  const dashboards = require("../data/dashboards.json");
  dashboards.forEach((dashboard) => {
    dashboard.updatedAt = dashboard.createdAt = new Date();
  });

  await queryInterface.bulkInsert("Users", users, {});
  await queryInterface.bulkInsert("Profiles", profiles, {});
  await queryInterface.bulkInsert("Categories", categories, {});
  await queryInterface.bulkInsert("Dashboards", dashboards, {});

  const Admin = {
    id: 1,
    email: `admin@gmail.com`,
    role: "Admin",
  };

  const User = {
    id: 2,
    email: "razan@gmail.com",
    role: "User",
  };

  const AdminFail = {
    id: 3,
    email: "adminfail@gmail.com",
    role: "Admin",
  };

  const UserFail = {
    id: 7,
    email: "userfail@gmail.com",
    role: "User",
  };

  accessTokenAdmin = signToken(Admin);
  accessTokenUser = signToken(User);

  accessTokenAdminFail = signToken(AdminFail);
  accessTokenUserFail = signToken(UserFail);
});

afterAll(async () => {
  await queryInterface.bulkDelete("Users", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await queryInterface.bulkDelete("Profiles", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await queryInterface.bulkDelete("Categories", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await queryInterface.bulkDelete("Dashboards", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});
