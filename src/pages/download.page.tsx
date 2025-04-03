import React from "react";
import styles from "./download.module.css";

export default function DownloadPage() {
  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        <div className={styles.imageContainer}>
          <img
            src="/time-travelers.png"
            alt="Time travelers from 2022 discovering Sizzy"
            width={400}
            height={400}
            className={styles.timeTravelersImage}
          />
        </div>

        <div className={styles.timePortal}>
          <p className={styles.timeTravelText}>Hello time traveler, you found a page from 2022!</p>
        </div>

        <p className={styles.description}>
          Our download process has changed. To download Sizzy, you'll need to start a{" "}
          <span className={styles.bold}>free</span> trial first.
        </p>

        <p className={styles.info}>
          After signing up for a trial, you'll be automatically taken to the download page.
        </p>

        <div className={styles.buttonContainer}>
          <a
            href="https://portal.sizzy.co/pricing"
            className={styles.button}
            target="_blank"
            rel="noopener noreferrer"
          >
            Start <span className={styles.bold}>Free</span> Trial ✨
          </a>
        </div>
      </div>
    </div>
  );
}
