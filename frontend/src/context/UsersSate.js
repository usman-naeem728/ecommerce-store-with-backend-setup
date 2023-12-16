import { useState } from "react";
import userContext from "./userContext";



const UserState = (props) => {

    const host = "http://localhost:5000"
    const [token, setToken] = useState("")
    const [userData, setUserData] = useState({})
    const [error, setError] = useState("")
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


    return (
        <userContext.Provider value={{ login, signup, getUser, userData, token, error }}>
            {props.children}
        </userContext.Provider>
    )
}

export default UserState;