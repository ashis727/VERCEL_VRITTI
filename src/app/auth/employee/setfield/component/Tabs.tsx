"use client"
import React, { useState } from "react";
import Personalinfo from "./Personalinfo";
import Contactinfo from "./contactinfo";
import Qualifications from "./Qualification";
import Image from "next/image";
import { useRouter } from "next/router";




function Tabs() {
    // const router = useRouter()
    const [step, setStep] = useState<number>(1);

    const handleNext = () => {
        if (step < 3) {
            setStep(step + 1);
        }
    };

    const handlesubmit = () => {
        // router.push("/");
    }

    const handlePrev = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    return (
        <div className="p-6 bg-white rounded-xl m-auto">
            <div className="">
                <div className="flex justify-center bg-white">
                    <Image
                        src="/avatar/virtti.jpg"
                        width={50}
                        height={50}
                        alt="Picture of the author"
                    />
                </div>
                <div className="text-3xl font-[600] text-center uppercase font-serif">
                    <h1>vritti</h1>
                    <p className="text-[8px] -mt-4">authentication employe </p>
                </div>
                <div className=" pb-4 text-left text-2xl capitalize">
                    <div className="text-xl font-[200]  py-4 text-left">
                        sign up
                    </div>
                    <p className="text-sm text-stone-600">
                        elevate your access : registered useres,unleash
                        possibillties.
                    </p>
                </div>
            </div>
            <div className="flex items-center mb-6">
                <div
                    className={`text-sm font-bold mr-4 ${step === 1 ? "text-primary" : "text-gray-500"
                        }`}
                >
                    Employment status
                </div>
                <div
                    className={`text-sm font-bold mr-4 ${step === 2 ? "text-primary" : "text-gray-500"
                        }`}
                >
                    other personal information
                </div>
                <div
                    className={`text-sm font-bold ${step === 3 ? "text-primary" : "text-gray-500"
                        }`}
                >
                    Qualification Detail
                </div>
            </div>
            {step === 1 && (
                <div>
                    {/* Basic Information Form */}
                    <Personalinfo />
                </div>
            )}
            {step === 2 && (
                <div>
                    {/* Contact Information Form */}
                    <Contactinfo />
                </div>
            )}
            {step === 3 && (
                <div>
                    {/* Qualification Detail Form */}
                    <Qualifications />
                </div>
            )}
            <div className="flex justify-between mt-8">
                <button
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 focus:outline-none"
                    onClick={handlePrev}
                >
                    Previous
                </button>
                {step < 3 ? (
                    <button
                        className="px-4 py-2 bg-primary text-white rounded focus:outline-none"
                        onClick={handleNext}
                    >
                        Next
                    </button>
                ) : (
                    <button
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 focus:outline-none"
                        onClick={handlesubmit}
                    >
                        Submit
                    </button>
                )}
            </div>
        </div>
    );
};

export default Tabs;