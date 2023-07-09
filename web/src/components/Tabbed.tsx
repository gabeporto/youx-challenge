import React, { ReactNode, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    padding-left: 6%;
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

const TabButton = styled.button<ButtonProp>`
    width: 335px; 
    height: 70px;
    background-color: ${({ active }) => (active === 'true' ? '#ffffff' : '#e0e0e0')};
    border: none;
    border-radius: 3px 3px 0 0;
    color: #333;
    cursor: pointer;
    padding: 10px;
    margin-right: 10px;
`;

const TabContent = styled.div`
    height: 100%;
    min-height: 565px;
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

const ContentDiv = styled.div`
    width: 100%;
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
`

interface ButtonProp {
    active: string;
}

interface TabProps {
    id: number,
    title: string,
    children: ReactNode[],
}

interface TabbedProps {
    tabs: TabProps[]
}

export default function Tabbed(props : TabbedProps) {
    const [activeTab, setActiveTab] = useState<number>(1);

    const handleTabClick = (tab: number) => {
    setActiveTab(tab);
    };

    return (
        <Container>
            <TabContainer>

                <TabButtonContainer>
                    {props.tabs.map((tab) => (
                        <TabButton key={tab.id} active={(activeTab === tab.id).toString()} onClick={() => handleTabClick(tab.id)}>
                            <TabTitle>{tab.title}</TabTitle>
                        </TabButton>
                    )) }
                </TabButtonContainer>

                <TabContent>
                <ContentDiv>
                    {props.tabs.map((tab) =>
                        activeTab === tab.id && (
                        <React.Fragment key={`tab-${tab.id}-content`}>
                            {tab.children.map((children, index) => (
                            <React.Fragment key={`tab-${tab.id}-child-${index}`}>
                                {children}
                            </React.Fragment>
                            ))}
                        </React.Fragment>
                        )
                    )}
                </ContentDiv>
                </TabContent>
            </TabContainer>
        </Container>
    );
};

