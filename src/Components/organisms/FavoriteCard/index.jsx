import React from 'react';
import PropTypes from 'prop-types';
import { FavoriteButton, ShareButton } from '../../molecules';
import { HorizontalCardImage, HorizontalCardTitle } from '../../atoms';
import Container, { About, DivLink, Div } from './styles';

export default function FavoriteCard({
  image, name, category, nationality, alcoholicOrNot, id, type,
}) {
  const URL = `/${type}s/${id}`;
  const recipe = { image, name, category, nationality, alcoholicOrNot, id, type };
  return (
    <Container>
      <DivLink to={ URL }>
        <HorizontalCardImage
          src={ image }
          alt="Recipe image"
        />
      </DivLink>
      <About to={ URL }>
        <HorizontalCardTitle
          title={ name }
          nationality={ nationality }
          category={ `${category} ${alcoholicOrNot || ''}` }
        />
      </About>
      <Div>
        <ShareButton url={ URL } />
        <FavoriteButton recipe={ recipe } />
      </Div>
    </Container>
  );
}

FavoriteCard.propTypes = {
  alcoholicOrNot: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  nationality: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
