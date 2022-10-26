import cn from 'classnames'
import styles from './Profile.module.sass'
import { useSelector } from 'react-redux'
import image from './../../../images/profile-image.jpg'
import { setStatusThunk, setPhotosThunk, getProfileThunk, setOwnerAC, getStatusThunk, setIsLoadingAC } from '../../../redux/reducers/profile-reducer'
import { appDispatchType } from './../../../redux/store'
import Status from './Status/Status'
import React, { useEffect } from 'react'
import { compose } from 'redux'
import { useParams } from 'react-router-dom'
import github from '../../../images/github.svg'
import youtube from '../../../images/youtube.svg'
import vk from '../../../images/vk.svg'
import twitter from '../../../images/twitter.svg'
import internet from '../../../images/internet.svg'
import instagram from '../../../images/instagram.svg'
import facebook from '../../../images/facebook.svg'
import { contactsTypes } from '../../../types/types'
import Redirect from "../../../hoc/Redirect"
import Preloader from '../../common/Preloader/Preloader'
import { Formik } from 'formik';
import { getAboutMeSelector, getContactsSelector, getFullNameSelector, getIsLoadingSelector, getIsOwnerSelector, getLookingForAJobSelector, getLookingForAJobDescriptionSelector, getMyPhotoSelector, getStatusSelector, getUserPhotoSelector, getUserIdSelector } from '../../../selectors/profile-selectors'
import { useDispatch } from 'react-redux'

type UriParams = {
    userId?: number
}

type ProfilePropsType = {}

const Profile: React.FC<ProfilePropsType> = (): JSX.Element => {
    
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

    return (
        <main className={cn(styles.main, 'main')}>
            <div className={cn(styles.infoBlock)}>
                <Formik initialValues={{ file: null }}
                    onSubmit={ async (values, { setSubmitting }) => {   
                        console.log(values.file);
                        
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
                    <form onSubmit={handleSubmit} className={cn(styles.avatarWrapper, {[styles.avatarWrapperIsOwner]: isOwner})}>
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
                                            <input type="file" name='file' onChange={(event) => {
                                                if (event.target.files) {
                                                    setFieldValue('file', event.target.files[0])
                                                }
                                                submitForm()
                                            }} id='fileInput' accept='image/*' disabled={isSubmitting} />
                                            <div className={cn(styles.after)}>

                                            </div>
                                        </label>
                                    </div>
                                </div>
                            }
                        </div>
                    </form> )}
                </Formik>
                <div className={cn(styles.right_side)}>
                    <p className={cn(styles.fullname)}>{ fullName }</p>
                    <Status setIsLoading={setIsLoading} isLoading={isLoading} isOwner={isOwner} setStatus={setStatus} status={status} />
                    <p className={cn(styles.lookingForAJob)}>Ищет работу: <span className={cn(lookingForAJob ? styles.lookingForAJobGreen : styles.lookingForAJobRed)}>{ lookingForAJob ? 'Да' : 'Нет' }</span></p>
                    { lookingForAJob && <p className={cn(styles.lookingForAJobDescription)}>Мои навыки: { lookingForAJobDescription }</p> }
                    { aboutMe && <p className={cn(styles.aboutMe)}>Обо мне: { aboutMe }</p> }
                    <div className={cn(styles.contacts)}>
                        <p>Контакты:</p>
                        { Object.keys(contacts).map(el => {                      
                            if (contacts[el] !== null) {
                                return <a key={el} href={contacts[el]}><img width='30px' height='30px' src={el === 'github' ? github : el === 'facebook' ? facebook : el === 'youtube' ? youtube : el === 'vk' ? vk : el === 'twitter' ? twitter : el === 'instagram' ? instagram : internet } alt={el} /></a>
                            }
                            else {
                                counter++
                                if(counter === Object.keys(contacts).length)
                                    return <span className={cn(styles.emptyContacts)}>Нет</span>
                            }
                        }) }
                    </div>
                    {
                        isOwner && <button className={cn(styles.editButton)}>Редактировать</button>
                    }
                </div>
            </div>
        </main>
    )
}

export default compose(Redirect)(Profile) as React.FC