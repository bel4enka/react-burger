import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import {useHttp} from '../../hooks/http.hook';
const apiUrl = 'https://norma.nomoreparties.space/api/ingredients'

const ingredientsAdapter = createEntityAdapter({
  // @ts-ignore
  selectId: (ingredient) => ingredient._id,
});

const initialState = ingredientsAdapter.getInitialState({
  ingredientsLoadingStatus: 'idle',
  tab: "bun",
});
export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async () => {
    const {request} = useHttp();
    return await request(apiUrl);
  }
);
export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    ingredientsSetTab: (state, action) => {
      state.tab = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, state => {state.ingredientsLoadingStatus = 'loading'})
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.ingredientsLoadingStatus = 'idle';
        ingredientsAdapter.setAll(state, action.payload.data);
      })
      .addCase(fetchIngredients.rejected, state => {
        state.ingredientsLoadingStatus = 'error';
      })
      .addDefaultCase(() => {})
  }
});

const {actions, reducer} = ingredientsSlice;

export default reducer;

// @ts-ignore
// export const selectors = ingredientsAdapter.getSelectors(state => state.ingredients);
// @ts-ignore
export const {selectAll} = ingredientsAdapter.getSelectors(state => state.ingredients);

export const {
  ingredientsSetTab
} = actions;
