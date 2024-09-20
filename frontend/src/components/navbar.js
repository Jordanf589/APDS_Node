import {Link} from "react-router-dom"
import {useLogout} from "../hooks/useLogout"
import { useAuthContext } from "../hooks/useAuthContext"

const NavBar =()=>{

    const {logout} = useLogout()
    const {user} = useAuthContext()
    const handleClick = () => {
        logout()
    }

    return(
        <header>
            <div className="container">
                <Link to = "/">
                    <h1>Library</h1>
                </Link>
                <nav>
                {user &&( //if we do have a user logged in, we will see this
                    <div>
                        <button onClick={handleClick}>Logout</button>
                    </div>
                )}

                {!user && ( //if we do not have a user logged in we will see this
                    <Link to = "/login">
                        <h1>Login</h1>
                    </Link>
                )}
                </nav>
            </div>
        </header>
    )
}

export default NavBar