import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import {useHttp} from '../../hooks/http.hook';
import {baseUrl} from "../../utils/utils";
import {TIngredient} from "../types/data"


interface IIngredientsState {
  ingredients: TIngredient[],
  ingredient: null,
  loading: boolean,
  error: boolean,
}

const initialState: IIngredientsState = {
  ingredients: [],
  ingredient: null,
  loading: false,
  error: null,
};
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
        state.ingredients = action.payload.data;
      })
      .addCase(fetchIngredients.rejected, state => {
        state.loading = false;

        // state.error = 'Не могу получить данные ингредиентов';
      })
      .addDefaultCase(() => {})
  }
});

const {actions, reducer} = ingredientsSlice;

export default reducer;

export const {
  ingredientModal
} = actions;
