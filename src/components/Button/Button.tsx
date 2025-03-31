import { memo } from "react";
import cn from "classnames";
import { Icon } from "../Icon/Icon";

import { ButtonProps } from "./Button.props";
import styles from "./Button.module.css";

export const Button = memo(
  ({
    size = "m",
    appearance = "default",
    border = "none",
    className,
    children,
    icon,
    typeOf = "button",
    iconClassName,
    ...props
  }: ButtonProps) => {
    const IconComponent = icon ? Icon[icon] : null;

    if (typeOf === "div") {
      return (
        <div
          className={cn(styles.button, styles[size], styles[appearance], styles[border], className)}
        >
          {IconComponent && (
            <IconComponent className={cn(styles.icon, styles.iconPosition, iconClassName)} />
          )}
          {children}
        </div>
      );
    }
    return (
      <button
        className={cn(styles.button, styles[size], styles[appearance], styles[border], className)}
        {...props}
      >
        {IconComponent && (
          <IconComponent className={cn(styles.icon, styles.iconPosition, iconClassName)} />
        )}
        {children}
      </button>
    );
  }
);
