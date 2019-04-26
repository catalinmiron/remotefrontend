import React from 'react';
import Helmet from 'react-helmet';
import striptags from 'striptags';
import { graphql } from 'gatsby';
import FeaturedJob from '../../components/featured-job/featured-job';

import styles from './article.module.scss';
import CallToAction from '../../components/call-to-action/call-to-action';

class Article extends React.Component {
  constructor() {
    super();
    this.state = {
      featuredJob: false
    };
  }

  componentDidMount() {
    this.getRandomFeaturedJob();
  }

  getRandomFeaturedJob() {
    const featuredJobs = this.props.data.featuredJob.edges.filter(
      ({ node }) => node.acf.featured
    );

    const random = Math.floor(Math.random() * featuredJobs.length);

    let featuredJob = this.props.data.featuredJob.edges[0].node;
    if (featuredJobs.length > 0) {
      featuredJob =
        featuredJobs && featuredJobs[random] && featuredJobs[random].node;
    }

    this.setState({
      featuredJob
    });
  }

  render() {
    const post = this.props.data.wordpressPost;
    // Strip html from excerpts.
    const description = striptags(post.excerpt);
    const { featuredJob } = this.state;

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
            <p className={styles.meta}>
              Published <i>{post.date}</i> by <b>{post.author.name}</b>
            </p>
            <div
              className={styles.content}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
          <aside className={styles.sidebar}>
            <div className={styles.featured}>
              {featuredJob && (
                <FeaturedJob
                  post={{
                    title: featuredJob.title,
                    path: featuredJob.acf.apply_url,
                    company: featuredJob.acf.company,
                    snippet: featuredJob.excerpt,
                    slug: featuredJob.slug
                  }}
                />
              )}
            </div>
          </aside>
          <CallToAction />
        </article>
      </>
    );
  }
}

export default Article;

export const query = graphql`
  query ArticlesQuery($id: String!) {
    wordpressPost(id: { eq: $id }) {
      title
      excerpt
      content
      date(formatString: "MMMM D, Y")
      author {
        name
      }
    }
    featuredJob: allWordpressWpJobs(
      sort: { fields: date, order: DESC }
      filter: { status: { eq: "publish" } }
    ) {
      edges {
        node {
          id
          title
          excerpt
          slug
          status
          posted: date
          date
          acf {
            apply_url
            company
            featured
          }
        }
      }
    }
  }
`;
