import { BooksContext } from "../context/BooksContext";
import { useContext } from "react";

export const useBooksContext = () => {
    const context = useContext(BooksContext)

    if(!context){
        throw Error('useBooksContext must be inside a BooksContextProvider')
    }
    return context
}

//now everytime we want to use any book data, we can just invoke this hook 
//it will update our global context, instead of a local state