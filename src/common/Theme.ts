import {createTheme} from "@mui/material";

const Theme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#3AB549",
            500: "#16D901",
            400: "#39E429",
            300: "#6AED5E",
            200: "#CEFCCB",
            100: "#EAEAEA",
        },
        background: {
            default: "#ffffff",
        },
    },
    typography: {
        fontFamily: '"Pretendard"',
    },
})

export default Theme