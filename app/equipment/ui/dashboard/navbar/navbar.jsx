"use client";
import { usePathname , useRouter } from "next/navigation";
import { useState , useEffect} from "react";
import styles from "./navbar.module.css";
import {
  MdNotifications,
  MdOutlineChat,
  MdPublic,
  MdSearch,
} from "react-icons/md";

import { config } from '../../../../../config';

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const title = pathname.split('/').pop()
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    // Check if the current page is not '/dashboard/notifications'
    if (title !== 'notifications') {
      const fetchNotifications = async () => {
        try {
          const response = await fetch(`${config.baseURL}/notifications/uread`);
          const data = await response.json();
          setNotificationCount(data.count);
        } catch (error) {
          console.error('An error occurred when fetching notifications:', error);
        }
      };

      fetchNotifications();
    }
  }, [title]);

  const handleNotificationsClick = () => {
    router.push('/dashboard/notifications');
  };
  // console.log(notificationCount)

  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}</div>
      <div className={styles.menu}>
      <div className={styles.search}>
          <MdSearch />
          <input type="text" placeholder="Search..." className={styles.input} />
        </div>
        <div className={styles.icons}>
          <div>
          <MdOutlineChat size={20} />

          </div>
          <div className= {styles.notificationIcon} onClick={handleNotificationsClick}>
          <MdNotifications  size={20} />
          {notificationCount > 0 && <span className={styles.notificationCount}>{notificationCount}</span>}
          {/* <span className={styles.notificationCount}>0</span> */}
          </div>
          
          
          <div>
          <MdPublic size={20} />

          </div>
        </div>
      </div>
   

     

  
    </div>
  )
}

export default Navbar