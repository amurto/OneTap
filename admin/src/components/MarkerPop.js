import React from 'react';
import { Marker, Popup } from "react-map-gl";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import IconButton from '@material-ui/core/IconButton';

const MarkerPop = props => {
    if (props.entity === 'applicant') {
        return (
            <React.Fragment>
                <Marker longitude={props.location.lng} latitude={props.location.lat}>
                <div>
                    <IconButton color='primary' onClick={e => {
                        e.preventDefault();
                        props.setSelectedPoint(props.name);
                    }}>
                    <LocationOnIcon />
                    </IconButton>
                    </div>
                </Marker>
                { props.selectedPoint === props.name && (
                <Popup
                    latitude={props.location.lat}
                    longitude={props.location.lng}
                    onClose={() => { props.setSelectedPoint(null) }}
                >
                    
                        <div style={{ height:"30px" }}>
                        <h5>{props.name}</h5>
                        </div>
                </Popup>
                )}
            </React.Fragment>
        )
    } else if (props.entity === 'fac') {
        return (
            <React.Fragment>
                <Marker longitude={props.location.lng} latitude={props.location.lat}>
                <div style={{ color: 'orange' }}>
                    <IconButton color='inherit' onClick={e => {
                        e.preventDefault();
                        props.setSelectedPoint(props.name);
                    }}>
                    <LocationOnIcon />
                    </IconButton>
                    </div>
                </Marker>
                { props.selectedPoint === props.name && (
                <Popup
                    latitude={props.location.lat}
                    longitude={props.location.lng}
                    onClose={() => { props.setSelectedPoint(null) }}
                >
                    
                        <div style={{ height:"30px" }}>
                        <h5>{props.name}</h5>
                        </div>
                </Popup>
                )}
            </React.Fragment>
        )
    } else {
        return (
            <React.Fragment>
                <Marker longitude={props.location.lng} latitude={props.location.lat}>
                <div>
                    <IconButton color='secondary' onClick={e => {
                        e.preventDefault();
                        props.setSelectedPoint(props.name);
                    }}>
                    <LocationOnIcon />
                    </IconButton>
                    </div>
                </Marker>
                { props.selectedPoint === props.name && (
                <Popup
                    latitude={props.location.lat}
                    longitude={props.location.lng}
                    onClose={() => { props.setSelectedPoint(null) }}
                >
                        <div style={{ height:"30px" }}>
                        <h5>{props.name}</h5>
                        </div>
                </Popup>
                )}
            </React.Fragment>
        )
    }
}


export default MarkerPop;
