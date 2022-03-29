import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import {useHttp} from "../../hooks/http.hook";
import {setCookie, getCookie, deleteCookie} from '../../utils/utils'
const apiForgotPass = 'https://norma.nomoreparties.space/api/password-reset/'
const apiAuth = 'https://norma.nomoreparties.space/api/auth/'

const initialState = {
  user: {
    name: null,
    email: null,
    token: null,
    refreshToken: null
  },
  loggedIn: false,
  loggedInErr: false,
  forgotPasswordOk: false,
  forgotPassToken: null,
  resetPasswordOk: false,
  forgotPasswordErr: false,
  loading: false,
  error: null,
  updateProfileErr: false,
  updateProfileSuccess: false,
};

export const fetchForgotPassword = createAsyncThunk(
  'auth/fetchForgotPassword',
  async (email) => {
    const {request} = useHttp();
    return await request(apiForgotPass,'POST', JSON.stringify({'email': email}));
  }
);

export const fetchRegister = createAsyncThunk(
  'auth/fetchRegister',
  // @ts-ignore
  async ({name, email, password}) => {
    const {request} = useHttp();
    return await request(`${apiAuth}register`,'POST', JSON.stringify({'email': email, 'name': name, 'password': password}));
  }
);

export const logOut = createAsyncThunk(
  'auth/logOut',
  // @ts-ignore
  async () => {
    const {request} = useHttp();
    const refreshToken = localStorage.getItem('refreshToken');
    return await request(`${apiAuth}logout`,'POST', JSON.stringify({token: refreshToken}),
      {
        // @ts-ignore
        'Content-Type': 'application/json',  'Authorization': getCookie('accessToken'),
      }
      );
  }
);
export const fetchLogin = createAsyncThunk(
  'auth/fetchLogin',
  // @ts-ignore
  async (input) => {
    const {request} = useHttp();
    return await request(`${apiAuth}login`,'POST', JSON.stringify(input));
  }
);

export const fetchUpdateProfile = createAsyncThunk(
  'auth/fetchUpdateProfile',
  // @ts-ignore
  async (input) => {
    const {request} = useHttp();
    return await request(`${apiAuth}user`,'PATCH', JSON.stringify(input),
    {
      // @ts-ignore
      'Content-Type': 'application/json',  'Authorization': getCookie('accessToken'),
    }
  );
  }
);

export const fetchUpdatePassword = createAsyncThunk(
  'auth/fetchUpdatePassword',
  // @ts-ignore
  async (input) => {
    const {request} = useHttp();
    return await request(`${apiForgotPass}reset`,'POST', JSON.stringify(input));
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    dellProfileErr: (state, action) => {
      state.updateProfileErr = action.payload;
    },
    dellProfileSuccess: (state, action) => {
      state.updateProfileSuccess = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchForgotPassword.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(logOut.pending, state => {
        console.log('pending logOut')
      })
      .addCase(fetchRegister.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchLogin.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchUpdateProfile.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchForgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.forgotPasswordOk = true;
      })
      .addCase(logOut.fulfilled, (state, action) => {
        state.loggedIn = false;
        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.loggedIn = true;
        state.user.name = action.payload.user.name;
        state.user.email = action.payload.user.email;
        state.user.token = action.payload.accessToken;
        state.user.refreshToken = action.payload.refreshToken
        //как-то это нужно вынести в переменную, код повторяется
        setCookie('accessToken', action.payload.accessToken)
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.loggedIn = true;
        state.loggedInErr = false;
        state.user.name = action.payload.user.name;
        state.user.email = action.payload.user.email;
        //как-то это нужно вынести в переменную, код повторяется
        setCookie('accessToken', action.payload.accessToken)
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(fetchUpdateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.loggedIn = true;
        state.user.name = action.payload.user.name;
        state.user.email = action.payload.user.email;
        state.updateProfileSuccess = true;
      })
      .addCase(fetchUpdatePassword.fulfilled, (state, action) => {
        console.log('Успех!')
        state.resetPasswordOk = true;
      })
      .addCase(fetchForgotPassword.rejected, state => {
        state.loading = false;
        state.error = 'Не могу отправить заказ - ошибка';
        state.forgotPasswordOk = false;
      })
      .addCase(fetchRegister.rejected, state => {
        state.loading = false;
        state.loggedInErr = true;
      })
      .addCase(fetchLogin.rejected, state => {
        state.loading = false;
        state.loggedInErr = true;
      })
      .addCase(logOut.rejected, state => {
        console.log('rejected')
      })
      .addCase(fetchUpdateProfile.rejected, state => {
        state.updateProfileErr = true;

      })
      .addDefaultCase(() => {})
  }
});

const {actions, reducer} = authSlice;

export default reducer;

export const {
  dellProfileErr,
  dellProfileSuccess
} = actions;
