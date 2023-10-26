import React from "react";

interface data {
  title: string;
  icon?: JSX.Element;
}
export default function Title(props: data) {
  return (
    <div className="flex items-center text-3xl px-6 ">
      {" "}
      <span>{props.title}</span> <span className="mx-4"> {props.icon}</span>
    </div>
  );
}
