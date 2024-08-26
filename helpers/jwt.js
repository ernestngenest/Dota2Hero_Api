var { sign, verify } = require("jsonwebtoken");
const secret = "rahasia";
module.exports = {
    signToken: (payload) => sign(payload, secret),
    verifyToken: (token) => verify(token, secret),
};