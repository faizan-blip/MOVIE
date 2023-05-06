// import logo from './logo.svg';
// import { useEffect } from 'react';
import './App.css';

import { BrowserRouter as Router , Route , Switch } from 'react-router-dom';
import Home from './Components/Home';
import Moviecards from './Components/Moviecards';
// import ResponsiveDrawer from './Components/Navbar';


function App() {
  return (
    <Router>
    <>
    <Switch>
      <Route exact path='/'>
   <Home/>
    </Route>
    <Route exact path="/next/:id">
  <Moviecards/>
    </Route>
    </Switch>
    </>
    </Router>
  );
}

export default App;
