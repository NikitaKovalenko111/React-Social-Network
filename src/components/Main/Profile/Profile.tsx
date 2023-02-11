import cn from 'classnames'
import styles from './Profile.module.sass'
import { useSelector } from 'react-redux'
import image from './../../../images/profile-image.jpg'
import { setStatusThunk, setPhotosThunk, getProfileThunk, setOwnerAC, getStatusThunk, setIsLoadingAC, changeProfileThunk } from '../../../redux/reducers/profile-reducer'
import { appDispatchType } from './../../../redux/store'
import Status from './Status/Status'
import React, { useEffect, useState } from 'react'
import { compose } from 'redux'
import { useParams } from 'react-router-dom'
import vk from '../../../images/vk.svg'
import { contactsTypes } from '../../../types/types'
import Redirect from "../../../hoc/Redirect"
import Preloader from '../../common/Preloader/Preloader'
import { Formik, Field } from 'formik';
import { getAboutMeSelector, getContactsSelector, getFullNameSelector, getIsLoadingSelector, getIsOwnerSelector, getLookingForAJobSelector, getLookingForAJobDescriptionSelector, getMyPhotoSelector, getStatusSelector, getUserPhotoSelector, getUserIdSelector } from '../../../selectors/profile-selectors'
import { useDispatch } from 'react-redux'
import { Form, Input, Button, Select, Space, Alert } from 'antd'
import { FacebookOutlined, GithubOutlined, YoutubeOutlined, TwitterOutlined, InstagramOutlined, ChromeOutlined } from '@ant-design/icons'
import { validateProfileForm } from '../../../validates/ProfileFormValidate'

const { Option } = Select;

type UriParams = {
    userId?: number
}

type ProfilePropsType = {}

