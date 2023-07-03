import * as yup from "yup";

export const checkoutSchema = yup.object().shape({
    groupName: yup.string().required("Work Flow Title is required"),
    description: yup.string().required("Work Flow Description is required"),
});

export const initialValues = {
    groupName: "",
    description: ""
};