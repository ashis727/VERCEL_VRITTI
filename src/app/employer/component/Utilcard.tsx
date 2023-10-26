import CardPrototype from "@/components/ui/CardPrototype";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { BiEdit, BiTrash } from "react-icons/bi";
import { BsFillEyeFill } from "react-icons/bs";
interface UtilcardProps {
  title: string;
  viewDisabled?: boolean;
  editDisabled?: boolean;
  deleteDisabled?: boolean;
  jobshortdescription?: string;
  src: string;
  createdat: string;
  handleview: any;
  view: any;
  selectedid: any;
  setSelecetedid: any;
  req: any;
}
export default function Utilcard({
  title,
  viewDisabled,
  editDisabled,
  deleteDisabled,
  jobshortdescription,
  src,
  createdat,
  handleview,
  view,
  selectedid,
  setSelecetedid,
  req,
}: UtilcardProps) {
  return (
    <div>
      {" "}
      <div className="w-full  py-4 ">
        <div className="flex justify-between items-center ">
          <div className="md:flex items-center  w-full ">
            <Image
              src={`${src}`}
              alt="img"
              className="rounded-full w-20 h-20"
              width={50}
              height={50}
            />
            <div className="space-y-1 px-4 text-sm  font-poppines w-full">
              <div className="text-gray-800 md:flex justify_between w-full   md:justify-between">
                <span className="capitalize font-gray-800 font-semibold">
                  {" "}
                  {title}{" "}
                </span>
                <div className="flex gap-3">
                  <Link
                    href={`/employer/singleReq?id=${selectedid}`}
                    onClick={() => console.log("first", selectedid)}
                    className={` items-center text-blue-600 hover:cursor-pointer ${
                      viewDisabled ? "flex" : "hidden"
                    }`}
                    // onClick={() => {
                    //   handleview(!view);
                    //   req(selectedid);
                    // }}
                  >
                    <BsFillEyeFill />
                    <span className="px-1">view</span>
                  </Link>
                  <button
                    className={`flex items-center text-blue-600  hover:cursor-pointer ${
                      editDisabled ? "flex" : "hidden"
                    }`}
                    disabled={editDisabled}
                  >
                    <BiEdit />
                    <span className="px-1">edit</span>
                  </button>
                  <button
                    className={`flex items-center text-blue-600  hover:cursor-pointer  ${
                      deleteDisabled ? "flex" : "hidden"
                    }`}
                    disabled={deleteDisabled}
                  >
                    <BiTrash />
                    <span className="px-1">delete</span>
                  </button>
                </div>
              </div>
              <div className="flex  w-full justify-between">
                <span className="text-gray-600">{jobshortdescription} </span>
                {/* <div className="flex  flex-col">
                <div> dummy</div>
              </div> */}
              </div>
              <div className="flex  w-full justify-between">
                <span>Status : Verifying </span>

                <div className="text-gray-600">
                  {" "}
                  <span className="text-gray-800"> Created At : </span>
                  {`${createdat.substring(0, 10)}`}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
}
