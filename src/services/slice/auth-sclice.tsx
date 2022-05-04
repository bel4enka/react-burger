import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import {useHttp} from "../../hooks/http.hook";
import {setCookie, getCookie, deleteCookie} from '../../utils/utils'
import {baseUrl} from "../../utils/utils";
import {
  IInputForgotPassword,
  IInputLogin,
  IInputPassword,
  IInputUserRegister
} from "../types/data";
import {RejectedAction} from "@reduxjs/toolkit/dist/query/core/buildThunks";

type TUser = {
  name: string,
  email: string,
  token: string,
  refreshToken: string
}

interface IAuth {
  user: TUser,
  loggedIn: boolean,
  loggedInErr: boolean,
  forgotPasswordOk: boolean,
  forgotPassToken: null,
  resetPasswordOk: boolean,
  forgotPasswordErr: boolean,
  loading: boolean,
  error: boolean,
  updateProfileErr: boolean,
  updateProfileSuccess: boolean,
}

const initialState:IAuth = {
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
  error: false,
  updateProfileErr: false,
  updateProfileSuccess: false,
};

export const fetchForgotPassword = createAsyncThunk(
  'auth/fetchForgotPassword',
  async (email:IInputForgotPassword) => {
    const {request} = useHttp();
    return await request(`${baseUrl}password-reset/`,'POST', JSON.stringify({'email': email}));
  }
);

export const fetchRegister = createAsyncThunk(
  'auth/fetchRegister',
  async ({name, email, password}:IInputUserRegister, { rejectWithValue }) => {
    try {
      const {request} = useHttp();
      return await request(`${baseUrl}auth/register`, 'POST', JSON.stringify({
        'email': email,
        'name': name,
        'password': password
      }));
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);



export const logOut = createAsyncThunk(
  'auth/logOut',
  async () => {
    const {request} = useHttp();
    const refreshToken = localStorage.getItem('refreshToken');
    return await request(`${baseUrl}auth/logout`,'POST', JSON.stringify({token: refreshToken}),
      {
        'Content-Type': 'application/json',  'Authorization': getCookie('accessToken'),
      }
      );
  }
);

export const fetchLogin = createAsyncThunk(
  'auth/fetchLogin',
  async (input:IInputLogin, { rejectWithValue }) => {
    const {request} = useHttp();
    try {
      return await request(`${baseUrl}auth/login`, 'POST', JSON.stringify(input));
    } catch (err) {
      return rejectWithValue(err)
    }
  }
);

export const fetchUpdateProfile = createAsyncThunk(
  'auth/fetchUpdateProfile',
  async (input:IInputUserRegister, { rejectWithValue }) => {
      const {request} = useHttp();
    try {
      return await request(`${baseUrl}auth/user`, 'PATCH', JSON.stringify(input),
        {
          'Content-Type': 'application/json', 'Authorization': getCookie('accessToken'),
        }
      );
    } catch (err) {return rejectWithValue(err)
    }
  }
);

export const fetchUpdateToken = createAsyncThunk(
  'auth/fetchUpdateToken',
  async () => {
    const {request} = useHttp();
    const refreshToken = localStorage.getItem('refreshToken');
    return await request(`${baseUrl}auth/token`,'POST', JSON.stringify({token: refreshToken}),
    );
  }
);

export const fetchUpdatePassword = createAsyncThunk(
  'auth/fetchUpdatePassword',
  async (input:IInputPassword) => {
    const {request} = useHttp();
    return await request(`${baseUrl}reset`,'POST', JSON.stringify(input));
  }
);
export const getUser = createAsyncThunk(
  'auth/getUser',
  async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    const {request} = useHttp();
    return await request(`${baseUrl}auth/user`,'GET', null ,
      {
        'Content-Type': 'application/json',  'Authorization': getCookie('accessToken'),
      }
    );
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
    setProfileErr:(state) => {
      state.updateProfileErr = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchForgotPassword.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getUser.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(logOut.pending, state => {
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
      .addCase(fetchUpdateToken.pending, state => {
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
        console.log(action.payload)
        state.user.name = action.payload.user.name;
        state.user.email = action.payload.user.email;
        state.updateProfileSuccess = true;
      })
      .addCase(fetchUpdatePassword.fulfilled, (state, action) => {
        state.resetPasswordOk = true;
      })
      .addCase(fetchUpdateToken.fulfilled, (state, action) => {
        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        state.updateProfileErr = false;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.loggedIn = true;
        state.user.name = action.payload.user.name;
        state.user.email = action.payload.user.email;
        state.updateProfileSuccess = true;
      })
      .addCase(fetchForgotPassword.rejected, state => {
        state.loading = false;
        // state.error = 'Не могу отправить заказ - ошибка';
        state.forgotPasswordOk = false;
      })
      .addCase(fetchRegister.rejected, (state, action) => {
        state.loading = false;
        state.loggedInErr = true;

      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.loading = false;
        state.loggedInErr = true;
        // state.error = action.payload;
      })
      .addCase(logOut.rejected, state => {
      })
      .addCase(fetchUpdateProfile.rejected, (state,action) => {
        state.updateProfileErr = true;
          // action.payload;
      })
      .addCase(fetchUpdateToken.rejected, state => {
        console.log('fetchUpdateToken - rejected')
      })
      .addCase(getUser.rejected, () => {
        console.log('getUser - rejected')
      })
      .addDefaultCase(() => {})
  }
});

const {actions, reducer} = authSlice;

export default reducer;

export const {
  dellProfileErr,
  dellProfileSuccess,
  setProfileErr
} = actions;
