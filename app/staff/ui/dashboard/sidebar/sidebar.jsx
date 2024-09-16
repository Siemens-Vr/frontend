
import Image from "next/image";
import MenuLink from "./menuLink/menuLink";
import styles from "./sidebar.module.css";
import {
  MdSupervisedUserCircle,
  MdPeople,
  MdLogout,
} from "react-icons/md";
import { auth, signOut } from "/app/auth";



const menuItems = [
  {
    title: "Pages",
    list: [
     
      {
        title: "Attendance & Leave Management",
        path: "/staff/dashboard/attendance&leave",
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: "Payroll & Benefits",
        path: "/staff/dashboard/payroll&benefits",
        icon: <MdPeople />,
      },
      {
        title: "Training & Development",
        path: "/staff/dashboard/training&development",
        icon: <MdPeople />,
      },
      {
        title: "Task & Performance",
        path: "/staff/dashboard/task&performance",
        icon: <MdPeople />,
      },

      {
        title: "Support & Collaboration",
        path: "/staff/dashboard/support&collaboration",
        icon: <MdPeople />,
      },
      {
        title: "Profile",
        path: "/staff/dashboard/profile",
        icon: <MdPeople />,
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
  console.log(user)

  if (!user) {
    console.error("User data is not available.");
    // Return some fallback UI or handle it as per your requirement
    return <div className={styles.container}>User data not available</div>;
  }
 
  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <a href="/staff/dashboard">
          <Image
              className={styles.userImage}
              src="/noavatar.png"
              alt=""
              width="50"
              height="50"
          />
        </a>

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
