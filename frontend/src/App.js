import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/home.js'
import Login from './pages/login.js'
import NavBar from './components/navbar.js'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <NavBar/>
        <div className='pages'>
          <Routes>
            <Route path = '/' element = {<Home/>}/>
            <Route path = '/login' element = {<Login/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
