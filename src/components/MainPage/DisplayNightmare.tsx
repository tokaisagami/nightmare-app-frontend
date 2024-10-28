import React from 'react';
import { useLocation } from 'react-router-dom';

const DisplayNightmare: React.FC = () => {
  const location = useLocation();
  const { modified_description, description, ending_category } = location.state;

  return (
    <div className="flex flex-col justify-center items-center mt-8">
      <div className="bg-green-100 shadow-lg p-6 rounded-lg w-[95%] mx-auto border border-gray-300">
        <h1 className="text-2xl font-bold mb-4">改変された悪夢内容</h1>
        <p className="whitespace-pre-wrap">{modified_description}</p>
      </div>
    </div>
  );
};

export default DisplayNightmare;
