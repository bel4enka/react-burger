import React, {useEffect, useState, useReducer, useMemo} from 'react';
import AppHeader from '../app-header/app-header';
import styles from './app.module.css'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import  BurgerIngredients  from '../burger-ingredients/burger-ingredients';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";


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
  return (
      <>
        <AppHeader/>
          <main className={`${styles.main}`}>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients/>
              <BurgerConstructor/>
            </DndProvider>
          </main>
      </>
    );
}
export default App
