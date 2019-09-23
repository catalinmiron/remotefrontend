import React from 'react';
import Layout from './src/components/layout/layout';

exports.wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>;
};

exports.onRenderBody = ({ pathname, setPostBodyComponents }, options) => {
  if (pathname.includes('post-a-job')) {
    console.log('Adding smallchat');
    return setPostBodyComponents([
      <script
        key="smallchat"
        src="https://embed.small.chat/TNFEUQAFKGNMTA93NZ.js"
        async
      />
    ]);
  }
};
