import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useRouteMatch } from 'react-router-dom';
import { ButtonIcon } from '../../atoms';
import { shareIcon } from '../../../assets';

export default function ShareButton({ url }) {
  const URL_BASE = document.URL.href.match(/^\w+:\/\/\w+:\d+/i)[0];
  const { url: defaultUrl } = useRouteMatch();
  const [linkCopied, setLinkCopied] = useState(false);

  const copyBoard = () => {
    navigator.clipboard.writeText(`${URL_BASE}${url || defaultUrl}`);
    setLinkCopied(true);
  };

  return (
    <div>
      <ButtonIcon
        onClick={ copyBoard }
        icon={ shareIcon }
        alt="Share button"
      />
      {linkCopied && <p>Link copied!</p> }
    </div>
  );
}

ShareButton.defaultProps = {
  url: null,
};

ShareButton.propTypes = {
  url: PropTypes.string,
};
