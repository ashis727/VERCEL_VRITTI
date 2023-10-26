import CardPrototype from "@/components/ui/CardPrototype";
import React from "react";
import { BiNews } from "react-icons/bi";
import { CiSettings } from "react-icons/ci";

const Newsletter = () => {
  return (
    <CardPrototype className="my-2">
      <div className="  m-5 ">
        <div className=" items-center">
          <span className="flex items-center text-3xl  ">
            {" "}
            Subscribe to Our Newsletter <BiNews className="mx-2" />
          </span>
          {/* <div className="w-1/3">
          <img
            src="https://via.placeholder.com/150"
            alt="Newsletter Image"
            className="rounded-full"
          />
        </div> */}
          <div className=" my-6">
            <h2 className="text-2xl font-semibold "></h2>
            <p className="text-gray-700 ">
              Get the latest updates and news delivered to your inbox.
            </p>
            <div className="flex ">
              <input
                type="email"
                placeholder="Your Email"
                className="p-2 rounded-md w-2/3 border border-gray-300"
              />
              <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </CardPrototype>
  );
};

export default Newsletter;
