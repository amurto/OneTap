import React, { useState } from 'react';
import { 
  BrowserRouter as Router, 
  Route, 
  Redirect, 
  Switch 
} from 'react-router-dom';

// CSS
import 'bootstrap/dist/css/bootstrap.min.css';

import { FormContext } from './components/form-context';

import Landing from './components/Landing';
import Landing2 from './components/Landing2';
import Success from './components/Success';
import Footer from './components/Footer';

const App = () => {
  const [uid, setUid] = useState(null);
  let routes;
  if (uid) {
    routes = (
      <Switch>
      <Route path="/" exact>
        <Landing />
      </Route>
      <Route path="/form" exact>
        <Landing2 />
      </Route>
      <Route path="/success" exact>
          <Success />
      </Route>
      <Redirect to="/" />
    </Switch>
    )
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Landing />
        </Route>
        <Redirect to="/" />
      </Switch>
    )
  }

  return (
    <Router>
      <FormContext.Provider value={{ uid, setUid }}>
        {routes}
        <Footer />
      </FormContext.Provider>
    </Router>
  );
}

export default App;
