"use client";
import CardPrototype from "@/components/ui/CardPrototype";
import React, { useEffect, useState } from "react";
import Title from "../component/Title";
import { FaNewspaper } from "react-icons/fa";
 
import { BiCalendar, BiFolder } from "react-icons/bi";
import BlogCard from "../component/BlogCard";
import ClientController from "@/controllers/employer";
import EditorJsonComponents from "../component/EditorJson";
import userSlice from "@/store/userSlice";
import Image from "next/image";

export default function Page() {
  const Requirements = new ClientController();

  const [filteredData, setFilteredData] = useState([]);
  const [data, setData] = useState<any>([]);
  const [blogcategories, setBlogCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<any>();
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
    console.log("first click");
    try {
      const data = await Requirements.getBLogs("");
      console.log("blog data", data.results);

      setData(data.results);
      setFilteredData(
        data.results.filter(
          (item: any) => item?.category.id == selectedCategoryId
        )
      );

      return data;
    } catch (error) {
      console.log(error);
    }
  };
  const getfilterdata = async () => {
    console.log("first id", selectedCategoryId);
    try {
      const data = await Requirements.getBLogs("");
      console.log("blog  data", data.results);
      console.log(
        "first filtered data here ",
        data.results.filter(
          (item: any) => item?.category.id == selectedCategoryId
        )
      );
      setData(
        data.results.filter(
          (item: any) => item?.category.id == selectedCategoryId
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getfilterdata();
  }, [selectedCategoryId]);

  useEffect(() => {
    blogcategoriesData();
    blogdata();
  }, []);
  return (
    <div>
      <CardPrototype>
        <Title title="Newsletters" icon={<FaNewspaper />} />
        <div className="flex  flex-wrap justify-between items-start py-4 px-6">
          <div className="w-[61%] ">
            {data.map((item: any, i: any) => (
              <div>
                <BlogCard
                  key={i}
                  item={item}
                  // title={item?.title}
                  // src={item?.feature_image_url}
                  // category={item?.category?.title}
                  // createdOn={item?.created_at}
                  // content={item?.short_description}
                  // author_name={item?.author_name}
                />
              </div>
            ))}
          </div>
          <div className=" px-4 w-[36%]  h-[60vh]  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <h2 className="italic  font-serif  text-xl my-3"> Categoies</h2>
            <div className="pace-y-2 overflow-y-scroll scrollbar-hide hover:cursor-pointer">
              {blogcategories.map((item: any, i: any) => (
                <div key={i}>
                  <li className="flex justify-between items-center w-full   mb-2">
                    <div className="flex ">
                      <Image
                        className="rounded-full w-16  h-16 "
                        src={item?.feature_image_url}
                        alt="img"
                        width={200}
                        height={200}
                        objectFit="cover"
                      />
                      {}
                      <span
                        className=" text-gray-600 text-sm italic px-2 "
                        onClick={() => setSelectedCategoryId(item.id)}
                      >
                        {item.title}
                        <span className="line-clamp-2 text-gray-400 not-italic">
                          <EditorJsonComponents
                            jsonData={JSON.parse(item.body)}
                          />
                        </span>
                      </span>
                    </div>
                    <span className="text-gray-300 text-sm">
                      {`(${item.blogs_count})`}
                    </span>
                  </li>
                  <hr className="py-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardPrototype>
    </div>
  );
}
