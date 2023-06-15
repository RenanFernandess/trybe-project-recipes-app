import React from 'react';
import propTypes from 'prop-types';
import { ShareButton } from '../../molecules';
import { HorizontalCardImage, HorizontalCardTitle } from '../../atoms';
import Container, { About, SectionLink, Share, Tags } from './styles';

export default function DoneRecipeCard({
  image, name, category, date, tags, nationality, alcoholicOrNot, id, type,
}) {
  return (
    <Container>
      <Share>
        <ShareButton url={ `/${type}s/${id}` } />
      </Share>
      <SectionLink to={ `/${type}s/${id}` }>
        <HorizontalCardImage
          src={ image }
          alt="Recipe image"
        />
        <About>
          <HorizontalCardTitle
            title={ name }
            nationality={ nationality }
            category={ `${category} ${alcoholicOrNot || ''}` }
          />
          <p>
            { 'Done in: ' }
            { date }
          </p>
          <Tags>
            {
              tags.map((tag) => (
                <p key={ tag }>{ tag }</p>
              ))
            }
          </Tags>
        </About>
      </SectionLink>
    </Container>
  );
}

DoneRecipeCard.propTypes = {
  image: propTypes.string,
  name: propTypes.string,
  index: propTypes.number,
}.isRequired;
