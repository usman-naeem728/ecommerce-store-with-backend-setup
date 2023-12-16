import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './signup.css'
import Navbar from '../navbar/Navbar'
import img from '../assets/signupimg.jpg'
import userContext from '../../context/userContext'

const Signup = () => {
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


  const onchange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 3000);

    if (token !== "") {
      window.location.reload()
      navigate("/")
    }
  }, [token, error])

  //when user click on signup button this function will run
  const handleClick = (e) => {

    //if email value is empty it will retuen  email error 
    //otherwise run another function for checking email is valid or not
    (credentials.email === "") ? setEmailerror(true) : checkEmail();

  }
  function checkEmail() { //checkEmail function
    let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/; //pattern for validate email
    if (!credentials.email.match(pattern)) { //if pattern not matched then add error 
      setEmailerror(true)
    } else { //if pattern matched then remove error and then run another function to check password is valid or not
      setEmailerror(false)
      passwordCheck()
    }

  }

  //checking is passowrd valid or not
  function passwordCheck() {
    //if password is not valid return error true
    (credentials.password.length < 5) ? setPasserror(true) : setPasserror(false);
    (passError === false) && checkConfirmPass();
  }
  function checkConfirmPass() {
    (credentials.password !== passwordconfirm) ? setConfirmPasserror(true) : nameCheck()
  }
  function nameCheck() {
    (credentials.name.length < 3) ? setNameerror(true) : checkContact();
  }
  function checkContact() {
    (credentials.contactno.length < 10) ? setContnoerror(true) : signuphandler(false);
  }

  function signuphandler() {
    signup(credentials.name, credentials.email, credentials.password, credentials.contactno)

  }



  return (
    <>
      <Navbar />

      <div className='signup'>
        <img src={img} />

        <div className='signupForm'>
          <div className='heading'>
            <span>Create New Account</span>
          </div>
          <div className='form'>
            <input placeholder='Name' type='text' name="name" onChange={onchange} />
            <div className="error error-txt">{nameError ? "Name should be three characters" : ""}</div>

            <input placeholder='Email Address' type='text' name="email" onChange={onchange} />
            <div className="error error-txt">{emailError ? "Enter a valid email address" : ""}</div>

            <input placeholder='Contact No' type='number' name="contactno" onChange={onchange} />
            <div className="error error-txt">{contnoError ? "Enter a valid Contact no" : ""}</div>

            <input placeholder='Password' type='password' name="password" onChange={onchange} />
            <div className="error-txt">{passError ? "password must be at least 5 charachters" : ""}</div>

            <input placeholder='Confirm Pasword' type='password' onChange={(e) =>
              setPasswordconfirm(e.target.value)
            } />
            <div className="error-txt">{confirmPassError ? "Password not match" : ""}</div>

          </div>
          {error &&
            <div style={{ "animation": "shake 0.3s ease-in-out", "color": "red" }} className="error error-txt ">email address already exists</div>
          }
          <div className='signupBtn'>
            <button onClick={handleClick}>Signup Now</button>
          </div>
          <span>Already have an account <b><Link to={'../login'}>Login</Link></b> Now</span>
        </div>
      </div>
    </>
  )
}

export default Signup
