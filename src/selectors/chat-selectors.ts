import { appStateType } from "../redux/store";

export const getMessages = (state: appStateType) => {
    return state.chat.messages
}