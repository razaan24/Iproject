const CategoryController = require("../controllers/categoryController");
const { authorization } = require("../middlewares/authorization");
const router = require("express").Router();

router.get("/", CategoryController.read);
router.post("/", authorization, CategoryController.add);
router.put("/:id", authorization, CategoryController.update);
router.delete("/:id", authorization, CategoryController.delete);

module.exports = router;
