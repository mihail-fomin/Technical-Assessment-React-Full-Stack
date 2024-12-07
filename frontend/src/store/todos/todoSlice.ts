import { createSlice, Middleware } from '@reduxjs/toolkit'

type Task = {
    id: number
    text: string
    done: boolean
}

const initialTasks = [
    { id: 1, text: 'Visit Venice', done: true },
    { id: 2, text: 'Visit Athens', done: true },
    { id: 3, text: 'Visit Rome', done: false },
]

export const middleware: Middleware = (store) => (next) => (action: any) => {
    const result = next(action) // Call next middleware or reducer first

    if (
        action.type === 'tasks/addNewTask' ||
        action.type === 'tasks/editTask' ||
        action.type === 'tasks/removeTask' ||
        action.type === 'tasks/clearTasks'
    ) {
        const tasksState = store.getState().tasks // Get the current tasks state

        // Store the tasks items in local storage
        localStorage.setItem('tasks', JSON.stringify(tasksState.tasks))
    }

    return result
}

const tasks = localStorage.getItem('tasks')
const parsedTasks: Task[] = tasks ? JSON.parse(tasks) : []

const initialState = {
    tasks: parsedTasks.length ? parsedTasks : initialTasks,
}

export const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addNewTask: (state, action) => {
            const id = Date.now()
            state.tasks.push({
                id,
                text: action.payload,
                done: false,
            })
        },
        editTask: (state, action) => {
            const { id } = action.payload
            const item = state.tasks.find((item) => item.id === id)
            if (item) {
                item.done = !action.payload.done
            }
        },
        removeTask: (state, action) => {
            const { id } = action.payload
            const task = state.tasks.find((task) => task.id === id)
            if (task) {
                state.tasks = state.tasks.filter((task) => task.id !== id)
            }
        },
        clearTasks: (state) => {
            state.tasks = []
        },
    },
})

export const { addNewTask, editTask, removeTask, clearTasks } = taskSlice.actions

