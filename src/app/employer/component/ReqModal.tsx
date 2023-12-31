"use client";
import CardPrototype from "@/components/ui/CardPrototype";
import React, { useEffect, useState } from "react";
import { FaPhotoVideo, FaUserCircle } from "react-icons/fa";
import TextBox from "@/components/controls/TextBox";
import Combobox from "@/components/controls/ComboBox";
import Textarea from "@/components/controls/TextArea";
import ClientController from "@/controllers/employer";
import { Formik } from "formik";
import * as Yup from "yup";
import { useSession } from "next-auth/react";
import TextInput from "@/components/textinput";
import { BiCloset, BiCross, BiWindowClose, BiX } from "react-icons/bi";
import ThankYouModal from "@/app/employer/component/ThankYouModal";
const validationSchema = Yup.object().shape({
  job_title: Yup.string().required("Job Title is required"),
  job_short_description: Yup.string().required(
    "Job Short Description is required"
  ),
  description: Yup.string().required("Description is required"),
  workplace_type: Yup.string().required("Workplace Type is required"),
  job_location: Yup.string().required("Job Location is required"),
  employment_type: Yup.string().required("Employment Type is required"),
  industry: Yup.string().required("Industry is required"),
  job_category: Yup.string().required("Job Category is required"),
  job_department: Yup.string().required("Job Department is required"),
  preferred_qualification: Yup.string().required(
    "Preferred Qualification is required"
  ),
  experience: Yup.number().required("Experience is required"),
  salary: Yup.number().required("Salary is required"),
  application_deadline: Yup.date().required("Application Deadline is required"),
  language_requirements: Yup.string().required(
    "Language Requirements is required"
  ),
  image: Yup.mixed().required("Image is required"),
  additional_documents: Yup.mixed().required(
    "Additional Documents is required"
  ),
});
export default function ReqModal(props: any) {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNoYWhhdEBhbGFkaW5udGVjaC5pbiIsImlkIjoxMSwic2VjcmV0X3Rva2VuIjoiNGU1ZDExYmUtNmM0YS00M2JiLTg4YzYtMjFiOWMxOWUzZTA2In0.rjua7vpzmdlnysi9eUO08mSWLaeWo1JlD7R1DWTBUVU";
  const requirements = new ClientController();
  const { id, setSelectedid } = props;

  console.log("first id for update", id);
  const [reqData, setReqData] = useState<any>([]);
  const [joblocation, setjobLocation] = useState();
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const check = async () => {
      if (id) {
        try {
          const data = await requirements.updateRequirements(token, id);
          console.log("first req data from update", data?.data);
          setReqData(data?.data);
          setjobLocation(data?.data?.job_location?.name);
          return data;
        } catch (err) {
          console.log(err);
        }
      }
    };
    check();
  }, [id]);

  const Requirements = new ClientController();

  const { data } = useSession();
  const Token: any = data?.user?.image;
  console.log("token", data);
  const [selectedcategory, setSelectedCategory] = useState<any>(0);
  //  // console.log("sASf", data?.user?.image);
  const job_category = async () => {
    try {
      let data = await Requirements.getJobCategories();
      //  // console.log("first job categories", data);
      const arr = await Promise.all(
        data.map(async (item: any) => {
          return { key: item.id, label: item.name, value: item.value };
        })
      );
      // console.log("first job categories arr", arr);
      return arr;
    } catch (error) {}
  };

  const job_department = async () => {
    // console.log("first inside api", selectedcategory);
    try {
      let data = await Requirements.getJobCategoriesDepartment(
        selectedcategory
      );
      // console.log("first job departments", data);
      const arr = await Promise.all(
        data.map(async (item: any) => {
          return { value: item.name, label: item.name, key: item.id };
        })
      );
      return arr;
    } catch (error) {
      // console.log("first", error);
    }
  };

  const language_requirements = async () => {
    try {
      let data = await Requirements.getLanguage();
      // console.log("language new ", data);
      const arr = await Promise.all(
        data.map(async (item: any) => {
          //  // console.log("job_location new ", data.results);
          return { value: item.name, label: item.name, key: item.id };
        })
      );
      // console.log("arr", arr);
      return arr;
    } catch (error) {}
  };
  // language_requirements();
  const job_location = async () => {
    try {
      let data = await Requirements.getJobLocation();
      // console.log("first new data", data);
      const arr = await Promise.all(
        data.results.map(async (item: any) => {
          // console.log("job_location new ", data.results);
          return { value: item.name, label: item.name, key: item.id };
        })
      );
      return arr;
    } catch (error) {}
  };
  const industries = async () => {
    try {
      let data = await Requirements.getIndustries();
      // console.log("first industries Data", data);
      const arr = await Promise.all(
        data.map(async (item: any) => {
          //  // console.log("job_location new ", data.results);
          return { value: item.name, label: item.name, key: item.id };
        })
      );
      // console.log("arr", arr);
      return arr;
    } catch (error) {}
  };

  // industries();
  const preferred_qualification = async () => {
    try {
      let data: any = await Requirements.getqualification();
      // console.log("first getqualification", data);
      const arr = data.data.map((item: any) => {
        //  // console.log("job_location new ", data.results);
        return { value: item.name, label: item.name, key: item.id };
      });
      // console.log("arr q", arr);
      return arr;
    } catch (error) {}
  };
  // preferred_qualification();

  const workplace_type = async () => {
    return [
      { value: "O", label: "Onsite" },
      { value: "H", label: "Hybrid" },
      { value: "R", label: "Remote" },
    ];
  };

  const employment_type = async () => {
    return [
      { value: "F", label: "Fulltime" },
      { value: "P", label: "Part Time" },
      { value: "C", label: "Contract" },
      { value: "T", label: "Temporary" },
      { value: "V", label: "Volunteer" },
      { value: "I", label: "Internship" },
    ];
  };
  const formData = new FormData();
  const handleSubmit = (values: any) => {
    console.log("first upadte values : ");
    const file = values?.image;
    const addFile = values?.additional_documents;

    formData.append("job_title", values.job_title);
    formData.append("job_short_description", values.job_short_description);
    formData.append("workplace_type", values.workplace_type);
    formData.append("job_location", values.job_location);
    formData.append("employment_type", values.employment_type);
    formData.append("industry", values.industry);
    formData.append("job_category", values.job_category);
    formData.append("job_department", values.job_department);
    formData.append("preferred_qualification", values.preferred_qualification);
    formData.append("experience", values.experience);
    formData.append("salary", values.salary);
    formData.append("application_deadline", values.application_deadline);
    formData.append("language_requirements", values.language_requirements);
    // formData.append("document", file, file.name);
    formData.append("image", file);
    formData.append("additional_documents", addFile);
    formData.append("description", values.description);

    Requirements.postupdateEmployerRequirements(token, id, formData)
      .then((res) => {
        // console.log("first response ", res);
        handleShowModal();
        setTimeout(() => {
          setSelectedid("");
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // console.log("first data  ", formData);
  // console.log("first jl ", reqData?.job_location?.name);

  // console.log("first JL ", joblocation);
  return (
    <div>
      <Formik
        initialValues={{
          job_title: reqData.job_title,
          job_short_description: reqData.job_short_description,
          workplace_type: reqData.workplace_type,
          job_location: reqData.job_location,
          employment_type: reqData.employment_type,
          industry: reqData.industry,
          job_category: reqData.job_category,
          job_department: reqData.job_department,
          preferred_qualification: reqData.preferred_qualification,
          experience: reqData.experience,
          salary: reqData.salary,
          application_deadline: reqData.application_deadline,
          language_requirements: reqData.language_requirements,
          image: reqData.image,
          additional_documents: reqData.additional_documents,
          description: reqData.description,
        }}
        enableReinitialize={true}
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
          <div className="space-y-12 rounded-md  bg-white p-4 w-[55vw]">
            <div className="border-b border-gray-900/10 pb-12">
              <div className="w-full flex   justify-between items-center">
                {" "}
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Update Requirements
                </h2>
                <button
                  onClick={() => {
                    setSelectedid("");
                  }}
                >
                  <BiX className="w-6 h-6" />
                </button>
              </div>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Please fill the require details
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 h-[50vh] overflow-y-scroll scrollbar-hidden ">
                <div className="sm:col-span-3">
                  <TextBox
                    label="Job Title"
                    name="job_title"
                    placeholder={"title"}
                    error={errors.job_title}
                    istouched={touched.job_title}
                    value={values.job_title} // Pass the value from the state variable
                    onChange={handleChange}
                  />
                </div>
                <div className="sm:col-span-3">
                  <TextBox
                    label="Job Short Description"
                    name="job_short_description"
                    placeholder="Job Short Description"
                    error={errors.job_title}
                    istouched={touched.job_short_description}
                    value={values.job_short_description} // Pass the value from the state variable
                    onChange={handleChange}
                  />
                </div>
                <div className="col-span-full">
                  <div className="mt-2">
                    <TextBox
                      label="Description"
                      name="description"
                      value={values.description}
                      error={errors.description}
                      istouched={touched.description}
                      placeholder="description"
                      className="block w-full  rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <Combobox
                    label={"workplace_type Type"}
                    error={errors.workplace_type}
                    istouched={touched.workplace_type}
                    name="workplace_type"
                    onChange={(e: any) => {
                      // console.log("Selected value:", e.key);
                      setFieldValue("workplace_type", e.value);
                    }}
                    loadOptions={workplace_type}
                    placeholder={"Select workplace_type type"}
                    value={values.workplace_type}
                  />
                </div>
                <div className="sm:col-span-3">
                  <Combobox
                    label={"Job Location"}
                    error={errors.job_location}
                    istouched={touched.job_location}
                    name="job_location"
                    onChange={(e: any) => {
                      // console.log("Selected value job  location:", e.key);
                      setFieldValue("job_location", e.key);
                    }}
                    loadOptions={job_location}
                    placeholder={"Select City"}
                    // value={{ value: 2, label: joblocation }}
                  />
                </div>
                <div className="sm:col-span-3">
                  <Combobox
                    label={"Employment Type"}
                    error={errors.employment_type}
                    istouched={touched.employment_type}
                    name="employment_type"
                    onChange={(e: any) => {
                      //  // console.log("Selected value:", e.label);
                      setFieldValue("employment_type", e.value);
                    }}
                    loadOptions={employment_type}
                    placeholder={"Select Employment Type"}
                    //   value={values.employment_type}
                  />
                </div>
                <div className="sm:col-span-3">
                  <Combobox
                    label={"Sectors/industry"}
                    error={errors.industry}
                    istouched={touched.industry}
                    name="industry"
                    onChange={(e: any) => {
                      // console.log("Selected value for industry:", e.key);
                      setFieldValue("industry", e.key);
                    }}
                    loadOptions={industries}
                    placeholder={"Select Industry"}
                    //   value={values.industry}
                  />
                </div>

                <div className="sm:col-span-3">
                  <Combobox
                    label={"Job Category"}
                    name="job_category"
                    error={errors.job_category}
                    istouched={touched.job_category}
                    onChange={(e: any) => {
                      // console.log("Selected value here aaaaaaaaaaaaaaaaaa:", e.key   );
                      setFieldValue("job_category", e.key);
                      setSelectedCategory(e.key);
                    }}
                    loadOptions={job_category}
                    placeholder={"Select Category"}
                    //    value={values.job_category}
                  />
                </div>
                <div className="sm:col-span-3">
                  {selectedcategory != "" && (
                    <Combobox
                      label={"Job Department"}
                      error={errors.job_department}
                      istouched={touched.job_department}
                      name="job_department"
                      onChange={(e: any) => {
                        //  // console.log("Selected value jd:", e.key);
                        setFieldValue("job_department", e.key);
                      }}
                      //     value={values.job_department}
                      loadOptions={() => job_department()}
                      placeholder={"Select Department"}
                    />
                  )}
                </div>

                <div className="sm:col-span-3">
                  <Combobox
                    label={" Preferred Qualification"}
                    error={errors.preferred_qualification}
                    istouched={touched.preferred_qualification}
                    name="preferred_qualification"
                    onChange={(e: any) => {
                      //  // console.log("Selected value:", e.key);
                      setFieldValue("preferred_qualification", e.value);
                    }}
                    //     value={values.job_department}
                    loadOptions={preferred_qualification}
                    placeholder={"Select preferred qualification"}
                  />
                </div>
                <div className="sm:col-span-3">
                  <TextBox
                    label="experience"
                    name="experience"
                    placeholder="experience"
                    error={errors.experience}
                    istouched={touched.experience}
                    value={values.experience}
                    onChange={handleChange}
                  />
                </div>
                <div className="sm:col-span-3">
                  <TextBox
                    label="salary"
                    name="salary"
                    placeholder="salary"
                    error={errors.salary}
                    istouched={touched.salary}
                    value={values.salary}
                    onChange={handleChange}
                  />
                </div>
                <div className="sm:col-span-3">
                  <TextBox
                    label="Application application_deadline Timeline"
                    name="application_deadline"
                    type="date"
                    placeholder="Date"
                    error={errors.application_deadline}
                    istouched={touched.application_deadline}
                    value={values.application_deadline}
                    onChange={handleChange}
                  />
                </div>
                <div className="sm:col-span-3">
                  <Combobox
                    label={"Language"}
                    error={errors.language_requirements}
                    istouched={touched.language_requirements}
                    name="language_requirements"
                    onChange={(e: any) => {
                      //  // console.log("Selected value here language:", e.key);
                      setFieldValue("language_requirements", e.key);
                      // setSelectedCategory(e.key);
                    }}
                    loadOptions={language_requirements}
                    placeholder={"Select language_requirements"}
                    //    value={values.job_category}
                  />
                </div>
                {/* <div className="sm:collanguage_requirements-span-3">
                  <TextBox
                    label="language_requirements"
                    name="language_requirements"
                    value={values.language_requirements}
                    placeholder="language_requirements"
                    istouched={undefined}
                    onChange={handleChange}
                  />
                </div> */}
                <div className="sm:col-span-3">
                  <TextInput
                    label="Image"
                    name="image"
                    type="file"
                    placeholder="Upload file"
                    error={errors.image}
                    istouched={touched.image}
                    // value={values.image}
                    // onChange={handleChange("image")}
                    onChange={(e: any) => {
                      // console.log("image file", e.target.value);
                      setFieldValue("image", e.target.files[0]);
                    }}
                    // onChange={(e: any) => {
                    //    // console.log("first img", e.target.value);
                    //   setFieldValue("image", e.target.value);
                    // }}
                  />
                </div>

                <div className="sm:col-span-3">
                  <TextInput
                    label="additional_documents"
                    name="additional_documents"
                    type="file"
                    placeholder="additional_documents"
                    error={errors.additional_documents}
                    istouched={touched.additional_documents}
                    // value={values.additional_documents}
                    onChange={(e: any) => {
                      // console.log("image file", e.target.value);
                      setFieldValue("additional_documents", e.target.files[0]);
                    }}
                    // onChange={
                    // (e: any) => {
                    //    // console.log(" first docs ", e.target.value);
                    //   setFieldValue("additional_documents", e.target.value);
                    // }}
                  />
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                onClick={() => {
                  setSelectedid("");
                }}
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
                className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save
              </button>
            </div>
          </div>
        )}
      </Formik>
      <div className=" absolute top-0  left-0 w-full ">
        <ThankYouModal
          isVisible={showModal}
          onClose={handleCloseModal}
          content={"successfully updated"}
        />
      </div>
    </div>
  );
}
