import * as yup from "yup";

export const checkoutSchema = yup.object().shape({
    name: yup.string().required("Subject is required"),
    description: yup.string().required("Description is required"),
    attachments: yup.mixed()
        .nullable(),
    workflowId: yup.string()
    // .notRequired()
    // .test("FILE_SIZE", "Uploaded file is too big.", 
    //     value => !value || (value && value.size <= FILE_SIZE))
    // .test("FILE_FORMAT", "Uploaded file has unsupported format.", 
    //     value => !value || (value && SUPPORTED_FORMATS.includes(value.type)))
});

export const claimCheckoutSchema = yup.object().shape({
    name: yup.string().required("Subject is required"),
    description: yup.string().required("Description is required"),
    type: yup.string().required("Document Type is required"),
    attachments: yup.mixed()
        .nullable(),
    workflowId: yup.string()
});

export const editAmountSchema = yup.object().shape({
    name: yup.string().required("Subject is required"),
    description: yup.string().required("Description is required"),
    amount: yup.number("Amount should be number value"),
    type: yup.string().required("Document Type is required"),
    attachments: yup.mixed()
        .nullable(),
    workflowId: yup.string()
});

export const initialCreateValues = {
    name: "",
    description: "",
    attachments: [],
    // groupId: "",
};