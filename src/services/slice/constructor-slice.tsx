import {
  createSlice,
  createEntityAdapter,
  nanoid, createAsyncThunk,
} from "@reduxjs/toolkit";
import BurgerConstructor
  from "../../components/burger-constructor/burger-constructor";
import {useHttp} from "../../hooks/http.hook";
const apiUrlOrder = 'https://norma.nomoreparties.space/api/orders'

const initialState = {
  constructor: [],
  bun: [],
  orderLoadingStatus: null,
  order: []
};

export const fetchOrder = createAsyncThunk(
  'constructor/fetchOrder',
  async (ingredients) => {
    const {request} = useHttp();
    return await request(apiUrlOrder,'POST', JSON.stringify({ingredients}));
  }
);

export const constructorSlice = createSlice({
  name: 'constructors',
  initialState,
  reducers: {
    // setConstructor: {
    //   reducer: (state, action) => {
    //     state.constructor.push(action.payload) ;
    //   },// @ts-ignore
    //   prepare: (item) => {
    //     const id:string = nanoid()
    //    // @ts-ignore
    //     return { payload: {id, ...item} }
    //   },
    // },
    setBun: (state, action) => {
      state.bun.splice(0, 1, action.payload)
    },
    setConstructor: (state, action) => {
      state.constructor.push(action.payload)
    },
    moveIngredient: (state, action)=> {
      const ingredientsNew = [...state.constructor]
      // @ts-ignore
      ingredientsNew.splice(action.payload.drag, 0, ingredientsNew.splice(action.payload.hover, 1)[0])
      state.constructor = ingredientsNew
      },
      deleteIngredient: (state, action) => {
        // state.constructor.removeOne(state, action.payload);// @ts-ignore
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrder.pending, state => {state.orderLoadingStatus = 'loading'
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.orderLoadingStatus = 'idle';
        state.bun = [];
        state.constructor = [];
      })
      .addCase(fetchOrder.rejected, state => {
        state.orderLoadingStatus = 'error';
      })
      .addDefaultCase(() => {})
  }
});

const {actions, reducer} = constructorSlice;

export default reducer;
// @ts-ignore

export const {
  setConstructor,
  setBun,
  moveIngredient,
  // deleteIngredient
} = actions;
