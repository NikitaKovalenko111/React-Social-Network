import { UserType } from "../../../../types/types"
import styles from '../Users.module.sass'
import cn from 'classnames'
import { NavLink } from 'react-router-dom'
import Avatar from '../../../../images/profile-image.jpg'
import { useEffect } from "react"

type props = {
    el: UserType
    count: number
    page: number
    isFollowing: Array<number>

    followToUser: (userId: number) => void
    unfollowToUser: (userId: number) => void
    getUsers: (count?: number, page?: number, term?: string, friend?: boolean) => void
}

const User: React.FC<props> = ({ el, followToUser, unfollowToUser, count, page, getUsers, isFollowing }): JSX.Element => {

    return (
        <div key={ el.id } className={ cn(styles.userBlock) }>
            <img width='100px' src={ el.photos.small ? el.photos.small : Avatar } alt='user-image' />
            <NavLink to={`/profile/${el.id}`}>{ el.name }</NavLink>
            { el.status ? <p>{ el.status }</p> : <p>Статуса нет</p> }
            { !el.followed ?
                <button disabled={ isFollowing.some(id => el.id === id) } onClick={() => { followToUser(el.id); getUsers(count, page) } } className={ cn(styles.followButton) }>Подписаться</button> :
                <button disabled={ isFollowing.some(id => el.id === id) } onClick={() => { unfollowToUser(el.id); getUsers(count, page) } } className={ cn(styles.followButton) }>Отписаться</button>
            }
        </div>
    )
}

export default User