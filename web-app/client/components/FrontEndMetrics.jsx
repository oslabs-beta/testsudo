import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { LineChart, Line, XAxis, YAxis, Legend, CartesianGrid, ResponsiveContainer } from 'recharts';

// const PROJECTID = process.env.PROJECTID

const FrontEndMetrics = () => {
  const runMetricsHandle = () => {
    console.log('button clicked');
  }

  const [metricsData, setMetricsData] = useState([]);
  const [dataPresent, setDataPresent] = useState(false)

  const fetchMetrics = () => {
    const projectID = '65e37bc688228d987bc5eb49'

    fetch(`http://localhost:3001/projects/${projectID}`)
      .then(res => res.json())
      .then(data => {
        setMetricsData(data.FEmetrics);
        setDataPresent(true);
      }).catch(err => {
        console.log('error in fetching projects metrics')
    })
  }

  useEffect(() => {
    fetchMetrics()
  }, [])

  const formatTimestamp = timestamp => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });
  };

  const processData = (data) => {
    return data.map(entry => ({
      ...entry,
      cumulativelayoutshift: entry.cumulativelayoutshift || 0,
      firstcontentfulpaint: entry.firstcontentfulpaint || 0,
      largestcontentfulpaint: entry.largestcontentfulpaint || 0,
      performance: entry.performance || 0,
      speedindex: entry.speedindex || 0,
      totalblockingtime: entry.totalblockingtime || 0,
    }));
  };

  const formatData = () => {
    return metricsData.map(entry => ({
      ...entry,
      timestamp: formatTimestamp(entry.timestamp)
    }));
  };

// console.log(formatData(), ' test')

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
                    height: 316,
                  }}
                >
                  Front End Metrics <div/>
                  <ResponsiveContainer height={300} width="100%">
                  {dataPresent ? (
                    metricsData.length > 0 && (
                      <LineChart data={processData(formatData())}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="timestamp" tick={{fontSize: 12}} />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Legend />
                        <Line type="monotone" dataKey="cumulativelayoutshift" name="Cumulative Layout Shift" stroke="#8884d8" yAxisId="right"/>
                        <Line type="monotone" dataKey="firstcontentfulpaint" name="First Contentful Paint" stroke="#82ca9d" yAxisId="left"/>
                        <Line type="monotone" dataKey="largestcontentfulpaint" name="Largest Contentful Paint" stroke="#ffc658" yAxisId="left"/>
                        <Line type="monotone" dataKey="performance" name="Performance" stroke="#ff7300" yAxisId="left"/>
                        <Line type="monotone" dataKey="speedindex" name="Speed Index" stroke="#a83232" yAxisId="left"/>
                        <Line type="monotone" dataKey="totalblockingtime" name="Total Blocking Time" stroke="#003459" yAxisId="left"/>
                      </LineChart>
                    )) : (
                      <div> Run your first front end test!</div>
                  )}
                </ResponsiveContainer>
                </Paper>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 316,
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
