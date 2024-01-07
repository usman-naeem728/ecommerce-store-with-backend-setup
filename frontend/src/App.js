import { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import './App.css';
import Home from './components/home/Home';
import Signup from "./components/signup/Signup";
import Login from "./components/login/Login";
import UserState from "./context/UsersSate";
import Cart from "./components/cart/Cart";
import ProductDetails from "./components/productdetails/ProductDetails";
import Dashboard from "./components/dashboard/Dashboard";

function App() {
  
  

  const [productDetail, setProductdetail] = useState({
    name: "",
    price: 0,
    description: ""
  });
  const [token, setToken] = useState(false)

  const handleProductdetail = (name, price, description, productImage) => {
    // setProductdetail({ name, price, description });
    localStorage.setItem("productname", name)
    localStorage.setItem("productprice", price)
    localStorage.setItem("productdescription", description)
  };

  useEffect(() => {
    // finding token 
    // let i;
    // for (i = 0; i < localStorage.length; i++) {
    //   let findingToken = localStorage.key(i);
    //   if (findingToken === "token") {
    //     setToken(true)
    //   }
    // }
    
  }, [token])


  return (
    <>
      <UserState>

        <Router>
          <Routes>
            <Route path='/' element={<Home getProductdetails={handleProductdetail} />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/productdetail' element={<ProductDetails />} />
            <Route path='/dashboard' element={<Dashboard />} />
          </Routes>
        </Router>
      </UserState>
    </>
  );
}

export default App;
