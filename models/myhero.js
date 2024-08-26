"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class MyHero extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            MyHero.belongsTo(models.Hero, { foreignKey: "HeroId" });
            MyHero.belongsTo(models.User, { foreignKey: "UserId" });
        }
    }
    MyHero.init({
        UserId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "UserId is required",
                },
                notEmpty: {
                    msg: "UserId is required",
                },
            },
        },
        HeroId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "HeroId is required",
                },
                notEmpty: {
                    msg: "HeroId is required",
                },
            },
        },
        match: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: "Unplayed",
        },
    }, {
        sequelize,
        modelName: "MyHero",
    });
    return MyHero;
};