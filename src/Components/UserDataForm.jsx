import React, { useState, useEffect } from "react";
import RichTextEditor from './RichTextEditor';

import { EditorState, convertToRaw, ContentState, convertFromRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { v4 as uuidv4 } from "uuid";
import { TextField, Button, Box, Typography, Paper} from "@mui/material";
export const UserDataForm = () => {
    const [formData, setFormData] = useState({
        id: "",
        name: "",
        address: "",
        email: "",
        phone: "",
    });
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [isDirty, setIsDirty] = useState(false);

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            if (isDirty) {
                event.preventDefault();
                event.returnValue = "You have unsaved changes!";
            }
        };
        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => window.removeEventListener("beforeunload", handleBeforeUnload);
    }, [isDirty]);

    useEffect(() => {
        const savedFormData = JSON.parse(localStorage.getItem("userData"));
        const savedEditorContent = localStorage.getItem("editorContent");

        if (savedFormData) {
            setFormData(savedFormData);
        }
        if (savedEditorContent) {
            const parsedEditorContent = JSON.parse(savedEditorContent);
            const contentState = convertFromRaw(parsedEditorContent);
            setEditorState(EditorState.createWithContent(contentState));
        }
    }, []);

    const handleChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
        setIsDirty(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const uniqueId = formData.id || uuidv4();
        const updatedData = { ...formData, id: uniqueId };

        setFormData(updatedData);
        localStorage.setItem("userData", JSON.stringify(updatedData));
        setIsDirty(false);

        const { name, address, email, phone } = updatedData;
        const userContent = `${name}\n${address}\n${email}\n${phone}`;
        const contentState = ContentState.createFromText(userContent);
        const newEditorState = EditorState.createWithContent(contentState);
        setEditorState(newEditorState);

        localStorage.setItem("editorContent", JSON.stringify(convertToRaw(contentState)));
    };

    const handleEditorChange = (editorState) => {
        setEditorState(editorState);
        const contentState = editorState.getCurrentContent();
        localStorage.setItem("editorContent", JSON.stringify(convertToRaw(contentState)));
        setIsDirty(true);
    };

    return (
        <div>
            <Paper sx={{ padding: 4, marginTop: 4 }}>
                <Typography variant="h6" sx={{ marginBottom: 2 }}>User Data Form</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField label="Name" variant="outlined" fullWidth margin="normal" name="name" value={formData.name} onChange={handleChange} required />
                    <TextField label="Address" variant="outlined" fullWidth margin="normal" name="address" value={formData.address} onChange={handleChange} required />
                    <TextField label="Email" variant="outlined" fullWidth margin="normal" name="email" value={formData.email} onChange={handleChange} required />
                    <TextField label="Phone" variant="outlined" fullWidth margin="normal" name="phone" value={formData.phone} onChange={handleChange} required />
                    <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                        <Button variant="contained" color="primary" type="submit">Save</Button>
                    </Box>
                </form>
                <RichTextEditor editorState={editorState} onEditorStateChange={handleEditorChange} />
            </Paper>
        </div>
    )
}
