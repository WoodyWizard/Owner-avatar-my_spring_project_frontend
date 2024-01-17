import React from 'react';
import './CartItem.css'


function CartItem({name, description, image, price, count}) {
    return (
        <div className="cart-item">
            <div className='cart-item-image' style={{ backgroundImage: `url(${image})` }}></div>
            <div className='cart-item-text'>
                {/* <div className='cart-item-count'>{count}</div> */}
                <div className='cart-item-title'><h2>{name} </h2>  x {count}</div>
                <div className='cart-item-main-text'>
                    <div className='cart-item-description'>{description}</div>
                    <div className='cart-item-price'>{price}$ (Total: {Number.parseFloat(count * price).toFixed(1)}$)</div>
                </div>
            </div>
        </div>
    );
}

export default CartItem;