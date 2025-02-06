import React, { useState, useEffect } from 'react';
import transaction from './product.json';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';

const ChartComponent = () => {
  const [selectedMonth, setSelectedMonth] = useState('All');
  const [chartData, setChartData] = useState([]);
  const [selectedChart, setSelectedChart] = useState('All Charts'); // Default to show all charts
  const data = transaction;

  const priceRanges = [
    { range: '0-100', min: 0, max: 100 },
    { range: '101-200', min: 101, max: 200 },
    { range: '201-300', min: 201, max: 300 },
    { range: '301-400', min: 301, max: 400 },
    { range: '401-500', min: 401, max: 500 },
    { range: '501-600', min: 501, max: 600 },
    { range: '601-700', min: 601, max: 700 },
    { range: '701-800', min: 701, max: 800 },
    { range: '801-900', min: 801, max: 900 },
    { range: '901-above', min: 901, max: Infinity },
  ];

  useEffect(() => {
    const calculateChartData = () => {
      const filteredData = selectedMonth === 'All'
        ? data
        : data.filter((item) => {
            const saleDate = new Date(item.dateOfSale);
            const saleMonth = saleDate.toLocaleString('default', { month: 'long' });
            return saleMonth === selectedMonth;
          });

      const rangeCounts = priceRanges.map((range) => {
        const count = filteredData.filter(
          (item) => item.price >= range.min && item.price <= range.max
        ).length;
        return { range: range.range, count };
      });

      setChartData(rangeCounts);
    };

    calculateChartData();
  }, [selectedMonth, data]);

  const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF4563', '#7D3C98', '#3498DB', '#F39C12', '#2ECC71', '#E74C3C'];

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Sales Data - {selectedMonth}</h2>

      {/* Navigation Bar */}
      <div className="flex space-x-4 mb-4">
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All </option>
          {Array.from({ length: 12 }, (_, i) => {
            const month = new Date(0, i).toLocaleString('default', { month: 'long' });
            return (
              <option key={month} value={month}>
                {month}
              </option>
            );
          })}
        </select>

        <select
          value={selectedChart}
          onChange={(e) => setSelectedChart(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="All Charts">All Charts</option>
          <option value="Bar Chart">Bar Chart</option>
          <option value="Pie Chart">Pie Chart</option>
          <option value="Line Chart">Line Chart</option>
        </select>
      </div>

      {/* Conditionally Render Charts */}
      {(selectedChart === 'Bar Chart' || selectedChart === 'All Charts') && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2">Bar Chart</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {(selectedChart === 'Pie Chart' || selectedChart === 'All Charts') && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2">Pie Chart</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={chartData} dataKey="count" nameKey="range" cx="50%" cy="50%" outerRadius={100}>
                {chartData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      {(selectedChart === 'Line Chart' || selectedChart === 'All Charts') && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2">Line Chart</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default ChartComponent;
