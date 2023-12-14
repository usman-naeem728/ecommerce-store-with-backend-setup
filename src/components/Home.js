import React, { useRef, useState, useEffect } from 'react';
import './Home.css'
import image from './imageslider.jpg';
import image1 from './imageslider1.jpg';
import image2 from './imageslider2.jpg';


const Home = () => {
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

// code for product slider starts
    const wrapperRef = useRef(null);
    const carouselRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [startScrollLeft, setStartScrollLeft] = useState(0);
    const [timeoutId, setTimeoutId] = useState(null);
    const [isAutoPlay, setIsAutoPlay] = useState(true);

    const firstCardWidth = carouselRef.current?.querySelector('.card')?.offsetWidth || 0;
    const cardPerView = Math.round(carouselRef.current?.offsetWidth / firstCardWidth);

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

    useEffect(() => {
        // Insert copies of the last few cards to the beginning of the carousel for infinite scrolling
        const childrenArray = Array.from(carouselRef.current?.children || []);
        childrenArray.slice(-cardPerView).reverse().forEach(card => {
            carouselRef.current.insertAdjacentHTML('afterbegin', card.outerHTML);
        });

        // Insert copies of the first few cards to the end of the carousel for infinite scrolling
        childrenArray.slice(0, cardPerView).forEach(card => {
            carouselRef.current.insertAdjacentHTML('beforeend', card.outerHTML);
        });

        // Scroll the carousel to the appropriate position to hide the first few duplicate cards on Firefox
        carouselRef.current.classList.add('no-transition');
        carouselRef.current.scrollLeft = carouselRef.current.offsetWidth;
        carouselRef.current.classList.remove('no-transition');
    }, [cardPerView]);

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
                        onScroll={infiniteScroll}>
                        <li className="card">
                            <div className="img"><img src={images[0]} alt="img" draggable="false" /></div>
                            <h2>Blanche Pearson</h2>
                            <button>Add to cart</button>
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
                        <li className="card">
                            <div className="img"><img src={images[0]} alt="img" draggable="false" /></div>
                            <h2>Kristina Zasiadko</h2>
                            <button>Add to cart</button>
                        </li>
                        <li className="card">
                            <div className="img"><img src={images[0]} alt="img" draggable="false" /></div>
                            <h2>Donald Horton</h2>
                            <button>Add to cart</button>
                        </li>
                    </ul>
                    <i id="right" className="fa-solid fa-angle-right" onClick={() => handleArrowButtonClick('right')}></i>
                </div>

            </div>
        </>
    )
}

export default Home
