"use client";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import TextInput from "../../../../components/textinput";
import Link from "next/link";
import ClientController from "@/controllers/employerAuth";
import { useState } from "react";
import Verify from "./Verify";
import SKAnimation from "@/components/Skeleton/Animation";
import SkeletonAvatar from "@/components/Skeleton/SkeletonAvatar";

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
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = (
    values: any,
    { setFieldValue, setFieldError, setSubmitting }: any
  ) => {
    setLoading(true);
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
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return showVerify ? (
    <Verify email={email} setForgotPass={setForgotPass} />
  ) : (
    <Formik
      initialValues={{
        email: email,
        otp: "",
        password: "",
        confirm_password: "",
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
        <div>
          <div className="text-[24px] font-semibold text-center pt-12">
            Forget Password
          </div>
          <div className="pt-16">
            <TextInput
              name="email"
              type="email"
              placeholder="jhondoe@gmail.com"
              label="Email address"
              value={values.email}
              onChange={handleChange("email")}
              istouched={touched.email}
            />
          </div>
          {errors?.email && touched?.email && (
            <p className="text-red-500 text-xs">{errors.email}</p>
          )}

          {loading ? (
            <SKAnimation>
              <div className="bg-slate-700 mt-10 mb-4 rounded-xl h-10 w-86 animate-pulse"></div>
            </SKAnimation>
          ) : (
            <div
              className="px-2 py-3 mt-10 mb-4 text-center bg-yellow-300 cursor-pointer rounded-xl "
              onClick={handleSubmit}
            >
              <button type="submit">send OTP</button>
            </div>
          )}
        </div>
      )}
    </Formik>
  );
}
