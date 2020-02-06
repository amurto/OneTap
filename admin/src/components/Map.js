import React, { useState, useEffect } from "react";
import ReactMapGL from "react-map-gl";
import { useHttpClient } from './hooks/http-hook';
import MarkerPop from './MarkerPop';

const Map = () => {
    const [loadedApplicants, setLoadedApplicants] = useState();
    const [loadedSchools, setLoadedSchools] = useState();
    const [loadedFacilitators, setLoadedFacilitators] = useState();

    // eslint-disable-next-line
    const [countApplicants, setCountApplicants] = useState(0);
    const [countSchools, setCountSchools] = useState(0);
    const [countFacilitators, setCountFacilitators] = useState(0);

    // eslint-disable-next-line
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    useEffect(() => {
        const fetchApplicants = async () => {
            try {
                const responseData = await sendRequest(
                    'http://localhost:5000/api/users/applicants'
                );
                setLoadedApplicants(responseData.applicants);
                setCountApplicants(responseData.applicants.length);
            } catch (err) {}
        };
        fetchApplicants();
        const fetchSchools = async () => {
            try {
                const responseData = await sendRequest(
                    'http://localhost:5000/api/schools/get'
                );
                setLoadedSchools(responseData.schools);
                setCountSchools(responseData.schools.length);
            } catch (err) {} 
        };
        fetchSchools();
        const fetchFacilitators = async () => {
          try {
              const responseData = await sendRequest(
                  'http://localhost:5000/api/facilitators/facs'
              );
              setLoadedFacilitators(responseData.facs);
              setCountFacilitators(responseData.facs.length);
              console.log("ok")
              console.log(responseData);
          } catch (err) {} 
          };
          fetchFacilitators();
        }, [sendRequest]);

  const [viewport, setViewport] = useState({
    latitude: 19.0760,
    longitude: 72.8777,
    width: "80vw",
    height: "80vh",
    zoom: 8
  });

  const [selectedPoint, setSelectedPoint] = useState(null);

  let filteredApplicants = [];

    for (let i = 0; i < countApplicants; i++) {
        if (loadedApplicants[i].selected1 === false) {
            filteredApplicants.push(loadedApplicants[i]);
        }
    }

    let filteredSchools = [];

    for (let i = 0; i < countSchools; i++) {
        filteredSchools.push(loadedSchools[i]);
    }

    let filteredFacilitators = [];

    for (let i = 0; i < countFacilitators; i++) {
        filteredFacilitators.push(loadedFacilitators[i]);
    }

  return (
    <div style={{marginTop: "40px"}}>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken='pk.eyJ1IjoiYW11cnRvIiwiYSI6ImNrNjl3d2hyYjBoeWszdm8zZmQ5dXZnbmEifQ.FG4aZLj52C_vAAAGhh46ug'
        mapStyle='mapbox://styles/mapbox/streets-v11'   
        onViewportChange={viewport => { setViewport(viewport); }}
      >
        {filteredApplicants.map(applicant => 
            <MarkerPop key={applicant.id} selectedPoint={selectedPoint} setSelectedPoint={setSelectedPoint} location={applicant.location} name={applicant.name} entity="applicant" />
        )}
        {filteredSchools.map(school => 
            <MarkerPop key={school.id} selectedPoint={selectedPoint} setSelectedPoint={setSelectedPoint} location={school.location} name={school.name} entity="school" />
        )}
        {filteredFacilitators.map(fac => 
            <MarkerPop key={fac.id} selectedPoint={selectedPoint} setSelectedPoint={setSelectedPoint} location={fac.location} name={fac.name} entity="fac" />
        )}
      </ReactMapGL>
    </div>
  );
}

export default Map;