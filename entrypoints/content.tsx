import ReactDOM from "react-dom/client";
import App from "./components/App";
import '../assets/index.css';

// Define types for the context and UI creation functions
interface ContentScriptContext {
  [key: string]: any;
}

interface ShadowRootUi {
  name: string;
  position: "inline" | "overlay";
  anchor: HTMLElement;
  append: "first" | "last";
  onMount: (container: HTMLElement) => { root: ReactDOM.Root; wrapper: HTMLElement };
  onRemove: (elements: { root: ReactDOM.Root; wrapper: HTMLElement }) => void;
}

export default defineContentScript({
  matches: ["http://127.0.0.1:5500/index.html", "https://www.linkedin.com/*"],
  cssInjectionMode: "ui",
  async main(ctx) {
    const processedElements = new Set<HTMLElement>(); // Track already processed elements

    const processElement = async (targetElement: HTMLElement) => {
      // Skip elements that are already processed
      if (processedElements.has(targetElement)) return;
      processedElements.add(targetElement); // Mark this element as processed

      const ui = await createShadowRootUi(ctx, {
        name: "wxt-react-example",
        position: "inline",
        anchor: targetElement,
        append: "first",
        onMount: (container: HTMLElement) => {
          // Create a wrapper div for React and append to the container
          const wrapper = document.createElement("div");
          container.append(wrapper);

          const root = ReactDOM.createRoot(wrapper);
          root.render(<App ele={targetElement} />);
          return { root, wrapper };
        },
        onRemove: (elements: { root: ReactDOM.Root; wrapper: HTMLElement }) => {
          elements?.root.unmount();
          elements?.wrapper.remove();
        },
      });

      ui.mount();
      processedElements.add(targetElement); // Mark this element as processed
    };

    // MutationObserver for dynamically added elements
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
          mutation.addedNodes.forEach((node) => {
            if (node instanceof HTMLElement) {
              const targetElements = node.querySelectorAll<HTMLElement>(".msg-form__message-texteditor");
              targetElements.forEach((targetElement) => {
                processElement(targetElement);
              });
            }
          });
        }
      }
    });

    // Start observing the document body for added nodes
    observer.observe(document.body, {
      childList: true,
      subtree: true, // Observe the entire DOM tree
    });

    // Uncomment if you'd like an interval to capture initially present elements
    // setInterval(() => {
    //   const targetElements = document.querySelectorAll<HTMLElement>(".msg-form__message-texteditor");
    //   targetElements.forEach((targetElement) => {
    //     processElement(targetElement);
    //   });
    // }, 500);
  },
});
