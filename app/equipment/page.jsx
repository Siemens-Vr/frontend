import Image from "next/image";
import LoginForm from "./ui/login/loginForm/loginForm";
import styles from "./ui/login/login.module.css"

export default function Home() {
  return (
    <div className={styles.container}>
     <LoginForm/>
    </div>
   
  );
}
