import { ChatMessageType } from "../types/types"

let ws: WebSocket | null = null

// TYPES

export interface ChatAPIType {
    start: () => void
    subscribe: (callback: SubscribersType) => void
    unsubscribe: (callback: SubscribersType) => void
    sendMessage: (message: string) => void
    stop: () => void
}

type SubscribersType = (messages: ChatMessageType[]) => void

// HANDLERS

const messageHandler = (e: MessageEvent) => { 
    const newMessages = JSON.parse(e.data)
    subscribers.forEach(s => s(newMessages))
}

const closeHandler = (e: CloseEvent) => {
    setTimeout(ChatAPI.start, 3000)
}

const createChannel = async () => {
    ws?.removeEventListener('close', closeHandler)
    ws?.close()
    ws = await new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    
    if (ws.readyState === 0) {
        ws.addEventListener('close', closeHandler)
        ws.addEventListener('message', messageHandler)
    }
}

let subscribers = [] as SubscribersType[]

// API

export const ChatAPI: ChatAPIType = {

    start() {
        createChannel()
    },

    subscribe: (callback: SubscribersType) => {
        subscribers.push(callback) 
    },

    unsubscribe: (callback: SubscribersType) => {
        subscribers.filter(s => s !== callback)
    },

    sendMessage: (message: string) => {
        ws?.send(message)
    },

    stop() {
        ws?.removeEventListener('close', closeHandler)
        ws?.close()
    }

}

