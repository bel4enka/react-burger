import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import {useHttp} from "../../hooks/http.hook";
const apiForgotPass = 'https://norma.nomoreparties.space/api/password-reset'

const initialState = {
  user: null,
  loading: false,
  error: null,

};

export const fetchForgotPassword = createAsyncThunk(
  'auth/fetchForgotPassword',
  async (email) => {
    const {request} = useHttp();
    return await request(apiForgotPass,'POST', JSON.stringify({'email': email}));
  }
);

export const authSlice = createSlice({
  name: 'auths',
  initialState,
  reducers: {
    test: (state, action) => {
      state.user = action.payload.state;
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchForgotPassword.pending, state => {
        state.loading = true;
        state.error = false;
        console.log('pending')
      })
      .addCase(fetchForgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
      })
      .addCase(fetchForgotPassword.rejected, state => {
        state.loading = false;
        state.error = 'Не могу отправить заказ - ошибка';
        console.log('rejected')
      })
      .addDefaultCase(() => {})
  }
});

const {actions, reducer} = authSlice;

export default reducer;

export const {
  test
} = actions;
