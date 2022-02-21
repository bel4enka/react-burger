import React, {useEffect, useState, useReducer, useMemo} from 'react';
import AppHeader from '../app-header/app-header';
import styles from './app.module.css'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import  BurgerIngredients  from '../burger-ingredients/burger-ingredients';
import { useDispatch, useSelector } from 'react-redux';


// function reducer(state, action) {
//   let total = 0;
//   if (state.constr.length > 0)
//   {
//     let totalNoBun = state.constr.filter((i) => (i.type !== "bun"))
//       .reduce((acc, item) => acc + item.price, 0)
//
//     let totalBun = state.constr.filter((i) => (i.type==="bun"))[0].price;
//     total = totalNoBun + totalBun * 2
//   }


function App() {

// TS infers `isOn` is boolean


  return (
      <>
        <AppHeader/>
          <main className={`${styles.main}`}>
              <BurgerIngredients/>
              {/*<BurgerConstructor/>*/}
          </main>

      </>
    );

}
export default App
