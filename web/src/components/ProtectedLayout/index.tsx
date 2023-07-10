import styled from "styled-components";
import { useAuth } from "../../context/AuthProvider/useAuth"

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Content = styled.div`
  text-align: center;
`;

export const ProtectedLayout = ({children} : {children: JSX.Element}) => {
    const auth = useAuth();

    if (!auth.name) {
        return (
            <Container>
                <Content>
                    <h1>Acesso não autorizado</h1>
                    <p>Você não tem permissão para acessar esta página.</p>
                </Content>
            </Container>
        )
    }

    return children;
}