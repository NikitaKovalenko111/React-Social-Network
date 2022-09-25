import cn from 'classnames'
import styles from './Profile.module.sass'
import { connect } from 'react-redux'
import image from './../../../images/profile-image.jpg'
import { setStatusThunk, setPhotosThunk, getProfileThunk, setOwnerAC, getStatusThunk, setIsLoadingAC } from '../../../redux/reducers/profile-reducer'
import { appDispatchType, appStateType } from './../../../redux/store'
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

type ProfilePropsType = {
    aboutMe: string | null
    status: string
    photo: string
    isOwner: boolean
    fullName: string
    lookingForAJob: boolean | null
    lookingForAJobDescription: string
    contacts: contactsTypes
    isLoading: boolean

    setStatus: (status: string) => void
    setIsLoading: (value: boolean) => void
}

type UriParams = {
    userId?: number
}

type ProfileApiPropsType = mstpType & mdtpType

type mdtpType = {
    setStatus: (status: string) => void
    setPhotos: () => void
    setIsOwner: (value: boolean) => void
    getProfile: (userId: number | null) => void
    getStatus: (userId: number | null) => void
    setIsLoading: (value: boolean) => void
}

type mstpType = {
    photo: string
    aboutMe: string | null
    status: string
    isOwner: boolean
    lookingForAJob: boolean | null
    lookingForAJobDescription: string
    fullName: string
    contacts: contactsTypes
    userId: number | null
    isLoading: boolean
}

const mstp = (state: appStateType): mstpType => { 
    return {
        isOwner: state.profile.isOwner,
        aboutMe: state.profile.aboutMe,
        photo: state.profile.profileImages.large,
        status: state.profile.status,
        lookingForAJob: state.profile.lookingForAJob,
        lookingForAJobDescription: state.profile.lookingForAJobDescription,
        fullName: state.profile.fullName,
        contacts: state.profile.contacts,
        userId: state.auth.userId,
        isLoading: state.profile.isLoading
    }
}

const mdtp = (dispatch: appDispatchType): mdtpType => {
    return {
        setStatus: (status: string) => {
            dispatch(setStatusThunk(status))
        },
        setIsLoading: (value: boolean) => {
            dispatch(setIsLoadingAC(value))
        },
        setIsOwner: (value: boolean) => {
            dispatch(setOwnerAC(value))
        },
        setPhotos: () => {
            dispatch(setPhotosThunk())
        },
        getProfile: (userId: number | null) => {
            dispatch(getProfileThunk(userId as number))
        },
        getStatus: (userId: number | null) => {
            dispatch(getStatusThunk(userId as number))
        }
    }
}

const Profile: React.FC<ProfilePropsType> = ({setIsLoading, isLoading, isOwner, status, setStatus, photo, fullName, lookingForAJob, lookingForAJobDescription, aboutMe, contacts }): JSX.Element => {

    let counter = 0

    return (
        <main className={cn(styles.main, 'main')}>
            <div className={cn(styles.infoBlock)}>
                <img width='400px' src={ photo ? photo : image } alt="image" />
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
                </div>
            </div>
        </main>
    )
}

const ProfileAPI: React.FC<ProfileApiPropsType> = React.memo(({setIsLoading, setIsOwner, getStatus, isOwner, status, setStatus, photo, getProfile, fullName, lookingForAJob, lookingForAJobDescription, contacts, userId, aboutMe, isLoading }): JSX.Element => {
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

    return <Profile setIsLoading={setIsLoading} isLoading={isLoading} isOwner={isOwner} aboutMe={aboutMe} fullName={fullName} lookingForAJob={lookingForAJob} lookingForAJobDescription={lookingForAJobDescription} contacts={contacts} photo={photo} setStatus={setStatus} status={status} />
})

export default compose(connect(mstp, mdtp), Redirect)(ProfileAPI) as React.FC