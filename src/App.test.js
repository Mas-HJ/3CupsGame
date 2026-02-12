import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the game board', () => {
  render(<App />);
  const images = screen.getAllByAltText('cup');
  expect(images.length).toBe(3);
});
