"use strict";
const fs = require("fs");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        let data = JSON.parse(fs.readFileSync("./data/heros.json", "utf-8")).map(
            (el) => {
                el.updatedAt = el.createdAt = new Date();
                return el;
            }
        );
        await queryInterface.bulkInsert("Heros", data, {});
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete("Heros", null, {});
    },
};