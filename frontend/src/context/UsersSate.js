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

    }
    //login endpoint
    const login = async (email, password) => {
        const response = await fetch(`${host}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }, body: JSON.stringify({ email, password }),
        });
        const json = await response.json()
        console.log("success", json)
        if (!json.error) {
            localStorage.setItem("token", json.authToken)
            setToken(json.authToken)
        } else {
            setError(json.error)
        }
    }
    // get user personal data
    const getUser = async () => {
        const response = await fetch(`${host}/api/auth/getuser/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        });
        const json = await response.json()
        setUserData(json)
    }
    //fetch all cart products
    const getCartpdt = async () => {
        const response = await fetch(`${host}/api/cart/fetchallcartproducts`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        });
        const json = await response.json()
        setCartpdt(json)
    }

    // add products in cart
    const addCartpdt = async (productname, price, quantity) => {
        const response = await fetch(`${host}/api/cart/addcartproduct`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ productname, price, quantity }),
        });
        const cartProduct = response.json();
        setCartpdt(cartpdt.concat(cartProduct))
    }

    // edit cart product quantity
    const editCartpdtquantity = async (id, productname, price, quantity) => {
        //api call
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
    }

    // delete products from cart
    const deleteCartpdt = async (id) => {
        //api call
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
    }

    return (
        <userContext.Provider value={{ login, signup, getUser, userData, token, error,cartpdt, getCartpdt, deleteCartpdt, editCartpdtquantity, addCartpdt }}>
            {props.children}
        </userContext.Provider>
    )
}

export default UserState;