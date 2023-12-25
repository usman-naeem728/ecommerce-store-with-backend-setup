import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../navbar/Navbar'
import userContext from '../../context/userContext'
import './dashboard.css'
import { useNavigate, Link } from 'react-router-dom'

const Dashboard = () => {

    const context = useContext(userContext)
    const { signup, token, error } = context
    const navigate = useNavigate()

    const [passwordconfirm, setPasswordconfirm] = useState('')
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", contactno: "" })

    const [emailError, setEmailerror] = useState(false)
    const [passError, setPasserror] = useState()
    const [confirmPassError, setConfirmPasserror] = useState(false)
    const [nameError, setNameerror] = useState(false)
    const [contnoError, setContnoerror] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const [category, setCategory] = useState(1);
    const handleCategorychange = (event) => {
        // Update the state with the selected value
        setCategory(event.target.value);
    };

    const [subcategory, setsubCategory] = useState(1);
    const handleSubcategorychange = (event) => {
        // Update the state with the selected value
        setsubCategory(event.target.value);
    };
    return (
        <>
            <Navbar />
            <div className='nav'>
                <div className='logo' style={{ fontSize: "23px", fontWeight: "bolder" }}>
                    <span>Add Products</span>
                </div>
                <div className='logo' style={{ fontSize: "23px", fontWeight: "bolder" }}>
                    <span>Your Products</span>
                </div>
            </div>

            <div className='addingProductForm'>
                <div className='form'>
                    <input placeholder='Product Name' type='text' name="productName" onChange={onchange} />
                    <div className="error error-txt">{nameError ? "Name should be three characters" : ""}</div>

                    <input placeholder='Product Description' type='text' name="productDescription" onChange={onchange} />
                    <div className="error error-txt">{emailError ? "Enter a valid email address" : ""}</div>

                    <input placeholder='Set Price' type='number' name="price" onChange={onchange} />
                    <div className="error error-txt">{contnoError ? "Enter a valid Contact no" : ""}</div>

                    <label htmlFor="myDropdown">Select Category:</label>
                    {/* Dropdown with onChange handler */}
                    <select id="myDropdown" value={category} onChange={handleCategorychange}>
                        <option value="Clothing">Clothing</option>
                        <option value="Eletronics">Eletronics</option>
                        <option value="Grocery">Grocery</option>
                        <option value="Health">Health</option>
                        <option value="Beauty">Beauty</option>
                        <option value="Toys">Toys</option>
                    </select>

                    <label htmlFor="myDropdown">Select Sub Category:</label>
                    {/* Dropdown with onChange handler */}
                    <select id="myDropdown" value={subcategory} onChange={handleSubcategorychange}>
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
                    </select>

                    {/* Dropdown with onChange handler */}
                    <select id="myDropdown" value={subcategory} onChange={handleSubcategorychange}>
                        <option value="Men's T-shirts">Men's T-shirts</option>
                        <option value="Men's Kameez Shalwar">Men's Kameez Shalwar</option>
                        <option value="Men's Shoes">Men's Shoes</option>
                        <option value="Men's Pant">Men's Pant</option>
                    </select>

                </div>
                {error &&
                    <div style={{ "animation": "shake 0.3s ease-in-out", "color": "red" }} className="error error-txt ">email address already exists</div>
                }
                <div className='signupBtn'>
                    <button >Signup Now</button>
                </div>
                <span>Already have an account <b><Link to={'../login'}>Login</Link></b> Now</span>
            </div>
        </>
    )
}

export default Dashboard
