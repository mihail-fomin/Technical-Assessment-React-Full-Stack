import Container from '@mui/material/container';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';


function App() {

  return (
    <Container maxWidth="sm">
        <h1>To-do List</h1>
        <AddTask />
        <TaskList />
    </Container>
  )
}

export default App
