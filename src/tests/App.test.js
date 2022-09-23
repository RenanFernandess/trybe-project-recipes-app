import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('I will test your application!', () => {
  // Este arquivo pode ser modificado ou deletado sem problemas
  render(<App />);
  const linkElement = screen.getByText(/TRYBE/i);
  expect(linkElement).toBeInTheDocument();
});
