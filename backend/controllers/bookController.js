const Book = require('../models/bookModel')
const mongoose = require('mongoose')

//get all books
const getBooks = async(req, res) => {
    const books = await Book.find({}).sort({createdAt: -1})
    res.status(200).json(books)
}

//create new book
const createBook = async (req, res) =>{
    const{title, author, quantity} = req.body
    //add document to the database
    try{
        const book = await Book.create({title, author, quantity})
        res.status(200).json(book)
    }
    catch(error){
        res.status(404).json({error: error.message})
    }
}

//get a single book
const getBook = async (req, res) =>{
    const{id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'Invalid id'})
    }
    const book = await Book.findById(id)

    if(!book){
        return res.status(404).json({error: 'Couldnt find the book'})
    }

    res.status(200).json({book})
}

//delete a book
const deleteBook = async (req, res) => {
    const{id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'Invalid id'})
    }
    const book = await Book.findOneAndDelete({_id: id})
    if(!book){
        return res.status(404).json({error: 'No book found'})
    }

    res.status(200).json({book})
}

//update the book
const updateBook = async (req, res) =>{
    const{id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'Invalid id'})
    }
    const {title, author, quantity} = req.body

    // find the book using the ID
    const book = await Book.findByIdAndUpdate(id, { title, author, quantity }, { new: true })
    if (!book) {
        // return a not found error if the book is not found
        return res.status(404).json({ error: 'No book with matching ID' })
    } else {
        // return the book
        res.status(418).json(book)
    }
}

module.exports = {
    getBooks,
    createBook,
    updateBook,
    deleteBook,
    getBook
}