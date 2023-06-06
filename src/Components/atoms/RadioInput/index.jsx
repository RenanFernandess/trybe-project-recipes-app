import React from 'react';
import PropTypes from 'prop-types';
import Input from './styles';

export default function RadioInput({ name, onChange, value, text, ...res }) {
  return (
    <label htmlFor={ name }>
      <Input
        { ...res }
        type="radio"
        id={ name }
        name={ name }
        onChange={ onChange }
        value={ value }
      />
      { text }
    </label>
  );
}

RadioInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
