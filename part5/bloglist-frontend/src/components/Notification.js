import React from 'react'

const Notification = ({ message, colour }) => (
  <div className={colour}>
    <p>{message}</p>
  </div>
)

export default Notification
