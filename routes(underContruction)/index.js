
const router = require("express").Router(),
userRoutes = require("./userRoutes"),
postRoutes = require("./postRoutes"),
homeRoutes = require("./homeRoutes"),
errorRoutes = require("./errorRoutes"),
apiRoutes = require("./apiRoutes");


router.use("/user", userRoutes);
router.use("/post", postRoutes);
router.use("/api", apiRoutes)
router.use("/", homeRoutes);
router.use("/", errorRoutes);

module.exports = router;