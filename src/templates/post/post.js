import React from 'react';
import { OutboundLink } from 'gatsby-plugin-google-analytics';
import Helmet from 'react-helmet';
import striptags from 'striptags';
import { graphql } from 'gatsby';

import styles from './post.module.scss';
import CallToAction from '../../components/call-to-action/call-to-action';

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
    <>
      <Helmet
        title={`${post.title} at ${post.acf.company}`}
        meta={[{ name: 'description', description }]}
      />
      <article className={styles.wrapper}>
        <h1
          className={styles.title}
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <OutboundLink className={styles.apply} href={post.acf.apply_url}>
          Apply Now
        </OutboundLink>
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        <div className={styles.cta}>
          <OutboundLink href={post.acf.apply_url}>Apply Now =></OutboundLink>
        </div>
        <CallToAction />
      </article>
    </>
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
