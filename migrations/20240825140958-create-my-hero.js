"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("MyHeros", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            UserId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Users",
                    key: "id",
                },
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            },
            HeroId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Heros",
                    key: "id",
                },
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            },
            match: {
                type: Sequelize.INTEGER,
            },
            status: {
                type: Sequelize.STRING,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("MyHeros");
    },
};