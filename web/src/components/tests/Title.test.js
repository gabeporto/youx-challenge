/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render } from '@testing-library/react';
import Title from '../Title';

describe('Title component', () => {
  it('renders correctly', () => {
    const title = 'Sample Title';

    const { getByText } = render(<Title title={title} />);

    const pageTitle = getByText(title);

    expect(pageTitle).toBeInTheDocument();
  });
});
