import { trackType } from '../types/types'
import { instanceMusic } from './api'

// TYPES

export interface IGetTopTracksResponseType {
    readonly status: number
    readonly data: {
        tracks: Array<trackType>
    }
}

export interface IMusicAPIType {
    getMostLovedTracks: () => Promise<IGetTopTracksResponseType>
}

// API

export const MusicAPI: IMusicAPIType = {
    getMostLovedTracks: () => {
        return instanceMusic
            .get('/songs/list-recommendations')
            .then((response) => response)
    },
}
