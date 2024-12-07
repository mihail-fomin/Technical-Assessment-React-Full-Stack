import { configureStore } from '@reduxjs/toolkit'
import { taskSlice, middleware } from './todos/todoSlice'
export const makeStore = () => {
    return configureStore({
        reducer: {
            tasks: taskSlice.reducer,
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware),
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']