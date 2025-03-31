import cn from "classnames";
import tankerImage from "../../assets/images/tanker-logo.png";

import styles from "./Sidebar.module.css";
import { Button } from "../Button/Button";

export const Sidebar = ({ className }: { className?: string }) => {
  return (
    <nav className={cn(styles.nav, className)}>
      <img className={styles.logo} src={tankerImage} />
      <Button
        className={cn(styles.menuItem, styles.active)}
        appearance="ghost"
        size="m"
        icon={"Document"}
        iconClassName={styles.buttonIcon}
      >
        Схема
      </Button>
    </nav>
  );
};
