import { Constants } from "@/constants/constants";
import axios from "@/utils/axios";

export default class ClientController {
  private header = {
    headers: {
      Authorization: "",
    },
  };

  constructor(token?: any) {
    // console.log(" token", token);
    this.header = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }
  employerme = async () => {
    try {
      let { data } = await axios.get(`${Constants.getemployerme}`, this.header);
      // console.log("data", data);
      return data;
    } catch (err) {
      // console.log(err);
    }
  };
  getMyClients = async (token?: string, searchString?: string) => {
    try {
      const { data } = await axios.get(
        `${Constants.clients}?${searchString}`,
        this.header
      );
      return data;
    } catch (err) {
      throw err;
    }
  };
  registerUser = async (userData: any) => {
    // console.log("userData", userData);
    try {
      // // console.log("axioseee", axios);
      const { data } = await axios.post(Constants.registerEmployer, userData);
      return data;
    } catch (err) {
      throw err;
    }
  };
  sendOtpToUser = async (values: any) => {
    try {
      // // console.log("axioseee", axios);
      const { data } = await axios.post(Constants.SEND_OTP, values);
      return data;
    } catch (err) {
      throw err;
    }
  };

  sendOtpToUserByEmail = async (values: any) => {
    try {
      // // console.log("axioseee", axios);
      const { data } = await axios.post(
        Constants.otpSendOnEmailSettings,
        values
      );
      return data;
    } catch (err) {
      throw err;
    }
  };
  confirmPassword = async (values: any) => {
    try {
      // // console.log("axioseee", axios);
      const { data } = await axios.post(Constants.resetPassword, values);
      return data;
    } catch (err) {
      throw err;
    }
  };
  postregisteremployer = async ({ values }: any) => {
    try {
      let { data } = await axios.post(`${Constants.registerEmployer}`, {
        values,
      });
      return data;
    } catch (err) {
      // console.log(err);
    }
  };

  SendRegisterOTP = async (email: string) => {
    try {
      const res = await axios.post(`${Constants.otpSendOnEmail}`, {
        email: email,
        type: "employer",
      });
      return res;
    } catch (error: any) {
      // console.debug(error);
      throw error;
    }
  };

  VerifyEmployer = async (email: string) => {
    try {
      const res = await axios.post(`${Constants.userVerify}`, {
        email: email,
      });
      return res;
    } catch (error: any) {
      // console.debug(error);
      throw error;
    }
  };

  VerifyEmployerWithOtpToken = async (otp: any, token: string) => {
    // console.log("token", token);
    try {
      const res = await axios.post(`${Constants.verifyOtpSettings}`, {
        otp: otp,
        jwt_token: token,
      });
      // console.log("res------", res);
      return res;
    } catch (error: any) {
      // console.debug(error);
      throw error;
    }
  };

  EmployerPrefixCode = async (token?: string) => {
    try {
      const { data } = await axios.get(`${Constants.employerprefix_no}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (err) {
      throw err;
    }
  };

  EmployerCountryCode = async (search: string) => {
    try {
      const { data } = await axios.get(
        `${Constants.employercountry}?${search}`,
        this.header
      );
      return data;
    } catch (err) {
      throw err;
    }
  };

  EmployerStateData = async (id: string) => {
    // console.log(id);
    try {
      const { data } = await axios.get(
        `${Constants.employercountry}${id}/states/`,
        {
          headers: {
            Authorization: `Bearer ${id}`,
          },
        }
      );
      // // console.log("state_data",data);
      return data;
    } catch (err) {
      throw err;
    }
  };

  EmployerCityData = async (country: any, state: any) => {
    // console.log("first", country, state);
    try {
      const { data } = await axios.get(
        `${Constants.employercountry}${country}/states/${state}/cities/`
      );
      // // console.log("city data",data);
      return data;
    } catch (err) {
      throw err;
    }
  };
  // /employer/me/  employerMe
  PostemployerMe = async (values: any, token: string) => {
    try {
      let { data } = await axios.put(`${Constants.employerMe}`, values, {
        headers: {
          Authorization: `Bearer${token}`,
        },
      });
      return data;
    } catch (err) {
      // console.log(err);
    }
  };
  // emplyer setup and verification
  postVerifyyUser = async (values: any) => {
    // // console.log("first data", values, token);
    try {
      let { data } = await axios.post(`${Constants.employerverify}`, values);
      return data;
    } catch (err) {
      // console.log(err);
    }
  };
  employerVerifyOtp = async (value: any, token: string) => {
    try {
      let data = await axios.post(
        `${Constants.verifyOtpemployer}`,
        { otp: value, jwt_token: token }
        // {
        //   headers: {
        //     Authorization: `Bearer${token}`,
        //   },
        // }
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  employersendPhoneotp = async (value: any, token: any) => {
    try {
      let { data } = await axios.post(`${Constants.mobileVerity}`, value, {
        headers: {
          Authorization: `Bearer${token}`,
        },
      });
      // console.log("first", data);
      return data;
    } catch (err) {
      // console.log(err);
    }
  };
  getEmployer = async (token: string) => {
    try {
      let { data } = await axios.get(`${Constants.employerMe}`, {
        headers: {
          Authorization: `Bearer${token}`,
        },
      });
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  // changepassword 
  changePassword = async (values:any , token :string) => {
    try{
      const data = await axios.put(`${Constants.changePassword}`, values , {
        headers : {
          Authorization : `Bearer${token}`
        }
      })
      return data ; 

    } catch (err) {
      console.log(err) ;
    }
  }
}
