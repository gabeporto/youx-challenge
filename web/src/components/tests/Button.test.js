/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button from '../Button';

describe('Button component', () => {
  it('renders correctly', () => {
    const { getByText } = render(<Button title="Click me" />);
    const buttonElement = getByText('Click me');

    expect(buttonElement).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', () => {
    const onClickMock = jest.fn();
    const { getByText } = render(<Button title="Click me" onClick={onClickMock} />);
    const buttonElement = getByText('Click me');

    fireEvent.click(buttonElement);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it('does not trigger a hover effect when disabled', () => {
    const { getByText } = render(<Button title="Click me" disabled />);
    const buttonElement = getByText('Click me');

    fireEvent.mouseEnter(buttonElement);

    expect(buttonElement).not.toHaveClass('hover');
  });
});
