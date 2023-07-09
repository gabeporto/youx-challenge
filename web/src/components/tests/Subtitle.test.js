/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render } from '@testing-library/react';
import Subtitle from '../Subtitle';

describe('Subtitle component', () => {
  it('renders correctly', () => {
    const subtitle = 'This is a subtitle';
    const { getByText } = render(<Subtitle subtitle={subtitle} />);
    const subtitleElement = getByText(subtitle);

    expect(subtitleElement).toBeInTheDocument();
  });

});
