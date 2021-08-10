import { EditorProps } from 'react-draft-wysiwyg'
import { EditorState } from 'draft-js'

export function useEditor(): IUseEditor

interface IUseEditor {
  htmlContent: string
  editorHelpers: IEditorHelpers
}

interface IEditorHelpers {
  onEditorStateChange: (editorState: EditorState) => void
  checkIfEditorIsEmpty: () => boolean
  handleSetText(event: any, value: any): void
}

export const TextEditor: React.MemoExoticComponent<(props: ITextEditor) => JSX.Element>

interface ITextEditor extends EditorProps {
  editorHelpers: IEditorHelpers
  validateEmpty?: boolean
}



