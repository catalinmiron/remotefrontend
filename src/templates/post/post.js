import React from 'react';
import { graphql } from 'gatsby';

import JobListing from '../../components/job-listing/job-listing';

const Post = ({ data, location }) => {
  const post = data.wordpressWpJobs;

  return (
    <JobListing
      title={post.title}
      excerpt={post.excerpt}
      content={post.content}
      company={post.acf.company}
      url={post.acf.apply_url}
    />
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
