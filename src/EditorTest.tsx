
import React from 'react'
import useEditor from './useEditor'

const EditorTest = () => {

  const { TextEditor, editorProps, htmlContent } = useEditor()

  return (
    <>
      <TextEditor {...editorProps} />
      <br/>
      <div>Html output : </div>
      {JSON.stringify(htmlContent, null, 2)}
    </>
  )
}

export default EditorTest