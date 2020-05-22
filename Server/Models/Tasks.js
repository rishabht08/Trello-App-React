const db = require("../database");
const Sequelize = require("sequelize");

const Tasks = db.define("tasks", {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue:Sequelize.UUIDV1,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {

      notEmpty: true
    }
  },

  status: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {

      notEmpty: true
    }
  },
  position: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false
  },

  category_id:{
    type:Sequelize.UUID,
    references: {         
      model: 'categories',
      key: 'id'
    }
  },

},
  {
    timestamps: true,
    underscored: true
  });


db.sync()

module.exports = Tasks



