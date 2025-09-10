import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import App from '../App';

test('renders CONNECT header', () => {
  render(<Provider store={store}><App /></Provider>);
  expect(screen.getByText(/CONNECT/i)).toBeInTheDocument();
});
