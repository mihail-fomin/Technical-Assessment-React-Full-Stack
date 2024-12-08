import { Box, Checkbox, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import { Task, useDeleteTaskMutation, useUpdateTaskMutation } from '../store/todos/todoSlice';
import toast from 'react-hot-toast';

type Props = {
    task: Task
}


const TaskDetali = ({ task }: Props) => {
    const [updateTask] = useUpdateTaskMutation()
    const [deleteTask] = useDeleteTaskMutation()

    const handleChange = (task: Task) => {
        const updatedTask = { ...task, done: !task.done };

        updateTask(updatedTask)
            .unwrap()
            .then(() => toast.success('Successfully updated!'))
            .catch((error) => {
                console.error('Error editing task:', error);
                toast.error('Could not update((')
            });
    }

    const handleRemove = (task: Task) => {
        deleteTask(task.id)
            .unwrap()
            .then(() => toast.success('Successfully deleted!'))
            .catch((error) => {
                console.error('Error deleting task:', error);
                toast.error('Could not delete((')
            });
    }

    return (
        <Box p={1}>
            <Checkbox
                checked={task.done}
                onChange={() => handleChange(task)}
            />

            {task.text}

            <IconButton
                onClick={() => handleRemove(task)}
            >
                <DeleteIcon />
            </IconButton>

        </Box>
    )
}

export default TaskDetali