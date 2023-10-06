import Sidebar from "../components/Sidebar";
import styles from "./AppLayout.module.css";

const AppLayout = () => {
  return (
    <div className={styles.app}>
      <Sidebar />
    </div>
  );
};

export default AppLayout;
