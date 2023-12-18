import { createSlice } from '@reduxjs/toolkit'

//현재 로그인 한 유저
const initialState = {
    currentUser: {
        uid: '',
        photoURL: '',
        displayName: ''

    }

}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.currentUser.uid = action.payload.uid;
      state.currentUser.photoURL = action.payload.photoURL;
      state.currentUser.displayName = action.payload.displayName;
    },
    //로그아웃
    clearUser: (state) => {
      state.currentUser = {};
    },
    //사진 변경
    setPhotoUrl: (state, action) => {
      state.currentUser = {
        ...state.currentUser,
        photoURL: action.payload
      }
    }
    
  }
})

export const {setUser, clearUser, setPhotoUrl} = userSlice.actions;

export default userSlice.reducer