import React, { useEffect } from 'react'
import { connect } from 'react-redux'
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

type props = {
  isAuthorized: boolean,
  userId: number | null,

  getMe: () => void
}

type mdtpType = {
  getMe: () => void
}

type mstpType = {
  isAuthorized: boolean
  userId: number | null
}

const mdtp = (dispatch: appDispatchType): mdtpType => {
  return {
    getMe: () => {
      dispatch(getMeThunk())
    }
  }
}

const mstp = (state: appStateType): mstpType => {
  return {
    isAuthorized: state.auth.isAuthorized,
    userId: state.auth.userId
  }
}

const App: React.FC<props> = React.memo(({ getMe, isAuthorized, userId }):JSX.Element => {
  
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

export default compose(connect(mstp, mdtp))(App) as React.FC
