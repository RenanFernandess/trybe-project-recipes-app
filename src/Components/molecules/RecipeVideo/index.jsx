import React from 'react';
import PropTypes from 'prop-types';
import Frame, { Container, Title } from './styles';

export default function RecipeVideo({ url }) {
  const URL_CODE = url.split('=')[1];

  return (
    <Container>
      <Title>Video</Title>
      <Frame
        data-testid="video"
        src={ `https://www.youtube.com/embed/${URL_CODE}` }
        title="Embedded youtube"
        frameBorder="0"
        allow="
                accelerometer;
                autoplay;
                clipboard-write;
                encrypted-media;
                gyroscope;
                picture-in-picture"
      />
    </Container>
  );
}

RecipeVideo.propTypes = {
  url: PropTypes.string.isRequired,
};
