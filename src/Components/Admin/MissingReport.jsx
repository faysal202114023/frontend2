// MissingReport.jsx

import React from 'react';
import axios from 'axios';
import './MissingReport.css'; // Import the CSS file

const MissingReport = ({ missingReportData, onDeleteReport }) => {
  const handleDelete = async (reportId) => {
    try {
      // Make an API call to delete the report
      const response = await axios.delete(`http://localhost:5000/delete-report/${reportId}`);
      
      // Check if the deletion was successful
      if (response.status === 200) {
        // Call the onDeleteReport callback to update the state in the parent component
        onDeleteReport(reportId);
        console.log('Report deleted successfully');
      } else {
        console.error('Failed to delete report:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting report:', error);
    }
  };

  return (
    <div className="missing-report-container">
      <h2>Missing Person Reports</h2>
      <ul className="report-list">
        {missingReportData.map((report) => (
          <li key={report._id} className="report-item">
            <p><strong>Reporter Name:</strong> {report.reporterName}</p>
            <p><strong>Missing Person Name:</strong> {report.missingPersonName}</p>
            {report.photos.map((photo, index) => (
              <div key={index} className="photo-container">
                <p><strong>Image Data:</strong></p>
                <img
                  src={`data:${photo.contentType};base64,${arrayBufferToBase64(photo.data.data)}`}
                  alt={`Missing Person ${index + 1}`}
                  className="report-image"
                />
              </div>
            ))}
            <button onClick={() => handleDelete(report._id)} className="delete-button">
              Delete Report
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Function to convert ArrayBuffer to base64
function arrayBufferToBase64(buffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export default MissingReport;
