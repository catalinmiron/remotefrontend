import React from 'react';
import { useStaticQuery } from 'gatsby';

export const useTech = () => {
  const { tech } = useStaticQuery(graphql`
    query useTech {
      tech: allWordpressWpTechnology {
        nodes {
          wordpress_id
          slug
          name
        }
      }
    }
  `);

  return tech.nodes;
};
