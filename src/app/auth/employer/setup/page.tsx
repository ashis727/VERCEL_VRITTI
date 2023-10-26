"use client";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Formik, FormikHelpers, useFormikContext } from "formik";
import TextInput from "@/components/textinput";
import Image from "next/image";
import Textarea from "@/components/controls/TextArea";
import Combobox from "@/components/controls/ComboBox";
import ClientController from "@/controllers/employerAuth";
import ComboBox from "@/components/controls/ComboBox";
import { useSession } from "next-auth/react";
import { useAppSelector } from "@/store";
import ThankYouModal from "@/app/employer/component/ThankYouModal";
const validationSchema = Yup.object().shape({
  prefix: Yup.number().required("prefix number required"),
  phone: Yup.string().max(15).required("phone number required"),
  address: Yup.string().required("address required"),
  license_no: Yup.string().required("license  number required"),
  tax_id: Yup.string().required("tax_id required"),
  website_url: Yup.string().required("website_url required"),
  registration_no: Yup.string().required("registration number required"),
  founding_year: Yup.string().required("founding_year required"),
  total_employees: Yup.string().required("total_employees required"),
  short_description: Yup.string().required("short_description  required"),
  description: Yup.string().required(" description required"),
  country: Yup.string().required("country required"),
  state: Yup.string().required(" state required"),
  // city: Yup.string().required("city required"),
  profile_image: Yup.string().required("profile_image required"),
  logo_image: Yup.string().required("logo_image required"),
});

