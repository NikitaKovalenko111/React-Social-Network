import cn from 'classnames'
import styles from '../Music.module.sass'

type PropsType = {
    trackName: string
    trackImage: string
    trackUri: string
}

const MusicElement: React.FC<PropsType> = ({
    trackImage,
    trackName,
    trackUri,
}): JSX.Element => {
    return (
        <div className={cn(styles.elementWrapper)}>
            <img src={trackImage} alt="trackImage" />
            <a href={trackUri}>{trackName}</a>
        </div>
    )
}

export default MusicElement
