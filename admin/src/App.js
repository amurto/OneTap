import React from 'react';
import { 
  BrowserRouter as Router, 
  Route, 
  Redirect, 
  Switch 
} from 'react-router-dom';

import PrimaryAppBar from './components/PrimaryAppBar';
import AllApplicants from './components/AllApplicants';
import AllFacilitators from './components/AllFacilitators';
import ShortListedApplicants from './components/ShortListedApplicants';
import Footer from './components/Footer';
import Landing from './components/Landing';
import MapPage from './components/MapPage';

const App = () => {
  let routes;
  routes = (
    <Switch>
      <Route path="/" exact>
          <Landing />
      </Route>
      <Route path="/applicants" exact>
          <AllApplicants />
      </Route>
      <Route path="/short-list" exact>
        <ShortListedApplicants />
      </Route>
      <Route path="/map" exact>
        <MapPage />
      </Route>
      <Route path="/facs" exact>
        <AllFacilitators />
      </Route>
      <Redirect to="/" />
    </Switch>
  )
  return (
    <Router>
      <PrimaryAppBar />
      {routes}
      <Footer />
    </Router>
  );
}

export default App;
