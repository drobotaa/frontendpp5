import React from 'react'
import styles from "../styles/UserAvatar.module.css"

const UserAvatar = ({ src, height = 45, text }) => {
    return (
        <span>
            <img
                className={styles.UserAvatar}
                src={src}
                height={height}
                width={height}
                alt="avatar" />
            {text}
        </span>
    )
}

export default UserAvatar