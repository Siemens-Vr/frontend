
import Image from "next/image";
import MenuLink from "./menuLink/menuLink";
import styles from "./sidebar.module.css";
import {
  MdDashboard,
  MdAnalytics,
  MdPeople,
  MdLogout,
} from "react-icons/md";
import { auth, signOut } from "/app/auth";



const menuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/student/dashboard",
        icon: <MdDashboard />,
      },
      {
        title: "Students",
        path: "/student/dashboard/students",
        icon: <MdPeople />,
      },
      {
        title: "Cohorts",
        path: "/student/dashboard/cohorts",
        icon: <MdAnalytics />,
      },
      {
        title: "Instructors",
        path: "/student/dashboard/facilitators",
        icon: <MdAnalytics />,
      },
      
    ],
  },
 
  {
    title: "User",
    list: [
      // {
      //   title: "Settings",
      //   path: "/dashboard/settings",
      //   icon: <MdOutlineSettings />,
      // },
      // {
      //   title: "Help",
      //   path: "/dashboard/help",
      //   icon: <MdHelpCenter />,
      // },
    ],
  },
];

const Sidebar = async  () => {
  const result = await auth();
  const user = result?.user;

  if (!user) {
    console.error("User data is not available.");
    // Return some fallback UI or handle it as per your requirement
    return <div className={styles.container}>User data not available</div>;
  }
 
  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <Image
          className={styles.userImage}
         
          src="/noavatar.png"
          alt=""
          width="50"
          height="50"
        />
        <div className={styles.userDetail}>
         
          <span className={styles.username}>{user.username.toUpperCase()}</span>
          <span className={styles.userTitle}>{user.role.toUpperCase()}</span>
        </div>
      </div>
      <ul className={styles.list}>
        {menuItems.map((cat) => (
          <li key={cat.title}>
            <span className={styles.cat}>{cat.title}</span>
            {cat.list.map((item) => (
              <MenuLink item={item} key={item.title} />
            ))}
          </li>
        ))}
         {/* Conditionally render the Admin Dashboard link */}
         {user.role === 'admin' && (
          <li>
            {/* <span className={styles.cat}>Admin</span> */}
            <MenuLink item={{ title: "Admin Dashboard", path: "/admin/dashboard", icon: <MdDashboard /> }} />
          </li>
        )}
      </ul>
      <form action = {async () => {
        "use server"

        await signOut()
      }}>
        
        <button className={styles.logout}>
          <MdLogout />
          Logout
        </button>
      </form>
    </div>
  );
};

export default Sidebar;
