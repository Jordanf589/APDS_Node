import { useEffect} from "react"
import BookDetails from "../components/BookDetails"
import BookForm from "../components/BookForm"
import { useBooksContext } from "../hooks/useBooksContext"

const Home = () =>{
    const{books, dispatch} = useBooksContext()
    useEffect(() =>{
        const fetchBooks = async() =>{
            const response = await fetch('/api/books/')
            const json = await response.json()

            if(response.ok){
                dispatch({type:'SET_BOOK', payload: json})
            }
        }
        fetchBooks()
    }, [dispatch])

    return (
        <div className ="Home">
            <div className="books">
                {books && books.map((book) =>(
                    <BookDetails key={book._id} book = {book} />
                    //<p key ={book._id}>{book.title}</p>
                ))}
            </div>
            <BookForm/>
        </div>
    )
}

export default Home