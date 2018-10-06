import React from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import striptags from 'striptags';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import styles from './post/post.module.css';

const Page = ({ data }) => {
  const post = data.wordpressPage;

  // Strip html from excerpts.
  const description = striptags(post.excerpt);

  return (
    <Layout>
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
    </Layout>
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
