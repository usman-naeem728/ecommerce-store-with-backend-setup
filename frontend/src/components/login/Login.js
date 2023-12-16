import React, { useContext, useEffect, useState } from 'react';
import userContext from '../../context/userContext';
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../navbar/Navbar'
import img from '../assets/signupimg.jpg'

const Login = () => {
  const navigate = useNavigate()
  const context = useContext(userContext)
  const { login,  error } = context
  const [token, setToken] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
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
    if (token !== "") {
      navigate("/")
      window.location.reload()
    }
  }, [token, error])

  const handleClick = () => {
    login(email, password)

  }
  return (
    <>
      <Navbar />

      <div className='signup'>
        <img src={img} />

        <div className='signupForm'>
          <div className='heading'>
            <span>Welcome Back</span>
          </div>
          <div className='form'>
            <input placeholder='Email Address' type='text' onChange={(e) =>
              setEmail(e.target.value)} />
            <input placeholder='Password' type='password' onChange={(e) =>
              setPassword(e.target.value)
            } />
          </div>
          {error &&
            <div style={{ "animation": "shake 0.3s ease-in-out", "color": "red" }} className="error error-txt ">Invalid email or password</div>
          }
          <div className='signupBtn'>
            <button onClick={handleClick}>Login</button>
          </div>
          <span>Don't have an account <b><Link to={'../signup'}>Signup</Link></b> Now</span>
        </div>
      </div>
    </>
  )
}

export default Login
