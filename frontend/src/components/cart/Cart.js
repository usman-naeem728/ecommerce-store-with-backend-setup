import React, { useEffect, useState } from 'react'
import { Circles } from 'react-loader-spinner';
import './cart.css'
import userContext from '../../context/userContext'
import Navbar from '../navbar/Navbar'
import { useContext } from 'react'
import Toast from '../toastNotification/Toast';
import errimg from '../assets/404.gif'

const Cart = () => {
  const context = useContext(userContext)
  const [loader, setLoader] = useState(false)
  const { cartpdt, getCartpdt, error } = context;

  //creating toast msg
  const [showNotification, setshowNotification] = useState(false)
  const [notificationMsg, setNotificationmsg] = useState({
    msg: "",
    type: ""
  })

  useEffect(() => {
    const fetchProducts = async () => {
      setLoader(!loader)
      try {
        await getCartpdt();
        setLoader(false)
      } catch (error) {
        console.log("Error in getting the products", error);
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
    }
    fetchProducts()

  }, [])
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

      <table id="customers">
        <tr>
          <th>Product</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Subtotal</th>
        </tr>
        {
          cartpdt.map((product, i) => (
            <tr key={i}>
              <td>{product.productname}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td>{product.price * product.quantity}</td>
            </tr>
          ))
        }
        {notificationMsg.type === "error" &&
          <img src={errimg} />
        }
      </table>
    </>
  )
}

export default Cart
