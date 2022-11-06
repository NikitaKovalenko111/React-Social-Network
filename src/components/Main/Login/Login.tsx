import { useSelector } from "react-redux"
import { appDispatchType } from "../../../redux/store"
import { Formik, Field } from 'formik';
import cn from 'classnames'
import styles from './Login.module.sass'
import { loginThunk } from "../../../redux/reducers/auth-reducer";
import { compose } from "redux";
import { Navigate } from "react-router-dom";
import { getIsAuthorizedSelector } from "../../../selectors/header-selectors";
import { getUserIdSelector } from "../../../selectors/profile-selectors";
import { useDispatch } from "react-redux";
import closedEyeImg from '../../../images/closed-eye.png'
import openedEyeImg from '../../../images/opened-eye.png'
import { useState } from "react";

type PropsType = {}

type FormPropsType = {
    onLogin: (email: string, password: string, saveMe: boolean) => void
}

const Login: React.FC<PropsType> = (): JSX.Element => {

    const isAuthorized: boolean = useSelector(getIsAuthorizedSelector)
    const userId: number | null = useSelector(getUserIdSelector)

    const dispatch: appDispatchType = useDispatch()

    const onLogin = (email: string, password: string, saveMe: boolean) => {
        return dispatch(loginThunk(email, password, saveMe))
    }

    if (isAuthorized) {
        return <Navigate to={`/profile/${userId}`} />
    }
    return (
        <div className={ cn(styles.wrapper) }>
            <h1>Авторизация</h1>
            <LoginForm onLogin={ onLogin }/>
        </div>
    )
}

const LoginForm: React.FC<FormPropsType> = ({ onLogin }): JSX.Element => {

    const [isOpened, SetIsOpened] = useState(true)

    return (
        <Formik
       initialValues={{ email: '', password: '', saveMe: false }}
       onSubmit={ async (values, { setSubmitting }) => {
         let response = await onLogin(values.email, values.password, values.saveMe)

         setSubmitting(false)
       }}
        >
       {({
         values,
         handleSubmit,
         isSubmitting,
         handleChange
       }) => (
         <form onSubmit={handleSubmit} className={ cn(styles.formWrapper) } >
           <Field className={ cn(styles.input) } type="email" name="email" onChange={ handleChange } placeholder="Email" />
           <div className={cn(styles.passwordWrapper)}>
            <Field className={ cn(styles.input) } maxLength='32' type={ isOpened ? 'password' : 'text' } name="password" onChange={ handleChange } placeholder="Пароль" />
            <div className={cn(styles.eyesWrapper)}>
              { !isOpened && <img src={ closedEyeImg } alt="opened-eye" className={cn(styles.eye)} onClick={() => { SetIsOpened(true) }} /> }
              { isOpened && <img src={ openedEyeImg } alt="closed-eye" className={cn(styles.eye)} onClick={() => { SetIsOpened(false) }} /> }
            </div>
           </div>
           <label>Запомнить меня<Field type="checkbox" name="saveMe" onChange={ handleChange } /></label>
           <button type="submit" disabled={ isSubmitting }>Войти</button>
         </form>
       )}
     </Formik>
    )
}

export default compose()(Login) as React.FC