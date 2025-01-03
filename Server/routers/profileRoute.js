const ProfileController = require("../controllers/profileController");
const upload = require("../helpers/multer");
const router = require("express").Router();
const middlewaresUpload = upload.single("file");

router.get("/:userId", ProfileController.showProfile);
router.post("/:userId", middlewaresUpload, ProfileController.updateProfile);

module.exports = router;
