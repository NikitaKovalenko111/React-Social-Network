import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes, Navigate } from 'react-router-dom'
import './App.sass'
import Header from './components/Header/Header'
import Login from './components/Main/Login/Login'
import Music from './components/Main/Music/Music'
import Profile from './components/Main/Profile/Profile'
import Users from './components/Main/Users/Users'
import Sidebar from './components/Sidebar/Sidebar'
import Chat from './components/Main/Chat/Chat'
import { getMeThunk } from './redux/reducers/auth-reducer'
import { appDispatchType } from './redux/store'
import { compose } from 'redux'
import FooterComponent from './components/Footer/Footer'
import { getIsAuthorizedSelector } from './selectors/header-selectors'
import { getUserIdSelector } from './selectors/profile-selectors'
import { useDispatch } from 'react-redux'
import 'antd/dist/antd.css'

import { Layout } from 'antd'
import BreadCrumbComponent from './components/Main/Breadcrumb/Breadcrumb'
const { Content } = Layout

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
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar />
      <Layout className="site-layout">
        <Header />
        <Content style={{ margin: '0 16px' }}>
          <BreadCrumbComponent />
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360, height: '80%' }}>
            <Routes>
              <Route path='/' element={ <Navigate to={`/profile/${userId}`} />} />
              <Route path={`/profile/:userId`} element={ <Profile  /> }/>
              <Route path={`/users`} element={ <Users /> } />
              <Route path={`/login`} element={ <Login /> } />
              <Route path={`/music`} element={ <Music /> } />
              <Route path={'/chat'} element={ <Chat /> } />
            </Routes>
          </div>
        </Content>
        <FooterComponent />
      </Layout>
    </Layout>
  );
})

export default compose()(App) as React.FC
