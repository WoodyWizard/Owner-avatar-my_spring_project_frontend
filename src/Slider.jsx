import "./Slider/Slider.css"
import Item from "./Slider/item";
import React, { useState, useEffect, useRef } from 'react';



function Slider({user, setUser, isLoading}) {

    const [data, setData] = useState(null);
    const isInitialRender = useRef(true);

    console.log("slider loaded");

    useEffect(() => {
        if (isInitialRender.current) {
            isInitialRender.current = false;
        console.log('Fetching data...');
        // Fetch data from Spring server
        fetch('http://localhost:8082/slider/4')
          .then(response => response.json())
          .then(data => {
            setData(data); // Set the fetched data to the state
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
        }
      }, []);



    return (
        <div className="slider">
            {data ? (
                data.map((item) => (
                    <Item key={item.id} imgSrc={item.image_url} title={item.name} description={item.description} price={item.price} itemId={item.id} user={user} setUser={setUser}/>
                ))
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}

export default Slider;