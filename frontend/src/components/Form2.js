import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';  
import Button from '@material-ui/core/Button'; 
import { useHttpClient } from './hooks/http-hook';
import { FormContext } from './form-context';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

const Form2 = () => {
  let history = useHistory();
  
  // eslint-disable-next-line
  const { uid, setUid } = useContext(FormContext);

  // eslint-disable-next-line
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  
  const classes = useStyles();
  const [state, setState] = useState({
    coding: false,
    dance: false,
    drama: false,
    music: false,
    publicspeaking: false,
    electronics: false,
    visualarts: false,
    frisbee: false,
    schoolmanager: false,
    codingText: "", 
    danceText: "", 
    dramaText: "", 
    musicText: "", 
    publicspeakingText: "", 
    electronicsText: "", 
    visualartsText: "", 
    frisbeeText: "", 
    schoolmanagerText: ""
  });

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  const handleText = name => event => {
    setState({ ...state, [name]: event.target.value })
  }

  const { coding, dance, drama, music, publicspeaking, electronics, visualarts, frisbee, schoolmanager } = state;
  const { codingText, danceText, dramaText, musicText, publicspeakingText, electronicsText, visualartsText, frisbeeText, schoolmanagerText } = state;

  const submitFormHandler = async () => {
    let verticals = []
    if(state.coding) {
      let choice = [];
      choice.push("Coding")
      choice.push(state.codingText)
      verticals.push(choice)
    }
    if(state.dance) {
      let choice = [];
      choice.push("Dance")
      choice.push(state.danceText)
      verticals.push(choice)
    }
    if(state.drama) {
      let choice = [];
      choice.push("Drama")
      choice.push(state.dramaText)
      verticals.push(choice)
    }
    if(state.music) {
      let choice = [];
      choice.push("Music")
      choice.push(state.musicText)
      verticals.push(choice)
    }

    if(state.publicspeaking) {
      let choice = [];
      choice.push("Public Speaking")
      choice.push(state.publicspeakingText)
      verticals.push(choice)
    }
    if(state.electronics) {
      let choice = [];
      choice.push("Electronics")
      choice.push(state.electronicsText)
      verticals.push(choice)
    }
    if(state.visualarts) {
      let choice = [];
      choice.push("Visual Arts")
      choice.push(state.visualartsText)
      verticals.push(choice)
    }
    if(state.frisbee) {
      let choice = [];
      choice.push("Frisbee")
      choice.push(state.frisbeeText)
      verticals.push(choice)
    }
    if(state.schoolmanager) {
      let choice = [];
      choice.push("School Manager")
      choice.push(state.schoolmanagerText)
      verticals.push(choice)
    }
    console.log(verticals)
    try {
      const responseData = await sendRequest(
        'http://localhost:5000/api/users/verticals',
        'POST',
        JSON.stringify({
            verticals: verticals,
            uid: uid
        }),
        {
          'Content-Type': 'application/json'
        }
      );
      if (responseData.success) {
        history.push("/success");
      }
    } catch (err) {

    }
  }
  return (
    <Container>
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Select interested Verticals</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={coding} onChange={handleChange('coding')} value="coding" />}
            label="Coding"
          />
          {coding && (
            <TextareaAutosize 
            style={{ width: "80vw", marginBottom: "20px" }} 
            aria-label="minimum height" 
            rowsMin={3} 
            placeholder="Minimum 100 characters " 
            value={codingText}
            onChange={handleText('codingText')}
          />
          )}
          
          <FormControlLabel
            control={<Checkbox checked={dance} onChange={handleChange('dance')} value="dance" />}
            label="Dance"
          />
            {dance && (
            <TextareaAutosize 
            style={{ width: "80vw", marginBottom: "20px" }} 
            aria-label="minimum height" 
            rowsMin={3} 
            placeholder="Minimum 100 characters " 
            value={danceText}
            onChange={handleText('danceText')}
          />
          )}
          
          <FormControlLabel
            control={
              <Checkbox checked={drama} onChange={handleChange('drama')} value="drama" />
            }
            label="Drama"
          />
            {drama && (
            <TextareaAutosize 
            style={{ width: "80vw", marginBottom: "20px" }} 
            aria-label="minimum height" 
            rowsMin={3} 
            placeholder="Minimum 100 characters " 
            value={dramaText}
            onChange={handleText('dramaText')}
          />
          )}
          
          <FormControlLabel
            control={
              <Checkbox checked={music} onChange={handleChange('music')} value="music" />
            }
            label="Music"
          />
            {music && (
            <TextareaAutosize 
            style={{ width: "80vw", marginBottom: "20px" }} 
            aria-label="minimum height" 
            rowsMin={3} 
            placeholder="Minimum 100 characters " 
            value={musicText}
            onChange={handleText('musicText')}
          />
          )}
          
          <FormControlLabel
            control={
              <Checkbox checked={publicspeaking} onChange={handleChange('publicspeaking')} value="publicspeaking" />
            }
            label="Public Speaking"
          />
            {publicspeaking && (
            <TextareaAutosize 
            style={{ width: "80vw", marginBottom: "20px" }} 
            aria-label="minimum height" 
            rowsMin={3} 
            placeholder="Minimum 100 characters " 
            value={publicspeakingText}
            onChange={handleText('publicspeakingText')}
          />
          )}
          
          <FormControlLabel
            control={
              <Checkbox checked={electronics} onChange={handleChange('electronics')} value="electronics" />
            }
            label="Electronics"
          />
            {electronics && (
            <TextareaAutosize 
            style={{ width: "80vw", marginBottom: "20px" }} 
            aria-label="minimum height" 
            rowsMin={3} 
            placeholder="Minimum 100 characters " 
            value={electronicsText}
            onChange={handleText('electronicsText')}
          />
          )}
          
          <FormControlLabel
            control={
              <Checkbox checked={visualarts} onChange={handleChange('visualarts')} value="visualarts" />
            }
            label="Visual Arts"
          />
            {visualarts && (
            <TextareaAutosize 
            style={{ width: "80vw", marginBottom: "20px" }} 
            aria-label="minimum height" 
            rowsMin={3} 
            placeholder="Minimum 100 characters " 
            value={visualartsText}
            onChange={handleText('visualartsText')}
          />
          )}
          
          <FormControlLabel
            control={
              <Checkbox checked={frisbee} onChange={handleChange('frisbee')} value="frisbee" />
            }
            label="Frisbee"
          />
            {frisbee && (
            <TextareaAutosize 
            style={{ width: "80vw", marginBottom: "20px" }} 
            aria-label="minimum height" 
            rowsMin={3} 
            placeholder="Minimum 100 characters " 
            value={frisbeeText}
            onChange={handleText('frisbeeText')}
          />
          )}
          
          <FormControlLabel
            control={
              <Checkbox checked={schoolmanager} onChange={handleChange('schoolmanager')} value="schoolmanager" />
            }
            label="School Manager"
          />
            {schoolmanager && (
            <TextareaAutosize 
            style={{ width: "80vw", marginBottom: "20px" }} 
            aria-label="minimum height" 
            rowsMin={3} 
            placeholder="Minimum 100 characters " 
            value={schoolmanagerText}
            onChange={handleText('schoolmanagerText')}
          />
          )}
          
        </FormGroup>
        <FormHelperText>Write your experience</FormHelperText>
      </FormControl>
      
    </div>
    <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={submitFormHandler}
      >
        Submit
      </Button>
    </Container>
  );
}

export default Form2;