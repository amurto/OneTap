import React from 'react';
import { Chart } from 'react-charts';
import Grid from '@material-ui/core/Grid';

import './Chart.css';

const Chart1 = () => {
    const data = React.useMemo(
        () => [
          {
            label: 'Series 1',
            data: [{ x: 1, y: 10 }, { x: 2, y: 10 }, { x: 3, y: 10 }]
          },
          {
            label: 'Series 2',
            data: [{ x: 1, y: 10 }, { x: 2, y: 10 }, { x: 3, y: 10 }]
          },
          {
            label: 'Series 3',
            data: [{ x: 1, y: 10 }, { x: 2, y: 10 }, { x: 3, y: 10 }]
          }
        ],
        []
      )
     
      const axes = React.useMemo(
        () => [
          { primary: true, type: 'linear', position: 'bottom' },
          { type: 'linear', position: 'left' }
        ],
        []
      )
     
      return (
        <Grid className="chart-card" item md={4} xs={12}>
          <Chart data={data} axes={axes} />
        </Grid>
      )
}

export default Chart1;