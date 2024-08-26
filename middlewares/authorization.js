const { User, MyHero, Heros } = require("../models");

const authorization = async (req, res, next) => {
  try {
    let { id } = req.params;
    // console.log(id, "ini id");
    let dataMyHeros = await MyHero.findOne({
      where: {
        id: id,
      },
    });
    console.log("dataMyHeros: ", dataMyHeros);

    if (!dataMyHeros)
      throw { name: "-", status: 404, message: "MyHero not found" };
    let dataDb = dataMyHeros.UserId;
    // console.log("dataDb: ", dataDb);
    let session = req.user.id;
    // console.log("session: ", session);
    if (session !== dataDb) {
      throw { name: "-", status: 403, message: "You're not authorized" };
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authorization;
