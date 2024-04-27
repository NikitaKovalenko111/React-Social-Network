import cn from 'classnames'
import styles from './Paginator.module.sass'
import { Pagination } from 'antd'
import { BrowserHistory } from 'history'

type props = {
    totalCount: number
    count: number
    page: number
    history: BrowserHistory
    term: string
    friend: number | undefined

    setPage: (page: number) => void
    setCount: (number: number) => void
}

const Paginator: React.FC<props> = ({
    totalCount,
    count,
    setPage,
    page,
    setCount,
    history,
    term,
    friend,
}) => {
    const friendValue = friend === undefined ? null : friend

    return (
        <div className={cn(styles.paginator)}>
            <Pagination
                hideOnSinglePage={true}
                pageSizeOptions={[10, 20, 30, 40, 50, 100]}
                current={page}
                defaultPageSize={count}
                total={totalCount}
                onChange={(currentPage, currentPageSize) => {
                    if (!!currentPage) setPage(currentPage)
                    if (!!currentPageSize) setCount(currentPageSize)
                    history.push({
                        pathname: 'users',
                        search: `${term && 'term=' + term}${
                            friendValue !== null
                                ? '&friends=' + friendValue
                                : ''
                        }&page=${currentPage}`,
                    })
                }}
            />
        </div>
    )
}

export default Paginator
