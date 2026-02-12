import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders game title', () => {
  const { getByText } = render(<App />);
  expect(getByText('3 Cups Game')).toBeInTheDocument();
});

test('renders 3 cup images', () => {
  const { getAllByAltText } = render(<App />);
  const cups = getAllByAltText('cup');
  expect(cups).toHaveLength(3);
});

test('renders difficulty buttons', () => {
  const { getByText } = render(<App />);
  expect(getByText('Easy')).toBeInTheDocument();
  expect(getByText('Medium')).toBeInTheDocument();
  expect(getByText('Hard')).toBeInTheDocument();
});
