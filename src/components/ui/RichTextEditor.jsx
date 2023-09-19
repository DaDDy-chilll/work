/* eslint-disable react/prop-types */
import { Editor } from '@tinymce/tinymce-react';

const RichTextEditor = ({ text, setText }) => {
  return (
    <Editor
      onEditorChange={(newValue, editor) => {
        setText(editor.getContent());
      }}
      value={text}
      init={{
        branding: false,
        height: 500,
        menubar: true,
        plugins: [
          'advlist',
          'autolink',
          'lists',
          'link',
          'image',
          'charmap',
          'preview',
          'anchor',
          'searchreplace',
          'visualblocks',
          'code',
          'fullscreen',
          'insertdatetime',
          'media',
          'table',
          'code',
          'help',
          'wordcount',
          'emoticons',
        ],

        toolbar:
          'undo redo | blocks | ' +
          'bold italic forecolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat | help | emoticons ',
      }}
    />
  );
};

export default RichTextEditor;
