import UserIcon from '../assets/icons/UserIcon'
import LogoutIcon from '../assets/icons/LogoutIcon'
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Dropdown from './Dropdown';

const HeaderContainer = styled.header`
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 115px;
    background-color: #023E8A;
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

const LogoutDiv = styled.div`
    padding-top: 40px;
    margin-right: 30px;
    cursor: pointer;
`

export default function Header() {

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
            <div>
                <Dropdown />
            </div>

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

                <LogoutDiv>
                    <LogoutIcon />
                </LogoutDiv>
            </UserContainer>
        </HeaderContainer>

    );
}