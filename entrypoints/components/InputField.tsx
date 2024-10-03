import React from "react";

interface InputFieldProps {}

const InputField: React.FC<InputFieldProps> = () => {
  return (
    <div className="flex gap-1 justify-center w-full font-medium text-gray-500 rounded-xl shadow-sm min-h-[61px]">
      <div className="overflow-hidden flex-1 shrink px-4 py-5 w-full bg-white rounded-lg border border-solid border-neutral-300 min-w-[240px] max-md:pr-5 max-md:max-w-full">
        <label htmlFor="replyInput" className="sr-only">Reply thanking for the opportunity</label>
        <input
          id="replyInput"
          type="text"
          className="w-full bg-transparent border-none outline-none"
          placeholder="Reply thanking for the opportunity"
          aria-label="Reply thanking for the opportunity"
        />
      </div>
    </div>
  );
};

export default InputField;