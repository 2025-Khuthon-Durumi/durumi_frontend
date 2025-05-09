import './App.css'
import {CssBaseline, ThemeProvider} from "@mui/material";
import Theme from "./common/Theme.ts";
import {RouterProvider} from "react-router";
import Router from "./common/Router.ts";

function App() {
    return <>
        <ThemeProvider theme={Theme}>
            <CssBaseline/>
            <RouterProvider router={Router}/>
        </ThemeProvider>
    </>
}

export default App
