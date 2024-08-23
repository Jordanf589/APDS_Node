const BookDetails = ({book, deleteBook}) =>{
    const handleClick = () =>{
        deleteBook(book._id)
    }
return(
    <div className="book-details">
        <h2>{book.title}</h2>
        <p><strong>Author: </strong>{book.author}</p>
        <p><strong>Quantity: </strong>{book.quantity}</p>
        <p>{book.createdAt}</p>
        <span onClick={handleClick}>Delete</span>
    </div>
)
}

export default BookDetails