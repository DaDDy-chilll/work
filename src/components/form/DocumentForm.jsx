/* eslint-disable react/prop-types */
import { Formik } from 'formik';
import { useState } from 'react';
import {
  createSchema,
  editAmountSchema,
  editSchema,
  initialValues,
} from '../../schema/document.schema';
import { Box, Button, IconButton, Typography } from '@mui/material';
import FormTextField from '../shared/FormTextField';
import { Cancel, CloudUpload } from '@mui/icons-material';
import FormActionButtons from '../ui/FormActionButtons';
import { colors } from '../../assets/theme/theme';
import PDFSampleImage from '../../assets/images/PDF.png';
import { useCreateRequest, useEditRequest } from '../../api';
import { toast } from 'react-toastify';
import { useQueryClient } from 'react-query';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import CustomFormLabel from '../shared/CustomFormLabel';
import { useAuth } from '../../hooks';
import SelectWorkflows from './SelectWorkflows';
import CustomTextEditor from '../shared/CustomTextEditor';
import { WORKFLOW_TYPES_LIST } from '../../constants';

const DocumentForm = ({ workflowType, oldData, onClick, originalDocumentId,orderId }) => {
  const { id } = useParams();
  const location = useLocation();

  const [files, setFiles] = useState([]);
  const [attachments, setAttachments] = useState([]);

  const handleFileChange = (event) => {
    const inputFiles = event.target.files;

    let files = [];
    let attachments = [];

    for (let i = 0; i < inputFiles?.length; i++) {
      const file = inputFiles[i];
      files.push(file);
      if (file.type?.includes('image')) {
        attachments.push({
          url: URL.createObjectURL(file),
          name: file.name,
        });
      } else {
        attachments.push({
          url: undefined,
          name: file.name,
        });
      }
    }
    setFiles((prev) => [...prev, ...files]);
    setAttachments((prev) => [...prev, ...attachments]);
  };

  const handleDelete = ({ name }) => {
    setFiles(files.filter((file) => file.name !== name));
    setAttachments(
      attachments.filter((attachment) => attachment.name !== name),
    );
  };

  const { mutate: createMutation, isLoading: createLoading } =
    useCreateRequest();

  const { mutate: editMutation, isLoading: editLoading } = useEditRequest();

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleCreate = (values) => {
    console.log('orderId',orderId)
    if(location.pathname.includes('purchase-order')){
      values = {...values,createdBy:Object.keys(WORKFLOW_TYPES_LIST)[1],originalDocumentId,orderId}
    }
    console.log('values',values)
    createMutation(
      { data: values, attachments: files },
      {
        onSuccess: () => {
          toast.success('ok');
          queryClient.invalidateQueries(['documents']);
          navigate('/purchase-request');
        },
        onSettled: () => {
          setFiles(undefined);
          setAttachments(undefined);
        },
      },
    );
  };

  const handleEdit = (values) => {
    console.log('values',values)
    if (!user.permissions.canEditAmount) {
      delete values.amount;
    }
    editMutation(
      { data: values, attachments: files, id },
      {
        onSuccess: () => {
          toast.success('ok');
          queryClient.invalidateQueries(['documents']);
          navigate('/my-requests');
        },
        onSettled: () => {
          setFiles(undefined);
          setAttachments(undefined);
        },
      },
    );
  };

  const { user } = useAuth();

  return (
    <Formik
      initialValues={oldData ? oldData : initialValues}
      validationSchema={
        user.permissions.canEditAmount && oldData
          ? editAmountSchema
          : oldData
          ? editSchema
          : createSchema
      }
      onSubmit={oldData ? handleEdit : handleCreate}
    >
      {(props) => 
     {
      console.log('form props',props)
      
       return(
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
              <CustomFormLabel label="Subject" />
              <FormTextField
                type="text"
                formProps={props}
                name="name"
                placeholder="Subject"
                multiline={true}
              />
            </Box>
            {!oldData && (
              <>
                <Box>
                  <CustomFormLabel label="Amount" />
                  <FormTextField
                    type="text"
                    formProps={props}
                    name="amount"
                    placeholder="Amount"
                  />
                </Box>
                <SelectWorkflows
                  workflowType={workflowType}
                  name="workflowId"
                  formProps={props}
                  type="normal"
                />
              </>
            )}

            {oldData && user.permissions.canEditAmount && (
              <Box>
                <CustomFormLabel label="Amount" />
                <FormTextField
                  type="text"
                  formProps={props}
                  name="amount"
                  placeholder="Amount"
                />
              </Box>
            )}

            <CustomTextEditor
              disabled={false}
              fieldName="description"
              setValue={props.setFieldValue}
              value={oldData?.description ?? ''}
            />

            <Box>
              <CustomFormLabel label="Attachments (Optional)" />
              <Box mt={1}>
                <input
                  type="file"
                  id="actual-btn"
                  hidden
                  multiple
                  onChange={(e) => handleFileChange(e)}
                  onClick={(e) => (e.currentTarget.value = '')}
                />
                <Button variant="contained" color="primary">
                  <label
                    htmlFor="actual-btn"
                    style={{ display: 'flex', alignItems: 'center' }}
                  >
                    <CloudUpload sx={{ mr: 1, fontSize: '22px' }} />
                    <Typography color={colors.white}>Upload File</Typography>
                  </label>
                </Button>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, my: 2 }}>
                {attachments &&
                  attachments.map(({ url, name }) => (
                    <div key={url} className="attachment_container">
                      <img src={url ?? PDFSampleImage} alt="attachment" />
                      <div className="attachment_delete_btn">
                        <IconButton onClick={() => handleDelete({ name })}>
                          <Cancel
                            sx={{
                              color: url ? colors.white[100] : colors.grey[800],
                              fontSize: '25px',
                            }}
                          />
                        </IconButton>
                      </div>
                      <Typography
                        variant="h5"
                        fontWeight="bold"
                        sx={{ wordWrap: 'break-word' }}
                        ml={1}
                        mt={1}
                      >
                        {name}
                      </Typography>
                    </div>
                  ))}
              </Box>
            </Box>
          </Box>
          <Box
            sx={{ borderTop: `1px solid ${colors.grey[400]}`, pb: 3, px: 5 }}
          >
            <FormActionButtons
              onClick={onClick}
              innerText={oldData ? 'Update' : 'Submit'}
              loading={oldData ? editLoading : createLoading}
              justifyContent="right"
              width="200px"
            />
          </Box>
        </form>
      )}
      
      }
    </Formik>
  );
};

export default DocumentForm;
