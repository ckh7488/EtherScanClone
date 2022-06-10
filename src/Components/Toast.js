import React from "react"

//css
import styles from './Toast.module.css'

const Toast = ({content})=>{

    return (
        <div>
            <div>
                <p>{content}</p>
            </div>
        </div>
    )
}

export default Toast