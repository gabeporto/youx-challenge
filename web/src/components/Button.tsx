import styled from 'styled-components';
import PlusIcon from '../assets/icons/PlusIcon';

const StyledButton = styled.div`
    display: flex;
    width: 203px;
    min-height: 54px;
    background: #023E8A 0% 0% no-repeat padding-box;
    border-radius: 5px;
    opacity: 1;
    padding: 12px;
    cursor: pointer;
    transition: opacity 0.3s ease;
    color: #FFFFFF;
    font-size: 18px;
    justify-content: center;

    &:hover {
    opacity: 0.8;
    }

    @media only screen and (max-width: 226px) {
        width: 90%;
    }

`


type BotaoProps = {
    title: string;
    onClick: () => void;
  };

const Button = ({ title, onClick }: BotaoProps) => {
    return (
        <StyledButton onClick={onClick}>
            <PlusIcon />
            {title}
        </StyledButton>
    )
}

export default Button;