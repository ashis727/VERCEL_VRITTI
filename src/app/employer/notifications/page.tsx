"use client";
import React, { useState } from "react";
import Utilcard from "../component/Utilcard";
import CardPrototype from "@/components/ui/CardPrototype";
import NotificationCard from "../component/NotificationCard";

export default function Page() {
  
  const tabs = [
    {
      title: "Profile",
      data: [
        {
          data: (
            <NotificationCard
              title={"notification title here"}
              subTitle={"profile notification title here"}
              description={
                "notification description here wdiawdj waidawi djawdjwai dawid jawidjwaidj"
              }
              time={"27 dec 2020 @ 00:00 hours"}
            />
          ),
        },
        {
          data: (
            <NotificationCard
              title={"notification title here"}
              subTitle={"profile notification title here"}
              description={
                "notification description here wdiawdj waidawi djawdjwai dawid jawidjwaidj"
              }
              time={"27 dec 2020 @ 00:00 hours"}
            />
          ),
        },
        {
          data: (
            <NotificationCard
              title={"notification title here"}
              subTitle={"profile notification title here"}
              description={
                "notification description here wdiawdj waidawi djawdjwai dawid jawidjwaidj"
              }
              time={"27 dec 2020 @ 00:00 hours"}
            />
          ),
        },
      ],
    },
    {
      title: "Requirement",
      data: [
        {
          data: (
            <NotificationCard
              title={" Requirement notification title here"}
              subTitle={"profile notification title here"}
              description={
                "notification description here wdiawdj waidawi djawdjwai dawid jawidjwaidj"
              }
              time={"27 dec 2020 @ 00:00 hours"}
            />
          ),
        },
        {
          data: (
            <NotificationCard
              title={" Requirement notification title here"}
              subTitle={"profile notification title here"}
              description={
                "notification description here wdiawdj waidawi djawdjwai dawid jawidjwaidj"
              }
              time={"27 dec 2020 @ 00:00 hours"}
            />
          ),
        },
        {
          data: (
            <NotificationCard
              title={"notification title here"}
              subTitle={"profile notification title here"}
              description={
                "notification description here wdiawdj waidawi djawdjwai dawid jawidjwaidj"
              }
              time={"27 dec 2020 @ 00:00 hours"}
            />
          ),
        },
      ],
    },
  ];

  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index: any) => {
    setActiveTab(index);
  };

  return (
    <div>
      <div>
        <div className="tab-container transition-transform duration-300">
          <CardPrototype>
            <div className="flex gap-10 border-b-2">
              {tabs.map((tab, index) => (
                <div key={index}>
                  <button
                    onClick={() => handleTabClick(index)}
                    className={`relative hover:text-orange-300 transition-transform duration-200 text-gray-600 ${
                      activeTab === index 
                        ? "active text-orange-500 underline underline-offset-[7px] decoration-2"
                        : ""
                    }`}
                  >
                    {tab.title}
                  </button>
                </div>
              ))}
            </div>

            <div
              className={`transition-opacity duration-300 opacity-${
                activeTab == activeTab ? "100" : "0"
              }`}
            >
              {tabs[activeTab].data.map((item, index) => (
                <CardPrototype key={index} className="mt-4">
                  <div className="">{item.data}</div>
                </CardPrototype>
              ))}
            </div>
          </CardPrototype>
        </div>
      </div>
      {/* <div className="tab-container transition-transform duration-300">
        <CardPrototype>
          <div className="flex gap-10 border-b-2">
            {tabs.map((tab, index) => (
              <div key={index}>
                <button
                  onClick={() => handleTabClick(index)}
                  className={`relative hover:text-orange-300 transition-transform duration-200 text-gray-600 ${
                    activeTab === index
                      ? "active text-orange-500 underline underline-offset-[7px] decoration-2"
                      : ""
                  }`}
                >
                  {tab.title}
                </button>
              </div>
            ))}
          </div>

          <div
            className={`transition-opacity duration-300 ${
              activeTab === activeTab ? "opacity-100 " : "opacity-0"
            }`}
          >
            {tabs[activeTab].data.map((item: any, index: any) => (
              <CardPrototype className="mt-4">
                <div className="">{item.data}</div>
              </CardPrototype>
            ))}
          </div>
        </CardPrototype>
      </div> */}
    </div>
  );
}
