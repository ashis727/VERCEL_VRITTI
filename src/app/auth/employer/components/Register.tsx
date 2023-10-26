"use client";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Formik, FormikHelpers } from "formik";
import TextInput from "../../../../components/textinput";
import ClientController from "@/controllers/employerAuth";
import { signIn } from "next-auth/react";
import { AiFillApple } from "react-icons/ai";
import { useRouter } from "next/navigation";
import SKAnimation from "@/components/Skeleton/Animation";
import RegisterOtpVerify from "./RegisterOtpVerify";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Valid email").required("Email is required"),
  companyname: Yup.string().required("Company name is required"),
  phone: Yup.string().required("Phone is required"),
  password: Yup.string().required("Password is required"),
});

type schema = {
  email: string;
  companyname: string;
  phone: string;
  password: string;
};

export default function Signup({ setShowTab }: any) {
  const auth = new ClientController();
  const [loading, setLoading] = useState(false);
  const [userExists, setUserExists] = useState(false);
  const [otpVerify, setOtpVerify] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = (
    values: schema,
    { setFieldError, setSubmitting }: FormikHelpers<schema>
  ) => {
    setLoading(true);
    setEmail(values.email);
    setSubmitting(true);
    auth
      .registerUser({
        email: values.email,
        company_name: values.companyname,
        phone: values.phone,
        password: values.password,
        source: "Web",
      })
      .then((registrationResponse) => {
        //console.log("registrationResponse", registrationResponse);
        if (registrationResponse?.error) {
          setFieldError("email", registrationResponse?.error);
          setSubmitting(false);
          setLoading(false);
          // alert("Successfully Register");
        }
        return signIn("employer-login", {
          username: values.email,
          password: values.password,
          redirect: false,
        });
      })
      .then((loginResponse) => {
        if (loginResponse?.error) {
          setFieldError("email", loginResponse?.error);
          setSubmitting(false);
          setLoading(false);
        }
        setShowTab(false);
        setOtpVerify(true);
      })
      .catch((error) => {
        console.log("Error---:", error);
        setSubmitting(false);
        setLoading(false);
      });
  };

  const getOtp = (email: any) => {
    auth
      .SendRegisterOTP(email)
      .then((res) => {
        console.log("res", res);
      })
      .catch((err) => {
        console.log("err", err);
        console.debug(err.response);
      });
  };

  const VerifyEmployer = (email: any) => {
    auth
      .VerifyEmployer(email)
      .then((res) => {
        console.log("res", res);
        setUserExists(false);
      })
      .catch((err) => {
        console.log("err", err);
        if (err.response.status == 403) {
          setUserExists(true);
        }
      });
  };

  return otpVerify ? (
    <RegisterOtpVerify email={email} />
  ) : (
    <Formik
      initialValues={{
        email: "",
        companyname: "",
        phone: "",
        password: "",
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
          <div className="flex items-center justify-center  ">
            <div className=" bg-white  w-[400px] rounded-xl">
              <div className="text-3xl font-bold text-center pb-4">
                Create Account ,<br />
                <span className="text-lg font-thin text-gray-500">
                  sign up to get started!
                </span>
              </div>

              <div className="space-y-4 py-6">
                <div>
                  <TextInput
                    name="companyname"
                    type=" text"
                    placeholder="Your company name"
                    label=""
                    value={values.companyname}
                    onChange={handleChange("companyname")}
                    error={errors.companyname}
                    istouched={touched.companyname}
                  />
                </div>

                <div>
                  <TextInput
                    name="email"
                    type="email"
                    placeholder="Your email"
                    label=""
                    value={values.email}
                    onChange={handleChange("email")}
                    error={errors.email}
                    istouched={touched.email}
                    onBlur={() => VerifyEmployer(values.email)}
                    className="lowercase"
                  />
                  {userExists && (
                    <div className="text-red-500 text-[12px]">
                      User already exists
                    </div>
                  )}
                </div>
                <div>
                  <TextInput
                    name="password"
                    type="password"
                    placeholder="Your password"
                    label=" "
                    value={values.password}
                    onChange={handleChange("password")}
                    error={errors.password}
                    istouched={touched.password}
                  />
                </div>

                <div>
                  <TextInput
                    name="phone"
                    // type="number"
                    placeholder="Your phone"
                    label=""
                    value={values.phone}
                    onChange={handleChange("phone")}
                    error={errors.phone}
                    istouched={touched.phone}
                  />
                </div>
              </div>

              {loading ? (
                <SKAnimation>
                  <div className="bg-slate-700 mt-10 mb-4 rounded-xl h-10 w-86 animate-pulse"></div>
                </SKAnimation>
              ) : (
                <div
                  className="px-2 py-3 mt-10 mb-4 text-center bg-yellow-300 cursor-pointer rounded-xl "
                  onClick={handleSubmit}
                >
                  <button type="submit">Submit</button>
                </div>
              )}
              <div className="flex justify-center text-sm font-thin text-gray-700">
                OR
              </div>
              <div className="px-2 py-3 gap-2 mt-5 mb-2 text-sm font-semibold  border rounded-xl flex justify-center  text-center">
                <span className="text-lg">
                  <AiFillApple />
                </span>
                <span>Sign in with Apple</span>
              </div>
              <div className="px-2 py-3 mt-5 mb-10 text-sm font-semibold text-center border rounded-xl">
                Continue with Google
              </div>
            </div>
          </div>
        </>
      )}
    </Formik>
  );
}
