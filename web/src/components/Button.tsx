import styled from 'styled-components';
import AddIcon from '@mui/icons-material/Add';

const StyledButton = styled.div`
    display: flex;
    padding: 5px;
    width: 203px;
    min-height: 54px;
    background: #023E8A 0% 0% no-repeat padding-box;
    border-radius: 5px;
    opacity: 1;
    cursor: pointer;
    color: #FFFFFF;
    font-size: 16px;
    justify-content: center; 
    align-items: center;
    gap: 4px;
    transition: opacity 0.3s ease;

    &:hover {
        opacity: 0.8;
    }

    @media only screen and (max-width: 226px) {
        width: 90%;
        font-size: 14px;
    }

`

type BotaoProps = {
    title: string;
    type: string;
    onClick: () => void;
  };

const Button = ({ title, type, onClick }: BotaoProps) => {
    return (
        <StyledButton onClick={onClick}>
            {type === 'add' && ( <AddIcon /> ) }
            {title}
        </StyledButton>
    )
}

export default Button;