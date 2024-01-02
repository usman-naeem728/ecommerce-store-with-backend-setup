import React from 'react';
import './toast.css'

const Toast = (props) => {
  console.log("this is error", props.msg)

  const toastDetails = {
    timer: 1500,
    success: {
      icon: 'fa-circle-check',
      text: props.msg,
    },
    error: {
      icon: 'fa-circle-xmark',
      text: props.msg
    },
    warning: {
      icon: 'fa-triangle-exclamation',
      text: props.msg
    },
    info: {
      icon: 'fa-circle-info',
      text: props.msg
    }
  }
  const { icon, text } = toastDetails[props.type];

  return (
    <>
      <ul className="notifications">
        <li className={`toast ${props.type}`}>
          <div className="column">
            <i className={`fa-solid ${icon}`}></i>
            <span>{text}</span>
          </div>
        </li>
      </ul>
    </>
  )
}

export default Toast
