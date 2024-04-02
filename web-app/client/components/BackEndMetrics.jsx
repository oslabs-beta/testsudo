import React, { useState, useEffect } from 'react';
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

const BackEndMetrics = ({ projectIDState }) => {
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });
  };
  const formatData = (data) => {
    return data.map((entry) => ({
      ...entry,
      timestamp: formatTimestamp(entry.timestamp),
    }));
  };
  const [bEResponse, setBEResponse] = useState('');
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
    fetchBEMetrics();
  }, []);
  return (
    <div className="backend-container">
      <Paper
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          height: 275,
        }}
      >
        <div className="header">Request Duration and Response Time (ms)</div>
        <ResponsiveContainer height={225} width="100%">
          {bEDataPresent && bEMetrics.length > 0 ? (
            <LineChart data={formatData(bEMetrics)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" tick={{ fontSize: 12 }} />
              <YAxis yAxisId="left" />
              <Tooltip />
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
      <Paper
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          height: 275,
        }}
      >
        <div className="header">Request and Payload Size (bytes)</div>
        <ResponsiveContainer height={225} width="100%">
          {bEDataPresent && bEMetrics.length > 0 ? (
            <LineChart data={formatData(bEMetrics)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" tick={{ fontSize: 12 }} />
              <YAxis yAxisId="left" />
              <Tooltip />
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
    </div>
  );
};

export default BackEndMetrics;
