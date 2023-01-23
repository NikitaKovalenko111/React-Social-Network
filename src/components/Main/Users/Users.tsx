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
import { Form, Input, Select, Button } from 'antd'
import { Formik } from 'formik';
import { SearchOutlined } from '@ant-design/icons'
import { BrowserHistory, createBrowserHistory } from 'history'

type props = {
    
}

type filterProps = {
    getUsers: (term: string, count?: number, page?: number, friend?: boolean) => void
    count: number
    page: number
    history: BrowserHistory
    term: string
    query: URLSearchParams
    friend: number | undefined
}

const Filter: React.FC<filterProps> = ({ getUsers, count, page, history, term, friend, query }): JSX.Element => {
    return (
        <div>
            <Formik
            initialValues={{ term: term, friend: friend !== undefined ? friend : null }}
            enableReinitialize
            onSubmit={ async (values, { setSubmitting }) => {

                const queryObject = {
                    term: values.term,
                    friends: String(values.friend),
                    page: String(page)
                }

                const searchString = new URLSearchParams(queryObject).toString()

                history.push({
                    pathname: 'users',
                    search: searchString
                })
                getUsers( values.term, count, page, values.friend != null ? Boolean(Number(values.friend)) : undefined )
                
                setSubmitting(false)
            }}
                >
            {({
                values,
                handleSubmit,
                isSubmitting,
                handleChange,
                submitForm,
                setFieldValue
            }) => (
                <Form onFinish={ handleSubmit } >
                    <div style={{ display: 'flex' }}>
                        <Input name='term' onChange={ handleChange } prefix={<SearchOutlined />} placeholder='Поиск' value={ values.term } />
                        <Select defaultValue={ values.friend === 0 || values.friend === 1 ? String(values.friend) : null } style={{ width: 165 }} onChange={(value) => { setFieldValue('friend', value) }} options={[
                            {
                            value: null,
                            label: 'Все'
                            },
                            {
                            value: '0',
                            label: 'Только не друзья',
                            },
                            {
                            value: '1',
                            label: 'Только друзья',
                            }
                        ]} />
                        <Button onClick={ submitForm }>Поиск</Button>
                    </div>
                </Form>
            )}
            </Formik>
        </div>
    )
}

const Users: React.FC<props> = (): JSX.Element => {

    const users: Array<UserType> = useSelector(getUsersSelector)
    const totalCount: number = useSelector(getTotalCountSelector)
    const isFollowing: Array<number> = useSelector(getIsFollowingSelector)
    const isLoading: boolean = useSelector(getIsLoadingSelector)
    const defaultCount: number = 20
    const history = createBrowserHistory()

    const dispatch: appDispatchType = useDispatch()
    let [ page, setPage ] = useState(1)
    let [ count, setCount ] = useState(defaultCount)

    const getUsers = (term: string, count?: number, page?: number, friend?: boolean) => {
        dispatch(getUsersThunk(count, page, term, friend))
    }
    const followToUser = (userId: number) => {
        dispatch(followToUserThunk(userId))
    }
    const unfollowToUser = (userId: number) => {
        dispatch(unfollowToUserThunk(userId))
    }

    let query: URLSearchParams = new URLSearchParams(history.location.search.substring(1))
    let actualPage = query.has('page') ? Number(query.get('page')) : page

    let actualFriend = query.has('friends') ? Number(query.get('friends')) : undefined
    let actualTerm = query.has('term') ? query.get('term') : ''

    useEffect(() => {
        actualPage = page
        
        getUsers(actualTerm as string, count, actualPage, Boolean(actualFriend))     
    }, [page, count])

    if (isLoading) {
        return <Preloader />
    }

    return (
        <div>
            <Filter term={ actualTerm as string } query={ query } friend={ actualFriend } history={ history } getUsers={ getUsers } count={ count } page={ actualPage } />
            <div className={ cn(styles.usersWrapper) }>
           { users.map(el => {
                return (
                <User isFollowing={ isFollowing } key={ el.id } el={ el } followToUser={ followToUser } unfollowToUser={ unfollowToUser } />
                )
            }) }
            </div>
            <Paginator term={ actualTerm as string } friend={ actualFriend } history={ history } setCount={ setCount } setPage={ setPage } page={ actualPage } count={ count } totalCount={ totalCount } />
        </div>
    )
}

export default compose()(Users)