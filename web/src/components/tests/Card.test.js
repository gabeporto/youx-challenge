/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render } from '@testing-library/react';
import Card from '../Card';

describe('Card component', () => {
  it('renders correctly with title and value', () => {
    const title = 'Total Sales';
    const value = 1000;
    const { getByText } = render(<Card title={title} value={value} iconType="money" />);
    
    const titleElement = getByText(title);
    const valueElement = getByText(value.toString());

    expect(titleElement).toBeInTheDocument();
    expect(valueElement).toBeInTheDocument();
  });
});
