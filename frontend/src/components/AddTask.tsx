import React from 'react'
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useAppDispatch } from '../store/hooks';
import { addNewTask, useAddTaskMutation } from '../store/todos/todoSlice';


function AddTask() {
    const dispatch = useAppDispatch()
    const [addTask] = useAddTaskMutation()

    const [text, setText] = React.useState('');

    const handleAddTask = (text: string) => {
        setText('');
        dispatch(addNewTask(text));
        const newTask = { text };

        addTask(newTask)
            .unwrap()
            .catch((error) => {
                console.error('Error editing task:', error);
            });
    }

    return (
        <>
            <TextField
                variant="outlined"
                label="Add task"
                size="small"
                sx={{ m: 2 }}
                value={text}
                onChange={(event) => setText(event.target.value)}
            />
            <Button
                disabled={!text}
                variant="contained"
                sx={{ my: 2 }}
                onClick={() => {handleAddTask(text)}}
            >
                Add
            </Button>
        </>
    )
}

export default AddTask
