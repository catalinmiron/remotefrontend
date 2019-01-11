import React from 'react';
import Layout from './src/components/layout/layout';

export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>;
};

const transitionDelay = 250;

export const shouldUpdateScroll = ({
  routerProps: { location },
  getSavedScrollPosition,
}) => {
  if (location.action === 'PUSH') {
    window.setTimeout(
      () => window.scrollTo({ top: 0, left: 0 }),
      transitionDelay
    );
  } else {
    const savedPosition = getSavedScrollPosition(location);
    window.setTimeout(
      () => window.scrollTo(...(savedPosition || [0, 0])),
      transitionDelay
    );
  }
  return false;
};
