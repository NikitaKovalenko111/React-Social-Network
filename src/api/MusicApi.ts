import { trackType } from "../types/types";
import { instanceMusic } from "./api";

// TYPES

export interface getTopTracksResponseType {
    readonly status: number
    readonly data: {
        tracks: Array<trackType>
    }
}

export interface MusicAPIType {
    getMostLovedTracks: () => Promise<getTopTracksResponseType>
}

// API

export const MusicAPI: MusicAPIType  = {
    getMostLovedTracks: () => {
        return instanceMusic.get('/songs/list-recommendations').then(response => response);
    },
}