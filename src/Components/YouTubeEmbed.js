import React from 'react';
import propTypes from 'prop-types';

export default function YouTubeEmbed({ videoID }) {
  return (
    <div>
      <iframe
        data-testid="video"
        src={ `https://www.youtube.com/embed/${videoID}` }
        frameBorder="0"
        title="Embedded youtube"
        allow="
                accelerometer;
                autoplay;
                clipboard-write;
                encrypted-media;
                gyroscope;
                picture-in-picture"
      />
    </div>
  );
}

YouTubeEmbed.propTypes = {
  videoID: propTypes.string,
}.isRequired;
