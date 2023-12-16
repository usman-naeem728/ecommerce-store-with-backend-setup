import React from 'react'
import Navbar from '../navbar/Navbar'
import img from '../assets/signupimg.jpg'

const Login = () => {
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
          <input placeholder='Email Address' type='text' />
          <input placeholder='Password' type='password' />
        </div>
        <div className='signupBtn'>
          <button>Login</button>
        </div>
      </div>
    </div>
  </>
  )
}

export default Login
