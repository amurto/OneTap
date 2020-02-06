import React from 'react';
import { 
  BrowserRouter as Router, 
  Route, 
  Redirect, 
  Switch 
} from 'react-router-dom';

import './App.css';
import { makeStyles } from '@material-ui/core/styles';

import PrimaryAppBar from './components/PrimaryAppBar';
import AllApplicants from './components/AllApplicants';
import AllFacilitators from './components/AllFacilitators';
import ShortListedApplicants from './components/ShortListedApplicants';
import Footer from './components/Footer';
import Landing from './components/Landing';
import MapPage from './components/MapPage';
import Fab from '@material-ui/core/Fab';
import UpIcon from '@material-ui/icons/KeyboardArrowUp';

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
    position: 'fixed',
    marginLeft: '90%',
    marginTop: '500px '
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const App = () => {
  const classes = useStyles();

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
      <Fab color="secondary" aria-label="add" className={classes.margin}>
          <UpIcon />
      </Fab>
      {routes}
      <Footer />
    </Router>
  );
}

export default App;
