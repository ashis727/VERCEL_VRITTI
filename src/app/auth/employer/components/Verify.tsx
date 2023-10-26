"use client";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import TextInput from "../../../../components/textinput";
import Link from "next/link";
import ClientController from "@/controllers/employerAuth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SKAnimation from "@/components/Skeleton/Animation";

const validationSchema = Yup.object().shape({
  otp: Yup.string().required("Otp is required").min(6, "OTP is too short"),
  password: Yup.string().required("Password is required"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

interface schema {
  email: string;
  setForgotPass: any;
}

export default function Verify({ email, setForgotPass }: schema) {
  const Router = useRouter();
  const auth = new ClientController();

  const [loading, setLoading] = useState(false);

  const handleUpdatePassword = (
    values: any,

    { setFieldError, resetForm, setSubmitting }: any
  ) => {
    if (values.password === values.confirm_password) {
      setLoading(true);
      auth
        .confirmPassword({
          email: email,
          otp: values.otp,
          new_password: values.confirm_password,
        })
        .then((res) => {
          console.log("res---", res);
          setForgotPass(false);
          setLoading(false);
          alert("Password Successfully Update");
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  };

  return (
    <Formik
      initialValues={{
        otp: "",
        password: "",
        confirm_password: "",
      }}
      onSubmit={handleUpdatePassword}
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
        setSubmitting,
      }: any) => (
        <div>
          <h1 className="mb-10 text-4xl font-bold tracking-wider ">
            {" "}
            Reset Password
          </h1>

          <div className="mb-5">
            <TextInput
              name="otp"
              type="text"
              maxLength={6}
              placeholder="Enter Otp"
              label=""
              value={values.otp}
              onChange={handleChange("otp")}
              error={errors.otp}
              istouched={touched.otp}
            />
          </div>
          <div className="mb-5">
            <TextInput
              name="password"
              type="password"
              placeholder="New Password"
              label=""
              value={values.password}
              onChange={handleChange("password")}
              error={errors.password}
              istouched={touched.password}
            />
          </div>
          <div className="mb-5">
            <TextInput
              name="confirm password"
              type="password"
              placeholder="Confirm Password"
              label=""
              value={values.confirm_password}
              onChange={handleChange("confirm_password")}
              error={errors.confirm_password}
              istouched={touched.confirm_password}
              className="mt-6"
            />
          </div>

          <div className="">
            <div className="mt-5 mb-10">
              {loading ? (
                <SKAnimation>
                  <div className="bg-slate-700 mt-10 mb-4 rounded-xl h-10 w-86 animate-pulse"></div>
                </SKAnimation>
              ) : (
                <div
                  className="px-2 py-3 mt-10 mb-4 text-center bg-yellow-300 cursor-pointer rounded-xl "
                  onClick={handleSubmit}
                >
                  <button type="submit">Reset Password</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
}
