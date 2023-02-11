import { appStateType } from "../redux/store";

export const getMessages = (state: appStateType) => {
    return state.chat.messages
}

export const getStatus = (state: appStateType) => state.chat.status