import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import moment from 'moment';

import Layout from '../components/layout';
import PostListing from '../components/post-listing/post-listing';

import styles from './index.module.css';

const Index = ({ data, location }) => {
  const jobs = data.allWordpressWpJobs.edges.filter(({ node }) => {
    const thirtyDaysAgo = new Date(
      new Date().setDate(new Date().getDate() - 30)
    );
    // Only show dates from 30 days ago and up.
    return new Date(node.date) > thirtyDaysAgo;
  });

  const notFeatured = jobs.filter(({ node }) => !node.acf.featured_job);

  const featured = jobs.filter(({ node }) => {
    console.log(node.acf);
    return node.acf.featured_job !== null;
  });

  return (
    <Layout location={location}>
      <div className="index-container">
        <Helmet
          title={'Front End Remote Jobs'}
          meta={[
            {
              name: 'description',
              description: 'Fully remote jobs for front end developers.',
            },
          ]}
        />

        <div className={styles.container}>
          <h2>Featured</h2>
          <hr />
          {featured.map(({ node }) => (
            <PostListing
              key={node.id}
              post={{
                title: node.title,
                path: node.acf.apply_url,
                company: node.acf.company,
                snippet: node.excerpt,
                featured: true,
                slug: node.slug,
              }}
            />
          ))}
          <hr />
          {notFeatured.map(({ node }) => (
            <PostListing
              key={node.id}
              post={{
                title: node.title,
                path: node.acf.apply_url,
                company: node.acf.company,
                snippet: node.excerpt,
                date: moment(node.posted).fromNow(),
                slug: node.slug,
              }}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Index;

export const query = graphql`
  query JobsQuery {
    allWordpressWpJobs(sort: { fields: date, order: DESC }) {
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
            featured_job
          }
        }
      }
    }
  }
`;
