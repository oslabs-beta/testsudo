import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import SecurityPieChart from './SecurityPieChart';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  PieChart,
  Pie,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import contructionIcon from '../assets/contructionIcon.png';

const Summary = ({ projectIDState, formatData }) => {
  const [fEMetrics, setFEMetrics] = useState([]);
  const [fEDataPresent, setFEDataPresent] = useState(false);
  const [fEPerformance, setFEPerformance] = useState('');
  const [bEResponse, setBEResponse] = useState('');

  const fetchFEMetrics = () => {
    fetch(`http://localhost:3001/projects/${projectIDState}`)
      .then((res) => res.json())
      .then((data) => {
        setFEMetrics(data.FEmetrics);
        setFEPerformance(data.performance);
        if (data.FEmetrics.length > 0) {
          setFEDataPresent(true);
        }
      })
      .catch((err) => {
        console.log('error in fetching FE metrics');
      });
  };

  // to copy to BackEndMetrics.jsx
  const [bEMetrics, setBEMetrics] = useState([]);
  const [bEDataPresent, setBEDataPresent] = useState(false);

  const fetchBEMetrics = () => {
    fetch(`http://localhost:3001/projects/${projectIDState}`)
      .then((res) => res.json())
      .then((data) => {
        setBEMetrics(data.BEmetrics);
        setBEResponse(data.response);
        if (data.BEmetrics.length > 0) {
          setBEDataPresent(true);
        }
      })
      .catch((err) => {
        console.log('error in fetching BE metrics');
      });
  };

  useEffect(() => {
    fetchFEMetrics(), fetchBEMetrics();
  }, []);

  return (
    <div className='frontend-metrics-page'>
      <Box>
        <Container
          maxWidth='false'
          sx={{
            justifyContent: 'center',
            marginTop: '0',
            marginBottom: '0',
            background: 'var(--backgroundColor)',
          }}
        >
          {/* <DashNav /> */}
          <Grid container spacing={1}>
            <Grid item xs={12} md={8} lg={6}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 275,
                }}
              >
                <div className='header'>Front End Metrics</div>
                <ResponsiveContainer height={225} width='100%'>
                  {fEDataPresent && fEMetrics.length > 0 ? (
                    <LineChart data={formatData(fEMetrics)}>
                      <CartesianGrid strokeDasharray='3 3' />
                      <XAxis dataKey='timestamp' tick={{ fontSize: 12 }} />
                      <YAxis yAxisId='left' />
                      <YAxis yAxisId='right' orientation='right' />
                      <Tooltip />
                      <Legend />
                      <Line
                        type='monotone'
                        dataKey='cumulativelayoutshift'
                        name='Cumulative Layout Shift'
                        stroke='#8884d8'
                        yAxisId='right'
                      />
                      <Line
                        type='monotone'
                        dataKey='firstcontentfulpaint'
                        name='First Contentful Paint'
                        stroke='#82ca9d'
                        yAxisId='left'
                      />
                      <Line
                        type='monotone'
                        dataKey='largestcontentfulpaint'
                        name='Largest Contentful Paint'
                        stroke='#ffc658'
                        yAxisId='left'
                      />
                      <Line
                        type='monotone'
                        dataKey='performance'
                        name='Performance'
                        stroke='#ff7300'
                        yAxisId='left'
                      />
                      <Line
                        type='monotone'
                        dataKey='speedindex'
                        name='Speed Index'
                        stroke='#a83232'
                        yAxisId='left'
                      />
                      <Line
                        type='monotone'
                        dataKey='totalblockingtime'
                        name='Total Blocking Time'
                        stroke='#003459'
                        yAxisId='left'
                      />
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
                  height: 275,
                }}
              >
                <div className='header'>
                  Request Duration and Response Time (ms)
                </div>
                <ResponsiveContainer height={225} width='100%'>
                  {bEDataPresent && bEMetrics.length > 0 ? (
                    <LineChart data={formatData(bEMetrics)}>
                      <CartesianGrid strokeDasharray='3 3' />
                      <XAxis dataKey='timestamp' tick={{ fontSize: 12 }} />
                      <YAxis yAxisId='left' />
                      <Tooltip />
                      <Legend />
                      <Line
                        type='monotone'
                        dataKey='duration'
                        name='Duration'
                        stroke='#8884d8'
                        yAxisId='left'
                        dot={false}
                      />

                      <Line
                        type='monotone'
                        dataKey='average_response_time'
                        name='Average Response Time'
                        stroke='#3951C8'
                        yAxisId='left'
                        dot={false}
                      />
                    </LineChart>
                  ) : (
                    <div> Run your first back end test!</div>
                  )}
                </ResponsiveContainer>
              </Paper>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 275,
                }}
              >
                <div className='header'>Request and Payload Size (bytes)</div>
                <ResponsiveContainer height={225} width='100%'>
                  {bEDataPresent && bEMetrics.length > 0 ? (
                    <LineChart data={formatData(bEMetrics)}>
                      <CartesianGrid strokeDasharray='3 3' />
                      <XAxis dataKey='timestamp' tick={{ fontSize: 12 }} />
                      <YAxis yAxisId='left' />
                      <Tooltip />
                      <Legend />

                      <Line
                        type='monotone'
                        dataKey='request_body_size'
                        name='Request Body Size'
                        stroke='#82ca9d'
                        yAxisId='left'
                        dot={false} // Add this line
                      />

                      <Line
                        type='monotone'
                        dataKey='average_payload_size'
                        name='Average Payload Size'
                        stroke='#31E5BB'
                        yAxisId='left'
                        dot={false}
                      />
                    </LineChart>
                  ) : (
                    <div> </div>
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
                  // marginBottom: '1.1rem',
                  height: 310,
                  textAlign: 'center',
                  fontSize: '1.25rem',
                }}
              >
                {' '}
                <div className='header'>Overall Front End Performance</div>
                <div className='score'> {fEPerformance}</div>
                <ResponsiveContainer width='100%' height='120%'>
                  <PieChart>
                    <Pie
                      data={[
                        {
                          name: 'Front End Performance',
                          value: fEPerformance,
                          fill: '#d14334',
                        },
                        {
                          name: '',
                          value: 100 - fEPerformance,
                          fill: '#ffffff',
                        },
                      ]}
                      dataKey='value'
                      cx='50%'
                      cy='50%'
                      innerRadius={40}
                      outerRadius={80}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </Paper>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 240,
                  textAlign: 'center',
                  fontSize: '1.25rem',
                }}
              >
                {' '}
                <div className='header'>Average Response Time (ms):</div>
                <div className='score'>{Math.round(bEResponse)}</div>
                <ResponsiveContainer height='120%'>
                  <PieChart>
                    <Pie
                      data={[
                        {
                          name: 'Front End Performance',
                          value: bEResponse,
                          fill: '#ffeaad',
                        },
                        { name: '', value: 100 - bEResponse, fill: '#ffffff' },
                      ]}
                      dataKey='value'
                      cx='50%'
                      cy='50%'
                      innerRadius={50}
                      outerRadius={70}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </Paper>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 275,
                  width: '202%',
                }}
              >
                <div className='header'>Space Usage (MB)</div>
                <ResponsiveContainer height='100%' width='100%'>
                  {bEDataPresent && bEMetrics.length > 0 ? (
                    <LineChart data={formatData(bEMetrics)}>
                      <CartesianGrid strokeDasharray='3 3' />
                      <XAxis dataKey='timestamp' tick={{ fontSize: 12 }} />
                      <YAxis yAxisId='left' />
                      <Tooltip />
                      <Legend />

                      <Line
                        type='monotone'
                        dataKey='rss'
                        name='Resident Set Size'
                        stroke='#ff7300'
                        yAxisId='left'
                        dot={false}
                      />
                      <Line
                        type='monotone'
                        dataKey='heap_total'
                        name='Heap Total'
                        stroke='#a83232'
                        yAxisId='left'
                        dot={false}
                      />
                      <Line
                        type='monotone'
                        dataKey='heap_used'
                        name='Heap Used'
                        stroke='#003459'
                        yAxisId='left'
                        dot={false}
                      />
                      <Line
                        type='monotone'
                        dataKey='external'
                        name='Memory used by external resources'
                        stroke='#A436D4'
                        yAxisId='left'
                        dot={false}
                      />
                    </LineChart>
                  ) : (
                    <div> </div>
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
                  marginBottom: '1.1rem',
                  height: 560,
                  textAlign: 'center',
                  fontSize: '1.25rem',
                }}
              >
                {' '}
                <div className='header'>
                  Security Metrics
                  <br />
                </div>
                {/* <SecurityPieChart /> */}
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
                    className='PUC-icon'
                    src={contructionIcon}
                    alt=''
                    style={{
                      width: '60%',
                      height: 'auto',
                      display: 'block',
                      marginLeft: 'auto',
                      marginRight: 'auto',
                    }}
                  />
                </div>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
};
export default Summary;
