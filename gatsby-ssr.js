import React from 'react';
import Layout from './src/components/layout/layout';

export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>;
};

export const onRenderBody = ({ pathname, setPostBodyComponents }, options) => {
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
