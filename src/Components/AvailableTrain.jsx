import React from 'react';
import { useNavigate } from 'react-router-dom';

function AvailableTrain(props) {
  const { trainRoutes } = props;
  const navigate = useNavigate();

  const handleTrainClick = (train) => {
    // Handle the click event for the train here
    // You can navigate to the "sitDetails" page and pass data as props like this:
    // console.log(train.trainName,"ldsfk");
    navigate(`/sitDetails/${train._id}`);
  };

  return (
    <div className='bg-[url("/availableTrain.jpeg")] h-screen bg-cover opacity-80 flex flex-col justify-center items-center'>
      <div className="w-[30rem] h-auto rounded-xl text-white bg-slate-800 px-14 py-10">
        <div className=''>
          <h1 className='text-xl font-bold text-center pb-6'>Train Information</h1>
          <div className="train-list flex flex-col gap-4">
            {trainRoutes.map((train, index) => (
              <button key={index} onClick={() => handleTrainClick(train)}>
                {train.trainName}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AvailableTrain;
