import React from 'react'
import './signup.css'
import Navbar from '../navbar/Navbar'
import img from '../assets/signupimg.jpg'

const Signup = () => {
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
            <input placeholder='Name' type='text' />
            <input placeholder='Email Address' type='text' />
            <input placeholder='Phone No' type='number' />
            <input placeholder='Password' type='password' />
            <input placeholder='Confirm Pasword' type='password' />
          </div>
          <div className='signupBtn'>
            <button>Signup Now</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signup
