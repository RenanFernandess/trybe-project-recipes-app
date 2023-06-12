import React from 'react';
import PropTypes from 'prop-types';
import { ProfileNav } from '../../organisms';
import Container, { Text } from './styles';

export default function ProfileContent({ email }) {
  return (
    <Container>
      <Text>{ email }</Text>
      <ProfileNav />
    </Container>
  );
}

ProfileContent.propTypes = {
  email: PropTypes.string.isRequired,
};
