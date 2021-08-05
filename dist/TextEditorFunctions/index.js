import { EditorState, ContentState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
export var formatHtmlToEditor = function (value) {
    if (!value) {
        return EditorState.createEmpty();
    }
    var textHtml = htmlToDraft(value);
    var contentState = ContentState.createFromBlockArray(textHtml === null || textHtml === void 0 ? void 0 : textHtml.contentBlocks);
    return EditorState.createWithContent(contentState);
};
export var formatEditorToHtml = function (value) {
    if (!value) {
        return '';
    }
    var body = draftToHtml(convertToRaw(value === null || value === void 0 ? void 0 : value.getCurrentContent()));
    return body;
};
