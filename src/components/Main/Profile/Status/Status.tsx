import cn from 'classnames'
import styles from './Status.module.sass'
import { useState } from "react";
import changeIcon from './../../../../images/changeIcon.svg'
import saveIcon from './../../../../images/saveIcon.svg'
import { Formik, Field } from 'formik';
import Preloader from '../../../common/Preloader/Preloader';
import React from 'react'

type props = {
    status: string
    isOwner: boolean
    isLoading: boolean

    setStatus: (status: string) => void
    setIsLoading: (value: boolean) => void
}

const Status: React.FC<props> = React.memo(({setIsLoading, isLoading, status, setStatus, isOwner }): JSX.Element => {

    let [editMode, setEditMode] = useState(false),

    changeEditMode = (): void => {
        if (!editMode) setEditMode(true)
        else setEditMode(false)
    }

    if (isLoading) {
        return <Preloader />
    }

    return (
        <div className={cn(styles.wrapper)}>
            <Formik
            initialValues={{ status: status }}
            enableReinitialize={true}
            onSubmit={ async (values, { setSubmitting }) => {
                setIsLoading(true)
                let response = await setStatus(values.status)
                changeEditMode()
                setIsLoading(false)
                setSubmitting(false)
            }}
                >
            {({
                values,
                handleSubmit,
                isSubmitting,
                handleChange
            }) => (
                !editMode ? 
                <div className={cn(styles.statusWrapper)}>
                    <p className={cn(styles.status)}>{ status ? status : "Статуса нет" }</p>
                    { isOwner && <img onClick={ changeEditMode } className={cn(styles.changeIcon)} src={ changeIcon } alt="change" /> }
                </div> : 
                <form className={cn(styles.statusWrapper)} onSubmit={ handleSubmit }>
                    <Field className={cn(styles.statusInput)} type="text" onChange={ handleChange } name='status' maxLength={50} autoFocus />
                    <button className={ cn(styles.button) } type='submit' ><img className={cn(styles.saveIcon)} src={ saveIcon } alt="save" /></button>
                </form> 
            )}
            </Formik>
        </div>
    )
})

export default Status