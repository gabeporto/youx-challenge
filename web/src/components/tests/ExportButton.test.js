/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render } from '@testing-library/react';
import ExportButton from '../ExportButton';

describe('ExportButton component', () => {
    it('renders correctly', () => {
        const { getByText } = render(<ExportButton name="Click me" />);
        const buttonElement = getByText('Click me');
    
        expect(buttonElement).toBeInTheDocument();
      });
});
