import React , { useState, useEffect } from 'react';

import ApplicantList from './ApplicantList';
import { useHttpClient } from './hooks/http-hook';
import LoadingSpinner from './LoadingSpinner';
import ErrorModal from './ErrorModal';
import { Container } from '@material-ui/core';
import './AllApplicants.css';

const AllApplicants = () => {
    const [loadedApplicants, setLoadedApplicants] = useState();

    // eslint-disable-next-line
    const [countApplicants, setCountApplicants] = useState(0);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    useEffect(() => {
        const fetchApplicants = async () => {
            try {
                const responseData = await sendRequest(
                    'http://localhost:5000/api/users/applicants'
                );
                setLoadedApplicants(responseData.applicants);
                setCountApplicants(responseData.applicants.length);
                console.log(responseData);
            } catch (err) {}
        };
        fetchApplicants();
    }, [sendRequest]);

    let filteredApplicants = [];

    for (let i = 0; i < countApplicants; i++) {
        if (loadedApplicants[i].selected1 === false) {
            filteredApplicants.push(loadedApplicants[i]);
        }
    }
    let c = filteredApplicants.length;

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && (
                <div className="center">
                    <LoadingSpinner />
                </div>
            )}
            {!isLoading && (
                <React.Fragment>
                <Container>
                <Container>
                <h2>All Applicants</h2>
                    <h4 style={{ fontSize: "20px", fontWeight: "400" }}>Showing {c} results</h4>
                </Container>
                <hr></hr>
                <div className="allapplicants-container">
                {filteredApplicants && <ApplicantList items={filteredApplicants} />}  
                </div>
                </Container>             
                </React.Fragment>
            )}
        </React.Fragment>
    )
}

export default AllApplicants;