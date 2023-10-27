import Image from "next/image";
import React, { useEffect } from "react";
import { BiCalendar, BiFolder, BiPen } from "react-icons/bi";
interface items {
  title: string;
  createdOn: string;
  content: string;
  category: string;
  src?: string;
  author_name?: string;
}
export default function BlogCard({
  title,
  createdOn,
  content,
  category,
  src,
  author_name,
}: items) {
  return (
    // <div className=" w-[62%]  h-44 p-4 flex items-starts bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    //   <a href="#">
    //     <Image
    //       className="rounded-lg w-36  h-36 "
    //       src={require("../../../../public/1.png")}
    //       alt="img"
    //       width={220}
    //       height={220}
    //       objectFit="cover"
    //     />
    //   </a>
    //   <div className=" px-4">
    //     <a href="#">
    //       <h5 className="mb-2 font-serif text-xl  font-[300] tracking-wide  text-gray-900 dark:text-white">
    //         Noteworthy technology acquisitions 2021
    //       </h5>
    //     </a>
    //     <span className="text-gray-400  flex text-xs items-center gap-2 ">
    //       {" "}
    //       <BiCalendar /> 22/12/2020 <BiFolder /> Travel
    //     </span>
    //     <p className="my-3 leading-6   w-96 text-[14px]  font-[200] text-gray-500 dark:text-gray-400">
    //       Here are the biggest enterprise technology acquisitions of 2021 so
    //       far, in reverse chronological order.{" "}
    //       <a
    //         href="#"
    //         className="inline-flex text-blue-400  hover:cursor-pointer hover:text-gray-600 items-center  text-sm font-medium text-center  rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    //       >
    //         Read more
    //       </a>
    //     </p>
    //   </div>
    // </div>

    <div className="w-full mb-2 h-44 p-4 flex items-starts bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <Image
          className="rounded-lg w-36 h-36"
          src={`${src}`}
          alt="img"
          width={220}
          height={220}
        />
      </a>
      <div className="px-4">
        <a href="#">
          <h5 className="mb-2 font-serif text-xl font-[300] tracking-wide text-gray-900 dark:text-white">
            {title}
          </h5>
        </a>
        <span className="text-gray-400 flex text-xs items-center gap-2">
          <BiCalendar /> {createdOn.substring(0, 10)} <BiFolder /> {category}
        </span>
        <p className="  line-clamp-2 my-3 leading-6 w-96 text-[14px] font-[200] text-gray-500 dark:text-gray-400">
          {content}
        </p>
        <div className="flex justify-between mr-5  text-blue-400">
          <a
            href="#"
            className="inline-flex hover:cursor-pointer hover:text-gray-600 items-center text-sm font-medium text-center rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Read more
          </a>
          <span className="flex items-center gap-2 text-sm">
            <BiPen /> {author_name}
          </span>
        </div>
      </div>
    </div>
  );
}
