import cn from 'classnames'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import styles from './Sidebar.module.sass'
import { appStateType } from './../../redux/store'
import { appDispatchType } from './../../redux/store'
import { exitThunk } from '../../redux/reducers/auth-reducer'

type mdtpType = {
    onExit: () => void
}

type mstpType = {
    userId: number | null
    isAuthorized: boolean
}

const mstp = (state: appStateType): mstpType => { 
    return {
        userId: state.auth.userId,
        isAuthorized: state.auth.isAuthorized
    }
}

const mdtp = (dispatch: appDispatchType): mdtpType => {
    return {
        onExit: () => {
            dispatch(exitThunk())
        }
    }
}

type props = mstpType & mdtpType

const Sidebar: React.FC<props> = ({ userId, onExit, isAuthorized }): JSX.Element => {
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

export default connect(mstp, mdtp)(Sidebar)