import React from 'react'

const LoadingBar = ({type}) => {
  return (
    <>
    {
      type === "bar" ? <div className='spinner-bar'/> : null
    }
    {
      type === "spinner" ? <div className='spinner-circle'/> : null
    }
    </>
  )
}

export default LoadingBar