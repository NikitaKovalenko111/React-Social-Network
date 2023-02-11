import { ChatMessageType } from "../types/types"

let ws: WebSocket | null = null

// TYPES

export interface ChatAPIType {
    start: () => void
    subscribe: (callback: MessageSubscribersType | StatusSubscribersType, eventName: EventNames) => void
    unsubscribe: (callback: MessageSubscribersType | StatusSubscribersType, eventName: EventNames) => void
    sendMessage: (message: string) => void
    stop: () => void
}

type MessageSubscribersType = (messages: ChatMessageType[]) => void
type StatusSubscribersType = (status: StatusType) => void
export type StatusType = 'pending' | 'ready'
type EventNames = 'message-received' | 'status-changed'
type SubscribersTypes = MessageSubscribersType & StatusSubscribersType

// HANDLERS

const notifySubsAboutStatusChanged = (status: StatusType) => {
    subscribers['status-changed'].forEach(s => s(status))
}

const messageHandler = (e: MessageEvent) => { 
    const newMessages = JSON.parse(e.data)
    subscribers['message-received'].forEach(s => s(newMessages))
}

const openHandler = () => {
    notifySubsAboutStatusChanged('ready')
}

const statusHandler = (status: StatusType) => { subscribers['status-changed'].forEach(s => s(status)) }

const closeHandler = (e: CloseEvent) => {
    notifySubsAboutStatusChanged('pending')
    setTimeout(ChatAPI.start, 3000)
}

const cleanUp = () => {
    ws?.removeEventListener('close', closeHandler)
    ws?.removeEventListener('message', messageHandler)
    ws?.removeEventListener('open', openHandler)
}

const createChannel = () => {
    cleanUp()
    ws?.close()
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    notifySubsAboutStatusChanged('pending')
    ws.addEventListener('close', closeHandler)
    ws.addEventListener('message', messageHandler)
    ws.addEventListener('open', openHandler)
}

let subscribers = {
    'message-received': [] as MessageSubscribersType[],
    'status-changed': [] as StatusSubscribersType[]
}

// API

export const ChatAPI: ChatAPIType = {

    start() {
        createChannel()
    },

    subscribe: (callback: MessageSubscribersType | StatusSubscribersType, eventName: EventNames) => {
        // @ts-ignore
        subscribers[eventName].push(callback) 
    },

    unsubscribe: (callback: MessageSubscribersType | StatusSubscribersType, eventName: EventNames) => {
        switch(eventName) {
            case 'message-received':
                // @ts-ignore
                subscribers['message-received'].filter((s: MessageSubscribersType) => s !== callback)
                break
            case 'status-changed':
                // @ts-ignore
                subscribers['status-changed'].filter((s: StatusSubscribersType) => s !== callback)
                break
            default:
                break
        }
    },

    sendMessage: (message: string) => {
        ws?.send(message)
    },

    stop() {
        subscribers['message-received'] = []
        subscribers['status-changed'] = []
        cleanUp()
        ws?.close()
    }

}

