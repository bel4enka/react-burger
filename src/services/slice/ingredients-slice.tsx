import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import {useHttp} from '../../hooks/http.hook';
import {baseUrl} from "../../utils/utils";
const ingredientsAdapter = createEntityAdapter({
  // @ts-ignore
  selectId: (ingredient) => ingredient._id,
});

const initialState = ingredientsAdapter.getInitialState({
  ingredient: null,
  loading: false,
  error: null,
});
export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async () => {
    const {request} = useHttp();
    return await request(`${baseUrl}ingredients`);
  }
);
export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    ingredientModal: (state, action) => {
      state.ingredient = action.payload;
      state.loading = true;
      state.error = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, state => {state.loading = true})
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        ingredientsAdapter.setAll(state, action.payload.data);
      })
      .addCase(fetchIngredients.rejected, state => {
        state.loading = false;
        state.error = 'Не могу получить данные ингредиентов';
      })
      .addDefaultCase(() => {})
  }
});

const {actions, reducer} = ingredientsSlice;

export default reducer;

// @ts-ignore
export const {selectAll} = ingredientsAdapter.getSelectors(state => state.ingredients);

export const {
  ingredientModal
} = actions;
