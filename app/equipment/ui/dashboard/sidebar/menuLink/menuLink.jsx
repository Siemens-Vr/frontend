import React from 'react'
import Link from 'next/link'
import styles from "./menuLink.module.css"

const MenuLink = ({ item }) => {
  // console.log("iiiiteeeems")
  // console.log(item)
  return (
    <Link href={item.path} className={styles.container}>
        {item.icon}
        {item.title}
    </Link>
  )
}

export default MenuLink