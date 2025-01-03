const DashboardController = require("../controllers/dashboardController");
const upload = require("../helpers/multer");
const { authorization } = require("../middlewares/authorization");
const router = require("express").Router();
const middlewaresUpload = upload.single("file");

router.get("/", DashboardController.read);
router.get("/:id", DashboardController.readDetail);
router.post("/", authorization, middlewaresUpload, DashboardController.add);
router.put(
  "/:id",
  authorization,
  middlewaresUpload,
  DashboardController.update
);
router.delete("/:id", authorization, DashboardController.delete);

module.exports = router;
