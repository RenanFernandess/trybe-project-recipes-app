import React from 'react';
import PropTypes from 'prop-types';
import { ProfileNav } from '../../organisms';
import Container from './styles';

export default function ProfileContent({ email }) {
  return (
    <Container>
      <p>{ email }</p>
      <ProfileNav />
    </Container>
  );
}

ProfileContent.propTypes = {
  email: PropTypes.string.isRequired,
};
