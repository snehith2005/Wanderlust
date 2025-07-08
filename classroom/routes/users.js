const express=require("express")
const { route } = require("./post")
const router=express.Router()
router.get("/",(req,res)=>{
    res.send("this is get user")
})
router.get("/:id",(req,res)=>{
    res.send("this is get user id")
})
router.post("/",(req,res)=>{
    res.send("this is post user")
})
router.delete("/:id",(req,res)=>{
    res.send("this is delete user")
})
module.exports=router