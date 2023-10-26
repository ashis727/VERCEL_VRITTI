import { InputHTMLAttributes, ReactNode, useState } from "react";

interface ITextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error: string;
  istouched: any;
}

export default function Checkbox(props: ITextInputProps) {
  return (
    <div>
      <div className="flex flex-col items-start space-x-2">
      <div>
          <label htmlFor={props.id} className="font-semibold">
            {props.label}
          </label>
        </div>
        <div className="mt-[2px] flex">
          <input {...props} type="checkbox" aria-label={props.name} />
          <input {...props} type="checkbox" aria-label={props.name} />
        </div>
        
      </div>
      {props.error && props.istouched ? (
        <p className="text-red-500 mt-2">{props.error}</p>
      ) : null}
    </div>
  );
}