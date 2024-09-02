//define all constants 
const express = require('express')
const bookRoutes = require('./routes/books')
const userRouter = require('./routes/userRouter')
const mongoose = require('mongoose')
require('dotenv').config()
const https = require('https')
const path = require('path')
const fs = require('fs')
//const csrf = require('csurf')
//const cookieParser = require('cookie-parser')

//creating express app
const app = express()

//setting up routes
//app.get('/', (req, res) => {
//    res.json({msg: 'Testing 123- just being silly'})
//})

//middleware
app.use(express.json());
//app.use(cookieParser())

//setup csrf middleware
// app.use(csrf({
//     cookie:{
//         httpOnly: true,
//         secure: process.env.NODE_ENV === 'production',
//         sameSite: 'Lax',
//     }
// }))

//we need to update our api to use CSRF token since we dont have a login yet we create a call
// app.get('/api/csrf-token', (req, res) =>{
//     res.json({csrfToken: req.csrfToken()})
// })

// //middleware to expose CSRF token in response 
// app.use((req, res, next) => {
//     res.locals.csrfToken = req.csrfToken()
//     console.log(req.path, req.method)
//     next()
// })

//getting the route handler
app.use('/api/books', bookRoutes)
app.use('/api/user', userRouter)

//creating ssl server
const sslServer = https.createServer({
    key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))
}, app)

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    //listening for request
sslServer.listen(process.env.PORT, () => {
    console.log('HTTPS server now running on port 3000')
})

})
.catch((error) =>{
    console.log(error)
})




