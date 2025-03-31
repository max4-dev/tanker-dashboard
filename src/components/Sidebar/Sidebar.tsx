import cn from "classnames";

import styles from "./Sidebar.module.css";
import { Button } from "../Button/Button";

export const Sidebar = ({ className }: { className?: string }) => {
  return (
    <nav className={cn(styles.nav, className)}>
      {/* <Title tag="h2" color="white" size="l">
        Теплогаз
      </Title> */}
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
