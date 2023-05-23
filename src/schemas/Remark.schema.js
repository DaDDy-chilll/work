import * as yup from "yup";

export const checkoutSchema = yup.object().shape({
    remark: yup.string().required("Remark is required"),
});

export const initialValues = {
    remark: "",
};