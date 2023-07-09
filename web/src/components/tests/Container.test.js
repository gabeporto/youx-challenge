/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render } from '@testing-library/react';
import Container from '../Container';

describe('Container component', () => {
  it('renders children correctly', () => {
    const mockChild = <div data-testid="mock-child" />;
    const { getByTestId } = render(<Container>{mockChild}</Container>);
    const childElement = getByTestId('mock-child');

    expect(childElement).toBeInTheDocument();
  });
});
