import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Legend,
  PieChart,
  Pie,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

const BackEndMetrics = ({ projectIDState, formatData }) => {
  const [bEMetrics, setBEMetrics] = useState([]);
  const [bEDataPresent, setBEDataPresent] = useState(false);
  const [latestBEMetrics, setLatestBEMetrics] = useState('');

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
    fetchBEMetrics();
  }, []);

  const bEName = (name) => {
    if (name === 'Duration') {
        return 'Time taken for the processing of the request in milliseconds.'
    } if (name === 'Request Body Size') {
        return 'Size of the request body in bytes. This is useful for understanding the data load your server is handling per request.'
    } if (name === 'Total Requests') {
        return 'Cumulative number of requests your server has processed since it started or since the metric tracking began.'
    } if (name === 'Concurrent Requests') {
        return 'Number of requests being handled concurrently at a given moment. '
    } if (name === 'Errors') {
        return 'Total number of requests that resulted in an error. In this context, it shows there have been no requests that ended in an error (a good sign).'
    } if (name === 'Resident Set Size') {
        return 'Amount of space occupied in the main memory (RAM) for the process, including all C++ and JavaScript objects and code.'
    } if (name === 'Total Heap') {
      return 'Total size of the allocated heap in megabytes. The heap is the memory used by JavaScript objects.'
    } if (name === 'Heap Used') {
      return 'Amount of the heap that is currently being used by JavaScript objects. This can help in identifying memory leaks.'
    } if (name === 'Memory Used') {
      return `Memory used by "external" resources like C++ objects bound to JavaScript objects managed by V8's garbage collector. This could include things like Buffer objects.`
    } if (name === 'Average Response Time') {
      return `Average time taken to respond to requests in milliseconds.`
    } if (name === 'Average Payload Size') {
      return `Average size of the request payloads in bytes your server has been receiving.`
    }
}

