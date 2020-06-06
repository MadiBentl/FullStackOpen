import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const data = useSelector(state => state.notification)
  return(
    <div className={data.style}>
      <p>{data.msg}</p>
    </div>
  )
}

export default Notification
