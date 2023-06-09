import React from 'react';
import PropTypes from 'prop-types';
import Input, { Label } from './styles';

export default function CheckBox({ name, onChange, checked, text, ...res }) {
  return (
    <Label htmlFor={ text }>
      <Input
        { ...res }
        type="checkbox"
        id={ text }
        name={ name }
        onChange={ onChange }
        checked={ checked }
      />
      { text }
    </Label>
  );
}

CheckBox.propTypes = {
  name: PropTypes.node.isRequired,
  checked: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
