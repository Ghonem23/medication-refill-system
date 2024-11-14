import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Dashboard() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchRefillStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8000/api/refill-stats/', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const labels = response.data.map(stat => stat.medication__name);
        const data = response.data.map(stat => stat.total);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Total Refills per Medication',
              data,
              backgroundColor: 'rgba(54, 162, 235, 0.5)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 2,
              borderRadius: 5,
              barThickness: 50,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching refill stats:', error);
      }
    };

    fetchRefillStats();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Refill Requests by Medication',
        font: {
          size: 20,
        },
        color: '#333',
      },
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#333',
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0,0,0,0.7)',
        titleFont: {
          size: 16,
        },
        bodyFont: {
          size: 14,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Medications',
          color: '#333',
          font: {
            size: 16,
          },
        },
        ticks: {
          color: '#666',
          font: {
            size: 14,
          },
        },
      },
      y: {
        title: {
          display: true,
          text: 'Refill Count',
          color: '#333',
          font: {
            size: 16,
          },
        },
        ticks: {
          stepSize: 1,
          color: '#666',
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return (
    <div className="dashboard" style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '20px' }}>Refill Statistics</h2>
      {chartData ? (
        <Bar data={chartData} options={options} />
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}

export default Dashboard;