import React from "react";

import { Helmet } from "react-helmet";

// icons
import { FaLinkedin } from "react-icons/fa";
import { FaSquareWhatsapp } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import { RiCloseFill } from "react-icons/ri";

// styles
import styles from "./ShareModal.module.css";

const ShareModal = ({ badge, onClose }) => {
  const badgeImageUrl = `https://raw.githubusercontent.com/luxprajapati/Geek-Clash/main/${badge?.badgeimg}`;
  const pageUrl = window.location.href;
  console.log("badgeImageUrl->", badgeImageUrl);

  const shareLinks = {
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
      badgeImageUrl
    )}&title=${encodeURIComponent(
      badge?.badgeName
    )}&summary=${encodeURIComponent(
      "Check out this badge!"
    )}&source=${encodeURIComponent(badgeImageUrl)}`,

    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      badgeImageUrl
    )}&text=${encodeURIComponent(
      `${badge?.badgeName} - Check out this badge!`
    )}`,

    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(
      `${badge?.badgeName} - Check out this badge! ${badgeImageUrl}`
    )}`,
  };

  return (
    <div className={styles.modalOverlay}>
      <Helmet>
        <meta property="og:title" content={badge?.badgeName} />
        <meta property="og:description" content="Check out this badge!" />
        <meta property="og:image" content={badgeImageUrl} />
        <meta property="og:url" content={pageUrl} />
      </Helmet>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          <RiCloseFill size={20} />
        </button>
        <h2>Geek Clash Badge</h2>
        <img src={badgeImageUrl} alt={badge?.badgeName} />
        <p>{badge?.badgeName}</p>
        <div className={styles.shareLinks}>
          <a
            href={shareLinks.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaSquareWhatsapp size={32} />
          </a>
          <a
            href={shareLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin size={32} />
          </a>
          <a
            href={shareLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaSquareXTwitter size={32} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
