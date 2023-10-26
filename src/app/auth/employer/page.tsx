"use client";
import React, { useState } from "react";
import LoginForm from "./components/Login";
import Signup from "./components/Register";
import Providers from "@/store/Providers";

export default function Employer() {
  const [active, setActive] = useState(1);
  const [showTab, setShowTab] = useState(true);

  return (
    <div className={`   ${" flex items-center justify-center py-12"}`}>
      <Providers>
        {" "}
        <div className=" bg-white  w-[400px] rounded-xl shadow-lg p-5">
          {showTab && (
            <div className="w-full bg-gray-300 rounded-xl flex justify-around p-3 my-6">
              <div
                onClick={() => setActive(1)}
                className={`${
                  active == 1 ? "bg-black text-white" : "bg-transparent"
                } cursor-pointer px-12 py-2 hover:bg-black hover:text-white rounded-xl`}
              >
                Login
              </div>
              <div
                onClick={() => setActive(2)}
                className={`${
                  active == 2 ? "bg-black text-white" : "bg-transparent"
                } cursor-pointer px-12 py-2 hover:bg-black hover:text-white rounded-xl`}
              >
                Sign Up
              </div>
            </div>
          )}
          {active == 1 ? (
            <LoginForm setShowTab={setShowTab} />
          ) : (
            <Signup setShowTab={setShowTab} />
          )}
        </div>
      </Providers>
    </div>
  );
}
