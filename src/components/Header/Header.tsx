import cn from 'classnames';
import styles from "./Header.module.sass"
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { getUserAvatarSelector } from '../../selectors/profile-selectors';
import { getIsAuthorizedSelector, getLoginSelector } from '../../selectors/header-selectors';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Row, Col } from 'antd';

import { Layout } from 'antd'
const { Header } = Layout

type props = {}

const HeaderComponent: React.FC<props> = (): JSX.Element => {

    const userAvatar: string = useSelector(getUserAvatarSelector)
    const login: string = useSelector(getLoginSelector)
    const isAuthorized: boolean = useSelector(getIsAuthorizedSelector)

    return (
        <Header className="site-layout-background" style={{ height: 'auto' }} >
            <div className="container" style={{ padding: "10px 0" }}>
                { isAuthorized ? 
                <Row justify={'end'} align={'middle'} gutter={10}>
                    <Col style={{ fontWeight: 'bold', color: 'white', fontSize: 16 }}>{ login }</Col>
                    <Col><Avatar size={64} icon={ userAvatar ? <img src={ userAvatar } /> : <UserOutlined />} /></Col>
                </Row> 
                : <Row justify={'end'} align={'middle'}>
                    <Col><NavLink style={{ color: 'white', textTransform: 'uppercase' }} to="login">Войти</NavLink></Col>
                </Row> }
            </div>
        </Header>
    );
}

export default HeaderComponent