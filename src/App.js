import './App.css';
import Login from './components/pages/Login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/pages/Home';
import { useState } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

  // Function to handle successful login
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      {!isLoggedIn &&  
        <Login onLogin={handleLogin} />}
      
        
        <Switch>
          <Route path="/home" exact><Home/>
            
          </Route>
        </Switch>
      
    </Router>
  );
}

export default App;
