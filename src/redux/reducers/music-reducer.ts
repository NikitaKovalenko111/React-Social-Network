import { AnyAction } from 'redux'
import { MusicAPI } from '../../api/MusicApi'
import { trackType, ThunkType } from '../../types/types'
import { setIsLoadingAC } from './profile-reducer'

// TYPES

type initialStateType = {
    readonly TopTracks: Array<trackType>
}

export enum ActionCreatorsTypes {
    SET_TOP_TRACKS = "music/SET_TOP_TRACKS"
}

type SetTopTracksACType = {
    type: typeof ActionCreatorsTypes.SET_TOP_TRACKS
    tracks: Array<trackType>
}

// REDUCER

let initialState: initialStateType = {
    TopTracks: []
}

const musicReducer = (state: initialStateType = initialState, action: AnyAction): initialStateType => {
    switch (action.type) {
        case ActionCreatorsTypes.SET_TOP_TRACKS:
            return {...state, TopTracks: action.tracks}
    
        default:
            return state
    }
}

// ACTION CREATORS

export const SetTopTracksAC = (tracks: Array<trackType>): SetTopTracksACType => {
    return {
        type: ActionCreatorsTypes.SET_TOP_TRACKS,
        tracks: tracks
    }
}

// THUNKS

export const getTopTracksThunk = (): ThunkType => async dispatch => {
    dispatch(setIsLoadingAC(true))
    let response = await MusicAPI.getMostLovedTracks()
    
    if (response.status === 200) {
        dispatch(SetTopTracksAC(response.data.tracks))
        dispatch(setIsLoadingAC(false))
    }
}

export default musicReducer