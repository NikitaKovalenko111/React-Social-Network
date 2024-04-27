import { appStateType } from '../redux/store'
import { contactsTypes } from '../types/types'

export const getIsOwnerSelector = (state: appStateType): boolean =>
    state.profile.isOwner
export const getAboutMeSelector = (state: appStateType): string | null =>
    state.profile.aboutMe
export const getMyPhotoSelector = (state: appStateType): string =>
    state.profile.myProfileImages.large
export const getUserPhotoSelector = (state: appStateType): string =>
    state.profile.profileImages.large
export const getUserAvatarSelector = (state: appStateType): string =>
    state.profile.myProfileImages.small
export const getStatusSelector = (state: appStateType): string =>
    state.profile.status
export const getLookingForAJobSelector = (
    state: appStateType
): boolean | null => state.profile.lookingForAJob
export const getLookingForAJobDescriptionSelector = (
    state: appStateType
): string => state.profile.lookingForAJobDescription
export const getFullNameSelector = (state: appStateType): string =>
    state.profile.fullName
export const getContactsSelector = (state: appStateType): contactsTypes =>
    state.profile.contacts
export const getUserIdSelector = (state: appStateType): number | null =>
    state.auth.userId
export const getIsLoadingSelector = (state: appStateType): boolean =>
    state.profile.isLoading
