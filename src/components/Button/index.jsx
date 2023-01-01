import React, { memo } from "react";
import styles from "./button.module.scss";
const Button = ({
  title,
  onClick,
  ElementRight,
  ElementLeft,
  classContainer,
  style,
  blue,
  styleElementLeft,
  classElementLeft,
  classElementRight,
  styleElementRight,
}) => {
  return (
    <div
      className={`${styles.container} ${
        blue ? styles.colorPrimary : styles.colorGray
      } ${classContainer}`}
      style={style}
    >
      {ElementLeft && (
        <div className={classElementLeft} style={styleElementLeft}>
          {ElementLeft}
        </div>
      )}
      <button onClick={onClick}>{title}</button>
      {ElementRight && (
        <div className={classElementRight} style={styleElementRight}>
          {ElementRight}
        </div>
      )}
    </div>
  );
};

export default memo(Button);
