import cn from 'classnames'
import { useState } from 'react'
import styles from './Paginator.module.sass'
import leftArrow from '../../../../images/left-arrow.png'
import rightArrow from '../../../../images/right-arrow.png'

type props = {
    totalCount: number
    count: number
    page: number
    
    setPage: Function
}

const Paginator: React.FC<props> = ({ totalCount, count, setPage, page }) => {

    const setPageFunc = (page: number) => {
        return () => {
            setPage(page)
        }
    }

    let pages: Array<number> = []
    const portionSize: number = 5
    const pagesCount: number = Math.ceil(totalCount / count)

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    const portionCount = Math.ceil(pagesCount / portionSize)
    let [ portionNumber, setPortionNumber ] = useState(1)
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    let rightPortionPageNumber = portionNumber * portionSize
    
    return (
        <div className={ cn(styles.paginator) }>
            { portionNumber > 1 && <img onClick={ () => setPortionNumber(portionNumber - 1) } src={ leftArrow } alt="left-arrow" /> }
            {  
                pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)     
                .map(el => {
                    return <button key={ el } onClick={ setPageFunc(el) }>{ el }</button>
                })
            }
            { portionCount > portionNumber && <img onClick={ () => setPortionNumber(portionNumber + 1) } src={ rightArrow } alt="right-arrow" /> }
        </div>
    )
}

export default Paginator
