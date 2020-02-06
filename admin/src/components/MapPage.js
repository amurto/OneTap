import React from 'react';
import Container from '@material-ui/core/Container';
import Map from './Map';

const MapPage = () => {
    return (
        <Container>
            <div classnme="center" style={{ textAlign: "center" }}>
                <h3>Location Mapping of Facilitators and Schools</h3>
            </div>
            <Map />
        </Container>
    )
}

export default MapPage;
