import { configureStore } from '@reduxjs/toolkit'
import { taskSlice, todoApi } from './todos/todoSlice'

export const makeStore = () => {
    return configureStore({
        reducer: {
            tasks: taskSlice.reducer,
            [todoApi.reducerPath]: todoApi.reducer,
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware()
            .concat(todoApi.middleware)
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']