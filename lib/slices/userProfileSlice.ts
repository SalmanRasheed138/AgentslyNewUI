import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserProfileState {
  avatarUrl: string | null
}

const initialState: UserProfileState = {
  avatarUrl: null
}

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    setAvatarUrl: (state, action: PayloadAction<string>) => {
      state.avatarUrl = action.payload
    }
  }
})

export const { setAvatarUrl } = userProfileSlice.actions
export default userProfileSlice.reducer

