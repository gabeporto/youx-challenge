import React from 'react';
import SearchIcon  from '../assets/icons/SearchIcon';
import styled from 'styled-components';

const InputContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 75%;
`;

const Input = styled.input`
    width: 75%;
    min-width: 200px;
    height: 55px;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    border: 1px solid #CCCCCC;
    border-radius: 3px;
    opacity: 1;
    margin-right: 50px;
    padding: 15px;
`;

const IconContainer = styled.div`
  position: absolute;
  background-color: #111;
  width: 53px;
  height: 53px;
  border-radius: 3px;
  top: 50%;
  right: 190px;
  transform: translateY(-50%);
`;

interface SearchProps {
    placeholder: string;
}

const SearchInput = (props : SearchProps) => {
    return (
      <InputContainer>
        <Input type="text" placeholder={props.placeholder} />
        <IconContainer>
          <SearchIcon />
        </IconContainer>
      </InputContainer>
    );
  };
  
  export default SearchInput;