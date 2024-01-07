import React, { useContext, useEffect, useState } from 'react';
import { Circles } from 'react-loader-spinner';
import userContext from '../../context/userContext';
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../navbar/Navbar'
import img from '../assets/signupimg.jpg'
import './login.css'
import Toast from '../toastNotification/Toast';

const Login = () => {
  const [showNotification, setshowNotification] = useState(false)
  const [notificationMsg, setNotificationmsg] = useState({
    msg: "",
    type: ""
  })
  const [loader, setLoader] = useState(false)

  const navigate = useNavigate()
  const context = useContext(userContext)
  const { login, error, token } = context
  // const [checktoken, setToken] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailerror] = useState(false)
  const [passError, setPasserror] = useState()

  useEffect(() => {
    setTimeout(() => {
      setLoader(false)
    }, 3000);
    // finding token in localstorage 
    let i;
    for (i = 0; i < localStorage.length; i++) {
      let findingToken = localStorage.key(i);
      if (findingToken === "token") {
        navigate('/')
      }
    }



  }, [token, error])

  const handleClick = async () => {
    setLoader(!loader)
    // updating UI if server is down or any other error
    try {
      await login(email, password)
      setLoader(false)
      console.log("login error", error)
    } catch (error) {
      console.log("error here", error)
      setshowNotification(true)
      setNotificationmsg({
        msg: "Internal server error",
        type: 'error',
      });
      setTimeout(() => {
        setshowNotification(false)
      }, 3000);
      setLoader(false)
    }
    // window.location.reload()
  }
  function checkEmail(e) { //checkEmail function
    e.preventDefault()
    let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/; //pattern for validate email
    if (!email.match(pattern)) { //if pattern not matched then add error 
      setEmailerror(true)
      setTimeout(() => {
        setEmailerror(false)
      }, 5000);
    } else { //if pattern matched then remove error and then run another function to check password is valid or not
      setEmailerror(false)
      passwordCheck()
    }
  }
  function passwordCheck() {
    //if password is not valid return error true
    (password.length < 5) ? setPasserror(true) : setPasserror(false);
    (passError === false) && handleClick();
    setTimeout(() => {
      setPasserror(false)
    }, 5000);
  }
  return (
    <>
      <Navbar />
      {loader &&
        <Circles
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="circles-loading"
          wrapperStyle={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1000, // Set the desired z-index value
          }}
          wrapperClass=""
          visible={true}
        />
      }
      {showNotification && <Toast msg={notificationMsg.msg} type={notificationMsg.type} />}
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
              <button type='submit' >Login</button>
            </div>
          </form>
          {error || emailError || passError ?
            <div style={{ "animation": "shake 0.3s ease-in-out", "color": "red" }} className="error error-txt ">enter correct credentials</div> : ""
          }

          <span>Don't have an account <b><Link to={'../signup'}>Signup</Link></b> Now</span>
        </div>
      </div >
    </>
  )
}

export default Login
