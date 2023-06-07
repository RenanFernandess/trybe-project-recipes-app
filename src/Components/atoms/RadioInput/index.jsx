import React from 'react';
import PropTypes from 'prop-types';
import Input, { Label } from './styles';

export default function RadioInput({ name, onChange, value, text, ...res }) {
  return (
    <Label htmlFor={ value }>
      <Input
        { ...res }
        type="radio"
        id={ value }
        name={ name }
        onChange={ onChange }
        value={ value }
      />
      { text }
    </Label>
  );
}

RadioInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
