"use client";
import CardPrototype from "@/components/ui/CardPrototype";
import React, { useEffect, useState } from "react";
import Title from "../component/Title";
import { FaNewspaper } from "react-icons/fa";
import Image from "next/image";
import { BiCalendar, BiFolder } from "react-icons/bi";
import BlogCard from "../component/BlogCard";
import ClientController from "@/controllers/employer";

export default function Page() {
  const Requirements = new ClientController();
  const blogData = [
    {
      title: "Blog Title 1",
      content:
        "This is the content of Blog 1 his is the content of Blog This is the content of Blog This is the content of Blog 2.",
      createdOn: "22/12/2020",
      category: "travel",
    },
    {
      title: "Blog Title 2",
      content:
        "This is the content of Blog This is the content of Blog This is the content of Blog 2",
      createdOn: "15/03/2021",
      category: "techno",
    },
    {
      title: "Blog Title 3",
      content:
        "This is the content of Blog This is the content of Blog This is the content of Blog 2",
      createdOn: "15/03/2021",
      category: "techno",
    },
    {
      title: "Blog Title 4",
      content:
        "This is the content of Blog This is the content of Blog This is the content of Blog 2",
      createdOn: "15/03/2021",
      category: "techno",
    },

    // Add more blog objects as needed
  ];
  const [data, setData] = useState<any>([]);
  const [blogcategories, setBlogCategories] = useState([]);

  const blogcategoriesData = async () => {
    try {
      const data = await Requirements.getBLogcategories();
      console.log("blog categories data", data.results);

      setBlogCategories(data.results);
      return data;
    } catch (error) {
      console.log("err ", error);
    }
  };
  const blogdata = async () => {
    try {
      const data = await Requirements.getBLogs();
      console.log("blog data", data.results);

      setData(data.results);
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    blogdata();
    blogcategoriesData();
  }, []);
  return (
    <div>
      <CardPrototype>
        <Title title="Blogs" icon={<FaNewspaper />} />
        <div className="flex  flex-wrap justify-between items-start py-4 px-6">
          <div className="w-[61%] ">
            {data.map((item: any, i: any) => (
              <div>
                <BlogCard
                  key={i}
                  title={item.title}
                  src={item.feature_image_url}
                  category={item.category?.title}
                  createdOn={item.created_at}
                  content={item.body}
                  author_name={item.author_name}
                />
              </div>
            ))}
          </div>
          <div className=" px-2 w-[36%]  h-[60vh]  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <h2 className="italic  font-serif  mt-4"> Categoies</h2>
            <ul className="space-y-2 overflow-y-scroll scrollbar-hide hover:cursor-pointer">
              <li className="flex justify-between items-center   ">
                {" "}
                <span className=" text-gray-800 text-sm italic  hover:text-gray-900 ">
                  Technology{" "}
                </span>{" "}
                <span className="text-gray-300 text-sm">(2)</span>
              </li>
              <hr />
              <li className="flex justify-between items-center   ">
                {" "}
                <span className=" text-gray-800 text-sm italic ">
                  Universities{" "}
                </span>{" "}
                <span className="text-gray-300 text-sm">(4)</span>
              </li>
              <hr />
              <li className="flex justify-between items-center   ">
                {" "}
                <span className=" text-gray-800 text-sm italic ">
                  Market{" "}
                </span>{" "}
                <span className="text-gray-300 text-sm">(1)</span>
              </li>
              <hr />

              <li className="flex justify-between items-center   ">
                {" "}
                <span className=" text-gray-800 text-sm italic ">
                  sales{" "}
                </span>{" "}
                <span className="text-gray-300 text-sm">(9)</span>
              </li>
              <hr />
            </ul>
          </div>
        </div>
      </CardPrototype>
    </div>
  );
}
