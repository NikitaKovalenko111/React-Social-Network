import { Layout } from 'antd'
const { Footer } = Layout

type PropsType = {}

const FooterComponent: React.FC<PropsType> = ({}): JSX.Element => {
    return (
        <Footer style={{ textAlign: 'center' }}>Сайт был создан в качестве пет-проекта. Автор: Никита Коваленко - <a href='https://github.com'>GitHub</a></Footer>
    )
}

export default FooterComponent