import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import './App.css';
import Home from './components/home/Home';
import Signup from "./components/signup/Signup";
import Login from "./components/login/Login";
import UserState from "./context/UsersSate";

function App() {

  const [token, setToken] = useState(false)

  useEffect(() => {
    // finding token 
    let i;
    for (i = 0; i < localStorage.length; i++) {
      let findingToken = localStorage.key(i);
      if (findingToken === "token") {
        setToken(true)
      }
    }
  }, token)


  return (
    <>
      <UserState>

        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </Router>
      </UserState>
    </>
  );
}

export default App;
