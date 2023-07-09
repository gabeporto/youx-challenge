/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Input from '../Input';

describe('Input component', () => {
  it('calls onChange handler when input value changes', () => {
    const handleChangeMock = jest.fn();
    const { getByPlaceholderText } = render(<Input placeholder="Search" type="search" onChange={handleChangeMock} />);
    const inputElement = getByPlaceholderText('Search');

    fireEvent.change(inputElement, { target: { value: 'test' } });

    expect(handleChangeMock).toHaveBeenCalledTimes(1);
    expect(handleChangeMock).toHaveBeenCalledWith('test');
  });
});
