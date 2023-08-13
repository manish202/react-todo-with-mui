import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import DoneIcon from '@mui/icons-material/Done';
import AddIcon from '@mui/icons-material/Add';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {useState,useRef,memo,useCallback} from "react";
const MyLi = memo(function MyLi({name,id,editBtnClicked,dltBtnClicked}){
    console.log("App > TodoApp > MyLi");
    return(
        <ListItem>
            <ListItemText primary={name} />
            <IconButton aria-label="edit" variant="contained" color="success" onClick={() => editBtnClicked(id,name)}>
                <EditIcon />
            </IconButton>
            <IconButton aria-label="delete" variant="contained" color="error" onClick={() => dltBtnClicked(id)}>
                <DeleteIcon />
            </IconButton>
        </ListItem>
    )
})

const InputBox = memo(function InputBox({field,label,btnClick,icon,showCls}){
    console.log("App > TodoApp > InputBox");
    const handelInput = (e) => {
        e.key == 'Enter' && btnClick();
    }
    return(
        <Box sx={{display:showCls,padding:'10px'}}>
            <TextField onKeyDown={handelInput} sx={{width:'calc(100% - 48px)'}} inputRef={field} label={label} variant="standard" />
            <IconButton size="large" aria-label={label} onClick={btnClick}>
                {icon == 'add' ? <AddIcon />:<DoneIcon />}
            </IconButton>
        </Box>
    )
})

function TodoApp(){
    console.log("App > TodoApp");
    let localData = localStorage.getItem('todo_list');
    let [todo,updtTodo] = useState(localData ? JSON.parse(localData):[]);
    let [isAddField,updtIsAddField] = useState(true);
    let addField = useRef();
    let updateField = useRef();

    const updtLclStorage = (data) => {
        localStorage.setItem('todo_list',JSON.stringify(data))
    }
    
    const addTodo = useCallback(() => {
        let item = addField.current.value.trim();
        item && updtTodo((old) => {
            updtLclStorage([...old,item]);
            return [...old,item]
        })
        addField.current.value = '';
    },[])

    const updateTodo = useCallback(() => {
        let tid = updateField.current.dataset.tid;
        let item = updateField.current.value.trim();
        item && updtTodo((old) => {
            let tmp_arr = old.map((val,ind) => {
                return ind == tid ? item:val;
            })
            updtLclStorage(tmp_arr);
            return tmp_arr;
        })
        updtIsAddField(true);
        updateField.current.value = '';
    },[])

    const editBtnClicked = useCallback((id,data) => {
        updtIsAddField(false);
        updateField.current.value = data;
        updateField.current.dataset.tid = id;
    },[]);

    const dltBtnClicked = useCallback((id) => {
        updtTodo((old) => {
            let tmp_arr = old.filter((val,ind) => ind != id);
            updtLclStorage(tmp_arr);
            return tmp_arr;
        });
    },[])

    return(
        <>
            <Box sx={{maxWidth:'576px',margin:'20px auto'}} >
                <InputBox field={addField} label='Add List' btnClick={addTodo} icon='add' showCls={isAddField ? 'block':'none'} />
                <InputBox field={updateField} label='Update List' btnClick={updateTodo} icon='done' showCls={isAddField ? 'none':'block'} />
                <List component="ul">
                    {todo.map((val,ind) => <MyLi key={ind} name={val} id={ind} editBtnClicked={editBtnClicked} dltBtnClicked={dltBtnClicked} />)}
                    {!todo.length && <ListItem><ListItemText primary='No List Found' /></ListItem>}
                </List>
            </Box>
        </>
    )
}
export default memo(TodoApp);