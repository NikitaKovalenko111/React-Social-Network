import { appStateType } from '../redux/store'
import { trackType } from '../types/types'

export const getTopTracksSelector = (state: appStateType): Array<trackType> =>
    state.music.TopTracks
