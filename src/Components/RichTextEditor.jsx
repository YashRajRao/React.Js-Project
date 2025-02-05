import React from 'react'
import { Box, Typography, Paper} from "@mui/material";
import { Editor } from "react-draft-wysiwyg";

const RichTextEditor = ({ editorState, onEditorStateChange }) => {
  return (
    <div>
        <Box sx={{ marginTop: 4 }}>
      <Typography variant="h6">Rich Text Editor</Typography>
      <Paper sx={{ padding: 3, borderRadius: 2 }}>
        <Editor editorState={editorState} onEditorStateChange={onEditorStateChange} toolbar={{ options: ["inline", "list", "textAlign", "fontSize", "fontFamily", "link"] }} />
      </Paper>
    </Box>
    </div>
  )
}

export default RichTextEditor