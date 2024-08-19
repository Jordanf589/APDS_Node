const express = require('express')
const {createBook, getBooks, getBook, deleteBook, updateBook} = require ('../controllers/bookController')


//create instance of router
const router = express.Router()


//create handler
//router.get('/', () => {})

    //these are handlers for all our routes to simplyfy and clear code, we separate db logic from our route

//get all books
router.get('/', getBooks)

//get one book
router.get('/:id', getBook)

//add new book
router.post('/', createBook)

//delete a specific book
router.delete('/:id', deleteBook)

//update a specific book
router.patch('/:id', updateBook)

module.exports = router