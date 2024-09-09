import Image from "next/image";
import styles from "./transactions.module.css";

const Transactions = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Staff</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Name</td>
            <td>Status</td>
            <td>Date</td>
            <td>Project</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className={styles.user}>
                <Image
                  src="/noavatar.png"
                  alt=""
                  width={40}
                  height={40}
                  className={styles.userImage}
                />
                Cheldean Mutheu
              </div>
            </td>
            <td>
              <span className={`${styles.status} ${styles.done}`}>
                Active
              </span>
            </td>
            <td>24.05.2024</td>
            <td>Skill Africa</td>
          </tr>
          <tr>
            <td>
              <div className={styles.user}>
                <Image
                  src="/noavatar.png"
                  alt=""
                  width={40}
                  height={40}
                  className={styles.userImage}
                />
                Francis Malombe
              </div>
            </td>
            <td>
              <span className={`${styles.status} ${styles.done}`}>Active</span>
            </td>
            <td>24.05.2024</td>
            <td>Skill Africa</td>
          </tr>
          <tr>
            <td>
              <div className={styles.user}>
                <Image
                  src="/noavatar.png"
                  alt=""
                  width={40}
                  height={40}
                  className={styles.userImage}
                />
                John Doe
              </div>
            </td>
            <td>
              <span className={`${styles.status} ${styles.done}`}>
                Active
              </span>
            </td>
            <td>24.05.2024</td>
            <td>WorldSkills</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
