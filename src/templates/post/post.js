import React from 'react';
import { Link } from 'gatsby';
import { OutboundLink } from 'gatsby-plugin-google-analytics';
import Helmet from 'react-helmet';
import striptags from 'striptags';
import { graphql } from 'gatsby';

import Layout from '../../components/layout';
import styles from './post.module.css';

const Post = ({ data, location }) => {
  const post = data.wordpressWpJobs;

  // Strip html from excerpts.
  const description = striptags(post.excerpt);

  const title = `${
    post.title
    // TODO: this should be css.
  } <span style="font-weight: normal;font-family: 'Lora', sans-serif; font-style: italic; text-transform: lowercase; font-size: 0.64em">at</span> ${
    post.acf.company
  }`;

  return (
    <Layout location={location}>
      <Helmet
        title={`${post.title} at ${post.acf.company}`}
        meta={[{ name: 'description', description }]}
      />
      <article>
        <h1
          className={styles.title}
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <OutboundLink href={post.acf.apply_url}>Apply Now</OutboundLink>
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        <div className={styles.cta}>
          <OutboundLink href={post.acf.apply_url}>Apply Now</OutboundLink>
          <Link to="/">Back to Listings</Link>
        </div>
      </article>
    </Layout>
  );
};

export default Post;

export const query = graphql`
  query PostsQuery($id: String!) {
    wordpressWpJobs(id: { eq: $id }) {
      title
      excerpt
      acf {
        company
        apply_url
      }
      content
    }
  }
`;
