import { useCallback, useState, memo } from 'react'

import { formatHtmlToEditor, formatEditorToHtml } from '../TextEditorFunctions'
import { EditorState } from 'draft-js'
import { Editor, EditorProps } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

interface IEditorHelpers {
  onEditorStateChange: (editorState: EditorState) => void
  checkIfEditorIsEmpty: () => boolean
  handleSetText(event: any, value: any): void
}

interface IUseEditor {
  htmlContent: string
  editorHelpers: IEditorHelpers
}

export const useEditor = (): IUseEditor => {
  const [content, setContent] = useState<EditorState>()
  const [htmlContent, setHtmlContent] = useState('')

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
      return true
    }

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

  const editorHelpers = {
    onEditorStateChange,
    checkIfEditorIsEmpty,
    handleSetText
  }

  return {
    editorHelpers,
    htmlContent
  }
}

interface ITextEditor extends EditorProps {
  editorHelpers: IEditorHelpers
  validateEmpty: boolean
}

export const TextEditor: React.FC<ITextEditor> = memo(
  ({editorHelpers, validateEmpty, ...props}) => {
    const [blurred, setBlurred] = useState(false)

    const handleBlur = useCallback(() => {
      setBlurred(true)
    },[])

    const isEmpty = useCallback(() => {
      return editorHelpers.checkIfEditorIsEmpty() && blurred
    }, [editorHelpers, blurred])

    const styleProps = {
        marginTop: '-5px',
        border: `1px solid ${isEmpty() && validateEmpty ? '#ff0000' : '#f1f1f1'}`
    }

    const toolBarProps =  {
      options: ['inline', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'emoji', 'image'],
      inline: { options: ['bold', 'italic', 'underline'] },
      textAlign: { options: ['left', 'center', 'right'] },
      list: { options: ['unordered', 'ordered'] }
    }

    return (
      <div>
        <Editor 
          editorStyle={styleProps} 
          toolbar={toolBarProps} 
          onEditorStateChange={editorHelpers.onEditorStateChange}
          {...props}
          onBlur={handleBlur}
        />
        <div>{isEmpty() && validateEmpty && <span style={{color: 'red'}}>Type something</span>}</div>
      </div>
    )
})