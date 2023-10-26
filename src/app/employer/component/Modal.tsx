import React from "react";

function DrivedModal({ isOpen, onClose, children }: any) {
  if (!isOpen) {
    return null; // Don't render the modal if it's not open
  }

  return (
    // <div className="items-center justify-center bg-opacity-50 w-full ">
    <div className=" modal flex justify-center fixed z-50 top-0 left-0 flex  bg-white rounded-lg  w-full h-screen bg-opacity-50  ">
      <div className="bg-white w-1/2  shadow-md  ">
        <button
          className="  text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          close
        </button>
        {children}
      </div>
    </div>
  );
}

export default DrivedModal;
