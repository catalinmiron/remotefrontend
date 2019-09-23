import React from 'react';
import Layout from './src/components/layout/layout';
import Helmet from 'react-helmet';

export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>;
};

export const onRenderBody = (
  { pathname, setPostBodyComponents },
  pluginOptions
) => {
  // Adds smallchat to post-a-job page only.
  if (pathname.includes('post-a-job')) {
    setPostBodyComponents([
      <Helmet>
        <script src="https://embed.small.chat/TNFEUQAFKGNMTA93NZ.js" async />
      </Helmet>
    ]);
  }
};
