import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { LineChart, Line, XAxis, YAxis, Legend, Tooltip, PieChart, Pie, CartesianGrid, ResponsiveContainer } from 'recharts';
import { consoleLogger } from '@influxdata/influxdb-client';

const FrontEndMetrics = ({ projectIDState, formatData }) => {
  const runMetricsHandle = () => {
    console.log('button clicked');
  }

  const [fEMetrics, setFEMetrics] = useState([]);
  const [fEDataPresent, setFEDataPresent] = useState(false)
  const [fEPerformance, setFEPerformance] = useState('')

  const fetchFEMetrics = () => {
    fetch(`http://localhost:3001/projects/${projectIDState}`)
      .then(res => res.json())
      .then(data => {
        setFEMetrics(data.FEmetrics);
        setFEPerformance(data.performance);
        if (data.FEmetrics.length > 0) {
          setFEDataPresent(true)
        };
      }).catch(err => {
        console.log('error in fetching FE metrics')
    })
  }

// to copy to BackEndMetrics.jsx
const [bEMetrics, setBEMetrics] = useState([]);
const [bEDataPresent, setBEDataPresent] = useState(false)

const fetchBEMetrics = () => {
  fetch(`http://localhost:3001/projects/${projectIDState}`)
    .then(res => res.json())
    .then(data => {
      setBEMetrics(data.BEmetrics);
      if (data.BEmetrics.length > 0) {
        setBEDataPresent(true)
      };
    }).catch(err => {
      console.log('error in fetching BE metrics')
  })
}

useEffect(() => {
  fetchFEMetrics(),
  fetchBEMetrics()
}, [])

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
                {fEDataPresent && fEMetrics.length > 0 ? (
                  <LineChart data={formatData(fEMetrics)}>
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
                  ) : (
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
                Back End Metrics <div/>
                <ResponsiveContainer height={300} width="100%">
                {bEDataPresent && bEMetrics.length > 0 ? (
                  <LineChart data={formatData(bEMetrics)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timestamp" tick={{fontSize: 12}} />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Legend />
                    <Line type="monotone" dataKey="duration" name="Duration" stroke="#8884d8" yAxisId="right"/>
                    <Line type="monotone" dataKey="request_body_size" name="Request Body Size" stroke="#82ca9d" yAxisId="left"/>
                    <Line type="monotone" dataKey="errors" name="Errors" stroke="#ffc658" yAxisId="right"/>
                    <Line type="monotone" dataKey="rss" name="RSS" stroke="#ff7300" yAxisId="right"/>
                    <Line type="monotone" dataKey="heap_total" name="Heap Total" stroke="#a83232" yAxisId="right"/>
                    <Line type="monotone" dataKey="heap_used" name="Heap Used" stroke="#003459" yAxisId="right"/>
                    <Line type="monotone" dataKey="external" name="External" stroke="#A436D4" yAxisId="right"/>
                    <Line type="monotone" dataKey="average_response_time" name="Average Response Time" stroke="#3951C8" yAxisId="right"/>
                    <Line type="monotone" dataKey="average_payload_size" name="Average Payload Size" stroke="#31E5BB" yAxisId="left"/>
                    <Line type="monotone" dataKey="total_requests" name="Total Requests" stroke="#9BCD13" yAxisId="right"/>
                    <Line type="monotone" dataKey="concurrent_requests" name="Concurrent Requests" stroke="#804721" yAxisId="right"/>
                  </LineChart>
                  ) : (
                    <div> Run your first back end test!</div>
                )}
              </ResponsiveContainer>
            </Paper>
          </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 400
                }}> 
                Overall Front End Performance
                <div style={{ textAlign: 'center' }}>
                  {fEPerformance}
                </div>
                <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                <Pie data={[{ name: 'Front End Performance', value: fEPerformance, fill: '#8884d8' }, { name: '', value: 100 -fEPerformance, fill: "#ffffff" }]} dataKey="value" cx="50%" cy="50%" innerRadius={70} outerRadius={80} />
                </PieChart>
                </ResponsiveContainer>
                </Paper>
                {/* <Paper
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
                </Paper> */}
              </Grid>
  
              {/* <Grid item xs={12} md={4} lg={3}>
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
              </Grid> */}
        </Grid>
      </Container>
      </Box>
    </div>
  )
}

export default FrontEndMetrics;
