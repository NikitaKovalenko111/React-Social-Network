import { configureStore, ThunkDispatch, Action } from '@reduxjs/toolkit'
import AuthReducer from './reducers/auth-reducer'
import musicReducer from './reducers/music-reducer'
import ProfileReducer from './reducers/profile-reducer'
import usersReducer from './reducers/users-reducer'
import chatReducer from './reducers/chat-reducer'

const store = configureStore({
    reducer: {
        profile: ProfileReducer,
        auth: AuthReducer,
        users: usersReducer,
        music: musicReducer,
        chat: chatReducer,
    },
})

export type appStateType = ReturnType<typeof store.getState>
export type appDispatchType = typeof store.dispatch
export type ThunkAction<R, S, E, A extends Action> = (
    dispatch: ThunkDispatch<S, E, A>,
    getState: () => S,
    extraArgument: E
) => R

// @ts-ignore
window.store = store

export default store
