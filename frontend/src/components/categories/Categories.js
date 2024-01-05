import React from 'react';
import styled from 'styled-components';
import cloth from '../assets/cloth.png';
import electronic from '../assets/electronic.png';
import grocery from '../assets/grocery.png';
import beauty from '../assets/beauty.png';
import sport from '../assets/sports.png';
import health from '../assets/health.png';

const Categories = () => {
    const Wrapper = styled.div`
    display: flex;
    flex-direction:column;
    justify-content: center;
    margin-top: 5%;
    padding-left: 7%;
    padding-bottom:5%;
    border-bottom: 1px solid rgb(185, 185, 185);
`
    const Div = styled.div`
    width: 90%;
    display:flex;
    justify-content:space-around;
    // border:1px solid red
    `
    const Button = styled.button`
    display: flex;
    width: 10% ;
    height:10% ;
    flex-direction: column;
    align-items: center;
    border-radius: 6px;
    border: 1px solid rgba(0, 0, 0, 0.30);
    background-color: white;
    cursor:pointer
    `
    const HighlightedDiv = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    width: 10%;
    color: #DB4444;
    // border: 1px solid red
    `
    const Box = styled.span`
    background-color: #DB4444;
    height: 25px;
    width: 13px;
    border-radius: 20%;
    `
   
    return (
        <>
            <Wrapper>
                <HighlightedDiv className='productHeading'>
                    <Box className='box'></Box><span>Categories</span>
                </HighlightedDiv>
                <h1>Browse By Category</h1>
                <Div>
                    <Button category="all"><img src={cloth} /> <br /> Clothing</Button>
                    <Button category="all"><img src={electronic} /> <br /> Electronics
                    </Button>
                    <Button category="all"><img src={grocery} /> <br /> Groceries
                    </Button>
                    <Button category="all"><img src={sport} /> <br /> Sports
                    </Button>
                    <Button category="all"><img src={beauty} /> <br /> Beauty
                    </Button>
                    <Button category="all"><img src={health} /> <br /> Health
                    </Button>
                    {/* <Button category="all">Lifestyle</Button> */}
                </Div>
            </Wrapper>
        </>
    )
}

export default Categories
