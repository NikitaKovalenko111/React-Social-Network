import { Breadcrumb, Button, Space } from 'antd'
import useBreadcrumbs from 'use-react-router-breadcrumbs'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { createBrowserHistory } from 'history'

type PropsType = {

}

const BreadCrumbComponent: React.FC<PropsType> = (): JSX.Element => {
    const BreadCrumbs = useBreadcrumbs()
    const history = createBrowserHistory()      
    
    return (
        <Space style={{ marginLeft: 25 }}>
            <Button onClick={ () => { history.back() } }><ArrowLeftOutlined /></Button>
            <Breadcrumb style={{ margin: '16px 32px', fontSize: 18 }}>
                {
                    BreadCrumbs.map(el => {
                        return <Breadcrumb.Item href={ el.key }>{ el.breadcrumb }</Breadcrumb.Item>
                    })
                }
            </Breadcrumb>
        </Space>
    )
}

export default BreadCrumbComponent