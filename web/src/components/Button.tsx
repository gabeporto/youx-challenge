import styled from 'styled-components';
import PlusIcon from '../assets/icons/PlusIcon';

const CreateButton = styled.button`
    display: flex;
    width: 203px;
    height: 54px;
    background: #023E8A 0% 0% no-repeat padding-box;
    border-radius: 5px;
    opacity: 1;
    color: #FFFFFF;
    font-size: 18px;
    justify-content: center;
    padding: 12px;
    cursor: pointer;
    transition: opacity 0.3s ease;

    &:hover {
    opacity: 0.8;
    }
`

type BotaoProps = {
    title: string;
    onClick: () => void;
  };

const Button = ({ title, onClick }: BotaoProps) => {
    return (
        <CreateButton onClick={onClick}>
            <PlusIcon />
            {title}
        </CreateButton>
    )
}

export default Button;