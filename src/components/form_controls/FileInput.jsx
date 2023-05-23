import { Typography } from '@mui/material';
import React from 'react'
import FileUpload from 'react-mui-fileuploader'
import { colors } from '../../utils/theme';

const FileInput = ({ onFilesChange, value }) => {
  return (
    <FileUpload
      // showPlaceholderImage={false}
      imageSrc="https://cdn-icons-png.flaticon.com/512/5305/5305480.png"

      title={<Typography variant="h5" fontWeight='bold' color={colors.grey[600]}>Attach File (Optional)</Typography>}
      leftLabel={<Typography variant="h3" fontWeight='bold' color={colors.white[100]}>Drag & Drop to Upload Files</Typography>}
      header={""}
      rightLabel={""}
      buttonLabel="Browse Files"

      multiFile={true}
      onFilesChange={onFilesChange}
      onContextReady={({files}) => {
        files = value
      }}
    />
  )
}

export default FileInput
