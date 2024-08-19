const mongoose = require('mongoose')
const bcrypt = require('bcrypt') //npm install bcrypt
const validator = require('validator') //npm install validator

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }, 
    password: {
        type: String,
        required: true
    },

}, {timestamps: true})

//adding our own signup function
userSchema.statics.signup = async function(email, password){

    //validate if fields are actually filled
    if(!email || !password){
        throw Error('All fields must be filled')
    }

    //validate the email
    if(!validator.isEmail(email)){
        throw Error('Email invalid')
    }
    //validate the password 
    if(!validator.isStrongPassword(password)){
        throw Error('Password invalid')
    }
    //verify the user
    const existingUser = await this.findOne({email})
    if(existingUser){
        throw Error('Email already taken')
    }

    const salt = await bcrypt.genSalt(10) //dont want the salt to be too long cause it takes awhile to generate
    const hash = await bcrypt.hash(password, salt)
    const user = await this.create({email, password: hash})
    return user
}
userSchema.statics.login = async function(email, password){

    //validate if fields are actually filled
    if(!email || !password){
        throw Error('All fields must be filled')
    }

    //try to find the user, not just checking if it exists. if we cant find anyone then we throw an error
    const user = await this.findOne({email})

    if(!user){
        throw Error('Invalid email or password')
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match){
        throw Error('Incorrect email or password')
    }

    return user
}


module.exports = mongoose.model('User', userSchema)