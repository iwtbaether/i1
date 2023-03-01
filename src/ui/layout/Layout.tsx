import React from "react";
import styles from "./layout.module.css";

interface LayoutProps {
  header: React.ReactNode;
  leftPanel: React.ReactNode;
  rightPanel: React.ReactNode;
  footer: React.ReactNode;
  center: React.ReactNode;
}

function Layout({
  header,
  leftPanel,
  rightPanel,
  footer,
  center,
}: LayoutProps) {
  return (
    <div className={styles.main}>
      <div className={styles.header}>{header}</div>
      <div className={styles.content}>
        <div className={styles.left}>{leftPanel}</div>
        <div className={styles.center}>{center}</div>
        <div className={styles.right}>{rightPanel}</div>
      </div>
      <div className={styles.footer}>{footer}</div>
    </div>
  );
}

export default Layout;
