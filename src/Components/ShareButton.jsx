import React, { useState } from 'react';
import propTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

export default function ShareButton({ testId, index, url }) {
  const [linkCopied, setLinkCopied] = useState(false);

  const copyBoard = () => {
    navigator.clipboard.writeText(`http://localhost:3000${url}`);
    setLinkCopied(true);
  };

  return (
    <div>
      <button
        type="button"
        data-testid={ index
          ? `${index}${testId}`
          : testId }
        onClick={ copyBoard }
      >
        <img
          alt="share"
          src={ shareIcon }
        />
      </button>
      {linkCopied && <p>Link copied!</p> }
    </div>
  );
}

ShareButton.propTypes = {
  index: propTypes.number.isRequired,
  testId: propTypes.string.isRequired,
  url: propTypes.string.isRequired,
};
