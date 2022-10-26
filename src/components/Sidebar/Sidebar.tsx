import cn from 'classnames'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import styles from './Sidebar.module.sass'
import { appDispatchType } from './../../redux/store'
import { exitThunk } from '../../redux/reducers/auth-reducer'
import { getUserIdSelector } from '../../selectors/profile-selectors'
import { getIsAuthorizedSelector } from '../../selectors/header-selectors'
import { useDispatch } from 'react-redux'

type props = {}

const Sidebar: React.FC<props> = (): JSX.Element => {

    const userId: number | null = useSelector(getUserIdSelector)
    const isAuthorized: boolean = useSelector(getIsAuthorizedSelector)

    const dispatch: appDispatchType = useDispatch()

    const onExit = () => {
        dispatch(exitThunk())
    }

    return (
        <aside className={cn(styles.sidebar, 'sidebar')}>
            <div className={cn(styles.links)}>
                <NavLink to={`/profile/${userId}`}>Профиль</NavLink>
                <NavLink to="/messages">Сообщения</NavLink>
                <NavLink to="/users">Пользователи</NavLink>
                <NavLink to="/music">Музыка</NavLink>
                <NavLink to="/settings">Настройки</NavLink>
                { isAuthorized && 
                    <button className={cn(styles.exitButton)} onClick={ () => { onExit() } } >Выход</button>
                }
            </div>
        </aside>
    )
}

export default Sidebar