import React from "react";
import CardPrototype from "@/components/ui/CardPrototype";
import { usePathname } from "next/navigation";
import { CiCircleChevLeft } from "react-icons/ci";

const Breadcrumb = () => {
  const path = usePathname();
  const pathSegments = path.split("/").filter((segment) => segment);

  const currentPage = pathSegments[pathSegments.length - 1];

  return (
    <div className="my-2">
      <CardPrototype>
        <div className="flex gap-3 items-center">
          <button
            onClick={() => {
              window.history.back();
            }}
            className="cursor-pointer"
          >
            <div className=" text-gray-400 drop-shadow-lg z-50">
              <CiCircleChevLeft size={40} />
            </div>
          </button>

          <div>
            <h2 className="text-xl uppercase  text-gray-700">{currentPage}</h2>

            <div className="mx-auto">
              <span className="list-none p-0 inline-flex text-sm text-gray-400">
                {pathSegments.map((segment, index) => (
                  <a
                    className={`${
                      index === pathSegments.length - 1 ? "text-gray-800" : ""
                    } hover:cursor-pointer hover:text-gray-800 duration-200`}
                    key={segment}
                    onClick={() => {
                      if (index === pathSegments.length - 1) return;
                      const newPath = `/${pathSegments
                        .slice(0, index + 1)
                        .join("/")}`;
                      window.location.href = newPath;
                    }}
                  >
                    {segment}
                    {index < pathSegments.length - 1 && " > "}
                  </a>
                ))}
              </span>
            </div>
          </div>
        </div>
      </CardPrototype>
    </div>
  );
};

export default Breadcrumb;
