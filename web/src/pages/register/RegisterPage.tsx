/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { SetStateAction, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Select } from '../../components/Select';

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #FFF;
    padding: 15px;
`;

const Card = styled.div`
    display: flex;
    flex-direction: column;
    width: 500px;
    box-shadow: 5px 5px 20px #00000029;
    border-radius: 12px;

`

const FirstSection = styled.div`
    width: 100%;
    min-height: 80px;
    background-color: #023E8A;
    border-radius: 12px 12px 0 0;
    position: relative;
`

const SecondSection = styled.div`
    display: flex;
    flex-direction: column;
    height: 80%;
    width: 100%;
    padding: 30px 50px;
    justify-content: center;

    @media only screen and (max-width: 330px) {
        padding: 30px 15px;
    }
`

const Logo = styled.img`
    width: 50px;
    height: 50px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

`;

const StyledLabel = styled.p`
    margin-bottom: 5px;
    text-align: left;
    font-size: 16px;
    letter-spacing: 0px;
    color: #000;
    opacity: 1;

    @media only screen and (max-width: 490px) {
        margin-top: 5px;
    }
`

const StyledInput = styled.input`
    width: 100%;
    margin-bottom: 20px;
    padding: 10px;
    border: 1px solid #CCCCCC;
    border-radius: 3px;
    color: #686868;
    font-size: 16px;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const FormTitle = styled.h1`
    color: #000;
    font-size: 30px;
    font-weight: medium;
    text-align: center;
`

const FirstButton = styled.button`
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: opacity 0.3s ease;

    &:hover {
        opacity: 0.8;
    }
`;

const SecondButton = styled(Link)`
    margin-top: 15px;
    color: #000;
    border: none;
    cursor: pointer;
    font-size: 13px;
    text-align: center;
    transition: color 0.3s ease;

    &:hover {
        color: #023E8A
    }
`;

export default function RegisterPage() {

    const [ name, setName ] = useState<string>('');
    const [ email, setEmail ] = useState<string>('');
    const [ role, setRole ] = useState<number>(0);
    const [ password, setPassword ] = useState<string>('');

    const [ nameValid, setNameValid ] = useState<boolean>(true); 
    const [ emailValid, setEmailValid ] = useState<boolean>(true); 
    const [ roleValid, setRoleValid ] = useState<boolean>(true); 
    const [ passwordValid, setPasswordValid ] = useState<boolean>(true); 

    const nameInputChange = (event: { target: { value: SetStateAction<string>; }; }) => {

        if(event.target.value.length <= 3) {
            setNameValid(false);
        } else {
            setNameValid(true);
            setName(event.target.value);
        }
    }

    const emailInputChange = (event: { target: { value: SetStateAction<string>; }; }) => {

        const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(event.target.value.toString()) && event.target.value.length >= 5;

        if(!isEmailValid) {
            setEmailValid(false);
        } else {
            setEmailValid(true);
            setEmail(event.target.value);
        }
    }

    const roleInputChange = (event: React.ChangeEvent<HTMLSelectElement>) => {

        if(event.target.value === '0') {
            setRoleValid(false);
        } else {
            setRoleValid(true);
            setRole(Number(event.target.value));
        }
    }

    const passwordInputChange = (event: { target: { value: SetStateAction<string>; }; }) => {

        if(event.target.value.length <= 3) {
            setPasswordValid(false);
        } else {
            setPasswordValid(true);
            setPassword(event.target.value);
        }
    }

    const submitForm = (event: React.FormEvent) => {
        event.preventDefault();
        const currentName = name;
        const currentEmail = email;
        const currentRole = role;
        const currentPassword = password;
        console.log(currentName, currentEmail, currentRole, currentPassword);
    };

    const roleOptions = [
        {
            value: 0,
            label: 'Selecione uma opção'
        },
        {
            value: 1,
            label: 'Administrador'
        },
        {
            value: 2,
            label: 'Engenheiro'
        },
        {
            value: 3,
            label: 'Analista'
        }
    ]

    return (
        <Container>
            <Card>
                <FirstSection>
                    <Logo src="/logo.png" alt="Logo" />
                </FirstSection>
                <SecondSection>
                    <FormTitle>Cadastro</FormTitle>
                    <Form>
                        <StyledLabel className={!nameValid ? 'invalid-label' : ''}>
                        Nome:
                        <StyledInput type="text" onChange={nameInputChange} className={!nameValid ? 'invalid-input' : ''}/>
                        </StyledLabel>

                        <StyledLabel className={!emailValid ? 'invalid-label' : ''}>
                        Email:
                        <StyledInput type="email" onChange={emailInputChange} className={!emailValid ? 'invalid-input' : ''}/>
                        </StyledLabel>

                        <StyledLabel className={!roleValid ? 'invalid-label' : ''}>
                        Cargo:
                        <Select options={roleOptions} onChange={roleInputChange} name="role" className={!roleValid ? 'invalid-input' : ''}/>
                        </StyledLabel>

                        <StyledLabel className={!passwordValid ? 'invalid-label' : ''}>
                        Senha:
                        <StyledInput type="password" onChange={passwordInputChange} className={!passwordValid ? 'invalid-input' : ''}/>
                        </StyledLabel>

                        <FirstButton type="submit" onClick={submitForm}>Cadastrar</FirstButton>
                    </Form>
                    <SecondButton to="/login">Já possuo conta. Desejo realizar login.</SecondButton>
                </SecondSection>
            </Card>
        </Container>
    )
}
