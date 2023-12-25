import React, { useContext, useEffect, useState } from 'react';
import userContext from '../../context/userContext';
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../navbar/Navbar'
import img from '../assets/signupimg.jpg'
import './login.css'

const Login = () => {
  const navigate = useNavigate()
  const context = useContext(userContext)
  const { login, error } = context
  const [token, setToken] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailerror] = useState(false)
  const [passError, setPasserror] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 3000);
    // finding token in localstorage 
    let i;
    for (i = 0; i < localStorage.length; i++) {
      let findingToken = localStorage.key(i);
      if (findingToken === "token") {
        setToken(true)
      }
    }
    // if token found then redirecting to home page 
    if (token === true) {
      navigate("/")
      window.location.reload()
    }
  }, [token, error])

  const handleClick = () => {
    login(email, password)
    navigate("/")
    // window.location.reload()
  }
  function checkEmail() { //checkEmail function
    let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/; //pattern for validate email
    if (!email.match(pattern)) { //if pattern not matched then add error 
      setEmailerror(true)
    } else { //if pattern matched then remove error and then run another function to check password is valid or not
      setEmailerror(false)
      passwordCheck()
    }
  }
  function passwordCheck() {
    //if password is not valid return error true
    (password.length < 5) ? setPasserror(true) : setPasserror(false);
    (passError === false) && handleClick();
  }
  return (
    <>
      <Navbar />

      <div className='login'>
        <img src={img} />

        <div className='loginForm'>
          <div className='heading'>
            <span>Welcome Back</span>
          </div>
          <form onSubmit={checkEmail}>

            <input placeholder='Email Address' type='text' onChange={(e) =>
              setEmail(e.target.value)} />
            <input placeholder='Password' type='password' onChange={(e) =>
              setPassword(e.target.value)
            } />
            <div className='loginBtn'>
              <button type='submit' onClick={checkEmail}>Login</button>
            </div>
          </form>
          {error || emailError || passError ?
            <div style={{ "animation": "shake 0.3s ease-in-out", "color": "red" }} className="error error-txt ">Invalid email or password</div> : ""
          }
          <span>Don't have an account <b><Link to={'../signup'}>Signup</Link></b> Now</span>
        </div>
      </div >
    </>
  )
}

export default Login