type schema = {
  email: any;
  phone: number;
};
export default function Register() {
  const auth = new ClientController();

  const { data }: any = useSession();

  useState<any>(true);
  const [countries, setCountries] = useState<any>();
  const [countryCode, setCountryCode] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [preferredMode, setPreferredMode] = useState([]);
  const [Otp, setOtp] = useState("");
  const [numberlength, setnumberlength] = useState("");
  const [codelength, setcodelength] = useState<any>(10);
  const user = useAppSelector((state) => state.userReducer.user);
  const [number, setNumber] = useState<any>();
  const email = user?.email;
  let Token: any = user?.accessToken;

  const [otptoken, setotptoken] = useState("");
  const [checkNumber, setCheckNumber] = useState(false);
  const handlePhoneVerify = async (e: any) => {
    const values: schema = {
      email: "dummy@vrittigroup.com",
      phone: e.target.value,
    };
    if (e.target.value.length == codelength) {
      let value = {
        ...values,
      };
      console.log("value", value);
      await auth
        .postVerifyyUser(values)
        .then((res: any) => {
          console.log("first email andphone verifying", res.dataaccess);
          if (res.phone == false) {
            handleotpverify();
            setCheckNumber(false);
            // Send Otp To Phone Number
          }
        })
        .catch((err) => {
          console.log("error", err);
          setCheckNumber(true);
        });
    }
  };
  const handleotpverify = () => {
    auth
      .employersendPhoneotp(number, Token)
      .then((res: any) => {
        // console.log("first mobile otp verification", res.access);
        setotptoken(res.access);
        if (res.status == 200) {
        }
      })
      .catch((err: any) => {
        console.log("error", err);
      });
  };
  const [otpstatus, setOtpStatus] = useState(false);
  const employerVerify = async () => {
    console.log(otptoken);
    try {
      const data = await auth
        .employerVerifyOtp(Otp, otptoken)
        .then((res: any) => {
          console.log("first employerVerifyOtp res ", res.status);
          if (res.status == 200) {
            alert(" OTP Match successfully");
            setOtpStatus(true);
          }
        });
    } catch (error) {
      console.log(error);
      alert("Wrong OTP");
    }
  };

  const getDialCode = async () => {
    try {
      let data = await auth.EmployerPrefixCode(Token);
      // console.log("first dial code data", data);

      const arr = await Promise.all(
        data.map(async (item: any) => {
          // console.log(item.max_length);
          return {
            value: item.dial,
            label: item.dial,
            length: item.max_length,
          };
        })
      );

      return arr;
    } catch (error) {}
  };

  const [selectedState, setSelectedStata] = useState<any>(null);
  const [selecedCity, setSelectedcity] = useState<any>(null);
  const getCountryCode = async (inputString: string) => {
    try {
      let data = await auth.EmployerCountryCode(`search=${inputString}`);
      const arr = data.map((item: any) => {
        // console.log("daf", item.id);
        return { key: item.id, value: item.name, label: item.name };
      });
      // setCountries(arr);
      return arr;
    } catch (error) {}
  };
  const getStateData = async () => {
    // console.log("country name is", selectedState);
    try {
      const data = await auth.EmployerStateData(selectedState);
      const arr = await Promise.all(
        data.map(async (item: any) => {
          return { key: item.id, value: item.name, label: item.name };
        })
      );
      return arr;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {}, [selectedState]);

  const getCityData = async () => {
    try {
      let data = await auth.EmployerCityData(selectedState, selecedCity);
      const arr = await Promise.all(
        data.map(async (item: any) => {
          return { key: item.id, value: item.name, label: item.name };
        })
      );
      return arr;
    } catch (error) {
      console.log(error);
    }
  };
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {};
  const handleSubmit = async (values: any) => {
    const file = values.profile_image;
    const logo = values.logo_image;
    const formData = new FormData();
    formData.append("prefix", values.prefix);
    formData.append("phone", values.phone);
    formData.append("address", values.address);
    formData.append("license_no", values.license_no);
    formData.append("tax_id", values.tax_id);
    formData.append("website_url", values.website_url);
    formData.append("registration_no", values.registration_no);
    formData.append("founding_year", values.founding_year);
    formData.append("total_employees", values.total_employees);
    formData.append("short_description", values.short_description);
    formData.append("description", values.description);
    formData.append("country", values.country);
    formData.append("state", values.state);
    formData.append("city", values.city);
    formData.append("profile_image", file);
    formData.append("logo_image", logo);
    formData.append("is_completed", values.is_completed);
    console.log(" form formdata  ", formData);

    try {
      const data = await auth.PostemployerMe(formData, Token);
      console.log("first data setup api", data);

      setTimeout(() => {
        window.location.href = "/employer";
      }, 3000);
      setShowModal(true);
    } catch (err) {
      console.log("first err", err);
    }

    // }
    // else {
    //   alert("Please submit phone OTP");
    // }
  };

  return (
    <div>
      <Formik
        initialValues={{
          prefix: 0,
          phone: "",
          address: "",
          country: "",
          license_no: "",
          tax_id: "",
          website_url: "",
          registration_no: "",
          founding_year: "",
          total_employees: "",
          short_description: "",
          description: "",
          state: "",
          city: "",
          is_completed: true,
          profile_image: null,
          logo_image: null,
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
          <>
            <div className="flex items-center justify-center  mt-16">
              <div className=" bg-white  w-[800px] px-10 rounded-xl p-5">
                <div className="">
                  <div className="flex justify-center bg-white">
                    <Image
                      src="/avatar/virtti.jpg"
                      width={50}
                      height={50}
                      alt="Picture of the author"
                    />
                  </div>
                  <div className="text-3xl font-[600] text-center uppercase font-serif">
                    <h1>vritti</h1>
                    <p className="text-[8px] -mt-4">authentication employe </p>
                  </div>
                  <div className=" pb-4 text-left text-2xl capitalize">
                    <p className="text-sm text-stone-600">
                      elevate your access : registered useres,unleash
                      possibillties.
                    </p>
                  </div>
                </div>

                <div className="">
                  <div className="text-2xl font-[600] text-left flex items-center gap-4">
                    <h1>Register</h1>

                    <div className="w-10 h-1 bg-gray-600"></div>
                  </div>
                  <div className="space-y-4 py-4">
                    <div className="flex w-full">
                      <div className="flex-grow pr-2 mt-1 ">
                        <Combobox
                          label={""}
                          name={"prefix"}
                          onChange={(e: any) => {
                            setFieldValue("prefix", e.value);
                            // console.log("first event ", e);
                            if (e.length === null) {
                              setcodelength(15);
                            } else {
                              setcodelength(e.length);
                            }
                          }}
                          placeholder={"+91"}
                          loadOptions={getDialCode}
                          istouched={touched.prefix}
                          error={errors.prefix}
                        />
                      </div>
                      <div className="flex-grow  w-2/3">
                        <TextInput
                          name="phone"
                          type="number"
                          placeholder="Your Phone Number"
                          label=""
                          value={values.phone}
                          onChange={(e: any) => {
                            if (e.target.value.length <= codelength) {
                              setFieldValue("phone", e.target.value);
                              setnumberlength(e.target.value.length);
                              setNumber(e.target.value);
                              handlePhoneVerify(e);
                            }
                          }}
                          error={errors.phone}
                          istouched={touched.phone}
                        />
                        {checkNumber && (
                          <span className="texr-xs text-red-600">
                            Number Already Registered !
                          </span>
                        )}

                        {/* {values.phone.length=} */}
                        {codelength == numberlength && !checkNumber ? (
                          <div className="flex-grow   relative">
                            <label htmlFor="" className="text-xs ">
                              Enter OTP
                            </label>
                            <TextInput
                              name="otp"
                              type="number"
                              style={{ marginTop: "0px" }}
                              placeholder="123456"
                              label=""
                              onChange={(e: any) => {
                                if (e.target.value.length <= 6) {
                                  setOtp(e.target.value);
                                  setFieldValue(e.target.value);
                                }
                              }}
                              error={errors.phone}
                              istouched={touched.phone}
                            />{" "}
                            <button
                              onClick={() => {
                                employerVerify();
                              }}
                              className="text-sm absolute bg-blue-600 text-white py-[13px] top-8 right-0 rounded-md  px-2"
                            >
                              Submit
                            </button>
                            {otpstatus && (
                              <div className="text-xs text-green-600 mt-1">
                                OTP verified !
                              </div>
                            )}
                          </div>
                        ) : (
                          <div></div>
                        )}
                      </div>
                    </div>
                    <div>
                      <TextInput
                        name="license_no"
                        type="number"
                        placeholder="Your License Number"
                        label=""
                        value={values.license_no}
                        onChange={handleChange}
                        error={errors.license_no}
                        istouched={touched.license_no}
                      />
                    </div>
                    <div>
                      <TextInput
                        name="tax_id"
                        type="number"
                        placeholder="Your Tax Id"
                        label=""
                        value={values.tax_id}
                        onChange={handleChange}
                        error={errors.tax_id}
                        istouched={touched.tax_id}
                      />
                    </div>
                    <div>
                      <TextInput
                        name="website_url"
                        type="text"
                        placeholder="Your Website Url"
                        label=""
                        value={values.website_url}
                        onChange={handleChange}
                        error={errors.website_url}
                        istouched={touched.website_url}
                      />
                    </div>
                    <div>
                      <TextInput
                        name="registration_no"
                        type="number"
                        placeholder="Your Registration Number"
                        label=""
                        value={values.registration_no}
                        onChange={handleChange}
                        error={errors.registration_no}
                        istouched={touched.registration_no}
                      />
                    </div>
                    <div>
                      <TextInput
                        name="founding_year"
                        type="date"
                        placeholder={`Your Founding year: ${
                          values.founding_year || ""
                        }`}
                        label=""
                        value={values.founding_year}
                        onChange={handleChange}
                        error={errors.founding_year}
                        istouched={touched.founding_year}
                      />
                    </div>
                    <div>
                      <TextInput
                        name="total_employees"
                        type="number"
                        placeholder="Your Total Employees"
                        label=""
                        value={values.total_employees}
                        onChange={handleChange}
                        error={errors.total_employees}
                        istouched={touched.total_employees}
                      />
                    </div>
                    <div className="relative">
                      <TextInput
                        name="profile_image"
                        type="file"
                        label=""
                        onChange={(e: any) => {
                          setFieldValue("profile_image", e.target.files[0]);
                        }}
                        placeholder="Your Profile Image"
                        error={errors.profile_image}
                        istouched={touched.profile_image}
                        className="text-sm"
                        style={{ height: "45px" }}
                      />
                      <span className="absolute top-6 text-sm right-20 text-gray-400 font-semibold  ">
                        profile Image
                      </span>
                    </div>
                    <div className="relative">
                      <TextInput
                        name="logo_image"
                        type="file"
                        label=" "
                        onChange={(e: any) => {
                          setFieldValue("logo_image", e.target.files[0]);
                        }}
                        placeholder="Your Logo Image"
                        error={errors.logo_image}
                        istouched={touched.logo_image}
                        style={{ height: "45px" }}
                      />

                      <span className="absolute top-6 text-sm right-[135px] text-gray-400 font-semibold  ">
                        logo
                      </span>
                    </div>

                    <div
                      className=" "
                      onClick={() => {
                        !selectedState ? "" : setSelectedStata(0);
                      }}
                    >
                      <Combobox
                        label={""}
                        name={"country"}
                        onChange={(e: any) => {
                          console.log(e.id);
                          setFieldValue("country", e.key);
                          setSelectedStata(JSON.stringify(e.key));
                          getStateData();
                        }}
                        placeholder={"Select Country"}
                        loadOptions={getCountryCode}
                        istouched={touched.country}
                        error={errors.country}
                      />
                    </div>
                    {selectedState && (
                      <div
                        className=""
                        onClick={() => {
                          !selecedCity ? "" : setSelectedcity(0);
                        }}
                      >
                        <Combobox
                          label={""}
                          name={"state"}
                          onChange={(e: any) => {
                            console.log(e.id);
                            setFieldValue("state", e.key);
                            setSelectedcity(JSON.stringify(e.key));
                          }}
                          placeholder={"Select State"}
                          loadOptions={getStateData}
                          istouched={touched.state}
                          error={errors.state}
                        />
                      </div>
                    )}

                    {selecedCity && (
                      <div className="">
                        <Combobox
                          label={""}
                          name={"city"}
                          onChange={(e: any) => {
                            setFieldValue("city", e.key);
                          }}
                          placeholder={"Select City"}
                          loadOptions={getCityData}
                          istouched={undefined}
                          error={undefined}
                        />
                      </div>
                    )}

                    <div className="">
                      <Textarea
                        name="address"
                        type="text"
                        label={""}
                        value={values.address}
                        onChange={handleChange}
                        placeholder="Your Address"
                        error={errors.address}
                        istouched={touched.address}
                        style={{ height: "45px" }}
                      />
                    </div>
                    <div className="">
                      <Textarea
                        name="short_description"
                        type="text"
                        label={""}
                        value={values.short_description}
                        onChange={handleChange}
                        placeholder="Your Short Description"
                        error={errors.short_description}
                        istouched={touched.short_description}
                        style={{ height: "45px" }}
                      />
                    </div>

                    <div className="">
                      <Textarea
                        name="description"
                        type="text"
                        label={""}
                        value={values.description}
                        onChange={handleChange}
                        placeholder="Your Description"
                        error={errors.description}
                        istouched={touched.description}
                        style={{ height: "45px" }}
                      />
                    </div>
                  </div>
                  <div className="px-2 py-3 mt-5  text-center bg-blue-600 cursor-pointer rounded-xl  my-6 mb-12">
                    <button
                      type="submit"
                      className="text-white"
                      onClick={handleSubmit}
                    >
                      submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </Formik>
      <div className="absolute top-0 left-0 z-50 w-full">
        <ThankYouModal
          isVisible={showModal}
          onClose={handleCloseModal}
          content={"thank you , Your Profile is underline verification ."}
        />
      </div>
    </div>
  );
}
