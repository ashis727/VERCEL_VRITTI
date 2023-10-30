import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import { CiClock1 } from "react-icons/ci";

export default function NotificationCard(props: any) {
  const { title, subTitle, description, time } = props;
  const [show, setShow] = useState(false);
  return (
    <div className="flex gap-2 hover:cursor-pointer items-center">
      <div
        className="px-5 relative top-0 right-0"
        // onMouseEnter={() => setShow(!show)}
        // onMouseLeave={() => setShow(!show)}
      >
        {/* {show && <span className="text-[9px]  absolute top-3  ">Remove</span>} */}

        <CgClose className="text-gray-400 rounded-md bg-gray-200 p-[2px]" />
      </div>
      <div className="w-[70%]">
        <h1 className=" text-sm text-gray-600 rounded-md px-2  w-fit capitalize ">
          {title}
        </h1>
        {/* <h2 className="text-xs text-gray-600">{subTitle}</h2>
        <h2 className="text-xs text-gray-400 my-1">{description}</h2>
        <button className="text-xs text-red-600">Go to</button> */}
      </div>
      <div>
        <span className="text-gray-400  flex items-center text-xs ga-1  ">
          <CiClock1 className=" text-gray-600 mr-1" />
          {time}
          {/* 27 Dec 2020 @ 00:00hours */}
        </span>
      </div>
    </div>
  );
}
