import { FormikErrors, FormikValues } from 'formik'
import { regexpLink } from './common'

const RegExpLink = new RegExp(regexpLink)
type typeOfValueType =
    | 'facebook'
    | 'youtube'
    | 'twitter'
    | 'instagram'
    | 'vk'
    | 'github'
    | 'mainLink'
    | 'website'
const errorMessage: string = 'Некорректная ссылка!'

const switchCheck = (
    errorMessage: string,
    typeOfValue: typeOfValueType,
    errors: FormikErrors<FormikValues>
) => {
    switch (typeOfValue) {
        case 'facebook':
            errors.facebook = errorMessage
            break
        case 'github':
            errors.github = errorMessage
            break
        case 'instagram':
            errors.instagram = errorMessage
            break
        case 'mainLink':
            errors.mainLink = errorMessage
            break
        case 'twitter':
            errors.twitter = errorMessage
            break
        case 'vk':
            errors.vk = errorMessage
            break
        case 'website':
            errors.website = errorMessage
            break
        case 'youtube':
            errors.youtube = errorMessage
            break
        default:
            break
    }
}

export const validateProfileForm = (values: FormikValues) => {
    const errors: FormikErrors<FormikValues> = {}

    const validateLink = (typeOfValue: typeOfValueType, value: string) => {
        if (!value) {
        } else if (!RegExpLink.test(value))
            switchCheck(errorMessage, typeOfValue, errors)
    }
    validateLink('facebook', values.facebook)
    validateLink('github', values.github)
    validateLink('instagram', values.instagram)
    validateLink('mainLink', values.mainLink)
    validateLink('twitter', values.twitter)
    validateLink('vk', values.vk)
    validateLink('website', values.website)
    validateLink('youtube', values.youtube)

    return errors
}
