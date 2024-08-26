const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");
let authentication = async(req, res, next) => {
    try {
        const access_token = req.headers.authorization;
        // console.log(access_token, "ini acces");
        if (!access_token)
            throw { name: "-", status: 401, message: "Invalid email/password" };
        let [Bearer, token] = access_token.split(" ");
        if (Bearer !== "Bearer")
            throw { name: "-", status: 401, message: "Invalid email/password" };
        const payload = verifyToken(token);
        const user = await User.findByPk(payload.id);
        if (!user)
            throw { name: "-", status: 401, message: "Invalid email/password" };

        req.user = {
            id: payload.id,
        };

        next();
    } catch (error) {
        next(error);
    }
};
module.exports = authentication;