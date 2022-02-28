import {
  createSlice,
  createEntityAdapter,
  nanoid, createAsyncThunk,
} from "@reduxjs/toolkit";
import {useHttp} from "../../hooks/http.hook";
import {useDispatch} from "react-redux";
import {fetchIngredients} from "./ingredients-slice";


const constructorsAdapter = createEntityAdapter({
  // @ts-ignore
});

const initialState = constructorsAdapter.getInitialState({
  bun: [],
});

export const constructorSlice = createSlice({
  name: 'constructors',
  initialState,
  reducers: {
    setConstructor: {
      reducer: (state, action) => {
        constructorsAdapter.addOne(state, action.payload) ;
      },// @ts-ignore
      prepare: (item) => {
        const id:string = nanoid()
       // @ts-ignore
        return { payload: {id, ...item} }
      },
    },
    setBun: (state, action) => {
      state.bun.splice(0, 1, action.payload)
    },
    moveIngredient:
      constructorsAdapter.setAll,
  },
});

const {actions, reducer} = constructorSlice;

export default reducer;
// @ts-ignore
export const {selectAll} = constructorsAdapter.getSelectors(state => state.constructors);

export const {
  setConstructor,
  setBun,
  moveIngredient,
} = actions;
