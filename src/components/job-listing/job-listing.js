import React from 'react';
import { OutboundLink } from 'gatsby-plugin-google-analytics';
import Helmet from 'react-helmet';
import striptags from 'striptags';
import { graphql } from 'gatsby';

import styles from './job-listing.module.scss';
import CallToAction from '../call-to-action/call-to-action';

const JobListing = ({ title, excerpt, company, url, content }) => {
  // Strip html from excerpts.
  const description = striptags(excerpt);

  const postTitle = `${
    title
    // TODO: this should be css.
  } <span style="font-weight: normal;font-family: 'Lora', sans-serif; font-style: italic; text-transform: lowercase; font-size: 0.64em">at</span> ${company}`;

  return (
    <>
      <Helmet
        title={`${title} at ${company}`}
        meta={[{ name: 'description', description }]}
      />
      <article className={styles.wrapper}>
        <h1
          className={styles.title}
          dangerouslySetInnerHTML={{ __html: postTitle }}
        />
        <OutboundLink className={styles.apply} href={url}>
          Apply Now
        </OutboundLink>
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <div className={styles.cta}>
          <OutboundLink href={url}>Apply Now =></OutboundLink>
        </div>
        <CallToAction />
      </article>
    </>
  );
};

export default JobListing;
