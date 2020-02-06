import React from 'react';
import Skill from './Skill';

import './FacilitatorItem.css';

const FacilitatorItem = props => {
    return (
        <div className="row">
                <div className="col-md-6 col-sm-8 col-xs-12 col-md-offset-3 col-sm-offset-2">
                    <div className="card" style={{ width: "80vw" }}>
                        <div className="text">           
                        <h3>{props.name}</h3>
                        <p style={{ marginBottom: "10px" }}>{props.email}</p>
                        

                        <h5>Skills</h5>
                        {props.skills.map((skill, index) => (
                            <Skill key={index} skill={skill} />
                        ))}
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default FacilitatorItem;