const CustomTooltip = ({ active, payload, label }) => {
  useEffect(() => {
}, [payload]);

    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          {payload.map((entry, index) => (
            <div>
              <p key={index} className="data-point">
                <span>{`${entry.name} on ${entry.payload.timestamp}: `}</span>
                <span className="tooltip-value">{Math.round(entry.value,2)}</span>
                <span>{` - ${bEName(entry.name)}`}</span></p>
            </div>
            ))}
        </div>
      );
    }
    return null;
  };

  const CustomTooltipPie = ({ active, payload, label }) => {
    useEffect(() => {
  }, [payload]);
  
      if (active && payload && payload.length) {
        return (
          <div className="custom-tooltip">
            {payload.map((entry, index) => (
              <div>
                <p key={index} className="data-point">
                  <span>{`${entry.name}: `}</span>
                  <span className="tooltip-value">{Math.round(entry.value,2)}</span>
                  <span>{` - ${bEName(entry.name)}`}</span></p>
              </div>
              ))}
          </div>
        );
      }
      return null;
    };

  return (
    <div className="component-container">
      <Box>
        <Container
           maxWidth="false"
           sx={{
             justifyContent: 'center',
             marginTop: '0',
             marginBottom: '0',
             background: 'var(--backgroundColor)',
           }}  
        >
          <Grid container spacing={3}>
            {bEDataPresent && bEMetrics.length > 0 ? (
            <>
            <Grid item xs={12} md={2}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 250,
                  textAlign: 'center',
                  fontSize: '1.25rem',
                }}
              >
                {' '}
                <div className="header">Overall Server Performance</div>
                <div className="score">{Math.round(latestBEMetrics.average_response_time)}</div>
                <ResponsiveContainer height="120%">
                  <PieChart>
                    <Pie
                      data={[
                        {
                          name: 'Back End Performance',
                          value: latestBEMetrics.average_response_time,
                          fill: '#ffeaad',
                        },
                        { name: '', value: 100 - latestBEMetrics.average_response_time, fill: '#ffffff' },
                      ]}
                      dataKey="value"
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
                    />
                    <Tooltip content={<CustomTooltipPie />} wrapperStyle={{ top: 120}} />
                  </PieChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
            <Grid item xs={12} md={2}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 250,
                  textAlign: 'center',
                  fontSize: '1.25rem',
                }}
              >
                {' '}
                <div className="header">Total Requests</div>
                <div className="score">{Math.round(latestBEMetrics.total_requests)}</div>
                <ResponsiveContainer height="120%">
                  <PieChart>
                    <Pie
                      data={[
                        {
                          name: 'Total Requests',
                          value: latestBEMetrics.total_requests,
                          fill: '#ffeaad',
                        },
                        { name: '', value: 100 - latestBEMetrics.total_requests, fill: '#ffffff' },
                      ]}
                      dataKey="value"
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
                    />
                    <Tooltip content={<CustomTooltipPie />} wrapperStyle={{ top: 120}} />
                  </PieChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
            <Grid item xs={12} md={2}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 250,
                  textAlign: 'center',
                  fontSize: '1.25rem',
                }}
              >
                {' '}
                <div className="header">Total Concurrent Requests</div>
                <div className="score">{Math.round(latestBEMetrics.concurrent_requests)}</div>
                <ResponsiveContainer height="120%">
                  <PieChart>
                    <Pie
                      data={[
                        {
                          name: 'Concurrent Requests',
                          value: latestBEMetrics.concurrent_requests,
                          fill: '#ffeaad',
                        },
                        { name: '', value: 100 - latestBEMetrics.concurrent_requests, fill: '#ffffff' },
                      ]}
                      dataKey="value"
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
                    />
                    <Tooltip content={<CustomTooltipPie />} wrapperStyle={{ top: 120}} />
                  </PieChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
            <Grid item xs={12} md={2}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 250,
                  textAlign: 'center',
                  fontSize: '1.25rem',
                }}
              >
                {' '}
                <div className="header">No. of Errors</div>
                <div className="score">{Math.round(latestBEMetrics.errors)}</div>
                <ResponsiveContainer height="120%">
                  <PieChart>
                    <Pie
                      data={[
                        {
                          name: 'Errors',
                          value: latestBEMetrics.errors,
                          fill: '#ffeaad',
                        },
                        { name: '', value: 100 - latestBEMetrics.errors, fill: '#ffffff' },
                      ]}
                      dataKey="value"
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
                    />
                    <Tooltip content={<CustomTooltipPie />} wrapperStyle={{ top: 120}} />
                  </PieChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
            <Grid item xs={12} md={2}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 250,
                  textAlign: 'center',
                  fontSize: '1.25rem',
                }}
              >
                {' '}
                <div className="header">Average Response Time (ms)</div>
                <div className="score">{Math.round(latestBEMetrics.average_response_time)}</div>
                <ResponsiveContainer height="120%">
                  <PieChart>
                    <Pie
                      data={[
                        {
                          name: 'Average Response Time',
                          value: latestBEMetrics.average_response_time,
                          fill: '#ffeaad',
                        },
                        { name: '', value: 100 - latestBEMetrics.average_response_time, fill: '#ffffff' },
                      ]}
                      dataKey="value"
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
                    />
                    <Tooltip content={<CustomTooltipPie />} wrapperStyle={{ top: 120}} />
                  </PieChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
            <Grid item xs={12} md={2}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 250,
                  textAlign: 'center',
                  fontSize: '1.25rem',
                }}
              >
                {' '}
                <div className="header">Heap Used</div>
                <div className="score">{Math.round(latestBEMetrics.heap_used)}</div>
                <ResponsiveContainer height="120%">
                  <PieChart>
                    <Pie
                      data={[
                        {
                          name: 'Heap Used',
                          value: latestBEMetrics.heap_used,
                          fill: '#ffeaad',
                        },
                        { name: '', value: 100 - latestBEMetrics.heap_used, fill: '#ffffff' },
                      ]}
                      dataKey="value"
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
                    />
                    <Tooltip content={<CustomTooltip />} wrapperStyle={{ top: 220, left: 25 }} />
                  </PieChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
            <Grid item xs={8} md={4}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 300,
                }}
              >
                <div className="header">Request Duration and Response Time (ms)</div>
                <ResponsiveContainer height={225} width="100%">
                  {bEDataPresent && bEMetrics.length > 0 ? (
                    <LineChart data={formatData(bEMetrics)}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="timestamp" tick={{ fontSize: 12 }} />
                      <YAxis yAxisId="left" />
                      <Tooltip content={<CustomTooltip />} wrapperStyle={{ top: 220, left: 25 }}/>
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="duration"
                        name="Duration"
                        stroke="#8884d8"
                        yAxisId="left"
                        dot={false}
                      />

                      <Line
                        type="monotone"
                        dataKey="average_response_time"
                        name="Average Response Time"
                        stroke="#3951C8"
                        yAxisId="left"
                        dot={false}
                      />
                    </LineChart>
                  ) : (
                    <div> Run your first back end test!</div>
                  )}
                </ResponsiveContainer>
              </Paper>
            </Grid>
            <Grid item xs={8} md={4}>
              <Paper
                sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 300,
              }}
              >
              <div className="header">Request and Payload Size (bytes)</div>
              <ResponsiveContainer height={225} width="100%">
                {bEDataPresent && bEMetrics.length > 0 ? (
                  <LineChart data={formatData(bEMetrics)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timestamp" tick={{ fontSize: 12 }} />
                    <YAxis yAxisId="left" />
                    <Tooltip content={<CustomTooltip />} wrapperStyle={{ top: 220, left: 25 }}/>
                    <Legend />

                    <Line
                      type="monotone"
                      dataKey="request_body_size"
                      name="Request Body Size"
                      stroke="#82ca9d"
                      yAxisId="left"
                      dot={false} // Add this line
                    />

                    <Line
                      type="monotone"
                      dataKey="average_payload_size"
                      name="Average Payload Size"
                      stroke="#31E5BB"
                      yAxisId="left"
                      dot={false}
                    />
                  </LineChart>
                ) : (
                  <div> </div>
                )}
              </ResponsiveContainer>
            </Paper>
          </Grid>
          <Grid item xs={8} md={4}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 300,
              }}
            >
            <div className="header">Space Usage (MB)</div>
            <ResponsiveContainer height="100%" width="100%">
              {bEDataPresent && bEMetrics.length > 0 ? (
                <LineChart data={formatData(bEMetrics)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="timestamp" tick={{ fontSize: 12 }} />
                  <YAxis yAxisId="left" />
                  <Tooltip content={<CustomTooltip />} wrapperStyle={{ top: 220, left: 25 }}/>
                  <Legend />

                  <Line
                    type="monotone"
                    dataKey="rss"
                    name="Resident Set Size"
                    stroke="#ff7300"
                    yAxisId="left"
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="heap_total"
                    name="Total Heap"
                    stroke="#a83232"
                    yAxisId="left"
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="heap_used"
                    name="Heap Used"
                    stroke="#003459"
                    yAxisId="left"
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="external"
                    name="Memory Used"
                    stroke="#A436D4"
                    yAxisId="left"
                    dot={false}
                  />
                </LineChart>
              ) : (
                <div> </div>
              )}
              </ResponsiveContainer>
            </Paper>
          </Grid>
          <Grid item xs={12}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 350,
                  textAlign: 'center',
                  fontSize: '1.25rem',
                }}
              >
                {' '}
                <div className="header">Recommendations:</div>
                <ResponsiveContainer height="100%">
                  XX
                </ResponsiveContainer>
              </Paper>
            </Grid>
          </>
          ) : (
            <Grid item xs={12}>
              <Paper
                sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: 275,
                }}
              >
                Run your first back end test!
              </Paper>
            </Grid>
            )}
        </Grid>
      </Container>
    </Box>
   </div>
  );
};

export default BackEndMetrics;
