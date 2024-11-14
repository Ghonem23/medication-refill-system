import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles.css';

function MedicationList() {
  const [medications, setMedications] = useState([]);

  useEffect(() => {
    const fetchMedications = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8000/api/medications/', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMedications(response.data);
      } catch (error) {
        console.error('Error fetching medications:', error);
      }
    };
    fetchMedications();
  }, []);

  const handleRefillRequest = async (medicationId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:8000/api/refill-request/',
        { medication_id: medicationId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Refill request submitted successfully');
    } catch (error) {
      console.error('Error submitting refill request:', error);
    }
  };

  return (
    <div className="medication-list">
      <h2>Medication List</h2>
      {medications.map((medication) => (
        <div key={medication.id} className="medication-item">
          <p>{medication.name} - {medication.description}</p>
          <button
            className="request-refill-btn"
            onClick={() => handleRefillRequest(medication.id)}
          >
            Request Refill
          </button>
        </div>
      ))}
    </div>
  );
}

export default MedicationList;