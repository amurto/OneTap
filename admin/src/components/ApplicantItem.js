import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import ApplicantDialog from './ApplicantDialog';
import { useHttpClient } from './hooks/http-hook';

import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import PhoneForwardedIcon from '@material-ui/icons/PhoneForwarded';
import Button from '@material-ui/core/Button';

import man from './man.png';
import woman from './woman.png';
import other from './other.png';

import './ApplicantItem.css';

const ApplicantItem = props => {
  const [open, setOpen] = useState(false);

  // eslint-disable-next-line
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  let history = useHistory();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteHandler = async () => {
    try {
      await sendRequest(
            `http://localhost:5000/api/users/${props.id}`,
            'DELETE',
            null,
        );
      history.push("/")
    } catch (err) {}
  }

  const shortlistHandler = async () => {
    let email = props.email;
    console.log(email);
    try {
      const responseData = await sendRequest(
          'http://localhost:5000/api/users/shortlist',
          'POST',
          JSON.stringify({
              email: email
          }),
          {
              'Content-Type': 'application/json'
          }
      );
      console.log(responseData)
      if (responseData.success) {
        history.push("/short-list");
      }
  } catch(err) {

  }    
}

const facHandler = async () => {
  const fetchSchools = async () => {
    try {
        const responseData = await sendRequest(
            'http://localhost:5000/api/schools/get'
          );
          let schools = responseData.schools;
          let slen = responseData.schools.length;
          let c = 0;
          let d = 700;
          let lat1 = props.location.lat
          let lng1 = props.location.lng;
          let unit = "N";
          for (let i = 0; i < slen; i++) {
              let lat2 = schools[i].location.lat
              let lng2 = schools[i].location.lng
              var radlat1 = Math.PI * lat1/180;
              var radlat2 = Math.PI * lat2/180;
              var theta = lng1-lng2;
              var radtheta = Math.PI * theta/180;
              var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
              if (dist > 1) {
                dist = 1;
              }
              dist = Math.acos(dist);
              dist = dist * 180/Math.PI;
              dist = dist * 60 * 1.1515;
              if (unit==="N") { dist = dist * 0.8684 }
              if (dist < d) {
                d = dist;
                c = i;
              }
          }
          let response;
          try {
            response = await sendRequest(
              'http://localhost:5000/api/facilitators/',
              'POST',
              JSON.stringify({
                userId: props.id,
                schoolId: schools[c].id
              }),
              {
                'Content-Type': 'application/json'
              }
            );
          } catch(err) {
          }
          if (response.success) {
            history.push("/facs")
          }
      } catch (err) {} 
  };
  fetchSchools();
}

  let genderIcon;
  if (props.gender === 'male') {
      genderIcon = <img src={man} alt="Man" />
    } else if (props.gender === 'female') {
      genderIcon = <img src={woman} alt="Woman" />
    } else {
      genderIcon = <img src={other} alt="Other" />
    }

    return (
      <React.Fragment>
        <ApplicantDialog 
          open={open} 
          handleClose={handleClose} 
          location={props.location}
          name={props.name}
          email={props.email}
          verticals={props.verticals}
          phone={props.phone}  
          state={props.state}
          gender={props.gender}
          age={props.age}
          address={props.address}
          district={props.district}
          selected1={props.selected1}
          selected2={props.selected2} 
        />
        <div className="card card-1">
          <div className="text">
            {!props.selected1 && (
              <div className="fab" onClick={shortlistHandler}>&#43;</div>
            )}
          <div style={{ marginBottom: "10px" }} onClick={handleClickOpen}>
          <div style={{ marginTop: "20px", textAlign: "center" }}>
          {genderIcon}
          </div>
          <div style={{ textAlign: "left" }}>
            <p style={{ fontSize: "20px", fontWeight: "600" }}>{props.name},&nbsp;{props.age}</p>
            <p style={{ fontSize: "14px" }}>{props.email}</p>
            </div>
          </div>
          {!props.selected1 && (
            <IconButton color='secondary' onClick={deleteHandler}>
            <DeleteForeverIcon />
          </IconButton>
          )}
          
          {props.selected1 && (
          <a style={{ color: 'green' }} href={props.phone}>
            <IconButton color='inherit'>
            <PhoneForwardedIcon />
          </IconButton>
          </a>
          )}
          {props.selected1 && (
          <Button variant="contained" color="primary" onClick={facHandler}>
          Confirm Facilitation  
        </Button>
          )}
          
          </div>
        </div>
        </React.Fragment>
  );
};

export default ApplicantItem;