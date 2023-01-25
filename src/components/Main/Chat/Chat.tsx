import { Avatar, Form, Input, Button, Divider } from "antd"
import cn from 'classnames'
import React, { useRef, useState, useEffect } from 'react'
import { Formik } from 'formik'
import { DownCircleOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from "react-redux"
import { getMessages } from "../../../selectors/chat-selectors"
import { appDispatchType } from "../../../redux/store"
import { ChatMessageType } from "../../../types/types"
import profileImage from '../../../images/profile-image.jpg'
import { sendMessageThunk, startReceivingMessagesThunk, stopReceivingMessagesThunk } from "../../../redux/reducers/chat-reducer"
import { Link } from "react-router-dom"
import styles from './Chat.module.sass'
import Preloader from "../../common/Preloader/Preloader"
import filter from "../../../validates/common"

type PropsType = {}

type MessagePropsType = {
    avatar: string
    userId: number
    messageProps: string
    userName: string
}

const ChatMessage: React.FC<MessagePropsType> = ({ avatar, userId, userName, messageProps }): JSX.Element => {
    return (
        <div key={ userId }>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <Avatar size={ 50 } src={ avatar !== null ? avatar : profileImage } />
                <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                    <Link to={`/profile/${ userId }`} className={ cn(styles.username) } style={{ fontWeight: 'bold', fontSize: '16px', color: 'black' }}>{ userName }:</Link>
                    <span style={{ fontSize: '16px' }}>{ messageProps }</span>
                </div>
            </div>

        </div>
    )
} 

const Chat: React.FC<PropsType> = ({}): JSX.Element => {

    const messages: ChatMessageType[] = useSelector(getMessages)

    const dispatch: appDispatchType = useDispatch()

    const scrollDivRef = useRef<HTMLDivElement>(null)
    const scrollChecker = useRef<HTMLDivElement>(null)

    let [scrolled, setScrolled] = useState(0)

    const startReceivingMessages: () => void = () => {
        dispatch(startReceivingMessagesThunk())
    }

    const stopReceivingMessages: () => void = () => {
        dispatch(stopReceivingMessagesThunk())
    }

    const sendMessage: (message: string) => void = (message) => {
        dispatch(sendMessageThunk(message))
    }

    const scrollHandler = () => {
        if (scrollChecker.current?.scrollTop == scrollChecker.current?.scrollHeight as number - 500)
            setScrolled(0)
        else
            setScrolled(1)
    }

    const scrollToBottom = (ref: React.RefObject<HTMLDivElement>) => {
        return () => {
            ref.current?.scrollTo({
                top: ref.current.scrollHeight,
                behavior: 'smooth'
            })
        }
    }

    useEffect(() => {
        startReceivingMessages()
        scrollChecker.current?.addEventListener('scroll', scrollHandler)
        return () => {
            stopReceivingMessages()
            scrollChecker.current?.removeEventListener('scroll', scrollHandler)
        }
    }, [])

    useEffect(() => {
        if (scrolled == 0)    
            scrollDivRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    return (
        <div>
            <h1 style={{ fontSize: '25px' }}>Чат</h1>
            <div ref={ scrollChecker } style={{ marginTop: '40px', height: '500px', overflowY: 'scroll' }}>
                {
                    messages.map((el, index, array) => {
                        return (
                            <>
                                <ChatMessage avatar={ el.photo } userId={ el.userId } messageProps={ el.message } userName={ el.userName } />
                                { index !== array.length - 1 && <Divider type='horizontal' /> }
                            </>
                        )
                    })
                }
                <div ref={ scrollDivRef }></div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0 0 0', height: '25px' }}>{ scrolled ? <DownCircleOutlined onClick={ scrollToBottom(scrollChecker) } className={cn(styles.DownCircleOutlined)} style={{ fontSize: '25px' }} /> : '' }</div>
            <div style={{ marginTop: '20px' }}>
            <Formik
                initialValues={{ message: '' }}
                onSubmit={ async (values, { setSubmitting }) => {
                    sendMessage(filter.clean(values.message))

                    setSubmitting(false)
                }}
                    >
                {({
                    values,
                    handleSubmit,
                    isSubmitting,
                    handleChange,
                    submitForm
                }) => (
                    <Form onFinish={ handleSubmit } >
                        <Input.Group compact>
                            <Input.TextArea name="message" onChange={ handleChange } style={{ width: 'calc(100% - 100px)', height:  '75px', resize: 'none' }} placeholder="Ваше сообщение" />
                            <Button style={{ height:  '75px' }} type="primary" onClick={ submitForm }>Отправить</Button>
                        </Input.Group>
                    </Form>
                )}
            </Formik>
            </div>
        </div>
    )
}

export default Chat