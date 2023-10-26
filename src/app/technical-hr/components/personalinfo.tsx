import React from 'react'
import Image from "next/image";
import CardPrototype from '@/components/ui/CardPrototype'
import { GrMail } from "react-icons/gr";
import { BiHash } from "react-icons/bi";
import { BsFillTelephoneFill } from 'react-icons/bs';

export default function Personalinfo() {
    return (
        <div className="py-5">


            <CardPrototype>
                <div className='flex flex-col  ml-[5px]'>
                    <div className='flex justify-center mb-7'>
                        <div className="bg-gray-300 rounded-full w-[128px] h-[128px] flex items-center justify-center border border-groove">

                            <Image src={"/avatar/profileimg.jpg"} alt='' width={120} height={120} className='bg-gray-300 rounded-full'/>
                        </div>
                    </div>
                    <div className='flex items-center gap-3 mb-2'>
                        <div className='text-blue-400'>
                            <GrMail size={30} />
                        </div>
                        <div className="flex flex-col">
                            <div className='text-[14px] font-bold'>abc@gmail.com</div>
                            <div className="text-gray-400 text-[11px]">Email Address</div>
                        </div>

                    </div>
                    <div className='flex items-center gap-3 mb-2'>
                        <div className='text-blue-400'>
                            <BiHash size={30} />
                        </div>
                        <div className="flex flex-col">
                            <div className='text-[14px] font-bold'>@John</div>
                            <div className="text-gray-400 text-[11px]">Social name</div>
                        </div>

                    </div>
                    <div className='flex items-center gap-4 mb-2 '>
                        <div className='text-blue-400'>
                            <BsFillTelephoneFill size={25} />
                        </div>
                        <div className="flex flex-col">
                            <div className='text-[14px] font-bold'>1234567890</div>
                            <div className="text-gray-400 text-[11px]">Phone Number</div>
                        </div>

                    </div>

                </div>
            </CardPrototype>

        </div>
    )
}
