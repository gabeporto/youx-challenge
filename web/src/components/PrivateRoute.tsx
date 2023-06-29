import { useEffect, useState } from "react";
import { Navigate, Route } from "react-router-dom";

interface PrivateRouteProps {
    path: string;
    element: React.ReactNode;
}
  
function checkUserAuthentication() {
    return true;
}
const 
PrivateRoute: React.FC<PrivateRouteProps> = ({ element, ...rest }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
  
    useEffect(() => {
      // Verificar a autenticação do usuário aqui
      // Defina o valor de isAuthenticated de acordo com a autenticação
      const userIsAuthenticated = checkUserAuthentication();
  
      setIsAuthenticated(userIsAuthenticated);
    }, []);
  
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
  
    return <Route {...rest} element={element} />;
};

export default PrivateRoute;