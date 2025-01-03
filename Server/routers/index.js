const router = require("express").Router();
const UserController = require("../controllers/userController");
const authentication = require("../middlewares/authentication");
const { admin } = require("../middlewares/authorization");
const errorHandler = require("../middlewares/errorHandler");
const dashboardRoute = require("./dashboardRoute");
const categoryRoute = require("./categoryRoute");
const profileRoute = require("./profileRoute");
const saveRoute = require("./saveRoute");
const AiController = require("../controllers/AiController");

router.post("/login", UserController.login);
router.post("/google-login", UserController.googleLogin);
router.post("/register", UserController.register);
router.post("/AI", AiController.chatbot);

router.use(authentication);
router.use("/dashboards", dashboardRoute);
router.use("/categories", categoryRoute);
router.use("/account", profileRoute);
router.use("/saved", saveRoute);

router.use(errorHandler);

module.exports = router;
