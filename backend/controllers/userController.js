const User = require('../models/userModel')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken') //npm install jsonwebtoken
const brute = require('express-brute')//npm install express-brute

const createToken = (_id) => {
    jwt.sign({_id}, process.env.SECRET_KEY, {expiresIn: '3d'})
}
//login user
const loginUser = async (req, res) => {
    const {email, password} = req.body
    try{
        const user = await User.login(email, password)

        //after sign up
        const token = createToken(user._id)
        //store token in cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3 * 24 * 60 * 60 * 1000, //days, hours, minutes, seconds, millisecond
            //sameSite: 'Strict',
        })
        res.status(200).json({email})
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
}

//signup user
const signupUser = async (req, res) => {
    const{email, password} = req.body

    try{
        const user = await User.signup(email, password)

        //after sign up, but just before response from system
        const token = createToken(user._id)
        //store token in cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3 * 24 * 60 * 60 * 1000, //days, hours, minutes, seconds, millisecond
            //sameSite: 'Strict',
        })
        res.status(200).json({email})
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
}

const logoutUser = async (req, res) =>{
    //store token in cookie
    res.cookie('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expires: new Date(0), 
        //sameSite: 'Strict',
    })

    res.status(200).json({message: 'Logged out successfully'})
}

module.exports = {
    loginUser,
    signupUser,
    logoutUser
}