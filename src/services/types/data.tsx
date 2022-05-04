import { Location } from "history";
import { ActionCreatorWithoutPayload, ActionCreatorWithPayload } from '@reduxjs/toolkit';

export type TIngredient = {
  readonly id?: string;
  readonly _id: string;
  readonly name: string
  readonly type: string;
  readonly proteins: number;
  readonly fat: number;
  readonly carbohydrates: number;
  readonly calories: number;
  readonly price: number;
  readonly image: string;
  readonly image_mobile: string;
  readonly image_large: string;
  readonly __v: number;
};

export type TLocationState = {
  background?: Location<TLocationState>;
  from?: {pathname: string}}

export type TOrderStatus = string;

export type TOrder = {
  readonly order: {
    readonly ingredients: TIngredient[]
    readonly number: number;
  };
  readonly number: number;
  readonly name: string;
  readonly status: string;
  readonly createdAt: string;
  readonly ingredients: TIngredient[];
  readonly _id: string;
}

export interface IWsActions  {
  wsInit: string,
  wsSendMessage: string,
  wsMessage: ActionCreatorWithPayload<TOrder, string>,
  wsOpen: ActionCreatorWithPayload<string>,
  wsClose: ActionCreatorWithoutPayload<string>,
  wsError: ActionCreatorWithPayload<string>,
}
export interface IInputPassword {
  password: string;
  token: string;
}
export interface IInputForgotPassword {
  email: string
}
export interface IInputLogin {
  password: string;
  email: string;
}

export interface IInputUserRegister {
  name: string,
  email: string,
  password: string
}

export interface IOrderIngredient {
  ingredient: TIngredient;
  count: number;
}
