import cn from 'classnames';
import { connect } from 'react-redux';
import styles from "./Header.module.sass"
import logo from './../../logo.svg'
import UserAvatar from '../../images/profile-image.jpg'
import { appDispatchType, appStateType } from '../../redux/store';
import { NavLink } from 'react-router-dom'

type props = mstpType & mdtpType

type mstpType = {
    login: string
    isAuthorized: boolean
    userAvatar: string
}

type mdtpType = {

}

const mstp = (state: appStateType): mstpType => {
    return {
        isAuthorized: state.auth.isAuthorized,
        login: state.auth.login,
        userAvatar: state.profile.myProfileImages.small
    }
}

const mdtp = (dispatch: appDispatchType): mdtpType => {
    return {

    }
}

const Header: React.FC<props> = ({ userAvatar, isAuthorized, login }): JSX.Element => {
    return (
        <header className={cn(styles.header, 'header')}>
            <div className={cn(styles.header__container, 'container')}>
                <div className={cn(styles.logo)}>
                    <a href="/"><img src={ logo } alt="logo" /></a>
                </div>
                { isAuthorized ? 
                <div className={cn(styles.profile)}>
                    <p>{ login }</p>
                    <img width='75px' src={ userAvatar ? userAvatar : UserAvatar } alt="avatar" />
                </div> 
                : <div className={cn(styles.profile)}>
                    <NavLink to="login">Войти</NavLink>
                </div> }
            </div>
        </header>
    );
}

export default connect(mstp, mdtp)(Header)