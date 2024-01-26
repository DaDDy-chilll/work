/* eslint-disable react/prop-types */
import { Box, CircularProgress, MenuItem } from '@mui/material';
import { Formik } from 'formik';
import RichTextEditor from '../ui/RichTextEditor';
import FormActionButtons from '../ui/FormActionButtons';
import { useState } from 'react';
import { initialMentionValues, mentionSchema } from '../../schema';
import FormSelect from '../shared/FormSelect';
import { useMentionDocument } from '../../api/document';
import { colors } from '../../assets/theme/theme';
import CustomFormLabel from '../shared/CustomFormLabel';
import { useGetAllDepartments, useGetAllUsers } from '../../api';
import MultipleSelectWithCheckbox from '../shared/MultipleSelectWithCheckbox';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useQueryClient } from 'react-query';

const SelectReviewers = ({ department, setFieldValue }) => {
  const { data } = useGetAllUsers({ limit: 0, department });
  return (
    <MultipleSelectWithCheckbox
      data={data}
      setFieldValue={setFieldValue}
      field="reviewers"
    />
  );
};

const MentionForm = ({ onClick }) => {
  const [remark, setRemark] = useState('');

  const { id } = useParams();

  const { data: departments } = useGetAllDepartments({ limit: 0 });

  const { isLoading: mentionDocumentLoading, mutate: mentionDocumentMutation } =
    useMentionDocument();

  const queryClient = useQueryClient();

  const handleFormSubmit = (data) => {
    console.log({ data });
    const reviewers = data.reviewers.map((item) => item.id);
    mentionDocumentMutation(
      { id, data: { ...data, reviewers, remark } },
      {
        onSuccess: () => {
          toast.success('ok');
          queryClient.invalidateQueries(['document', id]);
          onClick();
        },
      },
    );
  };

  return (
    <Formik
      initialValues={initialMentionValues}
      validationSchema={mentionSchema}
      onSubmit={handleFormSubmit}
    >
      {(props) => (
        <form onSubmit={props.handleSubmit}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
              px: 5,
              py: 3,
            }}
          >
            <Box>
              <CustomFormLabel label="Department" required={true} />
              <FormSelect
                placeholder="Select Department"
                name="department"
                formProps={props}
              >
                {departments?.payload ? (
                  departments?.payload.map((item) => (
                    <MenuItem value={item._id} key={item._id}>
                      {item.name}
                    </MenuItem>
                  ))
                ) : (
                  <CircularProgress />
                )}
              </FormSelect>
            </Box>
            {props.values.department && (
              <SelectReviewers
                department={props.values.department}
                setFieldValue={props.setFieldValue}
              />
            )}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <CustomFormLabel label="Description" />
              <RichTextEditor text={remark} setText={setRemark} />
            </Box>
          </Box>
          <Box
            sx={{ borderTop: `1px solid ${colors.grey[400]}`, pb: 3, px: 5 }}
          >
            <FormActionButtons
              onClick={onClick}
              innerText="Submit"
              loading={mentionDocumentLoading}
              justifyContent="right"
              width="200px"
            />
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default MentionForm;
