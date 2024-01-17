import React, { Component, useRef, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import "./LoginForm.css"


function LoginForm({user}) {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const verifyToken = async () => {
        try {
            const response = await fetch('http://localhost:8082/verifyToken', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + Cookies.get('jwtToken')
                },
            });
            if (response.ok) {
                return true;
            } else {
                Cookies.remove('jwtToken', { path: '' });
                return false;
            }
        } catch (error) {
            console.error('Error:', error);
            return false;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        if (Cookies.get('jwtToken') == undefined || !verifyToken) {
            try {
                const response = await fetch('http://localhost:8082/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
                

                if(response.ok) {
                    console.log('Login successful');
                    Cookies.set('jwtToken', await response.text(), { expires: 1 });
                } else {
                    console.error('Login failed');
                    console.log(response.statusText);
                }

            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    const handleClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div className="login-form-div" >
            <div className="login-form" onClick={handleClick}> 
                <h4>LOGIN FORM</h4> 
                <form className='login-form-content' onSubmit={handleSubmit}>
                    <input id='username' name='username' type="text" placeholder="username" 
                           value={formData.username} onChange={handleInputChange}  />

                    <input id='password' name='password' type="password" placeholder="password" 
                           value={formData.password} onChange={handleInputChange}  />

                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
        );

}


export default LoginForm;