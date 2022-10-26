import styles from './Users.module.sass'
import cn from 'classnames'
import { appDispatchType } from '../../../redux/store'
import { UserType } from '../../../types/types'
import { useEffect, useState } from 'react'
import { followToUserThunk, getUsersThunk, unfollowToUserThunk } from '../../../redux/reducers/users-reducer'
import Paginator from './Paginator/Paginator'
import User from './User/User'
import Preloader from '../../common/Preloader/Preloader'
import { compose } from 'redux'
import { getIsFollowingSelector, getTotalCountSelector, getUsersSelector } from '../../../selectors/users-selectors'
import { useSelector } from 'react-redux'
import { getIsLoadingSelector } from '../../../selectors/profile-selectors'
import { useDispatch } from 'react-redux'

type props = {
    
}

const Users: React.FC<props> = (): JSX.Element => {

    const users: Array<UserType> = useSelector(getUsersSelector)
    const totalCount: number = useSelector(getTotalCountSelector)
    const isFollowing: Array<number> = useSelector(getIsFollowingSelector)
    const isLoading: boolean = useSelector(getIsLoadingSelector)
    const count: number = 18

    const dispatch: appDispatchType = useDispatch()
    let [ page, setPage ] = useState(1)

    const getUsers = (count?: number, page?: number, term?: string, friend?: boolean) => {
        dispatch(getUsersThunk(count, page, term, friend))
    }
    const followToUser = (userId: number) => {
        dispatch(followToUserThunk(userId))
    }
    const unfollowToUser = (userId: number) => {
        dispatch(unfollowToUserThunk(userId))
    }

    useEffect(() => {
        getUsers(count, page)     
    }, [page])

    if (isLoading) {
        return <Preloader />
    }

    return (
        <div>
            <div className={ cn(styles.usersWrapper) }>
           { users.map(el => {
                return (
                <User isFollowing={ isFollowing } getUsers={ getUsers } count={ count } page={ page } key={ el.id } el={ el } followToUser={ followToUser } unfollowToUser={ unfollowToUser } />
                )
            }) }
            </div>
            <Paginator setPage={ setPage } page={ page } count={ count } totalCount={ totalCount } />
        </div>
    )
}

export default compose()(Users)