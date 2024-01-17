import "./item.css"
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
//import axios from "axios";





function Item({ imgSrc, title, description, price, itemId, user, setUser}) {

    const [isHovered, setIsHovered] = useState(false);
    const [fontSize, setFontSize] = useState(0.7);
    const [isClicked, setIsClicked] = useState(false);

    const addToCart = async () => {
        if (Cookies.get('jwtToken') !== undefined) {
            // Add the item to the cart
            console.log('Adding item to cart...');
            const response = await fetch('http://localhost:8082/cart/'+itemId, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + Cookies.get('jwtToken')
                },
            })
            if (response.ok) {
                const data = await response.json(); // OrderItem
                console.log('Item added to cart:', data);
                const updatedUser = {
                    ...user,
                    cart: [...user.cart, data],
                }
                setUser(updatedUser);
            } else {
                console.error('Error adding item to cart:', response.statusText);
            }
        } else {
            console.error('User not logged in');
        }
    }

    useEffect(() => {
        const textLength = description.length;
        const newSize = 140 / textLength; // Adjust this calculation based on your preference
        setFontSize(newSize > 0.8 ? 0.8 : newSize); // Set a minimum font size (16px in this case)
      }, [description]);

    return (
    <div className="item">
            <div className="item-img" 
                 style={{ backgroundImage: `url(${imgSrc})`, userSelect: 'none' }}
                 onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}
                 onClick={addToCart}>

                    <div className="item-price">{price}$</div>



                    {isHovered && (
                    <>
                        <div
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                borderRadius: '10px',
                                background: isHovered ? `rgba(0, 0, 0, 0.3)` : `rgba(0, 0, 0, 0)`,
                                transition: `background 1s ease`,
                            }}
                        />
                        <h1 style={{ color: 'white', position: 'absolute', alignSelf: 'center', justifySelf: 'center' }}>+</h1>
                    </>
                    )}
                    

            </div>
            <div className="item-title">{title}</div>
            <div className="item-description" style={{ fontSize: `${fontSize}vw` }}>{description}</div>
    </div>);
}

export default Item;