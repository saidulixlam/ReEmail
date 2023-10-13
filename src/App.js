import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/pages/Home';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import NavBar from './components/Navbar/Navbar';
import Inbox from './components/Email/Inbox';
import EmailView from './components/Email/EmailView'; // Import the EmailView component

function App() {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  return (
    <Fragment>
      <Router>
      {isLoggedIn && <NavBar/>}{/* Render the NavBar for logged-in users */}
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/inbox" exact component={Inbox} />
          {/* Add a route for viewing individual emails */}
          <Route path="/inbox/emails/:subject" component={EmailView} />
        </Switch>
      </Router>
    </Fragment>
  );
}

export default App;
