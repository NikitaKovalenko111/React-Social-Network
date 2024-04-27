import loader from '../../../images/loader.gif'
import cn from 'classnames'
import styles from './Preloader.module.sass'

type props = {}

const Preloader: React.FC<props> = (): JSX.Element => {
    return (
        <div className={cn(styles.wrapper)}>
            <img src={loader} alt="loading" />
            <p className={cn(styles.text)}>Загрузка . . .</p>
        </div>
    )
}

export default Preloader
