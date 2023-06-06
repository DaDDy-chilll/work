import * as yup from "yup";

export const checkoutSchema = yup.object().shape({
    groupId: yup.string().required("Choose one of them"),
});

export const initialValues = {
    groupId: ""
};