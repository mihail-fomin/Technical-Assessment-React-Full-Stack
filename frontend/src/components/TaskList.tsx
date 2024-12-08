import { Checkbox, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch } from '../store/hooks';
import { addNewTask, editTask, removeTask, Task, useDeleteTaskMutation, useGetTasksQuery, useUpdateTaskMutation } from '../store/todos/todoSlice';

function TaskList() {
    const dispatch = useAppDispatch()
    const { data: tasks, isLoading } = useGetTasksQuery()
    const [updateTask] = useUpdateTaskMutation()
    const [deleteTask] = useDeleteTaskMutation()

    if (isLoading) {
        return (
            <p>Loading...</p>
    )}

    if (!tasks?.length) {
        return (
            <p>No tasks found.</p>
        )
    }

    const handleChange = (task: Task) => {
        // Optimistically update the UI
        const updatedTask = { ...task, done: !task.done };

        dispatch(editTask(updatedTask));

        // Call the mutation
        updateTask(updatedTask)
            .unwrap()
            .catch((error) => {
                console.error('Error editing task:', error);
                // Rollback the change if the mutation fails
                dispatch(editTask(updatedTask));
            });
    }

    const handleRemove = (task: Task) => {
        dispatch(removeTask(task));

        deleteTask(task.id)
            .unwrap()
            .catch((error) => {
                console.error('Error deleting task:', error);
                dispatch(addNewTask(task));
            });
    }

  return (

    <ul>
      {tasks.map((task) => (
        <li
            key={task.id}
            style={{ listStyleType: "none", paddingLeft: 0 }}
        >
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
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
