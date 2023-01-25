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
import Filter from 'bad-words'

type PropsType = {}

type MessagePropsType = {
    avatar: string
    userId: number
    message: string
    userName: string
}

const ChatMessage: React.FC<MessagePropsType> = ({ avatar, userId, userName, message }): JSX.Element => {
    return (
        <div key={ userId }>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <Avatar size={ 50 } src={ avatar !== null ? avatar : profileImage } />
                <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                    <Link to={`/profile/${ userId }`} className={ cn(styles.username) } style={{ fontWeight: 'bold', fontSize: '16px', color: 'black' }}>{ userName }:</Link>
                    <span style={{ fontSize: '16px' }}>{ message }</span>
                </div>
            </div>

        </div>
    )
} 

const Chat: React.FC<PropsType> = ({}): JSX.Element => {

    let filter = new Filter()

    const badWordsArray = ["ahole","anus","ash0le","ash0les","asholes","ass","Ass","Monkey","Assface","assh0le","assh0lez","asshole","assholes","assholz","asswipe","azzhole","bassterds","bastard","bastards","bastardz","basterds","basterdz","Biatch","bitch","bitches","Blow","Job","boffing","butthole","buttwipe","c0ck","c0cks","c0k","Carpet","Muncher","cawk","cawks","Clit","cnts","cntz","cock","cockhead","cock-head","cocks","CockSucker","cock-sucker","crap","cum","cunt","cunts","cuntz","dick","dild0","dild0s","dildo","dildos","dilld0","dilld0s","dominatricks","dominatrics","dominatrix","dyke","enema","f","u","c","k","f","u","c","k","e","r","fag","fag1t","faget","fagg1t","faggit","faggot","fagit","fags","fagz","faig","faigs","fart","flipping","the","bird","fuck","fucker","fuckin","fucking","fucks","Fudge","Packer","fuk","Fukah","Fuken","fuker","Fukin","Fukk","Fukkah","Fukken","Fukker","Fukkin","g00k","gay","gayboy","gaygirl","gays","gayz","God-damned","h00r","h0ar","h0re","hells","hoar","hoor","hoore","jackoff","jap","japs","jerk-off","jisim","jiss","jizm","jizz","knob","knobs","knobz","kunt","kunts","kuntz","Lesbian","Lezzian","Lipshits","Lipshitz","masochist","masokist","massterbait","masstrbait","masstrbate","masterbaiter","masterbate","masterbates","Motha","Fucker","Motha","Fuker","Motha","Fukkah","Motha","Fukker","Mother","Fucker","Mother","Fukah","Mother","Fuker","Mother","Fukkah","Mother","Fukker","mother-fucker","Mutha","Fucker","Mutha","Fukah","Mutha","Fuker","Mutha","Fukkah","Mutha","Fukker","n1gr","nastt","nigger;","nigur;","niiger;","niigr;","orafis","orgasim;","orgasm","orgasum","oriface","orifice","orifiss","packi","packie","packy","paki","pakie","paky","pecker","peeenus","peeenusss","peenus","peinus","pen1s","penas","penis","penis-breath","penus","penuus","Phuc","Phuck","Phuk","Phuker","Phukker","polac","polack","polak","Poonani","pr1c","pr1ck","pr1k","pusse","pussee","pussy","puuke","puuker","queer","queers","queerz","qweers","qweerz","qweir","recktum","rectum","retard","sadist","scank","schlong","screwing","semen","sex","sexy","Sh!t","sh1t","sh1ter","sh1ts","sh1tter","sh1tz","shit","shits","shitter","Shitty","Shity","shitz","Shyt","Shyte","Shytty","Shyty","skanck","skank","skankee","skankey","skanks","Skanky","slut","sluts","Slutty","slutz","son-of-a-bitch","tit","turd","va1jina","vag1na","vagiina","vagina","vaj1na","vajina","vullva","vulva","w0p","wh00r","wh0re","whore","xrated","xxx","b!+ch","bitch","blowjob","clit","arschloch","fuck","shit","ass","asshole","b!tch","b17ch","b1tch","bastard","bi+ch","boiolas","buceta","c0ck","cawk","chink","cipa","clits","cock","cum","cunt","dildo","dirsa","ejakulate","fatass","fcuk","fuk","fux0r","hoer","hore","jism","kawk","l3itch","l3i+ch","lesbian","masturbate","masterbat*","masterbat3","motherfucker","s.o.b.","mofo","nazi","nigga","nigger","nutsack","phuck","pimpis","pusse","pussy","scrotum","sh!t","shemale","shi+","sh!+","slut","smut","teets","tits","boobs","b00bs","teez","testical","testicle","titt","w00se","jackoff","wank","whoar","whore","*damn","*dyke","*fuck*","*shit*","@$$","amcik","andskota","arse*","assrammer","ayir","bi7ch","bitch*","bollock*","breasts","butt-pirate","cabron","cazzo","chraa","chuj","Cock*","cunt*","d4mn","daygo","dego","dick*","dike*","dupa","dziwka","ejackulate","Ekrem*","Ekto","enculer","faen","fag*","fanculo","fanny","feces","feg","Felcher","ficken","fitt*","Flikker","foreskin","Fotze","Fu(*","fuk*","futkretzn","gay","gook","guiena","h0r","h4x0r","hell","helvete","hoer*","honkey","Huevon","hui","injun","jizz","kanker*","kike","klootzak","kraut","knulle","kuk","kuksuger","Kurac","kurwa","kusi*","kyrpa*","lesbo","mamhoon","masturbat*","merd*","mibun","monkleigh","mouliewop","muie","mulkku","muschi","nazis","nepesaurio","nigger*","orospu","paska*","perse","picka","pierdol*","pillu*","pimmel","piss*","pizda","poontsee","poop","porn","p0rn","pr0n","preteen","pula","pule","puta","puto","qahbeh","queef*","rautenberg","schaffer","scheiss*","schlampe","schmuck","screw","sh!t*","sharmuta","sharmute","shipal","shiz","skribz","skurwysyn","sphencter","spic","spierdalaj","splooge","suka","b00b*","testicle*","titt*","twat","vittu","wank*","wetback*","wichser","wop*","yed","zabourah","test"]

    filter.addWords(...badWordsArray)

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
                                <ChatMessage avatar={ el.photo } userId={ el.userId } message={ el.message } userName={ el.userName } />
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