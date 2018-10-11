import React from 'react';
import striptags from 'striptags';
import styles from './post-listing.module.css';
import GatsbyLink from 'gatsby-link';

const PostListing = ({ post }) => {
  const title = `${
    post.title
    // TODO: this should be css.
  } <span style="font-weight: normal;font-family: 'Lora', sans-serif; font-style: italic; text-transform: lowercase; font-size: 0.64em">at</span> ${
    post.company
  }`;
  return (
    <article
      aria-label={`${post.title} at ${post.company}`}
      className={styles.posting}
      key={post.date + post.title}
    >
      <div className={styles.top}>
        <h2 dangerouslySetInnerHTML={{ __html: title }} />
        <p className={styles.date}>{post.date}</p>
      </div>

      {post.snippet && (
        <div className={styles.snippet}>
          <p dangerouslySetInnerHTML={{ __html: striptags(post.snippet) }} />
        </div>
      )}
      <div className={styles.cta}>
        <a className={styles.apply} href={post.path}>
          Apply Now
        </a>
        <GatsbyLink to={`/jobs/${post.slug}`}>Full Description</GatsbyLink>
      </div>
    </article>
  );
};

export default PostListing;
