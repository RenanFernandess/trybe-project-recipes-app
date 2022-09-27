import React, { useState } from 'react';
import propTypes from 'prop-types';
import appContext from './appContext';

export default function Provider({ children }) {
  const [history, setHistory] = useState({});
  const [URL, setURL] = useState('');

  const contextType = {
    history,
    setHistory,
    URL,
    setURL,
  };

  return (
    <appContext.Provider value={ contextType }>
      { children }
    </appContext.Provider>
  );
}

Provider.propTypes = {
  children: propTypes.node,
}.isRequired;
