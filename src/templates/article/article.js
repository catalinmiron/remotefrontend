import React from 'react';
import { Link } from 'gatsby';
import Helmet from 'react-helmet';
import striptags from 'striptags';
import { graphql } from 'gatsby';
import FeaturedJob from '../../components/featured-job/featured-job';
import moment from 'moment';

import styles from './article.module.css';

const Article = ({ data, location }) => {
  const post = data.wordpressPost;
  const featuredJob = data.featuredJob.edges[0].node;

  // Strip html from excerpts.
  const description = striptags(post.excerpt);

  return (
    <>
      <Helmet
        title={`${post.title} | Front End Remote Jobs`}
        meta={[{ name: 'description', description }]}
      />
      <article className={styles.grid}>
        <div>
          <h1
            className={styles.title}
            dangerouslySetInnerHTML={{ __html: post.title }}
          />
          <p>
            Published <i>{post.date}</i> by <b>{post.author.name}</b>
          </p>
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
        <aside className={styles.sidebar}>
          <div className={styles.featured}>
            <FeaturedJob
              post={{
                title: featuredJob.title,
                path: featuredJob.acf.apply_url,
                company: featuredJob.acf.company,
                snippet: featuredJob.excerpt,
                date: moment(featuredJob.posted).fromNow(),
                slug: featuredJob.slug,
              }}
            />
          </div>
        </aside>
        <div className={styles.cta}>
          <Link to="/">Back to Listings</Link>
        </div>
      </article>
    </>
  );
};

export default Article;

export const query = graphql`
  query ArticlesQuery($id: String!) {
    wordpressPost(id: { eq: $id }) {
      title
      excerpt
      content
      date(fromNow: true)
      author {
        name
      }
    }
    featuredJob: allWordpressWpJobs(
      sort: { fields: date, order: DESC }
      limit: 1
    ) {
      edges {
        node {
          id
          title
          excerpt
          slug
          posted: date
          date
          acf {
            apply_url
            company
          }
        }
      }
    }
  }
`;
