import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import './Css/App.css'

function App() {


  return (
    <>
      <Outlet />
      <div className="Sort-btn-container">
        <p>Order by: </p>
        <button className="order-btn">Newest</button>
        <button className="order-btn">Most Popular</button>
      </div>
   
    </>
  )
}

export default App
