const express=require("express")
const router=express.Router()
router.get("/",(req,res)=>{
    res.send("this is get post")
})
router.get("/:id",(req,res)=>{
    res.send("this is get post id")
})
router.post("/",(req,res)=>{
    res.send("this is post user")
})
router.delete("/:id",(req,res)=>{
    res.send("this is delete post")
})
module.exports=router