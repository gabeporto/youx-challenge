import UserIcon from '../assets/icons/UserIcon'
import LogoutIcon from '../assets/icons/LogoutIcon'
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Dropdown from './Dropdown';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider/useAuth'

const HeaderContainer = styled.header`
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 115px;
    background-color: #023E8A;
    user-select: none;
`;

const UserContainer = styled.div`
    display: flex;
    justify-items: center;
`

const UserDiv = styled.div`
    padding-top: 25px;
    margin-right: 25px;
`

const UserName = styled.p`
    color: #fff;
    font-size: 1.5rem;
    font-weight: normal;
    cursor: pointer;
`;

const UserRole = styled.p`
    color: #fff;
    font-size: 1rem;
    font-weight: lighter;
    margin-top: 2px;
    cursor: pointer;
`;

const UserIconDiv = styled.div`
    padding-top: 40px;
    margin-right: 15px;
    cursor: pointer;
`

const LogoutDiv = styled(Link)`
    padding-top: 40px;
    margin-right: 30px;
    cursor: pointer;
`

const DropdownDiv = styled.div`
    height: 100%;
`

export default function Header() {

    const auth = useAuth();

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
  
    const hideUser = windowWidth <= 240;
    const hideUserInformations = windowWidth <= 390;

    return (

        <HeaderContainer>
            <DropdownDiv>
                <Dropdown />
            </DropdownDiv>

            <UserContainer>
                {!hideUser && (
                    <UserIconDiv>
                        <UserIcon/>
                    </UserIconDiv>
                )}

                {!hideUserInformations && (
                    <UserDiv>
                        <UserName>João da Silva</UserName>
                        <UserRole>Administrador</UserRole>
                    </UserDiv>
                )}

                <LogoutDiv to="/login" onClick={auth.logout}>
                    <LogoutIcon />
                </LogoutDiv>
            </UserContainer>
        </HeaderContainer>

    );
}