import cn from 'classnames';
import { connect } from 'react-redux';
import styles from "./Header.module.sass"
import logo from './../../logo.svg'
import UserAvatar from '../../images/profile-image.jpg'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { getUserAvatarSelector } from '../../selectors/profile-selectors';
import { getIsAuthorizedSelector, getLoginSelector } from '../../selectors/header-selectors';

type props = {}

const Header: React.FC<props> = (): JSX.Element => {

    const userAvatar: string = useSelector(getUserAvatarSelector)
    const login: string = useSelector(getLoginSelector)
    const isAuthorized: boolean = useSelector(getIsAuthorizedSelector)

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

export default Header