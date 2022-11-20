import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export const FORM_INPUT = {
  fullName: "fullName",
  email: "email",
  phomeNumber: "phomeNumber",
  address: "address",
  gender: "gender",
};

const schema = yup
  .object({
    [FORM_INPUT.fullName]: yup
      .string()
      .required("Full name cannot be blank")
      .min(2, "Full name must be at least 2 characters"),
    [FORM_INPUT.email]: yup.string().required("Email cannot be blank"),
  })
  .required();

const formConfig = {
  resolver: yupResolver(schema),
  defaultValues: {
    [FORM_INPUT.fullName]: "",
    [FORM_INPUT.email]: "",
    [FORM_INPUT.gender]: "",
    [FORM_INPUT.phomeNumber]: "",
    [FORM_INPUT.address]: "",
  },
};

export default formConfig;
