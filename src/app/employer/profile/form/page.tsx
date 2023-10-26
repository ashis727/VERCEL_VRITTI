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
import { BiX } from "react-icons/bi";
import ThankYouModal from "@/app/employer/component/ThankYouModal";
import { CiSettings } from "react-icons/ci";
import ResetPassword from "../../component/ResetPassword";
import CardPrototype from "@/components/ui/CardPrototype";
const validationSchema = Yup.object().shape({
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
  city: Yup.string().required("city required"),
  // profile_image: Yup.string().required("profile_image required"),
  // logo_image: Yup.string().required("logo_image required"),
});

type schema = {
  email: any;
  phone: number;
};
export default function Register() {
  const auth = new ClientController();

  const { data }: any = useSession();

  useState<any>(true);

  const user = useAppSelector((state) => state.userReducer.user);

  const email = user?.email;
  let Token: any = user?.accessToken;

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
  const [submit, setSubmit] = useState(false);
  const handleSubmit = async (values: any) => {
    setSubmit(!submit);
    console.log("first", values);
    const file = values.profile_image;
    const logo = values.logo_image;
    const formData = new FormData();

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
      handleShowModal();
      // window.location.href = "/employer";
    } catch (err) {
      console.log("first err", err);
    }

    // }
    // else {
    //   alert("Please submit phone OTP");
    // }
  };
  const [formdata, setFormData] = useState<any>([]);
  const [profileImage, setprofileImage] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  useEffect(() => {
    const getEmployer = async () => {
      try {
        const data = await auth.getEmployer(Token);
        console.log("first data ", data);
        setFormData(data);

        console.log("first state", formdata);
      } catch (error) {
        console.log(error);
      }
    };
    getEmployer();
  }, [submit]);

  return (
    <div className="rounded-lg">
      <Formik
        initialValues={{
          address: formdata.address || "",
          country: formdata.country || "",
          license_no: formdata.license_no || "",
          tax_id: formdata.tax_id || "",
          website_url: formdata.website_url || "",
          registration_no: formdata.registration_no || "",
          founding_year: formdata.founding_year || "",
          total_employees: formdata.total_employees || "",
          short_description: formdata.short_description || "",
          description: formdata.description || "",
          state: formdata.state || "",
          city: formdata.city || "",
          is_completed: true,
          profile_image: null,
          logo_image: null,
        }}
        enableReinitialize={true}
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
            <div className="  w-full   ">
              <div className=" bg-white rounded-lg my-2   p-8 ">
                {/* <div className="">
                  <div className="flex justify-start bg-white">
                    <Image
                      src="/avatar/virtti.jpg"
                      width={50}
                      height={50}
                      alt="Picture of the author"
                      className=""
                    />
                  </div>
                  <div className="text-3xl font-[600] text-left uppercase font-serif">
                    <h1>vritti</h1>
                  </div>
                  <div className=" pb-4 text-left text-2xl capitalize ">
                    <p className="text-sm text-stone-600">
                      elevate your access : registered useres,unleash
                      possibillties.
                    </p>
                  </div>
                </div> */}

                <div className="">
                  <div className="relative flex">
                    {/* <Image src={require()}/>        */}
                    <div className="relative flex items-center  gap-2 justify-between">
                      <div className="relative   flex flex-col">
                        <label
                          htmlFor=""
                          className=" text-left  text-gray-700 gap-4"
                        >
                          <span className="flex items-center text-3xl ">
                            {" "}
                            Edit Profile <CiSettings className="mx-4" />
                          </span>
                        </label>
                        <label htmlFor="" className=" text-left mt-6 ">
                          Profile Photo
                        </label>
                        <div className="  ">
                          <img
                            src={`${formdata.profile_image}`}
                            width={200}
                            height={200}
                            alt="Profile Image"
                            className="rounded-full border-2 w-20 h-20 flex justify-center items-center bg-fill"
                          />{" "}
                        </div>

                        <button
                          onClick={() => setprofileImage(!profileImage)}
                          className="absolute px-3 py-[5px] text-sm text-gray-800 top-[124px] left-[3px] bg-gray-200 bg-opacity-70 rounded-b-full"
                        >
                          update
                        </button>
                      </div>

                      {/* <button className="flex items-center gap-1 justify-end bg-blue-400 text-white px-4 py-2 text-sm rounded-md  ">
                        <span className="inline-block">Edit</span>
                     
                      </button> */}
                    </div>
                  </div>

                  {profileImage && (
                    <div className="flex">
                      <TextInput
                        name="profile_image"
                        type="file"
                        label=""
                        onChange={(e: any) => {
                          setFieldValue("profile_image", e.target.files[0]);
                        }}
                        placeholder="Update Profile Image"
                        error={errors.profile_image}
                        istouched={touched.profile_image}
                        className="text-sm"
                        style={{ height: "45px" }}
                      />
                      <button
                        onClick={() => {
                          setprofileImage(!profileImage);
                        }}
                        className="  px-3 h-12 mt-2 rounded-r-md text-sm text-white  bg-blue-600 bg-opacity-50  "
                      >
                        <BiX className="h-6 w-6" />
                      </button>
                    </div>
                  )}
                  <div className="space-y-4 py-4">
                    <div className="  items-center gap-4">
                      <label htmlFor="" className="w-[35%] text-right  ">
                        License Number
                      </label>

                      <div className="   ">
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
                    </div>
                    <div className="   items-center gap-4 ">
                      <label htmlFor="" className="w-[35%] text-right  ">
                        Tax Id
                      </label>
                      <div className=" ">
                        <TextInput
                          name="tax_id"
                          type="number"
                          placeholder="Your Tax Id"
                          label=" "
                          value={values.tax_id}
                          onChange={handleChange}
                          error={errors.tax_id}
                          istouched={touched.tax_id}
                        />
                      </div>
                    </div>
                    <div className="   items-center gap-4">
                      <label htmlFor="" className="w-[35%] text-right  ">
                        Website Url
                      </label>
                      <div className=" ">
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
                      </div>{" "}
                    </div>

                    <div className="   items-center gap-4 ">
                      <label htmlFor="" className="w-[35%] text-right  ">
                        Registration Number
                      </label>
                      <div className=" ">
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
                      </div>{" "}
                    </div>
                    <div className="   items-center gap-4 ">
                      <label htmlFor="" className="w-[35%] text-right  ">
                        Founding year
                      </label>
                      <div className=" ">
                        <TextInput
                          name="founding_year"
                          type="date"
                          placeholder={`Your Founding year: ${
                            values.founding_year || ""
                          }`}
                          label=" "
                          value={values.founding_year}
                          onChange={handleChange}
                          error={errors.founding_year}
                          istouched={touched.founding_year}
                        />
                      </div>
                    </div>
                    <div className="   items-center gap-4 ">
                      <label htmlFor="" className="w-[35%] text-right  ">
                        Total Employees
                      </label>
                      <div className=" ">
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
                    </div>

                    <div className="   items-center gap-4 ">
                      <label htmlFor="" className="w-[35%] text-right  ">
                        Country
                      </label>
                      <div
                        className=" "
                        onClick={() => {
                          !selectedState ? "" : setSelectedStata(0);
                        }}
                      >
                        <Combobox
                          label={""}
                          name={"country"}
                          styles="font-bold   text-[16px]"
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
                    </div>
                    {selectedState ? (
                      <div
                        className=""
                        onClick={() => {
                          !selecedCity ? "" : setSelectedcity(0);
                        }}
                      >
                        <label htmlFor="" className="w-[35%] text-right  ">
                          State
                        </label>
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
                    ) : (
                      ""
                    )}
                    {selecedCity ? (
                      <div className="">
                        <label htmlFor="" className="w-[35%] text-right  ">
                          City
                        </label>
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
                    ) : (
                      ""
                    )}
                    {/* {!selectedState ? (
                      <div className="   items-center gap-4 ">
                        <label htmlFor="" className="w-[35%] text-right  ">
                          State
                        </label>
                        <div className=" ">
                          <Combobox
                            label=""
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
                      </div>
                    ) : (
                      ""
                    )} */}

                    {/* {!selecedCity ? (
                      <div className="   items-center gap-4 ">
                        <label htmlFor="" className="w-[35%] text-right  ">
                          City
                        </label>
                        <div className=" ">
                          <Combobox
                            label=""
                            name={"city"}
                            onChange={(e: any) => {
                              setFieldValue("city", e.key);
                            }}
                            placeholder={"Select City"}
                            loadOptions={getCityData}
                            istouched={touched.city}
                            error={errors.city}
                          />
                        </div>
                      </div>
                    ) : (
                      ""
                    )} */}
                  </div>

                  <div className="    items-center gap-4 ">
                    <label htmlFor="" className="w-[35%] text-right  ">
                      Address
                    </label>
                    <div className=" ">
                      <Textarea
                        name="address"
                        type="text"
                        label=" "
                        value={values.address}
                        onChange={handleChange}
                        placeholder="Your "
                        error={errors.address}
                        istouched={touched.address}
                        style={{ height: "100px" }}
                      />
                    </div>
                  </div>
                  <div className="   items-center gap-4 mt-4 ">
                    <label htmlFor="" className="w-[35%] text-right  ">
                      Description
                    </label>
                    <div className=" ">
                      <Textarea
                        name="description"
                        type="text"
                        label=""
                        value={values.description}
                        onChange={handleChange}
                        placeholder="Your Description"
                        error={errors.description}
                        istouched={touched.description}
                        style={{ height: "100px" }}
                      />
                    </div>
                  </div>
                  <div className="   items-center gap-4 mt-4 ">
                    <label htmlFor="" className="w-[35%] text-right  ">
                      Short Description
                    </label>
                    <div className=" ">
                      <Textarea
                        name="short_description"
                        type="text"
                        label=""
                        value={values.short_description}
                        onChange={handleChange}
                        placeholder="Your Short Description"
                        error={errors.short_description}
                        istouched={touched.short_description}
                        style={{ height: "100px" }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="   items-center   mt-4 ">
                      <label htmlFor="" className="w-[35%] text-right  ">
                        Logo Image
                      </label>
                      <div className="">
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
                      </div>
                    </div>
                  </div>

                  <div className=" mt-10    flex  justify-start text-center  cursor-pointer  my-6 mb-12">
                    <button
                      type="submit"
                      className="text-white   bg-blue-600   rounded-md px-14 py-1 w-1/3w  "
                      onClick={handleSubmit}
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className=" absolute top-0  left-0 w-full   ">
              <ThankYouModal
                isVisible={showModal}
                onClose={handleCloseModal}
                content={"successfully updated"}
              />
            </div>
          </>
        )}
      </Formik>
      <div>
        <ResetPassword />
      </div>
    </div>
  );
}
