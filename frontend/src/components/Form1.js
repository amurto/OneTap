import React, { useContext } from 'react';
import { useHistory } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHttpClient } from './hooks/http-hook';
import { FormContext } from './form-context';

import './Form1.css';

import { Formik, Field } from 'formik';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Checkbox({ field, type, checked, interest }) {
    return (
      <label className="container">{interest}
        <input {...field} type={type} checked={checked} />
        <span className="checkmark"></span>
      </label>
    );
}

const Form1 = () => {
    // eslint-disable-next-line
    const { uid, setUid } = useContext(FormContext);

    let history = useHistory();
    const classes = useStyles();

    // eslint-disable-next-line
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    return (
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
            Sign up
            </Typography>
            <Formik
                initialValues={{ 
                    name: '',  
                    email: '',
                    phone: '',
                    address: '',
                    coding: false,
                    dance: false,
                    drama: false,
                    ps: false,
                    uf: false,
                    va: false 
            }}
                validate={values => {
                    const errors = {};
                    if (!values.name) {
                        errors.name = 'Required';
                    }
                    
                    if (!values.email) {
                    errors.email = 'Required';
                    } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                    errors.email = 'Invalid email address';
                    }

                    if (!values.phone) {
                        errors.phone = 'Required'
                    } else if (
                    !/^[0][1-9]\d{9}$|^[1-9]\d{9}$/g.test(values.phone) 
                    ) {
                        errors.phone = 'Invalid mobile number';
                    }

                    if (!values.address) {
                        errors.address = 'Required';
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    const submitFormHandler = async values => {
                        console.log(values);
                        let foi = []
                        if (values.coding) {
                            foi.push("Coding")
                        } 
                        if (values.dance) {
                            foi.push("Dance")
                        }
                        if (values.drama) {
                            foi.push("Drama")
                        }
                        if (values.ps) {
                            foi.push("Public Speaking")
                        }
                        if (values.uf) {
                            foi.push("Ultimate Frisbee")
                        }
                        if (values.va) {
                            foi.push("Visual Arts")
                        }
                        try {
                            const responseData = await sendRequest(
                                'http://localhost:5000/api/users/register',
                                'POST',
                                JSON.stringify({
                                    name: values.name,
                                    email: values.email,
                                    phone: values.phone,
                                    address: values.address,
                                    foi: foi
                                }),
                                {
                                    'Content-Type': 'application/json'
                                }
                            );
                            console.log(responseData)
                            setUid(responseData.userId)
                            history.push("/form");
                        } catch(err) {

                        }
                    }
                    submitFormHandler(values);
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    /* and other goodies */
                }) => (
                    <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                        <TextField
                            type="text"
                            name="name"
                            variant="outlined"
                            fullWidth
                            label="Name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.firstname}
                        />
                        </Grid>
                        <Grid>
                            <div style={{ marginLeft: "10px", color: "red" }}>
                                {errors.name && touched.name && errors.name}
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            type="email"
                            variant="outlined"
                            fullWidth
                            label="Email Address"
                            name="email"    
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            autoComplete="email"
                        />
                        </Grid>
                        <Grid>
                            <div style={{ marginLeft: "10px", color: "red" }}>
                                {errors.email && touched.email && errors.email}
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            name="phone"
                            label="Phone Number"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.phone}
                        />
                        </Grid>
                        <Grid>
                            <div style={{ marginLeft: "10px", color: "red" }}>
                                {errors.phone && touched.phone && errors.phone}
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="address"
                                name="address"
                                variant="outlined"
                                fullWidth
                                id="address"
                                label="Address"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.address}
                            />
                        </Grid>
                        <Grid>
                            <div style={{ margin: "10px", color: "red" }}>
                                {errors.address && touched.address && errors.address}
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <h4>
                            Fields of interest
                            </h4>      
                        </Grid>
                        <Grid item xs={12}>
                        <div>
                            <Field
                                name="coding"
                                interest="Coding"
                                type="checkbox"
                                checked={values.coding}
                                component={Checkbox}
                            />
                        </div>
                        <div>
                            <Field
                                name="dance"
                                interest="Dance"
                                type="checkbox"
                                checked={values.dance}
                                component={Checkbox}
                            />
                        </div>
                        <div>
                            <Field
                                name="drama"
                                interest="Drama"
                                type="checkbox"
                                checked={values.drama}
                                component={Checkbox}
                            />
                        </div>
                        <div>
                            <Field
                                name="ps"
                                interest="Public Speaking"
                                type="checkbox"
                                checked={values.ps}
                                component={Checkbox}
                            />
                        </div>
                        <div>
                            <Field
                                name="uf"
                                interest="Ultimate Frisbee"
                                type="checkbox"
                                checked={values.uf}
                                component={Checkbox}
                            />
                        </div>
                        <div>
                            <Field
                                name="va"
                                interest="Visual Arts"
                                type="checkbox"
                                checked={values.va}
                                component={Checkbox}
                            />
                        </div>
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={isSubmitting}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                        <Link href="#" variant="body2">
                            Already have an account? Sign in
                        </Link>
                        </Grid>
                    </Grid>
                    </form>
                )}
            </Formik>
        </div>
        </Container>
    );
}

export default Form1;
