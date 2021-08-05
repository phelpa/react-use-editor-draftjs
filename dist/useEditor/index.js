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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useState, memo } from 'react';
import { formatHtmlToEditor, formatEditorToHtml } from '../TextEditorFunctions';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
export var useEditor = function () {
    var _a = useState(), content = _a[0], setContent = _a[1];
    var _b = useState(''), htmlContent = _b[0], setHtmlContent = _b[1];
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
            return true;
        }
        return false;
    }, [content]);
    var onEditorStateChange = useCallback(function (editorState) {
        checkIfEditorIsEmpty();
        setContent(editorState);
        setHtmlContent(formatEditorToHtml(content));
    }, [checkIfEditorIsEmpty, content]);
    var editorHelpers = {
        onEditorStateChange: onEditorStateChange,
        checkIfEditorIsEmpty: checkIfEditorIsEmpty,
        handleSetText: handleSetText
    };
    return {
        editorHelpers: editorHelpers,
        htmlContent: htmlContent
    };
};
export var TextEditor = memo(function (_a) {
    var editorHelpers = _a.editorHelpers, validateEmpty = _a.validateEmpty, props = __rest(_a, ["editorHelpers", "validateEmpty"]);
    var _b = useState(false), blurred = _b[0], setBlurred = _b[1];
    var handleBlur = useCallback(function () {
        setBlurred(true);
    }, []);
    var isEmpty = useCallback(function () {
        return editorHelpers.checkIfEditorIsEmpty() && blurred;
    }, [editorHelpers, blurred]);
    var styleProps = {
        marginTop: '-5px',
        border: "1px solid " + (isEmpty() && validateEmpty ? '#ff0000' : '#f1f1f1')
    };
    var toolBarProps = {
        options: ['inline', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'emoji', 'image'],
        inline: { options: ['bold', 'italic', 'underline'] },
        textAlign: { options: ['left', 'center', 'right'] },
        list: { options: ['unordered', 'ordered'] }
    };
    return (_jsxs("div", { children: [_jsx(Editor, __assign({ editorStyle: styleProps, toolbar: toolBarProps, onEditorStateChange: editorHelpers.onEditorStateChange }, props, { onBlur: handleBlur }), void 0), _jsx("div", { children: isEmpty() && validateEmpty && _jsx("span", __assign({ style: { color: 'red' } }, { children: "Type something" }), void 0) }, void 0)] }, void 0));
});
