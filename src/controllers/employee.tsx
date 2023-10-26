import { Constants } from "@/constants/constants";
import axios from "@/utils/axios";

export default class EmployeeController {
  //   static employeeverify(value: any) {
  //     throw new Error("Method not implemented.");
  //   }
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

  employeeverify = async (values: any) => {
    try {
      const { data } = await axios.post(Constants.employeeverify,  values );
      return data;
    } catch (err) {
      throw err;
    }
  };

  registerEmployee = async (values: any) => {
    try {
      const { data } = await axios.post(Constants.registerEmployee, values);
      return data;
    } catch (err) {
      throw err;
    }
  };

  employeverifyotp = async (email: any, type: any) => {
    try {
      const data = await axios.post(`${Constants.employesendotp}`, {
        email: email,
        type: type,
      });
      console.log("data", data);
      return data;
    } catch (error: any) {
      throw error;
    }
  };

  sendOtpToServer = async (otp: any, otpToken: any) => {
    // console.log("otp token", otp, otpToken);
    try {
      const { data } = await axios.post(`${Constants.employeesend_otp}`, {
        otp: otp,
        jwt_token: otpToken,
      });
      // console.log("data verify otp",data)
      return data;
    } catch (error) {
      throw error;
    }
  };
}
