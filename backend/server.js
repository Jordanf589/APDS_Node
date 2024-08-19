//define all constants 
const express = require('express')
const bookRoutes = require('./routes/books')
const userRouter = require('./routes/userRouter')
const mongoose = require('mongoose')
require('dotenv').config()

//creating express package
const app = express()

//setting up routes
//app.get('/', (req, res) => {
//    res.json({msg: 'Testing 123- just being silly'})
//})

//sanitize json requests
app.use(express.json());

//getting the route handler
app.use('/api/books', bookRoutes)
app.use('/api/user', userRouter)

//middleware
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    //listening for request
app.listen(process.env.PORT, () => {
    console.log('Connected successfully on port 3000')
})

})
.catch((error) =>{
    console.log(error)
})




