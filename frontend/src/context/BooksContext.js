import {createContext, useReducer} from 'react'

export const BooksContext = createContext()

export const booksReducer = (state, action) => {
    switch(action.type){
        case 'SET_BOOK':
            return{
                books: action.payload
            }
        case 'CREATE_BOOK':
            return{
                books: [action.payload, ...state.books]
            }
            //implement delete book
        case 'DELETE_BOOK':
            return{
                books: state.books.filter((b) => b._id !== action.payload._id)
            }
            default:
                return state
    }
}

export const BooksContextProvider = ({ children }) => {
    const  [state, dispatch] = useReducer(booksReducer, {
        books: []
    })
    return (
        <BooksContext.Provider value ={{...state, dispatch}}>
            {children}
        </BooksContext.Provider>
    )
}
