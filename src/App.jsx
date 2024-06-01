import './App.css' 
import Authpage from './pages/authpage';
import Homepage from './pages/homepage'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() { 

  return (
    <> 
    <Router>
        <Routes>
            <Route path='/' exact element={<Authpage/>}></Route>
            <Route path='/homepage' exact element={<Homepage/>}></Route>
        </Routes>
    </Router> 
    </>
  )
}

export default App
