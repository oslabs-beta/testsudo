import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const SecurityPieChart = ({ securityData }) => {
  const calculateSeverityCount = () => {
    console.log('tis is props data ->', securityData);
    if (!securityData) return {}; // Check if securityData is defined

    const severityCount = {
      CRITICAL: 0,
      HIGH: 0,
      MEDIUM: 0,
      LOW: 0,
      WARNING: 0,
    };

    securityData.forEach((item) => {
      const { severity } = item;
      if (severity === 'CRITICAL') {
        severityCount.CRITICAL++;
      } else if (severity === 'HIGH') {
        severityCount.HIGH++;
      } else if (severity === 'MEDIUM') {
        severityCount.MEDIUM++;
      } else if (severity === 'LOW') {
        severityCount.LOW++;
      } else if (severity === 'WARNING') {
        severityCount.WARNING++;
      }
    });

    return severityCount;
  };

  const severityCount = calculateSeverityCount();

  const data = [
    { name: 'CRITICAL', value: severityCount.CRITICAL },
    { name: 'HIGH', value: severityCount.HIGH },
    { name: 'MEDIUM', value: severityCount.MEDIUM },
    { name: 'LOW', value: severityCount.LOW },
    { name: 'WARNING', value: severityCount.WARNING },
  ].filter((item) => item.value !== 0); // Remove items with value 0

  //   const COLORS = ['#8B0000', '#FF0000', '#FFA500', '#FFFF00', '#0000FF'];
  const COLORS = {
    CRITICAL: '#8B0000',
    HIGH: '#FF0000',
    MEDIUM: '#FFA500',
    LOW: '#FFFF00',
    WARNING: '#0000FF',
  };

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + (outerRadius + 10) * Math.cos(-midAngle * RADIAN);
    const y = cy + (outerRadius + 10) * Math.sin(-midAngle * RADIAN);

    if (data[index].value !== 0) {
      return (
        <text
          x={x}
          y={y}
          fill='red'
          textAnchor={x > cx ? 'start' : 'end'}
          dominantBaseline='central'
        >
          {`${data[index].name} (${data[index].value})`}
        </text>
      );
    } else {
      return null; // Return null if the value is 0
    }
  };

  return (
    <ResponsiveContainer width='100%' height='100%'>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx='50%'
          cy='50%'
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill='#8884d8'
          dataKey='value'
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[data[index].name]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default SecurityPieChart;
