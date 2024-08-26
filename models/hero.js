"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Hero extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Hero.hasMany(models.MyHero, { foreignKey: "HeroId" });
        }
    }
    Hero.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "name is required",
                },
                notEmpty: {
                    msg: "name is required",
                },
            },
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "image Url is required",
                },
                notEmpty: {
                    msg: "image Url is required",
                },
            },
        },
        typeUrl: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "typeUrl is required",
                },
                notEmpty: {
                    msg: "typeUrl is required",
                },
            },
        },
    }, {
        sequelize,
        modelName: "Hero",
    });
    return Hero;
};