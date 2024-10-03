// // import '../../assets/index.css';
// // import Modal from './Modal';
// // import Wrapper from './Wrapper';
// // import Component from "./Component";
import ChatInterface from './Component2';
// // import pop from '../../assets/pop.png';
// // import React, { useEffect, useState } from 'react';
// // import { createRoot } from 'react-dom/client'; // React 18+

// // const App: React.FC = () => {
// //   const [visibleContent, setVisibleContent] = useState<Map<number, boolean>>(new Map());

// //   const appendImage = () => {
// //     const addImage = (element: HTMLElement, i: number) => {
// //       if (element.getAttribute('data-img-added') === 'true') return;

// //       const parent = element.parentElement; // Get the parent element
// //       const img = document.createElement('img'); // Create an image element
// //       img.src = pop; // Replace with your image URL
// //       img.alt = "Description"; // Alt text for accessibility

// //       // Apply Tailwind CSS classes for styling
// //       img.className = "absolute bottom-0 right-0 m-0 p-2 w-12 h-12 bg-white bg-opacity-70 z-50 cursor-pointer"; 

// //       // Ensure the parent element has a relative position
// //       if (parent) {
// //         parent.classList.add("relative"); // Add relative positioning class
// //         parent.appendChild(img); // Append the new image to the parent element
// //       }

// //       // Mark this element to prevent adding another image later
// //       element.setAttribute('data-img-added', 'true');
// //       console.log("done adding image to element");

// //       img.addEventListener('click', () => {
// //         // Toggle content visibility on image click
// //         setVisibleContent(prev => {
// //           const newVisibleContent = new Map(prev);
// //           newVisibleContent.set(i, !newVisibleContent.get(i)); // Toggle the visibility for this index
// //           return newVisibleContent;
// //         });
// //       });
// //     };

// //     const intervalId = setInterval(() => {
// //       const elements = document.getElementsByClassName("msg-form__contenteditable");
// //       if (elements.length > 0) {
// //         Array.from(elements).forEach((element, i) => {
// //           addImage(element as HTMLElement, i);
// //         });
// //       }
// //     }, 100); // Check every 100ms
// //   };

// //   useEffect(() => {
// //     appendImage(); // Call the function after the component mounts
// //   }, []); // Empty dependency array ensures this runs only once after the initial render

// //   return (
// //     <div>
// //       <div>
// //         {Array.from(visibleContent.entries()).map(([index, isVisible]) => (
// //           isVisible && 
// //            <div className='absolute h-screen flex items-center justify-center w-screen'>



// //           <div className='w-[400px]'>
// //             <ChatInterface />
// //           </div>

// //       </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default App;



// // // {/* <div className=' h-screen flex items-center justify-center w-screen'>



// // //        <div className='w-[400px]'>
// // //          <ChatInterface />
// // //        </div>

// // //    </div> */}




// import { createRoot } from 'react-dom/client'; 
// import React, { useEffect } from 'react'; // React is required for JSX
// import pop from '../../assets/pop.png'; // Make sure the image path is correct

// const App = () => {

//   // Function to find the element and attach the React component
//   const find = () => {
//     const elements = document.querySelectorAll("p"); // Query for <p> tags
//     if (elements.length > 0) {
//       const targetElement = elements[0]; // Assuming you want the first <p>

//       // Create a div to render your React component inside
//       const genContainer = document.createElement('div');
//       targetElement.appendChild(genContainer); // Append the new div to the target element

//       // Create root and render your React component into the new div
//       const root = createRoot(genContainer);
//       root.render(<Gen />);
//     }
//   };

//   // Run the find function when the component mounts
//   useEffect(() => {
//     find(); // Call the function after the component mounts
//   }, []);

//   return (<></>); // Return an empty fragment as the component doesn't render anything itself
// };



// // Your React Component
// const Gen = () => {
//   return (
//     <div className="flex items-center justify-center size-[40px] bg-white shadow-md rounded-full" onClick={() => console.log("you just clicked it")}>
//       <img src={pop} alt="pop" className='' />
//     </div>
//   );
// };

// export default App;





import { createRoot } from 'react-dom/client';
import React, { useEffect } from 'react';
import pop from '../../assets/pop.png'; // Ensure the correct path

const App = () => {

  // Function to attach Gen component to all <p> tags that don't already have it
  const addGenToElements = () => {
    const elements = document.querySelectorAll("div"); // Query for all <p> tags
    elements.forEach((element) => {
      // Check if the element already has a genContainer
      if (!element.querySelector('.gen-container')) {
        // Create a div to render your React component inside
        const genContainer = document.createElement('div');
        genContainer.className = 'gen-container'; // Add a class to identify the container
        element.appendChild(genContainer); // Append the new div to the target element

        // Create root and render your React component into the new div
        const root = createRoot(genContainer);
        root.render(<Gen />);
      }
    });
  };

  // Use MutationObserver to detect dynamically added elements
  const observeDOMChanges = () => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          // Call the function to attach Gen component to new elements
          addGenToElements();
        }
      });
    });

    // Start observing the body for child node additions
    observer.observe(document.body, {
      childList: true, // Observe direct children
      subtree: true    // Observe entire subtree for added nodes
    });
  };

  // Run once when the component mounts
  useEffect(() => {
    addGenToElements(); // Add Gen component to existing <p> tags
    // observeDOMChanges(); // Set up observer for dynamically added <p> tags
  }, []);

  return (<>
   <ChatInterface/>
  </>); // Return an empty fragment as the component doesn't render anything itself
};

const Gen: React.FC = () => {
  return (
    <>
      <ChatInterface/>
    </>
  );
};

export default App;
