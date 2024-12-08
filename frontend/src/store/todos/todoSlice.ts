import { createSlice } from '@reduxjs/toolkit'
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type Task = {
    id: number
    text: string
    done: boolean
}

export const todoApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
    tagTypes: ['Task'],
    endpoints: (build) => ({
      getTasks: build.query<Task[], void>({
        query: () => 'tasks',
        providesTags: (result) =>
            result
              ? [
                  ...result.map(({ id }) => ({ type: 'Task' as const, id })),
                  { type: 'Task', id: 'LIST' },
                ]
              : [{ type: 'Task', id: 'LIST' }],
      }),

      addTask: build.mutation<Task, Pick<Task, 'text'>>({
        query: (body) => ({
          url: 'tasks',
          method: 'POST',
          body,
        }),
        invalidatesTags: [{ type: 'Task', id: 'LIST' }],
      }),

      updateTask: build.mutation<void, Pick<Task, 'id'> & Partial<Task>>({
        query: ({ id, ...patch }) => ({
          url: `tasks/${id}`,
          method: 'PATCH',
          body: patch,
        }),
        invalidatesTags: (_result, _error, { id }) => [{ type: 'Task', id }],
      }),

      deleteTask: build.mutation<{ success: boolean; id: number }, number>({
        query(id) {
          return {
            url: `tasks/${id}`,
            method: 'DELETE',
          }
        },
        invalidatesTags: (_result, _error, id) => [{ type: 'Task', id }],
      })
    }),
});

export const {
    useGetTasksQuery,
    useAddTaskMutation,
    useUpdateTaskMutation,
    useDeleteTaskMutation,
} = todoApi;


const initialState = {
    tasks: [] as Task[],
}

export const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setNewTasks: (state, action) => {
            state.tasks = action.payload
        },
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

export const { setNewTasks, addNewTask, editTask, removeTask, clearTasks } = taskSlice.actions

