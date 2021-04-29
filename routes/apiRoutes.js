const router = require("express").Router(),
    userController = require("../controllers/userController"),
    postController = require("../controllers/postController");

router.get("/home", postController.index, userController.showHome);

router.post("/follow", userController.)

module.exports = router;

