import cn from 'classnames'
import styles from './Footer.module.sass'
import { Layout } from 'antd'
const { Footer } = Layout

type PropsType = {

}

const FooterComponent: React.FC<PropsType> = ({}): JSX.Element => {
    return (
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    )
}

export default FooterComponent