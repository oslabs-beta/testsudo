import React, { useState, useEffect, useMemo } from 'react';
import { Box, Container, Paper, Grid, Autocomplete, TextField } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, Legend, PieChart, Pie, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const BackEndMetrics = ({ projectIDState, formatData }) => {
  const [bEMetrics, setBEMetrics] = useState([]);
  const [bEDataPresent, setBEDataPresent] = useState(false);
  const [paths, setPaths] = useState([]);
  const [selectedPath, setSelectedPath] = useState('');

  const fetchBEMetrics = () => {
    fetch(`/projects/${projectIDState}`)
      .then((res) => res.json())
      .then((data) => {
        setBEMetrics(data.BEmetrics);
        if (data.BEmetrics.length > 0) {
          setBEDataPresent(true);
        }
        const uniquePaths = [...new Set(Object.values(data.BEmetrics).map(metric => metric.path))];
        setPaths(uniquePaths);
      })
      .catch((err) => {
        console.log('error in fetching BE metrics');
      });
  };

  useEffect(() => {
    fetchBEMetrics();
  }, []);

  const handlePathChange = (event, newPath) => {
    setSelectedPath(newPath);
  };

  const filteredBE = useMemo(() => {
    if (selectedPath) return bEMetrics.filter(metric => metric.path === selectedPath);
    else return null;
  }, [bEMetrics, selectedPath]);

  const filteredLatest = useMemo(() => {
    if (selectedPath) {
      const filteredData = bEMetrics.filter(metric => metric.path === selectedPath);
      return filteredData[filteredData.length - 1];
    } else return null
  }, [bEMetrics, selectedPath]);


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
                <span className="tooltip-value">{Math.round(entry.value, 2)}</span>
                </p>
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
        {bEDataPresent ? (
          <>
          <Grid item xs={12}>
            <Autocomplete
              disablePortal
              id="paths"
              options={paths}
              value={selectedPath}
              onChange={handlePathChange}
              renderInput={(params) => <TextField {...params} label="Paths" />}
            />
          </Grid>  
          {selectedPath && filteredBE.length > 0 ? (
            <>
              <Grid item xs={12} md={2}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 300,
                    textAlign: 'center',
                    fontSize: '1.25rem',
                  }}
                >  
                  {' '}
                  <div className="header">Overall Server Performance Score</div>
                  <div className="metrics-description">Composite score out of 100</div>
                  <ResponsiveContainer height="120%">
                    <PieChart>
                      <Pie
                        data={[
                          {
                            name: 'Back End Performance',
                            value: filteredLatest.performance_score,
                            fill: '#ffeaad',
                          },
                          { name: '', value: 100 - filteredLatest.performance_score, fill: '#ffffff' },
                        ]}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={70}
                        label={({
                          cx,
                          cy
                        }) => (
                          <text
                            x={cx}
                            y={cy}
                            fill="#f25f4c"
                            textAnchor="middle"
                            dominantBaseline="central"
                            style={{
                              fontSize: '2rem', 
                              fontWeight: 'bold' 
                            }}
                          >
                            {filteredLatest.performance_score.toFixed(0)} 
                          </text>
                        )}
                      />
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
                    height: 300,
                    textAlign: 'center',
                    fontSize: '1.25rem',
                  }}
                >
                  {' '}
                  <div className="header">Total Requests</div>
                  <div className="metrics-description">Cumulative number of requests your server has processed since it started or since the metric trakcing began</div>
                  <div className="score large-score">{Math.round(filteredLatest.total_requests)}</div>
                </Paper>
              </Grid>
              <Grid item xs={12} md={2}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 300,
                    textAlign: 'center',
                    fontSize: '1.25rem',
                  }}
                >
                  {' '}
                  <div className="header">Total Concurrent Requests</div>
                  <div className="metrics-description">Number of requests being handled concurrently at a given moment</div>
                  <div className="score large-score">{Math.round(filteredLatest.concurrent_requests)}</div>
                </Paper>
              </Grid>
              <Grid item xs={12} md={2}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 300,
                    textAlign: 'center',
                    fontSize: '1.25rem',
                  }}
                >
                  {' '}
                  <div className="header">No. of Errors</div>
                  <div className="metrics-description">Total number of requests that resulted in an error</div>
                  <div className="score large-score">{Math.round(filteredLatest.errors)}</div>
                </Paper>
              </Grid>
              <Grid item xs={12} md={2}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 300,
                    textAlign: 'center',
                    fontSize: '1.25rem',
                  }}
                >
                  {' '}
                  <div className="header">Duration (ms)</div>
                  <div className="metrics-description">Time taken for the processing of the request</div>
                  <div className="score large-score">{Number(filteredLatest.duration).toFixed(1)}</div>
                </Paper>
              </Grid>
              <Grid item xs={12} md={2}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 300,
                    textAlign: 'center',
                    fontSize: '1.25rem',
                  }}
                >
                  {' '}
                  <div className="header">Heap Used</div>
                  <div className="metrics-description">Amount of the heap that is currently being used by JS objects (can help in identifying memory leaks)</div>
                  <ResponsiveContainer height="120%">
                    <PieChart>
                      <Pie
                        data={[
                          {
                            name: 'Heap Used',
                            value: filteredLatest.heap_used,
                            fill: '#ffeaad',
                          },
                          { name: '', value: 100 - filteredLatest.heap_used, fill: '#ffffff' },
                        ]}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={70}
                        label={({
                          cx,
                          cy,
                          midAngle,
                          innerRadius,
                          outerRadius,
                          value,
                          index
                        }) => {
                          if (index === 0) {
                            const RADIAN = Math.PI / 180;
                            const radius = 25 + innerRadius + (outerRadius - innerRadius);
                            const x = cx + radius * Math.cos(-midAngle * RADIAN);
                            const y = cy + radius * Math.sin(-midAngle * RADIAN);
                            return (
                              <text 
                              x={cx} 
                              y={cy} 
                              fill="#f25f4c" 
                              textAnchor="middle" 
                              dominantBaseline="central"
                              style={{
                                fontSize: '2rem',
                                fontWeight: 'bold'  
                              }}
                              >
                                {Math.round(filteredLatest.heap_used)}
                              </text>
                            );
                          }
                          return null;
                        }}
                      />
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
                    height: 400,
                  }}
                >
                  <div className="header">Request Duration and Response Time (ms)</div>
                  <div className="metrics-description">
                    <b>Request duration:</b> Time taken for the processing of the request.<br></br>
                    <b>Response time:</b> Average time taken to respond to requests in milliseconds
                  </div>
                  <div style={{ marginTop: '50px' }}> 
                  <ResponsiveContainer height={225} width="100%" sx={{ mt: 2}}>
                      <LineChart data={formatData(filteredBE)}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="timestamp" tick={{ fontSize: 12 }} />
                        <YAxis yAxisId="left" />
                        <Tooltip content={<CustomTooltip />} wrapperStyle={{ top: 0, left: 25 }} />
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
                  </ResponsiveContainer>
                  </div>
                </Paper>
              </Grid>
              <Grid item xs={8} md={4}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 400,
                  }}
                >
                  <div className="header">Request and Payload Size (bytes)</div>
                  <div className="metrics-description"><b>Request size:</b> Size of the request body (the data load your server is handling per request)
                  <br></br><b>Payload size:</b> Avg size of the request payloads your server has been receiving
                  </div>
                  <div style={{ marginTop: '35px' }}>

                  <ResponsiveContainer height={225} width="100%">
                      <LineChart data={formatData(filteredBE)}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="timestamp" tick={{ fontSize: 12 }} />
                        <YAxis yAxisId="left" />
                        <Tooltip content={<CustomTooltip />} wrapperStyle={{ top: 0, left: 25 }} />
                        <Legend />

                        <Line
                          type="monotone"
                          dataKey="request_body_size"
                          name="Request Body Size"
                          stroke="#82ca9d"
                          yAxisId="left"
                          dot={false} 
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
                  </ResponsiveContainer>
                  </div>
                </Paper>
              </Grid>
              <Grid item xs={8} md={4}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 400,
                  }}
                >
                  <div className="header">Space Usage (MB)</div>
                  <div className="metrics-description"><b>Resident set size:</b> Amount of space occupied in the RAM for the process
                  <br></br><b>Total heap:</b> Total size of the allocated heap
                  <br></br><b>Heap used:</b> Amount of the heap that is currently being used by JS objects
                  <br></br><b>Memory used:</b> Memory used by external resources managed by V8's garbage collector
                  </div>
                  <ResponsiveContainer height="100%" width="100%">
                      <LineChart data={formatData(filteredBE)}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="timestamp" tick={{ fontSize: 12 }} />
                        <YAxis yAxisId="left" />
                        <Tooltip content={<CustomTooltip />} wrapperStyle={{ top: 0, left: 25 }} />
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
                    <div className="header">Back End Metrics</div>
                    Select a path to start viewing your back end performance metrics.
                  </Paper>
                </Grid>
            )}
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
                <div className="header">Back End Metrics</div>
                Run your first back end test.
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
