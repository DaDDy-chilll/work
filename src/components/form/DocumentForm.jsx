import { Box, TextField } from "@mui/material"
import { useForm } from "react-hook-form";
import FormActionButtons from "../ui/FormActionButtons";

const DocumentForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleOnSubmit = handleSubmit(async (data) => {
        console.log(data);
    })

    return (
        <form onSubmit={handleOnSubmit}>
            <Box display="flex" flexDirection={'column'} gap={3}>
                <TextField
                    fullWidth
                    variant="filled"
                    label="Subject"
                    multiline
                    rows={6}
                    {...register('subject')}
                    error={!!errors.subject}
                />
                <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    {...register('email')}
                    error={!!errors.email}
                />

                <TextField
                    fullWidth
                    label="Job Label"
                    variant="outlined"
                    {...register('jobLabel')}
                    error={!!errors.jobLabel}
                />
            </Box>

            <FormActionButtons innerText="Create" loading={false} />
        </form>
    )
}

export default DocumentForm
