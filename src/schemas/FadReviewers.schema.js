import * as yup from "yup";

export const checkoutSchema = yup.object().shape({    
    groupId: yup.string().required("Work Flow is required"),
});

export const initialValues = {
    groupId: "",
};