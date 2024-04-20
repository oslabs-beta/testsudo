import React, { useState, useEffect } from 'react';
import { Box, Container, Paper, Grid, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
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

const FrontEndMetrics = ({ projectIDState, formatData }) => {
  const [fEMetrics, setFEMetrics] = useState([]);
  const [fEDataPresent, setFEDataPresent] = useState(false);
  const [latestFEMetrics, setLatestFEMetrics] = useState('');

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

  useEffect(() => {
    fetchFEMetrics();
  }, []);

  const fEName = (name) => {
    if (name === 'Cumulative Layout Shift') {
      return 'This measures the movement of visible elements within the viewport.'
    } if (name === 'First Contentful Paint') {
      return 'This marks the time at which the first text or image is painted in seconds.'
    } if (name === 'Speed Index') {
      return 'This shows how quickly the contents of a page are visibly populated in seconds.'
    } if (name === 'Largest Contentful Paint') {
      return 'This marks the time at which the largest text or image is painted in seconds.'
    } if (name === 'Time to Interactive') {
      return 'This is the amount of time it takes for the page to become fully interactive in seconds.'
    } if (name === 'Total Blocking Time') {
      return 'This is the sum of all time periods between FCP and Time to Interactive in milliseconds, when task length exceeded 50ms.'
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
                <span className="tooltip-value">{Math.round(entry.value, 2)}</span>
                {/* <span>{` - ${fEName(entry.name)}`}</span> */}
              </p>
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
                <span className="tooltip-value">{Math.round(entry.value, 2)}</span>
                <span>{` - ${fEName(entry.name)}`}</span></p>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    // <div className="frontend-metrics-page">
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
            {fEDataPresent && fEMetrics.length > 0 ? (
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
                              value: latestFEMetrics.performance,
                              fill: '#ffeaad',
                            },
                            { name: '', value: 100 - latestFEMetrics.performance, fill: '#ffffff' },
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
                                fontSize: '2rem', // Larger font size
                                fontWeight: 'bold'   // Bold text
                              }}
                            >
                              {latestFEMetrics.performance.toFixed(0)}
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
                              value: latestFEMetrics.bestpractices,
                              fill: '#ffeaad',
                            },
                            { name: '', value: 100 - latestFEMetrics.bestpractices, fill: '#ffffff' },
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
                                fontSize: '2rem', // Larger font size
                                fontWeight: 'bold'   // Bold text
                              }}
                            >
                              {latestFEMetrics.bestpractices.toFixed(0)}
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
                              value: latestFEMetrics.accessibility,
                              fill: '#ffeaad',
                            },
                            { name: '', value: 100 - latestFEMetrics.accessibility, fill: '#ffffff' },
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
                                fontSize: '2rem', // Larger font size
                                fontWeight: 'bold'   // Bold text
                              }}
                            >
                              {latestFEMetrics.accessibility.toFixed(0)}
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
                    <div className="score large-score">{Number(latestFEMetrics.timetointeractive).toFixed(0)}</div>
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
                    <div className="score large-score">{Number(latestFEMetrics.firstcontentfulpaint).toFixed(0)}</div>
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
                    <div className="score large-score">{Number(latestFEMetrics.speedindex).toFixed(0)}</div>
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
                    <div style={{ marginTop: '50px' }}> {/* Adjust the top margin here */}

                      <ResponsiveContainer height={225} width="100%" sx={{ mt: 2 }}>
                        {fEDataPresent && fEMetrics.length > 0 ? (
                          <LineChart data={formatData(fEMetrics)}>
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
                        ) : (
                          <div>
                            Run your first front end test!
                          </div>
                        )}
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
                    <div style={{ marginTop: '30px' }}> {/* Adjust the top margin here */}

                      <ResponsiveContainer height={225} width="100%" sx={{ mt: 2 }}>
                        {fEDataPresent && fEMetrics.length > 0 ? (
                          <LineChart data={formatData(fEMetrics)}>
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
                        ) : (
                          <div>
                            Run your first back end test!
                          </div>
                        )}
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
                    <div style={{ marginTop: '20px' }}> {/* Adjust the top margin here */}

                      <ResponsiveContainer height={225} width="100%" sx={{ mt: 2 }}>
                        {fEDataPresent && fEMetrics.length > 0 ? (
                          <LineChart data={formatData(fEMetrics)}>
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
                        ) : (
                          <div>
                            Run your first back end test!
                          </div>
                        )}
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
                ><div className="header">Front End Metrics</div>
                  Run your first front end test!
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
