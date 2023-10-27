"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRecoilState } from "recoil";
import { SingleReqdatastate } from "@/app/atom/singleReqData";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import { useAppSelector } from "@/store";
import ClientController from "@/controllers/employer";
import CardPrototype from "@/components/ui/CardPrototype";
import { AiFillExperiment } from "react-icons/ai";
import {
  BsBag,
  BsBagFill,
  BsClock,
  BsCurrencyDollar,
  BsCurrencyRupee,
} from "react-icons/bs";
import {
  BiCalendar,
  BiLoaderCircle,
  BiLocationPlus,
  BiMoney,
  BiPhone,
} from "react-icons/bi";
import { CgLock } from "react-icons/cg";
import { FaAddressCard, FaClock } from "react-icons/fa";
import moment from "moment";
import { GrClock, GrLocation } from "react-icons/gr";
import { CiClock1, CiLock } from "react-icons/ci";
import { HiClock, HiCurrencyDollar, HiCurrencyRupee } from "react-icons/hi";
import EditorJsonComponents from "../component/EditorJson";

// import {
//   useParams,
//   usePathname,
//   useRouter,
//   useSearchParams,
// } from "next/navigation";
// import { useRouter } from "next/router";
// import { useRouter } from "framer/router/stub.js";
export default function Page() {
  const requirements = new ClientController();

  const user = useAppSelector((state) => state.userReducer.user);
  // console.log("first", user);
  let token: any = user?.accessToken;
  const test = useSearchParams();

  let id = test.get("id");

  const [job, setjob] = useState<any>({});
  const reqById = async (id: any) => {
    console.log("first selectedd id  :", id);
    try {
      const data = await requirements.getRequirementById(token, id);
      console.log(" data count by id ", data?.data);

      setjob(data?.data);
    } catch (err) {
      console.log("Error:", err);
    }
  };
  useEffect(() => {
    reqById(id);
  }, [id]);
  const workplace_type = async () => {
    return [
      { value: "O", label: "Onsite" },
      { value: "H", label: "Hybrid" },
      { value: "R", label: "Remote" },
    ];
  };
  const formattedDate = moment(job?.created_at).format("YYYY-MM-DD");
  const formatteddueDate = moment(job?.application_deadline).format(
    "YYYY-MM-DD"
  );
  const formattedupDate = moment(job?.updated_at).format("YYYY-MM-DD");
  return (
    <div>
      <div className="   ">
        <CardPrototype>
          <div>
            <div className="flex   font-poppins justify-between   items-start p-0">
              <div className="px-6">
                <h1 className="text-[18px] font-[500] font-sans line-height-[26px] capitalize font-montserrat text-gray-700">
                  {job.job_title}
                  {/* Payroll Executive{" "} */}
                </h1>
                <div className="flex gap-2">
                  <h2 className="text-[#383d53] font-sans text-[16x] line-height-[18px] font-[400] capitalize">
                    {job.job_short_description}
                  </h2>
                  <span className="text-[#383d53]">|</span>
                  <h2 className="text-[#383d53] font-sans text-[16px] line-height-[18px] font-[400] capitalize">
                    Status : {job.status_type}
                  </h2>
                </div>
                <span className="  mt-4 text-sm flex items-center gap-2">
                  <BsBag className="mr-1 w-3 h-3" />
                  <span className="text-[#383d53] font-sans text-[14x] line-height-[18px] font-[400]   ">
                    {job.experience} years
                  </span>{" "}
                  <span className="px-1 text-gray-300">|</span>
                  <HiCurrencyDollar cclassName="mr-1 w-3 h-3 text-gray-300" />
                  <span className="text-[#383d53] font-sans text-[14x] line-height-[18px] font-[400]  ">
                    {" "}
                    {job.salary}
                  </span>
                </span>
                <span className="  text-sm text-gray-900 flex items-center gap-2 mt-1">
                  <GrLocation className="text-gray-600  " />

                  <span className="text-[#383d53] font-sans text-[14x] line-height-[18px] font-[400] ">
                    {" "}
                    {job.job_location?.state?.country.name}
                  </span>
                </span>
              </div>
              <div className="m">
                <Image
                  className="  h-20 w-20 rounded-md  mr-20"
                  src={job?.image}
                  alt="Job Image"
                  width={200}
                  height={200}
                />
              </div>
            </div>
            <div className="px-6"></div>
          </div>

          <div className="mb-4 px-6 space-y-1">
            <h2 className="text-[15px] font-[400] mt-4 text-gray-700">
              Time and Venue :
            </h2>
            <span className=" text-[#383d53] font-sans text-[13x] line-height-[18px] font-[400] capitalize flex items-center ">
              <HiClock className="mr-1 w-4 h-4" /> Posted on :{formattedDate}
            </span>

            <span className=" text-[#383d53] font-sans text-[14x] line-height-[18px] font-[400] capitalize flex items-center ">
              <GrLocation className="mr-1 w-4 h-4" />
              {job.job_location?.name}, {job.job_location?.state.name},
              {job.job_location?.state?.country.name}
            </span>

            <span className=" text-[#383d53] font-sans text-[14x] line-height-[18px] font-[400] capitalize flex items-center ">
              <BiCalendar className="mr-1 w-4 h-4" /> Due Date :
              {formatteddueDate}
            </span>
            <div className="flex justify-between mr-14">
              {" "}
              <span className=" text-[#383d53] font-sans text-[14x] line-height-[18px] font-[400] capitalize flex items-center ">
                <BiPhone className="mr-1 w-4 h-4" /> Contact: 3434XXXXXX
              </span>
              <span className=" text-blue-500 font-sans text-[14x] line-height-[18px] font-[400] capitalize flex items-center ">
                Last updated on : {formattedupDate}
              </span>
            </div>
          </div>
        </CardPrototype>
        <hr />
        <CardPrototype className="mt-2 px-12">
          <div className=" px-6">
            <div className="my-4">
              <h2 className="text-base font-[400] mt-4 text-gray-700  capitalize mb-2">
                Job description
              </h2>
              <p className="text-[#383d53] font-sans text-[14x] line-height-[18px] font-[400] capitalize flex items-center ">
                Detail :
                {job.description && (
                  <EditorJsonComponents
                    style={"text-base font-[400] text-gray-900"}
                    jsonData={JSON.parse(job.description)}
                  />
                )}
              </p>

              <div className=" mt-2 ">
                <li className="text-[#383d53] font-sans text-[14x]  font-[400]    ">
                  Should have minimum {job.experience} year of experience .
                </li>
                <li className="text-[#383d53] font-sans text-[14x]  font-[400]   ">
                  Expecting knowdledge of language :
                  {job.language_requirements?.name}
                </li>
                <li className="text-[#383d53] font-sans text-[14x]  font-[400]  ">
                  Salary as per market standards {job.salary} .
                </li>
              </div>
            </div>
            <div className="my-4">
              <ul className="space-y-2 text-[15px]">
                <li className=" font-[400] mt-4 text-gray-700 capitalize">
                  Role :
                  <span className="text-[#383d53] font-sans   font-[400] px-1 ">
                    {job.job_title}
                  </span>
                </li>
                <li className="text-[15px] font-[400] mt-4 text-gray-700 capitalize">
                  Work Place Type :
                  <span className="text-[#383d53] font-sans text-[14x]  font-[400] px-1 ">
                    {job.workplace_type == "R"
                      ? "Remote"
                      : job.workplace_type == "h"
                      ? "Hybrid"
                      : "Onsite"}
                  </span>
                </li>
                <li className="text-[15px] font-[400] mt-4 text-gray-700 capitalize">
                  Industry Type:
                  <span className="text-[#383d53] font-sans text-[14x]  font-[400] px-1 ">
                    :{job.industry?.name}
                  </span>
                </li>
                <li className="text-[15px] font-[400] mt-4 text-gray-700 capitalize">
                  Departmnet:
                  <span className="text-[#383d53] font-sans text-[14x]  font-[400] px-1 ">
                    :{job.job_department?.name}
                  </span>
                </li>
                <li className="text-[15px] font-[400] mt-4 text-gray-700 capitalize">
                  Employment Type
                  <span className="text-[#383d53] font-sans text-[14x]  font-[400] px-1 ">
                    :{job?.employment_type}
                  </span>
                </li>
                <li className="text-[15px] font-[400] mt-4 text-gray-700  capitalize">
                  Category
                  <span className="text-[#383d53] font-sans text-[14x]  font-[400] px-1 ">
                    :{job.job_category?.name}
                  </span>
                </li>
              </ul>
            </div>
            <hr />
            <div className="mb-2">
              <h2 className="text-base font-[400] mt-4 text-gray-700 capitalize">
                Education :
              </h2>
              <ul>
                <li className="text-sm font-[400] mt-4 text-gray-700 capitalize">
                  Preferred Qualification
                  <span className="text-[#383d53] font-sans text-[14x]  font-[400] px-1  ">
                    :{job.preferred_qualification}
                  </span>
                </li>
                <li className="text-sm font-[400] mt-4 text-gray-700 capitalize">
                  language_requirements
                  <span className="text-[#383d53] font-sans text-[14x]  font-[400]  px-1">
                    :{job.language_requirements?.name}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </CardPrototype>
      </div>
    </div>
  );
}
