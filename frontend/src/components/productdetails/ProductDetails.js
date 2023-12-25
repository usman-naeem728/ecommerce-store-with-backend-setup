import React, { useEffect, useState } from 'react'

const ProductDetails = (props) => {
    console.log(props.receivedProductdetails)
  

    const [productDetails, setProductdetails] = useState({
        name: localStorage.getItem("productname"),
        price: localStorage.getItem("productprice"),
        description: localStorage.getItem("productdescription"),
        image: localStorage.getItem("savedimage"),
    })
    return (
        <>
            {productDetails.name}
            {productDetails.price}
            {productDetails.description}
            <img src={productDetails.image}/>
        </>
    )
}

export default ProductDetails;
