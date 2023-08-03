const login = require("../Controllers/Login.controller.js");
const GameRouter = require("./game.js");
const PlayerRouter = require("./player.js");
const History = require("./history.js");
const app = require("express");
const dataImg = require("../Controllers/Upload.controller.js");
const router = app.Router();
const multer = require("multer");
const upload = multer({ dest: "/public/images" });

router.use("/players", PlayerRouter);
router.use("/games", GameRouter);
router.use("/history", History);

// login handler
router.post("/auth/login", login);

// upload router
router.post("/upload", upload.single("data-binary"), dataImg.uploadImage);

module.exports = router;
