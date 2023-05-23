import { ContentState, convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import React, { useState } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { colors } from '../../utils/theme';

const RichTextEditor = ({ setFieldValue, value, placeholder }) => {
    const prepareDraft = (value) => {
        const draft = htmlToDraft(value);
        const contentState = ContentState.createFromBlockArray(draft.contentBlocks);
        const editorState = EditorState.createWithContent(contentState);
        return editorState;
      };
    
    
      const onEditorStateChange = (editorState) => {
        const forFormik = draftToHtml(
          convertToRaw(editorState.getCurrentContent())
        );
        setFieldValue(forFormik);
        setEditorState(editorState);
      };

    // 
    const [editorState, setEditorState] = useState(
        value ? prepareDraft(value) : EditorState.createEmpty()
    );

    return (
        <Editor
            toolbar={{ 
              options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'remove', 'history']
             }}
            placeholder={placeholder}
            editorState={editorState}
            editorStyle={{
              borderBottom: `1px solid ${colors.black}`, backgroundColor: "#eeeeee",
              height: "200px",
              padding: "0px 10px"
            }}
            onEditorStateChange={onEditorStateChange}
        />
    )
}

export default RichTextEditor
