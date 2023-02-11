import { useSelector } from "react-redux"
import { appDispatchType } from "../../../redux/store"
import { ErrorMessage, Formik } from 'formik';
import cn from 'classnames'
import styles from './Login.module.sass'
import { loginThunk } from "../../../redux/reducers/auth-reducer";
import { compose } from "redux";
import { Navigate } from "react-router-dom";
import { getIsAuthorizedSelector } from "../../../selectors/header-selectors";
import { getUserIdSelector } from "../../../selectors/profile-selectors";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Form, Input, Button, Checkbox, PageHeader, Alert } from 'antd'
import { MailOutlined, LockOutlined,   } from '@ant-design/icons'
import { validateLoginForm } from "../../../validates/LoginFormValidate";

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
            <PageHeader style={{ fontSize: 25, textTransform: 'uppercase' }} >Авторизация</PageHeader>
            <LoginForm onLogin={ onLogin }/>
        </div>
    )
}

const LoginForm: React.FC<FormPropsType> = ({ onLogin }): JSX.Element => {

    const [isOpened, SetIsOpened] = useState(true)

    return (
        <Formik
       initialValues={{ email: '', password: '', saveMe: false }}
       validate={validateLoginForm}
       onSubmit={ async (values, { setSubmitting }) => {
         let response = await onLogin(values.email, values.password, values.saveMe)

         setSubmitting(false)
       }}
        >
       {({
         values,
         handleSubmit,
         isSubmitting,
         handleChange,
         submitForm,
         errors,
         touched
       }) => (
         <Form onFinish={ handleSubmit } className={ cn(styles.formWrapper) } >
           <div>
            <Input size="large" style={{ fontSize: 18, width: 500 }} prefix={<MailOutlined style={{ fontSize: 18 }} />} type="email" name="email" onChange={ handleChange } placeholder="Email" />
            { errors.email && touched && <Alert showIcon type="error" message={ errors.email } /> }
           </div>
           <div className={cn(styles.passwordWrapper)}>
              <Input.Password style={{ fontSize: 18, width: 500 }} prefix={ <LockOutlined style={{ fontSize: 18 }} /> } placeholder="Password" maxLength={32} size="large" onChange={ handleChange } name="password" />
              { errors.password && touched && <Alert showIcon type="error" message={ errors.password } /> }
           </div>
           <Checkbox style={{ fontSize: 20, width: 500, height: 50, display: 'flex', alignItems: 'center' }} name="saveMe" onChange={ handleChange }>Запомнить меня</Checkbox>
           <Button style={{ height: 40, textTransform: 'uppercase', fontSize: 18 }} onClick={ submitForm } disabled={ isSubmitting }>Войти</Button>
         </Form>
       )}
     </Formik>
    )
}

export default compose()(Login) as React.FC