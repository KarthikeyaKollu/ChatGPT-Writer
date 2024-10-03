import React from "react";

interface GenerateButtonProps {}

const GenerateButton: React.FC<GenerateButtonProps> = () => {
  return (
    <button className="flex overflow-hidden gap-2.5 justify-center items-center px-6 py-3 mt-7 font-semibold text-white whitespace-nowrap bg-blue-500 rounded-lg max-md:px-5">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/7400e425f5cafe9ec2e1f73278ac8b6791d64a459ab64a9bf8e6acf1b4a8e23b?placeholderIfAbsent=true&apiKey=f2d14c769b6a48f2ba2970465effeadd"
        className="object-contain shrink-0 self-stretch my-auto w-6 aspect-[1.04]"
        alt=""
      />
      <span className="self-stretch my-auto">Generate</span>
    </button>
  );
};

export default GenerateButton;