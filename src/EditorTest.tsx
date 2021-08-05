
import { useEditor, TextEditor } from './useEditor'

const EditorTest = () => {

  const { editorHelpers, htmlContent } = useEditor()

  return (
    <>
      <TextEditor editorHelpers={editorHelpers} validateEmpty />
      <br/>
      <div>Html output : </div>
      {JSON.stringify(htmlContent, null, 2)}
    </>
  )
}

export default EditorTest