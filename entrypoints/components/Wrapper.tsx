import React, { useState } from 'react';
import ModelCard from './Modal'; // Import your Model component

interface WrapperProps {
  // Define any props you want to pass to the Wrapper component
}

const Wrapper: React.FC<WrapperProps> = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModel = () => {
    setIsOpen(!isOpen);
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  return (
    <div>
      <button onClick={toggleModel} className='absolute bottom-0'>Show Model</button>
      {isOpen && (
        <div
          className="overlay"
          onClick={(e) => handleOverlayClick(e)}
          style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            backgroundColor: 'rgba(0, 0, 0, 0.5)' 
          }}
        >
          <ModelCard />
          <button onClick={toggleModel} className="close-button">
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default Wrapper;
