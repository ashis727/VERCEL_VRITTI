import { Constants } from "@/constants/constants";
import axios from "@/utils/axios";
import * as Yup from "yup";
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
export default class ClientController {
  private header = {
    headers: {
      Authorization: "",
    },
  };
  constructor(token?: string) {
    this.header = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }

  getMyClients = async (token?: string, searchString?: string) => {
    try {
      const { data } = await axios.get(`${Constants.clients}?${searchString}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (err) {
      throw err;
    }
  };
  getJobCategories = async () => {
    try {
      const { data } = await axios.get(`${Constants.jobCategories}`);
      return data;
    } catch (err) {
      throw err;
    }
  };
  getLanguage = async () => {
    try {
      const data = await axios.get(`${Constants.language}`);
      return data.data;
    } catch (err) {
      console.log(err);
    }
  };
  getIndustries = async () => {
    try {
      const { data } = await axios.get(`${Constants.industries}`);
      return data;
    } catch (err) {
      throw err;
    }
  };

  getqualification = async () => {
    try {
      const data = await axios.get(`${Constants.jobQualification}`);
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  getJobCategoriesDepartment = async (id: any) => {
    try {
      //   /masters/job-categories-departments/?category_id=2
      const { data } = await axios.get(
        `${Constants.jobCategoriesDepartment}?category_id=${id}`
      );
      return data;
    } catch (err) {
      throw err;
    }
  };

  getJobLocation = async () => {
    try {
      const { data } = await axios.get(`${Constants.jobLocation}`);
      return data;
    } catch (err) {
      throw err;
    }
  };
  postEmployerRequirements = async (token: string, values: any) => {
    try {
      const { data } = await axios.post(`${Constants.requirements}`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (err) {
      throw err;
    }
  };
  // employer req
  getRequirements = async (token: string) => {
    try {
      const data = await axios.get(`${Constants.getRequirements}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("first", data);
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  getNextReqData = async (token: string, page: string) => {
    try {
      const data = await axios.get(`${Constants.getNextReq}${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  getRequirementById = async (token: string, id: number) => {
    try {
      const data = await axios.get(`${Constants.getRequirements}${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log( data);
      return data;
    } catch (err) {
      console.log("err", err);
    }
  };
  deleteRequirements = async (token: string, i: any) => {
    try {
      const data = await axios.delete(`${Constants.deleteRequirements}${i}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("first", data);
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  updateRequirements = async (token: string, i: any) => {
    try {
      const data = await axios.get(`${Constants.updateRequirements}${i}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("first", data);
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  postupdateEmployerRequirements = async (
    token: string,
    id: any,
    values: any
  ) => {
    try {
      const { data } = await axios.put(
        `${Constants.requirements}${id}/`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    } catch (err) {
      throw err;
    }
  };

  getBLogs = async () => {
    try {
      const { data } = await axios.get(`${Constants.blog}`);
      return data;
    } catch (error) {
      return error;
    }
  };
}
