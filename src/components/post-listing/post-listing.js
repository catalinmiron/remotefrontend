import React from 'react'

import styles from './post-listing.module.css'
import GatsbyLink from 'gatsby-link'

const PostListing = ({ post }) => {
  const title = `${
    post.title
    // TODO: this should be css.
  } <span style="font-weight: normal;font-family: 'loraitalic'; text-transform: lowercase; font-size: 0.64em">at</span> ${
    post.company
  }`
  return (
    <article
      aria-label={`${post.title} at ${post.company}`}
      className={styles.posting}
      key={post.date + post.title}
    >
      <h2 dangerouslySetInnerHTML={{ __html: title }} />
      <p className={styles.date}>{post.date}</p>
      {post.snippet && <p dangerouslySetInnerHTML={{ __html: post.snippet }} />}
      <div className={styles.cta}>
        <a className={styles.apply} href={post.path}>
          Apply Now
        </a>
        <GatsbyLink to={post.slug}>Full Description</GatsbyLink>
      </div>
    </article>
  )
}

export default PostListing
