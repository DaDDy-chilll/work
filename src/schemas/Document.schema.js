import * as yup from "yup";

export const checkoutSchema = yup.object().shape({
    name: yup.string().required("Subject is required"),
    description: yup.string().required("Description is required"),
    attachments: yup.mixed()
    .nullable(),
    // .notRequired()
    // .test("FILE_SIZE", "Uploaded file is too big.", 
    //     value => !value || (value && value.size <= FILE_SIZE))
    // .test("FILE_FORMAT", "Uploaded file has unsupported format.", 
    //     value => !value || (value && SUPPORTED_FORMATS.includes(value.type)))
    // groupId: yup.string().required("Reviewers Group is required"),
});

export const claimCheckoutSchema = yup.object().shape({
    name: yup.string().required("Subject is required"),
    description: yup.string().required("Description is required"),
    amount: yup.number().positive().required("Amount is required"),
    type: yup.string().required("Payment Type is required"),
    attachments: yup.mixed()
    .nullable(),
});

export const initialCreateValues = {
    name: "",
    description: "",
    attachments: [],
    // groupId: "",
};