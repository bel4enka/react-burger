import React, {useEffect, useState, useReducer, useMemo} from 'react';
import AppHeader from '../app-header/app-header';
import styles from './app.module.css'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import  BurgerIngredients  from '../burger-ingredients/burger-ingredients';
import {Context} from '../../services/context'

const apiUrl = 'https://norma.nomoreparties.space/api/ingredients'

const initials = {
  constr: [],
  ingredients: [],
  tab: 'bun',
  total: 0
}

function reducer(state, action) {
  let total = 0;
  if (state.constr.length > 0)
  {
    let totalNoBun = state.constr.filter((i) => (i.type !== "bun"))
      .reduce((acc, item) => acc + item.price, 0)

    let totalBun = state.constr.filter((i) => (i.type==="bun"))[0].price;
    total = totalNoBun + totalBun * 2
  }
  switch (action.type) {
    case 'constr':
      return {...state, constr: action.payload}
    case 'ingredients':
      return {...state, ingredients: action.payload}
    case 'total':
      return {...state, total: total}
    case 'tab':
      return {...state, tab: action.payload}
    default:
    throw new Error()
  }

}
function App() {
  const {Provider} = Context;
  const [error, setError] = useState(null);
  // const [isLoaded, setIsLoaded] = useState(false);
  const [constr, setConstr] = useState([]);
  const contextState = useReducer(reducer, initials)
  const [state, dispatch] = contextState;

  // как-то надо подумать над этим
  // const contextValue = useMemo(() => {
  //   return { state, dispatch };
  // }, [state, dispatch]);
  useEffect(() => {
    fetch(apiUrl)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
      .then(
        (result) => {
          // setIsLoaded(true);
          dispatch({type:"constr", payload: result.data});
          dispatch({type:"ingredients", payload: result.data});
          // над строчкой ниже подумать
          dispatch({type:"total", payload: result.data.length});
        },
        (error) => {
          // setIsLoaded(true);
          setError(error);
          console.log(error)
        }
      ).catch((error) => console.log( error ))
  }, [])
  if (error) {
    return <div>Ошибка: {error}</div>;
  } else {
    return (
      <>
        <AppHeader/>
        {state.ingredients.length > 0 &&
          <main className={`${styles.main}`}>
            <Provider value={{state, dispatch}}>
              <BurgerIngredients/>
              <BurgerConstructor/>
            </Provider>
          </main>
        }
      </>
    );
  }
}
export default App
