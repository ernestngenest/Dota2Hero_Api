var { hashSync, compareSync } = require("bcryptjs");

module.exports = {
    hashPassword: (password) => hashSync(password, 8),
    comparePassword: (passsword, db_p) => compareSync(passsword, db_p),
};