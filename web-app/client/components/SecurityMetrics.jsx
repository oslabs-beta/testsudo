import React, { useState, useEffect, PureComponent } from 'react';
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
  Cell,
} from 'recharts';
import constructionIcon from '../assets/contructionIcon.png';
import SecurityPieChart from './SecurityPieChart';

const SecurityMetrics = ({ projectIDState }) => {
  const [securityData, setSecurityData] = useState([]);
  const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ];
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const fetchSecurityMetrics = () => {
    fetch(`http://localhost:3001/api/security/get-report/${projectIDState}`)
      .then((res) => res.json())
      .then((responseData) => {
        const data = responseData.data || [];
        // console.log(data);
        setSecurityData(data);
      })
      .catch((err) => {
        console.log('error in fetching Security data');
      });
  };

  useEffect(() => {
    fetchSecurityMetrics();
  }, []);

  return (
    <div className='component-container'>
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
          <SecurityPieChart securityData={securityData} />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {/* Coming Soon! <br />
            <img
              className='PUC-icon'
              src={constructionIcon}
              alt=''
              style={{
                width: 'auto',
                height: 'auto',
                display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            /> */}
            /{' '}
            {securityData.map((item) => (
              <li key={item._id}>
                {/* Render each security scan item */}
                <p>Risk: {item.severity}</p>
                <p>CWE ID: {item.cwe_id}</p>
                <p>Title: {item.title}</p>
                <p>Description: {item.description}</p>
                <p>
                  Location: {item.filename}: {item.line_number}
                </p>

                {/* Render other details as needed */}
              </li>
            ))}
          </div>
        </Paper>
      </Grid>
    </div>
  );
};
export default SecurityMetrics;
