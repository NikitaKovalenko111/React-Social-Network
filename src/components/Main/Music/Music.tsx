import { connect } from 'react-redux'
import { trackType } from '../../../types/types'
import { appDispatchType, appStateType } from '../../../redux/store'
import { useEffect } from 'react'
import { getTopTracksThunk } from '../../../redux/reducers/music-reducer'
import MusicElement from './MusicElement/MusicElement'
import cn from 'classnames'
import styles from './Music.module.sass'
import Preloader from '../../common/Preloader/Preloader'

type PropsType = mstpType & mdtpType

type mstpType = {
    tracks: Array<trackType>
    isLoading: boolean
}

type mdtpType = {
    getTopTracks: () => void
}

const mstp = (state: appStateType): mstpType => {
    return {
        tracks: state.music.TopTracks,
        isLoading: state.profile.isLoading
    }
}

const mdtp = (dispatch: appDispatchType): mdtpType => {
    return {
        getTopTracks: () => {
            dispatch(getTopTracksThunk())
        },
    }
}

const Music: React.FC<PropsType> = ({isLoading, tracks, getTopTracks }): JSX.Element => {

    useEffect(() => {
        getTopTracks() 
    }, [])

    return (
        <div className={ cn(styles.wrapper) }>
            <h1 className={ cn(styles.title) }>Топ 200 треков</h1>
            <div className={ cn(styles.elements) }>
                { isLoading && <Preloader /> }  
                { tracks.map(el => {
                    return (
                        <MusicElement key={el.title} trackUri={el.url} trackImage={el.images.coverart} trackName={el.title} />
                    )
                }) }
            </div>
        </div>
    )
}

export default connect(mstp, mdtp)(Music)