import Image from "next/image";
import React, { useEffect } from "react";
import { BiCalendar, BiFolder, BiPen } from "react-icons/bi";
import EditorJsonComponents from "./EditorJson";
interface items {
  item: any;
}
export default function BlogCard({ item }: items) {
  return (
    <div className="w-full mb-2 h-44 p-4 flex items-starts bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <Image
          className="rounded-lg w-36 h-36"
          src={item?.feature_image_url}
          alt="img"
          width={220}
          height={220}
        />
      </a>
      <div className="px-4">
        <a href="#">
          <h5 className="mb-2 font-serif text-xl font-[300] tracking-wide text-gray-900 dark:text-white capitalize">
            {item?.title}
          </h5>
        </a>
        <span className="text-gray-400 flex text-xs items-center gap-2">
          <BiCalendar /> {item?.created_at.substring(0, 10)} <BiFolder />{" "}
          {item?.category?.title}
        </span>
        <p className="  line-clamp-2 my-3 leading-6 w-96 text-[14px] font-[200] text-gray-500 dark:text-gray-400">
          {item?.short_description == null ? (
            "dummy test data here (Short discription)dummy test data here (Short discription)dummy test data here (Short discription)"
          ) : (
            <EditorJsonComponents
              jsonData={JSON.parse(item?.short_description)}
            />
          )}
        </p>
        <div className="flex gap-52   text-blue-400">
          <a
            href={`others/${item?.slug}`}
            className="inline-flex hover:cursor-pointer hover:text-gray-600 items-center text-sm font-medium text-center rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Read more
          </a>
          <span className="flex items-center gap-2 text-sm">
            <BiPen /> {item?.author_name}
          </span>
        </div>
      </div>
    </div>
  );
}
