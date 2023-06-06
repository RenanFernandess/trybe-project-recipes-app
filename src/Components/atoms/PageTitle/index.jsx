import React from 'react';
import PropTypes from 'prop-types';
import Title from './styles';

export default function PageTitle({ title, icon }) {
  return (
    <Title>
      <img src={ icon } alt={ title } />
      {title}
    </Title>
  );
}

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
};
