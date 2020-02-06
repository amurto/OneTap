import React from 'react';

import { Row, Card } from 'react-bootstrap';
import ApplicantItem from './ApplicantItem';

const ApplicantList = props => {
    if (props.items.length === 0) {
        return <div className="product-list center">
            <Card>
                <h2>No applicants found.</h2>
            </Card>
        </div>
    }
    return (
            <Row>
                {props.items.map(applicant => 
                    <ApplicantItem 
                        id={applicant.id}
                        key={applicant.id}
                        location={applicant.location}
                        address={applicant.address}
                        name={applicant.name}
                        gender={applicant.gender}
                        age={applicant.age}
                        email={applicant.email}
                        verticals={applicant.verticals}
                        phone={applicant.phone}  
                        state={applicant.state}
                        district={applicant.district}
                        selected1={applicant.selected1}
                        selected2={applicant.selected2} 
                    />
                )}
            </Row>
    )
};

export default ApplicantList;