import { useSelector} from "react-redux";
import Login from '../pages/Login';
import { Fragment } from "react";
import useMailAPI from "../utils/useMail";
import { useEffect } from "react";

const Home = () => {
    const token=useSelector(state=>state.auth.token);
    const sent = useMailAPI('sent');
    
    useEffect(() => {
    sent.fetchDataAndUpdateStore();
    
  }, []);
    return (
        <Fragment>
            {!token&&<Login/>}
        </Fragment>
     );
}
 
export default Home;