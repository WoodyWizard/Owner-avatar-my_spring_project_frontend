import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import './global.css'

import ProfilePage from './Profile/ProfilePage.jsx';
import { useState, useEffect } from 'react';
import Root from './Root.jsx';

const router = createBrowserRouter([

    { path: "/", element: <Root /> },
    { path: "profile/", element: <ProfilePage /> },

]);




const rootElement = document.getElementById("root");
if(rootElement) {
  const root = ReactDOM.createRoot(rootElement)
  .render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  )
}