"use client";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import TextInput from "../../../../components/textinput";
import Link from "next/link";
import ClientController from "@/controllers/employerAuth";
import { useRouter } from "next/navigation";

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
  console.log("email", email);

  const handleUpdatePassword = (
    values: any,

    { setFieldError, resetForm, setSubmitting }: any
  ) => {
    if (values.password === values.confirm_password) {
      auth
        .confirmPassword({
          email: email,
          otp: values.otp,
          new_password: values.confirm_password,
        })
        .then((res) => {
          console.log("res---", res);
          Router.push("/hr");
        })
        .catch((err) => {
          console.log(err);
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
        <div
          className={`bg-white h-screen flex items-center justify-center py-12 `}
        >
          <div className=" bg-white rounded-xl shadow-lg p-8">
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
                <div
                  className="px-2 py-3 mt-5 mb-4 text-center bg-yellow-300 cursor-pointer rounded-xl "
                  onClick={handleSubmit}
                >
                  <button type="submit">Reset Password</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
}
