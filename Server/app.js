const express = require("express");
const app = express();
const cors = require('cors')
const db = require("./database")
const router = require("./router");
const PORT = process.env.PORT || 6060

app.use(cors())

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});
app.use(express.json());
app.use("/", router);


app.listen(PORT, () => {
    db.authenticate()
        .then(() => {
            console.log("DB connection is established on port ", PORT);
        })
})

module.exports = app;

