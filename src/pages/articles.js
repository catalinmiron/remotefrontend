import React from 'react';
import Helmet from 'react-helmet';
import { graphql, Link } from 'gatsby';

import styles from './articles.module.scss';

const Blog = ({ data }) => {
  const articles = data.allWordpressPost.edges;
  return (
    <>
      <Helmet
        title={'Articles | Front End Remote Jobs'}
        meta={[
          {
            name: 'description',
            description: 'Fully remote jobs for front end developers.'
          }
        ]}
      />
      <div className={styles.container}>
        <div>
          {articles.map(({ node }) => (
            <article key={node.title} className={styles.article}>
              <h2 className={styles.title}>{node.title}</h2>
              <p className={styles.date}>{node.date}</p>
              <div
                className={styles.excerpt}
                dangerouslySetInnerHTML={{ __html: node.excerpt }}
              />
              <Link
                aria-label={`Read ${node.title}`}
                className={styles.link}
                to={`/articles/${node.slug}`}
              >
                Read Now =>
              </Link>
            </article>
          ))}
        </div>
        <aside />
      </div>
    </>
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
          date(formatString: "MMMM D, Y")
        }
      }
    }
  }
`;
