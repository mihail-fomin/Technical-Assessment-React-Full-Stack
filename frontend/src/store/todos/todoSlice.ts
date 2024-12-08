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
