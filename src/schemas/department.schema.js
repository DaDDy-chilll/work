import * as yup from "yup";

export const checkoutSchema = yup.object().shape({
    name: yup.string().required("Department Name is required"),
});

export const initialValues = {
    name: "",
};