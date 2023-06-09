import React from 'react';
import PropTypes from 'prop-types';
import { CheckBox } from '../../atoms';
import Li from './styles';

function Ingredient({ ingredient, measure, index, checked, checkIngredient }) {
  return (
    <Li>
      <CheckBox
        name={ index }
        onChange={ checkIngredient }
        checked={ checked }
        text={ `${ingredient}: ${measure}` }
      />
    </Li>
  );
}

Ingredient.propTypes = {
  ingredient: PropTypes.string.isRequired,
  measure: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  checked: PropTypes.bool.isRequired,
  checkIngredient: PropTypes.func.isRequired,
};

export default Ingredient;
