"use client";
import TextInput from "@/components/textinput";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";



const validationSchema = Yup.object().shape({
  companyname: Yup.string().required("Company Name is required"),
  dateofjoining: Yup.string().required("Date of Joining is required"),
  dateofleaving: Yup.string().required("Date of Joining is required"),
  iscurrentemployee: Yup.string().required("Date of Joining is required"),
  jobdesc: Yup.string().required("Date of Joining is required"),
});


export default function Personalinfo() {

  const handleFormSubmit = () => {
    setTimeout(() => {
      alert("hi")      
    }, 1000)
  };
  
  return (    
    <Formik
    initialValues={{
      companyname: "",
      dateofjoining:"",
      dateofleaving:"",
      iscurrentemployee:"", 
      jobdesc: "",
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
        
   
        <div className=" mt-[10px] p-5">
          {/* <div className="text-center text-2xl font-bold">Employment status</div> */}
         
            <div className="mt-2">
              <TextInput
                name={`companyname`}
                type={`text`}
                label={`company name`}
                value={values.companyname}
                onChange={handleChange(`companyname`)}
                onBlur={handleBlur('companyname')}
                error={errors?.companyname}
                istouched={touched?.companyname}
              />
            </div>
            <div className="mt-2">
              <TextInput
                name={`dateofjoining`}
                type={`date`}
                label={`Date of Joining`}
                value={values.dateofjoining}
                onChange={handleChange(`dateofjoining`)}
                onBlur={handleBlur('dateofjoining')}
                error={errors.dateofjoining}
                istouched={touched.dateofjoining}
              />
            </div>
            <div className="mt-2">
              <TextInput
                name={`dateofleaving`}
                type={`date`}
                label={`Date of Leaving`}
                value={values.dateofleaving}
                onChange={handleChange(`dateofleaving`)}
                onBlur={handleBlur('dateofleaving')}
                error={errors.dateofleaving}
                istouched={touched.dateofleaving}
              />
            </div>
            <div className="mt-2">
              <TextInput
                name={`iscurrentemployee`}
                type={`text`}
                label={`Is current Employee`}
                value={values.iscurrentemployee}
                onChange={handleChange(`iscurrentemployee`)}
                onBlur={handleBlur('iscurrentemployee')}
                error={errors.iscurrentemployee}
                istouched={touched.iscurrentemployee}
              />
            </div>
            <div className="mt-2">
              <TextInput
                name={`jobdesc`}
                type={`text`}
                label={`Job Description`}
                value={values.jobdesc}
                onChange={handleChange(`jobdesc`)}
                onBlur={handleBlur('jobdesc')}
                error={errors.jobdesc}
                istouched={touched.jobdesc}
              />
            </div>

         

          {/* <div className="mt-5 mb-4 bg-yellow-300 rounded-xl px-2 py-3 text-center cursor-pointer " onClick={handleFormSubmit}>
            <button type="submit"
            >
              submit
            </button>
          </div> */}

         
         
        </div>
      )}
    </Formik>
  );

}