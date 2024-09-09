"use client";

import styles from './chart.module.css';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', borrowed: 30 },
  { name: 'Feb', borrowed: 20 },
  { name: 'Mar', borrowed: 27 },
  { name: 'Apr', borrowed: 18 },
  { name: 'May', borrowed: 23 },
  { name: 'Jun', borrowed: 34 },
];

const Chart = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Borrowing Trends</h2>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip contentStyle={{ background: "#151c2c", border: "none" }} />
          <Legend />
          <Line
            type="monotone"
            dataKey="borrowed"
            stroke="#8884d8"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
