import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

import Header from '../header/header';
import './layout.css';
import Footer from '../footer/footer';
import PageTransition from '../transition/transition';

const Layout = ({ children, ...props }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            {
              name: 'description',
              content: 'Fully remote jobs for front end developers.',
            },
          ]}
        >
          <html lang="en-US" />
        </Helmet>
        <Header siteTitle={data.site.siteMetadata.title} />
        <PageTransition location={props.location}>
          <div className="container">{children}</div>
          <Footer location={props.location} />
        </PageTransition>
      </>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
