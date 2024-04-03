import React from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import constructionIcon from '../assets/contructionIcon.png';

const SecurityMetrics = () => {
  return (
    <div className="component-container">
      <Grid item xs={12} md={4} lg={3}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            marginBottom: '1.1rem',
            height: 560,
            textAlign: 'center',
            fontSize: '1.25rem',
          }}
        >
          {' '}
          <div className="header">
            Security Metrics
            <br />
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            Coming Soon! <br />
            <img
              className="PUC-icon"
              src={constructionIcon}
              alt=""
              style={{
                width: 'auto',
                height: 'auto',
                display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            />
          </div>
        </Paper>
      </Grid>
    </div>
  );
};

export default SecurityMetrics;
