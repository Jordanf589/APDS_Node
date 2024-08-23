const express = require('express')

const {loginUser, signupUser, logoutUser} = require ('../controllers/userController')


//create instance of router
const router = express.Router()


//bruteforce attacks prevention
const expressBrute = require('express-brute') //npm install express-brute
const store = new expressBrute.MemoryStore();
const bruteForce = new expressBrute(store, {
    freeRetries: 5,
    minWait: 1000 *60,
    maxWait: 1000 * 60 * 10,
    lifetime: 1000 * 60 * 10,
});

//login
router.post('/login', bruteForce.prevent, loginUser)

//signup
router.post('/signupUser', signupUser)

router.post('/logoutUser', logoutUser)

module.exports = router