import styles from './Users.module.sass'
import cn from 'classnames'
import { connect } from 'react-redux'
import { appDispatchType, appStateType } from '../../../redux/store'
import { UserType } from '../../../types/types'
import { useEffect, useState } from 'react'
import { followToUserThunk, getUsersThunk, unfollowToUserThunk } from '../../../redux/reducers/users-reducer'
import Paginator from './Paginator/Paginator'
import User from './User/User'
import Preloader from '../../common/Preloader/Preloader'

type props = {
    users: Array<UserType>
    totalCount: number
    error?: string
    count: number
    page: number
    isFollowing: Array<number>
    isLoading: boolean

    setPage: Function
    followToUser: (userId: number) => void
    unfollowToUser: (userId: number) => void
    getUsers: (count?: number, page?: number, term?: string, friend?: boolean) => void
}

type propsAPI = mstpType & mdtpType

type mstpType = {
    users: Array<UserType>
    totalCount: number
    error: string
    isFollowing: Array<number>
    isLoading: boolean
}

type mdtpType = {
    getUsers: (count?: number, page?: number, term?: string, friend?: boolean) => void
    followToUser: (userId: number) => void
    unfollowToUser: (userId: number) => void
}

const mstp = (state: appStateType): mstpType => {
    return {
        users: state.users.users,
        totalCount: state.users.totalCount,
        error: state.users.error,
        isFollowing: state.users.isFollowing,
        isLoading: state.profile.isLoading
    }
}

const mdtp = (dispatch: appDispatchType): mdtpType => {
    return {
        getUsers: (count, page, term, friend) => {
            dispatch(getUsersThunk(count, page, term, friend))
        },
        followToUser: (userId: number) => {
            dispatch(followToUserThunk(userId))
        },
        unfollowToUser: (userId: number) => {
            dispatch(unfollowToUserThunk(userId))
        },
    }
}

const Users: React.FC<props> = ({ isLoading, users, totalCount, count, page, setPage, followToUser, unfollowToUser, getUsers, isFollowing }): JSX.Element => {

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

const UsersAPI: React.FC<propsAPI> = ({ isLoading, getUsers, users, totalCount, error, followToUser, unfollowToUser, isFollowing }): JSX.Element => {

    const count: number = 18
    let [ page, setPage ] = useState(1)

    useEffect(() => {
        getUsers(count, page)     
    }, [page])

    return (
        <Users isLoading={ isLoading } isFollowing={ isFollowing } getUsers={ getUsers } unfollowToUser={ unfollowToUser } followToUser={ followToUser } setPage={ setPage } page={ page } count={ count } totalCount={ totalCount } users={ users } />
    )
}

export default connect(mstp, mdtp)(UsersAPI)