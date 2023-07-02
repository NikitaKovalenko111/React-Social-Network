import cn from 'classnames'
import logo from '../../logo.svg'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import styles from './Sidebar.module.sass'
import { appDispatchType } from './../../redux/store'
import { exitThunk } from '../../redux/reducers/auth-reducer'
import { getUserIdSelector } from '../../selectors/profile-selectors'
import { getIsAuthorizedSelector } from '../../selectors/header-selectors'
import { useDispatch } from 'react-redux'
import { MessageOutlined, TeamOutlined, UserOutlined, CustomerServiceOutlined, SettingOutlined, LogoutOutlined} from '@ant-design/icons'
import type { MenuProps } from 'antd'

import { Layout, Button, Menu } from 'antd'
const { Sider } = Layout

type props = {}

type MenuItem = Required<MenuProps>['items'][number]

const Sidebar: React.FC<props> = (): JSX.Element => {

    const userId: number | null = useSelector(getUserIdSelector)
    const isAuthorized: boolean = useSelector(getIsAuthorizedSelector)

    const dispatch: appDispatchType = useDispatch()

    const navigate = useNavigate()

    const onExit = () => {
        dispatch(exitThunk())
    }

    function getItem(
        label: React.ReactNode,
        key: React.Key,
        icon?: React.ReactNode,
        children?: MenuItem[],
      ): MenuItem {
        return {
          key,
          icon,
          children,
          label,
        } as MenuItem;
      }
      
      const items: MenuItem[] = [
        getItem('Профиль', `/profile/${userId}`, <UserOutlined />),
        getItem('Общение', 'messages', <MessageOutlined />, [
          getItem('Чат', '/chat'),
          getItem('Сообщения', '/messages')
        ]),
        getItem('Пользователи', '/users', <TeamOutlined />),
        getItem('Музыка', '/music', <CustomerServiceOutlined />),
      ]

    const [collapsed, setCollapsed] = useState(false);

    return (
        <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
            <div className="logo" style={{ display: 'flex', justifyContent: 'center', padding: '10px 0' }}>
                <Link to="/"><img style={{ width: 87 }} src={logo} alt="logo" /></Link>
            </div>
            <Menu onClick={({key}) => {
                navigate(key)
            }} theme="dark" defaultSelectedKeys={[`${window.location.pathname}`]} mode="inline" items={items} />
            { isAuthorized && 
                <Button danger icon={<LogoutOutlined />} style={{ width: '100%', marginTop: 20, textTransform: 'uppercase', fontWeight: 'bold' }} type='primary' onClick={ () => { onExit() } } >{ !collapsed && 'Выход'}</Button>
            }
        </Sider>
    )
}

export default Sidebar