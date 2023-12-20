import React, { useRef, useState, useEffect, useContext } from 'react';
import userContext from '../../context/userContext';
import './Home.css';
import Navbar from '../navbar/Navbar';
import image from '../assets/imageslider.jpg'
import image1 from '../assets/imageslider1.jpg';
import image2 from '../assets/imageslider2.jpg';
// import Modal from '../modal/modal';


const Home = () => {
    const context = useContext(userContext);
    const { addCartpdt } = context;
    const [modalDetails, setModalDetail] = useState({
        productname: "",
        price: 0
    })
    const [quantity, setQuantity] = useState(1);

    const [isModalOpen, setIsModalOpen] = useState(false);


    // Handler function for the onChange event
    const handleDropdownChange = (event) => {
        // Update the state with the selected value
        setQuantity(event.target.value);
    };
    //navbar dropdown
    const [isopenWdropsown, setIsopenWdropdown] = useState(false);
    const [isopenMdropsown, setIsopenMdropdown] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const wfashionOptions = ['Option 1', 'Option 2', 'Option 3'];
    const mfashionOptions = ['Option 1', 'Option 2', 'Option 3'];
    const images = [
        image,
        image1,
        image2
    ];
    //navbar dropdown ends


    const handleClick = () => {
        addCartpdt(modalDetails.productname, modalDetails.price * quantity, quantity);
        closeModal()
    }


    const openModal = (name, price) => {
        setModalDetail({ productname: name, price: price })
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };


    // code for product slider starts
    const wrapperRef = useRef(null);
    const carouselRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [startScrollLeft, setStartScrollLeft] = useState(0);
    const [timeoutId, setTimeoutId] = useState(null);
    const [isAutoPlay, setIsAutoPlay] = useState(true);

    const firstCardWidth = carouselRef.current?.querySelector('.card')?.offsetWidth || 0;


    const handleArrowButtonClick = (direction) => {
        carouselRef.current.scrollLeft += direction === 'left' ? -firstCardWidth : firstCardWidth;
    };

    const dragStart = (e) => {
        setIsDragging(true);
        carouselRef.current.classList.add('dragging');
        setStartX(e.pageX);
        setStartScrollLeft(carouselRef.current.scrollLeft);
    };

    const dragging = (e) => {
        if (!isDragging) return;
        carouselRef.current.scrollLeft = startScrollLeft - (e.pageX - startX);
    };

    const dragStop = () => {
        setIsDragging(false);
        carouselRef.current.classList.remove('dragging');
    };

    const autoPlay = () => {
        if (window.innerWidth < 800 || !isAutoPlay) return;
        setTimeoutId(setTimeout(() => {
            carouselRef.current.scrollLeft += firstCardWidth;
        }, 2500));
    };

    const infiniteScroll = () => {
        if (carouselRef.current.scrollLeft === 0) {
            carouselRef.current.classList.add('no-transition');
            carouselRef.current.scrollLeft = carouselRef.current.scrollWidth - 2 * carouselRef.current.offsetWidth;
            carouselRef.current.classList.remove('no-transition');
        } else if (Math.ceil(carouselRef.current.scrollLeft) === carouselRef.current.scrollWidth - carouselRef.current.offsetWidth) {
            carouselRef.current.classList.add('no-transition');
            carouselRef.current.scrollLeft = carouselRef.current.offsetWidth;
            carouselRef.current.classList.remove('no-transition');
        }

        clearTimeout(timeoutId);
        if (!wrapperRef.current.matches(':hover')) {
            autoPlay();
        }
    };


    // code for prodcut slider ends 


    const nextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };
    useEffect(() => {
        autoPlay();
        const interval = setInterval(() => {
            nextImage();
        }, 3000); // Change image every 5 seconds

        // Clear interval on component unmount
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <Navbar />
            <div className='hero-sec'>
                <div className='hero-menu'>
                    <ul>
                        <li>Woman’s Fashion
                            {/* Dropdown button */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" onClick={() => setIsopenWdropdown(!isopenWdropsown)} className='arrow'>
                                <path d="M12.95 11.636L8 6.68597L9.414 5.27197L15.778 11.636L9.414 18L8 16.586L12.95 11.636Z" fill="black" />
                            </svg>
                        </li>
                        {/* Dropdown options */}
                        {isopenWdropsown && (
                            <ul className='drop'>
                                {wfashionOptions.map((option, index) => (
                                    <li key={index}>{option}</li>
                                ))}
                            </ul>
                        )}
                        <li>Men’s Fashion
                            {/* Dropdown button */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" onClick={() => setIsopenMdropdown(!isopenMdropsown)} className='arrow'>
                                <path d="M12.95 11.636L8 6.68597L9.414 5.27197L15.778 11.636L9.414 18L8 16.586L12.95 11.636Z" fill="black" />
                            </svg>
                        </li>
                        {/* Dropdown options */}
                        {isopenMdropsown && (
                            <ul className='drop'>
                                {mfashionOptions.map((option, index) => (
                                    <li key={index}>{option}</li>
                                ))}
                            </ul>
                        )}
                        <li>Electronics</li>
                        <li>Medicine</li>
                        <li>Sports & Outdoor</li>
                        <li>Baby’s & Toys</li>
                        <li>Groceries & Pets</li>
                        <li>Health & Beauty</li>
                        <li>Home & Lifestyle</li>
                    </ul>
                </div>
                <div className="image-slider">
                    {/* <button onClick={prevImage}>Previous</button> */}
                    <img className='slideImg' src={images[currentImageIndex]} alt={`Slide ${currentImageIndex + 1}`} />
                    {/* <button onClick={nextImage}>Next</button> */}
                </div>
            </div>

            {/* hero section ends */}
            <div>
                {isModalOpen && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <span className="close-btn" onClick={closeModal}>
                                &times;
                            </span>
                            {/* Content of your modal goes here */}
                            <form>
                                <label>
                                    <b>PRODUCT:</b> {modalDetails.productname}
                                </label>
                                <br />
                                <label>
                                    <b>PRICE:</b> {modalDetails.price}
                                </label>
                                <br />
                                <br />
                                <label htmlFor="myDropdown">Quantity:</label>
                                {/* Dropdown with onChange handler */}
                                <select id="myDropdown" value={quantity} onChange={handleDropdownChange}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </select>

                                {/* Display the selected value */}
                                <p><b>TOTAL PRICE:</b> {quantity * modalDetails.price}</p>
                                <br />
                                <button type="submit" onClick={handleClick}>Add to Cart</button>

                            </form>
                        </div>
                    </div>
                )}
            </div>

            <div className='productSlider'>
                <div className='productHeading'>
                    <span className='box'></span><span>New ARRIVALS</span>
                </div>
                <div className="wrapper" ref={wrapperRef}>
                    <i id="left" className="fa-solid fa-angle-left" onClick={() => handleArrowButtonClick('left')}></i>
                    <ul className="carousel"
                        ref={carouselRef}
                        onMouseDown={dragStart}
                        onMouseMove={dragging}
                        onMouseUp={dragStop}
                        onScroll={infiniteScroll}
                    >
                        <li className="card">
                            <div className="img"><img src={images[0]} alt="img" draggable="false" /></div>
                            <h2>Men’s shalwar kameez</h2>
                            <h3>2000</h3>
                            <button onClick={() => openModal("Men's shalwar kameez", 2000)} >Add to Cart</button>
                        </li>
                        <li className="card">
                            <div className="img"><img src={images[0]} alt="img" draggable="false" /></div>
                            <h2>Joenas Brauers</h2>
                            <button>Add to cart</button>
                        </li>
                        <li className="card">
                            <div className="img"><img src={images[0]} alt="img" draggable="false" /></div>
                            <h2>Lariach French</h2>
                            <button>Add to cart</button>
                        </li>
                        <li className="card">
                            <div className="img"><img src={images[0]} alt="img" draggable="false" /></div>
                            <h2>James Khosravi</h2>
                            <button>Add to cart</button>
                        </li>
                        {/* <li className="card">
                            <div className="img"><img src={images[0]} alt="img" draggable="false" /></div>
                            <h2>Kristina Zasiadko</h2>
                            <button>Add to cart</button>
                        </li>
                        <li className="card">
                            <div className="img"><img src={images[0]} alt="img" draggable="false" /></div>
                            <h2>Donald Horton</h2>
                            <button>Add to cart</button>
                        </li> */}
                    </ul>
                    <i id="right" className="fa-solid fa-angle-right" onClick={() => handleArrowButtonClick('right')}></i>
                </div>

            </div>
        </>
    )
}

export default Home
