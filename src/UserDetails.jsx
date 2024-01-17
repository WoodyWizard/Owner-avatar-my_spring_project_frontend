import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';

const fetchData = async (user) => {
        let isLoading = true;
        console.log('Fetching user...');
          if (Cookies.get('jwtToken') !== undefined) {
            try {
                console.log('Logging in...');
                const response = await fetch('http://localhost:8082/user/getMe', {
                  method: 'GET',
                  headers: {
                    'Authorization': 'Bearer ' + Cookies.get('jwtToken')
                  },
                });
        
                if (response.ok) {
                  console.log('Login successful');
                  const data = await response.json();
                  // user.firstName = data.firstName;
                  // user.lastName = data.lastName;
                  // user.username = data.username;
                  // user.balance = data.balance;
                  // user.age = data.age;
                  // user.email = data.email;
                  // user.valid = true;

                  user = ({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    username: data.username,
                    balance: data.balance,
                    age: data.age,
                    email: data.email,
                    cart: [],
                    valid: true,
                  });
                  console.log('User data:', data);
                } else {
                  Cookies.remove('jwtToken', { path: '' });
                  console.error('Login failed');
                  console.log(response.statusText);
                  isLoading = false;
                }



                
            } catch (error) {
              console.error('Error fetching user data:', error);
            } finally {
              isLoading = false;
            }
          } else {
            console.error('User not logged in');
            isLoading = false;
          }

          return {user, isLoading};
        
}


const fetchCartData = async (user) => {
  
  if (Cookies.get('jwtToken') !== undefined) {
    try {
        console.log('Fetching cart data...');
        const responseCart = await fetch('http://localhost:8082/cart', {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + Cookies.get('jwtToken')
          },
        });
        //console.log('Cart data fetched');

        if (responseCart.ok) {
          const data = await responseCart.json();
          // user.cart = data;
          user = ({
            ...user,
            cart: data,
          });
          console.log('Cart data:', data);
        } else {
          console.error('Error fetching cart data:', responseCart.statusText);
        }
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  }
  return user;
}


//var GLOBAL_USER = new UserObject();

export default {fetchData, fetchCartData};