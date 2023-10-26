"use client";
import React, { useEffect, useState } from "react";
import Requirements from "../page";
import axios from "axios";
import { Constants } from "@/constants/constants";
import ClientController from "@/controllers/employer";
import { Result } from "postcss";
import { BiEdit, BiTrash } from "react-icons/bi";
import ReqModal from "../../component/ReqModal";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { BsFillEyeFill, BsViewList } from "react-icons/bs";
import CardPrototype from "@/components/ui/CardPrototype";
import Utilcard from "../../component/Utilcard";
import { title } from "process";
import { useAppSelector } from "@/store";
import dummyImage from "../../../../../public/avatar/profileimg.jpg";
import InfiniteScroll from "react-infinite-scroll-component";
import DrivedModal from "../../component/Modal";
import FAQAccordion from "../../component/FaqAccordian";
import { CiBoxList, CiViewList } from "react-icons/ci";
export default function Checkrequirements() {
  const user = useAppSelector((state) => state.userReducer.user);
  // console.log("first", user);
  let token: any = user?.accessToken;
  console.log("user", user);
  const [selectedid, setSelectedid] = useState<number>(0);
  let [count, setCount] = useState<any>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const requirements = new ClientController();
  useEffect(() => {
    firstdata();
    // loadMoreData();
  }, []);
  const [jobsReq, setJobsReq] = useState<any>([]);
  const [job, setjob] = useState<any>({});
  const [totalCount, setTotalCount] = useState<number>(50);
  const firstdata = async () => {
    try {
      const data = await requirements.getRequirements(token);
      console.log(" data count ", data?.data?.results);
      setTotalCount(data?.data.count);
      setJobsReq(data?.data?.results);
    } catch (err) {
      console.log("Error:", err);
    }
  };

  const reqById = async (id: number) => {
    console.log("first selectedd id  :", id);
    try {
      const data = await requirements.getRequirementById(token, id);
      console.log(" data count by id ", data?.data);
      setTotalCount(data?.data.count);
      setjob(data?.data);
    } catch (err) {
      console.log("Error:", err);
    }
  };

  const handleDelete = async (i: any) => {
    // console.log("first api", i);
    try {
      const data = await requirements.deleteRequirements(token, i);
      console.log("first req data", data);
      alert("Deleted successfully ");
      const data2 = await requirements.getNextReqData(token, "1");
      console.log("next page ", data2?.data?.results);
      setJobsReq(data2?.data?.results);
    } catch (err) {
      console.log(err);
    }
  };

  // const handleEdit = async (i: any) => {
  //   setSelectedid(i);
  // try {
  //   const data = await requirements.EditRequirements(token, i);
  //   console.log("first req data", data);
  //   alert("Deleted successfully ");

  //   return data;
  // } catch (err) {
  //   console.log(err);
  // }
  //};
  // ...

  const [hasMore, setHasMore] = useState(true); // Whether there is more data to load

  const loadMoreData = async () => {
    setCount(count + 1);
    try {
      const data = await requirements.getNextReqData(token, count);
      console.log("next page data ", data?.data?.results);
      const newJobs = data?.data?.results;
      if (newJobs.length > 0) {
        setJobsReq([...jobsReq, ...newJobs]);
        // setJobsReq((prevJobs :any) => [...prevJobs, ...newJobs]);
      } else {
        setHasMore(false); // No more data to load
      }
    } catch (err) {
      console.log("Error:", err);
    }
  };
  const [view, setView] = useState(false);
  return (
    <div className="relative w-full  ">
      {/* cards */}
      <CardPrototype>
        <InfiniteScroll
          dataLength={55}
          next={() => loadMoreData()}
          hasMore={hasMore}
          loader={<h4>Loading data...</h4>}
          scrollableTarget=".scroll-container"
          endMessage={
            <p className="mt-5 font-space text-lg text-white text-center">
              <b>Yay! You have seen it all</b>
            </p>
          }
          refreshFunction={async () => {}}
          pullDownToRefresh
          pullDownToRefreshThreshold={50}
        >
          <div></div>
          <span className="flex items-center text-2xl px-4 ">
            {" "}
            JOBS Requirements <CiViewList className=" mx-2  " />
          </span>
          {jobsReq.map((job: any, i: any) => (
            <div className="p-4">
              <Utilcard
                title={`${job.job_title} `}
                jobshortdescription={job?.job_short_description}
                src={job.image ? job.image : `${dummyImage}`}
                selectedid={job.id}
                setSelecetedid={setSelectedid}
                createdat={job.created_at}
                viewDisabled={true}
                editDisabled={false}
                deleteDisabled={true}
                handleview={openModal}
                view={view}
                req={reqById}
              />
            </div>
          ))}
        </InfiniteScroll>
      </CardPrototype>
      {isModalOpen && (
        <div className="w-full h-screen">
          <DrivedModal isOpen={isModalOpen} onClose={closeModal}></DrivedModal>
        </div>
      )}
      {/* <div
        className="w-full flex  gap-4 
       px-10 mt-2 justify-end"
      >
        <button
          className="px-4 py-1  bg-blue-600 rounded-md text-white text-sm"
          onClick={() => {
            if (count !== 0) {
              setCount(--count);
            }
            // firstdata();
            loadMoreData();
          }}
        >
          Prev
        </button>
        <button
          className="px-4 py-1  bg-blue-600 rounded-md text-white text-sm"
          onClick={() => {
            setCount(++count);
            loadMoreData();
          }}
        >
          Next
        </button>
      </div>
      {selectedid && (
        <div className="absolute   bg-opacity-80 bg-gray-600 w-full  mx-auto flex justify-center p-4 top-0 left-0 z-50 ">
          <ReqModal id={selectedid} setSelectedid={setSelectedid} />
        </div>
      )} */}
    </div>
  );
}
