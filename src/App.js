import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/pages/Home';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import NavBar from './components/Navbar/Navbar';
import Inbox from './components/Email/Inbox';
import SideBar from './components/Navbar/Sidebar';
import Login from './'
function App() {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  return (
    <Fragment>
      <Router>
        <Switch>
          {isLoggedIn && <NavBar/>}
          <Route path="/" exact><Home />
          </Route>
          <Route path="/inbox"><Inbox />
          </Route>
          <Route path="/home"><Home />
          </Route>
        </Switch>
      </Router>
    </Fragment>
  );
}

export default App;
