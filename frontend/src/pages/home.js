import { useEffect, useState } from "react"
import BookDetails from "../components/BookDetails"
import BookForm from "../components/BookForm"

const Home = () =>{
    const [books, setBooks] = useState(null)
    useEffect(() =>{
        const fetchBooks = async() =>{
            const response = await fetch('/api/books/')
            const json = await response.json()

            if(response.ok){
                setBooks(json)
            }
        }
        fetchBooks()
    }, [])

    //deleting a book
    const deleteBook = async(id) =>{
        const response = await fetch('/api/books/' + id, {
            method: 'DELETE'

        })
        //const json = await response.json()
        if(response.ok){
            setBooks(books.filter(book => book._id !== id))
        }
    }

    return (
        <div className ="Home">
            <div className="books">
                {books && books.map((book) =>(
                    <BookDetails key={book._id} book = {book} deleteBook={deleteBook}/>
                    //<p key ={book._id}>{book.title}</p>
                ))}
            </div>
            <BookForm/>
        </div>
    )
}

export default Home