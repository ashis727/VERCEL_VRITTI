"use client";
import { useContext } from "react";
import DrawerToggle from "./DrawerToggle";
import { LayoutContext } from "../context";
import Image from "next/image";

export default function BrandSection() {
  const { isDrawerCollapsed } = useContext(LayoutContext);
  return (
    <div className="flex w-full justify-between items-center">
      {!isDrawerCollapsed && (
        <div className="text-xl font-bold italic text-orange-400 tracking-tight flex items-center gap-2 px-2">
          <Image
            alt="img"
            src={require("../../../public/avatar/virtti1.png")}
            width={20}
            height={20}
          />{" "}
          <span> VRITTI</span>
        </div>
      )}

      <DrawerToggle />
    </div>
  );
}
