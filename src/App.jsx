import Menu from "./components/Menu";
import TodoApp from "./components/TodoApp";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from '@mui/material/useMediaQuery';
import {useState,createContext} from "react";
export let MyContext = createContext();
export default function App(){
  console.log("App");
  let isDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  let user_choice = localStorage.getItem('user_choice');
  if(['dark','light'].includes(user_choice)){ isDarkMode = user_choice == 'dark' }
  let [mode,setMode] = useState(isDarkMode ? 'dark':'light');
  const theme = createTheme({
    palette: {
      mode,
    },
  });
  return(
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MyContext.Provider value={{mode,setMode}}>
        <Menu />
        <TodoApp />
      </MyContext.Provider>
    </ThemeProvider>
  )
}