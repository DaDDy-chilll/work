import * as yup from "yup";

export const checkoutSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("invalid email").required("Email is required"),

    password: yup.string().required("Password is required").min(8, "Password must be 8 characters long"),
        // .matches(/[0-9]/, "Password requires a number")
        // .matches(/[a-z]/, "Password requires a lowercase letter")
        // .matches(/[A-Z]/, "Password requires an uppercase letter")
        // .matches(/[^\w]/, "Password requires a symbol"),

    confirmPassword: yup.string().required("Confirm password is required").min(8, "Password must be 8 characters long")
        // .matches(/[0-9]/, "Password requires a number")
        // .matches(/[a-z]/, "Password requires a lowercase letter")
        // .matches(/[A-Z]/, "Password requires an uppercase letter")
        // .matches(/[^\w]/, "Password requires a symbol")
        .oneOf([yup.ref("password"), null], "Passwords do not match"),

    jobLabel: yup.string().required("Job Label is required"),
    // department: yup.string().required("Choose one of them"),
    // customDepartment: yup.string().required("Custom Department is required"),
    
    canApprove: yup.boolean(),
    canEdit: yup.boolean(),
    canPrepare: yup.boolean(),
    canVerify: yup.boolean(),
});

export const initialCreateValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    jobLabel: "",
    department: "",
    customDepartment: "",

    canApprove: false,
    canEdit: false,
    canPrepare: false,
    canVerify: false
};