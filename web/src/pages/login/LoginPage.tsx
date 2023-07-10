/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { SetStateAction, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthProvider/useAuth'

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
    height: 80%;
    width: 500px;
    box-shadow: 5px 5px 20px #00000029;
    border-radius: 12px;

    @media only screen and (max-width: 330px) {
        height: 90%;
    }
`

const FirstSection = styled.div`
    width: 100%;
    height: 25%;
    background-color: #023E8A;
    border-radius: 12px 12px 0 0;
    position: relative;
`

const SecondSection = styled.div`
    display: flex;
    flex-direction: column;
    height: 70%;
    width: 100%;
    padding: 30px 50px;
    justify-content: center;

    @media only screen and (max-width: 330px) {
        padding: 30px 15px;
    }
`

const Logo = styled.img`
    width: 80px;
    height: 80px;
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
    text-align: center;
    font-size: 16px;
    transition: opacity 0.3s ease;

    &:hover {
        opacity: 0.8;
    }
`;

const SecondButton = styled(Link)`
    margin-top: 15px;
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    background-color: #023E8A;
    color: #fff;
    border: none;
    cursor: pointer;
    font-size: 16px;
    text-align: center;
    transition: opacity 0.3s ease;

    &:hover {
        opacity: 0.8;
    }
`;

const ErrorLabel = styled.label`
    text-align: center;
    margin-bottom: 20px;
    color: red;
`

export default function LoginPage() {

    const auth = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorLogin, setErrorLogin] = useState<boolean>(false);

    const emailInputChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setErrorLogin(false);
        setEmail(event.target.value);
    }

    const passwordInputChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setErrorLogin(false);
        setPassword(event.target.value);
    }

    const submitForm = (event: React.FormEvent) => {
        event.preventDefault();
        logIn();
    };

    const navigate = useNavigate();

    const goToClientPage = () => {
        navigate('/client');
      };

    async function logIn() {
        
        try {
            await auth.authenticate(email, password);
            goToClientPage();
        } catch (error) {
            console.log(error);
        } 
    }

    return (
        <Container>
            <Card>
                <FirstSection>
                    <Logo src="/logo.png" alt="Logo" />
                </FirstSection>
                <SecondSection>
                    <FormTitle>Login</FormTitle>
                    <Form>
                        <StyledLabel>
                        Email:
                        <StyledInput type="email" onChange={emailInputChange}/>
                        </StyledLabel>

                        <StyledLabel>
                        Senha:
                        <StyledInput type="password" onChange={passwordInputChange}/>
                        </StyledLabel>

                        <ErrorLabel hidden={!errorLogin}>Usuário e/ou senha inválidos.</ErrorLabel>

                        <FirstButton type="submit" onClick={submitForm}>Entrar</FirstButton>
                    </Form>
                    <SecondButton to="/register">Cadastrar novo usuário</SecondButton>
                </SecondSection>
            </Card>
        </Container>
    )
}
