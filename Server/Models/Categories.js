const db = require("../database");
const Sequelize = require("sequelize");

const Categories = db.define("categories", {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue:Sequelize.UUIDV1,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull:false,
    validate:{
      
      notEmpty: true
    }
  },

  position:{
    type: Sequelize.INTEGER,
    autoIncrement:true,
    allowNull:false
  }

}, 
 {
  timestamps: false,
  underscored: true
});


db.sync()

module.exports = Categories

