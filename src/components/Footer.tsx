import Link from "next/link";
import styles from "./Footer.module.css";

const Footer = () => {
  const current_year = new Date().getFullYear();
  return (
    <div id="section_footer" className={styles.footer}>
      <div className={styles.footerContent}>
        <Link href="/privacy-policy" passHref className={styles.footerLink}>
          Privacy
        </Link>
        <span className={styles.separator}>|</span>
        <Link href="/terms-and-conditions" passHref className={styles.footerLink}>
          Terms
        </Link>
        <span className={styles.separator}>|</span>
        <Link href="mailto:evalurez@gmail.com" className={`${styles.footerLink} btn btn-link`}>
          Contact
        </Link>
        <p className={styles.copyright}>
          Copyright © {current_year}, Evalurez LLC. All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;