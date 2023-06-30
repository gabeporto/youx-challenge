import styled from "styled-components";

const TableTitle = styled.h1`
    font-weight: bold;
    font-size: 25px;
    color: #535353;
    opacity: 1;
    margin-bottom: 5px;
`;

interface SubtitleProps {
    subtitle: string;
}

export default function Subtitle(props : SubtitleProps) {
    return (
        <TableTitle>{props.subtitle}</TableTitle>
    )
}