const express = require("express");
const router = express.Router();

//Importing Routes
const Category = require("./router/categories")
const Task = require("./router/tasks")


//Importing Tables
const Categories = require("./Models/Categories")
const Tasks = require("./Models/Tasks")




//Joining Table

Tasks.belongsTo(Categories);
Categories.hasMany(Tasks)

//Categories Routes
router.get("/getcategories" , Category.getTables)
router.post("/createcategory" , Category.createTable)
router.put("/updatecategory/:id" , Category.updateTable)
router.put("/category/updateposition/:id" , Category.updateTablePosition)
router.delete("/deletecategory/:id" , Category.deleteTable)

//Tasks Routes
router.get("/gettasks" , Task.getTables)
router.post("/createtask" , Task.createTable)
router.put("/task/updateposition/:id" , Task.updateTablePosition)
router.put("/updatetask/:id" , Task.updateTable)
router.delete("/deletetask/:id" , Task.deleteTable)
router.post("/findfromquery" , Task.findFromQuery)






module.exports = router;