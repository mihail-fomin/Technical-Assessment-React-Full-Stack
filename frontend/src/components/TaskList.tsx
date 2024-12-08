import { useGetTasksQuery } from '../store/todos/todoSlice';
import TaskDetali from './TaskDetali';

function TaskList() {
    const { data: tasks, isLoading } = useGetTasksQuery()

    if (isLoading) {
        return (
            <p>Loading...</p>
    )}

    if (!tasks?.length) {
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
            <TaskDetali task={task}/>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
