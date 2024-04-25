import React, { useState, useEffect, PureComponent } from 'react';
import {Box, Container, Grid, Paper} from '@mui/material/';
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
  BarChart, Bar
} from 'recharts';
import constructionIcon from '../assets/contructionIcon.png';
import SecurityPieChart from './SecurityPieChart';

const SecurityMetrics = ({ projectIDState }) => {
  const [securityData, setSecurityData] = useState([]);
  const [pieData, setPieData] = useState([]);
  let securityDataCopy = [...securityData];
  const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ];
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const handleClick = (entry) => {
    securityDataCopy = pieData.filter((item) => {
      const {severity} = item;
      return severity === entry;
    })
    setSecurityData(securityDataCopy);
    console.log(`You clicked on ${entry}`);
  }

  const fetchSecurityMetrics = () => {
    fetch(`http://localhost:3001/api/security/get-report/${projectIDState}`)
      .then((res) => res.json())
      .then((responseData) => {
        const data = responseData.data || [];
        // console.log(data);
        setSecurityData(data);
        setPieData(data);
      })
      .catch((err) => {
        console.log('error in fetching Security data');
      });
  };

  useEffect(() => {
    fetchSecurityMetrics();
  }, []);

  const titles = () => {
    return securityData.reduce((acc, curr) => {
      const title = curr.title;
      acc[title] = (acc[title] || 0) + 1;
      return acc;
    }, {});
  }
  
  const titleChart = Object.keys(titles()).map(title => ({  
      title,
      count: titles()[title]
    }));

  const uniqueData = {};
  const uniqueTitles = Array.from(new Set(securityData.map(item => item.title)));
    
  uniqueTitles.forEach(title => {
      const description = securityData.find(item => item.title === title).description;
      uniqueData[title] = description;
  });

  return (
    <div className='component-container'>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
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
              Security Metrics<br />
            </div>
            <SecurityPieChart securityData={pieData} handleClick={handleClick}/>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
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
              Security Vulnerabilities
            </div>
            <ResponsiveContainer width="100%" height={400} margin={{top: 20, right: 30, bottom: 20, left: 30 }}>
              <BarChart height={100} data={titleChart}>
                <Bar dataKey="count" fill="#e53170">
                  {titleChart.map((entry, index) => (
                    <Cell cursor="pointer" fill='#e53170' />
                  ))}
                </Bar>
                <YAxis tick={{ fontSize: 12 }} />
                <XAxis dataKey="title" type="category" angle="20" tick={{ fontSize: 12 }}/>
              </BarChart>
          </ResponsiveContainer>
          {/* <p className="content">
            {Object.keys(uniqueData).map((item, index) => (
            <div key={index}>
              <p>{item.title}</p>
              <p>{item.description}</p>
            </div>
          ))}
          </p> */}
        </ Paper>
        </Grid>
            <Grid item xs={12} md={4}>
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
              className='file-log'
            >
            {' '}
            <div className='header'>
              Location of Vulnerabilities<br />
            </div>
            {securityData.map((item) => (
              <div className="security" key={item._id}>
              <p>CWE ID: {item.cwe_id}</p>
              <p>Title: {item.title}</p>
              <p>File Location: {item.filename} Line Number: {item.line_number}</p><br/></div>
            ))}
            </Paper>
            </Grid>
          {/* </div> */}
      </Grid>
    </div>
  );
};

export default SecurityMetrics;
