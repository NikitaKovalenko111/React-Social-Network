import { appStateType } from '../redux/store'
import { UserType } from '../types/types'

export const getUsersSelector = (state: appStateType): Array<UserType> =>
    state.users.users
export const getTotalCountSelector = (state: appStateType): number =>
    state.users.totalCount
export const getErrorSelector = (state: appStateType): string =>
    state.users.error
export const getIsFollowingSelector = (state: appStateType): Array<number> =>
    state.users.isFollowing
