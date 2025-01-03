const SaveController = require("../controllers/saveController");
const router = require("express").Router();

router.post("/", SaveController.add);
router.get("/", SaveController.read);
router.delete("/", SaveController.delete);

module.exports = router;
