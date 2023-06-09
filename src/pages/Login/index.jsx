import React from 'react';
import { LoginForm, Logo } from '../../Components';
import Container, { Title, TomatoImage } from './styles';
import { tomatoImage } from '../../assets';

export default function Login() {
  return (
    <Container>
      <Logo />
      <TomatoImage src={ tomatoImage } alt="tomato" />
      <Title>Login</Title>
      <LoginForm />
    </Container>
  );
}
