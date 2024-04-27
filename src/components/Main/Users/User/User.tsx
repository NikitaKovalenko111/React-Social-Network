import { UserType } from '../../../../types/types'
import styles from '../Users.module.sass'
import cn from 'classnames'
import { NavLink } from 'react-router-dom'
import Avatar from '../../../../images/profile-image.jpg'

type props = {
    el: UserType
    isFollowing: Array<number>

    followToUser: (userId: number) => void
    unfollowToUser: (userId: number) => void
}

const User: React.FC<props> = ({
    el,
    followToUser,
    unfollowToUser,
    isFollowing,
}): JSX.Element => {
    return (
        <div key={el.id} className={cn(styles.userBlock)}>
            <img
                width="100px"
                src={el.photos.small ? el.photos.small : Avatar}
                alt="user-avatar"
            />
            <NavLink to={`/profile/${el.id}`}>{el.name}</NavLink>
            {el.status ? <p>{el.status}</p> : <p>Статуса нет</p>}
            {!el.followed ? (
                <button
                    disabled={isFollowing.some((id) => el.id === id)}
                    onClick={() => {
                        followToUser(el.id)
                    }}
                    className={cn(styles.followButton)}
                >
                    Подписаться
                </button>
            ) : (
                <button
                    disabled={isFollowing.some((id) => el.id === id)}
                    onClick={() => {
                        unfollowToUser(el.id)
                    }}
                    className={cn(styles.followButton)}
                >
                    Отписаться
                </button>
            )}
        </div>
    )
}

export default User
