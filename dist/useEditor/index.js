var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useState, memo } from 'react';
import { formatHtmlToEditor, formatEditorToHtml } from '../TextEditorFunctions';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
var useEditor = function () {
    var _a = useState(), content = _a[0], setContent = _a[1];
    var _b = useState(''), htmlContent = _b[0], setHtmlContent = _b[1];
    var _c = useState(false), isEditorEmpty = _c[0], setIsEditorEmpty = _c[1];
    var handleSetText = useCallback(function (event, value) {
        if (!value) {
            return setContent(EditorState.createEmpty());
        }
        setContent(formatHtmlToEditor(value === null || value === void 0 ? void 0 : value.text));
    }, []);
    var checkIfEditorIsEmpty = useCallback(function () {
        var editorContent = content === null || content === void 0 ? void 0 : content.getCurrentContent();
        var currentPlainText = editorContent === null || editorContent === void 0 ? void 0 : editorContent.getPlainText();
        if (!currentPlainText) {
            setContent(EditorState.createEmpty());
            setIsEditorEmpty(true);
            return true;
        }
        setIsEditorEmpty(false);
        return false;
    }, [content]);
    var onEditorStateChange = useCallback(function (editorState) {
        checkIfEditorIsEmpty();
        setContent(editorState);
        setHtmlContent(formatEditorToHtml(content));
    }, [checkIfEditorIsEmpty, content]);
    var nativeProps = {
        editorStyle: {
            marginTop: '-5px',
            border: "1px solid " + (isEditorEmpty ? '#ff0000' : '#f1f1f1')
        },
        toolbar: {
            options: ['inline', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'emoji', 'image'],
            inline: { options: ['bold', 'italic', 'underline'] },
            textAlign: { options: ['left', 'center', 'right'] },
            list: { options: ['unordered', 'ordered'] }
        },
        editorState: content,
        onEditorStateChange: onEditorStateChange
    };
    var customProps = {
        isEditorEmpty: isEditorEmpty
    };
    return {
        TextEditor: TextEditor,
        editorProps: __assign(__assign({}, nativeProps), customProps),
        htmlContent: htmlContent,
        handleSetText: handleSetText,
        checkIfEditorIsEmpty: checkIfEditorIsEmpty
    };
};
var TextEditor = memo(function (props) { return (_jsxs("div", { children: [_jsx(Editor, __assign({}, props), void 0), _jsx("div", { children: props.isEditorEmpty && _jsx("span", __assign({ style: { color: 'red' } }, { children: "Type Something" }), void 0) }, void 0)] }, void 0)); });
export default useEditor;
