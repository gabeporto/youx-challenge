import { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';
import PlusIcon from '../assets/icons/PlusIcon';

const CreateButton = styled.div`
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
`

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    title: string;
}

export default function Button(props : ButtonProps) {
    return (
        <CreateButton>
            <PlusIcon />
            {props.title}
        </CreateButton>
    )
}