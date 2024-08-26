const express = require("express");
const Controller = require("../controllers/controller");
const errorHandler = require("../middlewares/errorHandler");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");
const router = express.Router();

router.get("/", Controller.template);
router.post("/register", Controller.register);
router.post("/login", Controller.login);
router.use(authentication);
router.get("/heros", Controller.getHeros);
router.get("/myheros/", Controller.getAllMyHeros);
router.get("/myheros/:id", Controller.getMyHerosById);
router.post("/myheros/:heroId", Controller.postMyHeros);
router.post("/myheros/:heroId", Controller.postMyHeros);
router.put("/myheros/:id", authorization, Controller.putMyHeros);
router.delete("/myheros/:id", authorization, Controller.putMyHeros);
router.use(errorHandler);

module.exports = router;