import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box p={3}>{children}</Box>}
      </Typography>
    );
  }
  
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};
  
function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}
  
const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
    rootButton: {
        backgroundColor: "#483D8B",
        color: "white",
        padding: theme.spacing(1),
    },
    header: {
        color: "white",
        margin: "0px"
    }
}));

const ListItem = props => {
  const classes = useStyles();
  return (
    <React.Fragment>
        <div className={classes.rootButton}>{props.field}</div>
        <div className={classes.rootButton}>{props.text}</div>
        <hr className={classes.header}></hr>
    </React.Fragment>
  )
}

const ApplicantDialog = props => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const verticals = props.verticals;

    let gender;
    if (props.gender === 'male') {
      gender = "Male"
    } else if (props.gender === 'female') {
      gender = "Woman"
    } else {
      gender = "Other"
    }

  return (
      <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <div className={classes.root}>
        <AppBar position="static">
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
            <Tab icon={<PhoneIcon />} label="CONTACT" {...a11yProps(0)} />
            <Tab icon={<FavoriteIcon />} label="INTERESTS" {...a11yProps(1)} />
            <Tab icon={<PersonPinIcon />} label="RESUME" {...a11yProps(2)} />
            </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
            <div className={classes.rootButton}>{props.name}</div>
            <hr className={classes.header}></hr>
            <div className={classes.rootButton}>{props.email}</div>
            <hr className={classes.header}></hr>
            <div className={classes.rootButton}>{props.phone}</div>
            <hr className={classes.header}></hr>
            <div className={classes.rootButton}>{gender}</div>
            <hr className={classes.header}></hr>
            <div className={classes.rootButton}>{props.age} Years</div>
            <hr className={classes.header}></hr>
            <div className={classes.rootButton}>{props.address}</div>
            <hr className={classes.header}></hr>
            {props.selected1 && (
              <React.Fragment>
                <div className={classes.rootButton}>Passed Round 1</div>
              <hr className={classes.header}></hr>
              </React.Fragment>
            )}

        </TabPanel>
        <TabPanel value={value} index={1}>
          {verticals.map((vertical) =>
            <ListItem 
              key={vertical.toString()}
              field={vertical[0]} 
              text={vertical[1]}
            />
          )}
        </TabPanel>
        <TabPanel value={value} index={2}>
            Item Three
        </TabPanel>
        </div>
      </Dialog>
  );
}

export default ApplicantDialog;