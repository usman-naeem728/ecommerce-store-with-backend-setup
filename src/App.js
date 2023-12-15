import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import './App.css';
import Home from './components/home/Home';
import Signup from "./components/signup/Signup";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
