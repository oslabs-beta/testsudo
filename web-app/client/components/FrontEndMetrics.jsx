import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
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
                <span className="tooltip-value">{Math.round(entry.value,2)}</span>
                <span>{` - ${fEName(entry.name)}`}</span></p>
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
                  <span>{` - ${fEName(entry.name)}`}</span></p>
              </div>
              ))}
          </div>
        );
      }
      return null;
    };

  return (
    <div className="frontend-metrics-page">
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
          <Grid container spacing={1}>
          {fEDataPresent && fEMetrics.length > 0 ? (
            <>
            <Grid item xs={12} md={8} lg={6}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 275,
                }}
              >
                <div className="header">Front End Metrics</div>
                <ResponsiveContainer height={225} width="100%">
                 
                    <LineChart data={formatData(fEMetrics)}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="timestamp" tick={{ fontSize: 12 }} />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip content={<CustomTooltip />} wrapperStyle={{ top: 220, left: 25 }}/>
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="cumulativelayoutshift"
                        name="Cumulative Layout Shift"
                        stroke="#8884d8"
                        yAxisId="right"
                      />
                      <Line
                        type="monotone"
                        dataKey="firstcontentfulpaint"
                        name="First Contentful Paint"
                        stroke="#82ca9d"
                        yAxisId="left"
                      />
                      <Line
                        type="monotone"
                        dataKey="largestcontentfulpaint"
                        name="Largest Contentful Paint"
                        stroke="#ffc658"
                        yAxisId="left"
                      />
                      <Line
                        type="monotone"
                        dataKey="performance"
                        name="Performance"
                        stroke="#ff7300"
                        yAxisId="left"
                      />
                      <Line
                        type="monotone"
                        dataKey="speedindex"
                        name="Speed Index"
                        stroke="#a83232"
                        yAxisId="left"
                      />
                      <Line
                        type="monotone"
                        dataKey="totalblockingtime"
                        name="Total Blocking Time"
                        stroke="#003459"
                        yAxisId="left"
                      />
                    </LineChart>
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
                <div className="header">Overall Front End Performance</div>
                <div className="score"> {latestFEMetrics.performance}</div>
                <ResponsiveContainer width="100%" height="120%">
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
                      dataKey="value"
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                    />
                    <Tooltip content={<CustomTooltipPie />} wrapperStyle={{ top: 120}} />
                  </PieChart>
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
