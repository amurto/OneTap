import React from 'react';

import StaticBar from './StaticBar';

const Landing2 = () => {
  return (
    <React.Fragment>
      <StaticBar />
      <div className="center" style={{ height: "70vw", color: "grey", textAlign: "center" }}>
          <h3 style={{ marginTop: "50px" }}>
              You response has been recorded. Your results will be mailed to you.
          </h3>
      </div>
    </React.Fragment>
  );
}

export default Landing2;
