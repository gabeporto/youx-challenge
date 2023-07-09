/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render } from '@testing-library/react';
import Tabbed from '../Tabbed';

describe('Tabbed component', () => {
  it('renders correctly', () => {
    const tabs = [
      {
        id: 1,
        title: 'Tab 1',
        children: [<div key={1}>Tab 1 Content</div>],
      },
      {
        id: 2,
        title: 'Tab 2',
        children: [<div key={1}>Tab 2 Content</div>],
      },
    ];
    const { getByText } = render(<Tabbed tabs={tabs} />);
    const tab1Content = getByText('Tab 1 Content');

    expect(tab1Content).toBeInTheDocument();
  });
});
