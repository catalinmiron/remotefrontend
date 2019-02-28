import React from 'react';
import striptags from 'striptags';
import styles from './post-listing.module.scss';
import { OutboundLink } from 'gatsby-plugin-google-analytics';
import { Link } from 'gatsby';

const title = (title, company) => (
  <h2>
    {title} <span className={styles.at}>at</span> {company}
  </h2>
);

const PostListing = ({ post }) => {
  return (
    <article
      aria-label={`${post.title} at ${post.company}`}
      className={styles.posting}
      key={post.date + post.title}
    >
      <div className={styles.top}>
        {title(post.title, post.company)}
        <p className={styles.date}>{post.date}</p>
      </div>

      {post.snippet && (
        <div className={styles.snippet}>
          <p dangerouslySetInnerHTML={{ __html: striptags(post.snippet) }} />
        </div>
      )}
      <div className={styles.cta}>
        <OutboundLink className={styles.apply} href={post.path}>
          Apply Now
        </OutboundLink>
        <Link to={`/jobs/${post.slug}`}>Full Description</Link>
      </div>
    </article>
  );
};

PostListing.propTypes = {};

export default PostListing;
