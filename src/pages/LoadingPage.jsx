import React, { useEffect } from 'react'
import '../assets/style/loadingPage.scss'
import { useNavigate } from 'react-router-dom'

const LoadingPage = () => {
    const navigate = useNavigate(); // içine yazılan pathe yönelndirme

    useEffect(()=>{
        setTimeout(()=>{
            navigate("/home");
        },3000)
    })
  return (
    <div className="loading-page">
         <div className='loader'></div>
    </div>
   
  )
}

export default LoadingPage