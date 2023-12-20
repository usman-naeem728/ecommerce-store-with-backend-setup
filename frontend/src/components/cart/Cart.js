import React, { useEffect } from 'react'
import './cart.css'
import userContext from '../../context/userContext'
import Navbar from '../navbar/Navbar'
import { useContext } from 'react'

const Cart = () => {
  const context = useContext(userContext)
  const { cartpdt, getCartpdt, editNotes } = context;

  useEffect(() => {
    getCartpdt()
  })
  return (
    <>
      <Navbar />
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
      </table>
    </>
  )
}

export default Cart
