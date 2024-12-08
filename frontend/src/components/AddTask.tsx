import React from 'react'
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useAddTaskMutation } from '../store/todos/todoSlice';
import toast from 'react-hot-toast';


function AddTask() {
    const [addTask] = useAddTaskMutation()

    const [text, setText] = React.useState('');

    const handleAddTask = (text: string) => {
        setText('');
        const newTask = { text };

        addTask(newTask)
            .unwrap()
            .then(() => toast.success('Successfully added!'))
            .catch((error) => {
                console.error('Error editing task:', error);
                toast.error('Could not add((')
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
