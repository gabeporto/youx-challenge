import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { ChangeEvent } from 'react';

const InputContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
`;

const StyledInput = styled(TextField)`
  position: relative;
  width: 100%;
  min-width: 200px;
  height: 55px;
  background: #FFFFFF 0% 0% no-repeat padding-box;
  border: 1px solid #CCCCCC;
  border-radius: 3px;
  opacity: 1;
  margin-right: 50px;
  padding: 10px;
  outline: none;
`;

const StyledBarInput = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  right: 0;
  top: 50%;
  height: 100%;
  width: 55px;
  transform: translateY(-50%);
  padding-right: 10px;
  padding-left: 16px;
  background-color: #023E8A;
  border-radius: 5px;
  cursor: pointer;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`

interface InputProps {
    placeholder: string;
    type: string;
    onChange: (value: string) => void;
}

const Input = (props : InputProps) => {

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      props.onChange(value);
    };

    return (
      <InputContainer>
        <StyledInput
          placeholder={props.placeholder}
          onChange={handleChange}
          variant="outlined"
          InputProps={{
            endAdornment: (
              <StyledBarInput>
                {props.type === 'search' && ( <SearchIcon htmlColor='#ffffff'/> )}
              </StyledBarInput>
            ),
          }}
        />
      </InputContainer>
    );
  };
  
  export default Input;