import { ReactNode } from "react";
import styles from "./Button.module.css";
type Props = {
  children: ReactNode;
  type?: "primary" | "back" | "position";
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const Button = ({ children, type = "primary", onClick }: Props) => {
  return (
    <button className={`${styles.btn} ${styles[type]}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
