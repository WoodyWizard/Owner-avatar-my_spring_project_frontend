
import React, { Component, useRef, useEffect, useState } from 'react';
import "./Profile.css"
import useWindowSize from "./ProfileScript";
import profile_img from "../assets/profile-img.png";
import LoginForm from "../LoginForm";
import ProfilePage from "../Profile/ProfilePage.jsx";
import { Outlet, Link, useNavigate } from "react-router-dom";

function Profile({user, setUser, isLoading}) {

    //console.log(GLOBAL_USER);

    const size = useWindowSize();
    const fontSize = size.width/ 50;
    const node = useRef(null);

    const [username, setUsername] = useState('Profile');
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showProfilePage, setShowProfilePage] = useState(false);
    const [, setForceUpdate] = useState(false);

    const navigate = useNavigate();

    const toggleLoginForm = () => {
        //console.log('Toggle login form ' + user + ' ' + isLoading);
        console.log('Toggle login form ' + isLoading);
        if ((isLoading === false || isLoading === undefined || isLoading === null) && (user === undefined || user == null )) {
            console.log('Show login form');
            setShowLoginForm(!showLoginForm);
        } else {
            navigate('/profile');
            //setShowProfilePage(!showProfilePage);
        }
    };

    // useEffect(() => {
    //     if (node.current) {
    //         //if (size.width > 1300) {
    //         //    node.current.style.width = '35%';
    //         //} else {
    //         //    node.current.style.width = '64px';
    //         //}
    //     }
    //     cart_size = user.cart.length;
    // }, [user.cart.length]);

    useEffect(() => {
        if (isLoading === false && user !== null && user.valid === true) {
            setUsername(user.username);
        }
    }, [user]);

    return (<div onClick={toggleLoginForm} ref={node} className="profile">
        { showLoginForm && 
                <LoginForm user={user}/> 
        }

        { showProfilePage &&
            <ProfilePage user={user} setUser={setUser} isLoading={isLoading}/>
        }
        
        {
            size.width > 1300 
            ? 
            <> 
            <div className='cart-icon' 
                    style={
                        {
                            position: 'absolute',
                            fontSize: `20px`, 
                            fontFamily: 'MinecraftFont',
                            fontWeight: 'bold',
                            color: '#FFB200', 
                            backgroundColor: 'white', 
                            borderRadius: '100px', 
                            width: '32px', 
                            height: '32px', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            border: '6px none #FFB200',
                            padding: '7px',
                            bottom: -25,
                            right: -7,
                        }
                }> { (isLoading || user == undefined) ? '0' : user?.cart?.length}</div>
            <div className="balance">  { (isLoading || user == undefined) ? '0$' : `${user?.balance}$`} </div>
                <h1>{username}</h1> 
                <div className="profile-img-div"> 
                        <img src={profile_img}  alt="Profile" />
                </div> 
            </> 
            : 
            <> 
                <div className="profile-img-div"> 
                        <img src={profile_img}  alt="Profile" />
                </div> 
            </>
        } 
    </div>);
}

export default Profile