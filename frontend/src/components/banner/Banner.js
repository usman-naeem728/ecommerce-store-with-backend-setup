import React from 'react'
import bannerimg from '../assets/banner.png'
import styled from 'styled-components'

const Banner = () => {

    const Div = styled.div`
    display: flex;
    justify-content:center;
    align-items:center;
    padding:20px
    `
  return (
    <Div>
      <img src={bannerimg} />
    </Div>
  )
}

export default Banner
