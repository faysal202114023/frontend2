import React, { useState } from 'react';

const TrainList = ({ trainData }) => {
  const [deletedTrainId, setDeletedTrainId] = useState(null);

  const handleDeleteTrain = async (trainId) => {
    try {
      const response = await fetch(`http://localhost:5000/delete-train/${trainId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Train deleted successfully');
        // Optionally, you can update your train data or perform any necessary actions
        setDeletedTrainId(trainId);
      } else {
        alert('Failed to delete train');
      }
    } catch (error) {
      console.error('Error deleting train:', error.message);
      alert('An error occurred while deleting the train');
    }
  };

  return (
    <div className='train-list'>
      <h2>Train List</h2>
      <table>
        <thead>
          <tr>
            <th>Train Name</th>
            <th>Starting Point</th>
            <th>Ending Point</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {trainData.map((train) => (
            <tr key={train._id}>
              <td>{train.trainName}</td>
              <td>{train.startingPoint}</td>
              <td>{train.endingPoint}</td>
              <td>
                <button className="delete-button"  onClick={() => handleDeleteTrain(train._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TrainList;
