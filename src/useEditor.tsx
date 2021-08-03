import { useCallback, useState, memo } from 'react'

import { formatHtmlToEditor, formatEditorToHtml } from './TextEditorFunctions'
import { EditorState } from 'draft-js'
import { Editor, EditorProps } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

interface IExtendedEditorProps extends EditorProps {
  isEditorEmpty: boolean
}

interface IEditor {
  htmlContent: string
  editorProps: IExtendedEditorProps
  TextEditor: React.MemoExoticComponent<(props: IExtendedEditorProps) => JSX.Element>
  checkIfEditorIsEmpty(): boolean
  handleSetText(event: any, value: any): void
}

const useEditor = (): IEditor => {
  const [content, setContent] = useState<EditorState>()
  const [htmlContent, setHtmlContent] = useState('')
  const [isEditorEmpty, setIsEditorEmpty] = useState(false)

  const handleSetText = useCallback((event: any, value: any) => {
    if (!value) {
      return setContent(EditorState.createEmpty())
    }
    setContent(formatHtmlToEditor(value?.text))
  }, [])

  const checkIfEditorIsEmpty = useCallback(() => {
    const editorContent = content?.getCurrentContent()
    const currentPlainText = editorContent?.getPlainText()

    if (!currentPlainText) {
      setContent(EditorState.createEmpty())
      setIsEditorEmpty(true)
      return true
    }

    setIsEditorEmpty(false)
    return false
  }, [content])

  const onEditorStateChange = useCallback(
    (editorState: EditorState) => {
      checkIfEditorIsEmpty()
      setContent(editorState)

      setHtmlContent(formatEditorToHtml(content as EditorState))
    },
    [checkIfEditorIsEmpty, content]
  )

  const nativeProps = {
    editorStyle: {
      marginTop: '-5px',
      border: `1px solid ${isEditorEmpty ? '#ff0000' : '#f1f1f1'}`
    },
    toolbar: {
      options: ['inline', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'emoji', 'image'],
      inline: { options: ['bold', 'italic', 'underline'] },
      textAlign: { options: ['left', 'center', 'right'] },
      list: { options: ['unordered', 'ordered'] }
    },
    editorState: content,
    onEditorStateChange
  }

  const customProps = {
    isEditorEmpty
  }

  return {
    TextEditor,
    editorProps: { ...nativeProps, ...customProps },
    htmlContent,
    handleSetText,
    checkIfEditorIsEmpty
  }
}

const TextEditor = memo(
  (props: IExtendedEditorProps): JSX.Element => (
    <div>
      <Editor {...props} />
      <div>{props.isEditorEmpty && <span style={{color: 'red'}}>Type Something</span>}</div>
    </div>
  )
)

export default useEditor