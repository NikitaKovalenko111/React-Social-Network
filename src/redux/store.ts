import { configureStore, ThunkDispatch, Action, compose } from "@reduxjs/toolkit"
import AuthReducer from "./reducers/auth-reducer"
import musicReducer from "./reducers/music-reducer"
import ProfileReducer from "./reducers/profile-reducer"
import usersReducer from "./reducers/users-reducer"

const store = configureStore({
    reducer: {
        profile: ProfileReducer,
        auth: AuthReducer,
        users: usersReducer,
        music: musicReducer
    },
})

export type appStateType = ReturnType<typeof store.getState>
export type appDispatchType = typeof store.dispatch
export type ThunkAction<
  R, // Return type of the thunk function
  S, // state type used by getState
  E, // any "extra argument" injected into the thunk
  A extends Action // known types of actions that can be dispatched
> = (dispatch: ThunkDispatch<S, E, A>, getState: () => S, extraArgument: E) => R


// @ts-ignore
window.store = store

export default store