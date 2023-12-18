import { createSlice } from "@reduxjs/toolkit";

//채팅 만든 사람의 정보
const initialState = {
    currentChatRoom : {
        createBy: {
            image: '',
            name: '',
        },
        description: '',
        id: '',
        name: ''
    },
    isPrivateChatRoom: false,
    userPosts: null
}

export const chatRoomSlice = createSlice({
    name: 'chatRoom',
    initialState,
    reducers: {

    }
})

export default chatRoomSlice.reducer;