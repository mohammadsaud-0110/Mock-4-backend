const express = require("express");
const cors = require("cors");
const { connection } = require("mongoose");
const userRouter = require("./routes/user.route");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req,res) => {
    try {
        res.status(200).send({ ok : true, "msg" : "Default Route" });
    }
    catch (error) {
        res.status(500).send({ ok : false, "msg" : error.message });
    }
})

app.use("/user", userRouter);

app.listen(process.env.PORT, async () => {
    try {
        await connection;
        console.log("DB connected");
        console.log("Server port :",process.env.PORT);   
    }
    catch (error) {
        console.log("Error :", error);   
    }
})