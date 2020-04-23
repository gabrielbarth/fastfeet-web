import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import DefaultLayout from '~/pages/_layouts/default';
import SigIn from '../pages/SignIn';

export default function RouteWrappepr({
  component: Component,
  isPrivate,
  ...rest
}) {
  const signed = false;

  if (!signed && isPrivate) {
    return <Redirect to="/" />;
  }
  if (signed && !isPrivate) {
    return <Redirect to="/deliveries" />;
  }

  const Layout = signed ? DefaultLayout : SigIn;

  return (
    <Route
      {...rest}
      render={(props) => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
  // return <Route {...rest} component={Component} />
}

RouteWrappepr.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};

RouteWrappepr.defaultProps = {
  isPrivate: false,
};
