import React, { useState } from 'react';
import send from "../../assets/send.png"
const ModelCard = () => {
  const [inputValue, setInputValue] = useState('');

  return (
    <div className="bg-white rounded-lg shadow-md p-4 max-w-md mx-auto">
      <div className="mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Reply thanking for the opportunity"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex justify-end">
        <button 
          className="bg-blue-500 text-white px-4 py-2 text-sm rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center"
        >
          Generate
          <img src={send} alt="Send" className="ml-2 h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default ModelCard;