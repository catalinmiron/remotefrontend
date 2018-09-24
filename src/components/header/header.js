import React from 'react'
import NewsletterSignup from '../newsletter-signup'

import styles from './header.module.css'

const Header = () => (
  <header className={styles.header}>
    <div className={styles.container}>
      <h1>Fully remote jobs for front end developers</h1>
      <NewsletterSignup />
    </div>
  </header>
)

export default Header
