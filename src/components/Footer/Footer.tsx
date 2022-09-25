import cn from 'classnames'
import styles from './Footer.module.sass'

type PropsType = {

}

const Footer: React.FC<PropsType> = ({}): JSX.Element => {
    return (
        <div className={cn(styles.footer, 'footer')}>
            <div className={cn('container')}>
                <p>Footer</p>
            </div>
        </div>
    )
}

export default Footer