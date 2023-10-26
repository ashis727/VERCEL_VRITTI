"use client";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import TextInput from "@/components/textinput";
import Checkbox from "./Checkbox";
import ComboSelectBox from "./ComboSelectBox";


const validationSchema = Yup.object().shape({
    dob: Yup.string().required("Date of Birth is required"),
    gender: Yup.boolean().oneOf([true], "You must selected one."),
    country: Yup.string().required("Country is required"),
    city: Yup.string().required("city is required"),
    state: Yup.string().required("state is required"),
    experience: Yup.string(),
    curr_avail: Yup.string(),
    preferredtrade: Yup.string().required("preferred trade is required"),
    modeofinterview: Yup.string().required("Mode of Interview is required"),
    agree: Yup.boolean().oneOf([true], "You must selected this."),
    photo: Yup.mixed().required("You need to provide a file"),
    CV: Yup.mixed().required("You need to provide a file"),


});




export default function Contactinfo() {

    const countrys = [
        { value: "india", label: "india" },
        { value: "sri india", label: "sri india" },
        { value: "america", label: "america" },
    ];

    const countryData = {
        india: [
            { value: "india1", label: "india1" },
            { value: "india2", label: "india2" },
            { value: "india3", label: "india3" },
        ],
        sriindia: [
            { value: "srilanka1", label: "srilanka1" },
            { value: "srilanka2", label: "srilanka2" },
            { value: "srilanka3", label: "srilanka3" },
        ],
        america: [
            { value: "america1", label: "america1" },
            { value: "america2", label: "america2" },
            { value: "america3", label: "america3" },
        ],
    };

    const city = [
        { value: "srilanka1", label: "srilanka1" },
        { value: "srilanka2", label: "srilanka2" },
        { value: "srilanka3", label: "srilanka3" },
    ]

    const [selectedCountry, setSelectedCountry] = useState("");
    const [states, setStates] = useState([]);

    const handleCountryChange = ({ selectedValue }: any) => {
        setSelectedCountry(selectedValue);

        // Based on the selected country, update the states
        // setStates(countryData[selectedValue] || []);
    };


    const handleFormSubmit = () => {
        setTimeout(() => {
            alert("hi")
        }, 1000)
    };

    return (
        <Formik
            initialValues={{
                companyname: "",
                dateofjoining: "",
                dateofleaving: "",
                iscurrentemployee: "",
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


                <div className="mt-[10px]  p-5">
                    {/* <div className="text-center text-2xl font-bold">other Personal Information</div> */}

                    <div className="mt-2">

                        <TextInput
                            name={`dob`}
                            type={`date`}
                            label={`Date of Birth`}
                            value={values.dob}
                            onChange={handleChange(`dob`)}
                            onBlur={handleBlur('dob')}
                            error={errors?.dob}
                            istouched={touched?.dob}
                        />
                    </div>
                    <div className="mt-2">
                        <Checkbox
                            label="Gender"
                            placeholder=""
                            istouched={touched.gender}
                            name={"gender"}
                            onChange={handleChange("gender")}
                            error={errors?.gender}
                        />
                    </div>
                    <div className="mt-2">
                        <ComboSelectBox
                            label={"Country"}
                            name={"country"}
                            onChange={handleCountryChange}
                            placeholder=""
                            options={countrys}
                            error={errors.country}
                            istouched={touched.country}
                        />
                    </div>
                    <div className="mt-2">
                        <ComboSelectBox
                            label={"State"}
                            name={"state"}
                            onChange={handleChange("state")}
                            placeholder=""
                            options={states}
                            error={errors.state}
                            istouched={touched.state}
                        />
                    </div>
                    <div className="mt-2">
                        <ComboSelectBox
                            label={"City"}
                            name={"city"}
                            onChange={handleChange("city")}
                            placeholder=""
                            options={city}
                            error={errors.city}
                            istouched={touched.city}
                        />
                    </div>
                    <div className="mt-2">
                        <TextInput
                            name={`experience`}
                            type={`text`}
                            label={`Year of Experience`}
                            value={values.experience}
                            onChange={handleChange(`experience`)}
                            onBlur={handleBlur('experience')}
                            error={errors?.experience}
                            istouched={touched?.experience}
                        />
                    </div>
                    <div className="mt-2">
                        <TextInput
                            name={`photo`}
                            type={`file`}
                            label={`Upload passport size photo (PNG/JPG) `}
                            value={values.photo}
                            onChange={handleChange(`photo`)}
                            onBlur={handleBlur('photo')}
                            error={errors?.photo}
                            istouched={touched?.photo}
                        />
                    </div>
                    <div className="mt-2">
                        <TextInput
                            name={`curr_avail`}
                            type={`text`}
                            label={`Current Availibility`}
                            value={values.curr_avail}
                            onChange={handleChange(`curr_avail`)}
                            onBlur={handleBlur('curr_avail')}
                            error={errors?.curr_avail}
                            istouched={touched?.curr_avail}
                        />
                    </div>
                    <div className="mt-2">
                        <TextInput
                            name={`preferredtrade`}
                            type={`text`}
                            label={`Preferred Trade`}
                            value={values.preferredtrade}
                            onChange={handleChange(`preferredtrade`)}
                            onBlur={handleBlur('preferredtrade')}
                            error={errors?.preferredtrade}
                            istouched={touched?.preferredtrade}
                        />
                    </div>
                    <div className="mt-2">
                        <TextInput
                            name={`modeofinterview`}
                            type={`text`}
                            label={`Preferred mode of interview`}
                            value={values.modeofinterview}
                            onChange={handleChange(`modeofinterview`)}
                            onBlur={handleBlur('modeofinterview')}
                            error={errors?.modeofinterview}
                            istouched={touched?.modeofinterview}
                        />
                    </div>
                    <div className="mt-2">
                        <TextInput
                            name={`CV`}
                            type={`file`}
                            label={`Upload CV `}
                            value={values.CV}
                            onChange={handleChange(`CV`)}
                            onBlur={handleBlur('CV')}
                            error={errors?.CV}
                            istouched={touched?.CV}
                        />
                    </div>
                    <div className="mt-2">
                        <Checkbox
                            label="There are many variants of passages of lorem"
                            placeholder=""
                            istouched={touched.agree}
                            name={"agree"}
                            onChange={handleChange("agree")}
                            error={errors?.agree}
                        />
                    </div>

                </div>
            )}
        </Formik>
    );

}