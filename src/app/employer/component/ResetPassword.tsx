import Combobox from "@/components/controls/ComboBox";
import TextInput from "@/components/textinput";
import ClientController from "@/controllers/employerAuth";
import { useAppSelector } from "@/store";
import { Formik } from "formik";
import React, { useState } from "react";
type schema = {
  email: any;
  phone: any;
};
export default function ResetPassword() {
  const auth = new ClientController();
  const user = useAppSelector((state) => state.userReducer.user);
  const [codelength, setcodelength] = useState<any>(10);
  const [numberlength, setnumberlength] = useState("");
  const [otptoken, setotptoken] = useState("");
  const [number, setNumber] = useState<any>();
  const [otpstatus, setOtpStatus] = useState("");
  const [Otp, setOtp] = useState("");
  let Token: any = user?.accessToken;
  //   console.log("first user form resetpassword", user?.phone);

  const [showpassward, setshowpassword] = useState(false);
  const handleotpverify = () => {
    auth
      .employersendPhoneotp(user?.phone, Token)
      .then((res: any) => {
        console.log("first mobile otp verification", res.access);
        alert(res.success);
        setotptoken(res.access);
        if (res.status == 200) {
          console.log(" otp sent ");
          setshowpassword(true);
        } else {
        }
      })
      .catch((err: any) => {
        console.log("error", err);
      });
  };
  const employerVerify = async () => {
    try {
      const data = await auth
        .employerVerifyOtp(Otp, otptoken)
        .then((res: any) => {
          if (res.status == "200") {
            setshowpassword(true);
          }
          //   setOtpStatus(res.status);
          console.log(res.status);

          alert(res.data.message);
        });
    } catch (error) {
      console.log(error);
    }
  };
  // const changePassword = async () => {
  //   try{
  //     const data = await auth.changePassword(values , Token).then((res:any) => {
  //       console.log(res) ;
  //     })
  //   }
  // }
  const handleSubmit = async () => {};
  //   console.log("first phone", user?.phone);
  return (
    <div>
      <Formik
        initialValues={{
          phone: user?.phone,
          oldPassword: "",
          newPassword: "",
        }}
        enableReinitialize={true}
        onSubmit={handleSubmit}
        //    validationSchema={validationSchema}
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
            <h1 className="text-xl font-semibold mt-5"> Reset Password</h1>
            <h2 className="mt-5 text-sm">Verify phone number</h2>
            <div className="flex w-1/3">
              <div className="flex-grow  w-2/3">
                <div className="flex items-center pt-1 gap-2 ">
                  <TextInput
                    name="phone"
                    type="text"
                    placeholder="Your Phone Number"
                    label=""
                    value={values.phone}
                    onChange={(e: any) => {
                      setnumberlength(e.target.value.length);
                      setNumber(e.target.value);
                    }}
                    error={errors.phone}
                    istouched={touched.phone}
                  />
                  <button
                    onClick={() => handleotpverify()}
                    className="bg-blue-600 w-28 py-3  h-11 text-white px-2 mt-2 rounded-md"
                  >
                    {" "}
                    Get OTP{" "}
                  </button>
                  <div className="flex-grow   relative">
                    <TextInput
                      name="otp"
                      type="number"
                      placeholder="enter otp"
                      label=""
                      onChange={(e: any) => {
                        setOtp(e.target.value);
                      }}
                      error={errors.phone}
                      istouched={touched.phone}
                    />{" "}
                    <button
                      onClick={() => employerVerify()}
                      className="text-sm absolute top-2 h-11 text-white rounded-md -right-20 bg-blue-600  px-3 py-2 absolute"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {showpassward && (
              <div className="flex flex-col w-[30%]  mt-6">
                <TextInput
                  name="otp"
                  type="number"
                  placeholder="Enter old password"
                  label=" Old Password  "
                  onChange={(e: any) => {
                    setOtp(e.target.value);
                  }}
                  error={errors.phone}
                  istouched={touched.phone}
                />{" "}
                <TextInput
                  name="otp"
                  type="number"
                  placeholder="Enter new password"
                  label="New Password"
                  onChange={(e: any) => {
                    setFieldValue("newPassword", e.target.value);
                  }}
                  error={errors.phone}
                  istouched={touched.phone}
                />{" "}
              </div>
            )}
          </>
        )}
      </Formik>
    </div>
  );
}
