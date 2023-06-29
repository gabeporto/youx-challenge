import styled from "styled-components";

const Container = styled.h1`
    padding-left: 6%;
    padding-top: 50px; 
`;

const PageTitle = styled.h1`
    font-weight: bold;
    font-size: 35px;
`;

const TitleBorder = styled.div` 
    box-shadow: 0px 3px 6px #00000029;
    border: 3px solid #023E8A;
    width: 307px;

    @media only screen and (max-width: 338px) {
        width: 90%;
    }
`

interface TitleProps {
    title: string;
}

export default function Title(props : TitleProps) {
    return (
        <Container>
            <PageTitle>{props.title}</PageTitle>
            <TitleBorder/>
        </Container>
    )
}