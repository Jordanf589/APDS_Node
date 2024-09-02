import { useState } from "react"
import { useBooksContext } from "../hooks/useBooksContext"

const BookForm = () => {

    const {dispatch} = useBooksContext()
    const[title, setTitle] = useState('')
    const[author, setAuthor] = useState('')
    const[quantity, setQuantity] = useState('')
    const[error, setError] = useState(null)

    const handleSubmit = async(e) =>{
        e.preventDefault() //default action is to refresh the page on submit, we do not want that

        const book = {title, author, quantity}

        const response = await fetch('api/books', {
            method: 'POST',
            body: JSON.stringify(book), //converting our book to JSON
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()

        if(!response.ok){
            setError(json.error)
        }

        if(response.ok){
            setTitle('')
            setAuthor('')
            setQuantity('')

            setError(null)
            console.log("New book added", json)
            dispatch({type: 'CREATE_BOOK', payload: json})
        }
    }

    return(
        <form className = 'create' onSubmit={handleSubmit}>
            <h3>Add new book</h3>

            <label>Book Title: </label>
            <input
                type = 'text'
                onChange={(e) => setTitle(e.target.value)} //e is event
                value = {title}/>

            <label>Book Quantity: </label>
            <input
                type = 'number'
                onChange={(e) => setQuantity(e.target.value)}
                value = {quantity}/>

            <label>Book Author: </label>
            <input
                type = 'text'
                onChange={(e) => setAuthor(e.target.value)}
                value = {author}/>

            <button>Add Book</button>
            {error && <div className='error'>{error}</div>} 
        </form>
    )
}

export default BookForm