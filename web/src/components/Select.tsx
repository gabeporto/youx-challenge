import React from 'react';
import styled from 'styled-components';
import { RiArrowDropDownLine } from 'react-icons/ri';

export interface SelectOption {
    value: string;
    label: string;
}

interface SelectProps {
    name: string;
    defaultValue: string;
    options: SelectOption[];
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    className?: string;
  }
  
const SelectContainer = styled.div`
    position: relative;
    display: inline-block;
    width: 100%;
    height: 46px;
    margin-bottom: 10px;
`;

const SelectStyled = styled.select`
    width: 100%;
    appearance: none;
    background-color: transparent;
    border: 1px solid #d3d3d3;
    border-radius: 4px;
    padding: 8px;
    font-size: 16px;
    color: #686868;
    outline: none;
    height: 46px;
    padding: 10px;
`;

const SelectIcon = styled(RiArrowDropDownLine)`
    position: absolute;
    top: 50%;
    right: 8px;
    transform: translateY(-50%);
    font-size: 30px;
    color: #686868;
`;

export function Select(props : SelectProps) {

  return (
   <SelectContainer>
      <SelectStyled name={props.name} value={props.defaultValue} onChange={props.onChange} className={props.className}>
        {props.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </SelectStyled>
      <SelectIcon />
    </SelectContainer>
  );
};
