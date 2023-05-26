import * as yup from "yup";

export const checkoutSchema = yup.object().shape({
    groupName: yup.string().required("Work Flow Title is required"),
});

export const initialValues = {
    groupName: "",
};