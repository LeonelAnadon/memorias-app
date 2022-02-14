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
    {
      type === "spinner-upload" ? <div className='spinner-upload'/> : null
    }
        {
      type === "spinner-delete" ? <div className='spinner-delete'/> : null
    }
    </>
  )
}

export default LoadingBar