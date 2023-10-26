"use client";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import TextInput from "../../../../components/textinput";
import Link from "next/link";
import ClientController from "@/controllers/employerAuth";
import { useEffect, useState } from "react";
import Verify from "./Verify";
import SKAnimation from "@/components/Skeleton/Animation";
import SkeletonAvatar from "@/components/Skeleton/SkeletonAvatar";
import { useRouter } from "next/navigation";

const validationSchema = Yup.object().shape({
  otp: Yup.string().required("Otp is required").min(6, "OTP is too short"),
});

interface schema {
  email: any;
}

export default function RegisterOtpVerify({ email }: schema) {
  const auth = new ClientController();
  const Router = useRouter();
  const [showVerify, setShowVerify] = useState(false);
  const [otpToken, setOtpToken] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    auth
      .sendOtpToUserByEmail({
        email: email,
        type: "employer",
      })
      .then((res) => {
        console.log("res---", res);
        setOtpToken(res.access);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log("otpToken", otpToken);

  const handleSubmit = (
    values: any,
    { setFieldValue, setFieldError, setSubmitting }: any
  ) => {
    setLoading(true);
    setSubmitting(true);

    auth
      .VerifyEmployerWithOtpToken(values.otp, otpToken)
      .then((res: any) => {
        console.log("res---8888484445545", res);
        setShowVerify(true);
        setLoading(false);
        Router.push("/auth/employer/setup");
      })
      .catch((err: any) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <Formik
      initialValues={{
        otp: "",
      }}
      onSubmit={handleSubmit}
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
        <div className=" ">
          <div className="text-[24px] font-semibold text-center pt-12">
            OTP successfully sent on your email.
          </div>
          <div className="pt-16">
            <TextInput
              name="otp"
              label=""
              value={values.otp}
              placeholder="123456"
              maxLength={6}
              onChange={handleChange("otp")}
              istouched={touched.otp}
            />
          </div>
          {errors?.otp && touched?.otp && (
            <p className="text-red-500 text-xs">{errors.otp}</p>
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
              <button type="submit">Submit</button>
            </div>
          )}
        </div>
      )}
    </Formik>
  );
}
