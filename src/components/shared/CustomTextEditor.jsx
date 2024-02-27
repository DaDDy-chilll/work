/* eslint-disable react/prop-types */
import {
  convertToRaw,
  ContentState,
  convertFromHTML,
  EditorState,
} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const CustomTextEditor = ({ value, setValue, fieldName, disabled }) => {
  const handleEditorChange = (text) => {
    setValue(fieldName, text);
  };

  const [editorState, setEditorState] = useState(() =>
    value
      ? EditorState.createWithContent(
          ContentState.createFromBlockArray(
            convertFromHTML(value).contentBlocks,
          ),
        )
      : EditorState.createEmpty(),
  );

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);

    const descriptionHtml = draftToHtml(
      convertToRaw(editorState.getCurrentContent()),
    );

    handleEditorChange(descriptionHtml);
  };
  return (
    <Editor
      readOnly={disabled}
      onEditorStateChange={onEditorStateChange}
      editorState={editorState}
      editorClassName="editor"
      toolbarClassName="editor-toolbar"
      toolbar={{
        options: [
          'inline',
          'blockType',
          'fontSize',
          'fontFamily',
          'list',
          'textAlign',
          'colorPicker',
          'link',
          'emoji',
          'history',
        ],
      }}
    />
  );
};

export default CustomTextEditor;
