"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./not-found.module.css";
import { useTheme } from "next-themes"; // Make sure to install this package

export default function NotFound() {
  const [countdown, setCountdown] = useState(10);
  const { theme } = useTheme();

  useEffect(() => {
    // Countdown timer to redirect to homepage
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      window.location.href = "/";
    }
  }, [countdown]);

  return (
    <div className={`${styles.container}`}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          4<span className={styles.zero}>0</span>4
        </h1>

        <div className={styles.animationWrapper}>
          <div className={styles.skCubeGrid}>
            <div className={`${styles.skCube} ${styles.skCube1}`}></div>
            <div className={`${styles.skCube} ${styles.skCube2}`}></div>
            <div className={`${styles.skCube} ${styles.skCube3}`}></div>
            <div className={`${styles.skCube} ${styles.skCube4}`}></div>
            <div className={`${styles.skCube} ${styles.skCube5}`}></div>
            <div className={`${styles.skCube} ${styles.skCube6}`}></div>
            <div className={`${styles.skCube} ${styles.skCube7}`}></div>
            <div className={`${styles.skCube} ${styles.skCube8}`}></div>
            <div className={`${styles.skCube} ${styles.skCube9}`}></div>
          </div>
        </div>

        <div className={styles.message}>
          <h2>Page Not Found</h2>
          <p>
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>
        </div>

        <div className={styles.actions}>
          <Link href="/" className={styles.button}>
            Back to Home
          </Link>
          <p className={styles.redirectMessage}>
            Redirecting in {countdown} seconds...
          </p>
        </div>
      </div>
    </div>
  );
}
