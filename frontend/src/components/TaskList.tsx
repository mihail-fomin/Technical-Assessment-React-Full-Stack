import React from 'react';
import { Checkbox, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { editTask, removeTask } from '../store/todos/todoSlice';

const FILTER_ALL = 0;
const FILTER_DONE = 1;
const FILTER_ACTIVE = 2;

function TaskList() {
  const [filter, setFilter] = React.useState(FILTER_ALL);
  const dispatch = useAppDispatch()
  const tasks = useAppSelector((state) => state.tasks.tasks)

    if (!tasks.length) {
     return (
            <p>No tasks found.</p>
        )
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
            onChange={() => dispatch(editTask(task))}
          />
          {task.text}
          <IconButton
            onClick={() => dispatch(removeTask(task))}
            >
            <DeleteIcon />
          </IconButton>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
