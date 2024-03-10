import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

const FrontEndMetrics = () => {
  const runMetricsHandle = () => {
    console.log('button clicked');
  }

  return (
    <div>
        <Box>
          <Container maxWidth="false" sx={{ mt: 4, mb: 4, justifyContent: 'center' }}>
            <button style={{ marginLeft: '0%' }} onClick={runMetricsHandle}> Run </button>
            <div />
            <Grid container spacing={1}>
              <Grid item xs={12} md={8} lg={6}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 300,
                  }}
                >
                  Front End Metrics <div/>
                  <iframe
                    title="Front End Metrics Dashboard"
                    width="100%"
                    height="100%"
                    src="http://localhost:3030/public-dashboards/28951eca1a3a40408f38b4e63af259de"
                  />
                </Paper>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 300,
                  }}
                >
                  Second Dashboard <div/>
                  <iframe
                    title="Security Metrics Dashboard"
                    width="100%"
                    height="100%"
                    src="http://localhost:3030/public-dashboards/28951eca1a3a40408f38b4e63af259de"
                  />
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 200,
                  }}
                > Overall Performance
                </Paper>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 200,
                  }}
                > Speed Index
                </Paper>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 200,
                  }}
                > Page Load Speed
                </Paper>
              </Grid>
  
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 200,
                  }}
                > FE
                </Paper>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 200,
                  }}
                > Speed Index
                </Paper>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 200,
                  }}
                > Alerts
                </Paper>
              </Grid>
        </Grid>
      </Container>
      </Box>
    </div>
  )
}

export default FrontEndMetrics;
