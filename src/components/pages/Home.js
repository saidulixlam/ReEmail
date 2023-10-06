// import { Fragment } from "react";
// import { authActions } from "../../store/authSlice";
import { useSelector} from "react-redux";
// import { Container } from "react-bootstrap";
import Login from '../pages/Login';
import EmailNavigation from "../Email/EmailNavigation";
import { Fragment } from "react";
const Home = () => {
    const token=useSelector(state=>state.auth.token);
    
    return (
        <Fragment>
            {token&&<EmailNavigation />}
            {!token&&<Login/>}
        </Fragment>
     );
}
 
export default Home;