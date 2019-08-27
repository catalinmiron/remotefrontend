import React from 'react';
import { OutboundLink } from 'gatsby-plugin-google-analytics';
import Helmet from 'react-helmet';
import striptags from 'striptags';
import { graphql } from 'gatsby';

import styles from './job-listing.module.scss';
import CallToAction from '../call-to-action/call-to-action';
import SEO from '../seo';

const JobListing = ({
  title,
  excerpt,
  company,
  url,
  content,
  datePosted,
  validThrough,
  inUSA
}) => {
  // Strip html from excerpts.
  const description = striptags(excerpt);

  const postTitle = `${
    title
    // TODO: this should be css.
  } <span style="font-weight: normal;font-family: 'Lora', sans-serif; font-style: italic; text-transform: lowercase; font-size: 0.64em">at</span> ${company}`;

  const schemaContent = content.replace(/"/g, "'");

  const schema = `{
    "@context" : "https://schema.org/",
    "@type" : "JobPosting",
    "title" : "${title}",
    "description" : "${schemaContent}",
    "datePosted" : "${datePosted}",
    "validThrough" : "${validThrough}",
    "employmentType" : "FULL_TIME",
    "hiringOrganization" : {
      "@type" : "Organization",
      "name" : "${company}"
    },
    "applicantLocationRequirements": {
      "@type": "Country",
      "name": "USA"
    },
    "jobLocationType": "TELECOMMUTE"
  }`;

  return (
    <>
      <SEO
        title={`${title} at ${company}`}
        description={description}
        schema={inUSA && schema}
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
