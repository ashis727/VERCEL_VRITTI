"use client";
import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import CardPrototype from "@/components/ui/CardPrototype";
export default function Infocard({ title, count }: any) {
  return (
    <div>
      <CardPrototype>
        <div className="flex flex-col justify-center  items-center flex-col-reverse">
          <div className="text-xl font-semibold"> {title}</div>
          <div className="text-3xl text-green-500 font-bold">{count}</div>
        </div>
      </CardPrototype>
    </div>
  );
}
