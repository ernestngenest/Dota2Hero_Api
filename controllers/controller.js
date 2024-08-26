const { Op, where } = require("sequelize");
const { Hero, User, MyHero } = require("../models");
const {
  withSqliteForeignKeysOff,
} = require("sequelize/lib/dialects/sqlite/sqlite-utils");
const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");

class Controller {
  static async template(req, res, next) {
    try {
      res.send("hello");
    } catch (error) {
      next(error);
    }
  }
  static async register(req, res, next) {
    try {
      // console.log(req.body);
      const { email, password } = req.body;
      if (!email)
        throw { name: "-", status: 400, message: "Email is required" };
      if (!password)
        throw { name: "-", status: 400, message: "Password is required" };
      let emailData = await User.findOne({
        where: {
          email: {
            [Op.iLike]: `${email}`,
          },
        },
      });
      if (emailData)
        throw { name: "-", status: 400, message: "Email must be unique" };
      let data = await User.create({
        email,
        password,
      });

      res.status(201).json({
        id: data.id,
        email: data.email,
      });
    } catch (error) {
      next(error);
      // res.send(error);
    }
  }
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email)
        throw { name: "-", status: 400, message: "Email is required" };
      if (!password)
        throw { name: "-", status: 400, message: "Password is required" };
      let dataEmail = await User.findOne({
        where: {
          email: {
            [Op.iLike]: email,
          },
        },
      });
      if (!dataEmail)
        throw { name: "-", status: 400, message: "Invalid email/password" };
      const valid = comparePassword(password, dataEmail.password);
      if (valid) {
        res.status(200).json({
          acces_token: signToken({ id: dataEmail.id }),
        });
      } else {
        throw {
          name: "-",
          status: 400,
          message: "Invalid email/password",
        };
      }
    } catch (error) {
      next(error);
      // res.send(error);
    }
  }

  static async getHeros(req, res, next) {
    try {
      let data = await Hero.findAll();
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async postMyHeros(req, res, next) {
    try {
      // console.log(req.params, "ini params");
      const { heroId } = req.params;
      let dataHeros = await Hero.findByPk(heroId);
      // console.log(dataHeros, "ini dataHeros");
      // console.log(req.user.id, "ini session");
      if (!dataHeros)
        throw { name: "-", status: 404, message: "Hero not found" };
      let data = await MyHero.create({
        UserId: req.user.id,
        HeroId: heroId,
      });
      const { id, UserId, HeroId } = data;
      res.status(201).json({
        id,
        UserId,
        HeroId,
        status: data.status,
        match: data.match,
      });
    } catch (error) {
      next(error);
    }
  }
  static async getMyHerosById(req, res, next) {
    try {
      const { id } = req.params;
      let data = await MyHero.findByPk(id);
      if (!data) throw { name: "-", status: 404, message: "Hero not found" };
      const { UserId, HeroId, status, match } = data;
      res.status(201).json({
        id: data.id,
        UserId,
        HeroId,
        status,
        match,
      });
    } catch (error) {
      next(error);
    }
  }
  static async getAllMyHeros(req, res, next) {
    try {
      let data = await MyHero.findAll({
        include: [
          {
            model: Hero,
            key: "HeroId",
            attributes: {
              include: ["name", "imageUrl", "typeUrl"],
            },
          },
        ],
      });
      console.log(data, "ini data");
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async putMyHeros(req, res, next) {
    try {
      let { id } = req.params;
      let { match, status } = req.body;
      if (!match)
        throw { name: "-", status: 400, message: "Match cannot be empty" };
      if (!status)
        throw { name: "-", status: 400, message: "Status cannot be empty" };
      let dataMyHeros = await MyHero.findByPk(id);
      if (!dataMyHeros)
        throw { name: "-", status: 404, message: "Hero not found" };
      let data = await MyHero.update(
        {
          match,
          status,
        },
        {
          where: {
            id: id,
          },
        }
      );
      res.status(200).json({
        message: "Hero has been updated",
      });
    } catch (error) {
      next(error);
    }
  }
  static async deleteMyHeros(req, res, next) {
    try {
      let { id } = req.params;
      let data = await MyHero.findByPk(id);
      if (!data) throw { name: "-", status: 404, message: "Hero not found" };
      if (data.status === "played")
        throw {
          name: "-",
          status: 400,
          message: "Played Hero cannot be deleted",
        };
      await data.destroy();
      res.status(200).json({
        messasge: "Hero has been deleted",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
