import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import moment from 'moment';

import Layout from '../components/layout';
import PostListing from '../components/post-listing/post-listing';
import Checkout from '../components/checkout/checkout';

import styles from './index.module.css';

const Index = ({ data }) => {
  const jobs = data.allWordpressWpJobs.edges;
  return (
    <Layout>
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
          <Checkout lambdaEndpoint={data.site.siteMetadata.lambdaEndpoint} />
          {jobs
            .filter(({ node }) => {
              const thirtyDaysAgo = new Date(
                new Date().setDate(new Date().getDate() - 30)
              );
              // Only show dates from 30 days ago and up.
              return new Date(node.date) > thirtyDaysAgo;
            })
            .map(({ node }) => (
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
    site {
      siteMetadata {
        lambdaEndpoint
      }
    }
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
          }
        }
      }
    }
  }
`;
