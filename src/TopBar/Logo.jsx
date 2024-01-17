import "./Logo.css"
import React, { Component, useRef, useEffect } from 'react';
import useWindowSize from "./ProfileScript";


function Logo() {

    const size = useWindowSize();
    let fontSize = 0;
    const node = useRef(null);
    const text_node = useRef(null);

    useEffect(() => {
        if (node.current) {
            if (size.width > 850) {
            }
        }
    }, [size.width]);

    
    return (<div ref={node} className="header-logo"><h1 ref={text_node}>MYSHOPAPP</h1></div>);
}

export default Logo
