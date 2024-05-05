import express from 'express'
import User from '../models/user.js'

export const signUpUser = async (req , res)=>{
    const data = {
        name:req.body.username,
        password:req.body.password
    }
    if(data.password == req.body.confirmPassword){
const existingUser = await User.findOne({name:data.name})
if(existingUser){
    res.json('Username Already exist. Please enter different username')
}
else{
    const newUser = await User.insertMany(data)
    console.log(newUser)
    res.json('successfully created')

}
    }
    else{
        res.json('Password not match with ConfirmPassword')
        return
    }
}

export const loginUser = async (req,res)=>{
    const data = {
        name:req.body.username,
        password:req.body.password
    }
    const existingUser = await User.findOne({name:data.name})
    if(existingUser){
        if(data.password == existingUser.password){
            res.json({Msg:'successfully login', data:existingUser})
        }
        else{
            res.json('Invalid Password')

        }

    }
    else{
        res.json('Invalid Username')
        
    }

}
const logoutUser = (req,res)=>{

}

