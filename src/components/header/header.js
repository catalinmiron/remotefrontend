import React from 'react';
import NewsletterSignup from '../newsletter-signup/newsletter-signup';
import { Link } from 'gatsby';

import styles from './header.module.scss';
import Nav from '../nav/nav';

const Header = () => (
  <header className={styles.header}>
    <div className={styles.container}>
      <h1>
        <Link className={styles.headerLink} to="/">
          Fully remote jobs for front end developers
        </Link>
      </h1>
      <NewsletterSignup />
      <Nav />
    </div>
  </header>
);

export default Header;
