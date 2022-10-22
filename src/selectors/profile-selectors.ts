import { appStateType } from "../redux/store"

export const getIsOwnerSelector = (state: appStateType) => state.profile.isOwner
export const getAboutMeSelector = (state: appStateType) => state.profile.aboutMe
export const getMyPhotoSelector = (state: appStateType) => state.profile.myProfileImages.large
export const getUserPhotoSelector = (state: appStateType) => state.profile.profileImages.large
export const getStatusSelector = (state: appStateType) => state.profile.status
export const getLookingForAJobSelector = (state: appStateType) => state.profile.lookingForAJob
export const getLookingForAJobDescriptionSelector = (state: appStateType) => state.profile.lookingForAJobDescription
export const getFullNameSelector = (state: appStateType) => state.profile.fullName
export const getContactsSelector = (state: appStateType) => state.profile.contacts
export const getUserIdSelector = (state: appStateType) => state.auth.userId
export const getIsLoadingSelector= (state: appStateType) => state.profile.isLoading