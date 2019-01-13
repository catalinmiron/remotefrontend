import React from 'react';
import Helmet from 'react-helmet';
import { graphql, Link } from 'gatsby';
import moment from 'moment';

import styles from './index.module.css';

const Blog = ({ data, location }) => {
  const articles = data.allWordpressPost.edges;
  return (
    <div className="index-container">
      <Helmet
        title={'Blog | Front End Remote Jobs'}
        meta={[
          {
            name: 'description',
            description: 'Fully remote jobs for front end developers.',
          },
        ]}
      />
      <div className={styles.container}>
        {articles.map(({ node }) => (
          <>
            <h2>{node.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />
            <Link to={`/articles/${node.slug}`}>Read More</Link>
          </>
        ))}
      </div>
    </div>
  );
};

export default Blog;

export const query = graphql`
  query BlogQuery {
    allWordpressPost(
      sort: { fields: date, order: DESC }
      filter: { status: { eq: "publish" } }
    ) {
      edges {
        node {
          id
          slug
          status
          title
          excerpt
        }
      }
    }
  }
`;
