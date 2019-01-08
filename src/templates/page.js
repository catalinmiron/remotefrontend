import React from 'react';
import { Link } from 'gatsby';
import Helmet from 'react-helmet';
import striptags from 'striptags';
import { graphql } from 'gatsby';

import styles from './post/post.module.css';

const Page = ({ data, location }) => {
  const post = data.wordpressPage;

  // Strip html from excerpts.
  const description = striptags(post.excerpt);

  return (
    <>
      <Helmet
        title={`${post.title} | Front End Remote Jobs`}
        meta={[{ name: 'description', description }]}
      />
      <article>
        <h1
          className={styles.title}
          dangerouslySetInnerHTML={{ __html: post.title }}
        />
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        <div className={styles.cta}>
          <Link to="/">Back to Listings</Link>
        </div>
      </article>
    </>
  );
};

export default Page;

export const query = graphql`
  query PagesQuery($id: String!) {
    wordpressPage(id: { eq: $id }) {
      title
      excerpt
      content
    }
  }
`;
