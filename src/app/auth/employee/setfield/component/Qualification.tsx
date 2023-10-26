"use client";
import React from "react";
import * as Yup from "yup";
import { Formik, FormikHelpers } from "formik";
import TextInput from "@/components/textinput";
import ComboSelectBox from "./ComboSelectBox";
const validationSchema = Yup.object().shape({
  Qualifications: Yup.string().required("Qualifications is required"),
  college: Yup.string().required("college in required"),
  s_year: Yup.string().required("start year is required"),
  e_year: Yup.string().required("end year is required"),
  marks: Yup.string().required("marks is required"),
});
type schema = {
  Qualifications: string;
  college: string;
  s_year: string;
  e_year: string;
  marks: string;
};
const collegeOptions = [
  { value: "harvard", label: "Harvard University" },
  { value: "mit", label: "Massachusetts Institute of Technology" },
  { value: "stanford", label: "Stanford University" },
];
export default function Qualifications() {
  const handleSubmit = (
    values: schema,
    { setFieldError, setSubmitting }: FormikHelpers<schema>
  ) => {
    console.log(values);
    setSubmitting(true);
  };
  return (
    <Formik
      initialValues={{
        Qualifications: "",
        college: "",
        s_year: "",
        e_year: "",
        marks: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        setFieldValue,
        setFieldError,
        isSubmitting,
      }: any) => (
        <>
          <div className="">
            <div className="mt-[10px] p-5 ">
              
              <div className="">
                <TextInput
                  name="Qualifications"
                  type="email"
                  placeholder="Your Qualifications"
                  label="Qualifications"
                  value={values.Qualifications}
                  onChange={handleChange("Qualifications")}
                  error={errors.Qualifications}
                  istouched={touched.Qualifications}
                />
              </div>
              <div className="">
                <ComboSelectBox
                  label={"College"}
                  name={"college"}
                  onChange={handleChange("college")}
                  placeholder={"Select college"}
                  options={collegeOptions}
                  error={errors.college}
                  istouched={touched.college}
                />
              </div>
              <div className="">
                <TextInput
                  name="s_year"
                  type="number"
                  placeholder="Your start year"
                  label=" Start year"
                  value={values.s_year}
                  onChange={handleChange("s_year")}
                  error={errors.s_year}
                  istouched={touched.s_year}
                />
              </div>
              <div className="">
                <TextInput
                  name="e_year"
                  type="number"
                  placeholder="Your end year"
                  label=" End year"
                  value={values.e_year}
                  onChange={handleChange("e_year")}
                  error={errors.e_year}
                  istouched={touched.e_year}
                />
              </div>
              <div className="">
                <TextInput
                  name="marks"
                  type="number"
                  placeholder="Your marks"
                  label=" Marks"
                  value={values.marks}
                  onChange={handleChange("marks")}
                  error={errors.marks}
                  istouched={touched.marks}
                />
              </div>
             
            </div>
          </div>
        </>
      )}
    </Formik>
  );
}