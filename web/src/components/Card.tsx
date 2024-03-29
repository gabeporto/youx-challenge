import styled from "styled-components"
import MoneyIcon from '@mui/icons-material/AttachMoney';
import GraphUpIcon from '@mui/icons-material/TrendingUp';

const CardStyled = styled.div`
    width: 389px;
    height: 152px;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 5px 5px 20px #00000029;
    border-radius: 8px;
    opacity: 1;

    @media only screen and (max-width: 425px) {
        width: 340px;
    }
`

const CardDiv = styled.div`
    height: 100%;
    text-align: center;
    padding: 18px;
    display: flex;
    flex-direction: column;
`

const CardTitleSection = styled.div`
    opacity: 1;
    flex: 1;
`

const CardTitle = styled.label`
    letter-spacing: 0px;
    color: #5C4444;
    opacity: 1;
    font-size: 20px;
    text-transform: uppercase;
`

const CardValueSection = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 1;
    flex: 1;
    gap: 10px;
`

const CardValue = styled.label`
    font: normal normal normal 25px/25px Helvetica Neue;
    letter-spacing: 0px;
    color: #5C4444;
    font-weight: bold;
    opacity: 1;
`

interface CardProps {
    title: string;
    value: string | number;
    iconType: string;
}

export default function Card(props : CardProps) {
    return (
        <>
            <CardStyled>
                <CardDiv>
                    <CardTitleSection>
                        <CardTitle>{props.title}</CardTitle>
                    </CardTitleSection>
                    <CardValueSection>
                        { props.iconType === 'money' ? ( 
                            <MoneyIcon htmlColor="#023E8A" fontSize="large"/> 
                        ) : ( 
                            <GraphUpIcon htmlColor="#023E8A" fontSize="large"/> 
                            )
                        }
                        <CardValue>{props.value}</CardValue>
                    </CardValueSection>
                </CardDiv>
            </CardStyled>
        </>
    )
}