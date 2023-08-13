import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import {memo,useContext} from "react";
import {MyContext} from "../App";

function ModeBtn(){
  console.log("App > Menu > ModeBtn");
  let {mode,setMode} = useContext(MyContext);
  let setUserChoice = () => {
    let user_choice = mode === 'dark' ? 'light':'dark';
    localStorage.setItem('user_choice',user_choice);
    setMode(user_choice);
  }
  return(
    <IconButton onClick={setUserChoice} color="inherit">
      {mode === 'dark' ? <Brightness4Icon />:<Brightness7Icon />}
    </IconButton>
  )
}
function Menu(){
  console.log("App > Menu");
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => alert('nothing anything is there. its just a show peace 😁')}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Todo App
          </Typography>
          <ModeBtn />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default memo(Menu);