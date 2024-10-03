import React, { useEffect, useRef, useState } from 'react';
import ChatInterface from './Component2';
import WriiterIcon from '../../assets/WriterIcon.svg';
import '../../assets/index.css';

// Define props type for App component
interface AppProps {
  ele: HTMLElement;
}

const App: React.FC<AppProps> = ({ ele }) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Backspace') {
      event.stopPropagation();
    }
  };

  return (
    <div className='absolute right-[5.5rem] bottom-[1.5rem] z-50' onKeyDown={handleKeyDown}>
      <Gen ele={ele} />
    </div>
  );
}

export default App;

// Define props type for Gen component
interface GenProps {
  ele: HTMLElement;
}

const Gen: React.FC<GenProps> = ({ ele }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showGen, setShowGen] = useState<boolean>(false);
  const targetElementRef = useRef<HTMLElement | null>(null); // Create a ref for the target element

  const show = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    targetElementRef.current = ele.querySelector(".msg-form__contenteditable") as HTMLElement;
    const targetElement = targetElementRef.current;

    if (targetElement) {
      // Check if the target element is focused initially
      setShowGen(document.activeElement === targetElement);
      const handleFocus = () => {
        setTimeout(() => {
          setShowGen(true);
        }, 100); // waits 100ms
      };

      const handleBlur = () => {
        setTimeout(() => {
          setShowGen(false);
        }, 500); // waits 500ms
      };

      // Add focus and blur listeners
      targetElement.addEventListener('focus', handleFocus);
      targetElement.addEventListener('blur', handleBlur);

      // Clean up event listeners on component unmount
      return () => {
        targetElement.removeEventListener('focus', handleFocus);
        targetElement.removeEventListener('blur', handleBlur);
      };
    }
  }, [ele]); // Include ele in the dependency array

  return (
    <>
      {showGen && (
        <div
          className="flex items-center w-8 h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 justify-center bg-white shadow-sm rounded-full p-2 sm:p-2"
          onClick={show}
        >
          <img src={WriiterIcon} alt="pop" className="w-full h-full object-contain" />
        </div>
      )}

      {showModal && <Modal closeModal={show} />}
    </>
  );
};

// Define props type for Modal component
interface ModalProps {
  closeModal: () => void;
}

export const Modal: React.FC<ModalProps> = ({ closeModal }) => {
  useEffect(() => {
    // Disable scrolling on the body when the modal is open
    document.body.style.overflow = 'hidden';
    
    return () => {
      // Re-enable scrolling when the modal is closed
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 w-[100vw] h-[100vh] flex items-center justify-center z-[99999] bg-black/10 backdrop-blur-[1px] select-none overscroll-none"
      onClick={closeModal} // Clicking the background closes the modal
    >
      <div
        className="w-[500px] relative"
        onClick={(e) => e.stopPropagation()} // Prevent modal content click from closing the modal
      >
        <ChatInterface closeModal={closeModal} />
      </div>
    </div>
  );
};
