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
  const [latestFEMetrics, setLatestFEMetrics] = useState('');
  const [bEMetrics, setBEMetrics] = useState([]);
  const [bEDataPresent, setBEDataPresent] = useState(false);
  const [latestBEMetrics, setLatestBEMetrics] = useState('');

  const fetchFEMetrics = () => {
    fetch(`http://localhost:3001/projects/${projectIDState}`)
      .then((res) => res.json())
      .then((data) => {
        setFEMetrics(data.FEmetrics);
        setLatestFEMetrics(data.latestFE);
        if (data.FEmetrics.length > 0) {
          setFEDataPresent(true);
        }
      })
      .catch((err) => {
        console.log('error in fetching FE metrics');
      });
  };

  const fetchBEMetrics = () => {
    fetch(`http://localhost:3001/projects/${projectIDState}`)
      .then((res) => res.json())
      .then((data) => {
        setBEMetrics(data.BEmetrics);
        setLatestBEMetrics(data.latestBE);
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

  const name = (name) => {
    if (name === 'Cumulative Layout Shift') {
      return 'This measures the movement of visible elements within the viewport.';
    }
    if (name === 'First Contentful Paint') {
      return 'This marks the time at which the first text or image is painted in seconds.';
    }
    if (name === 'Speed Index') {
      return 'This shows how quickly the contents of a page are visibly populated in seconds.';
    }
    if (name === 'Largest Contentful Paint') {
      return 'This marks the time at which the largest text or image is painted in seconds.';
    }
    if (name === 'Time to Interactive') {
      return 'This is the amount of time it takes for the page to become fully interactive in seconds.';
    }
    if (name === 'Total Blocking Time') {
      return 'This is the sum of all time periods between FCP and Time to Interactive in milliseconds, when task length exceeded 50ms.';
    }
    if (name === 'Duration') {
      return 'Time taken for the processing of the request in milliseconds.';
    }
    if (name === 'Request Body Size') {
      return 'Size of the request body in bytes. This is useful for understanding the data load your server is handling per request.';
    }
    if (name === 'Total Requests') {
      return 'Cumulative number of requests your server has processed since it started or since the metric tracking began.';
    }
    if (name === 'Concurrent Requests') {
      return 'Number of requests being handled concurrently at a given moment. ';
    }
    if (name === 'Errors') {
      return 'Total number of requests that resulted in an error. In this context, it shows there have been no requests that ended in an error (a good sign).';
    }
    if (name === 'Resident Set Size') {
      return 'Amount of space occupied in the main memory (RAM) for the process, including all C++ and JavaScript objects and code.';
    }
    if (name === 'Total Heap') {
      return 'Total size of the allocated heap in megabytes. The heap is the memory used by JavaScript objects.';
    }
    if (name === 'Heap Used') {
      return 'Amount of the heap that is currently being used by JavaScript objects. This can help in identifying memory leaks.';
    }
    if (name === 'Memory Used') {
      return `Memory used by "external" resources like C++ objects bound to JavaScript objects managed by V8's garbage collector. This could include things like Buffer objects.`;
    }
    if (name === 'Average Response Time') {
      return `Average time taken to respond to requests in milliseconds.`;
    }
    if (name === 'Average Payload Size') {
      return `Average size of the request payloads in bytes your server has been receiving.`;
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    useEffect(() => {}, [payload]);

    if (active && payload && payload.length) {
      return (
        <div className='custom-tooltip'>
          {payload.map((entry, index) => (
            <div>
              <p key={index} className='data-point'>
                <span>{`${entry.name} on ${entry.payload.timestamp}: `}</span>
                <span className='tooltip-value'>
                  {Math.round(entry.value, 2)}
                </span>
                <span>{` - ${name(entry.name)}`}</span>
              </p>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const CustomTooltipPie = ({ active, payload, label }) => {
    useEffect(() => {}, [payload]);

    if (active && payload && payload.length) {
      return (
        <div className='custom-tooltip'>
          {payload.map((entry, index) => (
            <div>
              <p key={index} className='data-point'>
                <span>{`${entry.name}: `}</span>
                <span className='tooltip-value'>
                  {Math.round(entry.value, 2)}
                </span>
                <span>{` - ${name(entry.name)}`}</span>
              </p>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

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
                      <Tooltip
                        content={<CustomTooltip />}
                        wrapperStyle={{ top: 220, left: 25 }}
                      />
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
                      <Tooltip
                        content={<CustomTooltip />}
                        wrapperStyle={{ top: 220, left: 25 }}
                      />
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
                      <Tooltip
                        content={<CustomTooltip />}
                        wrapperStyle={{ top: 220, left: 25 }}
                      />
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
                    <div> Run your first back end test! </div>
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
                {fEDataPresent && fEMetrics.length > 0 ? (
                  <>
                    <div className='score'> {latestFEMetrics.performance}</div>
                    <ResponsiveContainer width='100%' height='120%'>
                      <PieChart>
                        <Pie
                          data={[
                            {
                              name: 'Front End Performance',
                              value: latestFEMetrics.performance,
                              fill: '#d14334',
                            },
                            {
                              name: '',
                              value: 100 - latestFEMetrics.performance,
                              fill: '#ffffff',
                            },
                          ]}
                          dataKey='value'
                          cx='50%'
                          cy='50%'
                          innerRadius={40}
                          outerRadius={80}
                        />
                        <Tooltip
                          content={<CustomTooltipPie />}
                          wrapperStyle={{ top: 120 }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </>
                ) : (
                  <div style={{ fontSize: '1rem' }}>
                    {' '}
                    Run your first front end test!{' '}
                  </div>
                )}
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
                <div className='header'>Overall Server Performance:</div>
                {bEDataPresent && bEMetrics.length > 0 ? (
                  <>
                    <div className='score'>
                      {Math.round(latestBEMetrics.average_response_time)}
                    </div>
                    <ResponsiveContainer height='120%'>
                      <PieChart>
                        <Pie
                          data={[
                            {
                              name: 'Back End Performance',
                              value: latestBEMetrics.average_response_time,
                              fill: '#ffeaad',
                            },
                            {
                              name: '',
                              value:
                                100 - latestBEMetrics.average_response_time,
                              fill: '#ffffff',
                            },
                          ]}
                          dataKey='value'
                          cx='50%'
                          cy='50%'
                          innerRadius={50}
                          outerRadius={70}
                        />
                        <Tooltip
                          content={<CustomTooltipPie />}
                          wrapperStyle={{ top: 120 }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </>
                ) : (
                  <div style={{ fontSize: '1rem' }}>
                    {' '}
                    Run your first back end test!{' '}
                  </div>
                )}
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
                    <div> Run your first back end test! </div>
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
