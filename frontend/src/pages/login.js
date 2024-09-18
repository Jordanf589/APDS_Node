import { useState} from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import {useLogin} from '../hooks/useLogin'

const Login = () =>{
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const{login, isLoading, error} = useLogin()
    const handleSubmit = async(e) =>{
        e.preventDefault()
        await login(email, password)
    }

    return (
        <form className = 'login' onSubmit={handleSubmit}>
        <h3>Login</h3>

        <label>Email: </label>
        <input
            type = 'email'
            onChange={(e) => setEmail(e.target.value)} //e is event
            value = {email}/>

        <label>Password: </label>
        <input
            type = 'password'
            onChange={(e) => setPassword(e.target.value)}
            value = {password}/>
        <button disabled ={isLoading}>Login</button>
        {error && <div className = 'error'>{error}</div>}
    </form>
    )
}
//if the form is loading we need to disable the button
export default Login