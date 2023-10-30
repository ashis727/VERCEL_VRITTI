import CardPrototype from "@/components/ui/CardPrototype";
import React, { useState } from "react";

const FAQAccordion = ({ faqData }: any) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index: any) => {
    if (index === activeIndex) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <CardPrototype>
      <div className="w-full">
        <h1 className="text-3xl font-[500] px-4 mb-4  text-gray-800 ">
          Frequently asked questions
        </h1>
        {faqData.map((item: any, index: any) => (
          <div key={index} className="border-b border-gray-200 ">
            <div
              onClick={() => toggleAccordion(index)}
              className="flex justify-between items-center cursor-pointer py-2 px-4 transition  duration-500 ease-in-out"
            >
              <h2 className="text-lg text-gray-600">{item.question}</h2>
              <span
                className={
                  activeIndex === index
                    ? "transform rotate-180"
                    : "transform rotate-0"
                }
              >
                &#x25BE;
              </span>
            </div>
            <div
              className={`px-4 text-gray-500  py-2 ${
                activeIndex === index
                  ? "max-h-80 opacity-100"
                  : "max-h-0 opacity-0 overflow-hidden"
              } transition-max-h  duration-500 ease-in-out`}
            >
              <p>{item.answer}</p>
            </div>
            <hr />
          </div>
        ))}
      </div>
    </CardPrototype>
  );
};

export default FAQAccordion;
