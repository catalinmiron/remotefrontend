import React from 'react';
import MailchimpSubscribe from 'react-mailchimp-subscribe';

import styles from './newsletter-signup.module.scss';

const url =
  'https://benjamingrobertson.us15.list-manage.com/subscribe/post?u=aafc0f8e65dbc564446043b15&amp;id=ee47f8c168';

const SimpleForm = () => <MailchimpSubscribe url={url} />;

const NewsletterSignup = () => (
  <div className={styles.formContainer}>
    <p>Get remote jobs delivered to your inbox weekly.</p>
    <MailchimpSubscribe
      url={url}
      render={({ subscribe, status, message }) => (
        <SimpleForm
          onSubmitted={(formData) => {
            subscribe(formData);
            if (typeof window !== 'undefined') {
              window.gtag('event', 'subscribe', {
                event_category: 'subscribe',
                event_label: 'header'
              });
            }
          }}
        />
      )}
    />
  </div>
);

export default NewsletterSignup;
