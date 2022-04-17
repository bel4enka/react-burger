import {
  createSlice,
  nanoid, createAsyncThunk,
} from "@reduxjs/toolkit";
import {useHttp} from "../../hooks/http.hook";
import {baseUrl, getCookie} from "../../utils/utils";

const initialState = {
  constructor: [],
  bun: [],
  orderLoadingStatus: null,
  loading: false,
  error: null,
  order: null,
};

export const fetchOrder = createAsyncThunk(
  'constructor/fetchOrder',
  async (ingredients) => {
    const accessToken = getCookie('accessToken');
    const {request} = useHttp();
    return await request(`${baseUrl}orders`,'POST', JSON.stringify({ingredients}),
      {
        // @ts-ignore
        'Content-Type': 'application/json',  'Authorization': accessToken,
      }
    );
  }
);

export const constructorSlice = createSlice({
  name: 'constructors',
  initialState,
  reducers: {
    setConstructor: {
      reducer: (state, action) => {
        state.constructor.push(action.payload) ;
      },// @ts-ignore
      prepare: (item) => {
        const id:string = nanoid()
        return { payload: {id, ...item} }
      },
    },
    setBun: (state, action) => {
      state.bun.splice(0, 1, action.payload)
    },
    removeOrderModal: (state, action) => {
      state.order = action.payload;
    },
    moveIngredient: (state, action)=> {
      const ingredientsNew = state.constructor
      ingredientsNew[action.payload.drag] = ingredientsNew.splice(action.payload.hover, 1, ingredientsNew[action.payload.drag])[0];
      state.constructor = ingredientsNew
      },
      deleteIngredient: (state, action) => {
        state.constructor = state.constructor.filter(item => item.id !== action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrder.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.bun = [];
        state.constructor = [];
        state.order = action.payload;

      })
      .addCase(fetchOrder.rejected, state => {
        state.loading = false;
        state.error = 'Не могу отправить заказ - ошибка';
      })
      .addDefaultCase(() => {})
  }
});

const {actions, reducer} = constructorSlice;

export default reducer;

export const {
  setConstructor,
  setBun,
  moveIngredient,
  removeOrderModal,
  deleteIngredient
} = actions;
