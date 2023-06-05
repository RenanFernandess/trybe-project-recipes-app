import React from 'react';
import PropTypes from 'prop-types';
import Input from './styles';

export default function TextInput({ type, name, onChange, value, ...res }) {
  return (
    <Input
      { ...res }
      type={ type }
      name={ name }
      onChange={ onChange }
      value={ value }
    />
  );
}

TextInput.defaultProps = {
  type: 'text',
};

TextInput.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
