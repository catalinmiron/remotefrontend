import React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import striptags from 'striptags'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import styles from './post.module.css'

const Post = ({ data }) => {
  const post = data.wordpressWpJobs

  // Strip html from excerpts.
  const description = striptags(post.excerpt)

  const title = `${
    post.title
    // TODO: this should be css.
  } <span style="font-weight: normal;font-family: 'loraitalic'; text-transform: lowercase; font-size: 0.64em">at</span> ${
    post.acf.company
  }`

  return (
    <Layout>
      <Helmet
        title={`${post.title} at ${post.acf.company}`}
        meta={[{ name: 'description', description }]}
      />
      <article>
        <h1
          className={styles.title}
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <a href={post.acf.apply_url}>Apply Now</a>
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        <div className={styles.cta}>
          <a href={post.acf.apply_url}>Apply Now</a>
          <Link to="/">Back to Listings</Link>
        </div>
      </article>
    </Layout>
  )
}

export default Post

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
`
