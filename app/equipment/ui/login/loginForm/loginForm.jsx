import React from 'react'
import styles from "./loginForm.module.css"

const loginForm = () => {
  return (
    <div>
        <form action="" className={styles.form}>
            <h1>Login</h1>
            <input type="text" placeholder="username" name="username" />
            <input type="text" placeholder="password" name="password" />
            <button>Login</button>
        </form>
    </div>
  )
}

export default loginForm