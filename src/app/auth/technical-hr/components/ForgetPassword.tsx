"use client";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import TextInput from "../../../../components/textinput";
import Link from "next/link";
import ClientController from "@/controllers/employerAuth";
import { useState } from "react";
import Verify from "./Verify";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),
});

interface schema {
  setForgotPass: any;
}

export default function Forgetpassword({ setForgotPass }: schema) {
  const auth = new ClientController();
  const [showVerify, setShowVerify] = useState(false);
  const [email, setEmail] = useState("");

  const handleFormSubmit = (
    values: any,
    { setFieldValue, setFieldError, setSubmitting }: any
  ) => {
    setEmail(values.email);
    auth
      .sendOtpToUser({
        email: values.email,
        type: "employer",
      })
      .then((res) => {
        console.log("res---", res);
        if (res.message == "OTP sent successfully.") {
          setShowVerify(true);
        }
      })
      .catch((err) => {
        console.log(err);
        console.log("jjjjjj", err.response);
      });
  };

  return showVerify ? (
    <Verify email={email} setForgotPass={false} />
  ) : (
    <Formik
      initialValues={{
        email: "",
      }}
      onSubmit={handleFormSubmit}
      validationSchema={validationSchema}
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
        <div className=" items-center flex justify-center py-12">
          <div className=" bg-white  w-[500px] rounded-xl shadow-lg p-5">
            <div className="text-[24px] font-semibold text-center ">
              Forget Password
            </div>
            <div>
              <TextInput
                name="email"
                type="email"
                placeholder="jhondoe@gmail.com"
                label="Email address"
                value={values.email}
                onChange={handleChange("email")}
                istouched={touched.email}
                className="lowercase"
              />
            </div>

            {errors?.email && touched?.email && (
              <p className="text-red-500 text-xs">{errors.email}</p>
            )}

            <div
              onClick={handleSubmit}
              className="mt-5 mb-10 bg-sky-600 rounded-xl text-white px-2 py-1 w-[100px] text-center cursor-pointer"
            >
              send OTP
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
}
