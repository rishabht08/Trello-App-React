const Task = {};

const Tasks = require("../Models/Tasks")

const Categories = require("../Models/Categories")
const Sequelize = require("sequelize");
Task.getTables = async (req, res) => {

    try {
     
        Tasks.findAll({
            include: [

                {
                    model: Categories
                }
            ]
        }).then(tasks => {
            const resObj = tasks.map(task => {


                //tidy up the video data
                console.log("categories", task)
                return Object.assign(
                    {},
                    {
                        id: tasks.id,
                        name: task.name,
                        status: task.status,
                        position: task.position,
                        category: task.category


                    })
            }
            )
            res.json(resObj)
        });


        // res.send(tables);
    } catch (error) {
        console.log(error);
    }

}



Task.findFromQuery = async (req, res) => {
    console.log("safsf", req.body.query)

    try {
        const { body } = req;
        Tasks.findAll({
            where: {

                name: {
                    [Sequelize.Op.iLike]: `%${body.query}%`
                }

            },
            include: [
                {
                    model: Categories
                }
            ]
        }).then(resp => {
            return res.send({
                data: resp
            })

        })





    }
    catch (error) {
        res.send({
            status: false,
            data: error

        })
    }
}

Task.createTable = async (req, res) => {

    try {
        const { body } = req;
        let task = {

            name: body.name,
            status: body.status,
            "category_id": body["category_id"],

        }
        let table = await Tasks.create(task);
        res.send({
            status: true,
            data: table
        });
    } catch (error) {
        console.log(error);
        res.send({
            status: false,
            data: error.errors[0].message
        });
    }
}

Task.updateTablePosition = async (req, res) => {
    try {
        const { body, params } = req;
        console.log("ididdid", body.position, params.id)
        // update table set name = "Aditya" where id = 3 and name = "amit";
        let table = await Tasks.update({ position: body.position }, { where: { id: params.id } });
        return res.send(table);
    } catch (error) {
        console.log(error);
    }
}

Task.updateTable = async (req, res) => {
    try {
        const { body, params } = req;

        let table = await Tasks.update({ name: body.name, status: body.status }, { where: { id: params.id } });
        return res.send(table);
    } catch (error) {
        console.log(error);
    }
}

Task.deleteTable = async (req, res) => {
    try {
        const { params } = req;
        await Tasks.destroy({ where: { id: params.id } });
        return res.send("Deleted successfully");
    } catch (error) {
        console.log(error);
    }
}

module.exports = Task;
