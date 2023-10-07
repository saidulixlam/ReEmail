import { useSelector} from "react-redux";
import Login from '../pages/Login';
import { Fragment } from "react";

const Home = () => {
    const token=useSelector(state=>state.auth.token);
    
    return (
        <Fragment>
           
            {!token&&<Login/>}
        </Fragment>
     );
}
 
export default Home;