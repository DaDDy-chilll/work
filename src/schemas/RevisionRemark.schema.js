import * as yup from "yup";

export const checkoutSchema = yup.object().shape({
    remark: yup.string().required("Remark is required"),
    department: yup.string().required("Choose one of them"),
});

export const initialValues = {
    remark: "",
    department: ""
};