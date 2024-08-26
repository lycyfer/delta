import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import axios from 'axios';
import './App.css';

const App = () => {
  const [data, setData] = useState(null);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Имитируем получение данных с бэкенда
    const fetchData = async () => {
      const response = await axios.get('/api/data.json');
      setData(response.data);
      setChartData(response.data.metrics.map(m => m.today));
    };

    fetchData();
  }, []);

  const handleRowClick = (index) => {
    setChartData([data.metrics[index].today]);
  };

  return (
    <div className="App">
      <h1>Финансовый Дашборд</h1>
      {data && (
        <table>
          <thead>
            <tr>
              <th>Показатель</th>
              <th>Текущий день</th>
              <th>Вчера</th>
              <th>Этот день недели</th>
            </tr>
          </thead>
          <tbody>
            {data.metrics.map((metric, index) => (
              <tr key={index} onClick={() => handleRowClick(index)}>
                <td>{metric.label}</td>
                <td>{metric.today}</td>
                <td>{metric.yesterday}</td>
                <td>{metric.week}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {chartData.length > 0 && (
        <HighchartsReact
          highcharts={Highcharts}
          options={{
            title: { text: 'График показателей' },
            series: [{ data: chartData }],
            xAxis: { categories: data.metrics.map(m => m.label) },
          }}
        />
      )}
    </div>
  );
};

export default App;
