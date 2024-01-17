import React, { Component, useRef, useEffect, useState } from 'react';
import "./ProfilePage.css"
import Cookies from 'js-cookie';
import CartItem from './CartItem';
import UserDetails from '../UserDetails.jsx'



function ProfilePage({user, setUser, isLoading}) {

    var data = ["first", "second", "third"];
    const [cartItems, setCartItems] = useState([]);
    var fullPrice = 0;

    useEffect(() => {
        async function fetchData() {
            const cartData = await UserDetails.fetchCartData([]);
            
            setCartItems(cartData.cart);
        }

        fetchData();
    }, [])


    if (cartItems) {
        fullPrice = cartItems.reduce((total, item) => total + item.price, 0);
    }

    
    const groupedCartItems = cartItems.reduce((grouped, item) => {
        if (!grouped[item.name]) {
            grouped[item.name] = { ...item, count: 0 };
        }
        grouped[item.name].count += 1;
        return grouped;
    }, {});

    // Convert the grouped items back to an array
    const groupedCartItemsArray = Object.values(groupedCartItems);

    return (
        <>
            <div className='profile-page'>
                <h1>Profile Page</h1>
                <div className="cart-items">
                    { cartItems 
                        ? 
                        <>
                            <div className='full-price' style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
                                <h2 style={{display: 'inline', marginRight: '10px'}}>Total :</h2>
                                <h5>{Number.parseFloat(fullPrice).toFixed(1)}$</h5>
                            </div>
                            { groupedCartItemsArray.map((item, index) => 
                                <CartItem   key={index} name={item.name} 
                                            description={item.description} image={item.image_url} 
                                            price={item.price} count={item.count}/>) }
                        </>
                        : <div>"Loading..."</div> }
                </div>
            </div>
        </>
    );
}


export default ProfilePage;