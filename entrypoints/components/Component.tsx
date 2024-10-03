import * as React from 'react';
import { useState } from 'react';
import regen from "../../assets/regen.png"
import send from "../../assets/send.png";
import insert from "../../assets.png"

interface Message {
  type: "user" | "ai";
  content: string;
}

interface ComponentProps {
}

export default function Component(props: ComponentProps) {
  const [inputText, setInputText] = useState("");
  const [conversation, setConversation] = useState<Message[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleGenerateClick = () => {
    if (inputText.trim() === "") {
      return;
    }

    const newConversation = [...conversation];
    newConversation.push({ type: "user", content: inputText });
    newConversation.push({ type: "ai", content: getAIResponse(inputText) });
    setConversation(newConversation);
    setInputText("");
  };

  const getAIResponse = (userMessage: string): string => {
    return `Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.`;
  };

  return (
    <div className="max-w-full bg-white rounded-xl shadow-lg p-2 flex flex-col justify-between">
      <div className="w-full bg-gray-100 rounded-lg p-1">
        <input
          type="text"
          placeholder="Your prompt"
          className="w-full px-2 py-2 text-sm text-gray-700 placeholder-gray-400 bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={inputText}
          onChange={handleInputChange}
        />
      </div>
      
      <div className="flex justify-end mt-2">
        <button
          className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
          onClick={handleGenerateClick}
        >
          Generate
          <img src={send} alt="" className="w-4 h-4 ml-1" />
        </button>
      </div>
      {conversation.map((message, index) => (
        <div key={index} className={message.type === "user" ? "flex justify-end" : "flex items-start"}>
          <div className={`bg-${message.type === "user" ? "white" : "blue-100"} rounded-lg p-3 max-w-[80%]`}>
            <p className={`text-${message.type === "user" ? "gray-500" : "gray-800"} text-sm`}>{message.content}</p>
          </div>
        </div>
      ))}





    </div>
  );
}

