import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'

import Footer from '../components/footer/footer'
import PostListing from '../components/post-listing/post-listing'
import Header from '../components/header/header'

import styles from './index.module.css'

const Index = ({ data }) => {
  const jobs = data.allWordpressWpJobs.edges
  return (
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
      <Header />
      <div className={styles.container}>
        {jobs
          .filter(({ node }) => {
            const thirtyDaysAgo = new Date(
              new Date().setDate(new Date().getDate() - 30)
            )
            // Only show dates from 30 days ago and up.
            return new Date(node.date) > thirtyDaysAgo
          })
          .map(({ node }) => (
            <PostListing
              key={node.id}
              post={{
                title: node.title,
                path: node.acf.apply_url,
                company: node.acf.company,
                snippet: node.excerpt,
                date: node.posted,
                slug: node.slug,
              }}
            />
          ))}
        <Footer />
      </div>
    </div>
  )
}

export default Index

export const query = graphql`
  query JobsQuery {
    allWordpressWpJobs {
      edges {
        node {
          id
          title
          excerpt
          slug
          posted: date(fromNow: true)
          date
          acf {
            apply_url
            company
          }
        }
      }
    }
  }
`
