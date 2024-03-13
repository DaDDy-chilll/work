/* eslint-disable react/prop-types */
import { Box, Button, IconButton, Typography } from '@mui/material';
import CustomFormLabel from '../shared/CustomFormLabel';
import { Cancel, CloudUpload } from '@mui/icons-material';
import { colors } from '../../assets/theme/theme';
import { useState } from 'react';
import PDFSampleImage from '../../assets/images/PDF.png';

export const AttachmentInput = ({ setFiles }) => {
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
    setAttachments(
      attachments.filter((attachment) => attachment.name !== name),
    );
  };

  return (
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
  );
};
