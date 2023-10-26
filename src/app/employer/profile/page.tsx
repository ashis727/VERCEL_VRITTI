import React from 'react'
import Personalinfo from '../component/personalinfo'
import Table from '../component/Table';
import CardPrototype from '@/components/ui/CardPrototype';
import { MdCompare, MdOutlineTask } from 'react-icons/md';
import { CiViewTimeline } from 'react-icons/ci';
import StockAnalysisChart from '../component/chart';
import { HiInformationCircle } from 'react-icons/hi';





export default function Page() {

  const bodydata = [
    {}
  ];
  const headingdata = [
    { value: "Date/Time" }, { value: "Customer" }, { value: "Service" }, { value: "Duration" }, { value: "Payment" }, { value: "Status" }
  ];

  return (
    <>
      <div className='flex gap-5 items-center'>
        <div className="text-4xl font-bold">John Deo</div>
        <div className='border-[3px] border-[rgba(70,188,170)] px-5 py-2 text-[rgba(70,188,170)] rounded-2xl font-semibold'>CEO, founder</div>

      </div>
      <div className="flex flex-wrap lg:flex-nowrap">
        <div className="">
          <div>
            <Personalinfo />
          </div>
          <div>
            <CardPrototype>
              <div className="flex flex-col">
                <div className="text-base font-medium">Short description</div>
                <div className='bg-gray-100 border border-groove rounded-2xl p-3 mt-5 text-sm text-gray-500'>
                  For example, a company implementing a new accounting system uses dummy data to ensure its bookings are stored correctly before inputting live Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </div>

              </div>
            </CardPrototype>
          </div>
          <div className='mt-5'>
            <CardPrototype>
              <div className="flex gap-2 items-center mb-3">
                <div className="text-blue-500">

                <HiInformationCircle size={30} />
                </div>
                <div className='text-base font-medium'>Other Personal Information</div>
              </div>
              <div className='flex gap-1 mt-4'>
                <div className="text-gray-400 text-[13px]">Address:</div>
                <div className="text-[13px]">Gopalpua byepass,jaipur</div>
              </div>
              <div className='flex gap-1 mt-4'>
                <div className="text-gray-400 text-[13px]">Liencense No.:</div>
                <div className="text-[13px]">123123</div>
              </div>
              <div className='flex gap-1 mt-4'>
                <div className="text-gray-400 text-[13px]">Tax id:</div>
                <div className="text-[13px]">759</div>
              </div>
              <div className='flex gap-1 mt-4'>
                <div className="text-gray-400 text-[13px]">Website URL:</div>
                <div className="text-[13px]">www.abcd.com</div>
              </div>
            </CardPrototype>
          </div>

        </div>
        <div className="py-5 lg:p-5">
          {/* graph */}
          <div className='w-[343px] md:w-auto'>
            <CardPrototype>
              <div className="">
                <div className='flex justify-between mb-8'>
                  <div className="flex gap-2 items-center">
                    {/* heading */}
                    <div className="flex justify-center items-center text-green-500">
                      <CiViewTimeline size={30} />
                    </div>
                    <div className='text-base font-medium'>
                      Overview
                    </div>
                  </div>
                  {/* dropdown */}
                  <div className="bg-blue-100 text-blue-500 flex gap-2 items-center justify-center px-4 py-1 rounded-xl hover:bg-blue-500 hover:text-white">
                    <div><MdCompare className=" text-sm" /></div>
                    <div className=" text-sm">Compared to <span className="font-bold">2022</span></div>

                  </div>

                </div>

                <StockAnalysisChart />


              </div>
            </CardPrototype>
          </div>
          {/* table */}
          <div className='mt-5'>
            <CardPrototype>
              <div className='px-7 flex gap-2 items-center'>
                <div className='text-red-500'><MdOutlineTask size={30} /></div>
                <div className='text-base font-medium'>Assigned</div>
              </div>
              <Table bodydata={bodydata} headingdata={headingdata} />
            </CardPrototype>
          </div>

        </div>
      </div>


    </>


  )
}
