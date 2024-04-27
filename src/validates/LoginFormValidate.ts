import { FormikErrors, FormikValues } from 'formik'
import { regexpEmail, regexpPassword } from './common'

const RegExpEmail = new RegExp(regexpEmail)
const RegExpPassword = new RegExp(regexpPassword)

export const validateLoginForm = (values: FormikValues) => {
    const errors: FormikErrors<FormikValues> = {}
    const validationEmail = () => {
        if (!values.email) errors.email = 'Required'
        else if (!RegExpEmail.test(values.email))
            errors.email = 'Invalid email address!'
    }
    const validationPassword = () => {
        if (!values.password) errors.password = 'Required'
        else if (!RegExpPassword.test(values.password))
            errors.password = 'Invalid password!'
    }
    validationEmail()
    validationPassword()
    return errors
}
