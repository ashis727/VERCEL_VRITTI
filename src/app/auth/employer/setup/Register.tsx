"use client";
import React, { useEffect, useState } from "react";
import { Formik, useFormikContext } from "formik";
import TextInput from "@/components/textinput";
import Image from "next/image";
import Textarea from "@/components/controls/TextArea";
import Combobox from "@/components/controls/ComboBox";
import ClientController from "@/controllers/employerAuth";
import { useSession } from "next-auth/react";
import { useAppSelector } from "@/store";
import { schema } from "./page";

export default function Register() {
  const auth = new ClientController();

  const { data }: any = useSession();

  const loadOptions = async () => {
    return [
      { value: "chocolate", label: "Chocolate" },
      { value: "strawberry", label: "Strawberry" },
      { value: "vanilla", label: "Vanilla" },
    ];
  };
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
  // console.log("first user here", email);
  let Token: any = user?.accessToken;
  // console.log("first session token setup : ", Token);
  const formik = useFormikContext();
  const { values, submitForm } = useFormikContext();

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
          console.log("first email andphone verifying", res.data);
          if (res.phone == false) {
            handleotpverify();
            // Send Otp To Phone Number
          }
        })
        .catch((err) => {
          console.log("error", err);
          formik.setFieldError("phone", "already exists");
        });
    }
  };
  const handleotpverify = () => {
    auth
      .employersendPhoneotp(number, Token)
      .then((res: any) => {
        console.log("first mobile otp verification", res);
        // store.dispatch(
        //   setUser({ ...user, accessToken: res?.data?.access })
        // );
        if (res.status == 200) {
          // setShowOtp(true);
          // setPhoneField(false);
        }
      })
      .catch((err: any) => {
        console.log("error", err);
      });
  };
  const employerVerify = async () => {
    const data = await auth.employerVerifyOtp(Otp, Token).then((res: any) => {
      console.log("first employerVerifyOtp res ", res);
    });
  };

  // const handleSubmit = (
  //   values: schema,
  //   { setFieldError, setSubmitting }: FormikHelpers<schema>
  // ) => {
  //   console.log("first");
  //   console.log("values ", values);
  //   setSubmitting(true);
  //   try {
  //     const data = auth.PostemployerMe(values, Token);
  //     console.log("first data setup api", data);
  //   } catch (err) {
  //     console.log("first err", err);
  //   }
  //   // update({ is_completed: true });
  // };
  //country data
  // useEffect(() => {
  //   // setIsReady(true);
  //   auth
  //     .EmployerCountryCode()
  //     .then((res) => {
  //       let Cdata: any = [];
  //       res.map((i: any) => {
  //         let obj = {
  //           name: i.name,
  //           id: i.id,
  //           // label: i.name,
  //           // value: i.id,
  //         };
  //         Cdata.push(obj);
  //       });
  //       console.log("first country data ", Cdata);
  //       setCountries(Cdata);
  //       // EmptyArr.push(data);
  //     })
  //     .catch((err) => {
  //       console.debug(err);
  //     });
  // }, []);
  // console.log("EmptyArr", EmptyArr);
  const getStates = (id: any) => {
    setStates([]);
    setCities([]);
    auth
      .EmployerStateData(id)
      .then((state) => {
        let data: any = [];
        state.map((i: any) => {
          let obj = {
            name: i.name,
            id: i.id,
          };
          data.push(obj);
        });

        setStates(data);
      })
      .catch((err) => {
        console.debug(err);
      });
  };

  const getDialCode = async () => {
    try {
      let data = await auth.EmployerPrefixCode(Token);
      console.log("first dial code data", data);

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

  const [selectedState, setSelectedStata] = useState<any>(0);
  const [selecedCity, setSelectedcity] = useState<any>(0);
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
    console.log("country name is", selectedState);
    try {
      const data = await auth.EmployerStateData(selectedState);
      console.log("data", data);
      const arr = await Promise.all(
        data.map(async (item: any) => {
          // console.log("daf", item.id);
          return { key: item.id, value: item.name, label: item.name };
        })
      );
      // console.log("arr", arr);
      // setStates(arr);
      return arr;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {}, [selectedState]);

  // const [state, setState] = useState([]);
  const getCityData = async () => {
    console.log("ids are ,", selectedState, selecedCity);
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

  const handleSubmit = async (
    values: any
    // values: schema,
    // { setFieldError, setSubmitting }: FormikHelpers<schema>
  ) => {
    console.log("first");
    console.log("values ", values);
    // setSubmitting(true);
    try {
      const data = await auth.PostemployerMe(values, Token);
      console.log("first data setup api", data);
    } catch (err) {
      console.log("first err", err);
    }
    // update({ is_completed: true });
  };

  return (
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
        profile_image: "",
        logo_image: "",
      }}
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
          <div className="flex items-center justify-center  mt-24">
            <div className=" bg-white  w-[400px] rounded-xl p-5">
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
                  <div>wddd {codelength}</div>
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
                          console.log("first event ", e);
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
                          setFieldValue("phone", e.target.value);
                          setnumberlength(e.target.value.length);
                          setNumber(e.target.value);
                          handlePhoneVerify(e);
                        }}
                        error={errors.phone}
                        istouched={touched.phone}
                      />
                      {/* {values.phone.length=} */}
                      {codelength == numberlength ? (
                        <div className="flex-grow   relative">
                          <TextInput
                            name="otp"
                            type="number"
                            placeholder="123456"
                            label="Enter OTP"
                            onChange={(e: any) => {
                              setOtp(e.target.value);

                              console.log("first otp ", e.target.value);
                            }}
                            error={errors.phone}
                            istouched={touched.phone}
                          />{" "}
                          <button
                            onClick={() => {
                              console.log("first otp", Otp);
                              employerVerify();
                            }}
                            className="text-sm absolute top-10 right-0  px-2"
                          >
                            Submit
                          </button>
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
                      value={values.profile_image}
                      onChange={handleChange}
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
                      value={values.logo_image}
                      onChange={handleChange}
                      placeholder="Your Logo Image"
                      error={errors.logo_image}
                      istouched={touched.logo_image}
                      style={{ height: "45px" }}
                    />

                    <span className="absolute top-6 text-sm right-[135px] text-gray-400 font-semibold  ">
                      logo
                    </span>
                  </div>

                  {/* <ComboBox
                      data={countries}
                      popupTitle="Select Country"
                      title="Select Countr
                      
                      y"
                      isSelectSingle
                      onSelect={(e: any) => {
                        getStates(e);
                        setFieldValue("country", e);
                      }}
                      label="Country"
                      style={{
                        // paddingTop: 2,
                        borderRadius: 5000,
                        backgroundColor: "#26384dbd",
                        borderColor:
                          errors.country && touched.country ? "red" : "#6B7280",
                      }}
                      error={errors.country}
                      touched={touched.country}
                    /> */}

                  <div className="">
                    <Combobox
                      label={""}
                      name={"country"}
                      onChange={(e: any) => {
                        console.log(e.id);
                        setFieldValue("country", e.key);
                        console.log("object", JSON.stringify(e.key));

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
                    <div className="">
                      <Combobox
                        label={""}
                        name={"state"}
                        onChange={(e: any) => {
                          console.log(e.id);
                          setFieldValue("state", e.key);
                          console.log("object state", JSON.stringify(e));
                          setSelectedcity(JSON.stringify(e.key));
                          // setSelectedStata(JSON.stringify(e.key));
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
                          // getCityData(values.country, values.state);
                          setFieldValue("city", e.key);
                        }}
                        placeholder={"Select City"}
                        loadOptions={getCityData}
                        istouched={touched.city}
                        error={errors.city}
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
  );
}
