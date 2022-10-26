import { connect, useSelector } from 'react-redux'
import { trackType } from '../../../types/types'
import { appDispatchType, appStateType } from '../../../redux/store'
import { useEffect } from 'react'
import { getTopTracksThunk } from '../../../redux/reducers/music-reducer'
import MusicElement from './MusicElement/MusicElement'
import cn from 'classnames'
import styles from './Music.module.sass'
import Preloader from '../../common/Preloader/Preloader'
import { getIsLoadingSelector } from '../../../selectors/profile-selectors'
import { getTopTracksSelector } from '../../../selectors/music-selectors'
import { useDispatch } from 'react-redux'
import { compose } from 'redux'

type PropsType = {}

const Music: React.FC<PropsType> = (): JSX.Element => {

    const isLoading: boolean = useSelector(getIsLoadingSelector)
    const tracks: Array<trackType> = useSelector(getTopTracksSelector)

    const dispatch: appDispatchType = useDispatch()

    const getTopTracks = () => {
        dispatch(getTopTracksThunk())
    }

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

export default compose()(Music)