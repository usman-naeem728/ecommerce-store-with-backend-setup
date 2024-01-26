import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../navbar/Navbar'
import userContext from '../../context/userContext'
import './dashboard.css'
import { useNavigate, Link } from 'react-router-dom'

const Dashboard = () => {

    const context = useContext(userContext)
    const { signup, token, error } = context
    const navigate = useNavigate()

    const [passwordconfirm, setPasswordconfirm] = useState('')
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", contactno: "" })

    const [emailError, setEmailerror] = useState(false)
    const [passError, setPasserror] = useState()
    const [confirmPassError, setConfirmPasserror] = useState(false)
    const [nameError, setNameerror] = useState(false)
    const [contnoError, setContnoerror] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const [category, setCategory] = useState("");
    const handleCategorychange = (event) => {
        // Update the state with the selected value
        setCategory(event.target.value);
    };

    const [subcategory, setsubCategory] = useState(1);
    const handleSubcategorychange = (event) => {
        // Update the state with the selected value
        setsubCategory(event.target.value);
    };

    const [subcategory2, setsubCategory2] = useState(1);
    const handleSubcategory2change = (event) => {
        // Update the state with the selected value
        setsubCategory(event.target.value);
    };

    // function readURL(input) {
    //     if (input.files && input.files[0]) {

    //         var reader = new FileReader();

    //         reader.onload = function (e) {
    //             $('.image-upload-wrap').hide();

    //             $('.file-upload-image').attr('src', e.target.result);
    //             $('.file-upload-content').show();

    //             $('.image-title').html(input.files[0].name);
    //         };

    //         reader.readAsDataURL(input.files[0]);

    //     } else {
    //         removeUpload();
    //     }
    // }

    // function removeUpload() {
    //     $('.file-upload-input').replaceWith($('.file-upload-input').clone());
    //     $('.file-upload-content').hide();
    //     $('.image-upload-wrap').show();
    // }
    // $('.image-upload-wrap').bind('dragover', function () {
    //     $('.image-upload-wrap').addClass('image-dropping');
    // });
    // $('.image-upload-wrap').bind('dragleave', function () {
    //     $('.image-upload-wrap').removeClass('image-dropping');
    // });

    const [imageSrc, setImageSrc] = useState(null);

    const handleImageChange = (e) => {
        const input = e.target;

        if (input.files && input.files[0]) {
            const reader = new FileReader();

            reader.onload = (event) => {
                setImageSrc(event.target.result);
            };

            reader.readAsDataURL(input.files[0]);
        } else {
            removeUpload();
        }
    };

    const removeUpload = () => {
        // Reset the input field to clear the selected file
        document.getElementById('fileInput').value = '';
        setImageSrc(null);
    };

    const handleDragOver = () => {
        document.getElementById('imageUploadWrap').classList.add('image-dropping');
    };

    const handleDragLeave = () => {
        document.getElementById('imageUploadWrap').classList.remove('image-dropping');
    };
    return (
        <>
            <Navbar />
            <div className='nav'>
                <div className='logo' style={{ fontSize: "23px", fontWeight: "bolder" }}>
                    <span>Add Products</span>
                </div>
                <div className='logo' style={{ fontSize: "23px", fontWeight: "bolder" }}>
                    <span>Your Products</span>
                </div>
            </div>

            <div className='addingProductForm'>
                <div className='form'>
                    <input placeholder='Product Name' type='text' name="productName" onChange={onchange} />
                    <div className="error error-txt">{nameError ? "Name should be three characters" : ""}</div>

                    <input placeholder='Product Description' type='text' name="productDescription" onChange={onchange} />
                    <div className="error error-txt">{emailError ? "Enter a valid email address" : ""}</div>

                    <input placeholder='Set Price' type='number' name="price" onChange={onchange} />
                    <div className="error error-txt">{contnoError ? "Enter a valid Contact no" : ""}</div>

                    <label htmlFor="myDropdown">Select Category:</label>
                    {/* Dropdown with onChange handler */}
                    <select id="myDropdown" value={category} onChange={handleCategorychange}>
                        <option value="Select">Select</option>
                        <option value="Clothing">Clothing</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Grocery">Grocery</option>
                        <option value="Health">Health</option>
                        <option value="Beauty">Beauty</option>
                        <option value="Toys">Toys</option>
                    </select>

                    {/* Dropdown with onChange handler */}
                    {category !== "" &&
                        <>
                            <label htmlFor="myDropdown">Select Sub Category:</label>
                            <select id="myDropdown" value={subcategory} onChange={handleSubcategorychange}>
                                {category === "Clothing" &&
                                    <>
                                        <option value="Select">Select</option>
                                        <option value="Men">Men</option>
                                        <option value="Women">Women</option>
                                    </>
                                }
                                {category === "Electronics" &&
                                    <>
                                        <option value="Select">Select</option>
                                        <option value="Computers">Computers and Accessories</option>
                                        <option value="Mobile">Mobile Devices</option>
                                        <option value="HomeAppliances">Home Appliances</option>
                                        <option value="GamingConsoles">Gaming Consoles</option>
                                        <option value="PowerSupplies">Power Supplies</option>
                                    </>
                                }
                                {category === "Select" &&
                                    <>
                                        <option value="Select">First choose category</option>
                                    </>
                                }
                            </select>
                        </>
                    }

                    {/* Dropdown with onChange handler */}
                    {subcategory !== " " &&
                        <select id="myDropdown" value={subcategory2} onChange={handleSubcategory2change}>
                            {subcategory === "Men" &&
                                <>
                                    <option value="Men's T-shirts">Men's T-shirts</option>
                                    <option value="Men's Kameez Shalwar">Men's Kameez Shalwar</option>
                                    <option value="Men's Shoes">Men's Shoes</option>
                                    <option value="Men's Pant">Men's Trousers</option>
                                    <option value="Men's acessories">Men's acessories</option>
                                </>
                            }
                            {subcategory === "Women" &&
                                <>
                                    <option value="Men's T-shirts">Wedding Dresses</option>
                                    <option value="Men's Kameez Shalwar">Kameez Shalwar</option>
                                    <option value="Men's Shoes">Casual</option>
                                    <option value="Men's Pant">Kurti</option>
                                    <option value="Men's acessories">Women's acessories</option>
                                </>
                            }
                            {subcategory === "Computers" &&
                                <>
                                    <option value="Desktop">Desktop computers</option>
                                    <option value="Laptops">Laptops</option>
                                    <option value="ComputerAcessories">Computer peripherals (keyboards, mice, etc.)</option>
                                    <option value="Monitors">Monitors</option>
                                </>
                            }
                        </select>
                    }
                    {/* <div class="file-upload">
                        <button class="file-upload-btn" type="button" onclick="$('.file-upload-input').trigger( 'click' )">Add Image</button>

                        <div class="image-upload-wrap">
                            <input class="file-upload-input" type='file' onchange="readURL(this);" accept="image/*" />
                            <div class="drag-text">
                                <h3>Drag and drop a file or select add Image</h3>
                            </div>
                        </div>
                        <div class="file-upload-content">
                            <img class="file-upload-image" src="#" alt="your image" />
                            <div class="image-title-wrap">
                                <button type="button" onclick="removeUpload()" class="remove-image">Remove <span class="image-title">Uploaded Image</span></button>
                            </div>
                        </div>
                    </div> */}
                    <div
                        id="imageUploadWrap"
                        className="image-upload-wrap"
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                    >
                        {imageSrc ? (
                            <div className="file-upload-content">
                                <img className="file-upload-image" src={imageSrc} alt="Uploaded" width={30} />
                                 {/* <div className="image-title">{document.getElementById('fileInput').files[0].name}</div>  */}
                            </div>
                        ) : (
                            <div>
                                <input
                                    type="file"
                                    className="file-upload-input"
                                    id="fileInput"
                                    onChange={handleImageChange}
                                />
                                <div className="image-upload-content">Select or drag a file here</div>
                            </div>
                        )}
                    </div>

                </div>
                {/* {error &&
                    <div style={{ "animation": "shake 0.3s ease-in-out", "color": "red" }} className="error error-txt ">email address already exists</div>
                } */}
                <div className='signupBtn'>
                    <button >Add Product</button>
                </div>
                
            </div>
        </>
    )
}

export default Dashboard
