import {useQuery} from "@tanstack/react-query";
import type {ChatDTO} from "@paper-decentralized-ai/chat-service-client";
import {useChatApi} from "../../api/useChatApi.ts";

export const useGetAllChats = () => {
    const {chatApi} = useChatApi();

    return useQuery<ChatDTO[], Error>({
        queryKey: ['chats'],
        queryFn: async () => chatApi.listChatsApiChatChatsGet().then(response => response.data)
    })
}