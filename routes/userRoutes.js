const router = require("express").Router(),
    userController = require("../controllers/userController"),
    postController = require("../controllers/postController")



// user routing
router.get("", userController.indexView);
router.get("/login", userController.login);
router.post("/login", userController.authenticate);
router.get("/logout", userController.logout, userController.redirectView);



router.get("/signup", userController.new);
router.post("/create", userController.validate, userController.create, userController.authenticate, userController.redirectView);
//router.post("/create", userController.validate, userController.create, userController.redirectView);
router.get("/forgotPassword", userController.forgotPassword);
router.get("/profileSettings", userController.showUnfinished);
router.get("/home", postController.index, userController.showHome);
router.get("/profilePage", userController.showProfileSettings);
router.get("/allUsers", userController.AllUsers, userController.showAllUsers);
router.get("/securityQuestions", userController.showSecurityQuestions);
router.post("/checkSecurityQuestion", userController.checkSecurityQuestions, userController.redirectView);
router.get("/changePassword", userController.showChangePassword);

router.post("/search", userController.searchUsers, userController.showAllUsers);

router.get("/:username/following", userController.showFollowing, userController.showAllUsers);
router.get("/:username/followers", userController.showFollowers, userController.showAllUsers);


router.post("/:id/follow",userController.follow);
router.post("/:id/unfollow",userController.unfollow);


router.put("/:id/update", userController.update, userController.validateEdit, userController.redirectView);
router.put("/:id/updatepassword", userController.updatePassword, userController.redirectView);
router.get("/:username/Profile", userController.show, postController.indexByUsername, userController.showProfile);

module.exports = router;