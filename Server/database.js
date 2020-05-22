const Sequelize = require("sequelize");

 
// const db = new Sequelize("amvapp", "rishab", "123456789", {
//  host: "postgresql-9165-0.cloudclusters.net",
//  dialect: "postgres",
//  port: 9165
// });

const db = new Sequelize("trello", "postgres", "a891330011RT1", {
    host: "localhost",
    dialect: "postgres"
   });
    





module.exports = db;