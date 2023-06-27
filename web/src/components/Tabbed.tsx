import React, { useState } from 'react';
import styled from 'styled-components';
import Map from "../components/Map";

const Container = styled.div`
    padding-left: 6%;
    margin-top: 50px;
`

const TabContainer = styled.div`
    width: 93%;
    background-color: #ffffff;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const TabButtonContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    background-color: #e0e0e0;
    border-radius: 5px 5px 0 0;
`;

const TabButton = styled.button<{ active: boolean }>`
    width: 335px; 
    height: 70px;
    background-color: ${({ active }) => (active ? '#ffffff' : '#e0e0e0')};
    border: none;
    border-radius: 3px 3px 0 0;
    color: #333;
    cursor: pointer;
    padding: 10px;
    margin-right: 10px;
`;

const TabContent = styled.div`
    height: 565px;
    width: 100%;
    border: none;
    border-radius: 0 0 3px 3p;
    margin-bottom: 50px;
    padding: 12px;
`

const TabTitle = styled.label`
    text-align: left;
    font: normal normal normal 20px/25px Helvetica Neue;
    letter-spacing: 0px;
    color: #5C4444;
    opacity: 1;
`

const Tabbed: React.FC = () => {
  const [activeTab, setActiveTab] = useState('tab1');

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };
  
  return (
    <Container>
        <TabContainer>
            <TabButtonContainer>
                <TabButton active={activeTab === 'tab1'} onClick={() => handleTabClick('tab1')}>
                    <TabTitle>Localização de Clientes</TabTitle>
                </TabButton>
                <TabButton active={activeTab === 'tab2'} onClick={() => handleTabClick('tab2')}>
                    <TabTitle>Faturamento por mês</TabTitle>
                </TabButton>
            </TabButtonContainer>
            <TabContent>
                {activeTab === 'tab1' && 
                <Map />
                }
                {activeTab === 'tab2' && <label>Faturamento por mês</label>}
            </TabContent>
        </TabContainer>
    </Container>
  );
};

export default Tabbed;
