import React from 'react';

import { Row, Card } from 'react-bootstrap';
import FacilitatorItem from './FacilitatorItem';

const FacilitatorList = props => {
    if (props.items.length === 0) {
        return <div className="product-list center">
            <Card>
                <h2>No Facilitators found.</h2>
            </Card>
        </div>
    }
    return (
            <Row>
                {props.items.map(facilitator => 
                    <FacilitatorItem 
                        key={facilitator.id} 
                        id={facilitator.id} 
                        name={facilitator.name}
                        email={facilitator.email} 
                        phone={facilitator.phone} 
                        skills={facilitator.skills}
                    />
                )}
            </Row>
    )
};

export default FacilitatorList;