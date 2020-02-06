import React , { useState, useEffect } from 'react';

import { useHttpClient } from './hooks/http-hook';

import FacilitatorsList from './FacilitatorList';
import LoadingSpinner from './LoadingSpinner';
import ErrorModal from './ErrorModal';
import Container from '@material-ui/core/Container';


const AllFacilitators = () => {
    const [loadedFacilitators, setLoadedFacilitators] = useState();
    const [countFacilitators, setCountFacilitators] = useState(0);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    useEffect(() => {
        const fetchFacilitators = async () => {
            try {
                const responseData = await sendRequest(
                    'http://localhost:5000/api/facilitators/facs'
                );
                setLoadedFacilitators(responseData.facs);
                setCountFacilitators(responseData.facs.length);
                console.log(responseData);
            } catch (err) {}
        };
        fetchFacilitators();
    }, [sendRequest]);

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && (
                <div className="center">
                    <LoadingSpinner />
                </div>
            )}
            <Container>
            {!isLoading && (
                <React.Fragment>
                <h4>Showing {countFacilitators} facilitators</h4>
                <hr></hr>
                {loadedFacilitators && <FacilitatorsList items={loadedFacilitators} />}               
                </React.Fragment>
            )}
            </Container>
            
        </React.Fragment>
    )
}

export default AllFacilitators;