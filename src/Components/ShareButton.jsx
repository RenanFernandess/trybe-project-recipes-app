import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useRouteMatch } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

export default function ShareButton({ testId, url }) {
  const { url: defaultUrl } = useRouteMatch();
  const [linkCopied, setLinkCopied] = useState(false);

  const copyBoard = () => {
    navigator.clipboard.writeText(`http://localhost:3000${url || defaultUrl}`);
    setLinkCopied(true);
  };

  return (
    <div>
      <button
        type="button"
        data-testid={ testId }
        onClick={ copyBoard }
        src={ shareIcon }
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

ShareButton.defaultProps = {
  url: null,
};

ShareButton.propTypes = {
  testId: PropTypes.string.isRequired,
  url: PropTypes.string,
};
