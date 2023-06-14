import React from 'react';
import PropTypes from 'prop-types';
import { Loading } from '../../atoms';

export default function AwaitReady({ children, ready }) {
  return (
    ready ? <Loading /> : children
  );
}

AwaitReady.propTypes = {
  children: PropTypes.node.isRequired,
  ready: PropTypes.bool.isRequired,
};
