import React from 'react';
import NewsletterSignup from '../newsletter-signup';
import { Link } from 'gatsby';

import styles from './header.module.css';

const Header = () => (
  <header className={styles.header}>
    <div className={styles.container}>
      <h1>
        <Link className={styles.headerLink} to="/">
          Fully remote jobs for front end developers
        </Link>
      </h1>
      <NewsletterSignup />
    </div>
  </header>
);

export default Header;
