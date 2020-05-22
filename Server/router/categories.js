

const Category = {};
const Categories = require("../Models/Categories");
const Tasks = require("../Models/Tasks")
const Sequelize = require("sequelize");

Category.getTables = async (req, res) => {
    const offset = req.query.pageSize * req.query.page;
    const limit = req.query.pageSize;

    try {
        // Slect * from table;
        // select name from table;
        // let tables = await 
        Categories.findAll({
            limit,
            offset,
            include: [
                {
                    model: Tasks
                },

            ],
            order: [
                [Tasks, 'position', 'ASC']
            ],
            order: [
                ['position', 'ASC']
            ]
        }).then(categories => {




            const resObj = categories.map(category => {



                //tidy up the user data
                return Object.assign(
                    {},
                    {
                        id: category.id,
                        name: category.name,
                        position: category.position,
                        tasks: category.tasks



                    })
            }
            )
          Categories.count().then(resp=>{
            res.json({ data: resObj, count: resp})

          })

    

        });

        



        // res.send(tables);


    }
    catch (error) {
        console.log(error);
    }


}



Category.createTable = async (req, res) => {

    try {
        const { body } = req;
        let category = {
            name: body.name,


        }
        let table = await Categories.create(category);
        if (table) {

            return res.send({
                status: true,
                data: table
            })
        }
        else {
            res.send({
                status: false,
            })
        }

    } catch (error) {

        res.send({
            status: false,
            data: error.errors[0].message
        });

    }
}

Category.updateTable = async (req, res) => {
    try {
        const { body, params } = req;

        let table = await Categories.update({ name: body.name }, { where: { id: params.id } });
        return res.send(table);
    } catch (error) {
        console.log(error);
    }
}

Category.updateTablePosition = async (req, res) => {
    try {
        const { body, params } = req;

        // update table set name = "Aditya" where id = 3 and name = "amit";
        let table = await Categories.update({ position: body.position }, { where: { id: params.id } });
        return res.send(table);
    } catch (error) {
        console.log(error);
    }
}

Category.deleteTable = async (req, res) => {
    try {
        const { params } = req;
        await Categories.destroy({ where: { id: params.id } });
        return res.send("Deleted successfully");
    } catch (error) {
        console.log(error);
    }
}

module.exports = Category;
