const router = require("express").Router(),
    postController = require("../controllers/postController"),
    userController = require("../controllers/userController");

router.post("/:id/create", postController.create, userController.redirectView);
router.delete("/:id/delete", postController.delete, postController.redirectView);

module.exports = router;