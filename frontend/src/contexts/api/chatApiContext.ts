import { createContext } from "react";
import type { ChatApi, MessagesApi } from "@paper-decentralized-ai/chat-service-client";

interface ChatApiContextType {
    chatApi: ChatApi;
    messagesApi: MessagesApi;
}

export const ChatApiContext = createContext<ChatApiContextType | undefined>(undefined);