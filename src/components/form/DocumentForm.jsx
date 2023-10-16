/* eslint-disable react/prop-types */
import { Formik } from 'formik';
import { useState } from 'react';
import {
  createSchema,
  editAmountSchema,
  editSchema,
  initialValues,
} from '../../schema/document.schema';
import { Box, Button, IconButton, MenuItem, Typography } from '@mui/material';
import FormTextField from '../shared/FormTextField';
import FormSelect from '../shared/FormSelect';
import RichTextEditor from '../ui/RichTextEditor';
import { Cancel, CloudUpload } from '@mui/icons-material';
import FormActionButtons from '../ui/FormActionButtons';
import { colors } from '../../assets/theme/theme';
import PDFSampleImage from '../../assets/images/PDF.png';
import {
  useCreateRequest,
  useEditRequest,
  useGetAllWorkflows,
} from '../../api';
import { getDepartmentsFromWorkflow } from '../../helpers';
import { toast } from 'react-toastify';
import { useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import WorkflowRoute from '../ui/WorkflowRoute';
import CustomFormLabel from '../shared/CustomFormLabel';
import { useAuth } from '../../hooks';

const DocumentForm = ({ oldData, onClick }) => {
  const { id } = useParams();

  const { data } = useGetAllWorkflows({ limit: 0 });

  let workflows;

  if (data?.payload) {
    workflows = data?.payload?.map((workflow) => ({
      ...workflow,
      departments: getDepartmentsFromWorkflow(workflow.reviewers),
    }));
  }

  const [description, setDescription] = useState(
    oldData ? oldData.description : '',
  );

  const [files, setFiles] = useState([]);
  const [pdfFiles, setPdfFiles] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  const handleFileChange = (event) => {
    const inputFiles = event.target.files;

    let files = [];
    let fileUrls = [];
    let pdfFiles = [];

    for (let i = 0; i < inputFiles?.length; i++) {
      const file = inputFiles[i];
      files.push(file);
      if (file.type?.includes('image')) {
        fileUrls.push(URL.createObjectURL(file));
      } else {
        pdfFiles.push(file.name);
      }
    }
    setFiles((prev) => [...prev, ...files]);
    setImageUrls((prev) => [...prev, ...fileUrls]);
    setPdfFiles((prev) => [...prev, ...pdfFiles]);
  };

  const handleDelete = ({ url, name }) => {
    if (url) {
      setImageUrls(imageUrls.filter((imageUrl) => imageUrl !== url));
    }
    if (name) {
      setPdfFiles(pdfFiles.filter((pdfFile) => pdfFile !== name));
    }
  };

  const { mutate: createMutation, isLoading: createLoading } =
    useCreateRequest();

  const { mutate: editMutation, isLoading: editLoading } = useEditRequest();

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleCreate = (values) => {
    createMutation(
      { data: { ...values, description }, attachments: files },
      {
        onSuccess: () => {
          toast.success('ok');
          queryClient.invalidateQueries(['documents']);
          navigate('/my-requests');
        },
        onSettled: () => {
          setFiles(undefined);
          setPdfFiles(undefined);
          setImageUrls(undefined);
        },
      },
    );
  };

  const handleEdit = (values) => {
    editMutation(
      { data: { ...values, description }, attachments: files, id },
      {
        onSuccess: () => {
          toast.success('ok');
          queryClient.invalidateQueries(['documents']);
          navigate('/my-requests');
        },
        onSettled: () => {
          setFiles(undefined);
          setPdfFiles(undefined);
          setImageUrls(undefined);
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
              <CustomFormLabel label="Subject" />
              <FormTextField
                type="text"
                formProps={props}
                name="name"
                placeholder="Subject"
                multiline={true}
              />
            </Box>
            {!oldData ? (
              <Box>
                <CustomFormLabel label="Select Work Flow" />
                <FormSelect
                  placeholder="Select Work Flow"
                  name="workflowId"
                  formProps={props}
                >
                  {workflows &&
                    workflows?.map((item) => (
                      <MenuItem value={item._id} key={item._id}>
                        <WorkflowRoute
                          name={item?.name}
                          departments={item?.departments}
                        />
                      </MenuItem>
                    ))}
                </FormSelect>
              </Box>
            ) : (
              user.permissions.canEditAmount && (
                <Box>
                  <CustomFormLabel label="Amount" />
                  <FormTextField
                    type="text"
                    formProps={props}
                    name="amount"
                    placeholder="Amount"
                  />
                </Box>
              )
            )}

            <RichTextEditor text={description} setText={setDescription} />

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
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mt: 2 }}>
                {imageUrls &&
                  imageUrls.map((url) => (
                    <div key={url} className="attachment_container">
                      <img src={url} alt="attachment" />
                      <div className="attachment_delete_btn">
                        <IconButton onClick={() => handleDelete({ url })}>
                          <Cancel
                            sx={{ color: colors.white[100], fontSize: '25px' }}
                          />
                        </IconButton>
                      </div>
                    </div>
                  ))}
                {pdfFiles &&
                  pdfFiles.map((pdfFile) => (
                    <div key={pdfFile} className="attachment_container">
                      <img src={PDFSampleImage} alt="attachment" />
                      <div className="attachment_delete_btn">
                        <IconButton
                          onClick={() => handleDelete({ name: pdfFile })}
                        >
                          <Cancel
                            sx={{ color: colors.grey[800], fontSize: '25px' }}
                          />
                        </IconButton>
                      </div>
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
    </Formik>
  );
};

export default DocumentForm;
