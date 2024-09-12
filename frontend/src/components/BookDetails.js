import { useBooksContext } from "../hooks/useBooksContext"

const BookDetails = ({book, deleteBook}) =>{
    const handleClick = () =>{
        const{books, dispatch} = useBooksContext()
        useEffect(() =>{
            const deleteBook = async() =>{
                const response = await fetch('/api/books/')
                const json = await response.json()
                if(response.ok){
                    dispatch({type:'DELETE_BOOK', payload: json})
                }
            }
            deleteBook()
        }, [dispatch])
    }
return(
    <div className="book-details">
        <h2>{book.title}</h2>
        <p><strong>Author: </strong>{book.author}</p>
        <p><strong>Quantity: </strong>{book.quantity}</p>
        <p>{book.createdAt}</p>
        <span onClick={handleClick}>Delete</span> 
    </div>

    //Ma'am added an icon for the delete but lazy
)
}

export default BookDetails