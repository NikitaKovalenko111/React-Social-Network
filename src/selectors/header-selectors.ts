import { appStateType } from '../redux/store'

export const getIsAuthorizedSelector = (state: appStateType): boolean =>
    state.auth.isAuthorized
export const getLoginSelector = (state: appStateType): string =>
    state.auth.login
