import React, { useState, useEffect, useMemo } from 'react';
import { Box, Container, Paper, Grid, Autocomplete, TextField } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, Legend, PieChart, Pie, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const FrontEndMetrics = ({ projectIDState, formatData }) => {
  const [fEMetrics, setFEMetrics] = useState([]);
  const [fEDataPresent, setFEDataPresent] = useState(false);
  const [endpoints, setEndpoints] = useState([])
  const [selectedEndpoint, setSelectedEndpoint] = useState('')

  const fetchFEMetrics = () => {
    fetch(`/projects/${projectIDState}`)
      .then((res) => res.json())
      .then((data) => {
        setFEMetrics(data.FEmetrics);
        if (data.FEmetrics.length > 0) {
          setFEDataPresent(true);
        };
        console.log('test');
        const uniqueEndpoints = [...new Set(Object.values(data.FEmetrics).map(metric => metric.endpoint))];
        setEndpoints(uniqueEndpoints);
      })
      .catch((err) => {
        console.log('error in fetching FE metrics');
      });
  };

  useEffect(() => {
    fetchFEMetrics();
  }, []);

  const handleEndpointChange = (event, newEndpoint) => {
    setSelectedEndpoint(newEndpoint);
  };

  const filteredFE = useMemo(() => { 
    if (selectedEndpoint) return fEMetrics.filter(metric => metric.endpoint === selectedEndpoint);
    else return null;
  }, [fEMetrics, selectedEndpoint]);

  const filteredLatest = useMemo(() => {
    if (selectedEndpoint) {
      const filteredData = fEMetrics.filter(metric => metric.endpoint === selectedEndpoint);
      return filteredData[filteredData.length - 1];
    } else return null
  }, [fEMetrics, selectedEndpoint]);


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
            {fEDataPresent ? (
              <>
               <Grid item xs={12}>
                <Autocomplete
                  disablePortal
                  id="endpoints"
                  options={endpoints}
                  value={selectedEndpoint}
                  onChange={handleEndpointChange}
                  renderInput={(params) => <TextField {...params} label="Endpoints" />}
                />
              </Grid> 
              {selectedEndpoint && filteredFE.length > 0 ? (
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
                    <div className="header">Overall Front End Performance Score</div>
                    <div className="metrics-description">Composite score out of 100</div>
                    <ResponsiveContainer height="120%">
                      <PieChart>
                        <Pie
                          data={[
                            {
                              name: 'Front End Performance',
                              value: filteredLatest.performance,
                              fill: '#ffeaad',
                            },
                            { name: '', value: 100 - filteredLatest.performance, fill: '#ffffff' },
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
                              {filteredLatest.performance.toFixed(0)}
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
                    <div className="header">Best Practices Score</div>
                    <div className="metrics-description">Category score for best practices that improve code health and quality of app</div>
                    <ResponsiveContainer height="120%">
                      <PieChart>
                        <Pie
                          data={[
                            {
                              name: 'Front End Performance',
                              value: filteredLatest.bestpractices,
                              fill: '#ffeaad',
                            },
                            { name: '', value: 100 - filteredLatest.bestpractices, fill: '#ffffff' },
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
                              {filteredLatest.bestpractices.toFixed(0)}
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
                    <div className="header">Accessibility Score</div>
                    <div className="metrics-description">Category score for app's accessibility for users, incl. those with disabilities</div>
                    <ResponsiveContainer height="120%">
                      <PieChart>
                        <Pie
                          data={[
                            {
                              name: 'Front End Performance',
                              value: filteredLatest.accessibility,
                              fill: '#ffeaad',
                            },
                            { name: '', value: 100 - filteredLatest.accessibility, fill: '#ffffff' },
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
                              {filteredLatest.accessibility.toFixed(0)}
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
                    <div className="header">Time to Interactive</div>
                    <div className="metrics-description">Time taken for page to become fully interactive (ms)</div>
                    <div className="score large-score">{Number(filteredLatest.timetointeractive).toFixed(0)}</div>
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
                    <div className="header">First Contentful Paint</div>
                    <div className="metrics-description">Time at which the first text or image is painted (ms)</div>
                    <div className="score large-score">{Number(filteredLatest.firstcontentfulpaint).toFixed(0)}</div>
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
                    <div className="header">Speed Index</div>
                    <div className="metrics-description">How quickly the contents of a page are visibly populated (ms)</div>
                    <div className="score large-score">{Number(filteredLatest.speedindex).toFixed(0)}</div>
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
                    <div className="header">Stability</div>
                    <div className="metrics-description">
                      <b>Cumulative Layout Shift:</b> Score measuring the movement of visible elements within the viewport

                    </div>
                    <div style={{ marginTop: '50px' }}> 

                      <ResponsiveContainer height={225} width="100%" sx={{ mt: 2 }}>
                        <LineChart data={formatData(filteredFE)}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="timestamp" tick={{ fontSize: 12 }} />
                          <YAxis yAxisId="left" />
                          <Tooltip content={<CustomTooltip />} wrapperStyle={{ top: 0, left: 25 }} />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="cumulativelayoutshift"
                            name="Cumulative Layout Shift"
                            stroke="#82ca9d"
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
                    <div className="header">Load performance (ms)</div>
                    <div className="metrics-description">
                      <b>First Contentful Paint:</b> Time at which the first text or image is painted<br></br>
                      <b>Speed Index:</b> How quickly the contents of a page are visibly populated<br></br>
                      <b>Largest Contentful Paint:</b> Time at which the largest text or image is painted<br></br>
                      <b>Time to Interactive:</b> Time taken for page to become fully interactive

                    </div>
                    <div style={{ marginTop: '30px' }}>

                      <ResponsiveContainer height={225} width="100%" sx={{ mt: 2 }}>
                          <LineChart data={formatData(filteredFE)}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="timestamp" tick={{ fontSize: 12 }} />
                            <YAxis yAxisId="left" />
                            <Tooltip content={<CustomTooltip />} wrapperStyle={{ top: 0, left: 25 }} />
                            <Legend />
                            <Line
                              type="monotone"
                              dataKey="firstcontentfulpaint"
                              name="First Contentful Paint"
                              stroke="#ff7300"
                              yAxisId="left"
                              dot={false}
                            />
                            <Line
                              type="monotone"
                              dataKey="speedindex"
                              name="Speed Index"
                              stroke="#a83232"
                              yAxisId="left"
                              dot={false}
                            />
                            <Line
                              type="monotone"
                              dataKey="largestcontentfulpaint"
                              name="Largest Contentful Paint"
                              stroke="#003459"
                              yAxisId="left"
                              dot={false}
                            />
                            <Line
                              type="monotone"
                              dataKey="timetointeractive"
                              name="Time to Interactive"
                              stroke="#A436D4"
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
                    <div className="header">Overall Quality Score</div>
                    <div className="metrics-description">
                      <b>Performance Score:</b> Overall composite performance score out of 100<br></br>
                      <b>Accessibility Score:</b> Category score for app's accessibility for users, incl. those with disabilities<br></br>
                      <b>Best Practices Score:</b> Category score for best practices that improve code health and quality of app
                    </div>
                    <div style={{ marginTop: '20px' }}> 

                      <ResponsiveContainer height={225} width="100%" sx={{ mt: 2 }}>
                        <LineChart data={formatData(filteredFE)}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="timestamp" tick={{ fontSize: 12 }} />
                          <YAxis yAxisId="left" />
                          <Tooltip content={<CustomTooltip />} wrapperStyle={{ top: 0, left: 25 }} />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="performance"
                            name="Performance"
                            stroke="#8884d8"
                            yAxisId="left"
                            dot={false}
                          />
                          <Line
                            type="monotone"
                            dataKey="accessibility"
                            name="Accessibility"
                            stroke="#3951C8"
                            yAxisId="left"
                            dot={false}
                          />
                          <Line
                            type="monotone"
                            dataKey="bestpractices"
                            name="Best Practices"
                            stroke="#003459"
                            yAxisId="left"
                            dot={false}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
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
                    <div className="header">Front End Metrics </div>
                    Select an endpoint to start viewing your front end performance metrics.
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
                ><div className="header">Front End Metrics</div>
                  Run your first front end test.
                </Paper>
              </Grid>
            )}
          </Grid>
        </Container>
      </Box>
    </div>
  );
};

export default FrontEndMetrics;
