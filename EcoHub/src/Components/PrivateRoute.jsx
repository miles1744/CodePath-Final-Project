
import { UserAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import "../Css/loader.css"

const PrivateRoute = ({children}) => {
    const {session} = UserAuth();

    if(session === undefined){
        return(
            <div class="loader"></div>
        )
    }

    return <>{session ? <>{children}</> : <Navigate to="/signup" />}</>;
};

export default PrivateRoute;