
const userCont=require('../Controller/User')

const express=require('express')


const router=express.Router()


router.post("/signUp", userCont.postSignUp);
router.post("/login", userCont.postLogin);



module.exports=router;