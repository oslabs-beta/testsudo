import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const SecurityPieChart = ({ securityData, handleClick }) => {
  
  const calculateSeverityCount = () => {
    console.log('tis is props data ->', securityData);
    if (!securityData) return {}; // 

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
  ].filter((item) => item.value !== 0); 

  const COLORS = {
    CRITICAL: '#FF0000',
    HIGH: '#FF6347',
    MEDIUM: '#FFA500',
    LOW: '#F7CA18',
    WARNING: '#339900',
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
          fill={COLORS[data[index].name]}
          textAnchor={x > cx ? 'start' : 'end'}
          dominantBaseline='central'
          style={{
            fontSize: '16px', 
            fontWeight: 'bold',
          }}
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
          outerRadius={125}
          fill='#8884d8'
          dataKey='value'
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[data[index].name]} onClick={() => handleClick(data[index].name)}/>
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default SecurityPieChart;
