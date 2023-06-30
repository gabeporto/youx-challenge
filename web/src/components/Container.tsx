import { ReactNode } from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
    padding-left: 6%;
    padding-right: 6%;
    padding-top: 50px; 
    padding-bottom: 50px;
`;

interface ContainerProps {
    children: ReactNode;
}

export default function Container({children} : ContainerProps) {
    return (
        <StyledContainer>
            {children}
        </StyledContainer>
    )
}