const Profile: React.FC<ProfilePropsType> = React.memo((): JSX.Element => {
    const isLoading: boolean = useSelector(getIsLoadingSelector)
    const isOwner: boolean = useSelector(getIsOwnerSelector)
    const status: string = useSelector(getStatusSelector)
    const MyPhoto: string = useSelector(getMyPhotoSelector)
    const UserPhoto: string = useSelector(getUserPhotoSelector)
    const fullName: string = useSelector(getFullNameSelector)
    const lookingForAJob: boolean | null = useSelector(getLookingForAJobSelector)
    const lookingForAJobDescription: string = useSelector(getLookingForAJobDescriptionSelector)
    const aboutMe: string | null = useSelector(getAboutMeSelector)
    const contacts: contactsTypes = useSelector(getContactsSelector)
    const userId: number | null = useSelector(getUserIdSelector)
    const [ProfileDataForm, setProfileDataForm] = useState(false)

    const dispatch: appDispatchType = useDispatch()

    const getStatus = (userId: number | null) => {
        dispatch(getStatusThunk(userId as number))
    }
    const getProfile = (userId: number | null) => {
        dispatch(getProfileThunk(userId as number))
    }
    const setPhotos = (file: File | null) => {
        dispatch(setPhotosThunk(file))
    }
    const setIsOwner = (value: boolean) => {
        dispatch(setOwnerAC(value))
    }
    const setIsLoading = (value: boolean) => {
        dispatch(setIsLoadingAC(value))
    }
    const setStatus = (status: string) => {
        dispatch(setStatusThunk(status))
    }
    const changeProfile = (userId: number | null, fullName: string, aboutMe: string, lookingForAJob: boolean, lookingForAJobDescription: string | null, contacts: contactsTypes) => {
        dispatch(changeProfileThunk(userId, fullName, aboutMe, lookingForAJob, lookingForAJobDescription, contacts))
    }

    let counter = 0

    const params: UriParams = useParams() 

    useEffect(() => {
        getProfile(Number(params.userId)) 
        getStatus(Number(params.userId))
        if (userId === Number(params.userId))
            setIsOwner(true)
        else setIsOwner(false)
    }, [params.userId])

    if (isLoading) {
        return <Preloader />
    }

    const ErrorDescription = "Вид ссылки: (https|http)://(домен)/..."

    return (
            <div className={cn(styles.infoBlock)}>
                <Formik initialValues={{ file: null }}
                    onSubmit={ async (values, { setSubmitting }) => {       
                        let response = await setPhotos(values.file)                
                        setSubmitting(false)
                    }}
                        >
                    {({
                        values,
                        handleSubmit,
                        isSubmitting,
                        handleChange,
                        submitForm, 
                        setFieldValue,
                    }) => (
                    <Form onFinish={handleSubmit} className={cn(styles.avatarWrapper, {[styles.avatarWrapperIsOwner]: isOwner})}>
                        <div className={cn(styles.formContainer)}>
                            { !isOwner &&
                                <div>
                                    <img className={cn(styles.avatar)} width='400px' src={ isOwner && MyPhoto ? MyPhoto : !isOwner && UserPhoto ? UserPhoto : image } alt="image" />
                                </div>
                            }
                            { isOwner && 
                                <div className={cn(styles.div)}>
                                    <img className={cn(styles.avatar) } width='400px' src={ isOwner && MyPhoto ? MyPhoto : !isOwner && UserPhoto ? UserPhoto : image } alt="image" />
                                    <div className={cn(styles.parent) }>
                                        <label htmlFor='fileInput'>
                                            <Form.Item>
                                                <Input type="file" name='file' onChange={(event) => {
                                                    if (event.target.files) {
                                                        setFieldValue('file', event.target.files[0])
                                                    }
                                                    submitForm()
                                                }} id='fileInput' accept='image/*' disabled={isSubmitting} />
                                                <div className={cn(styles.after)}>

                                                </div>
                                            </Form.Item>
                                        </label>
                                    </div>
                                </div>
                            }
                        </div>
                    </Form> )}
                </Formik>
                <div className={cn(styles.right_side)}>
                    <div className={cn(styles.form_container)}>
                        <div className={cn(styles.fullname)}>{ fullName }</div>
                        <Status setIsLoading={setIsLoading} isLoading={isLoading} isOwner={isOwner} setStatus={setStatus} status={status} />
                        {
                            !ProfileDataForm ?
                            <div className={cn(styles.notForm)}>
                                <Space direction='vertical'>
                                    <p className={cn(styles.lookingForAJob)}>Ищет работу: <span className={cn(lookingForAJob ? styles.lookingForAJobGreen : styles.lookingForAJobRed)}>{ lookingForAJob ? 'Да' : 'Нет' }</span></p>
                                    { lookingForAJob && <p className={cn(styles.lookingForAJobDescription)}>Мои навыки: { lookingForAJobDescription }</p> }
                                    { aboutMe && <p className={cn(styles.aboutMe)}>Обо мне: { aboutMe }</p> }
                                    <div className={cn(styles.contacts)} style={{ fontSize: 18, fontFamily: 'sans-serif', padding: '0 0 10px 0' }}>
                                        Контакты:
                                        { Object.keys(contacts).map(el => {                      
                                            if (contacts[el] !== null && contacts[el] != '') {
                                                return <a key={el} href={contacts[el]}>{el === 'github' ? <GithubOutlined width={40} style={{ color: 'black', fontSize: 30 }} /> : el === 'facebook' ? <FacebookOutlined width={40} style={{ color: 'black', fontSize: 30 }} /> : el === 'youtube' ? <YoutubeOutlined width={40} style={{ color: 'black', fontSize: 30 }} /> : el === 'vk' ? <img src={ vk } alt="vk" height="30px" /> : el === 'twitter' ? <TwitterOutlined width={40} style={{ color: 'black', fontSize: 30 }} /> : el === 'instagram' ? <InstagramOutlined width={40} style={{ color: 'black', fontSize: 30 }} /> : <ChromeOutlined width={40} style={{ color: 'black', fontSize: 30 }} /> }</a>
                                            }
                                            else {
                                                counter++
                                                if(counter === Object.keys(contacts).length)
                                                    return <span className={cn(styles.emptyContacts)}>Нет</span>
                                            }
                                        }) }
                                    </div>
                                    {
                                        isOwner && !ProfileDataForm && <button onClick={ () => setProfileDataForm(true) } className={cn(styles.editButton)}>Редактировать</button>
                                    }
                                </Space>
                            </div> :
                            <Formik initialValues={{ lookingForAJob: lookingForAJob ? '1' : '0', fullName: fullName, lookingForAJobDescription: lookingForAJobDescription == '' ? null : lookingForAJobDescription, aboutMe: aboutMe, mainLink: /*!!contacts.mainLink ? */contacts.mainLink/*.substring(selectBeforeValue.length, contacts.mainLink.length - selectAfterValue.length) : null*/, website: contacts.website, facebook: contacts.facebook, github: contacts.github, vk: contacts.vk, instagram: contacts.instagram, youtube: contacts.youtube, twitter: contacts.twitter }}
                            enableReinitialize={true}
                            validate={validateProfileForm}
                            onSubmit={ async (values, { setSubmitting }) => {                                                 
                                let contacts: contactsTypes = {
                                    facebook: values.facebook,
                                    instagram: values.instagram,
                                    vk: values.vk,
                                    youtube: values.youtube,
                                    twitter: values.twitter,
                                    mainLink:  values.mainLink,
                                    github: values.github,
                                    website: values.website,
                                }                          
                                let response = await changeProfile(userId, values.fullName, values.aboutMe as string, Boolean(Number(values.lookingForAJob)), values.lookingForAJobDescription, contacts)
                                
                                setProfileDataForm(false)          
                                setSubmitting(false)
                            }}
                                >
                            {({
                                values,
                                handleSubmit,
                                isSubmitting,
                                handleChange,
                                setFieldValue,
                                errors,
                                touched
                            }) => (
                            <Form onFinish={handleSubmit} className={cn(styles.form)}>
                                <Space direction='vertical' size={10}>
                                    <div style={{ fontFamily: 'sans-serif', fontSize: 16 }} className={cn(styles.lookingForAJob)}>Ищу работу: <Select defaultValue={ values.lookingForAJob } onSelect={ handleChange } onChange={(value) => { setFieldValue('lookingForAJob', value) }}>
                                        <Option value="0">Нет</Option>
                                        <Option value="1">Да</Option>
                                    </Select></div>
                                    { values.lookingForAJob === '1' && <div style={{ fontFamily: 'sans-serif', fontSize: 16 }} className={cn(styles.lookingForAJobDescription)}>Мои навыки: <Input name={"lookingForAJobDescription"} defaultValue={ values.lookingForAJobDescription as string } placeholder="Ваши навыки" /></div> }
                                    <div style={{ fontFamily: 'sans-serif', fontSize: 16 }} className={cn(styles.aboutMe)}>Обо мне: <Input.TextArea onChange={ handleChange } value={values.aboutMe as string} name={'aboutMe'} placeholder='Информация о Вас' /></div>
                                    <div style={{ fontFamily: 'sans-serif', fontSize: 16 }} className={cn(styles.contacts)}>
                                        <p>Контакты:</p>
                                        <div className={cn(styles.contacts_container)}>
                                            <div>
                                                <Input onChange={ handleChange } addonAfter={<FacebookOutlined />} name="facebook" defaultValue={!!values.facebook ? values.facebook : ''} placeholder="Ссылка на ваш facebook" />
                                                { errors.facebook && touched && <Alert type='error' description={ErrorDescription} message={ errors.facebook } showIcon /> }
                                            </div>
                                            <div>
                                                <Input onChange={ handleChange } addonAfter={<YoutubeOutlined />} name="youtube" defaultValue={!!values.youtube ? values.youtube : ''} placeholder="Ссылка на ваш youtube" />
                                                { errors.youtube && touched && <Alert type='error' description={ErrorDescription} message={ errors.youtube } showIcon /> }
                                            </div>
                                            <div>
                                                <Input onChange={ handleChange } addonAfter={<TwitterOutlined />} name="twitter" defaultValue={!!values.twitter ? values.twitter : ''} placeholder="Ссылка на ваш twitter" />
                                                { errors.twitter && touched && <Alert type='error' description={ErrorDescription} message={ errors.twitter } showIcon /> }
                                            </div>
                                            <div>
                                                <Input onChange={ handleChange } addonAfter={<InstagramOutlined />} name="instagram" defaultValue={!!values.instagram ? values.instagram : ''} placeholder="Ссылка на ваш instagram" />
                                                { errors.instagram && touched && <Alert type='error' description={ErrorDescription} message={ errors.instagram } showIcon /> }
                                            </div>
                                            <div>
                                                <Input onChange={ handleChange } name="vk" defaultValue={!!values.vk ? values.vk : ''} placeholder="Ссылка на ваш ВК" />
                                                { errors.vk && touched && <Alert type='error' description={ErrorDescription} message={ errors.vk } showIcon /> }
                                            </div>
                                            <div>
                                                <Input onChange={ handleChange } addonAfter={<GithubOutlined />} name="github" defaultValue={!!values.github ? values.github : ''} placeholder="Ссылка на ваш github" />
                                                { errors.github && touched && <Alert type='error' description={ErrorDescription} message={ errors.github } showIcon /> }
                                            </div>
                                            <div>
                                                <Input onChange={ handleChange } name="mainLink" defaultValue={values.mainLink as string} placeholder="Ссылка на Ваш сайт" />
                                                { errors.mainLink && touched && <Alert type='error' description={ErrorDescription} message={ errors.mainLink } showIcon /> }
                                            </div>
                                            <div>
                                                <Input onChange={ handleChange } name="website" defaultValue={!!values.website ? values.website : ''} placeholder="Ссылка на сайт" />
                                                { errors.website && touched && <Alert type='error' description={ErrorDescription} message={ errors.website } showIcon /> }
                                            </div>
                                        </div>
                                    </div>
                                    <button className={cn(styles.editButton)} disabled={isSubmitting} type='submit'>Сохранить</button>
                                </Space>
                            </Form> )}
                            </Formik>
                        }
                    </div>
                </div>
            </div>
    )
})

export default compose(Redirect)(Profile) as React.FC