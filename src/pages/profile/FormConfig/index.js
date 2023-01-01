import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { EMAIL_REGEX, PHONE_REGEX } from "../../../constant";
export const FORM_INPUT = {
  fullName: "fullName",
  userName: "userName",
  phoneNumber: "phoneNumber",
  address: "address",
  gender: "gender",
};

const schema = yup
  .object({
    [FORM_INPUT.fullName]: yup
      .string()
      .required("Full name cannot be blank")
      .min(2, "Full name must be at least 2 characters"),
    [FORM_INPUT.userName]: yup
      .string()
      .required("Full name cannot be blank")
      .min(2, "Full name must be at least 2 characters"),

    [FORM_INPUT.phoneNumber]: yup
      .string()
      .required("Phone number cannot be blank")
      .matches(PHONE_REGEX, "Phone number is not in the correct format")
      .min(10, "Phone number must be at least 10 characters")
      .max(10, "Phone number max 10 characters"),

    [FORM_INPUT.address]: yup
      .string()
      .required("Address cannot be blank")
      .min(2, "Address must be at least 2 characters"),
  })
  .required();

const formConfig = {
  resolver: yupResolver(schema),
  defaultValues: {
    [FORM_INPUT.fullName]: "",
    [FORM_INPUT.userName]: "",
    [FORM_INPUT.gender]: "",
    [FORM_INPUT.phoneNumber]: "",
    [FORM_INPUT.address]: "",
  },
};

export default formConfig;
