
import { useEditor, TextEditor }  from 'use-editor-draftjs'

const EditorTest = () => {

  const { editorHelpers, htmlContent } = useEditor()

  const handleSubmit = () => {
    if (editorHelpers.checkIfEditorIsEmpty()) {
      return //you may not want to proceed the editor is empty
    }
    console.log(htmlContent)
  }

  return (
    <>
      <TextEditor editorHelpers={editorHelpers} validateEmpty />
      <br/>
      <button onClick={handleSubmit}>Submit</button>
      <div>Html output : </div>
      {JSON.stringify(htmlContent, null, 2)}
    </>
  )
}

export default EditorTest