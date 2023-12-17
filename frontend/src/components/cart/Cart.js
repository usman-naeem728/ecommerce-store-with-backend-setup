import React from 'react'
import './cart.css'
import Navbar from '../navbar/Navbar'

const Cart = () => {
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
        <tr>
          <td>Monitor</td>
          <td>10000</td>
          <td>2</td>
          <td>20000</td>
        </tr>
      </table>
    </>
  )
}

export default Cart
