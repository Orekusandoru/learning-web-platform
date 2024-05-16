import {Route, Link} from "react-router-dom"
import {useContext} from "react"
import AuthContext from "../context/AuthContext"



const PrivateRoute = ({children, ...rest}:{ children: React.ReactNode; [key: string]: any }) => {
    const {user} = useContext(AuthContext);
    return <Route {...rest}>{!user ? <Link to="/login" /> : children}</Route>
}

export default PrivateRoute