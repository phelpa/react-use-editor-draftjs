import { EditorState, ContentState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export const formatHtmlToEditor = (value: string): EditorState => {
  if (!value) {
    return EditorState.createEmpty();
  }
  const textHtml = htmlToDraft(value);
  const contentState = ContentState.createFromBlockArray(textHtml?.contentBlocks);
  return EditorState.createWithContent(contentState);
};

export const formatEditorToHtml = (value: EditorState) => {
  if (!value) {
    return '';
  }
  const body = draftToHtml(convertToRaw(value?.getCurrentContent()));
  return body;
};
