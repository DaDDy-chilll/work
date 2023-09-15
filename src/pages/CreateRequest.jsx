import { Box, Paper, TextField, Typography } from '@mui/material';
import { colors } from '../assets/theme/theme';
import { transformDate } from '../helpers';
import { Field, Formik } from 'formik';
import FormSelect from '../components/shared/FormSelect';

const FormInput = () => (
  <TextField fullWidth variant="outlined" placeholder="Name" sx={{ mt: 1 }} />
);

// const SelectDocumentType = () => <FormSelect />;

const CreateRequest = () => {
  //   const handleOnSubmit = () => {};

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        my: 2,
        mx: 'auto',
        width: '70%',
        border: '1px solid red',
      }}
    >
      <Typography variant="h1">Create New Request</Typography>
      <Paper sx={{ px: 4, py: 2 }}>
        <Box
          sx={{
            borderBottom: `1px solid ${colors.grey[400]}`,
            pb: 1,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          {transformDate(Date.now())}
        </Box>
        {/* <form onSubmit={handleOnSubmit}>
          <Box display="flex" flexDirection="column" gap="1rem">
            <TextField fullWidth label="Email" variant="outlined" />
          </Box>

          <FormActionButtons innerText="Submit" loading={false} />
        </form> */}
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
          }}
          onSubmit={async (values) => {
            await new Promise((r) => setTimeout(r, 500));
            alert(JSON.stringify(values, null, 2));
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box>
              <label htmlFor="name">Subject</label>
              <Field id="name" name="name" as={FormInput} />
            </Box>
            <Box>
              <label htmlFor="name">Select Work Flow</label>
              <Field id="name" name="name" as={FormSelect} />
            </Box>

            <Box>
              <label htmlFor="name">Document Type</label>
              <Field id="name" name="type" as={FormSelect} />
            </Box>

            <button type="submit">Submit</button>
          </Box>
        </Formik>
      </Paper>
    </Box>
  );
};

export default CreateRequest;
