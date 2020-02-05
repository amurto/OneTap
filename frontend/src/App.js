import React from 'react';
import { 
  BrowserRouter as Router, 
  Route, 
  Redirect, 
  Switch 
} from 'react-router-dom';

// CSS
import 'bootstrap/dist/css/bootstrap.min.css';

import Landing from './components/Landing';
import Landing2 from './components/Landing2';
import Footer from './components/Footer';

const App = () => {
  let routes;
  routes = (
    <Switch>
      <Route path="/" exact>
        <Landing />
      </Route>
      <Route path="/position" exact>
        <Landing2 />
      </Route>
      <Redirect to="/" />
    </Switch>
  )

  return (
    <Router>
      {routes}
      <Footer />
    </Router>
  );
}

export default App;
