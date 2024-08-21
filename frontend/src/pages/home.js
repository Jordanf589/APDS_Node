import { useEffect, useState } from "react"
import BookDetails from "../components/BookDetails"

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


    return (
        <div className ="Home">
            <div className="books">
                {books && books.map((book) =>(
                    <BookDetails key={book._id} book = {book}/>
                    //<p key ={book._id}>{book.title}</p>
                ))}
            </div>
        </div>
    )
}

export default Home