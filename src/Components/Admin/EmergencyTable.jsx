// EmergencyTable.jsx
import React from 'react';
import axios from 'axios';

const EmergencyTable = ({ emergenciesData, onDeleteEmergency }) => {
  const handleDelete = async (emergencyId) => {
    try {
      // Send a request to delete the specific emergency
      await axios.delete(`http://localhost:5000/delete-emergency/${emergencyId}`);

      // Notify the parent component to update the emergenciesData
      onDeleteEmergency();
    } catch (error) {
      console.error('Error deleting emergency:', error.message);
    }
  };

  return (
    <div>
      <h2>Emergency Reports</h2>
      <table>
        <thead>
          <tr>
            <th>Emergency Type</th>
            <th>Additional Details</th>
            <th>Created At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {emergenciesData.map((emergency) => (
            <tr key={emergency._id}>
              <td>{emergency.emergencyType}</td>
              <td>{emergency.additionalDetails}</td>
              <td>{new Date(emergency.createdAt).toLocaleString()}</td>
              <td>
                <button className="delete-button" onClick={() => handleDelete(emergency._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmergencyTable;
