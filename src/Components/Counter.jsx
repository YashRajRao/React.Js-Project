import React, { useState, useEffect } from "react";
import { Button, Box, Typography, Paper } from "@mui/material";
const Counter = () => {
    const [count, setCount] = useState(0);
    const [bgColor, setBgColor] = useState("rgb(255,255,255)");

    useEffect(() => {
        setBgColor(`rgb(${255 - count * 10}, ${255 - count * 10}, 255)`);
    }, [count]);

    return (
        <div>
            <Paper sx={{ padding: 3, marginBottom: 3, backgroundColor: bgColor, textAlign: "center" }}>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>Counter: {count}</Typography>
                <Box sx={{ display: "flex", justifyContent: "center", gap: 2, marginTop: 2 }}>
                    <Button variant="contained" color="primary" onClick={() => setCount(count + 1)}>Increment</Button>
                    <Button variant="contained" color="secondary" onClick={() => setCount(count - 1)}>Decrement</Button>
                    <Button variant="outlined" color="error" onClick={() => setCount(0)}>Reset</Button>
                </Box>
            </Paper>
        </div>
    )
}

export default Counter