export class Constants {
  static API_URL = "https://backend.vrittigroup.com/"; // Define with an initial value
  // static API_URL = "http://192.168.0.24:8000/"; // Define with an initial value
  static X_API_KEY: "X API Key";

  static loginEmployer = `${Constants.API_URL}employer/login/`;
  static me = `${Constants.API_URL}employer/me/`;
  static registerEmployer = `${Constants.API_URL}employer/register/`;
  static authenticateLawyer = `${Constants.API_URL}employer/auth/`;
  static SEND_OTP = `${Constants.API_URL}settings/send-otp/`;
  static resetPassword = `${Constants.API_URL}employer/forget-password/`;
  static changePassword = `${Constants.API_URL}employer/change-password/`;
  static otpSendOnEmail = `${Constants.API_URL}employer/send-verify-otp/`;
  static otpSendOnEmailSettings = `${Constants.API_URL}settings/send-verify-otp/`;
  static userVerify = `${Constants.API_URL}employer/verify-user/`;
  static verifyOtp = `${Constants.API_URL}employer/verify-otp/`;
  static requirements = `${Constants.API_URL}employer/requirements/`;
  static verifyOtpSettings = `${Constants.API_URL}settings/verify-otp/`;
  static language = `${Constants.API_URL}localization/languages/`;
  static checkIfUserExists = `${Constants.API_URL}customer/check-if-user-exists/`;
  static update = `${Constants.API_URL}customer/me/update`;
  static caseCategories = `${Constants.API_URL}cases/categories/`;
  static caseTemplates = `${Constants.API_URL}cases/templates/`;
  static caseStructures = `${Constants.API_URL}cases/my/`;
  static case = `${Constants.API_URL}cases/my/`;
  static caseOutputs = `${Constants.API_URL}cases/case-outputs/`;
  static clients = `${Constants.API_URL}customer/my-clients/`;
  static usage = `${Constants.API_URL}cases/usage/`;
  static verificationByEmail = `${Constants.API_URL}customer/user-verification-by-email/`;
  static employeeverify = `${Constants.API_URL}employee/verify-user/`;
  static employesendotp = `${Constants.API_URL}settings/send-verify-otp/`;
  static employeesend_otp = `${Constants.API_URL}settings/verify-otp/`;
  static registerEmployee = `${Constants.API_URL}employee/register/`;
  static employerprefix_no = `${Constants.API_URL}masters/dial-codes/`;
  static employercountry = `${Constants.API_URL}localization/countries/`;

  static hr = `${Constants.API_URL}hr/`;
  static hr_login = `${Constants.hr}login/`;
  static hr_me = `${Constants.hr}me/`;

  static technical_hr = `${Constants.API_URL}technical-hr`;
  static technical_hr_login = `${Constants.technical_hr}login/`;
  static technical_hr_me = `${Constants.technical_hr}me/`;

  //Masters
  static jobCategories = `${Constants.API_URL}masters/job-categories/`;
  static industries = `${Constants.API_URL}masters/industries/`;
  static jobCategoriesDepartment = `${Constants.API_URL}masters/job-categories-departments/`;
  static jobQualification = `${Constants.API_URL}masters/qualification-type/`;

  //Local
  static jobLocation = `${Constants.API_URL}localization/job-locations/`;
  //Employer
  static getRequirements = `${Constants.API_URL}employer/requirements/`;

  static getNextReq = `${Constants.API_URL}/employer/requirements/?page=`;
  static deleteRequirements = `${Constants.API_URL}employer/requirements/`;
  static updateRequirements = `${Constants.API_URL}employer/requirements/`;
  static employerMe = `${Constants.API_URL}employer/me/update/`;
  static getemployerme = `${Constants.API_URL}employer/me/`;
  static employerverify = `${Constants.API_URL}employer/verify-user/`;
  static mobileVerity = `${Constants.API_URL}settings/send-mobile-otp/`;
  static verifyOtpemployer = `${Constants.API_URL}settings/verify-otp/`;
  static blog = `${Constants.API_URL}blogs/blogs/`;
  static blogCategories = `${Constants.API_URL}blogs/category/`;
}
