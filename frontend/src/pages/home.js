import {Link} from 'react-router-dom'
const NavBar = () =>{
    return(
        <header>
            <div className="container">
                <Link to = "/">
                <h1>Library</h1>
                </Link>
            </div>
        </header>
    )
}