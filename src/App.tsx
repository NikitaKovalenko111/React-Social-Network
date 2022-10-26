import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes, Navigate } from 'react-router-dom'
import './App.sass'
import Header from './components/Header/Header'
import Login from './components/Main/Login/Login'
import Music from './components/Main/Music/Music'
import Profile from './components/Main/Profile/Profile'
import Users from './components/Main/Users/Users'
import Sidebar from './components/Sidebar/Sidebar'
import { getMeThunk } from './redux/reducers/auth-reducer'
import { appDispatchType, appStateType } from './redux/store'
import { compose } from 'redux'
import Footer from './components/Footer/Footer'
import { getIsAuthorizedSelector } from './selectors/header-selectors'
import { getUserIdSelector } from './selectors/profile-selectors'
import { useDispatch } from 'react-redux'

type props = {}

const App: React.FC<props> = React.memo(():JSX.Element => {

  const isAuthorized: boolean = useSelector(getIsAuthorizedSelector)
  const userId: number | null = useSelector(getUserIdSelector)

  const dispatch: appDispatchType = useDispatch()

  const getMe = () => {
    dispatch(getMeThunk())
  }
  
  useEffect(() => {
    getMe()
  }, [isAuthorized])

  return (
    <div className='wrapper'>
      <Header />
      <Sidebar />
      <Routes>
        <Route path='/' element={ <Navigate to={`/profile/${userId}`} />} />
        <Route path={`/profile/:userId`} element={ <Profile  /> }/>
        <Route path={`/users`} element={ <Users /> } />
        <Route path={`/login`} element={ <Login /> } />
        <Route path={`/music`} element={ <Music /> } />
      </Routes>
      <Footer />
    </div>
    );
})

export default compose()(App) as React.FC
