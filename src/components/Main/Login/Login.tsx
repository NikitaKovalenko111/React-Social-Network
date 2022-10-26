import { useSelector } from "react-redux"
import { appDispatchType } from "../../../redux/store"
import { Formik } from 'formik';
import cn from 'classnames'
import styles from './Login.module.sass'
import { loginThunk } from "../../../redux/reducers/auth-reducer";
import { compose } from "redux";
import { Navigate } from "react-router-dom";
import { getIsAuthorizedSelector } from "../../../selectors/header-selectors";
import { getUserIdSelector } from "../../../selectors/profile-selectors";
import { useDispatch } from "react-redux";

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
           <input className={ cn(styles.input) } type="email" name="email" value={ values.email } onChange={ handleChange } />
           <input className={ cn(styles.input) } type="password" name="password" value={ values.password } onChange={ handleChange } />
           <label>Запомнить меня<input type="checkbox" name="saveMe" onChange={ handleChange } /></label>
           <button type="submit" disabled={ isSubmitting }>Войти</button>
         </form>
       )}
     </Formik>
    )
}

export default compose()(Login) as React.FC