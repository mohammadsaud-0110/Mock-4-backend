const express = require("express");
const bcrypt = require('bcrypt');
const { UserModel } = require("../models/user.model");

const userRouter = express.Router();
userRouter.use(express.json());

userRouter.get("/", async (req,res) => {
    try {
        const allUsers = await UserModel.find();
        res.status(200).send({ ok : true, "msg" : "All Users", data: allUsers });
    }
    catch (error) {
        res.status(500).send({ ok : false, "msg" : error.message });
    }
})

userRouter.post("/register", async (req,res) => {
    try {
        const {name,email,password,address} = req.body;
        // const isPresent = await UserModel.findOne({email});
        // if(isPresent){
        //     res.status(200).send({ ok : true, "msg" : "Users already present" });
        // }
        // else{
            bcrypt.hash(password, 3, async (err, hash) => {
                if(err){
                    res.status(500).send({ ok : false, "msg" : err.message });
                }
                else{
                    const newUser = new UserModel({name,email,password:hash,address});
                    await newUser.save();
                    // res.status(201).send({ ok : true, "msg" : "User Registered Successfully" });
                    res.send(newUser)
                }
            });
        // }
    }
    catch (error) {
        res.status(500).send({ ok : false, "msg" : error.message });
    }
})

userRouter.post("/login", async (req,res) => {
    try {
        let {email,password} = req.body;
        const isPresent = await UserModel.findOne({email});
        if(isPresent){
            bcrypt.compare(password, isPresent.password, function(err, result) {
                if(result){
                    res.send("login good")
                }
                else if(result == false){
                    res.send("wrong password")
                }
                else{
                    res.status(500).send({ ok : false, "msg" : err.message });
                }
            });
        }
        else{
            res.status(200).send({ ok : true, "msg" : "User Not Found"});
        }
    }
    catch (error) {
        res.status(500).send({ ok : false, "msg" : error.message });
    }
})

module.exports = userRouter;