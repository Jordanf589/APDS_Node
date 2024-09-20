import { useBooksContext } from "../hooks/useBooksContext"
import formatDistanceToNow from "date-fns/formatDistanceToNow"

const BookDetails = ({book}) =>{
    const{dispatch} = useBooksContext()
    const handleClick = async() =>{
        const response = await fetch('/api/books/' + book._id, {
            method: 'DELETE'
        })
        const json = await response.json()
        if(response.ok){
            dispatch({type:'DELETE_BOOK', payload: json})
        }
        if(response.ok){
            const response2 = await fetch('/api/books')
            const json2 = await response2.json()
            if(response2.ok){
                dispatch({type:'SET_BOOK', payload: json2})
            }
        }
    }
return(
    <div className="book-details">
        <h2>{book.title}</h2>
        <p><strong>Author: </strong>{book.author}</p>
        <p><strong>Quantity: </strong>{book.quantity}</p>
        <span onClick={handleClick}>Delete</span> 
    </div>

    //Ma'am added an icon for the delete but lazy
)
}

export default BookDetails