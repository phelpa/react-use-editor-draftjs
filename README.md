# `React use-editor-draftjs`
## Install

```sh
yarn add use-editor-draftjs
```

## Usage

React use-editor-draftjs is an simple editor built on top of react-draft-wysiwyg. It is really simple to use and you can easily get the html output through a hook.

```jsx
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
    <TextEditor editorHelpers={editorHelpers} validateEmpty />
                                              //makes the editor box red to warn the user if the editor is empty
  )
}
```