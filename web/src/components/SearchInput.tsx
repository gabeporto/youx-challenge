import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

const InputContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 93%;
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
  padding: 15px;
  padding: 10px;
  outline: none;

  .MuiCircularProgress-root {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  }
`;

interface SearchProps {
    placeholder: string;
}

const SearchInput = (props : SearchProps) => {

    return (
      <InputContainer>
        <StyledInput
          placeholder={props.placeholder}
          variant="outlined"
          InputProps={{
            endAdornment: (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  position: 'absolute',
                  right: '0',
                  top: '50%',
                  height: '100%',
                  width: '55px',
                  transform: 'translateY(-50%)',
                  paddingRight: '10px',
                  paddingLeft: '16px',
                  background: '#023E8A',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                <SearchIcon htmlColor='#ffffff'/>
              </div>
            ),
          }}
        />
      </InputContainer>
    );
  };
  
  export default SearchInput;