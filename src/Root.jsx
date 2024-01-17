import React from 'react'
import App from './App';
import TopBar from './TopBar.jsx'
import Slider from './Slider.jsx'
import MainPage from './MainPage.jsx'
import UserDetails from './UserDetails.jsx'
import { useState, useEffect } from 'react';
import ProfilePage from './Profile/ProfilePage.jsx';



function Root() {
    console.log("Root");
    const [user, setUser] = useState();
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      async function fetchData() {
          const { user: apiResponseUser, isLoading: apiResponseIsLoading } = await UserDetails.fetchData(user);
          //console.log("Current user state in Root:", user , isLoading);
          if (apiResponseUser) {
              //console.log("Current user in Root:", apiResponseUser);
              const userWithCartData = await UserDetails.fetchCartData(apiResponseUser);
              setUser(userWithCartData);
              //setIsLoading(apiResponseIsLoading);
          }
          setIsLoading(apiResponseIsLoading);
          //console.log("Current user state in Root:", user , isLoading);
      }
      fetchData();
    }, []);
  
    //console.log("Current user state in Root:", user , isLoading);
  
  
  
    return (
      <div>
            <TopBar user={user} setUser={setUser} isLoading={isLoading}/>
            <Slider user ={user} setUser={setUser} isLoading={isLoading}/>
            <MainPage />
      </div>
    );
  }


  export default Root;