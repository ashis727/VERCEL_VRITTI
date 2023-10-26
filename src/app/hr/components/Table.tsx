"use client"
import CardPrototype from "@/components/ui/CardPrototype";
import React, { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";
import Alert from "./Alert";

const Table = ({ bodydata, headingdata }: any) => {
    const itemsPerPage = 3;

    const [currentPage, setCurrentPage] = useState(1);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, bodydata.length);

    const handlePageChange = (newPage: any) => {
        setCurrentPage(newPage);
    };

    const isPrevDisabled = currentPage === 1;
    const isNextDisabled = endIndex >= bodydata.length;

    return (
        <div >
         

                <div className=" p-6">
                    <table className="min-w-full">
                      
                        <thead>
                            <tr className="bg-gray-100 rounded-xl px-3">
                                <th>
                                    <input type="checkbox" />
                                </th>
                                {headingdata.map((item: any, i: any) => (
                                    <th className="px-6 py-3 text-left text-[14px]" key={i}>
                                        {item.value}
                                    </th>
                                ))}
                            </tr>

                        </thead>
                      

                        <tbody className="bg-white text-sm">
                            {bodydata.slice(startIndex, endIndex).map((item: any, i: any) => (
                                <tr
                                    key={i}
                                    className={`${i % 2 === 1 ? "bg-gray-100 rounded-full" : ""}`}
                                >
                                    <td className="text-center">
                                        <input type="checkbox" className="bg-gray-100" />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.value1}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.value2}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.value3}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.value4}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.value5}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.value6}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>


                    {/* pagination code */}
                    <div className="flex justify-between mt-4 text-[13px]">
                        <div>
                            Showing {startIndex + 1} to {endIndex} of {bodydata.length} items
                        </div>
                        <div className="flex gap-4 bg-gray-100 p-2 px-6 rounded-2xl text-center items-center">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={isPrevDisabled}
                                className={`${isPrevDisabled ? " disabled:opacity-30" : "cursor-pointer"} text-blue-500 hover:text-blue-900 flex gap-4 items-center`}
                            >
                                <span className="text-lg"><MdKeyboardDoubleArrowLeft /></span>
                                <span> <IoIosArrowBack /></span>
                                <span>1</span>

                            </button>
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={isNextDisabled}
                                className={`${isNextDisabled ? " disabled:opacity-30" : "cursor-pointer"} text-blue-500 hover:text-blue-800 flex gap-4 items-center`}
                            >
                                <span>2</span>
                                <span><IoIosArrowForward /></span>
                                <span className="text-lg"><MdKeyboardDoubleArrowRight /></span>
                            </button>
                        </div>
                    </div>
                    {/* alert */}
                    <div className="mt-[15px]">
                    <Alert bgColor="bg-red-50" borderColor="border-red-300" description="There is no Shceduled and assigned Task"/>

                    </div>
                </div>
            
        </div>
    );
};

export default Table;
