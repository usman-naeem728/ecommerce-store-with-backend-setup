import { useState } from "react";
import userContext from "./userContext";



const UserState = (props) => {

    const host = "http://localhost:5000"
    const n1 = []
    const [token, setToken] = useState("")
    const [userData, setUserData] = useState({})
    const [error, setError] = useState("")
    const [cartpdt, setCartpdt] = useState(n1)

    //signup endponit
    const signup = async (name, email, password, contactno) => {
        try {
            const response = await fetch(`${host}/api/auth/createuser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                }, body: JSON.stringify({ name, email, password, contactno }),
            });
            const json = await response.json()
            // console.log("success", json)
            if (!json.error) {
                localStorage.setItem("token", json.authToken)
                setToken(json.authToken)
            } else {
                setError(json.error)
            }
        } catch (error) {
            // Handle any exceptions that occur during the fetch or processing
            console.error("An error occurred during signup:", error);
            // You might want to set an error state or display a message to the user
            setError("An error occurred during signup. Please try again.");
        }
    }
    //login endpoint
    const login = async (email, password) => {
        try {
            const response = await fetch(`${host}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                }, body: JSON.stringify({ email, password }),
            });
            // if (!response.ok) {
            //     throw new Error('Server request failed');
            // }
            const json = await response.json()
            // console.log( json)
            if (!json.error) {
                localStorage.setItem("token", json.authToken)
                setToken(json.authToken)
            }else{
                setError(json.error)
            }
        } catch (error) {
            setError("internal Server error")
            throw error
        }
    }
    // get user personal data
    const getUser = async () => {
        try {
            const response = await fetch(`${host}/api/auth/getuser/`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                },
            });
            const json = await response.json()
            setUserData(json)
        } catch (error) {
            // Handle the error here, you can log it or take appropriate action
            setError("Internal Server error.");
            throw error
        }
    }
    //fetch all cart products
    const getCartpdt = async () => {
        try {
            const response = await fetch(`${host}/api/cart/fetchallcartproducts`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                },
            });
            if (!response.ok) {
                throw new Error('Server request failed');
            }
            const json = await response.json()
            setCartpdt(json)
        } catch (error) {
            // Handle the error here, you can log it or take appropriate action
            setError("Internal  Server error.");
            throw error;

        }
    }

    // add products in cart
    const addCartpdt = async (productname, price, quantity) => {
        try {
            const response = await fetch(`${host}/api/cart/addcartproduct`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                },
                body: JSON.stringify({ productname, price, quantity }),
            });
            if (!response.ok) {
                throw new Error('Server request failed');
            }
            const cartProduct = response.json();
            setCartpdt(cartpdt.concat(cartProduct))
        } catch (error) {
            // Handle the error here, you can log it or take appropriate action
            setError("Internal server error.");
            throw error;
            // console.log("internal error")
        }
    }

    // edit cart product quantity
    const editCartpdtquantity = async (id, productname, price, quantity) => {
        //api call
        try {
            const response = await fetch(`${host}/api/cart/updatecartquantity/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                },
                body: JSON.stringify({ productname, price, quantity }),
            });
            const json = response.json();
            console.log(json)
            let newCartpdt = JSON.parse(JSON.stringify(cartpdt))
            //logic for edit client side
            for (let index = 0; index < newCartpdt.length; index++) {
                const element = newCartpdt[index];
                if (element._id === id) {
                    newCartpdt[index].productname = productname
                    newCartpdt[index].price = price
                    newCartpdt[index].quantity = quantity
                }
                break;
            }
            setCartpdt(newCartpdt)
        } catch (error) {
            // Handle the error here, you can log it or take appropriate action
            setError("Internal server error.");
        }
    }

    // delete products from cart
    const deleteCartpdt = async (id) => {
        //api call
        try {
            const response = await fetch(`${host}/api/cart/deletecartproduct/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                },
            });
            console.log(response.json)
            const newCartpdt2 = cartpdt.filter((cartpdt) => { return cartpdt._id !== id })
            setCartpdt(newCartpdt2)
        } catch (error) {
            // Handle the error here, you can log it or take appropriate action
            setError("Internal server error.");
        }
    }

    return (
        <userContext.Provider value={{ login, signup, getUser, userData, token, error, cartpdt, getCartpdt, deleteCartpdt, editCartpdtquantity, addCartpdt }}>
            {props.children}
        </userContext.Provider>
    )
}

export default UserState;