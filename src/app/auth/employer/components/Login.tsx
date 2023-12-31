"use client";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import TextInput from "../../../../components/textinput";
import { IoMdLock } from "react-icons/io";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { AiFillApple } from "react-icons/ai";
import Signup from "./Register";
import { useRouter } from "next/navigation";
import Forgetpassword from "./ForgetPassword";
import SkeletonAvatar from "@/components/Skeleton/SkeletonAvatar";
import SKAnimation from "@/components/Skeleton/Animation";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

interface schema {
  email: string;
  password: string;
}

export default function LoginForm({ setShowTab }: any) {
  const [active, setActive] = useState(1);
  const [forgotPass, setForgotPass] = useState<boolean>(false);
  const Router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = (
    values: schema,
    { setFieldError, setSubmitting }: FormikHelpers<schema>
  ) => {
    setSubmitting(true);
    setLoading(true);

    signIn("employer-login", {
      username: values.email,
      password: values.password,
      redirect: false,
    })
      .then((res) => {
        if (res?.error) {
          setFieldError("email", res?.error);
          setSubmitting(false);
          setLoading(false);
          return;
        }
        Router.push("/employer");
        setSubmitting(false);
        setLoading(false);
        // alert("Successfully Login");
      })
      .catch((error) => {
        setSubmitting(false);
        // console.log(error);
        setLoading(false);
      });
  };
  return (
    <>
      {forgotPass ? (
        <Forgetpassword setForgotPass={setForgotPass} />
      ) : (
        <Formik
          initialValues={{
            email: "lalit@gmail.com",
            password: "admin#123",
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
              {active == 1 ? (
                <div className="">
                  <div className="text-3xl font-bold text-center">
                    Welcome, <br />
                    <span className="text-lg font-thin text-gray-500">
                      sign in to continue!
                    </span>
                  </div>

                  <div className="py-4">
                    <div>
                      <TextInput
                        name="email"
                        type="email"
                        placeholder="jhondoe@gmail.com"
                        label=" "
                        value={values.email}
                        onChange={handleChange("email")}
                        istouched={touched.email}
                        className="lowercase"
                      />
                    </div>
                    {errors?.email && touched?.email && (
                      <p className="text-xs text-red-500">{errors.email}</p>
                    )}
                    <div className="mt-5">
                      <TextInput
                        name="password"
                        type="password"
                        placeholder="*********"
                        label=" "
                        value={values.password}
                        onChange={handleChange("password")}
                        istouched={touched.password}
                      />
                    </div>
                    {errors?.email && touched?.email && (
                      <p className="text-xs text-red-500">{errors.password}</p>
                    )}
                  </div>

                  <div
                    className="flex justify-end mt-4"
                    onClick={() => {
                      setForgotPass(true), setShowTab(false);
                    }}
                  >
                    <div>Forgot password?</div>
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
              ) : (
                <div className="">
                  <Signup />
                </div>
              )}
            </div>
          )}
        </Formik>
      )}
    </>
  );
}
