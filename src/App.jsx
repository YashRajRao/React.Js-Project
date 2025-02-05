
import './App.css'
import Counter from './Components/Counter'
import { Box, Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { UserDataForm } from './Components/UserDataForm';
const theme = createTheme({
  palette: {
    primary: { main: "#3f51b5" },
    secondary: { main: "#f50057" },
    background: { default: "#f4f6f8", paper: "#fff" },
  },
  typography: { h6: { fontWeight: 600 }, body1: { fontSize: "1rem" } },
  spacing: 4,
});


function App() {

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm">
          <Box sx={{ marginTop: 4 }}>
            <Counter />
            <UserDataForm />
          </Box>
        </Container>
      </ThemeProvider>
    </>)
}

export default App
