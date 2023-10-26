import React, { useState, useEffect } from "react";
import { FaThumbsUp } from "react-icons/fa";

interface ThankYouModalProps {
  isVisible: boolean;
  onClose: () => void;
  content: string;
}

export default function ThankYouModal({
  isVisible,
  onClose,
  content,
}: ThankYouModalProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isVisible, onClose]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="modal w-full h-screen flex justify-center items-center bg-opacity-80 bg-gray-200">
      <div className="modal-content">
        <div className="   flex flex-col justify-center items-center bg-white rounded-lg border-2 ">
          <p className="text-xl text-capitalize px-32 py-16 text-orange-400 flex flex-col  justify-center items-center my-2">
            <FaThumbsUp className="  text-orange-400 text-6xl animate-bounce" />{" "}
            {content}
          </p>
        </div>
      </div>
    </div>
  );
}
