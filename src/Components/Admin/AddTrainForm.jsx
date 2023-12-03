import React, { useState } from 'react';

const AddTrainForm = ({ setShowAddTrain }) => {
  const [trainData, setTrainData] = useState({
    trainName: '',
    routes: [],
    departureTime: '',
    startingPoint: '',
    endingPoint: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('routes.')) {
      const [field, index, subfield] = name.split('.');
      setTrainData((prevData) => {
        const newRoutes = [...prevData.routes];
        newRoutes[index] = { ...newRoutes[index], [subfield]: value };
        return { ...prevData, routes: newRoutes };
      });
    } else {
      setTrainData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const addRoute = () => {
    setTrainData((prevData) => ({
      ...prevData,
      routes: [...prevData.routes, { stationName: '', arrivalTime: '', departureTime: '', ticketPrice: '' }],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to the server endpoint with train data
      const response = await fetch('http://localhost:5000/add-train', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(trainData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Close the form after submitting
      setShowAddTrain(false);
      alert('Train added successfully');
    } catch (error) {
      console.error('Error adding train:', error.message);
      // Handle error (e.g., display an error message to the user)
    }
  };

  return (
    <div className="add-train-form">
      <h2>Add Train</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Train Name:
          <input type="text" name="trainName" value={trainData.trainName} onChange={handleChange} required />
        </label>
        <label>
          Departure Time:
          <input type="datetime-local" name="departureTime" value={trainData.departureTime} onChange={handleChange} required />
        </label>
        <label>
          Starting Point:
          <input type="text" name="startingPoint" value={trainData.startingPoint} onChange={handleChange} required />
        </label>
        <label>
          Ending Point:
          <input type="text" name="endingPoint" value={trainData.endingPoint} onChange={handleChange} required />
        </label>
        {trainData.routes.map((route, index) => (
          <div key={index}>
            <label>
              Station Name:
              <input
                type="text"
                name={`routes.${index}.stationName`}
                value={route.stationName}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Arrival Time:
              <input
                type="datetime-local"
                name={`routes.${index}.arrivalTime`}
                value={route.arrivalTime}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Departure Time (for a station):
              <input
                type="datetime-local"
                name={`routes.${index}.departureTime`}
                value={route.departureTime}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Ticket Price:
              <input
                type="number"
                name={`routes.${index}.ticketPrice`}
                value={route.ticketPrice}
                onChange={handleChange}
                required
              />
            </label>
          </div>
        ))}
        <button type="button" onClick={addRoute}>
          Add Station
        </button>
        <button type="submit">Add Train</button>
      </form>
    </div>
  );
};

export default AddTrainForm;
